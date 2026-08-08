/**
 * Breaking the pact, and the two ways it used to go wrong with money.
 *
 * 1. A Stripe cancel failure was caught and swallowed, then the pact was
 *    scarred anyway. The member ended up out of the product and STILL
 *    BEING CHARGED, with a sealed record telling them it was over and no
 *    billing left on screen to cancel. Nothing surfaced it but the log.
 *
 * 2. There was no server-side idempotency. Two concurrent submits both
 *    passed the same `findFirst`, both cancelled, both counted as churn.
 *
 * The fix inverts the priority: the money is settled first, and if it
 * cannot be settled the covenant is left standing and the member is told.
 * A subscription Stripe has already deleted is not a failure, though, or
 * anyone holding a stale id could never break their pact at all.
 */

import { NextResponse } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    pact: { findFirst: jest.fn(), updateMany: jest.fn() },
    pactMembership: { findUnique: jest.fn(), update: jest.fn() },
    pactEntry: { count: jest.fn() },
  },
}));

jest.mock("@/lib/auth/middleware", () => ({ requireAuth: jest.fn() }));
jest.mock("@/lib/stripe", () => ({ cancelStripeSubscription: jest.fn() }));
jest.mock("@/lib/analytics/server", () => ({ captureServerAsync: jest.fn() }));
jest.mock("@/lib/analytics/events", () => ({
  ANALYTICS_EVENTS: { PACT_BROKEN: "pact_broken" },
}));
jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { cancelStripeSubscription } from "@/lib/stripe";
import { captureServerAsync } from "@/lib/analytics/server";
import { POST } from "@/app/api/pact/break/route";

const mockPrisma = prisma as unknown as {
  pact: { findFirst: jest.Mock; updateMany: jest.Mock };
  pactMembership: { findUnique: jest.Mock; update: jest.Mock };
  pactEntry: { count: jest.Mock };
};
const mockRequireAuth = requireAuth as jest.Mock;
const mockCancel = cancelStripeSubscription as jest.Mock;
const mockCapture = captureServerAsync as jest.Mock;

const USER = { id: "user_1" };
const PACT = { id: "pact_1", number: 1, preset: "confidence", startedAt: new Date() };
const PAID_MEMBERSHIP = {
  id: "pm_1",
  stripeSubscriptionId: "sub_live_1",
  status: "ACTIVE",
};

/** Drive the route the way requireAuth does, with a fixed caller. */
function callBreak(confirm: unknown = "break") {
  mockRequireAuth.mockImplementation(
    async (_req: unknown, handler: (r: unknown, u: unknown) => Promise<Response>) =>
      handler({ json: async () => ({ confirm }) }, USER),
  );
  return POST({} as never);
}

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.pact.findFirst.mockResolvedValue(PACT);
  mockPrisma.pact.updateMany.mockResolvedValue({ count: 1 });
  mockPrisma.pactMembership.findUnique.mockResolvedValue(null);
  mockPrisma.pactMembership.update.mockResolvedValue({});
  mockPrisma.pactEntry.count.mockResolvedValue(0);
  mockCancel.mockResolvedValue(undefined);
});

describe("the ceremony still guards the route", () => {
  it("400s without the typed word, and touches nothing", async () => {
    const res = await callBreak("nope");
    expect(res.status).toBe(400);
    expect(mockPrisma.pact.updateMany).not.toHaveBeenCalled();
    expect(mockCancel).not.toHaveBeenCalled();
  });

  it("404s when there is no unbroken pact", async () => {
    mockPrisma.pact.findFirst.mockResolvedValue(null);
    const res = await callBreak();
    expect(res.status).toBe(404);
  });
});

describe("a Stripe failure leaves the pact standing", () => {
  it("502s and does NOT break the covenant", async () => {
    mockPrisma.pactMembership.findUnique.mockResolvedValue(PAID_MEMBERSHIP);
    mockCancel.mockRejectedValue(new Error("Stripe is down"));

    const res = await callBreak();

    expect(res.status).toBe(502);
    // The whole point: no scar while the card is still live.
    expect(mockPrisma.pact.updateMany).not.toHaveBeenCalled();
    expect(mockPrisma.pactMembership.update).not.toHaveBeenCalled();
    expect(mockCapture).not.toHaveBeenCalled();
  });

  it("tells the member their pact is intact rather than failing silently", async () => {
    mockPrisma.pactMembership.findUnique.mockResolvedValue(PAID_MEMBERSHIP);
    mockCancel.mockRejectedValue(new Error("Stripe is down"));
    const body = await (await callBreak()).json();
    expect(body.error).toMatch(/left your pact standing|could not stop/i);
  });

  it("treats an already-deleted subscription as cancelled, not as a failure", async () => {
    // Otherwise a stale subscription id traps someone in a pact forever.
    mockPrisma.pactMembership.findUnique.mockResolvedValue(PAID_MEMBERSHIP);
    const gone = Object.assign(new Error("No such subscription: sub_live_1"), {
      code: "resource_missing",
    });
    mockCancel.mockRejectedValue(gone);

    const res = await callBreak();

    expect(res.status).toBe(200);
    expect(mockPrisma.pact.updateMany).toHaveBeenCalled();
  });
});

describe("the happy paths", () => {
  it("cancels Stripe, then breaks, then marks the membership cancelled", async () => {
    mockPrisma.pactMembership.findUnique.mockResolvedValue(PAID_MEMBERSHIP);

    const res = await callBreak();

    expect(res.status).toBe(200);
    expect(mockCancel).toHaveBeenCalledWith("sub_live_1");
    expect(mockPrisma.pact.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "pact_1", brokenAt: null },
      }),
    );
    expect(mockPrisma.pactMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "CANCELLED" }),
      }),
    );
  });

  it("breaks a Consilium-entitled pact without calling Stripe at all", async () => {
    // Signed free under a membership: there is no pact subscription, and
    // reaching for Stripe here would 404 on an id that does not exist.
    mockPrisma.pactMembership.findUnique.mockResolvedValue(null);

    const res = await callBreak();

    expect(res.status).toBe(200);
    expect(mockCancel).not.toHaveBeenCalled();
    expect(mockPrisma.pact.updateMany).toHaveBeenCalled();
  });

  it("does not cancel Stripe for an already-cancelled membership", async () => {
    mockPrisma.pactMembership.findUnique.mockResolvedValue({
      ...PAID_MEMBERSHIP,
      status: "CANCELLED",
    });
    await callBreak();
    expect(mockCancel).not.toHaveBeenCalled();
  });
});

describe("idempotency", () => {
  it("reports success without double-counting when it lost the race", async () => {
    // The conditional update matched nothing, so a concurrent request
    // already broke it. The caller's intent is satisfied either way.
    mockPrisma.pact.updateMany.mockResolvedValue({ count: 0 });

    const res = await callBreak();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ success: true, alreadyBroken: true });
    expect(mockCapture).not.toHaveBeenCalled();
    expect(mockPrisma.pactMembership.update).not.toHaveBeenCalled();
  });

  it("counts churn exactly once on the winning request", async () => {
    await callBreak();
    expect(mockCapture).toHaveBeenCalledTimes(1);
  });

  it("scopes the break to the caller's own pact", async () => {
    await callBreak();
    const where = mockPrisma.pact.findFirst.mock.calls[0][0].where;
    expect(where.userId).toBe(USER.id);
    expect(where.brokenAt).toBeNull();
  });
});

/** Keeps the NextResponse import honest for the type checker. */
expect(typeof NextResponse).toBe("function");
