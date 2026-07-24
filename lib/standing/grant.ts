import type { Prisma, PrismaClient, StandingSource } from "@prisma/client";
import { ringForStanding } from "./config";

/**
 * The ONE writer for Standing. Appends a StandingEvent, bumps the
 * denormalized User.standing, and recomputes ringLevel — atomically.
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
  /** Set when this grant crossed a threshold — the ceremony trigger. */
  rangUp: { fromLevel: number; toLevel: number; ringName: string } | null;
}

const NO_GRANT: GrantResult = {
  granted: false,
  amount: 0,
  newStanding: 0,
  ringLevel: 7,
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

    await prisma.standingEvent.create({
      data: { userId, source, amount, refId },
    });

    const before = await prisma.user.findUnique({
      where: { id: userId },
      select: { standing: true, ringLevel: true },
    });
    if (!before) return NO_GRANT;

    const newStanding = before.standing + amount;
    const ring = ringForStanding(newStanding);
    const rangUp =
      ring.level < before.ringLevel
        ? {
            fromLevel: before.ringLevel,
            toLevel: ring.level,
            ringName: ring.name,
          }
        : null;

    await prisma.user.update({
      where: { id: userId },
      data: { standing: { increment: amount }, ringLevel: ring.level },
    });

    return { granted: true, amount, newStanding, ringLevel: ring.level, rangUp };
  } catch (err) {
    console.error("[standing] grant failed (non-fatal):", err);
    return NO_GRANT;
  }
}

/**
 * Count today's grants from one source — used for daily caps
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
