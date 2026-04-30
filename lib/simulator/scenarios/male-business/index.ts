/**
 * Male Business Line, scenario registry for the male simulator's
 * business/career/power track. 5 scenarios, progression-gated.
 *
 * Levels within this track (independent of the female simulator's levels):
 *   1. Power (the first win, reading reactions)
 *   2. Career (credit thief, covert peer)
 *   3. Business (charming cofounder, predatory term sheet)
 */

import type { Scenario } from "../../types";
import businessMission1 from "./b1-first-win";
import businessMission2 from "./b2-credit-thief";
import businessMission3 from "./b3-covert-peer";
import businessMission4 from "./b4-charming-cofounder";
import businessMission5 from "./b5-predatory-term-sheet";

export const MALE_BUSINESS_SCENARIOS: Scenario[] = [
  businessMission1,
  businessMission2,
  businessMission3,
  businessMission4,
  businessMission5,
];

/** Human labels for the Business Line levels, mirrors LEVEL_TITLES in the main registry. */
export const MALE_BUSINESS_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "Power",
    blurb: "The hour after a public win reveals every man around you.",
  },
  2: {
    title: "Career",
    blurb: "Credit thieves and covert peers. The politics you can't opt out of.",
  },
  3: {
    title: "Business",
    blurb: "Love-bombs in pitch decks. Predatory capital in patrician clothing.",
  },
};
