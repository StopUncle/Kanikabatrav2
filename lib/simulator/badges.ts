/**
 * Dark Mirror simulator badges.
 *
 * Three tiers:
 *   - SCENARIO: earned per scenario outcome (one per scenario × outcome)
 *   - LEVEL: earned when all scenarios in a level complete with ≥ 1 good outcome
 *   - MASTERY: earned for narrative milestones (all-optimal runs, secrets)
 *
 * Badge keys are stable slugs — once shipped, never rename (earned rows
 * reference them). Add new badges, don't mutate existing.
 */

import type { Scenario, SimulatorState } from "./types";

export type SimulatorBadgeDef = {
  key: string;
  title: string;
  description: string;
  tier: "scenario" | "level" | "mastery";
  /** Icon hint — the UI picks a lucide icon by this name. */
  icon: "shield" | "crown" | "eye" | "sparkles" | "flame" | "skull" | "star";
};

export const SIMULATOR_BADGES: SimulatorBadgeDef[] = [
  // Mission 1-1 — The Morning After
  {
    key: "mission-1-1-good",
    title: "Reputation Intact",
    description:
      "Passed Mission 1-1 without bragging or leaking. Information discipline learned.",
    tier: "scenario",
    icon: "shield",
  },
  {
    key: "mission-1-1-neutral",
    title: "Morning Survivor",
    description: "Made it through Mission 1-1. Some scars, nothing fatal.",
    tier: "scenario",
    icon: "sparkles",
  },
  {
    key: "mission-1-1-bad",
    title: "Lesson Learned",
    description:
      "Mission 1-1 ended badly. Every loss is a study session. Take notes.",
    tier: "scenario",
    icon: "flame",
  },
  {
    key: "mission-1-1-mastery",
    title: "The Unspent Currency",
    description:
      "Completed Mission 1-1 with every optimal choice. Information is currency — and you didn't spend any.",
    tier: "mastery",
    icon: "eye",
  },

  // Level 1 — all scenarios complete with at least one good outcome
  {
    key: "level-1-complete",
    title: "University — Cleared",
    description:
      "Navigated every Level 1 scenario. You can see the game now; time to play it.",
    tier: "level",
    icon: "crown",
  },
];

export const BADGE_BY_KEY: Record<string, SimulatorBadgeDef> = Object.fromEntries(
  SIMULATOR_BADGES.map((b) => [b.key, b]),
);

/**
 * Compute the badges a completed state earns. Caller is responsible for
 * not re-awarding badges that already exist in the DB (the unique key
 * constraint on (userId, badgeKey) also protects us).
 */
export function badgesEarnedFromState(
  scenario: Scenario,
  state: SimulatorState,
): string[] {
  if (!state.outcome || !state.endedAt) return [];

  const keys: string[] = [];

  // Outcome-bucketed scenario badge — always awarded on completion
  const outcome = state.outcome;
  if (outcome === "good" || outcome === "passed") {
    keys.push(`${scenario.id}-good`);
  } else if (outcome === "bad" || outcome === "failed") {
    keys.push(`${scenario.id}-bad`);
  } else {
    keys.push(`${scenario.id}-neutral`);
  }

  // Mastery — every logged choice was optimal AND outcome was good
  if (
    (outcome === "good" || outcome === "passed") &&
    state.choicesMade.length > 0 &&
    state.choicesMade.every((c) => c.wasOptimal)
  ) {
    keys.push(`${scenario.id}-mastery`);
  }

  return keys.filter((k) => BADGE_BY_KEY[k] !== undefined);
}
