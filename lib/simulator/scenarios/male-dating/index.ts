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
import datingMission6 from "./d6-first-real-fight";
import datingMission7 from "./d7-work-crisis";
import datingMission8 from "./d8-ex-in-trouble";
import datingMission9 from "./d9-the-question";
import datingMission10 from "./d10-the-mothers-lunch";
import datingMission11 from "./d11-noors-birthday";
import datingMission12 from "./d12-the-october-telling";
import datingMission13 from "./d13-november-call";

export const MALE_DATING_SCENARIOS: Scenario[] = [
  datingMission1,
  datingMission2,
  datingMission3,
  datingMission4,
  datingMission5,
  datingMission6,
  datingMission7,
  datingMission8,
  datingMission9,
  datingMission10,
  datingMission11,
  datingMission12,
  datingMission13,
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
  6: {
    title: "The Life Built",
    blurb:
      "Conflict without drama. The muscle you have never built because the last one taught you the wrong protocol.",
  },
  7: {
    title: "The Test",
    blurb:
      "Her crisis lands in your kitchen. The room you build for her is more useful than the work you do for her.",
  },
  8: {
    title: "The Old Channel",
    blurb:
      "The ex you left cleanly is in the hospital. The no-contact rule was made out of trust, not silence.",
  },
  9: {
    title: "The Question",
    blurb:
      "Eleven weeks after the first real fight. The proposal as architecture, not destination.",
  },
  10: {
    title: "The Trust",
    blurb:
      "Her mother brings you a piece of trust. The work is the receiving, not the plan.",
  },
  11: {
    title: "The Ordinary",
    blurb:
      "Three people at the table. Two know the diagnosis. The discipline is being exactly who you were at the bench.",
  },
  12: {
    title: "The Telling",
    blurb:
      "Yasmin tells Noor. You are in the next room. The discipline is the not-doing.",
  },
  13: {
    title: "The Call",
    blurb:
      "Tuesday 7:42 pm. Yasmin calls you directly. The ask is yours to answer.",
  },
};
