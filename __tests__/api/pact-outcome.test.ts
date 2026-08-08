/**
 * How a week ends: keeping it, taking that back, and owning a miss.
 *
 * The invariant these exist to protect is the one that is easiest to break
 * with a well-meaning change: OWNING A MISS DOES NOT BUY A LIGHTER MARK.
 * The moment self-reporting produces something less than a scar, honesty
 * becomes the strategic answer, everybody starts choosing it, and the
 * record stops describing what actually happened.
 *
 * The second is that undo is bounded to the live week. An undo that works
 * afterwards makes every kept week provisional.
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    pactEntry: { updateMany: jest.fn() },
  },
}));

jest.mock("@/lib/auth/middleware", () => ({ requireAuth: jest.fn() }));
jest.mock("@/lib/pact/read", () => ({ readPact: jest.fn() }));
jest.mock("@/lib/access/tier", () => ({ getAccess: jest.fn() }));
jest.mock("@/lib/analytics/server", () => ({ captureServerAsync: jest.fn() }));
jest.mock("@/lib/analytics/events", () => ({
  ANALYTICS_EVENTS: {
    PACT_WEEK_KEPT: "pact_week_kept",
    PACT_WEEK_SCARRED: "pact_week_scarred",
    PACT_WEEK_MISSED_OWNED: "pact_week_missed_owned",
    PACT_KEEP_UNDONE: "pact_keep_undone",
  },
}));
jest.mock("@/lib/program/ai/safety", () => ({
  classifyEntry: jest.fn(),
  CRISIS_CARD: "CRISIS CARD TEXT",
}));

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { readPact } from "@/lib/pact/read";
import { getAccess } from "@/lib/access/tier";
import { captureServerAsync } from "@/lib/analytics/server";
import { classifyEntry } from "@/lib/program/ai/safety";
import { POST as keepPost, DELETE as keepDelete } from "@/app/api/pact/keep/route";
import { POST as missPost } from "@/app/api/pact/miss/route";

const mockPrisma = prisma as unknown as {
  pactEntry: { updateMany: jest.Mock };
};
const mockRequireAuth = requireAuth as jest.Mock;
const mockReadPact = readPact as jest.Mock;
const mockGetAccess = getAccess as jest.Mock;
const mockCapture = captureServerAsync as jest.Mock;
const mockClassify = classifyEntry as jest.Mock;

const USER = { id: "u1" };
const FUTURE = new Date(Date.now() + 3 * 86_400_000);
const PAST = new Date(Date.now() - 86_400_000);

function readState(over: Record<string, unknown> = {}) {
  return {
    pact: { id: "p1", preset: "confidence" },
    weekNumber: 3,
    weekEndsAt: FUTURE,
    entry: { id: "e1", status: "open", claimedAt: null },
    ...over,
  };
}

/** Drive a handler the way requireAuth does, with a fixed caller. */
function run(handler: (r: never) => Promise<Response>, body: unknown = {}) {
  mockRequireAuth.mockImplementation(
    async (_req: unknown, cb: (r: unknown, u: unknown) => Promise<Response>) =>
      cb({ json: async () => body }, USER),
  );
  return handler({} as never);
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetAccess.mockResolvedValue({ pactEntitled: true });
  mockReadPact.mockResolvedValue(readState());
  mockPrisma.pactEntry.updateMany.mockResolvedValue({ count: 1 });
  mockClassify.mockResolvedValue({ crisis: false });
});

describe("keeping a week", () => {
  it("records an optional difficulty on the challenge", async () => {
    const res = await run(keepPost, { difficulty: 8 });
    expect(res.status).toBe(200);
    expect(mockPrisma.pactEntry.updateMany.mock.calls[0][0].data).toMatchObject({
      status: "kept",
      difficulty: 8,
    });
  });

  it("keeps the week even when the rating is junk", async () => {
    // Losing a rating must never cost somebody the keep it came with.
    await run(keepPost, { difficulty: 99 });
    const data = mockPrisma.pactEntry.updateMany.mock.calls[0][0].data;
    expect(data.status).toBe("kept");
    expect(data).not.toHaveProperty("difficulty");
  });

  it("guards the write on the week still being open", async () => {
    await run(keepPost, {});
    expect(mockPrisma.pactEntry.updateMany.mock.calls[0][0].where).toMatchObject(
      { status: "open" },
    );
  });
});

