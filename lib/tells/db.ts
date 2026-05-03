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
import { Prisma } from "@prisma/client";
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
import { accrueLeague } from "./leagues/accrue";

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
 * Recently-published Tells, excluding "today's main". Used by the
 * /tells page to render an archive carousel below the reveal.
 *
 * Capped at 7 entries by default. Returns the most recently published
 * first. Only PUBLISHED Tells whose scheduleDate is before now.
 */
export async function getRecentArchive(opts: {
  excludeId?: string;
  limit?: number;
} = {}): Promise<
  Array<{
    id: string;
    slug: string;
    number: number;
    track: InstinctTrack;
    question: string;
    scheduleDate: Date | null;
  }>
> {
  const limit = opts.limit ?? 7;
  return prisma.tell.findMany({
    where: {
      status: "PUBLISHED",
      scheduleDate: { lte: new Date() },
      id: opts.excludeId ? { not: opts.excludeId } : undefined,
    },
    orderBy: { scheduleDate: "desc" },
    take: limit,
    select: {
      id: true,
      slug: true,
      number: true,
      track: true,
      question: true,
      scheduleDate: true,
    },
  });
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

/**
 * Server-only fetch of the full Tell. Used by recordAnswer to validate
 * correctness — never sent to a client without redaction.
 */
export async function getFullTellById(id: string): Promise<ClientTell | null> {
  const row = await prisma.tell.findUnique({ where: { id } });
  return row ? rowToClientTell(row) : null;
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
  /**
   * Reveal payload, sent down to the client only AFTER the response is
   * recorded. Contains the answer key (per-choice isCorrect/why) and
   * Kanika's read. Never returned by pre-answer endpoints.
   */
  reveal: {
    choices: TellChoice[];
    reveal: string;
  };
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

/** Distinguishes "bad input" from "infra failure" so the API route can
 *  return 400 vs 500 appropriately and we don't mask DB outages as
 *  client errors in monitoring. */
export class RecordAnswerInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecordAnswerInputError";
  }
}

/**
 * Record an answer with full side-effects, transactionally:
 *   1. Insert the TellResponse first (countedScored=TRUE for logged-in).
 *      The partial unique index throws P2002 if a prior scored response
 *      already exists — that's how we detect replays atomically. Concurrent
 *      submits both try to insert; exactly one wins.
 *   2. Only on successful insert do we apply Elo + streak side-effects.
 *      A replay (P2002 caught) writes a non-counted row and skips the
 *      side-effects so the user's score stays stable.
 *
 * Anti-cheat:
 *   - Server validates the choice belongs to the Tell (rejects bogus IDs)
 *   - Server determines correctness from the Tell row (never trusts client)
 *   - Concurrent first-time submits cannot double-apply Elo: the unique
 *     index serializes them at the DB layer, the loser becomes a replay.
 */
