/**
 * Tells DB layer.
 *
 * Server-only (imports prisma). Three concerns:
 *   1. Picking today's Tell from the schedule
 *   2. Recording a TellResponse with score + streak side-effects
 *   3. Reading a user's score + streak for the dashboard
 *
 * Anonymous users: response rows are stored against `anonId` (a cookie
 * id), no score, no streak. The localStorage streak on the client is
 * source of truth for anonymous visitors. On signup the client posts
 * its localStorage streak to /api/tells/migrate-streak which writes a
 * TellStreak row keyed to the new userId.
 */

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import {
  AXIS_KEYS,
  type InstinctAxis,
  type TellArtifact,
  type TellChoice,
} from "./types";
import {
  applyEloDelta,
  computeAxesImpact,
  type EloUpdate,
} from "./elo";
import { utcDateKey, isoWeekKey, daysBetween } from "./streak";

/* -------------------------------------------------------------------------- */
/* Types: re-shape the DB Tell into the client-friendly shape used by         */
/* TellPlayer. Reuses lib/tells/types.Tell.                                   */
/* -------------------------------------------------------------------------- */

import type { Tell as ClientTell, TellFormat, InstinctTrack } from "./types";

function rowToClientTell(row: {
  id: string;
  number: number;
  format: TellFormat;
  track: InstinctTrack;
  axes: string[];
  difficulty: number;
  artifact: Prisma.JsonValue;
  question: string;
  choices: Prisma.JsonValue;
  reveal: string;
}): ClientTell {
  return {
    id: row.id,
    number: row.number,
    format: row.format,
    track: row.track,
    axes: row.axes as InstinctAxis[],
    difficulty: row.difficulty as 1 | 2 | 3 | 4 | 5,
    artifact: row.artifact as unknown as TellArtifact,
    question: row.question,
    choices: row.choices as unknown as TellChoice[],
    reveal: row.reveal,
  };
}

/* -------------------------------------------------------------------------- */
/* Today's Tell                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The single Tell currently surfaced as "Today's Tell" on /tells.
 *
 * Algorithm: the most recently scheduled PUBLISHED Tell whose
 * scheduleDate is on or before now, in UTC. If no Tell is scheduled
 * for today specifically, the most recent past schedule wins (so the
 * site never shows a blank state, even if Kanika misses a day of
 * authoring). When the schedule is empty entirely, returns null and
 * the page falls back to the seed pool.
 */
export async function getTodaysTellRow(): Promise<ClientTell | null> {
  const now = new Date();
  const row = await prisma.tell.findFirst({
    where: {
      status: "PUBLISHED",
      scheduleDate: { lte: now },
    },
    orderBy: { scheduleDate: "desc" },
  });
  return row ? rowToClientTell(row) : null;
}

/**
 * Bonus Tells offered after the main: up to 2, oldest published Tells
 * the user has not yet completed. Returns empty array for now in the
 * spike, wired up after the user-completed-set query is needed.
 */
export async function getBonusTells(opts: {
  excludeId: string;
  excludeUserId?: string | null;
  excludeAnonId?: string | null;
  limit?: number;
}): Promise<ClientTell[]> {
  const limit = opts.limit ?? 2;

  // Tells the user has already touched, so we don't re-serve them.
  const completedIds = new Set<string>([opts.excludeId]);
  if (opts.excludeUserId || opts.excludeAnonId) {
    const prior = await prisma.tellResponse.findMany({
      where: opts.excludeUserId
        ? { userId: opts.excludeUserId }
        : { anonId: opts.excludeAnonId ?? undefined },
      select: { tellId: true },
    });
    for (const r of prior) completedIds.add(r.tellId);
  }

  const rows = await prisma.tell.findMany({
    where: {
      status: "PUBLISHED",
      scheduleDate: { lte: new Date() },
      id: { notIn: Array.from(completedIds) },
    },
    orderBy: { scheduleDate: "desc" },
    take: limit,
  });
  return rows.map(rowToClientTell);
}

/**
 * Look up a Tell by slug for /tells/[slug] deep links.
 */
export async function getTellBySlug(slug: string): Promise<ClientTell | null> {
  const row = await prisma.tell.findUnique({ where: { slug } });
  if (!row) return null;
  if (row.status !== "PUBLISHED") return null;
  return rowToClientTell(row);
}

/* -------------------------------------------------------------------------- */
/* Recording an answer                                                        */
/* -------------------------------------------------------------------------- */

