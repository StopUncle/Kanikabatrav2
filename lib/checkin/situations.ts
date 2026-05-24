/**
 * Daily Check-In situations.
 *
 * Eight buckets + an "exploring" no-op. Each bucket is one sentence in
 * Kanika voice and resolves to a Simulator track. Two buckets are
 * gender-aware (reading-a-new-relationship, partner-cluster-b) because
 * the catalogue has gender-specific tracks for those situations; everything
 * else is single-mapped.
 *
 * The mapping is intentionally lossy: a member with two situations on a
 * given day picks the louder one; the rest of the catalogue stays
 * browsable below the recommendation.
 *
 * Kanika voice rules (per the parent CLAUDE.md):
 *   - No em dashes.
 *   - Terse, decision-led, no marketing fluff.
 *   - Reasons land in one short sentence.
 */

import type { ScenarioTrack } from "../simulator/types";

/** Stable slug for the situation. Stored on DailyCheckIn.situation. */
export type SituationKey =
  | "he-left"
  | "she-left"
  | "leaving-someone"
  | "narc-in-life"
  | "new-relationship"
  | "partner-cluster-b"
  | "work-power"
  | "own-head"
  | "exploring";

/** What the chip says on the card. Imperative-fragment, not a question. */
export interface Situation {
  key: SituationKey;
  /** Short label for the option button. */
  label: string;
  /** The track this maps to. `null` means no recommendation (browse). */
  trackFor: (
    gender: "MALE" | "FEMALE" | null,
  ) => ScenarioTrack | null;
  /** One-line Kanika voice reason shown after the user picks. */
  reasonFor: (gender: "MALE" | "FEMALE" | null) => string;
}

export const SITUATIONS: ReadonlyArray<Situation> = [
  {
    key: "he-left",
    label: "He left.",
    trackFor: () => "after-him",
    reasonFor: () =>
      "After Him. Six levels on the months after he left you. Reclamation, not grief.",
  },
  {
    key: "she-left",
    label: "She left.",
    trackFor: () => "after-her",
    reasonFor: () =>
      "After Her. Six levels on the months after she left you. Sovereignty, not vengeance.",
  },
  {
    key: "leaving-someone",
    label: "I'm leaving someone, or about to.",
    trackFor: () => "divorce-arc",
    reasonFor: () =>
      "Divorce Arc. The speaking, the lawyer, the kids, the year after. Decision register, low affect.",
  },
  {
    key: "narc-in-life",
    label: "There's a narcissist in my life.",
    trackFor: () => "toxic-narc",
    reasonFor: () =>
      "Toxic Narcissist. Parent, boss, sibling, spouse, in-law, friend. Six relationships, one playbook.",
  },
  {
    key: "new-relationship",
    label: "I'm reading a new relationship.",
    trackFor: (g) => (g === "MALE" ? "male-dating" : "female"),
    reasonFor: (g) =>
      g === "MALE"
        ? "Dating Line. Mate selection, BPD/HPD, gaslight, hoover, choose secure."
        : "Feminine. The Maris arc. Dark psychology at the gala and beyond.",
  },
  {
    key: "partner-cluster-b",
    label: "Cluster-B traits in someone close.",
    trackFor: (g) => (g === "FEMALE" ? "loving-mira" : "cluster-b-lab"),
    reasonFor: (g) =>
      g === "FEMALE"
        ? "Loving Mira. Long-form BPD narrative. Learn to stay in love without losing yourself."
        : "Cluster-B Lab. Short drills, BPD / NPD / ASPD / HPD. Audit, diagnose, prescribe.",
  },
  {
    key: "work-power",
    label: "Power play at work.",
    trackFor: () => "male-business",
    reasonFor: () =>
      "Business Line. Credit thieves, hostile negotiations, meeting politics. Sixteen rooms.",
  },
  {
    key: "own-head",
    label: "My own head is the problem.",
    trackFor: () => "anxiety",
    reasonFor: () =>
      "Self-Regulation. The 3 a.m. text, urge-surfing, the pre-authored reply. Interior work.",
  },
  {
    key: "exploring",
    label: "Just exploring.",
    trackFor: () => null,
    reasonFor: () =>
      "No recommendation today. The full catalogue is below; pick the one that's loudest right now.",
  },
];

const BY_KEY: Record<SituationKey, Situation> = Object.fromEntries(
  SITUATIONS.map((s) => [s.key, s]),
) as Record<SituationKey, Situation>;

export function getSituation(key: string): Situation | null {
  return (BY_KEY as Record<string, Situation | undefined>)[key] ?? null;
}

/**
 * Resolve a situation to a track for the given user gender. Null when
 * the bucket is "exploring" or any unknown key.
 */
export function resolveTrack(
  key: string,
  gender: "MALE" | "FEMALE" | null,
): ScenarioTrack | null {
  const situation = getSituation(key);
  if (!situation) return null;
  return situation.trackFor(gender);
}

/** Format a UTC Date as YYYY-MM-DD (matches DailyCheckIn.checkedDate). */
export function utcDateKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}
