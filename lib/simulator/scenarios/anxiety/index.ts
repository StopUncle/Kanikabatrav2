/**
 * Anxiety track — long-form arc following Sam Ruiz across roughly twelve
 * months of CBT-grounded recovery from GAD with social-anxiety overlap.
 * Replaces the previous 8-vignette anxiety track. See
 * reference/RESEARCH-anxiety.md and reference/TRACK-anxiety-design.md
 * for full design.
 *
 * The arc:
 *   L1 — Recognising the Pattern (3 a.m. spiral / morning-after gap)
 *   L2 — The Loop in Daylight (the waiting / wrong-source reassurance)
 *   L3 — The Bottom of the Trough (panic in public / the avoidance fork)
 *   L4 — The Tools (interoceptive exposure / the witnessed spiral)
 *   L5 — The Witness (twelve months later — the wedding)
 *
 * POV: player IS Sam throughout, with one 90-second flip to Mia in L4-2.
 *
 * Voice: CBT-structured therapy scenes (named cognitive distortions,
 * worksheet language, columns drawn on notepads). Body-first writing
 * for the 3 a.m. and panic scenes. Anti-stigma throughout.
 */

import type { Scenario } from "../../types";
import anxiety11 from "./l1-1-the-3am-slack";
import anxiety12 from "./l1-2-the-morning-after";
import anxiety21 from "./l2-1-the-waiting";
import anxiety22 from "./l2-2-calling-eli";
import anxiety31 from "./l3-1-the-grocery-store";
import anxiety32 from "./l3-2-the-morning-after-panic";
import anxiety41 from "./l4-1-therapy";
import anxiety42 from "./l4-2-the-witnessed-spiral";
import anxiety51 from "./l5-1-the-wedding";

export const ANXIETY_SCENARIOS: Scenario[] = [
  anxiety11,
  anxiety12,
  anxiety21,
  anxiety22,
  anxiety31,
  anxiety32,
  anxiety41,
  anxiety42,
  anxiety51,
];

export const ANXIETY_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "Recognising the Pattern",
    blurb:
      "The 3 a.m. body. The morning-after gap where the lesson is available, if you metabolise it.",
  },
  2: {
    title: "The Loop in Daylight",
    blurb:
      "The silence your body fills with story. The wrong-source reassurance call to the brother who loves you and dismisses you.",
  },
  3: {
    title: "The Bottom of the Trough",
    blurb:
      "Real panic in the cereal aisle. The fork at the avoidance road on Monday morning.",
  },
  4: {
    title: "The Tools",
    blurb:
      "Interoceptive exposure with Lin. The witnessed spiral, and the partner who holds the line.",
  },
  5: {
    title: "The Witness",
    blurb:
      "Twelve months later. A wedding. The body fires. You know what to do.",
  },
};
