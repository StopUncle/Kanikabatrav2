import type { ChoiceRecord, OutcomeType } from "./types";

/**
 * Clash-of-Clans style star rating for a completed simulator run.
 *
 *   ★      Completed (any ending reached, including losses).
 *   ★★     Won (outcome ∈ good | passed).
 *   ★★★    Mastered (won AND mastery ratio ≥ STAR_THRESHOLD).
 *
 * Mastery ratio = optimal choices / total choices made.
 *
 * The whole point: pass/fail alone leaves no replay incentive once
 * a player has technically completed a scenario. Stars create a
 * gradient — you can come back to convert a 2-star run into a 3-star.
 *
 * Derived purely from data we already store (SimulatorProgress.outcome
 * + .choicesMade JSON). No schema change needed.
 */

/** Default mastery threshold for the third star. Per-scenario overrides
 *  can be added later via a `starThreshold?: number` field on Scenario.  */
export const STAR_THRESHOLD = 0.8;

export type StarRating = 0 | 1 | 2 | 3;

const PASSING_OUTCOMES = new Set<OutcomeType>(["good", "passed"]);

export function isPassingOutcome(outcome: OutcomeType | null | undefined): boolean {
  return outcome != null && PASSING_OUTCOMES.has(outcome);
}

/**
 * Mastery ratio (0–1). Empty / no choices → 0.
 *
 * Choices marked `wasOptimal: true` count as mastered. `wasOptimal: false`
 * or unset count as non-mastered. Matches the engine's `optimalCount`.
 */
export function masteryRatio(choicesMade: ChoiceRecord[]): number {
  if (!choicesMade || choicesMade.length === 0) return 0;
  const optimal = choicesMade.filter((c) => c.wasOptimal === true).length;
  return optimal / choicesMade.length;
}

/** Whole-percent display version. 0–100 inclusive. */
export function masteryPercent(choicesMade: ChoiceRecord[]): number {
  return Math.round(masteryRatio(choicesMade) * 100);
}

/** Computed star count for a completed run. Uncompleted runs return 0. */
export function computeStars(params: {
  outcome: OutcomeType | null | undefined;
  choicesMade: ChoiceRecord[];
  /** Per-scenario override of STAR_THRESHOLD (0–1). Optional. */
  threshold?: number;
}): StarRating {
  if (params.outcome == null) return 0;
  // 1 star for any completed run, even losses.
  if (!isPassingOutcome(params.outcome)) return 1;
  // 2 or 3 depends on mastery.
  const threshold = params.threshold ?? STAR_THRESHOLD;
  return masteryRatio(params.choicesMade) >= threshold ? 3 : 2;
}

/**
 * Variant for callers that already have a parsed JSON blob from the
 * SimulatorProgress.choicesMade column. Tolerates the field being
 * `null` / `unknown[]` (Prisma Json type) and quietly returns 0 stars
 * if the shape is wrong rather than throwing.
 */
export function computeStarsFromJson(
  outcome: OutcomeType | null | undefined,
  choicesMadeJson: unknown,
): StarRating {
  const choices = Array.isArray(choicesMadeJson)
    ? (choicesMadeJson as ChoiceRecord[])
    : [];
  return computeStars({ outcome, choicesMade: choices });
}
