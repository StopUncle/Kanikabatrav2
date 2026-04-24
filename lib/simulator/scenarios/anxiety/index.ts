/**
 * Anxiety track — interior scenarios for self-regulation.
 * See reference/TRACK-anxiety.md for full design.
 * Phase 1: L1-1 only. L1-2 and L1-3 are skeletons in the design doc,
 * to be shipped in subsequent commits.
 */

import type { Scenario } from "../../types";
import anxiety11 from "./l1-1-the-3am-draft";
import anxiety12 from "./l1-2-the-morning-after";
import anxiety13 from "./l1-3-the-read-receipt";
import anxiety21 from "./l2-1-the-waiting";
import anxiety22 from "./l2-2-the-reply";
import anxiety31 from "./l3-1-the-first-date";

export const ANXIETY_SCENARIOS: Scenario[] = [
  anxiety11,
  anxiety12,
  anxiety13,
  anxiety21,
  anxiety22,
  anxiety31,
];

export const ANXIETY_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The 3 a.m. Text",
    blurb:
      "The antagonist is not on-screen. It is your own nervous system at the worst hour of the night.",
  },
  2: {
    title: "The Waiting",
    blurb: "He has not replied. Your nervous system fills the silence with a story.",
  },
  3: {
    title: "The First Date",
    blurb: "Hypervigilance. Body-reading. Telling warm from warmth-performed.",
  },
  4: {
    title: "The Group Chat",
    blurb: "The chat has gone quiet. The quiet is not about you. Remember that.",
  },
  5: {
    title: "The Presentation",
    blurb: "Performance anxiety. The slide deck rewritten for the eleventh time.",
  },
};
