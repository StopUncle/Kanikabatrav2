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
import { ANXIETY_SCENARIOS, ANXIETY_LEVEL_TITLES } from "./anxiety";
import {
  TOXIC_NARC_SCENARIOS,
  TOXIC_NARC_LEVEL_TITLES,
} from "./toxic-narc";
import { PC_CHILD_SCENARIOS, PC_CHILD_LEVEL_TITLES } from "./pc-child";
import {
  CLUSTER_B_LAB_SCENARIOS,
  CLUSTER_B_LAB_LEVEL_TITLES,
} from "./cluster-b-lab";
import {
  DIVORCE_ARC_SCENARIOS,
  DIVORCE_ARC_LEVEL_TITLES,
} from "./divorce-arc";
import {
  LOVING_MIRA_SCENARIOS,
  LOVING_MIRA_LEVEL_TITLES,
} from "./loving-mira";
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
import mission111 from "./mission-11-1";
import mission112 from "./mission-11-2";
import mission121 from "./mission-12-1";
import mission122 from "./mission-12-2";
import mission131 from "./mission-13-1";
import mission132 from "./mission-13-2";
import mission141 from "./mission-14-1";
import mission142 from "./mission-14-2";

/**
 * Female track, the original Maris-arc scenarios. `track` is implicit
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
  mission111,
  mission112,
  mission121,
  mission122,
  mission131,
  mission132,
  mission141,
  mission142,
];

export {
  MALE_BUSINESS_SCENARIOS,
  MALE_DATING_SCENARIOS,
  ANXIETY_SCENARIOS,
  TOXIC_NARC_SCENARIOS,
  PC_CHILD_SCENARIOS,
  CLUSTER_B_LAB_SCENARIOS,
  DIVORCE_ARC_SCENARIOS,
  LOVING_MIRA_SCENARIOS,
};

export const ALL_SCENARIOS: Scenario[] = [
  ...FEMALE_SCENARIOS,
  ...MALE_BUSINESS_SCENARIOS,
  ...MALE_DATING_SCENARIOS,
  ...ANXIETY_SCENARIOS,
  ...TOXIC_NARC_SCENARIOS,
  ...PC_CHILD_SCENARIOS,
  ...CLUSTER_B_LAB_SCENARIOS,
  ...DIVORCE_ARC_SCENARIOS,
  ...LOVING_MIRA_SCENARIOS,
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
  if (track === "anxiety") return ANXIETY_LEVEL_TITLES;
  if (track === "toxic-narc") return TOXIC_NARC_LEVEL_TITLES;
  if (track === "pc-child") return PC_CHILD_LEVEL_TITLES;
  if (track === "cluster-b-lab") return CLUSTER_B_LAB_LEVEL_TITLES;
  if (track === "divorce-arc") return DIVORCE_ARC_LEVEL_TITLES;
  if (track === "loving-mira") return LOVING_MIRA_LEVEL_TITLES;
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
  anxiety: {
    label: "Self-Regulation",
    sublabel: "Interior work · the 3 a.m. text · urge-surfing · ally routing",
    href: "/consilium/simulator?track=anxiety",
  },
  "toxic-narc": {
    label: "Toxic Narcissist",
    sublabel: "Narc parent · boss · sibling · spouse · in-law · friend",
    href: "/consilium/simulator?track=toxic-narc",
  },
  "pc-child": {
    label: "Psychopath Child",
    sublabel: "Parental POV · conduct disorder · ages 5 to 20",
    href: "/consilium/simulator?track=pc-child",
  },
  "cluster-b-lab": {
    label: "Cluster-B Lab",
    sublabel: "Short drills · BPD / NPD / ASPD / HPD · audit, diagnose, prescribe",
    href: "/consilium/simulator?track=cluster-b-lab",
  },
  "divorce-arc": {
    label: "Divorce Arc",
    sublabel: "Long-form · the speaking, the lawyer, the kids, the year after",
    href: "/consilium/simulator?track=divorce-arc",
  },
  "loving-mira": {
    label: "Loving Mira",
    sublabel:
      "Long-form BPD narrative · the friend you can't save · learn to stay in love without losing yourself",
    href: "/consilium/simulator?track=loving-mira",
  },
};

/** Human title for each level, shown as section headers on the catalog. */
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
  11: {
    title: "The Weight",
    blurb: "Five years of silence, then the envelope. The return, on your curfew, not hers.",
  },
  12: {
    title: "The Lateral",
    blurb:
      "She could not get the signature, so she is getting the people. The discipline of not defending.",
  },
  13: {
    title: "The Crisis",
    blurb:
      "The smear left the family. The first hour is the hour the next nine days are built on. Lawyer first.",
  },
  14: {
    title: "The Frame",
    blurb:
      "The episode drops. The work after the public moment is being the person the preemptive piece described.",
  },
};
