import { getAccess, canAccessMemberOnly, isSignedIn } from "@/lib/access/tier";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: { user: { findUnique: jest.fn() } },
}));

jest.mock("@/lib/community/membership", () => ({
  checkMembership: jest.fn(),
}));

jest.mock("@/lib/pact/membership", () => ({
  checkPactMembership: jest.fn(),
}));

import { checkPactMembership } from "@/lib/pact/membership";

const mockCheck = checkMembership as jest.MockedFunction<typeof checkMembership>;
const mockUser = prisma.user.findUnique as jest.Mock;
const mockPact = checkPactMembership as jest.MockedFunction<
  typeof checkPactMembership
>;

/**
 * getAccess is the predicate the whole free tier gates on, so the cases that
 * matter are the ones where "not a member" must NOT mean "free": a banned
 * account, and the states checkMembership resolves to isMember before we ever
 * see them.
 */

function membershipCheck(over: Partial<Awaited<ReturnType<typeof checkMembership>>> = {}) {
  return {
    isMember: false,
    status: null,
    membership: null,
    ...over,
  } as Awaited<ReturnType<typeof checkMembership>>;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockUser.mockResolvedValue({ isBanned: false });
  mockPact.mockResolvedValue({ entitled: false, status: null, membership: null });
});

describe("getAccess", () => {
  it("returns anon for no session and never touches the database", async () => {
    const access = await getAccess(null);

    expect(access.tier).toBe("anon");
    expect(access.isMember).toBe(false);
    expect(access.userId).toBeNull();
    expect(mockCheck).not.toHaveBeenCalled();
    expect(mockUser).not.toHaveBeenCalled();
  });

  it("returns member for a live membership", async () => {
    mockCheck.mockResolvedValue(membershipCheck({ isMember: true, status: "ACTIVE" }));

    const access = await getAccess("u1");

    expect(access.tier).toBe("member");
    expect(access.isMember).toBe(true);
    expect(access.isBanned).toBe(false);
    // A member is resolved without the extra ban lookup.
    expect(mockUser).not.toHaveBeenCalled();
  });

  it("returns free for an authenticated non-member instead of redirecting", async () => {
    mockCheck.mockResolvedValue(
      membershipCheck({ reason: "Not a member", redirectUrl: "/consilium" }),
    );

    const access = await getAccess("u2");

    expect(access.tier).toBe("free");
    expect(access.isMember).toBe(false);
    expect(access.isBanned).toBe(false);
  });

  it("puts an expired membership on the free tier, not out of the app", async () => {
    // This is the path the 14 gift memberships land on at expiry (M11).
    mockCheck.mockResolvedValue(
      membershipCheck({ status: "EXPIRED", reason: "Membership expired" }),
    );

    const access = await getAccess("u3");

    expect(access.tier).toBe("free");
    expect(access.isBanned).toBe(false);
  });

  it("puts a payment-failed SUSPENDED membership on the free tier", async () => {
    mockCheck.mockResolvedValue(membershipCheck({ status: "SUSPENDED" }));
    mockUser.mockResolvedValue({ isBanned: false });

    const access = await getAccess("u4");

    expect(access.tier).toBe("free");
    expect(access.isBanned).toBe(false);
  });

  it("flags a banned account even though checkMembership reports it as SUSPENDED", async () => {
    // The regression this guards: a ban and a failed payment are both
    // SUSPENDED. Serving the banned one the free tier would be an unban.
    mockCheck.mockResolvedValue(membershipCheck({ status: "SUSPENDED" }));
    mockUser.mockResolvedValue({ isBanned: true });

    const access = await getAccess("u5");

    expect(access.isBanned).toBe(true);
    expect(canAccessMemberOnly(access)).toBe(false);
  });

  it("returns member for a live Blood Pact with no consilium membership", async () => {
    mockCheck.mockResolvedValue(membershipCheck());
    mockPact.mockResolvedValue({
      entitled: true,
      status: "ACTIVE",
      membership: null,
    });

    const access = await getAccess("p1");

    expect(access.tier).toBe("member");
    expect(access.isMember).toBe(true);
    expect(access.pactEntitled).toBe(true);
  });

  it("marks a consilium member pact-entitled without querying the pact", async () => {
    // The inclusion decision: an active $29 member gets the Pact for free,
    // and resolving them must not cost a pact lookup.
    mockCheck.mockResolvedValue(membershipCheck({ isMember: true, status: "ACTIVE" }));

    const access = await getAccess("p2");

    expect(access.pactEntitled).toBe(true);
    expect(mockPact).not.toHaveBeenCalled();
  });

  it("refuses a banned account the pact door", async () => {
    mockCheck.mockResolvedValue(membershipCheck({ status: "SUSPENDED" }));
    mockUser.mockResolvedValue({ isBanned: true });
    mockPact.mockResolvedValue({
      entitled: true,
      status: "ACTIVE",
      membership: null,
    });

    const access = await getAccess("p3");

    expect(access.tier).toBe("free");
    expect(access.isBanned).toBe(true);
    expect(canAccessMemberOnly(access)).toBe(false);
  });

  it("treats a missing user row as not banned rather than throwing", async () => {
    mockCheck.mockResolvedValue(membershipCheck());
    mockUser.mockResolvedValue(null);

    const access = await getAccess("u6");

    expect(access.tier).toBe("free");
    expect(access.isBanned).toBe(false);
  });
});

describe("guards", () => {
  it("isSignedIn excludes anon and includes free", async () => {
    mockCheck.mockResolvedValue(membershipCheck());

    expect(isSignedIn(await getAccess(null))).toBe(false);
    expect(isSignedIn(await getAccess("u7"))).toBe(true);
  });

  it("canAccessMemberOnly excludes free", async () => {
    mockCheck.mockResolvedValue(membershipCheck());

    expect(canAccessMemberOnly(await getAccess("u8"))).toBe(false);
  });

  it("canAccessMemberOnly admits a clean member", async () => {
    mockCheck.mockResolvedValue(membershipCheck({ isMember: true, status: "ACTIVE" }));

    expect(canAccessMemberOnly(await getAccess("u9"))).toBe(true);
  });
});
