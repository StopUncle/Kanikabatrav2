import type { Prisma, PrismaClient, StandingSource } from "@prisma/client";
import { ringForStanding } from "./config";
import { notifyRankUp } from "@/lib/push/rank-up";

/**
 * The ONE writer for Standing. Appends a StandingEvent, bumps the
 * denormalized User.standing, and recomputes ringLevel.
 *
 * Concurrency: the standing bump is a DB-side increment, and the ring is
 * derived from the post-increment total that update() returns, so two
 * grants landing at once each see a total that includes the other and
 * the ring can only converge upward, never regress.
 *
 * Self-protecting like bumpDailyStreak: every caller sits on a
 * non-critical path (a scenario completing, a comment posting), so a
 * Standing hiccup must never 500 the action that triggered it. It logs
 * and returns { granted: false } instead of throwing.
 */

export interface GrantResult {
  granted: boolean;
  amount: number;
  newStanding: number;
  ringLevel: number;
  /** Set when this grant crossed a threshold: the ceremony trigger. */
  rangUp: { fromLevel: number; toLevel: number; ringName: string } | null;
  /**
   * True only when the grant errored out (not when dedupe made it a
   * no-op). Callers that write their own "already granted" markers must
   * skip the marker on failure so the grant can retry on the next pass.
   */
  failed?: boolean;
}

const NO_GRANT: GrantResult = {
  granted: false,
  amount: 0,
  newStanding: 0,
  ringLevel: 4,
  rangUp: null,
};

type Db = PrismaClient | Prisma.TransactionClient;

export async function grantStanding(
  prisma: Db,
  opts: {
    userId: string;
    source: StandingSource;
    amount: number;
    /** What earned it; with source, the dedupe key when dedupe=true. */
    refId?: string;
    /**
     * When true, the grant is one-shot per (userId, source, refId): a
     * second call (replay, retried request, webhook re-delivery) becomes
     * a no-op instead of double-paying.
     */
    dedupe?: boolean;
  },
): Promise<GrantResult> {
  const { userId, source, amount, refId, dedupe } = opts;
  if (amount <= 0) return NO_GRANT;

  try {
    if (dedupe && refId) {
      const existing = await prisma.standingEvent.findFirst({
        where: { userId, source, refId },
        select: { id: true },
      });
      if (existing) return NO_GRANT;
    }

    try {
      await prisma.standingEvent.create({
        data: { userId, source, amount, refId },
      });
    } catch (err) {
      // The (userId, source, refId) unique index is the dedupe backstop:
      // two identical grants racing past the read above resolve here,
      // with exactly one winner. The loser is a normal no-op, not an
      // error, and must not bump standing.
      if ((err as { code?: string }).code === "P2002") return NO_GRANT;
      throw err;
    }

    // Returned row reflects the increment; ringLevel is still the value
    // from before this grant, which is exactly the rangUp comparison base.
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { standing: { increment: amount } },
      select: { standing: true, ringLevel: true },
    });

    const ring = ringForStanding(updated.standing);
    const rangUp =
      ring.level < updated.ringLevel
        ? {
            fromLevel: updated.ringLevel,
            toLevel: ring.level,
            ringName: ring.name,
          }
        : null;

    if (ring.level !== updated.ringLevel) {
      await prisma.user.update({
        where: { id: userId },
        data: { ringLevel: ring.level },
      });
    }

    // Rank-up push. Sits here, in the one writer for Standing, so every
    // surface that can promote someone gets it without having to remember.
    // Not awaited: the member is mid-action and a slow push service must
    // never hold up the response they are waiting on.
    if (rangUp) {
      notifyRankUp(userId, rangUp);
    }

    return {
      granted: true,
      amount,
      newStanding: updated.standing,
      ringLevel: ring.level,
      rangUp,
    };
  } catch (err) {
    console.error("[standing] grant failed (non-fatal):", err);
    return { ...NO_GRANT, failed: true };
  }
}

/**
 * Count today's grants from one source, used for daily caps
 * (e.g. COMMENT is capped at 3/day so spam can't farm Standing).
 */
export async function grantsTodayCount(
  prisma: Db,
  userId: string,
  source: StandingSource,
): Promise<number> {
  const startOfUtcDay = new Date();
  startOfUtcDay.setUTCHours(0, 0, 0, 0);
  try {
    return await prisma.standingEvent.count({
      where: { userId, source, createdAt: { gte: startOfUtcDay } },
    });
  } catch {
    // Fail closed for caps: pretending the cap is reached on a DB error
    // means we never over-grant, only under-grant.
    return Number.MAX_SAFE_INTEGER;
  }
}
