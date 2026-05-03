/**
 * Backfill 30 days of TellResponse rows for a freshly created bot, so
 * the bot lands on the leaderboard with a believable history (streak
 * count, Elo drift, total answered) instead of a cold zero state.
 *
 * Reuses `recordBotAnswer` per day so the streak math + Elo updates run
 * exactly the way live ticks will run. The only difference is the
 * `utcDate` argument: we walk it backward from 29 days ago to today.
 *
 * Idempotent: `recordBotAnswer` short-circuits on existing rows. Calling
 * `backfillBotHistory` twice on the same bot produces the same final
 * state as one call.
 */

import { prisma } from "@/lib/prisma";
import { recordBotAnswer } from "./answer";
import {
  decidesToSolve,
  botSeedFromId,
  type BotProfile,
} from "./profiles";
import { utcDateKey } from "@/lib/tells/streak";

interface BackfillArgs {
  botUserId: string;
  profile: BotProfile;
  /** Days of history to backfill, capped by the bot's originDay. */
  days: number;
}

/**
 * Find the PUBLISHED Tell whose scheduleDate matches a given UTC day,
 * mirroring the same selection rule the live `/tells` page uses
 * (`getTodaysTellRow`).
 *
 * Returns null when no Tell was scheduled for that day. We skip those
 * days in the backfill loop rather than inventing a Tell — the bot's
 * history will just have a gap, which reads correctly as "no Tell that
 * day, no streak break."
 */
async function getTellForDay(utcDate: string): Promise<{
  id: string;
  difficulty: number;
  axes: string[];
  choices: import("@prisma/client").Prisma.JsonValue;
  scheduleDate: Date | null;
} | null> {
  // Inclusive lower bound, exclusive upper bound.
  const start = new Date(`${utcDate}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return prisma.tell.findFirst({
    where: {
      status: "PUBLISHED",
      scheduleDate: { gte: start, lt: end },
    },
    orderBy: { scheduleDate: "desc" },
    select: {
      id: true,
      difficulty: true,
      axes: true,
      choices: true,
      scheduleDate: true,
    },
  });
}

export async function backfillBotHistory(args: BackfillArgs): Promise<{
  daysWalked: number;
  responsesWritten: number;
}> {
  const { botUserId, profile, days } = args;
  const seed = botSeedFromId(botUserId);

  // Walk from the oldest day forward so streak math accumulates in the
  // correct order. Cap at the bot's originDay so a 14-day-old bot never
  // shows a 30-day streak.
  const today = new Date();
  const daysWalked: string[] = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - offset);
    const dateKey = utcDateKey(d);
    if (dateKey < profile.originDay) continue; // pre-join days are skipped
    daysWalked.push(dateKey);
  }

  let responsesWritten = 0;

  for (const dateKey of daysWalked) {
    if (!decidesToSolve(seed, dateKey, profile.activityProb)) continue;

    const tell = await getTellForDay(dateKey);
    if (!tell) continue; // no Tell scheduled that day — bot has a gap, not a miss

    const result = await recordBotAnswer({
      botUserId,
      tell,
      baseAccuracy: profile.baseAccuracy,
      utcDate: dateKey,
      preferredHourUtc: profile.preferredHourUtc,
    });
    if (result.inserted) responsesWritten++;
  }

  return { daysWalked: daysWalked.length, responsesWritten };
}
