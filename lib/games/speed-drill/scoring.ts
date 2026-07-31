/**
 * Speed Drill Standing breakdown, pure and server-owned.
 *
 * The base pays for finishing a run, same as ever. The bonuses pay for
 * performance on a FULL deck only (a timed-out partial run keeps the
 * floor but cannot bonus), following the TELL_CORRECT_AXIS precedent:
 * small performance bonuses on top of a guaranteed showing-up floor.
 * Inputs are the server-re-derived score and totalCards, never client
 * aggregates, so the caller must only invoke this on a validated
 * answers payload.
 */

import { STANDING } from "@/lib/standing/config";
import { DRILL_CARDS } from "./content";

/** Full-deck accuracy at or above this earns the sharp bonus. */
export const DRILL_SHARP_ACCURACY = 80;

export interface DrillStandingBreakdown {
  base: number;
  sharpBonus: number;
  perfectBonus: number;
  total: number;
}

export function drillStandingBreakdown(
  score: number,
  totalCards: number,
): DrillStandingBreakdown {
  const fullDeck = totalCards === DRILL_CARDS;
  const accuracy = totalCards > 0 ? (score / totalCards) * 100 : 0;
  const sharpBonus =
    fullDeck && accuracy >= DRILL_SHARP_ACCURACY
      ? STANDING.DRILL_SHARP_BONUS
      : 0;
  const perfectBonus =
    fullDeck && score === DRILL_CARDS ? STANDING.DRILL_PERFECT_BONUS : 0;
  return {
    base: STANDING.DRILL,
    sharpBonus,
    perfectBonus,
    total: STANDING.DRILL + sharpBonus + perfectBonus,
  };
}
