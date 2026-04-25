/**
 * Divorce-Arc track. Long-form narrative scenarios on the protagonist
 * actively leaving a marriage. Handoff register from toxic-narc:
 * tn-4-1 (the eighteen-month infrastructure) opens the operational
 * window; divorce-1-1 (the decision table) speaks the decision; L2-L6
 * (planned) cover the lawyer call, the kids conversation, the
 * extended-family disclosure, the move-out logistics, and the year
 * after.
 *
 * Register: clinical-decision, low affect. The scenes are choices,
 * not endurance. Heavier than tn-4-1 because the speaking is in
 * daylight rather than in your head.
 *
 * Phase 5 ships L1-1 only. L2-L6 in Phase 6.
 */

import type { Scenario } from "../../types";
import divorce11 from "./l1-1-the-decision-table";

export const DIVORCE_ARC_SCENARIOS: Scenario[] = [divorce11];

export const DIVORCE_ARC_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The Decision Spoken",
    blurb:
      "The first sentence aloud, the seven minutes after, the structural answer to tonight.",
  },
  2: {
    title: "The Lawyer Call",
    blurb:
      "The first hour with someone whose only job is your interests. Different register from any other call you have ever made.",
  },
  3: {
    title: "The Kids Conversation",
    blurb:
      "Joint, scripted, age-appropriate. The conversation that shapes their next decade of memory.",
  },
  4: {
    title: "The Family Disclosure",
    blurb:
      "The first time it is said outside the house. Whose version of events lands first matters less than you fear.",
  },
  5: {
    title: "The Move-Out",
    blurb:
      "Logistics over emotion. Boxes, lists, the locksmith call from the car. Quieter than expected.",
  },
  6: {
    title: "The Year After",
    blurb:
      "The first Christmas. The first solo school pickup. The specific quiet that is not loneliness.",
  },
};
