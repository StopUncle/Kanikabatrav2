/**
 * Dark Mirror meta-achievements.
 *
 * Layered ON TOP of the existing 85 per-scenario badges in badges.ts —
 * these are cross-scenario accolades that reward cumulative play. Stored
 * in the same SimulatorBadge table with an "ach-" prefix so no new table
 * or migration is needed.
 *
 * Keys are stable slugs — once shipped, never rename (earned rows will
 * reference them). Add new achievements, don't mutate existing.
 */

import type { SimulatorBadgeDef } from "./badges";
import type { OutcomeType } from "./types";
import { ALL_SCENARIOS } from "./scenarios";

export type AchievementProgressSnapshot = {
  /** All completed SimulatorProgress rows for the user. */
  completions: Array<{
    scenarioId: string;
    outcome: OutcomeType | null;
    xpEarned: number;
    choicesMade: Array<{ wasOptimal: boolean }>;
  }>;
  /** Set of badge keys the user already holds (from SimulatorBadge rows). */
  badgesHeld: Set<string>;
};

export type AchievementDef = {
  key: string;
  title: string;
  description: string;
  icon: SimulatorBadgeDef["icon"];
  /** Does the user satisfy this achievement right now? */
  isEarned: (snap: AchievementProgressSnapshot) => boolean;
  /**
   * Optional progress reporter — lets the UI render "12 / 25" and a bar
   * on locked achievements. Return undefined for binary achievements.
   */
  progress?: (snap: AchievementProgressSnapshot) => {
    current: number;
    total: number;
  };
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function optimalCount(snap: AchievementProgressSnapshot): number {
  let n = 0;
  for (const c of snap.completions) {
    for (const m of c.choicesMade) if (m.wasOptimal) n++;
  }
  return n;
}

function goodOrMastery(
  snap: AchievementProgressSnapshot,
  scenarioId: string,
): boolean {
  const run = snap.completions.find((c) => c.scenarioId === scenarioId);
  if (!run) return false;
  return run.outcome === "good";
}

function hasMasteryBadge(
  snap: AchievementProgressSnapshot,
  scenarioId: string,
): boolean {
  return snap.badgesHeld.has(`${scenarioId}-mastery`);
}

function scenariosAtLevel(level: number): string[] {
  return ALL_SCENARIOS.filter((s) => s.level === level).map((s) => s.id);
}

// ---------------------------------------------------------------------------
// The eight
// ---------------------------------------------------------------------------

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    key: "first-strike",
    title: "First Strike",
    description: "Finish your first scenario. Any ending counts.",
    icon: "star",
    isEarned: (s) => s.completions.length >= 1,
  },
  {
    key: "cold-eye",
    title: "Cold Eye",
    description: "Land your first good ending. You saw it coming.",
    icon: "eye",
    isEarned: (s) => s.completions.some((c) => c.outcome === "good"),
  },
  {
    key: "level-1-cleared",
    title: "Level One Cleared",
    description:
      "Good endings on both Level 1 scenarios. The floor is set.",
    icon: "shield",
    isEarned: (s) =>
      scenariosAtLevel(1).every((id) => goodOrMastery(s, id)),
    progress: (s) => {
      const ids = scenariosAtLevel(1);
      const done = ids.filter((id) => goodOrMastery(s, id)).length;
      return { current: done, total: ids.length };
    },
  },
  {
    key: "the-apprentice",
    title: "The Apprentice",
    description:
      "Good endings across Levels 1 through 3 — the whole free tier.",
    icon: "sparkles",
    isEarned: (s) => {
      const ids = [1, 2, 3].flatMap(scenariosAtLevel);
      return ids.every((id) => goodOrMastery(s, id));
    },
    progress: (s) => {
      const ids = [1, 2, 3].flatMap(scenariosAtLevel);
      const done = ids.filter((id) => goodOrMastery(s, id)).length;
      return { current: done, total: ids.length };
    },
  },
  {
    key: "strategist",
    title: "Strategist",
    description: "25 optimal choices across every scenario you've played.",
    icon: "award",
    isEarned: (s) => optimalCount(s) >= 25,
    progress: (s) => ({
      current: Math.min(optimalCount(s), 25),
      total: 25,
    }),
  },
  {
    key: "cold-reader",
    title: "Cold Reader",
    description: "50 optimal choices. You're reading the room, not playing it.",
    icon: "crown",
    isEarned: (s) => optimalCount(s) >= 50,
    progress: (s) => ({
      current: Math.min(optimalCount(s), 50),
      total: 50,
    }),
  },
  {
    key: "endgame",
    title: "Endgame",
    description:
      "Good endings on both Level 10 scenarios. The legacy move.",
    icon: "crown",
    isEarned: (s) =>
      scenariosAtLevel(10).every((id) => goodOrMastery(s, id)),
    progress: (s) => {
      const ids = scenariosAtLevel(10);
      const done = ids.filter((id) => goodOrMastery(s, id)).length;
      return { current: done, total: ids.length };
    },
  },
  {
    key: "perfect-mirror",
    title: "Perfect Mirror",
    description:
      "Mastery badge on every single scenario. All-optimal, across all 20.",
    icon: "flame",
    isEarned: (s) =>
      ALL_SCENARIOS.every((sc) => hasMasteryBadge(s, sc.id)),
    progress: (s) => {
      const done = ALL_SCENARIOS.filter((sc) =>
        hasMasteryBadge(s, sc.id),
      ).length;
      return { current: done, total: ALL_SCENARIOS.length };
    },
  },
];

/**
 * Evaluate all achievements against a snapshot. Returns the keys currently
 * satisfied — caller deduplicates against previously-awarded rows.
 */
export function evaluateAchievements(
  snap: AchievementProgressSnapshot,
): string[] {
  return ACHIEVEMENTS.filter((a) => a.isEarned(snap)).map(
    (a) => `ach-${a.key}`,
  );
}

export function achievementByKey(
  key: string,
): AchievementDef | undefined {
  // Accept both "first-strike" and "ach-first-strike" for convenience.
  const trimmed = key.startsWith("ach-") ? key.slice(4) : key;
  return ACHIEVEMENTS.find((a) => a.key === trimmed);
}
