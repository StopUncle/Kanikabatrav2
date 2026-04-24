/**
 * Toxic Narcissist track — everyday-context narcissism.
 * See reference/TRACK-toxic-narc.md for full design.
 * Phase 1: L1-1 only. L1-2 and L2-1 are skeletons in the design doc.
 */

import type { Scenario } from "../../types";
import toxicNarc11 from "./l1-1-the-mothers-call";
import toxicNarc12 from "./l1-2-the-missed-calls";
import toxicNarc21 from "./l2-1-the-boss-email";
import toxicNarc31 from "./l3-1-the-family-group-chat";
import toxicNarc41 from "./l4-1-the-eighteen-month-exit";
import toxicNarc51 from "./l5-1-christmas-at-his-parents";

export const TOXIC_NARC_SCENARIOS: Scenario[] = [
  toxicNarc11,
  toxicNarc12,
  toxicNarc21,
  toxicNarc31,
  toxicNarc41,
  toxicNarc51,
];

export const TOXIC_NARC_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "The Narc Parent",
    blurb: "Mother or father. The register you were raised in. The one you are still learning to decline.",
  },
  2: {
    title: "The Narc Boss",
    blurb: 'Covert. "Just circling back" at 5:58 p.m. on a Friday. No pressure is a threat.',
  },
  3: {
    title: "The Narc Sibling",
    blurb: "Golden-child dynamics, played at adult scale, through the family group chat.",
  },
  4: {
    title: "The Narc Spouse",
    blurb: "Long-term marriage. The 18-month exit. Survival, not escape, is the unit of work.",
  },
  5: {
    title: "The Narc In-Law",
    blurb: "Your partner's parent running the register on you. Triangulated through the person you love.",
  },
  6: {
    title: "The Narc Friend",
    blurb: "The one you are afraid to audit because you love her. Audit her anyway.",
  },
};
