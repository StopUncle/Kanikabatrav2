/**
 * Bot-side answer pipeline.
 *
 * Mirrors the side-effect shape of `recordAnswer` in lib/tells/db.ts but
 * skips the bits that don't apply to bots:
 *   - No replay detection (the cron only ticks once per Tell per bot).
 *   - No reveal payload (no client to deliver it to).
 *   - No partial-unique-index race (the cron is single-writer per bot).
 *
 * Reuses the same Elo math (`computeAxesImpact`, `applyEloDelta`) and the
 * same streak rules so the bot ladder drifts in sympathy with how real
 * members move on the same Tells.
 */

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  AXIS_KEYS,
  type InstinctAxis,
  type TellChoice,
} from "@/lib/tells/types";
import { applyEloDelta, computeAxesImpact } from "@/lib/tells/elo";
import { isoWeekKey, daysBetween } from "@/lib/tells/streak";
import { correctnessProb, mulberry32, stableHash } from "./profiles";

export interface BotAnswerInput {
  botUserId: string;
  /**
   * The Tell row, eagerly fetched so the caller can batch reads. We
   * accept the row shape rather than the id so the cron can pick once
   * per tick run and pass it down to every bot.
   */
  tell: {
    id: string;
    difficulty: number;
    axes: string[];
    choices: Prisma.JsonValue;
  };
  /**
   * Per-bot baseline accuracy from the bot's profile. The function
   * adjusts for difficulty + adds noise.
   */
  baseAccuracy: number;
  /** UTC day key used for streak math + deterministic randomness. */
  utcDate: string;
  /**
   * Hour-of-day to backdate `answeredAt` to (0-23 UTC). Cosmetic — keeps
   * the bot cohort from clustering at the cron tick. Pass null to use
   * the current moment.
   */
  preferredHourUtc: number | null;
}

export interface BotAnswerResult {
  inserted: boolean; // false if already answered (idempotent re-runs).
  isCorrect: boolean;
  scoreImpact: number;
}

/**
 * Record a bot's answer for one Tell. Idempotent: if the bot already
 * has a TellResponse for this Tell, the call is a no-op.
 *
 * Order of operations matches the human pipeline so the math stays
 * consistent: insert response → reconcile streak → apply Elo →
 * backfill the row's delta fields.
 */
