/**
 * Elo math for the per-axis instinct rating.
 *
 * Each Tell has implicit difficulty 1-5 mapping to baseline Elo
 * 1000, 1200, 1400, 1600, 1800. Each correct answer pulls the user
 * toward (and past) that rating; each miss pushes them away.
 *
 * K-factor decays after the first 30 answers so early Tells move the
 * needle visibly (rewarding new users) while later Tells stabilise.
 *
 * Multi-axis Tells split the delta evenly across tagged axes so a Tell
 * tagged READ+SPOT trains both at half strength rather than awarding
 * full Elo per axis.
 */

import type { InstinctAxis } from "./types";

const K_EARLY = 24;
const K_LATE = 16;
const EARLY_THRESHOLD = 30;

const DIFFICULTY_TO_RATING: Record<number, number> = {
  1: 1000,
  2: 1200,
  3: 1400,
  4: 1600,
  5: 1800,
};

export interface ScoreMap {
  READ: number;
  SPOT: number;
  REPLY: number;
  REFUSE: number;
  CALIBRATE: number;
  HOLD: number;
}

export interface EloUpdate {
  /** Per-axis delta map. Negative = the user lost rating on a miss. */
  axesImpact: Partial<Record<InstinctAxis, number>>;
  /** Sum of axis deltas. Display-only "score change" number. */
  netDelta: number;
}

/**
 * Compute the per-axis Elo delta for a single answer.
 *
 * Pure, no DB. The caller persists the result.
 */
export function computeAxesImpact(args: {
  current: ScoreMap;
  axes: InstinctAxis[];
  difficulty: number;
  correct: boolean;
  answeredCount: number;
}): EloUpdate {
  const { current, axes, difficulty, correct, answeredCount } = args;
  if (axes.length === 0) {
    return { axesImpact: {}, netDelta: 0 };
  }

  const tellRating = DIFFICULTY_TO_RATING[difficulty] ?? 1400;
  const k = answeredCount < EARLY_THRESHOLD ? K_EARLY : K_LATE;
  const actual = correct ? 1 : 0;

  // Average current rating across the tagged axes — the player's
  // composite skill at this Tell's intent. Using the average rather
  // than each axis individually keeps a multi-axis Tell from
  // double-rewarding a user whose READ is high but SPOT is low.
  const avg =
    axes.reduce((sum, a) => sum + current[a], 0) / axes.length;
  const expected = 1 / (1 + Math.pow(10, (tellRating - avg) / 400));
  const totalDelta = Math.round(k * (actual - expected));

  // Split evenly across axes, distributing rounding remainder.
  const per = Math.trunc(totalDelta / axes.length);
  const remainder = totalDelta - per * axes.length;
  const impact: Partial<Record<InstinctAxis, number>> = {};
  axes.forEach((a, i) => {
    impact[a] = per + (i < remainder ? Math.sign(totalDelta) : 0);
  });

  return { axesImpact: impact, netDelta: totalDelta };
}

/** Apply a delta map to a score map, returning the new score map. */
export function applyEloDelta(
  current: ScoreMap,
  delta: Partial<Record<InstinctAxis, number>>,
): ScoreMap {
  return {
    READ: current.READ + (delta.READ ?? 0),
    SPOT: current.SPOT + (delta.SPOT ?? 0),
    REPLY: current.REPLY + (delta.REPLY ?? 0),
    REFUSE: current.REFUSE + (delta.REFUSE ?? 0),
    CALIBRATE: current.CALIBRATE + (delta.CALIBRATE ?? 0),
    HOLD: current.HOLD + (delta.HOLD ?? 0),
  };
}