export interface RecordAnswerArgs {
  tellId: string;
  choiceId: string;
  userId: string | null;
  anonId: string | null;
  answerMs?: number;
}

export interface RecordAnswerResult {
  correct: boolean;
  /** The full reveal payload to render. */
  tell: ClientTell;
  /** Net Elo delta this answer produced. 0 for replays. */
  scoreImpact: number;
  /** Per-axis delta map. */
  axesImpact: Partial<Record<InstinctAxis, number>>;
  /** Whether this answer extended the user's streak today. */
  countedStreak: boolean;
  /** Server-authoritative streak state for logged-in users. Null for anon. */
  streak: {
    currentDays: number;
    longestDays: number;
    freezesAvail: number;
    freezeUsed: boolean;
  } | null;
  /** True if user already answered this Tell with score-counting before. */
  isReplay: boolean;
}

/**
 * Record an answer with full side-effects:
 *   - TellResponse row written
 *   - InstinctScore upserted with Elo delta per axis (logged-in only)
 *   - TellStreak reconciled and (if first main of the day) extended
 *
 * Anti-cheat:
 *   - Server validates the choice belongs to the Tell (rejects bogus IDs)
 *   - Server determines correctness from the Tell row (never trusts client)
 *   - First scored response per (userId, tellId) wins; subsequent calls are
 *     replays with scoreImpact=0 (relies on the partial unique index)
 */
export async function recordAnswer(
  args: RecordAnswerArgs,
): Promise<RecordAnswerResult> {
  const tellRow = await prisma.tell.findUnique({
    where: { id: args.tellId },
  });
  if (!tellRow) {
    throw new Error(`Tell not found: ${args.tellId}`);
  }
  if (tellRow.status !== "PUBLISHED") {
    throw new Error(`Tell not published: ${args.tellId}`);
  }

  const choices = tellRow.choices as unknown as TellChoice[];
  const choice = choices.find((c) => c.id === args.choiceId);
  if (!choice) {
    throw new Error(
      `Choice "${args.choiceId}" not on Tell "${tellRow.id}"`,
    );
  }

  const isCorrect = choice.isCorrect;
  const tell = rowToClientTell(tellRow);

  // Has this user already counted this Tell? Replays do not affect score
  // or streak.
  let isReplay = false;
  if (args.userId) {
    const existing = await prisma.tellResponse.findFirst({
      where: {
        userId: args.userId,
        tellId: args.tellId,
        countedScored: true,
      },
      select: { id: true },
    });
    if (existing) isReplay = true;
  }

  // Streak: only the first scored main of the day counts. We treat
  // every Tell as eligible for "main" status; if a user plays multiple
  // Tells on the same day, the FIRST one extends the streak, the rest
  // do not.
  let countedStreak = false;
  let streakReconciled: StreakReconcileResult | null = null;
  if (args.userId && !isReplay) {
    streakReconciled = await reconcileAndMaybeExtendStreak(args.userId);
    countedStreak = streakReconciled.didExtendToday;
  }

  // Score: apply Elo delta per axis for logged-in users on first answer.
  const axes = (tellRow.axes as InstinctAxis[]).filter((a) =>
    AXIS_KEYS.includes(a),
  );
  let axesImpact: Partial<Record<InstinctAxis, number>> = {};
  let scoreImpact = 0;
  if (args.userId && !isReplay && axes.length > 0) {
    const update = await applyAnswerToScore(
      args.userId,
      tellRow.difficulty,
      isCorrect,
      axes,
    );
    axesImpact = update.axesImpact;
    scoreImpact = update.netDelta;
  }

  // Write the response row. countedScored is the marker for the partial
  // unique index that prevents double-counting later.
  await prisma.tellResponse.create({
    data: {
      userId: args.userId,
      anonId: args.anonId,
      tellId: tellRow.id,
      choiceId: args.choiceId,
      isCorrect,
      scoreImpact,
      axesImpact: axesImpact as Prisma.InputJsonValue,
      countedScored: !isReplay && args.userId !== null,
      countedStreak,
      answerMs: args.answerMs,
    },
  });

  return {
    correct: isCorrect,
    tell,
    scoreImpact,
    axesImpact,
    countedStreak,
    streak: streakReconciled
      ? {
          currentDays: streakReconciled.currentDays,
          longestDays: streakReconciled.longestDays,
          freezesAvail: streakReconciled.freezesAvail,
          freezeUsed: streakReconciled.freezeUsed,
        }
      : null,
    isReplay,
  };
}

