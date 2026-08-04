import type { Difficulty } from "@/lib/simulator/types";

/**
 * The Mark: how much a graded moment weighs.
 *
 * A catch on advanced material says more about a member's read than a
 * catch on a beginner card, so every encounter carries a weight and the
 * ledgers average by it. 1 is the reference, a standard-difficulty item.
 * The band is deliberately narrow (0.6 to just under 2): weight tilts
 * the score toward hard evidence, it never lets one answer swing the
 * whole record. All of this is scoring policy, so it lives here in one
 * file the same way the vocabulary lives in taxonomy.ts.
 */

export const SCENARIO_DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  beginner: 0.6,
  intermediate: 1,
  advanced: 1.5,
};

/**
 * Gauntlet runs face the same choice points freeform, on a clock, with
 * no options shown. The same scene proves more when cleared that way.
 */
export const GAUNTLET_WEIGHT_MULTIPLIER = 1.25;

/** Speed Drill bands. Tier 3 is the trap tier, where the reads are subtle. */
export const DRILL_TIER_WEIGHT: Record<1 | 2 | 3, number> = {
  1: 0.6,
  2: 1,
  3: 1.5,
};

/**
 * A Lab session is freeform defence across a whole conversation, the
 * hardest read in the app, and its outcome is one coarse judgement.
 */
export const LAB_WEIGHT = 1.5;

const TELL_DIFFICULTY_WEIGHT: Record<number, number> = {
  1: 0.6,
  2: 0.8,
  3: 1,
  4: 1.25,
  5: 1.5,
};

/** Tells are authored 1 to 5 with 3 the norm. Unknown values read as 3. */
export function tellDifficultyWeight(difficulty: number): number {
  return TELL_DIFFICULTY_WEIGHT[difficulty] ?? 1;
}
