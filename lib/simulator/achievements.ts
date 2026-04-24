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

import { BADGE_BY_KEY, SIMULATOR_BADGES, type SimulatorBadgeDef } from "./badges";
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

// ---------------------------------------------------------------------------
// Display catalogue — the trophy case.
//
// This is the read layer that drives the hex-medallion shelf on the profile
// page and the mid-scenario unlock toast. It does NOT write to the database.
// Earnings stay in SimulatorBadge rows (keys: `mission-1-1-good`,
// `level-3-complete`, `ach-perfect-mirror`, ...). The catalogue is a static
// TS projection of those keys into richer display metadata.
//
// Rarity assignment:
//   scenario-good     → bronze   (the floor — completing a scenario well)
//   scenario-neutral  → bronze   (secret — only surfaces when earned, a
//                                 sidelight rather than a goal)
//   scenario-bad      → bronze   (secret — fail-path, taught by losing)
//   scenario-mastery  → gold     (all-optimal on one scenario)
//   level-complete    → silver   (clean sweep of a level)
//   ach-*             → gold     (cross-scenario discipline)
//   perfect-mirror    → obsidian (the one truly rare tier — every scenario
//                                 mastered)
// ---------------------------------------------------------------------------

export type AchievementRarity = "bronze" | "silver" | "gold" | "obsidian";
export type AchievementCategory =
  | "arrival"
  | "scenarios"
  | "mastery"
  | "recovery"
  | "levels"
  | "tracks"
  | "discipline"
  | "legend";

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  arrival: "Arrival",
  scenarios: "Scenarios",
  mastery: "Mastery",
  recovery: "Fail-paths",
  levels: "Levels",
  tracks: "Tracks",
  discipline: "Discipline",
  legend: "Legend",
};

export const CATEGORY_ORDER: AchievementCategory[] = [
  "arrival",
  "scenarios",
  "mastery",
  "levels",
  "tracks",
  "discipline",
  "recovery",
  "legend",
];

export type AchievementMeta = {
  /** Stable slug — matches the `SimulatorBadge.badgeKey` persisted server-side. */
  slug: string;
  name: string;
  description: string;
  icon: SimulatorBadgeDef["icon"];
  rarity: AchievementRarity;
  category: AchievementCategory;
  /** Hidden in the shelf until earned (fail-paths, easter eggs, one-percenters). */
  secret: boolean;
  /** Human-readable unlock hint shown on locked medallions. Omitted → silhouette with "?????". */
  unlockHint?: string;
  /** Optional progress criteria — for locked medallions with a progress bar. */
  progress?: {
    current: (snap: AchievementProgressSnapshot) => number;
    total: number;
  };
};

// Fallback metadata when a key exists in SimulatorBadge but hasn't been
// registered in the catalogue yet — e.g. a scenario Claude A ships
// whose badge IDs haven't been handed off yet. The UI stays calm:
// generic bronze medallion, no crash.
function fallbackMeta(slug: string): AchievementMeta {
  return {
    slug,
    name: "Achievement",
    description: "Unlocked in a scenario.",
    icon: "award",
    rarity: "bronze",
    category: "scenarios",
    secret: false,
  };
}

function scenarioMeta(def: SimulatorBadgeDef): AchievementMeta {
  const { key, title, description, icon } = def;
  if (key.endsWith("-mastery")) {
    return {
      slug: key,
      name: title,
      description,
      icon,
      rarity: "gold",
      category: "mastery",
      secret: false,
      unlockHint: "All-optimal run on this scenario.",
    };
  }
  if (key.endsWith("-good")) {
    return {
      slug: key,
      name: title,
      description,
      icon,
      rarity: "bronze",
      category: "scenarios",
      secret: false,
      unlockHint: "Finish the scenario on a good ending.",
    };
  }
  if (key.endsWith("-neutral")) {
    return {
      slug: key,
      name: title,
      description,
      icon,
      rarity: "bronze",
      category: "scenarios",
      secret: true,
    };
  }
  // -bad
  return {
    slug: key,
    name: title,
    description,
    icon,
    rarity: "bronze",
    category: "recovery",
    secret: true,
  };
}

function levelMeta(def: SimulatorBadgeDef): AchievementMeta {
  return {
    slug: def.key,
    name: def.title,
    description: def.description,
    icon: def.icon,
    rarity: "silver",
    category: "levels",
    secret: false,
    unlockHint: "Clear every scenario in the level on a good or mastery ending.",
  };
}

