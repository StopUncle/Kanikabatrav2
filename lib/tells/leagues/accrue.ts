/**
 * League assignment + score accrual on every scored Tell response.
 *
 * Called from the answer pipelines (lib/tells/db.ts for humans,
 * lib/tells/bots/answer.ts for training bots) right after the Elo
 * update lands. Idempotent on re-runs because the LeagueMembership
 * row is keyed on (userId, weekKey).
 *
 * Assignment rules:
 *   - First week ever: bucket by current avg Elo into TIERS.
 *   - Subsequent weeks: look at the most recent RESOLVED membership.
 *     PROMOTED → tier+1, DEMOTED → tier-1, HELD → same tier. This is
 *     what gives the league the "ladder you climb" feel; without it,
 *     promotion/demotion is cosmetic.
 *   - Most recent unresolved membership (mid-week) is treated as the
 *     current week's already-assigned tier — we never reassign within
 *     a week.
 *
 * Scoring: weeklyScore += scoreDelta, weeklyAnswered += 1. Replays
 * (countedScored=false) skip this entirely because the caller doesn't
 * invoke us; we assume any call here represents a real scored answer.
 */

import { prisma } from "@/lib/prisma";
import { isoWeekKey } from "@/lib/tells/streak";
import {
  tierForElo,
  nextTierForOutcome,
  type TierDef,
} from "./tiers";
import { AXIS_KEYS } from "@/lib/tells/types";

interface AccrueArgs {
  userId: string;
  scoreDelta: number;
}

export async function accrueLeague(args: AccrueArgs): Promise<void> {
  const { userId, scoreDelta } = args;
  const weekKey = isoWeekKey();

  // Existing membership for this week? Just bump it.
  const existing = await prisma.leagueMembership.findUnique({
    where: { userId_weekKey: { userId, weekKey } },
    select: { id: true },
  });

  if (existing) {
    await prisma.leagueMembership.update({
      where: { id: existing.id },
      data: {
        weeklyScore: { increment: scoreDelta },
        weeklyAnswered: { increment: 1 },
      },
    });
    return;
  }

  // First-time-this-week. Pick the right tier and create the league
  // row + membership atomically.
  const tier = await chooseTierForUser(userId);
  const startElo = await averageEloFor(userId);

  // Upsert the League row for (weekKey, tierName). Two users in the
  // same tier in the same week share one League. Race-safe via the
  // unique index.
  await prisma.$transaction(async (tx) => {
    const league = await tx.league.upsert({
      where: { weekKey_tierName: { weekKey, tierName: tier.name } },
      update: {},
      create: {
        weekKey,
        tierName: tier.name,
        tierOrder: tier.order,
        eloMin: tier.eloMin,
        eloMax: tier.eloMax,
      },
      select: { id: true },
    });

    // Membership upsert in case two of the user's first answers hit
    // this code path concurrently. The unique (userId, weekKey) index
    // makes this a no-op on the loser.
    await tx.leagueMembership.upsert({
      where: { userId_weekKey: { userId, weekKey } },
      create: {
        userId,
        leagueId: league.id,
        weekKey,
        startElo,
        weeklyScore: scoreDelta,
        weeklyAnswered: 1,
      },
      update: {
        weeklyScore: { increment: scoreDelta },
        weeklyAnswered: { increment: 1 },
      },
    });
  });
}

/**
 * Decide which tier this user joins for the current week.
 *
 * Order of preference:
 *   1. Most recent RESOLVED membership → next-tier-for-outcome.
 *   2. No history → bucket by current avg Elo.
 *
 * The user's most recent UNRESOLVED membership is irrelevant here
 * because if it existed for this week, the caller would have
 * short-circuited above; if it existed for a prior week, the cron
 * hasn't run, which means an admin missed it. Treat as no-history.
 */
async function chooseTierForUser(userId: string): Promise<TierDef> {
  const lastResolved = await prisma.leagueMembership.findFirst({
    where: { userId, outcome: { not: null } },
    orderBy: { joinedAt: "desc" },
    select: { outcome: true, league: { select: { tierOrder: true } } },
  });

  if (lastResolved && lastResolved.outcome) {
    return nextTierForOutcome(
      lastResolved.league.tierOrder,
      lastResolved.outcome,
    );
  }

  // First week. Use current Elo.
  const avg = await averageEloFor(userId);
  return tierForElo(avg);
}

/**
 * Average of the user's six axis Elos. Returns 1000 (the schema
 * default) when no InstinctScore row exists yet, so a brand-new user
 * who somehow accrues a league row gets bottom-tier assignment.
 */
async function averageEloFor(userId: string): Promise<number> {
  const score = await prisma.instinctScore.findUnique({
    where: { userId },
    select: {
      read: true, spot: true, reply: true,
      refuse: true, calibrate: true, hold: true,
    },
  });
  if (!score) return 1000;
  const sum = AXIS_KEYS.reduce((acc, axis) => {
    const key = axis.toLowerCase() as keyof typeof score;
    return acc + score[key];
  }, 0);
  return Math.round(sum / AXIS_KEYS.length);
}

