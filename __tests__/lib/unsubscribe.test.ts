/**
 * The unsubscribe token and what it writes.
 *
 * The token is signed with the same JWT_SECRET as the session cookies and
 * separated only by its audience claim, so the first group of tests is a
 * security boundary rather than a formality: if an unsubscribe token could
 * ever be presented as an access token, a link at the bottom of a
 * newsletter would be a login.
 *
 * The second group covers the write, which used to be hand-rolled
 * identically in two places and is now one helper, and the undo, which did
 * not exist. One-click unsubscribe is also one-click MISCLICK.
 */

process.env.JWT_SECRET = "test-secret-for-unsubscribe-tokens";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: jest.fn(), update: jest.fn() },
    subscriber: { findMany: jest.fn(), update: jest.fn() },
  },
}));

import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import {
  buildUnsubscribeUrl,
  signUnsubscribeToken,
  verifyUnsubscribeToken,
} from "@/lib/unsubscribe-token";
import { applyUnsubscribe } from "@/lib/unsubscribe-apply";

const mockPrisma = prisma as unknown as {
  user: { findUnique: jest.Mock; update: jest.Mock };
  subscriber: { findMany: jest.Mock; update: jest.Mock };
};

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.user.update.mockResolvedValue({});
  mockPrisma.subscriber.findMany.mockResolvedValue([]);
  mockPrisma.subscriber.update.mockResolvedValue({});
});

describe("token round trip", () => {
  it("carries a userId back intact", () => {
    const token = signUnsubscribeToken({ userId: "u1", type: "marketing" });
    expect(verifyUnsubscribeToken(token)).toEqual({
      userId: "u1",
      type: "marketing",
    });
  });

  it("lowercases an email target", () => {
    const token = signUnsubscribeToken({
      email: "Loud@Example.COM",
      type: "weeklyDigest",
    });
    expect(verifyUnsubscribeToken(token)).toEqual({
      email: "loud@example.com",
      type: "weeklyDigest",
    });
  });

  it("supports every preference key, including questionAnswered", () => {
    // The key that was missing from the queue processor's own union.
    const token = signUnsubscribeToken({
      userId: "u1",
      type: "questionAnswered",
    });
    expect(verifyUnsubscribeToken(token)?.type).toBe("questionAnswered");
  });

  it("refuses to sign with both a userId and an email, or neither", () => {
    expect(() =>
      signUnsubscribeToken({ userId: "u1", email: "a@b.c", type: "marketing" }),
    ).toThrow();
    expect(() =>
      signUnsubscribeToken({ type: "marketing" } as never),
    ).toThrow();
  });
});

describe("the audience boundary", () => {
  it("rejects a token signed for a different audience", () => {
    // Shaped exactly like a session token: same secret, no unsubscribe aud.
    const impostor = jwt.sign(
      { userId: "u1", type: "marketing" },
      process.env.JWT_SECRET!,
    );
    expect(verifyUnsubscribeToken(impostor)).toBeNull();
  });

  it("rejects a token signed with a different secret", () => {
    const forged = jwt.sign({ userId: "u1", type: "marketing" }, "not-the-secret", {
      audience: "unsubscribe",
    });
    expect(verifyUnsubscribeToken(forged)).toBeNull();
  });

  it("rejects an unknown preference key", () => {
    const bogus = jwt.sign({ userId: "u1", type: "everything" }, process.env.JWT_SECRET!, {
      audience: "unsubscribe",
    });
    expect(verifyUnsubscribeToken(bogus)).toBeNull();
  });

  it("rejects an expired token", () => {
    const stale = jwt.sign({ userId: "u1", type: "marketing" }, process.env.JWT_SECRET!, {
      audience: "unsubscribe",
      expiresIn: -10,
    });
    expect(verifyUnsubscribeToken(stale)).toBeNull();
  });

  it("rejects junk without throwing", () => {
    expect(verifyUnsubscribeToken("")).toBeNull();
    expect(verifyUnsubscribeToken("not.a.token")).toBeNull();
  });

  it("builds a URL whose token survives the round trip", () => {
    const url = buildUnsubscribeUrl(
      { userId: "u1", type: "marketing" },
      "https://kanikarose.com",
    );
    const token = decodeURIComponent(new URL(url).searchParams.get("token")!);
    expect(verifyUnsubscribeToken(token)?.userId).toBe("u1");
  });
});

describe("applyUnsubscribe", () => {
  it("writes a complete preference object, not a one-key patch", async () => {
    // The old hand-rolled spread could leave a row holding a single key.
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "u1",
      emailPreferences: null,
    });

    await applyUnsubscribe({ userId: "u1", type: "marketing" });

    const written = mockPrisma.user.update.mock.calls[0][0].data
      .emailPreferences;
    expect(written.marketing).toBe(false);
    expect(Object.keys(written)).toHaveLength(5);
  });

  it("leaves the other switches alone", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "u1",
      emailPreferences: { weeklyDigest: false },
    });

    await applyUnsubscribe({ userId: "u1", type: "marketing" });

    const written = mockPrisma.user.update.mock.calls[0][0].data
      .emailPreferences;
    expect(written.marketing).toBe(false);
    expect(written.weeklyDigest).toBe(false);
    expect(written.questionAnswered).toBe(true);
  });

  it("puts the preference back on undo", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "u1",
      emailPreferences: { marketing: false },
    });

    await applyUnsubscribe({ userId: "u1", type: "marketing" }, true);

    expect(
      mockPrisma.user.update.mock.calls[0][0].data.emailPreferences.marketing,
    ).toBe(true);
  });

  it("tags a Subscriber with no account", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.subscriber.findMany.mockResolvedValue([
      { id: "s1", tags: ["starter-pack"] },
    ]);

    const result = await applyUnsubscribe({
      email: "nobody@example.com",
      type: "marketing",
    });

    expect(result.matchedUser).toBe(false);
    expect(mockPrisma.subscriber.update).toHaveBeenCalled();
  });

  it("does not grow the tag array on a repeated unsubscribe", async () => {
    // The old updateMany pushed unconditionally, so clicking the link in
    // five old emails wrote the same tag five times.
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.subscriber.findMany.mockResolvedValue([
      { id: "s1", tags: ["unsubscribed:marketing"] },
    ]);

    await applyUnsubscribe({ email: "a@b.c", type: "marketing" });

    expect(mockPrisma.subscriber.update).not.toHaveBeenCalled();
  });

  it("removes the tag on undo", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.subscriber.findMany.mockResolvedValue([
      { id: "s1", tags: ["unsubscribed:marketing", "starter-pack"] },
    ]);

    await applyUnsubscribe({ email: "a@b.c", type: "marketing" }, true);

    expect(mockPrisma.subscriber.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { tags: ["starter-pack"] } }),
    );
  });

  it("does not fall over when the address matches nothing at all", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    await expect(
      applyUnsubscribe({ email: "ghost@example.com", type: "marketing" }),
    ).resolves.toEqual({ matchedUser: false });
  });
});