function metaAchievementMeta(a: AchievementDef): AchievementMeta {
  // Meta-achievements are stored as `ach-${key}` in SimulatorBadge. The
  // shelf matches the SimulatorBadge row against the slug, so slugs carry
  // the prefix; the AchievementDef itself still uses the short key.
  const slug = `ach-${a.key}`;

  // Rarity + category policy for the eight cross-scenario achievements.
  const policy: Record<
    string,
    Pick<AchievementMeta, "rarity" | "category" | "secret">
  > = {
    "first-strike":    { rarity: "bronze",   category: "arrival",    secret: false },
    "cold-eye":        { rarity: "bronze",   category: "arrival",    secret: false },
    "level-1-cleared": { rarity: "silver",   category: "tracks",     secret: false },
    "the-apprentice":  { rarity: "gold",     category: "tracks",     secret: false },
    "strategist":      { rarity: "silver",   category: "discipline", secret: false },
    "cold-reader":     { rarity: "gold",     category: "discipline", secret: false },
    "endgame":         { rarity: "gold",     category: "tracks",     secret: false },
    "perfect-mirror":  { rarity: "obsidian", category: "legend",     secret: false },
  };
  const p = policy[a.key] ?? {
    rarity: "gold" as const,
    category: "discipline" as const,
    secret: false,
  };

  const meta: AchievementMeta = {
    slug,
    name: a.title,
    description: a.description,
    icon: a.icon,
    rarity: p.rarity,
    category: p.category,
    secret: p.secret,
  };
  if (a.progress) {
    // Pull once to read the total without evaluating; we need a snapshot
    // to sample current. The closure over `a.progress` lives for the
    // lifetime of the catalogue.
    const sample = a.progress({
      completions: [],
      badgesHeld: new Set(),
    });
    meta.progress = {
      current: (snap) => a.progress!(snap).current,
      total: sample.total,
    };
  }
  return meta;
}

/**
 * The full display catalogue. Order: arrival → scenarios → mastery → levels →
 * tracks → discipline → recovery → legend. Inside each category, entries
 * are inserted in the order of SIMULATOR_BADGES / ACHIEVEMENTS so the shelf
 * reads left-to-right through the game's actual progression.
 */
function buildCatalogue(): AchievementMeta[] {
  const scenarios: AchievementMeta[] = [];
  const masteries: AchievementMeta[] = [];
  const recoveries: AchievementMeta[] = [];
  const levels: AchievementMeta[] = [];

  for (const def of SIMULATOR_BADGES) {
    if (def.tier === "level") {
      levels.push(levelMeta(def));
      continue;
    }
    const meta = scenarioMeta(def);
    if (meta.category === "mastery") masteries.push(meta);
    else if (meta.category === "recovery") recoveries.push(meta);
    else scenarios.push(meta);
  }

  const metas = ACHIEVEMENTS.map(metaAchievementMeta);
  const arrival = metas.filter((m) => m.category === "arrival");
  const tracks = metas.filter((m) => m.category === "tracks");
  const discipline = metas.filter((m) => m.category === "discipline");
  const legend = metas.filter((m) => m.category === "legend");

  return [
    ...arrival,
    ...scenarios,
    ...masteries,
    ...levels,
    ...tracks,
    ...discipline,
    ...recoveries,
    ...legend,
  ];
}

export const SIMULATOR_ACHIEVEMENT_CATALOGUE: AchievementMeta[] = buildCatalogue();

export const ACHIEVEMENT_META_BY_SLUG: Record<string, AchievementMeta> =
  Object.fromEntries(
    SIMULATOR_ACHIEVEMENT_CATALOGUE.map((a) => [a.slug, a]),
  );

/**
 * Lookup that never returns undefined — unregistered keys get a generic
 * bronze medallion so the UI stays calm. See fallbackMeta above.
 */
export function getAchievementMeta(slug: string): AchievementMeta {
  return ACHIEVEMENT_META_BY_SLUG[slug] ?? fallbackMeta(slug);
}

/**
 * Known? Use when filtering "real" catalogue entries out of a set that
 * might include legacy or unregistered keys (e.g. male-track scenarios
 * whose badges haven't been registered in badges.ts yet — their earned
 * SimulatorBadge rows currently don't surface in the catalogue, but a
 * future registration would pick them up).
 */
export function isRegisteredAchievement(slug: string): boolean {
  return slug in ACHIEVEMENT_META_BY_SLUG;
}

/**
 * Back-reference so the shelf can avoid duplicating a SimulatorBadgeDef
 * entry when it already renders via the AchievementMeta.
 */
export function isSimulatorBadgeRegistered(key: string): boolean {
  return key in BADGE_BY_KEY;
}
