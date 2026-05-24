/**
 * After-Him track. Six levels on the months after he left you.
 * Reclamation, not grief. The thesis, from Kanika's own breakup post:
 * most extended breakup suffering is self-indulgent. Every minute spent
 * dwelling is a minute not spent building the life you want.
 *
 * Female protagonist. He never appears in scene (until L5-1 boss);
 * he is the absence the track teaches her to live around. Cast
 * antagonists are her own crew: the Girlfriend Council (NAOMI), the
 * accidental cafe encounter, the new man at the dinner.
 *
 * Six levels, two scenarios each. L5-1 is the boss (Shape D).
 */

import type { Scenario } from "../../types";
import afterHim11 from "./l1-1-the-unsent-text";
import afterHim12 from "./l1-2-the-audit";
import afterHim21 from "./l2-1-the-thirty-minutes";
import afterHim22 from "./l2-2-the-apartment";
import afterHim31 from "./l3-1-the-empty-tuesday";
import afterHim32 from "./l3-2-the-girlfriend-council";
import afterHim41 from "./l4-1-the-first-run";
import afterHim42 from "./l4-2-the-dinner-with-the-old-friends";
import afterHim51 from "./l5-1-the-vague-text";
import afterHim52 from "./l5-2-the-run-in";
import afterHim61 from "./l6-1-the-dinner";
import afterHim62 from "./l6-2-the-photo";

export const AFTER_HIM_SCENARIOS: Scenario[] = [
  afterHim11,
  afterHim12,
  afterHim21,
  afterHim22,
  afterHim31,
  afterHim32,
  afterHim41,
  afterHim42,
  afterHim51,
  afterHim52,
  afterHim61,
  afterHim62,
];

export const AFTER_HIM_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The First 72 Hours",
    blurb:
      "The unsent text. The audit. Silence is the floor of every other tactic. Every contact resets it to zero.",
  },
  2: {
    title: "The Funeral",
    blurb:
      "Schedule grief. The apartment, audited object by object. Feelings get a window. Outside the window, you redirect.",
  },
  3: {
    title: "The Withdrawal",
    blurb:
      "The Tuesday at 8 p.m. The Girlfriend Council ossifying the story over wine. The discipline of the subject change.",
  },
  4: {
    title: "The Costly Signal",
    blurb:
      "5:42 a.m. The first run. No photo, no caption. The dinner with the friends you neglected. The audit underneath.",
  },
  5: {
    title: "The Hoover",
    blurb:
      "The lowercase text from a new number. The accidental run-in at the cafe. His return is a measurement, not a verdict.",
  },
  6: {
    title: "The Closing",
    blurb:
      "The first date with someone new. The photo that surfaces with no charge. You did not get over him. You grew over him.",
  },
};
