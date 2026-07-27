/**
 * Arcade: the snack layer under the Simulator.
 *
 * The Simulator is the meal (a scenario is twelve scenes of reading one
 * person). The Arcade is the daily set: two short games that train the
 * snap-call underneath that read, finishable in about five minutes.
 *
 * On which streak to show. Both games call `bumpDailyStreak`, but only the
 * drill calls `bumpGamesStreak`, so the games streak reads zero for someone
 * who does the Tell every day. The unified daily streak is the only number
 * here that is true of both, so it is the one the Arcade shows.
 */

import type { PrismaClient } from "@prisma/client";
import { readGamePersonalBest } from "./status";
import { getTellStreak, getTodaysTellRow } from "@/lib/tells/db";
import { utcDateKey } from "@/lib/tells/streak";
import { readDailyStreak } from "@/lib/streak/daily";

export type ArcadeGameKey = "speed-drill" | "daily-tell";

export interface ArcadeStat {
  label: string;
  value: string;
}

export interface ArcadeGame {
  key: ArcadeGameKey;
  title: string;
  /** One line on what the game actually asks of you. */
  blurb: string;
  href: string;
  cta: string;
  /** Counted toward today's set already. */
  doneToday: boolean;
  /** Never played, so the card leads with an invitation, not a scoreboard. */
  isNew: boolean;
  /** Unavailable for a reason outside the member's control. */
  unavailable?: string;
  stats: ArcadeStat[];
}

export interface DailySet {
  done: number;
  total: number;
  /** Deep link to the next unfinished game, or null when the set is done. */
  nextHref: string | null;
  nextTitle: string | null;
}

export interface ArcadeStreak {
  current: number;
  longest: number;
  /** A streak exists and today has not been counted yet. */
  atRisk: boolean;
}

export interface ArcadeData {
  games: ArcadeGame[];
  set: DailySet;
  streak: ArcadeStreak;
}

export const DRILL_HREF = "/consilium/games/speed-drill";
export const TELL_HREF = "/consilium/instincts/today";

/**
 * Reduce the two games to a set. Split out so Today can render the same card
 * from data it has already fetched, instead of re-running the whole Arcade
 * query on the busiest screen in the app.
 */
export function buildDailySet(opts: {
  drillDone: boolean;
  tellDone: boolean;
  /** False when there is no Tell published for today. */
  tellAvailable: boolean;
}): DailySet {
  const entries = [
    { done: opts.drillDone, href: DRILL_HREF, title: "Speed Drill" },
    ...(opts.tellAvailable
      ? [{ done: opts.tellDone, href: TELL_HREF, title: "Daily Tell" }]
      : []),
  ];
  const next = entries.find((e) => !e.done) ?? null;
  return {
    done: entries.filter((e) => e.done).length,
    total: entries.length,
    nextHref: next?.href ?? null,
    nextTitle: next?.title ?? null,
  };
}

function startOfUtcDay(now: Date): Date {
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

export async function getArcadeData(
  prisma: PrismaClient,
  userId: string,
  now = new Date(),
): Promise<ArcadeData> {
  const [drillToday, drillBest, tellStreak, todaysTell, dailyStreak] =
    await Promise.all([
      prisma.gameSession.count({
        where: {
          userId,
          gameKey: "speed-drill",
          playedAt: { gte: startOfUtcDay(now) },
        },
      }),
      readGamePersonalBest(prisma, userId, "speed-drill"),
      getTellStreak(userId),
      getTodaysTellRow(),
      readDailyStreak(prisma, userId),
    ]);

  const drillDone = drillToday > 0;
  const tellDone = tellStreak?.lastTellDate === utcDateKey(now);
  const drillNew = drillBest.totalSessions === 0;

  const drill: ArcadeGame = {
    key: "speed-drill",
    title: "Speed Drill",
    blurb: "Ten lines, sixty seconds. Manipulation, or clean?",
    href: "/consilium/games/speed-drill",
    cta: drillDone ? "REPLAY" : "PLAY",
    doneToday: drillDone,
    isNew: drillNew,
    // A first-timer gets the shape of the game, not a scoreboard of zeroes.
    stats: drillNew
      ? [
          { label: "calls", value: "10" },
          { label: "seconds", value: "60" },
        ]
      : [
          { label: "best", value: `${drillBest.bestScore ?? 0}/10` },
          { label: "accuracy", value: `${drillBest.bestAccuracy ?? 0}%` },
          { label: "plays", value: `${drillBest.totalSessions}` },
        ],
  };

  // A missing tell is an editorial gap, not a member failure, so the card
  // says so plainly rather than offering a button that cannot work.
  const tellMissing = todaysTell === null;

  const tellNew = (tellStreak?.longestDays ?? 0) === 0 && !tellDone;

  const tell: ArcadeGame = {
    key: "daily-tell",
    title: "Daily Tell",
    blurb: "One moment. Spot what is really being done to you.",
    href: "/consilium/instincts/today",
    cta: tellDone ? "SEEN" : "READ",
    doneToday: tellDone,
    isNew: tellNew,
    unavailable: tellMissing ? "Today's Tell is being prepared." : undefined,
    stats: tellMissing
      ? []
      : tellNew
        ? [
            { label: "question", value: "1" },
            { label: "seconds", value: "60" },
          ]
        : [
            { label: "streak", value: `${tellStreak?.currentDays ?? 0}d` },
            { label: "best", value: `${tellStreak?.longestDays ?? 0}d` },
          ],
  };

  return {
    games: [drill, tell],
    set: buildDailySet({
      drillDone,
      tellDone,
      tellAvailable: !tellMissing,
    }),
    streak: {
      current: dailyStreak.current,
      longest: dailyStreak.longest,
      // Deliberately the reader's own verdict, not "no Arcade game today":
      // the daily streak is fed by scenarios and the Path too, so a member
      // can be perfectly safe at nought-of-two here.
      atRisk: dailyStreak.isAtRisk,
    },
  };
}
