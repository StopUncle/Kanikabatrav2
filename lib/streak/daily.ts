/**
 * Unified "Consilium daily streak" — the headline habit metric.
 *
 * One integer (`User.dailyStreakCurrent`) that ticks up the first time a user
 * takes ANY qualifying action on a UTC calendar day: a simulator run, a game
 * session, a Tell, the daily mission, or a check-in. It is additive over the
 * per-surface streaks (simulator / games / Tells) — those keep their own
 * numbers; this is the one members chase and the one the nudge protects.
 *
 * Same UTC-day math as lib/simulator/streak.ts (bump once per day, continue
 * if yesterday, reset to 1 otherwise). `bumpDailyStreak` is self-protecting:
 * it never throws, because every caller sits on a non-critical path and a
 * streak hiccup must not 500 the action that triggered it.
 */

import type { PrismaClient } from "@prisma/client";

/** YYYY-MM-DD in UTC. */
function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface DailyStreakResult {
  current: number;
  longest: number;
  /** True only on the first qualifying action of the day. */
  bumped: boolean;
}

/**
 * Record a qualifying daily action and roll the unified streak. Idempotent
 * within a UTC calendar day — safe to call from every action path; the first
 * call of the day bumps, the rest are silent no-ops. Never throws.
 */
export async function bumpDailyStreak(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<DailyStreakResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        dailyStreakCurrent: true,
        dailyStreakLongest: true,
        dailyStreakLastDate: true,
      },
    });
    if (!user) return { current: 0, longest: 0, bumped: false };

    const todayKey = utcDateKey(now);
    // Already counted today — silent no-op.
    if (user.dailyStreakLastDate === todayKey) {
      return {
        current: user.dailyStreakCurrent,
        longest: user.dailyStreakLongest,
        bumped: false,
      };
    }

    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const wasYesterday = user.dailyStreakLastDate === utcDateKey(yesterday);

    const newCurrent = wasYesterday ? user.dailyStreakCurrent + 1 : 1;
    const newLongest = Math.max(user.dailyStreakLongest, newCurrent);

    await prisma.user.update({
      where: { id: userId },
      data: {
        dailyStreakCurrent: newCurrent,
        dailyStreakLongest: newLongest,
        dailyStreakLastDate: todayKey,
      },
    });

    return { current: newCurrent, longest: newLongest, bumped: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[streak/daily] bump failed", err);
    return { current: 0, longest: 0, bumped: false };
  }
}

export interface DailyStreakRead {
  /** Effective streak for display: 0 if the streak has already lapsed. */
  current: number;
  longest: number;
  lastDate: string | null;
  /** Last action was today — the streak is safe for now. */
  playedToday: boolean;
  /** Has a live streak and last action was yesterday — one more day breaks it. */
  isAtRisk: boolean;
}

/**
 * Read the unified streak without mutating it. Returns the *effective*
 * current (0 once the streak has lapsed past the freeze-less reset window),
 * so the UI never shows a stale "5-day streak" that's actually broken. The
 * nudge cron uses `playedToday` + `isAtRisk`, both date-derived and correct
 * regardless of the stored counter.
 */
export async function readDailyStreak(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<DailyStreakRead> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      dailyStreakCurrent: true,
      dailyStreakLongest: true,
      dailyStreakLastDate: true,
    },
  });
  if (!user) {
    return {
      current: 0,
      longest: 0,
      lastDate: null,
      playedToday: false,
      isAtRisk: false,
    };
  }

  const todayKey = utcDateKey(now);
  const yesterday = new Date(now);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayKey = utcDateKey(yesterday);

  const playedToday = user.dailyStreakLastDate === todayKey;
  const isAtRisk =
    user.dailyStreakCurrent > 0 && user.dailyStreakLastDate === yesterdayKey;
  // If the last action is older than yesterday, the streak has lapsed; show 0.
  const lapsed = !playedToday && !isAtRisk;

  return {
    current: lapsed ? 0 : user.dailyStreakCurrent,
    longest: user.dailyStreakLongest,
    lastDate: user.dailyStreakLastDate,
    playedToday,
    isAtRisk,
  };
}