export async function recordAnswer(
  args: RecordAnswerArgs,
): Promise<RecordAnswerResult> {
  // Phase 1: validate input. Throws RecordAnswerInputError on bad data.
  const tellRow = await prisma.tell.findUnique({
    where: { id: args.tellId },
  });
  if (!tellRow) {
    throw new RecordAnswerInputError(`Tell not found: ${args.tellId}`);
  }
  if (tellRow.status !== "PUBLISHED") {
    throw new RecordAnswerInputError(`Tell not published: ${args.tellId}`);
  }

  const choices = tellRow.choices as unknown as TellChoice[];
  const choice = choices.find((c) => c.id === args.choiceId);
  if (!choice) {
    throw new RecordAnswerInputError(
      `Choice "${args.choiceId}" not on Tell "${tellRow.id}"`,
    );
  }

  const isCorrect = choice.isCorrect;
  const revealPayload = {
    choices,
    reveal: tellRow.reveal,
  };

  // Phase 2: try the insert with countedScored=TRUE for logged-in users.
  // The partial unique index `TellResponse_user_tell_scored_unique`
  // throws P2002 when this is the user's second scored attempt — that's
  // our atomic replay detector.
  const wantScoredInsert = args.userId !== null;

  let isReplay = false;
  if (wantScoredInsert) {
    try {
      await prisma.tellResponse.create({
        data: {
          userId: args.userId,
          anonId: null,
          tellId: tellRow.id,
          choiceId: args.choiceId,
          isCorrect,
          scoreImpact: 0, // updated below if first insert succeeds
          axesImpact: {} as Prisma.InputJsonValue,
          countedScored: true,
          countedStreak: false, // updated below
          answerMs: args.answerMs,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        isReplay = true;
      } else {
        throw err; // bubble infra errors as 500
      }
    }
  }

  // Replays write an un-counted row for telemetry but no side-effects.
  if (isReplay) {
    await prisma.tellResponse.create({
      data: {
        userId: args.userId,
        anonId: null,
        tellId: tellRow.id,
        choiceId: args.choiceId,
        isCorrect,
        scoreImpact: 0,
        axesImpact: {} as Prisma.InputJsonValue,
        countedScored: false,
        countedStreak: false,
        answerMs: args.answerMs,
      },
    });
    return {
      correct: isCorrect,
      reveal: revealPayload,
      scoreImpact: 0,
      axesImpact: {},
      countedStreak: false,
      streak: null, // client already has the live streak; no update
      isReplay: true,
    };
  }

  // Anonymous: write the visit-telemetry row. No replay detection
  // because anon doesn't share an identity across requests beyond cookie.
  if (!wantScoredInsert) {
    await prisma.tellResponse.create({
      data: {
        userId: null,
        anonId: args.anonId,
        tellId: tellRow.id,
        choiceId: args.choiceId,
        isCorrect,
        scoreImpact: 0,
        axesImpact: {} as Prisma.InputJsonValue,
        countedScored: false,
        countedStreak: false,
        answerMs: args.answerMs,
      },
    });
    return {
      correct: isCorrect,
      reveal: revealPayload,
      scoreImpact: 0,
      axesImpact: {},
      countedStreak: false,
      streak: null,
      isReplay: false,
    };
  }

  // Phase 3: side-effects for the FIRST scored response. The unique
  // index above guaranteed exclusivity; we are the winner of any race.
  const streakReconciled = await reconcileAndMaybeExtendStreak(
    args.userId as string,
  );
  const countedStreak = streakReconciled.didExtendToday;

  const axes = (tellRow.axes as InstinctAxis[]).filter((a) =>
    AXIS_KEYS.includes(a),
  );
  let axesImpact: Partial<Record<InstinctAxis, number>> = {};
  let scoreImpact = 0;
  if (axes.length > 0) {
    const update = await applyAnswerToScore(
      args.userId as string,
      tellRow.difficulty,
      isCorrect,
      axes,
    );
    axesImpact = update.axesImpact;
    scoreImpact = update.netDelta;

    // Accrue this answer to the user's weekly league. Lazily creates
    // their LeagueMembership for this ISO week if missing. Best-effort:
    // a league failure must not break the response pipeline.
    try {
      await accrueLeague({ userId: args.userId as string, scoreDelta: scoreImpact });
    } catch (err) {
      // Non-fatal. The response is already counted via countedScored.
      // Logged as a warning so we notice persistent failures.
      console.warn("[recordAnswer] league accrue failed:", err);
    }
  }

  // Phase 4: backfill the side-effect fields on the row we just inserted.
  // The original insert wrote scoreImpact=0 + countedStreak=false; now
  // that we've computed the real numbers, update them. Best-effort —
  // the response is already counted via countedScored=TRUE, so a
  // failure here just means analytics see slightly stale row values.
  await prisma.tellResponse
    .updateMany({
      where: {
        userId: args.userId as string,
        tellId: tellRow.id,
        countedScored: true,
      },
      data: {
        scoreImpact,
        axesImpact: axesImpact as Prisma.InputJsonValue,
        countedStreak,
      },
    })
    .catch(() => {
      // non-fatal
    });

  return {
    correct: isCorrect,
    reveal: revealPayload,
    scoreImpact,
    axesImpact,
    countedStreak,
    streak: {
      currentDays: streakReconciled.currentDays,
      longestDays: streakReconciled.longestDays,
      freezesAvail: streakReconciled.freezesAvail,
      freezeUsed: streakReconciled.freezeUsed,
    },
    isReplay: false,
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
    if (gap < 0) {
      // Clock skew or replayed cron with a backdated wall clock: the
      // stored lastTellDate is in the future relative to "today". Treat
      // as same-day so we never roll backward, and persist any freeze
      // refill, but do not extend or reset the streak.
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
