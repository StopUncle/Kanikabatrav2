/**
 * Daily-streak logic for the simulator.
 *
 * The streak is a single integer (`User.simulatorStreakCurrent`) that ticks
 * up by 1 the first time a user takes a simulator action on a UTC calendar
 * day, and resets to 0 if a full day passes without one. `simulatorStreakLongest`
 * is the monotonically-increasing personal best displayed alongside.
 *
 * Why UTC: pegging the day boundary to user-local time would require us to
 * store and trust their timezone, which we don't. UTC is universally
 * computable from a server timestamp. Players in non-UTC zones will see the
 * boundary land at non-midnight local time — acceptable for v1; can revisit
 * if it surfaces as a complaint.
 *
 * Called from `/api/simulator/progress` and `/api/simulator/complete` —
 * any persisted simulator action triggers a streak check. The first call
 * of the day updates; subsequent calls same-day are silent no-ops.
 */

import type { PrismaClient } from "@prisma/client";

/** Returns the YYYY-MM-DD UTC date stamp for a Date. */
function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface StreakUpdateResult {
  /** Streak after the update. */
  current: number;
  longest: number;
  /** True if the value changed (first action of the day). */
  bumped: boolean;
  /** True if the streak was reset to 1 from a higher number (missed a day). */
  resetThenStarted: boolean;
}

/**
 * Update the user's simulator streak for "right now" (a simulator action
 * just happened). Idempotent within a calendar day — safe to call on every
 * state transition. Does NOT block the action's primary work; call from a
 * non-critical path so a failure doesn't 500 the parent endpoint.
 */
export async function bumpSimulatorStreak(
  prisma: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<StreakUpdateResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      simulatorStreakCurrent: true,
      simulatorStreakLongest: true,
      simulatorLastSession: true,
    },
  });

  if (!user) {
    return { current: 0, longest: 0, bumped: false, resetThenStarted: false };
  }

  const todayKey = utcDateKey(now);
  const lastKey = user.simulatorLastSession
    ? utcDateKey(user.simulatorLastSession)
    : null;

  // Same calendar day — already counted, silent no-op.
  if (lastKey === todayKey) {
    return {
      current: user.simulatorStreakCurrent,
      longest: user.simulatorStreakLongest,
      bumped: false,
      resetThenStarted: false,
    };
  }

  // Was the last session yesterday? If so, continue the streak. If older
  // (or never), start fresh at 1. We compare full UTC days because partial
  // days are noisy across timezones.
  const yesterday = new Date(now);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayKey = utcDateKey(yesterday);

  const wasYesterday = lastKey === yesterdayKey;
  const newCurrent = wasYesterday ? user.simulatorStreakCurrent + 1 : 1;
  const newLongest = Math.max(user.simulatorStreakLongest, newCurrent);

  await prisma.user.update({
    where: { id: userId },
    data: {
      simulatorStreakCurrent: newCurrent,
      simulatorStreakLongest: newLongest,
      simulatorLastSession: now,
    },
  });

  return {
    current: newCurrent,
    longest: newLongest,
    bumped: true,
    resetThenStarted: !wasYesterday && user.simulatorStreakCurrent > 0,
  };
}

/**
 * Read the current streak without mutating it. Used by the simulator
 * landing page header and the post-action streak callout.
 *
 * Includes a derived "isAtRisk" flag — true when the user's last session
 * was yesterday and they haven't acted today yet. The catalog banner uses
 * this to show "Don't break it!" copy on at-risk streaks.
 */
export async function readSimulatorStreak(
  prisma: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<{
  current: number;
  longest: number;
  lastSession: Date | null;
  isAtRisk: boolean;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      simulatorStreakCurrent: true,
      simulatorStreakLongest: true,
      simulatorLastSession: true,
    },
  });
  if (!user) {
    return {
      current: 0,
      longest: 0,
      lastSession: null,
      isAtRisk: false,
    };
  }

  // "At risk" means: the user has a streak going AND their last session
  // was yesterday (UTC). One more action today keeps it; another full day
  // breaks it.
  let isAtRisk = false;
  if (user.simulatorLastSession && user.simulatorStreakCurrent > 0) {
    const last = utcDateKey(user.simulatorLastSession);
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    isAtRisk = last === utcDateKey(yesterday);
  }

  return {
    current: user.simulatorStreakCurrent,
    longest: user.simulatorStreakLongest,
    lastSession: user.simulatorLastSession,
    isAtRisk,
  };
}
