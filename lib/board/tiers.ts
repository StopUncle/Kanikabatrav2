/**
 * The Board tier system. Five PCL-R-anchored bands at 20-point intervals.
 *
 * Pure module (no prisma, no server imports) so it is safe to use in
 * client components for badge rendering and the scale strip. The clinical
 * thresholds (US 30/40 = 75, UK 25/40 = 62.5) land inside the ELEVATED
 * band, which is why that band is the "crossing the line" tier and carries
 * the heaviest disclaimer alongside HIGH.
 */

import { Tier } from "@prisma/client";

export interface TierMeta {
  key: Tier;
  /** Full label shown on the scorecard header. */
  label: string;
  /** Short label for the row badge. */
  badge: string;
  /** Inclusive composite range [min, max]. */
  range: [number, number];
  /**
   * Whether this band sits at or above the clinical-threshold range. The
   * persistent disclaimer rides especially hard on these two; UI may also
   * style them with extra restraint.
   */
  isTopTier: boolean;
}

export const TIERS: TierMeta[] = [
  { key: "NEGLIGIBLE", label: "Negligible Traits", badge: "Negligible", range: [0, 19], isTopTier: false },
  { key: "LOW", label: "Low Trait Profile", badge: "Low", range: [20, 39], isTopTier: false },
  { key: "MODERATE", label: "Moderate / Subclinical Pattern", badge: "Moderate", range: [40, 59], isTopTier: false },
  { key: "ELEVATED", label: "Elevated Trait Profile", badge: "Elevated", range: [60, 79], isTopTier: true },
  { key: "HIGH", label: "High Trait Profile", badge: "High", range: [80, 100], isTopTier: true },
];

const TIER_BY_KEY: Record<Tier, TierMeta> = TIERS.reduce(
  (acc, t) => {
    acc[t.key] = t;
    return acc;
  },
  {} as Record<Tier, TierMeta>,
);

/** Metadata for a tier enum value. */
export function tierMeta(tier: Tier): TierMeta {
  return TIER_BY_KEY[tier];
}

/**
 * Derive the tier band from a 0-100 composite. Used at scoring time and
 * as a safety net so a row's badge always matches its number even if the
 * stored tier and composite ever drift.
 */
export function tierForComposite(composite: number): Tier {
  const clamped = Math.max(0, Math.min(100, composite));
  const match = TIERS.find((t) => clamped >= t.range[0] && clamped <= t.range[1]);
  return match ? match.key : "NEGLIGIBLE";
}

/** The two PCL-R factor labels, used on every factor bar. */
export const FACTOR_LABELS = {
  factor1: "Interpersonal / Affective",
  factor2: "Lifestyle / Antisocial",
} as const;

/** Human labels for the archetype tag. */
export const ARCHETYPE_LABELS: Record<"OPERATOR" | "TRAINWRECK", string> = {
  OPERATOR: "Operator",
  TRAINWRECK: "Trainwreck",
};

/** The persistent disclaimer. Rendered on every scorecard, never optional. */
export const BOARD_DISCLAIMER =
  "Armchair pattern observation. Not a clinical diagnosis.";
