import type { MembershipStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  checkMembership,
  type MembershipCheck,
} from "@/lib/community/membership";
import { checkPactMembership } from "@/lib/pact/membership";

/**
 * Who is asking.
 *
 * - `anon`   no session at all. Send them to login.
 * - `free`   signed in, no live paid tier. Gets the free tier.
 * - `pact`   a live Blood Pact subscription and nothing else. The training
 *            rung: the full catalog, the Lab, the Mark, the program, the
 *            Pact itself. NOT Kanika's rooms.
 * - `member` a live Consilium membership, or an admin previewing one. The
 *            top rung: everything `pact` opens PLUS Kanika herself (the
 *            feed, Ask Kanika, voice notes, videos, DMs, the member book
 *            price).
 *
 * The ladder (decided 2026-08-05): the tiers are rungs, not doors to the
 * same room. The Pact sells training; the Consilium sells Kanika. If both
 * granted the same access, the cheaper one would cannibalise the $29 base
 * the day its checkout opened.
 *
 * This wraps `checkMembership` rather than replacing it: that function owns
 * the consilium state machine (lazy expiry, the CANCELLED-but-still-paid
 * window, the APPROVED grace period) and all of it still applies. An active
 * $29 member is entitled to everything the Pact unlocks without a second
 * subscription (decided 2026-08-02), so consilium membership short-circuits
 * the pact query entirely.
 */
export type AccessTier = "anon" | "free" | "pact" | "member";

export interface Access {
  tier: AccessTier;
  userId: string | null;
  /**
   * Shorthand for `tier === "member"`: a live CONSILIUM membership. A
   * pact-only subscriber is NOT a member; use `canTrain` for "any paid
   * rung".
   */
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
  /**
   * The caller may use Blood Pact surfaces without paying again. True for a
   * live pact subscription AND for a live consilium membership (which
   * includes the Pact). Entitlement is billing only: whether they have
   * actually signed a pact (chosen a preset, drawn the signature) is a Pact
   * row, read by the pact pages themselves.
   */
  pactEntitled: boolean;
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
    pactEntitled: false,
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
      pactEntitled: true,
      reason: null,
    };
  }

  // Read the ban directly rather than inferring it from the SUSPENDED
  // status. `checkMembership` returns SUSPENDED for a ban AND for a failed
  // payment, and tells them apart only by whether it set a redirectUrl,
  // which is presentation detail and far too fragile to gate access on.
  // The pact check rides in the same round trip.
  const [user, pact] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { isBanned: true },
    }),
    checkPactMembership(userId),
  ]);
  const isBanned = user?.isBanned ?? false;

  if (pact.entitled && !isBanned) {
    return {
      // The training rung, NOT "member". This line is the whole ladder:
      // before it, a $4.99/wk pact subscriber was indistinguishable from
      // a $29 consilium member, and the cheaper price would have hollowed
      // out the membership the day pact checkout opened.
      tier: "pact",
      userId,
      isMember: false,
      isBanned: false,
      status: check.status,
      membership: check.membership,
      pactEntitled: true,
      reason: null,
    };
  }

  return {
    tier: "free",
    userId,
    isMember: false,
    isBanned,
    status: check.status,
    membership: check.membership,
    pactEntitled: false,
    reason: check.reason ?? null,
  };
}

/** Free tier or better. Anonymous callers are excluded. */
export function isSignedIn(access: Access): boolean {
  return access.tier !== "anon";
}

/**
 * Whether a CONSILIUM-only surface should serve this caller: Kanika's
 * rooms (feed, Ask Kanika, voice notes, videos, DMs, member book price).
 * Banned accounts fail here too, so a route that only asks this question
 * cannot leak.
 */
export function canAccessMemberOnly(access: Access): boolean {
  return access.isMember && !access.isBanned;
}

/**
 * Whether a TRAINING surface should serve this caller: the full catalog,
 * the Lab, the Mark, the program, the Pact journal. True for any paid
 * rung, pact or consilium. This is what the pact subscriber buys; the
 * consilium member has it included.
 */
export function canTrain(access: Access): boolean {
  return (
    (access.tier === "pact" || access.tier === "member") && !access.isBanned
  );
}
