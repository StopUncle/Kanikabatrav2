import type { MembershipStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  checkMembership,
  type MembershipCheck,
} from "@/lib/community/membership";

/**
 * Who is asking.
 *
 * - `anon`   no session at all. Send them to login.
 * - `free`   signed in, no live membership. Gets the free tier.
 * - `member` a live Consilium membership, or an admin previewing one.
 *
 * This is the single predicate the app gates on. It wraps `checkMembership`
 * rather than replacing it: that function owns the membership state machine
 * (lazy expiry, the CANCELLED-but-still-paid window, the APPROVED grace
 * period) and all of it still applies. What changes is the answer for
 * "authenticated, not a member", which used to be a redirect and is now a
 * tier.
 */
export type AccessTier = "anon" | "free" | "member";

export interface Access {
  tier: AccessTier;
  userId: string | null;
  /** Shorthand for `tier === "member"`. */
  isMember: boolean;
  /**
   * The account is banned.
   *
   * Callers MUST refuse a banned account rather than serving it the free
   * tier. This is deliberately a separate flag instead of a fourth tier:
   * `checkMembership` reports both a ban and a failed payment as
   * `status: "SUSPENDED"`, and under the free tier those two have to
   * diverge. A suspended-for-payment member is exactly who the free tier is
   * for. A banned account served the free tier would be an unban.
   *
   * `tier` is still reported as `free` for a banned account so callers can
   * tell "banned" apart from "logged out" (returning `anon` for someone
   * holding a valid session invites a login redirect loop). The ban is the
   * caller's to enforce; `app/hub/layout.tsx` does it at the shell.
   */
  isBanned: boolean;
  status: MembershipStatus | null;
  membership: MembershipCheck["membership"];
  /** Why access is limited, when there is something worth showing. */
  reason: string | null;
}

function anon(): Access {
  return {
    tier: "anon",
    userId: null,
    isMember: false,
    isBanned: false,
    status: null,
    membership: null,
    reason: null,
  };
}

/**
 * Resolve the caller's access tier.
 *
 * Deliberately NOT memoised. React's `cache` is only defined in the server
 * component runtime, which would make this module unloadable from a test or a
 * client import for a dedup win the architecture does not need: the shell
 * resolves access once and passes it down, so the repeat calls it would
 * collapse mostly do not happen.
 *
 * Costs up to three queries for a non-member (the admin-cookie check, the
 * membership row, the ban lookup). Resolve it once per request and thread the
 * result rather than calling it per component.
 *
 * Note on `billingCycle: "trial"`: the value exists in the schema but nothing
 * writes it today, so nothing here reads it. Free accounts are the absence of
 * a live membership, not a membership in a trial state.
 */
export async function getAccess(userId: string | null): Promise<Access> {
  if (!userId) return anon();

  const check = await checkMembership(userId);

  if (check.isMember) {
    return {
      tier: "member",
      userId,
      isMember: true,
      isBanned: false,
      status: check.status,
      membership: check.membership,
      reason: null,
    };
  }

  // Read the ban directly rather than inferring it from the SUSPENDED
  // status. `checkMembership` returns SUSPENDED for a ban AND for a failed
  // payment, and tells them apart only by whether it set a redirectUrl,
  // which is presentation detail and far too fragile to gate access on.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isBanned: true },
  });

  return {
    tier: "free",
    userId,
    isMember: false,
    isBanned: user?.isBanned ?? false,
    status: check.status,
    membership: check.membership,
    reason: check.reason ?? null,
  };
}

/** Free tier or better. Anonymous callers are excluded. */
export function isSignedIn(access: Access): boolean {
  return access.tier !== "anon";
}

/**
 * Whether a member-only surface should serve this caller. Banned accounts
 * fail here too, so a route that only asks this question cannot leak.
 */
export function canAccessMemberOnly(access: Access): boolean {
  return access.isMember && !access.isBanned;
}
