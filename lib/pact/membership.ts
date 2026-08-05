import type { MembershipStatus, PactMembership } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface PactCheck {
  /** A live, paid-for pact subscription (or paid-through window). */
  entitled: boolean;
  status: MembershipStatus | null;
  membership: PactMembership | null;
}

/**
 * The Blood Pact's billing state machine, mirroring
 * lib/community/membership.ts checkMembership for the states a pact can be
 * in. Deliberately smaller: no PENDING/APPROVED legacy, no admin bypass
 * (getAccess handles callers, not cookies), no redirect URLs (the app shell
 * decides where non-members land).
 *
 * - ACTIVE past expiresAt is lazily flipped to EXPIRED, with an optimistic
 *   status guard so a concurrent renewal webhook is not stomped.
 * - CANCELLED but still inside the paid window keeps entitlement, same as
 *   consilium: they paid for the time.
 * - SUSPENDED (dunning, pause) is not entitled but also not scarred; the
 *   pact itself only breaks on deletion or refund (lib/pact/billing.ts).
 */
export async function checkPactMembership(
  userId: string,
): Promise<PactCheck> {
  const membership = await prisma.pactMembership.findUnique({
    where: { userId },
  });
  if (!membership) {
    return { entitled: false, status: null, membership: null };
  }

  const now = new Date();

  if (
    membership.status === "CANCELLED" &&
    membership.expiresAt &&
    membership.expiresAt > now
  ) {
    return { entitled: true, status: membership.status, membership };
  }

  if (membership.status === "ACTIVE") {
    // Same 24h grace as checkMembership: weekly billing means the
    // expiresAt-passed-but-invoice-in-flight window recurs every single
    // week, and a page view must not demote a paying subscriber during
    // ordinary billing lag. The renewal webhook can reactivate an EXPIRED
    // row regardless (shouldReactivate includes EXPIRED).
    const EXPIRY_GRACE_MS = 24 * 60 * 60 * 1000;
    if (
      membership.expiresAt &&
      membership.expiresAt.getTime() < now.getTime() - EXPIRY_GRACE_MS
    ) {
      await prisma.pactMembership.updateMany({
        where: { id: membership.id, status: "ACTIVE" },
        data: { status: "EXPIRED" },
      });
      return {
        entitled: false,
        status: "EXPIRED",
        membership: { ...membership, status: "EXPIRED" },
      };
    }
    return { entitled: true, status: "ACTIVE", membership };
  }

  return { entitled: false, status: membership.status, membership };
}
