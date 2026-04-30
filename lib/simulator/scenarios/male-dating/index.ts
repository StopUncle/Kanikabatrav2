/**
 * Male Dating Line, scenario registry for the male simulator's
 * dating/mate-selection/dark-psych track. 5 scenarios, progression-gated.
 *
 * Levels within this track (independent of the female simulator's levels):
 *   1. Power (frame under challenge, status theatre)
 *   2. Attraction (the exciting one. BPD/HPD)
 *   3. Dark Psychology (gaslighter. DARVO in real time)
 *   4. Defense (the hoover, permanent ghost protocol)
 *   5. Mate Selection (the secure one, endgame recalibration)
 */

import type { Scenario } from "../../types";
import datingMission1 from "./d1-frame-challenge";
import datingMission2 from "./d2-exciting-one";
import datingMission3 from "./d3-gaslighter";
import datingMission4 from "./d4-hoover";
import datingMission5 from "./d5-secure-one";

export const MALE_DATING_SCENARIOS: Scenario[] = [
  datingMission1,
  datingMission2,
  datingMission3,
  datingMission4,
  datingMission5,
];

export const MALE_DATING_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "Power",
    blurb: "A cutting remark in front of six people. Don't flinch.",
  },
  2: {
    title: "Attraction",
    blurb: "The body lies under intermittent reinforcement.",
  },
  3: {
    title: "Dark Psychology",
    blurb: "Naming the tactic mid-sentence neutralises it.",
  },
  4: {
    title: "Defense",
    blurb: "She's reformed. She's in therapy. Permanent ghost protocol.",
  },
  5: {
    title: "Mate Selection",
    blurb: "Calm, direct, secure. The part of you calling her boring is the part that decides your decade.",
  },
};
