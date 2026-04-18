/**
 * Scenario registry. Add new scenarios here as they're written.
 *
 * Order in ALL_SCENARIOS determines the default progression on the
 * catalog page (grouped client-side by `level`).
 */

import type { Scenario, ScenarioTrack } from "../types";
import {
  MALE_BUSINESS_SCENARIOS,
  MALE_BUSINESS_LEVEL_TITLES,
} from "./male-business";
import {
  MALE_DATING_SCENARIOS,
  MALE_DATING_LEVEL_TITLES,
} from "./male-dating";
import mission11 from "./mission-1-1";
import mission12 from "./mission-1-2";
import mission21 from "./mission-2-1";
import mission22 from "./mission-2-2";
import mission31 from "./mission-3-1";
import mission32 from "./mission-3-2";
import mission41 from "./mission-4-1";
import mission42 from "./mission-4-2";
import mission51 from "./mission-5-1";
import mission52 from "./mission-5-2";
import mission61 from "./mission-6-1";
import mission62 from "./mission-6-2";
import mission71 from "./mission-7-1";
import mission72 from "./mission-7-2";
import mission81 from "./mission-8-1";
import mission82 from "./mission-8-2";
import mission91 from "./mission-9-1";
import mission92 from "./mission-9-2";
import mission101 from "./mission-10-1";
import mission102 from "./mission-10-2";

/**
 * Female track — the original Maris-arc scenarios. `track` is implicit
 * ("female") on these when omitted. The `getTrack()` helper resolves it.
 */
export const FEMALE_SCENARIOS: Scenario[] = [
  mission11,
  mission12,
  mission21,
  mission22,
  mission31,
  mission32,
  mission41,
  mission42,
  mission51,
  mission52,
  mission61,
  mission62,
  mission71,
  mission72,
  mission81,
  mission82,
  mission91,
  mission92,
  mission101,
  mission102,
];

export { MALE_BUSINESS_SCENARIOS, MALE_DATING_SCENARIOS };

export const ALL_SCENARIOS: Scenario[] = [
  ...FEMALE_SCENARIOS,
  ...MALE_BUSINESS_SCENARIOS,
  ...MALE_DATING_SCENARIOS,
];

/**
 * Resolve a scenario's track. Legacy scenarios without an explicit `track`
 * field are treated as "female" for backwards compatibility.
 */
export function getTrack(s: Scenario): ScenarioTrack {
  return s.track ?? "female";
}

/** Scenarios filtered to one track, ordered by level then in-level order. */
export function scenariosForTrack(track: ScenarioTrack): Scenario[] {
  return ALL_SCENARIOS.filter((s) => getTrack(s) === track).sort((a, b) =>
    a.level === b.level ? a.order - b.order : a.level - b.level,
  );
}

export const SCENARIO_BY_ID: Record<string, Scenario> = Object.fromEntries(
  ALL_SCENARIOS.map((s) => [s.id, s]),
);

export function getScenario(id: string): Scenario | null {
  return SCENARIO_BY_ID[id] ?? null;
}

/** Scenarios accessible to a given Consilium tier. */
export function scenariosForTier(tier: "free" | "premium" | "vip"): Scenario[] {
  if (tier === "vip") return ALL_SCENARIOS;
  if (tier === "premium")
    return ALL_SCENARIOS.filter((s) => s.tier === "free" || s.tier === "premium");
  return ALL_SCENARIOS.filter((s) => s.tier === "free");
}

/**
 * Group scenarios by level. Used by the catalog page.
 * When `track` is provided, only that track's scenarios are grouped —
 * each track numbers its levels from 1 independently, so the page renders
 * one coherent ladder per track.
 */
export function scenariosByLevel(
  track?: ScenarioTrack,
): Record<number, Scenario[]> {
  const source = track ? scenariosForTrack(track) : ALL_SCENARIOS;
  const buckets: Record<number, Scenario[]> = {};
  for (const s of source) {
    if (!buckets[s.level]) buckets[s.level] = [];
    buckets[s.level].push(s);
  }
  for (const level of Object.keys(buckets)) {
    buckets[Number(level)].sort((a, b) => a.order - b.order);
  }
  return buckets;
}

/**
 * Track-aware level titles. The female simulator uses `LEVEL_TITLES`
 * directly; male tracks each have their own level titles keyed by track.
 */
export function levelTitlesForTrack(
  track: ScenarioTrack,
): Record<number, { title: string; blurb: string }> {
  if (track === "male-business") return MALE_BUSINESS_LEVEL_TITLES;
  if (track === "male-dating") return MALE_DATING_LEVEL_TITLES;
  return LEVEL_TITLES;
}

/** Track metadata for the branch selector UI. */
export const TRACK_META: Record<
  ScenarioTrack,
  { label: string; sublabel: string; href: string }
> = {
  female: {
    label: "Feminine",
    sublabel: "The Maris arc · dark-psych at the gala and beyond",
    href: "/consilium/simulator?track=female",
  },
  "male-business": {
    label: "Business Line",
    sublabel: "Power · career · capital · dark-psych in rooms that matter",
    href: "/consilium/simulator?track=male-business",
  },
  "male-dating": {
    label: "Dating Line",
    sublabel: "Mate selection · BPD/HPD · gaslight · hoover · choose secure",
    href: "/consilium/simulator?track=male-dating",
  },
};

/** Human title for each level — shown as section headers on the catalog. */
export const LEVEL_TITLES: Record<number, { title: string; blurb: string }> = {
  1: {
    title: "Awareness",
    blurb: "See the game before you step into it.",
  },
  2: {
    title: "Information Discipline",
    blurb: "Keep what you know to yourself. Especially in group chats.",
  },
  3: {
    title: "Boundary Warfare",
    blurb: "No without justification. Grey rock under pressure.",
  },
  4: {
    title: "Defense",
    blurb: "Smears, DARVO, public ambushes. How you stay when you're targeted.",
  },
  5: {
    title: "Mastery",
    blurb: "The gravity has shifted. Use it consciously.",
  },
  6: {
    title: "Career Power",
    blurb: "Credit thieves, hostile negotiations, meeting politics.",
  },
  7: {
    title: "Dating Strategy",
    blurb: "Invest proportional to evidence. Exit cleanly when you must.",
  },
  8: {
    title: "Family Dynamics",
    blurb: "Twenty-nine-year-old scripts. Breaking them or being broken by them.",
  },
  9: {
    title: "The Long Game",
    blurb: "Six months of whispers you never heard. What to do in three weeks.",
  },
  10: {
    title: "Endgame",
    blurb: "You are the gatekeeper now. Everything you've built rests on who you name.",
  },
};
