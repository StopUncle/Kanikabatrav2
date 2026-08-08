/**
 * Two privilege boundaries that were wider than anyone intended.
 *
 * 1. `checkAccessTier` governs forum, chat and classroom. Its `PUBLIC`
 *    branch returned `hasAccess: true` without even looking at the userId,
 *    and `PUBLIC` is the schema DEFAULT for both Category and ChatRoom. The
 *    pages for those surfaces have redirected to the feed since 2026-07-02,
 *    which hid it: a page redirect is not an API gate, and twelve routes
 *    under app/api/community stayed live behind this function.
 *
 * 2. `isAdmin` returns true for MODERATOR, and it was the only check on
 *    voice-note and video upload. So a moderator could publish a voice note
 *    under Kanika's name to every paying member, while the same account was
 *    refused by every /api/admin route.
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: jest.fn() },
    purchase: { findMany: jest.fn() },
  },
}));

jest.mock("@/lib/access/tier", () => ({
  getAccess: jest.fn(),
  canAccessMemberOnly: jest.fn(),
}));

import { prisma } from "@/lib/prisma";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";
import { checkAccessTier } from "@/lib/community/access";
import { isAdmin, canPublishAsKanika } from "@/lib/community/membership";

const mockPrisma = prisma as unknown as {
  user: { findUnique: jest.Mock };
  purchase: { findMany: jest.Mock };
};
const mockGetAccess = getAccess as jest.Mock;
const mockMemberOnly = canAccessMemberOnly as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetAccess.mockResolvedValue({ tier: "member" });
  mockMemberOnly.mockReturnValue(true);
  mockPrisma.purchase.findMany.mockResolvedValue([]);
});

describe("checkAccessTier requires membership first", () => {
  it("refuses an anonymous caller even for a PUBLIC category", () => {
    // THE HOLE. PUBLIC is the schema default, so a category created
    // without an explicit tier was open to the entire internet.
    return expect(checkAccessTier(null, "PUBLIC")).resolves.toMatchObject({
      hasAccess: false,
    });
  });

  it("refuses a signed-in NON-member for a PUBLIC category", async () => {
    mockMemberOnly.mockReturnValue(false);
    const result = await checkAccessTier("free_user", "PUBLIC");
    expect(result.hasAccess).toBe(false);
    expect(result.reason).toMatch(/membership/i);
    expect(result.upgradeUrl).toBe("/consilium/apply");
  });

  it("refuses a PACT subscriber: forum and chat are Kanika's rooms", async () => {
    // canAccessMemberOnly is false for the pact tier, which is the whole
    // ladder. A training subscriber does not get the member rooms.
    mockGetAccess.mockResolvedValue({ tier: "pact" });
    mockMemberOnly.mockReturnValue(false);
    const result = await checkAccessTier("pact_user", "PUBLIC");
    expect(result.hasAccess).toBe(false);
  });

  it("admits a member for PUBLIC and REGISTERED", async () => {
    await expect(checkAccessTier("member_1", "PUBLIC")).resolves.toMatchObject({
      hasAccess: true,
    });
    await expect(
      checkAccessTier("member_1", "REGISTERED"),
    ).resolves.toMatchObject({ hasAccess: true });
  });

  it("still narrows further for a purchase-gated tier", async () => {
    // Membership is the baseline, not a bypass: BOOK_OWNER still needs
    // the book on top of it.
    mockPrisma.purchase.findMany.mockResolvedValue([]);
    await expect(
      checkAccessTier("member_1", "BOOK_OWNER"),
    ).resolves.toMatchObject({ hasAccess: false });

    mockPrisma.purchase.findMany.mockResolvedValue([{ type: "BOOK" }]);
    await expect(
      checkAccessTier("member_1", "BOOK_OWNER"),
    ).resolves.toMatchObject({ hasAccess: true });
  });

  it("never runs a purchase query for a caller it has already refused", async () => {
    mockMemberOnly.mockReturnValue(false);
    await checkAccessTier("free_user", "PREMIUM");
    expect(mockPrisma.purchase.findMany).not.toHaveBeenCalled();
  });
});

describe("publishing as Kanika is narrower than moderating", () => {
  it("lets a MODERATOR moderate", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ role: "MODERATOR" });
    await expect(isAdmin("mod_1")).resolves.toBe(true);
  });

  it("refuses a MODERATOR the right to publish", async () => {
    // The fix. Hiding a comment and speaking as Kanika to every paying
    // member are not the same privilege and no longer share a check.
    mockPrisma.user.findUnique.mockResolvedValue({ role: "MODERATOR" });
    await expect(canPublishAsKanika("mod_1")).resolves.toBe(false);
  });

  it("lets an ADMIN do both", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ role: "ADMIN" });
    await expect(isAdmin("admin_1")).resolves.toBe(true);
    await expect(canPublishAsKanika("admin_1")).resolves.toBe(true);
  });

  it("refuses an ordinary member and an unknown user", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ role: "MEMBER" });
    await expect(canPublishAsKanika("member_1")).resolves.toBe(false);
    mockPrisma.user.findUnique.mockResolvedValue(null);
    await expect(canPublishAsKanika("ghost")).resolves.toBe(false);
    await expect(isAdmin("ghost")).resolves.toBe(false);
  });
});
