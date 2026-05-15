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
import businessMission6 from "./b6-first-firing";
import businessMission7 from "./b7-board-seat";
import businessMission8 from "./b8-cofounder-offer";
import businessMission9 from "./b9-acquisition-lure";
import businessMission10 from "./b10-series-b";
import businessMission11 from "./b11-first-board-meeting";
import businessMission12 from "./b12-option-pool-refresh";
import businessMission13 from "./b13-series-c";
import businessMission14 from "./b14-post-c-board";

export const MALE_BUSINESS_SCENARIOS: Scenario[] = [
  businessMission1,
  businessMission2,
  businessMission3,
  businessMission4,
  businessMission5,
  businessMission6,
  businessMission7,
  businessMission8,
  businessMission9,
  businessMission10,
  businessMission11,
  businessMission12,
  businessMission13,
  businessMission14,
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
  6: {
    title: "The Founder's Cost",
    blurb:
      "Nineteen minutes to do the humane procedural thing. The first one is the pattern the next eight are built on.",
  },
  7: {
    title: "The Boardroom",
    blurb:
      "Observer rights, distributed cohorts, and a cheque dressed as a favour. The structure is always the product.",
  },
  8: {
    title: "The Cofounder Offer",
    blurb:
      "Your CFO has a competitor offer. The right retention is upstream of the package, and some right retentions are clean goodbyes.",
  },
  9: {
    title: "The Acquisition Lure",
    blurb:
      "Acquihire, acquisition, or strategic partnership. The math is rich. The structure is poor. Read what is actually being offered.",
  },
  10: {
    title: "The Capital",
    blurb:
      "The headline numbers are the door. The protective provisions are the cage. Read clause-by-clause.",
  },
  11: {
    title: "The Board",
    blurb:
      "The deck is the floor. The conversation is the work. Bring the work, not the preparation.",
  },
  12: {
    title: "The Refresh",
    blurb:
      "Quick read overnight. The size is the door. The source is the cage.",
  },
  13: {
    title: "The Series C",
    blurb:
      "Who you let in at C is the board you have for five years. The process is the structural decision.",
  },
  14: {
    title: "The New Board",
    blurb:
      "A new board composition produces a new operating mode only if the first meeting establishes the pattern.",
  },
};
