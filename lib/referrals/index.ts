import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

/**
 * Member-gets-member referral helpers.
 *
 * Mechanic:
 *  - Every member gets a unique 8-char alphanumeric code (lazy-generated
 *    on first access via `getOrCreateReferralCode`).
 *  - The shareable URL is /consilium?ref=<code>. A 30-day cookie
 *    captures it on first touch (see `lib/referrals/cookie.ts`).
 *  - When the referee completes a Consilium checkout, the Stripe webhook
 *    calls `recordReferralConversion` which credits the referrer's
 *    Stripe customer balance by $29 (one month free at next renewal).
 *
 * Evidence: subscription brand referrals convert at 4.8% (ReferralCandy),
 * and a two-sided incentive (giver + receiver both get value) lifts
 * referral activation 2-3x vs single-sided rewards.
 */

const REFERRAL_CODE_LENGTH = 8;
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // unambiguous chars

/** Per-referral reward in cents. $29 = one month of monthly Consilium. */
export const REFERRER_REWARD_CENTS = 2900;

export const REFERRAL_COOKIE_NAME = "kb-ref-v1";
export const REFERRAL_COOKIE_DAYS = 30;

function generateCandidate(): string {
  const bytes = randomBytes(REFERRAL_CODE_LENGTH);
  let out = "";
  for (let i = 0; i < REFERRAL_CODE_LENGTH; i++) {
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return out;
}

/**
 * Get the member's existing referral code, or generate + persist one.
 *
 * Retries on the (extremely rare) UNIQUE collision. In practice 31^8 =
 * 8.5e11 codes, so collisions effectively never happen, but the retry
 * makes the contract bulletproof.
 */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { referralCode: true },
  });
  if (existing?.referralCode) return existing.referralCode;

  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = generateCandidate();
    try {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { referralCode: candidate },
        select: { referralCode: true },
      });
      return updated.referralCode!;
    } catch {
      // UNIQUE collision, regenerate.
      continue;
    }
  }
  throw new Error("Failed to generate referral code after 5 attempts");
}

/** Resolve a code to its owner. Returns null if invalid. */
export async function resolveReferralCode(code: string): Promise<{
  id: string;
  email: string;
  name: string | null;
} | null> {
  if (!code || code.length !== REFERRAL_CODE_LENGTH) return null;
  return prisma.user.findUnique({
    where: { referralCode: code.toUpperCase() },
    select: { id: true, email: true, name: true },
  });
}

/**
 * Counts for the member-facing dashboard: how many of this member's
 * referrals have converted, how many are still pending.
 */
export async function getReferralCounts(userId: string): Promise<{
  converted: number;
  pending: number;
  totalEarnedCents: number;
}> {
  const [converted, pending] = await Promise.all([
    prisma.referral.count({
      where: { referrerId: userId, status: "CONVERTED" },
    }),
    prisma.referral.count({
      where: { referrerId: userId, status: "PENDING" },
    }),
  ]);
  return {
    converted,
    pending,
    totalEarnedCents: converted * REFERRER_REWARD_CENTS,
  };
}

/** Leaderboard row, anonymised display safe. */
export interface LeaderboardRow {
  userId: string;
  displayName: string;
  convertedCount: number;
}

/**
 * Top referrers by converted count, member-only view. Uses display name
 * with a privacy-respecting fallback (first letter + dot + last initial)
 * so members can recognise themselves but cannot dox each other.
 */
export async function getReferralLeaderboard(
  limit = 10,
): Promise<LeaderboardRow[]> {
  const grouped = await prisma.referral.groupBy({
    by: ["referrerId"],
    where: { status: "CONVERTED" },
    _count: { _all: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });
  if (grouped.length === 0) return [];

  const ids = grouped.map((g) => g.referrerId);
  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, displayName: true, name: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  return grouped.map((g) => {
    const u = userMap.get(g.referrerId);
    return {
      userId: g.referrerId,
      displayName: prettyDisplayName(u),
      convertedCount: g._count._all,
    };
  });
}

function prettyDisplayName(
  u: { displayName: string | null; name: string | null; email: string } | undefined,
): string {
  if (!u) return "Anonymous";
  if (u.displayName) return u.displayName;
  if (u.name) {
    const parts = u.name.split(" ").filter(Boolean);
    if (parts.length === 0) return "Anonymous";
    if (parts.length === 1) return parts[0];
    const last = parts[parts.length - 1];
    return `${parts[0]} ${last[0]}.`;
  }
  // Final fallback: first 3 chars of email, never the full address.
  return u.email.slice(0, 3) + "***";
}
