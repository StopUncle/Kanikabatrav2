/**
 * Loving-Mira track. Long-form BPD narrative — the friend you can't
 * save, learning to stay in love without losing yourself. Nine
 * scenarios across five levels, alternating outside-POV (the friend)
 * and inside-POV (Mira herself) so the player feels both halves of
 * the dynamic.
 *
 * Register: warmer than other tracks. Kanika in italics between
 * beats. Names DBT skills explicitly (TIPP, GIVE, DEAR MAN, validation
 * levels). Anti-stigma stance throughout — Mira is not a villain,
 * she is the only character in any track who is also her own victim.
 *
 * The arc: meet (L1-1), the early-attachment escalation (L1-2),
 * inside the spiral (L2-1), the apology morning (L2-2), the empty
 * room (L3-1), the first sustained devaluation (L3-2), therapy and
 * DEAR MAN (L4-1), the older-sister survival-geometry call (L4-2),
 * eighteen months later witness (L5-1).
 *
 * Cast: Mira Voss (29 → 30, Williamsburg music producer, 7/9 DSM
 * criteria), the FP avatar (player), Vee (older sister, previous
 * FP), Dr. Alana Reyes (DBT therapist), Cameron (mentioned-only
 * previous FP, engaged now).
 */

import type { Scenario } from "../../types";
import lm11 from "./l1-1-the-loft";
import lm12 from "./l1-2-the-three-week-mark";
import lm21 from "./l2-1-are-we-okay";
import lm22 from "./l2-2-the-apology-morning";
import lm31 from "./l3-1-the-numb-day";
import lm32 from "./l3-2-the-devaluation";
import lm41 from "./l4-1-therapy";
import lm42 from "./l4-2-the-vee-conversation";
import lm51 from "./l5-1-the-recovery";

export const LOVING_MIRA_SCENARIOS: Scenario[] = [
  lm11,
  lm12,
  lm21,
  lm22,
  lm31,
  lm32,
  lm41,
  lm42,
  lm51,
];

export const LOVING_MIRA_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "Meeting",
    blurb:
      "The loft, the three-week mark — the early-attachment escalation that feels like recognition.",
  },
  2: {
    title: "The First Spiral",
    blurb:
      "Inside her body the night the cycle fires. The morning after, two coffees on your stoop.",
  },
  3: {
    title: "The Empty Room",
    blurb:
      "Chronic emptiness on a Saturday. The first sustained devaluation on a Tuesday at 6:42 p.m.",
  },
  4: {
    title: "The Tools",
    blurb:
      "DEAR MAN in Reyes's office. Survival geometry from the airport with the previous FP.",
  },
  5: {
    title: "The Witness",
    blurb:
      "Eighteen months later. Pasta, the dog, the quiet evening that 18-month recovery actually produces.",
  },
};
