/**
 * Static tier ladder for the weekly Tells league.
 *
 * Names lean ominous, not Bronze/Silver/Gold. The voice has to match
 * Kanika's brand: declarative, slightly cold, never cute. Bottom tier
 * is a quiet judgement, top tier is an honour code.
 *
 * Order is the integer ladder position. 0 is the bottom (everyone
 * starts here on their very first week). The top tier promotes to
 * itself (you can't go higher than top); the bottom tier demotes to
 * itself.
 *
 * Elo bands are used for FIRST-WEEK assignment only. After week 1, a
 * user's tier is driven by the previous resolved membership's outcome
 * (PROMOTED → tier+1, DEMOTED → tier-1, HELD → same tier). That's
 * what makes the league feel like a ladder you climb instead of a
 * decoration on top of the existing Elo.
 */

export interface TierDef {
  /** Position on the ladder. 0 = bottom. */
  order: number;
  /** Display name. Stored on League rows so renaming is a non-event. */
  name: string;
  /** Inclusive lower bound on average Elo for first-week assignment. */
  eloMin: number;
  /**
   * Exclusive upper bound. Top tier uses Number.MAX_SAFE_INTEGER so
   * "above this Elo" always lands here.
   */
  eloMax: number;
}

export const TIERS: ReadonlyArray<TierDef> = [
  { order: 0, name: "The Hollow Hour",   eloMin: 0,    eloMax: 1100 },
  { order: 1, name: "The Silent Eight",  eloMin: 1100, eloMax: 1300 },
  { order: 2, name: "The Gilded Twelve", eloMin: 1300, eloMax: 1500 },
  { order: 3, name: "The Detached",      eloMin: 1500, eloMax: Number.MAX_SAFE_INTEGER },
];

export const TOP_TIER_ORDER = TIERS[TIERS.length - 1].order;
export const BOTTOM_TIER_ORDER = TIERS[0].order;

/**
 * Find the tier whose Elo band contains a given rating. Used for the
 * first week of any user (no prior resolved membership) and for
 * training bots whose synthetic Elo straight-maps to a tier.
 */
export function tierForElo(elo: number): TierDef {
  for (const t of TIERS) {
    if (elo >= t.eloMin && elo < t.eloMax) return t;
  }
  // Defensive: should be unreachable because the top tier's eloMax is
  // MAX_SAFE_INTEGER, but a negative Elo would slip through. Floor to
  // bottom in that case.
  return TIERS[0];
}

/** Tier by order, or null if out of bounds (used by the ladder math). */
export function tierByOrder(order: number): TierDef | null {
  return TIERS.find((t) => t.order === order) ?? null;
}

/**
 * Promote / demote / hold → next tier. Top-tier promotion stays at top
 * (the honour code; you've made it). Bottom-tier demotion stays at
 * bottom (you can't fall off the ladder).
 */
export function nextTierForOutcome(
  currentOrder: number,
  outcome: "PROMOTED" | "DEMOTED" | "HELD",
): TierDef {
  if (outcome === "PROMOTED") {
    return tierByOrder(Math.min(currentOrder + 1, TOP_TIER_ORDER)) ?? TIERS[0];
  }
  if (outcome === "DEMOTED") {
    return tierByOrder(Math.max(currentOrder - 1, BOTTOM_TIER_ORDER)) ?? TIERS[0];
  }
  return tierByOrder(currentOrder) ?? TIERS[0];
}
