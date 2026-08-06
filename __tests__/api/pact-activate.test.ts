/**
 * Activation is the moment the pact's clock starts, and it is the one
 * write that can rescue or ruin the legacy cohort: pacts signed before
 * startedAt existed still carry entries minted under the old
 * signedAt-anchored clock, with deadlines the member never agreed to.
 * The route's contract: journalless stale entries are cleared, anything
 * written survives, and activating twice never moves the clock.
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    pact: { findFirst: jest.fn(), update: jest.fn() },
    pactEntry: {
      deleteMany: jest.fn(),
      updateMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireAuth: jest.fn(),
}));

jest.mock("@/lib/access/tier", () => ({ getAccess: jest.fn() }));

jest.mock("@/lib/push", () => ({
  sendPushToUser: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from "@/app/api/pact/activate/route";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { getAccess } from "@/lib/access/tier";
import { sendPushToUser } from "@/lib/push";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = prisma as any;
const mockRequireAuth = requireAuth as jest.Mock;
const mockGetAccess = getAccess as jest.Mock;
const mockPush = sendPushToUser as jest.Mock;

const CALLER = { id: "user_1", email: "member@example.com" };

function req() {
  return { json: async () => ({}) } as never;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRequireAuth.mockImplementation(
    async (request: never, handler: (r: never, u: typeof CALLER) => unknown) =>
      handler(request, CALLER),
  );
  mockGetAccess.mockResolvedValue({ pactEntitled: true });
  db.pact.findFirst.mockResolvedValue({
    id: "pact_1",
    userId: "user_1",
    number: 1,
    preset: "confidence",
    signedAt: new Date("2026-08-01T00:00:00Z"),
    startedAt: null,
  });
  db.pact.update.mockResolvedValue({ id: "pact_1" });
  db.pactEntry.deleteMany.mockResolvedValue({ count: 0 });
  db.pactEntry.updateMany.mockResolvedValue({ count: 0 });
  db.pactEntry.findUnique.mockResolvedValue(null);
  db.pactEntry.create.mockResolvedValue({ id: "entry_1" });
  // Interactive transaction: the route's callback runs against tx; the
  // mock hands it the same client so the assertions below see the calls.
  db.$transaction.mockImplementation(
    async (fn: (tx: unknown) => Promise<unknown>) => fn(db),
  );
  mockPush.mockResolvedValue(undefined);
});

describe("POST /api/pact/activate", () => {
  it("refuses an account with no pact entitlement, before any read", async () => {
    mockGetAccess.mockResolvedValue({ pactEntitled: false });

    const res = await POST(req());

    expect(res.status).toBe(403);
    expect(db.pact.findFirst).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("404s when there is no live pact to activate", async () => {
    db.pact.findFirst.mockResolvedValue(null);

    const res = await POST(req());

    expect(res.status).toBe(404);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("only ever activates the live pact, never a broken one", async () => {
    await POST(req());

    expect(db.pact.findFirst).toHaveBeenCalledWith({
      where: { userId: "user_1", brokenAt: null },
    });
  });

  it("is idempotent: a started clock never moves again", async () => {
    db.pact.findFirst.mockResolvedValue({
      id: "pact_1",
      startedAt: new Date("2026-08-01T00:00:00Z"),
    });

    const res = await POST(req());
    const body = await res.json();

    expect(body).toEqual({ success: true, alreadyStarted: true });
    expect(db.$transaction).not.toHaveBeenCalled();
    expect(db.pact.update).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("starts the clock, opens week one, and clears only journalless stale entries", async () => {
    const before = Date.now();
    const res = await POST(req());
    const after = Date.now();

    expect(res.status).toBe(200);

    // The legacy sweep must never touch a week with writing in it.
    expect(db.pactEntry.deleteMany).toHaveBeenCalledWith({
      where: { pactId: "pact_1", status: "open", journalBody: null },
    });

    const startedAt = db.pact.update.mock.calls[0][0].data.startedAt as Date;
    expect(startedAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(startedAt.getTime()).toBeLessThanOrEqual(after);

    // Week one ends exactly seven days after the moment of activation.
    const create = db.pactEntry.create.mock.calls[0][0];
    expect(create.data.pactId).toBe("pact_1");
    expect(create.data.weekNumber).toBe(1);
    expect(create.data.weekEndsAt.getTime()).toBe(
      startedAt.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    // The writes ride one transaction: a crash mid-way must not leave a
    // started clock with no week-one row.
    expect(db.$transaction).toHaveBeenCalledTimes(1);
  });

  it("never reopens a kept or scarred legacy week one", async () => {
    // A legacy pact whose week one was already resolved under the old
    // clock: activation must move the clock without touching that mark.
    db.pactEntry.findUnique.mockResolvedValue({ id: "entry_legacy" });

    const res = await POST(req());

    expect(res.status).toBe(200);
    expect(db.pactEntry.create).not.toHaveBeenCalled();
    // The refresh write is scoped to status "open"; a kept or scarred
    // row falls outside it by construction.
    expect(db.pactEntry.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "open" }),
      }),
    );
  });

  it("fires the week-one push on the pactWeek category", async () => {
    await POST(req());

    expect(mockPush).toHaveBeenCalledWith(
      "user_1",
      "pactWeek",
      expect.objectContaining({ url: "/app/pact/week" }),
    );
  });

  it("succeeds even when the push throws", async () => {
    mockPush.mockRejectedValue(new Error("push service down"));

    const res = await POST(req());

    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
  });
});
