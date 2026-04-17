/**
 * Scenario registry. Add new scenarios here as they're written.
 *
 * Order in ALL_SCENARIOS determines the default progression on the
 * catalog page (grouped client-side by `level`).
 */

import type { Scenario } from "../types";
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

export const ALL_SCENARIOS: Scenario[] = [
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

/** Group scenarios by level. Used by the catalog page. */
export function scenariosByLevel(): Record<number, Scenario[]> {
  const buckets: Record<number, Scenario[]> = {};
  for (const s of ALL_SCENARIOS) {
    if (!buckets[s.level]) buckets[s.level] = [];
    buckets[s.level].push(s);
  }
  for (const level of Object.keys(buckets)) {
    buckets[Number(level)].sort((a, b) => a.order - b.order);
  }
  return buckets;
}

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
