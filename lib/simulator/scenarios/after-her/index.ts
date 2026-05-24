/**
 * After-Her track. Six levels on the months after she left you.
 * Reclamation, not grief. Sovereignty, not vengeance.
 *
 * Male protagonist. She never appears in scene (until L5-1 boss);
 * she is the absence the track teaches him to live around. Cast
 * antagonists are his own crew: the Boys (MARCUS_BOY), the Father
 * (JAMES_FATHER), the Sister (KAI_FRIEND, the laundered hoover).
 *
 * The hardest level on this track is L3 (rage is the seductive
 * feeling, the easier one).
 *
 * Six levels, two scenarios each. L5-1 is the boss (Shape D).
 */

import type { Scenario } from "../../types";
import afterHer11 from "./l1-1-the-unsent-text";
import afterHer12 from "./l1-2-the-audit";
import afterHer21 from "./l2-1-the-thirty-minutes";
import afterHer22 from "./l2-2-the-apartment";
import afterHer31 from "./l3-1-the-empty-sunday";
import afterHer32 from "./l3-2-the-boys";
import afterHer41 from "./l4-1-the-first-lift";
import afterHer42 from "./l4-2-the-father";
import afterHer51 from "./l5-1-the-voice-memo";
import afterHer52 from "./l5-2-the-sister";
import afterHer61 from "./l6-1-the-dinner";
import afterHer62 from "./l6-2-the-photo";

export const AFTER_HER_SCENARIOS: Scenario[] = [
  afterHer11,
  afterHer12,
  afterHer21,
  afterHer22,
  afterHer31,
  afterHer32,
  afterHer41,
  afterHer42,
  afterHer51,
  afterHer52,
  afterHer61,
  afterHer62,
];

export const AFTER_HER_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The First 72 Hours",
    blurb:
      "The unsent text. The audit. She did not blindside you. The first discipline is admitting that, then putting the phone down.",
  },
  2: {
    title: "The Funeral",
    blurb:
      "Schedule grief AND rage. They are one budget. The flat, audited object by object. The wedding invite declined cleanly.",
  },
  3: {
    title: "The Withdrawal",
    blurb:
      "The empty Sunday. The Boys at the bar with a plan. The toxic coach selling the same schedule in a male costume.",
  },
  4: {
    title: "The Costly Signal",
    blurb:
      "5:42 a.m. The first lift. No mirror selfie. Sunday lunch with your father. The not-asking is the lesson.",
  },
  5: {
    title: "The Hoover",
    blurb:
      "1:14 a.m. New number. A 47-second voice memo. Her sister DMs you a week later. The candor is the tactic.",
  },
  6: {
    title: "The Closing",
    blurb:
      "The first date with a woman the old you would not have noticed. The photo with no charge. You became the man.",
  },
};