/* -------------------------------------------------------------------------- */
/* Streak reconciliation                                                      */
/* -------------------------------------------------------------------------- */

interface StreakReconcileResult {
  currentDays: number;
  longestDays: number;
  freezesAvail: number;
  /** True if a freeze covered a missed day during this reconcile. */
  freezeUsed: boolean;
  /** True if this call extended the streak (first main of today). */
  didExtendToday: boolean;
}

/**
 * Apply the user's "I just completed a main Tell" event to their streak.
 * Mirrors the pure logic in lib/tells/streak.ts but persists to DB.
 */
async function reconcileAndMaybeExtendStreak(
  userId: string,
): Promise<StreakReconcileResult> {
  const today = utcDateKey();
  const thisWeek = isoWeekKey();

  // Lazy create.
  const existing = await prisma.tellStreak.findUnique({
    where: { userId },
  });
  const row = existing ?? {
    currentDays: 0,
    longestDays: 0,
    lastTellDate: null as string | null,
    freezeWeekKey: thisWeek,
    freezesAvail: 1,
  };

  // Refill weekly freeze on ISO-week rollover.
  let freezesAvail = row.freezesAvail;
  let freezeWeekKey = row.freezeWeekKey ?? thisWeek;
  if (freezeWeekKey !== thisWeek) {
    freezesAvail = 1;
    freezeWeekKey = thisWeek;
  }

  let currentDays = row.currentDays;
  let freezeUsed = false;

  if (row.lastTellDate) {
    const gap = daysBetween(row.lastTellDate, today);
    if (gap === 0) {
      // Already extended today, this is a same-day second answer.
      // Persist the freeze refill but don't extend.
      await prisma.tellStreak.upsert({
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
      return {
        currentDays,
        longestDays: row.longestDays,
        freezesAvail,
        freezeUsed: false,
        didExtendToday: false,
      };
    }
    if (gap === 2 && freezesAvail > 0) {
      freezesAvail = 0;
      freezeUsed = true;
      // Streak intact, will extend below.
    } else if (gap >= 2) {
      currentDays = 0;
    }
    // gap === 1: yesterday, intact.
  }

  const newDays = currentDays + 1;
  const newLongest = Math.max(row.longestDays, newDays);

  await prisma.tellStreak.upsert({
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

  return {
    currentDays: newDays,
    longestDays: newLongest,
    freezesAvail,
    freezeUsed,
    didExtendToday: true,
  };
}

/* -------------------------------------------------------------------------- */
/* Score updates (Elo)                                                        */
/* -------------------------------------------------------------------------- */

async function applyAnswerToScore(
  userId: string,
  difficulty: number,
  correct: boolean,
  axes: InstinctAxis[],
): Promise<EloUpdate> {
  const existing = await prisma.instinctScore.findUnique({
    where: { userId },
  });
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

  await prisma.instinctScore.upsert({
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

/* -------------------------------------------------------------------------- */
/* Read APIs                                                                  */
/* -------------------------------------------------------------------------- */

export async function getInstinctScore(userId: string) {
  const row = await prisma.instinctScore.findUnique({
    where: { userId },
  });
  if (!row) {
    return {
      read: 1000,
      spot: 1000,
      reply: 1000,
      refuse: 1000,
      calibrate: 1000,
      hold: 1000,
      totalAnswered: 0,
    };
  }
  return {
    read: row.read,
    spot: row.spot,
    reply: row.reply,
    refuse: row.refuse,
    calibrate: row.calibrate,
    hold: row.hold,
    totalAnswered: row.totalAnswered,
  };
}

export async function getTellStreak(userId: string) {
  const row = await prisma.tellStreak.findUnique({ where: { userId } });
  return row;
}

export async function getResponseHistory(
  userId: string,
  opts: { limit?: number; cursor?: string } = {},
) {
  return prisma.tellResponse.findMany({
    where: { userId, countedScored: true },
    orderBy: { answeredAt: "desc" },
    take: opts.limit ?? 30,
    cursor: opts.cursor ? { id: opts.cursor } : undefined,
    skip: opts.cursor ? 1 : 0,
    include: {
      tell: {
        select: {
          id: true,
          number: true,
          slug: true,
          format: true,
          track: true,
          question: true,
          difficulty: true,
        },
      },
    },
  });
}
