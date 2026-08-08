/**
 * The reads behind Ask Kanika.
 *
 * The anonymity tests are the point of this file. `MemberQuestion.userId`
 * is ALWAYS stored, including for an anonymous ask, because Kanika needs
 * to know who she is answering and the admin surface has a deliberate
 * reveal button. That means the only thing standing between an anonymous
 * question and a member's name is the mapping in `readAskQueue`. If a
 * future select ever returns the raw row to the client, the name goes with
 * it, and the promise the toggle makes is broken silently.
 *
 * So: the mask is asserted, and the absence of identifying fields on the
 * way out is asserted separately, because a correct `author` next to a
 * leaked `userId` is still a leak.
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    memberQuestion: { findMany: jest.fn() },
  },
}));

jest.mock("@/lib/questions/settings", () => ({
  getQuestionSettings: jest.fn(),
}));

jest.mock("@/lib/questions/cooldown", () => ({
  checkAskCooldown: jest.fn(),
}));

import { prisma } from "@/lib/prisma";
import {
  hasUnreadAnswer,
  readAskQueue,
  readMyQuestions,
  type MyQuestion,
} from "@/lib/questions/read";

const mockPrisma = prisma as unknown as {
  memberQuestion: { findMany: jest.Mock };
};

const VIEWER = "viewer_1";

function row(over: Record<string, unknown> = {}) {
  return {
    id: "q1",
    content: "How do I read a room faster?",
    isAnonymous: false,
    upvoteCount: 3,
    createdAt: new Date("2026-08-01T00:00:00Z"),
    userId: "asker_1",
    user: { displayName: "Vera", name: "Vera S" },
    upvotes: [],
    ...over,
  };
}

beforeEach(() => jest.clearAllMocks());

describe("anonymity", () => {
  it("returns no author for an anonymous question", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([
      row({ isAnonymous: true }),
    ]);
    const [q] = await readAskQueue(VIEWER);
    expect(q.author).toBeNull();
  });

  it("never emits the asker's identity in any field", async () => {
    // The real protection. A leaked userId is as bad as a leaked name:
    // the app has public profiles at /u/[handle].
    mockPrisma.memberQuestion.findMany.mockResolvedValue([
      row({ isAnonymous: true }),
    ]);
    const [q] = await readAskQueue(VIEWER);
    const serialised = JSON.stringify(q);
    expect(serialised).not.toContain("asker_1");
    expect(serialised).not.toContain("Vera");
    expect(q).not.toHaveProperty("userId");
    expect(q).not.toHaveProperty("user");
    expect(q).not.toHaveProperty("isAnonymous");
  });

  it("masks even when the asker is the viewer", async () => {
    // Their own anonymous question is still anonymous on the public list;
    // "yours" is signalled by isMine, not by unmasking the name.
    mockPrisma.memberQuestion.findMany.mockResolvedValue([
      row({ isAnonymous: true, userId: VIEWER }),
    ]);
    const [q] = await readAskQueue(VIEWER);
    expect(q.author).toBeNull();
    expect(q.isMine).toBe(true);
  });

  it("shows the display name when the ask is not anonymous", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([row()]);
    const [q] = await readAskQueue(VIEWER);
    expect(q.author).toBe("Vera");
  });

  it("falls back through displayName, name, then Member", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([
      row({ user: { displayName: null, name: "Vera S" } }),
      row({ id: "q2", user: { displayName: null, name: null } }),
    ]);
    const out = await readAskQueue(VIEWER);
    expect(out[0].author).toBe("Vera S");
    expect(out[1].author).toBe("Member");
  });
});

describe("viewer annotations", () => {
  it("marks a question the viewer has upvoted", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([
      row({ upvotes: [{ id: "uv1" }] }),
    ]);
    expect((await readAskQueue(VIEWER))[0].hasUpvoted).toBe(true);
  });

  it("marks a question the viewer did not upvote", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([row()]);
    expect((await readAskQueue(VIEWER))[0].hasUpvoted).toBe(false);
  });

  it("scopes the upvote lookup to the viewer, not to everyone", async () => {
    // Without the where clause the list would report every question as
    // upvoted the moment anyone voted on it.
    mockPrisma.memberQuestion.findMany.mockResolvedValue([]);
    await readAskQueue(VIEWER);
    const select = mockPrisma.memberQuestion.findMany.mock.calls[0][0].select;
    expect(select.upvotes.where).toEqual({ userId: VIEWER });
  });

  it("only lists PENDING questions", async () => {
    // Answered ones live on the answering post; showing them here would
    // invite votes on something already recorded.
    mockPrisma.memberQuestion.findMany.mockResolvedValue([]);
    await readAskQueue(VIEWER);
    const args = mockPrisma.memberQuestion.findMany.mock.calls[0][0];
    expect(args.where).toEqual({ status: "PENDING" });
    expect(args.orderBy).toEqual([
      { upvoteCount: "desc" },
      { createdAt: "desc" },
    ]);
  });

  it("asks only for the caller's own history", async () => {
    mockPrisma.memberQuestion.findMany.mockResolvedValue([]);
    await readMyQuestions(VIEWER);
    expect(mockPrisma.memberQuestion.findMany.mock.calls[0][0].where).toEqual({
      userId: VIEWER,
    });
  });
});

describe("hasUnreadAnswer", () => {
  const mine = (over: Partial<MyQuestion>): MyQuestion => ({
    id: "q1",
    content: "c",
    status: "ANSWERED",
    answeredAt: new Date(),
    createdAt: new Date(),
    answerPost: null,
    ...over,
  });

  it("is true for an answer inside the 14 day window", () => {
    expect(hasUnreadAnswer([mine({})])).toBe(true);
  });

  it("is false once the answer is older than the window", () => {
    const old = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    expect(hasUnreadAnswer([mine({ answeredAt: old })])).toBe(false);
  });

  it("ignores questions that are not answered", () => {
    expect(hasUnreadAnswer([mine({ status: "PENDING" })])).toBe(false);
    expect(
      hasUnreadAnswer([mine({ status: "ANSWERED", answeredAt: null })]),
    ).toBe(false);
  });

  it("is false on an empty history", () => {
    expect(hasUnreadAnswer([])).toBe(false);
  });
});