export async function recordBotAnswer(
  args: BotAnswerInput,
): Promise<BotAnswerResult> {
  const { botUserId, tell, baseAccuracy, utcDate, preferredHourUtc } = args;

  // Idempotency: skip if the bot already has any TellResponse for this
  // Tell. Cron re-runs in the same day must not double-write.
  const existing = await prisma.tellResponse.findFirst({
    where: { userId: botUserId, tellId: tell.id },
    select: { id: true, isCorrect: true, scoreImpact: true },
  });
  if (existing) {
    return {
      inserted: false,
      isCorrect: existing.isCorrect,
      scoreImpact: existing.scoreImpact,
    };
  }

  const choices = tell.choices as unknown as TellChoice[];
  const correctChoice = choices.find((c) => c.isCorrect);
  if (!correctChoice) {
    // Tell with zero correct choices is a content bug. Don't crash the
    // cron over it — log and skip.
    return { inserted: false, isCorrect: false, scoreImpact: 0 };
  }

  // Deterministic correctness roll: same bot + same Tell + same day →
  // same answer. Cron retries land on the same outcome, so a partial
  // failure can't mutate history.
  const seed = stableHash(`bot-correct|${botUserId}|${tell.id}|${utcDate}`);
  const rng = mulberry32(seed);
  const noise = (rng() - 0.5) * 0.12;
  const p = correctnessProb(baseAccuracy, tell.difficulty, noise);
  const isCorrect = rng() < p;

  const pickedChoice = isCorrect
    ? correctChoice
    : pickWrongChoice(choices, rng, correctChoice.id);

  // Cosmetic answeredAt: a date in the past at the bot's preferred hour
  // so the leaderboard doesn't read "everyone solved at 02:14 UTC."
  const answeredAt = backdateAnsweredAt(utcDate, preferredHourUtc, rng);

  const tellAxes = (tell.axes as InstinctAxis[]).filter((a) =>
    AXIS_KEYS.includes(a),
  );

  await prisma.$transaction(async (tx) => {
    // 1. Insert the response.
    await tx.tellResponse.create({
      data: {
        userId: botUserId,
        anonId: null,
        tellId: tell.id,
        choiceId: pickedChoice.id,
        isCorrect,
        scoreImpact: 0, // backfilled below
        axesImpact: {} as Prisma.InputJsonValue,
        countedScored: true,
        countedStreak: false, // backfilled below
        answerMs: null,
        answeredAt,
      },
    });

    // 2. Reconcile the streak. didExtendToday is what countedStreak
    //    should be on the row we just wrote.
    const streak = await reconcileStreak(tx, botUserId, utcDate);

    // 3. Apply Elo if the Tell has axes. Mirrors lib/tells/db.ts.
    let scoreImpact = 0;
    let axesImpact: Partial<Record<InstinctAxis, number>> = {};
    if (tellAxes.length > 0) {
      const update = await applyAnswerToScore(
        tx,
        botUserId,
        tell.difficulty,
        isCorrect,
        tellAxes,
      );
      scoreImpact = update.netDelta;
      axesImpact = update.axesImpact;
    }

    // 4. Backfill the row's delta fields. Real-member path does this
    //    outside the transaction; we keep it inside because the cron
    //    cares about consistency more than throughput.
    await tx.tellResponse.updateMany({
      where: { userId: botUserId, tellId: tell.id, countedScored: true },
      data: {
        scoreImpact,
        axesImpact: axesImpact as Prisma.InputJsonValue,
        countedStreak: streak.didExtendToday,
      },
    });
  });

  return {
    inserted: true,
    isCorrect,
    scoreImpact: 0, // updated in DB; not surfaced to caller currently.
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function pickWrongChoice(
  choices: TellChoice[],
  rng: () => number,
  correctId: string,
): TellChoice {
  const wrong = choices.filter((c) => c.id !== correctId);
  if (wrong.length === 0) return choices[0];
  return wrong[Math.floor(rng() * wrong.length)];
}

function backdateAnsweredAt(
  utcDate: string,
  preferredHourUtc: number | null,
  rng: () => number,
): Date {
  if (preferredHourUtc === null) return new Date();
  const [y, m, d] = utcDate.split("-").map(Number);
  // Add 0-59 minutes of jitter so two bots with the same preferred hour
  // don't share an answeredAt to the second.
  const minute = Math.floor(rng() * 60);
  const second = Math.floor(rng() * 60);
  return new Date(Date.UTC(y, m - 1, d, preferredHourUtc, minute, second));
}

/**
 * Streak reconcile + extend, scoped to a transaction. Same rules as the
 * human path: gap=0 same day no-op, gap=1 extend, gap=2 with freeze
 * extend + burn freeze, gap>=2 reset.
 */
async function reconcileStreak(
  tx: Prisma.TransactionClient,
  userId: string,
  today: string,
): Promise<{ didExtendToday: boolean }> {
  const thisWeek = isoWeekKey();
  const existing = await tx.tellStreak.findUnique({ where: { userId } });
  const row = existing ?? {
    currentDays: 0,
    longestDays: 0,
    lastTellDate: null as string | null,
    freezeWeekKey: thisWeek,
    freezesAvail: 1,
  };

  let freezesAvail = row.freezesAvail;
  let freezeWeekKey = row.freezeWeekKey ?? thisWeek;
  if (freezeWeekKey !== thisWeek) {
    freezesAvail = 1;
    freezeWeekKey = thisWeek;
  }

  let currentDays = row.currentDays;

  if (row.lastTellDate) {
    const gap = daysBetween(row.lastTellDate, today);
    if (gap <= 0) {
      // Today or earlier — same-day, do nothing.
      await tx.tellStreak.upsert({
        where: { userId },
        update: { freezesAvail, freezeWeekKey },
        create: {
          userId,
          currentDays,
          longestDays: row.longestDays,
          lastTellDate: row.lastTellDate,
          freezeWeekKey,
          freezesAvail,
        },
      });
      return { didExtendToday: false };
    }
    if (gap === 2 && freezesAvail > 0) {
      freezesAvail = 0;
    } else if (gap >= 2) {
      currentDays = 0;
    }
  }

  const newDays = currentDays + 1;
  const newLongest = Math.max(row.longestDays, newDays);

  await tx.tellStreak.upsert({
    where: { userId },
    update: {
      currentDays: newDays,
      longestDays: newLongest,
      lastTellDate: today,
      freezeWeekKey,
      freezesAvail,
    },
    create: {
      userId,
      currentDays: newDays,
      longestDays: newLongest,
      lastTellDate: today,
      freezeWeekKey,
      freezesAvail,
    },
  });

  return { didExtendToday: true };
}

async function applyAnswerToScore(
  tx: Prisma.TransactionClient,
  userId: string,
  difficulty: number,
  correct: boolean,
  axes: InstinctAxis[],
): Promise<{
  netDelta: number;
  axesImpact: Partial<Record<InstinctAxis, number>>;
}> {
  const existing = await tx.instinctScore.findUnique({ where: { userId } });
  const current = existing ?? {
    read: 1000,
    spot: 1000,
    reply: 1000,
    refuse: 1000,
    calibrate: 1000,
    hold: 1000,
    totalAnswered: 0,
  };

  const update = computeAxesImpact({
    current: {
      READ: current.read,
      SPOT: current.spot,
      REPLY: current.reply,
      REFUSE: current.refuse,
      CALIBRATE: current.calibrate,
      HOLD: current.hold,
    },
    axes,
    difficulty,
    correct,
    answeredCount: current.totalAnswered,
  });

  const next = applyEloDelta(
    {
      READ: current.read,
      SPOT: current.spot,
      REPLY: current.reply,
      REFUSE: current.refuse,
      CALIBRATE: current.calibrate,
      HOLD: current.hold,
    },
    update.axesImpact,
  );

  await tx.instinctScore.upsert({
    where: { userId },
    update: {
      read: next.READ,
      spot: next.SPOT,
      reply: next.REPLY,
      refuse: next.REFUSE,
      calibrate: next.CALIBRATE,
      hold: next.HOLD,
      totalAnswered: { increment: 1 },
    },
    create: {
      userId,
      read: next.READ,
      spot: next.SPOT,
      reply: next.REPLY,
      refuse: next.REFUSE,
      calibrate: next.CALIBRATE,
      hold: next.HOLD,
      totalAnswered: 1,
    },
  });

  return update;
}
