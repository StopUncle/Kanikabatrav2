/**
 * Daily-training streak logic for the Consilium games tab.
 *
 * Mirrors `lib/simulator/streak.ts` but lives on `User.gamesStreakCurrent` /
 * `gamesStreakLongest` / `gamesLastSession`. Separate from the simulator
 * streak so each becomes its own habit (Lumosity model): one daily session
 * per game family counts; replays the same day are practice.
 *
 * v1 unifies the games-streak across all game keys: a Speed Drill session
 * and a future Daily Tell session both count toward the same streak. The
 * rationale is the Consilium daily-training pitch ("did you train today?")
 * reads cleanest with one number. Per-game streaks can be added later if
 * we want to gamify each game family separately.
 */

import type { PrismaClient } from "@prisma/client";

/** Returns the YYYY-MM-DD UTC date stamp for a Date. */
function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface GamesStreakUpdateResult {
  /** Streak after the update. */
  current: number;
  longest: number;
  /** True if the value changed (first game session of the day). */
  bumped: boolean;
  /** True if the streak was reset to 1 from a higher number (missed a day). */
  resetThenStarted: boolean;
}

/**
 * Update the user's games streak for "right now". Idempotent within a
 * calendar day — safe to call on every completed game session.
 * Non-critical: a streak failure shouldn't 500 the parent endpoint.
 */
export async function bumpGamesStreak(
  prisma: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<GamesStreakUpdateResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      gamesStreakCurrent: true,
      gamesStreakLongest: true,
      gamesLastSession: true,
    },
  });

  if (!user) {
    return { current: 0, longest: 0, bumped: false, resetThenStarted: false };
  }

  const todayKey = utcDateKey(now);
  const lastKey = user.gamesLastSession
    ? utcDateKey(user.gamesLastSession)
    : null;

  // Same calendar day — already counted today, silent no-op (replay).
  if (lastKey === todayKey) {
    return {
      current: user.gamesStreakCurrent,
      longest: user.gamesStreakLongest,
      bumped: false,
      resetThenStarted: false,
    };
  }

  const yesterday = new Date(now);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayKey = utcDateKey(yesterday);

  const wasYesterday = lastKey === yesterdayKey;
  const newCurrent = wasYesterday ? user.gamesStreakCurrent + 1 : 1;
  const newLongest = Math.max(user.gamesStreakLongest, newCurrent);

  await prisma.user.update({
    where: { id: userId },
    data: {
      gamesStreakCurrent: newCurrent,
      gamesStreakLongest: newLongest,
      gamesLastSession: now,
    },
  });

  return {
    current: newCurrent,
    longest: newLongest,
    bumped: true,
    resetThenStarted: !wasYesterday && user.gamesStreakCurrent > 0,
  };
}

/**
 * Read the user's games streak without mutating it.
 *
 * `isAtRisk` is true when the user has a streak going AND their last
 * session was yesterday (UTC), so one more session today keeps it but
 * another full day breaks it. The catalog uses this to show "Don't break
 * it!" copy on at-risk streaks.
 */
export async function readGamesStreak(
  prisma: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<{
  current: number;
  longest: number;
  lastSession: Date | null;
  isAtRisk: boolean;
  playedToday: boolean;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      gamesStreakCurrent: true,
      gamesStreakLongest: true,
      gamesLastSession: true,
    },
  });
  if (!user) {
    return {
      current: 0,
      longest: 0,
      lastSession: null,
      isAtRisk: false,
      playedToday: false,
    };
  }

  const todayKey = utcDateKey(now);
  const lastKey = user.gamesLastSession
    ? utcDateKey(user.gamesLastSession)
    : null;
  const playedToday = lastKey === todayKey;

  let isAtRisk = false;
  if (user.gamesLastSession && user.gamesStreakCurrent > 0 && !playedToday) {
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    isAtRisk = lastKey === utcDateKey(yesterday);
  }

  return {
    current: user.gamesStreakCurrent,
    longest: user.gamesStreakLongest,
    lastSession: user.gamesLastSession,
    isAtRisk,
    playedToday,
  };
}

/**
 * Read per-game personal-best metrics for the catalog cards. Cheap reads
 * scoped to a single user + game key. Returns null fields for users with
 * no sessions yet (NEW state).
 */
export async function readGamePersonalBest(
  prisma: PrismaClient,
  userId: string,
  gameKey: string,
): Promise<{
  totalSessions: number;
  bestScore: number | null;
  bestAccuracy: number | null;
  bestMaxCombo: number | null;
  lastPlayedAt: Date | null;
}> {
  const [totalSessions, best, last] = await Promise.all([
    prisma.gameSession.count({ where: { userId, gameKey } }),
    prisma.gameSession.findFirst({
      where: { userId, gameKey },
      orderBy: [{ score: "desc" }, { accuracy: "desc" }],
      select: { score: true, accuracy: true, maxCombo: true },
    }),
    prisma.gameSession.findFirst({
      where: { userId, gameKey },
      orderBy: { playedAt: "desc" },
      select: { playedAt: true },
    }),
  ]);

  return {
    totalSessions,
    bestScore: best?.score ?? null,
    bestAccuracy: best?.accuracy ?? null,
    bestMaxCombo: best?.maxCombo ?? null,
    lastPlayedAt: last?.playedAt ?? null,
  };
}