describe("undoing a keep", () => {
  it("reopens the week and clears the rating", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "kept", claimedAt: null } }),
    );
    const res = await run(keepDelete);
    expect(res.status).toBe(200);
    expect(mockPrisma.pactEntry.updateMany.mock.calls[0][0].data).toEqual({
      status: "open",
      difficulty: null,
    });
  });

  it("refuses once the week has closed", async () => {
    // The bound that stops every kept week being provisional.
    mockReadPact.mockResolvedValue(
      readState({
        weekEndsAt: PAST,
        entry: { id: "e1", status: "kept", claimedAt: null },
      }),
    );
    const res = await run(keepDelete);
    expect(res.status).toBe(409);
    expect(mockPrisma.pactEntry.updateMany).not.toHaveBeenCalled();
  });

  it("refuses to undo a scar", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "scarred", claimedAt: null } }),
    );
    const res = await run(keepDelete);
    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({ error: expect.stringMatching(/scar/i) });
  });

  it("guards against a racing scar pass", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "kept", claimedAt: null } }),
    );
    await run(keepDelete);
    expect(mockPrisma.pactEntry.updateMany.mock.calls[0][0].where).toMatchObject(
      { status: "kept" },
    );
  });
});

describe("owning a miss", () => {
  it("scars the week exactly as a lapse would", async () => {
    // THE INVARIANT. Same status, no discount, no softer state.
    const res = await run(missPost, { reason: "nerve" });
    expect(res.status).toBe(200);
    const data = mockPrisma.pactEntry.updateMany.mock.calls[0][0].data;
    expect(data.status).toBe("scarred");
    expect(data.claimedAt).toBeInstanceOf(Date);
    expect(data.missReason).toBe("nerve");
  });

  it("requires a reason", async () => {
    const res = await run(missPost, { note: "it was hard" });
    expect(res.status).toBe(400);
    expect(mockPrisma.pactEntry.updateMany).not.toHaveBeenCalled();
  });

  it("rejects a reason that is not on the list", async () => {
    const res = await run(missPost, { reason: "lazy" });
    expect(res.status).toBe(400);
  });

  it("stores the note and a difficulty", async () => {
    await run(missPost, { reason: "life", note: "  hospital  ", difficulty: 9 });
    const data = mockPrisma.pactEntry.updateMany.mock.calls[0][0].data;
    expect(data.missNote).toBe("hospital");
    expect(data.difficulty).toBe(9);
  });

  it("runs the note through the crisis classifier", async () => {
    // "What was hard" is exactly where a serious disclosure lands. An
    // unmonitored channel for those would be worse than not asking.
    await run(missPost, { reason: "life", note: "something serious" });
    expect(mockClassify).toHaveBeenCalledWith("something serious");
  });

  it("flags the entry and returns the human card on a crisis signal", async () => {
    mockClassify.mockResolvedValue({ crisis: true });
    const res = await run(missPost, { reason: "life", note: "a hard thing" });
    const body = await res.json();
    expect(body).toMatchObject({ flagged: true, card: "CRISIS CARD TEXT" });
    expect(
      mockPrisma.pactEntry.updateMany.mock.calls[0][0].data.flagged,
    ).toBe(true);
  });

  it("does not flag when there is no note to classify", async () => {
    mockClassify.mockResolvedValue({ crisis: true });
    const res = await run(missPost, { reason: "forgot" });
    const body = await res.json();
    expect(body.flagged).toBe(false);
  });

  it("refuses a week already marked kept, and says to undo first", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "kept", claimedAt: null } }),
    );
    const res = await run(missPost, { reason: "forgot" });
    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({
      error: expect.stringMatching(/undo/i),
    });
  });

  it("lets a lapsed week still be claimed", async () => {
    // The scar pass may have beaten them by hours. The whole point is to
    // let them say what happened, so a lapse must not close the door.
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "scarred", claimedAt: null } }),
    );
    const res = await run(missPost, { reason: "forgot" });
    expect(res.status).toBe(200);
  });

  it("refuses to answer for the same week twice", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "scarred", claimedAt: new Date() } }),
    );
    const res = await run(missPost, { reason: "forgot" });
    expect(res.status).toBe(409);
  });

  it("still fires the churn metric for a week that had not lapsed", async () => {
    // PACT_WEEK_SCARRED is the churn leading indicator and the scar pass
    // is what normally fires it. An owned miss on a live week never
    // reaches that pass, so it must fire here or the metric under-counts.
    await run(missPost, { reason: "nerve" });
    const events = mockCapture.mock.calls.map((c) => c[1]);
    expect(events).toContain("pact_week_scarred");
    expect(events).toContain("pact_week_missed_owned");
  });

  it("does not double-count a week that had already lapsed", async () => {
    mockReadPact.mockResolvedValue(
      readState({ entry: { id: "e1", status: "scarred", claimedAt: null } }),
    );
    await run(missPost, { reason: "forgot" });
    const events = mockCapture.mock.calls.map((c) => c[1]);
    expect(events).not.toContain("pact_week_scarred");
    expect(events).toContain("pact_week_missed_owned");
  });
});

describe("entitlement", () => {
  it.each([
    ["keep", keepPost],
    ["undo", keepDelete],
    ["miss", missPost],
  ])("403s a lapsed account on %s", async (_label, handler) => {
    mockGetAccess.mockResolvedValue({ pactEntitled: false });
    const res = await run(handler as never, { reason: "forgot" });
    expect(res.status).toBe(403);
    expect(mockPrisma.pactEntry.updateMany).not.toHaveBeenCalled();
  });
});
