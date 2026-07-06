/**
 * Divorce-Arc track. Long-form narrative scenarios on the protagonist
 * actively leaving a marriage. Handoff register from toxic-narc:
 * tn-4-1 (the eighteen-month infrastructure) opens the operational
 * window; divorce-1-1 (the decision table) speaks the decision; L2-L6
 * cover the lawyer call, the kids conversation, the extended-family
 * disclosure, the move-out logistics, and the year after.
 *
 * Register: clinical-decision, low affect. The scenes are choices,
 * not endurance. Heavier than tn-4-1 because the speaking is in
 * daylight rather than in your head.
 *
 * Arc canon: the children are Nell (12, id "daughter") and Jonah
 * (8, id "son"), first named in L3/L6. Keep those names and ids in
 * any future scenario that puts the kids on screen.
 */

import type { Scenario } from "../../types";
import divorce11 from "./l1-1-the-decision-table";
import divorce21 from "./l2-1-the-lawyer-call";
import divorce31 from "./l3-1-the-kids-conversation";
import divorce41 from "./l4-1-the-family-disclosure";
import divorce51 from "./l5-1-the-move-out";
import divorce61 from "./l6-1-the-year-after";

export const DIVORCE_ARC_SCENARIOS: Scenario[] = [
  divorce11,
  divorce21,
  divorce31,
  divorce41,
  divorce51,
  divorce61,
];

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
