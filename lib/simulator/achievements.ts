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

// ---------------------------------------------------------------------------
// V3 scenario badges — anxiety, toxic-narc, pc-child tracks.
//
// Hand-authored metadata matching the handoff tables in V3-PROGRESS.md. Unlike
// the legacy mission-* badges (auto-derived from SIMULATOR_BADGES), V3
// scenarios emit per-ending and pattern-matched badges whose names are
// semantically meaningful on their own — not "mission-1-1-good" but
// "first-outlast". Copy is Claude A's, preserved verbatim.
// ---------------------------------------------------------------------------

const V3_SCENARIO_BADGES: AchievementMeta[] = [
  // ======== anxiety / anx-1-1 — "The 3 a.m. Draft" ========
  { slug: "first-outlast",   name: "The First Outlast",        description: "Put the phone down. Let the sensation peak. Slept in eleven minutes.",                             icon: "shield",   rarity: "bronze",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 via the pure outlast path." },
  { slug: "noor-called",     name: "The Ally on the Line",     description: "Routed the 3 a.m. spiral through a steady friend, not the ex.",                                   icon: "sparkles", rarity: "silver",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 by calling Noor instead of sending." },
  { slug: "sent-and-sat",    name: "Sent, and Sat With It",    description: "Sent the text. Did not chase. Did not double-text.",                                              icon: "eye",      rarity: "bronze",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 on the neutral send-and-sit ending." },
  { slug: "sent-and-chased", name: "The Second Text",          description: "Post-send spiral. Eight messages into a closed channel.",                                         icon: "skull",    rarity: "bronze",   category: "recovery",  secret: true  },
  { slug: "sober-as-a-nun",  name: "Sober As A Nun",           description: "The pure outlast — no ally, no water, no deletion.",                                              icon: "crown",    rarity: "obsidian", category: "legend",    secret: true  },

  // ======== anxiety / anx-1-2 — "The Morning After the Draft" ========
  { slug: "morning-protocol", name: "The Morning Protocol",    description: "Four motor habits before the phone. Sunlight, water, written task, face-down until 11.",          icon: "sparkles", rarity: "silver",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-2 on the good path." },

  // ======== anxiety / anx-1-3 — "The Read Receipt" ========
  { slug: "showed-up-anyway", name: "Showed Up",               description: "Arrived at the door as yourself. Three days of rumination did not re-author the date.",           icon: "shield",   rarity: "silver",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-3 on the good path." },

  // ======== anxiety / anx-2-1 — "The Waiting" ========
  { slug: "sat-with-silence", name: "Sat With Silence",        description: "Forty-eight hours of no data and you did not author a rejection story into it.",                  icon: "eye",      rarity: "silver",   category: "recovery",  secret: false, unlockHint: "Clear anx-2-1 on the good path." },

  // ======== anxiety / anx-3-1 — "The First Date" ========
  { slug: "present-on-the-date",      name: "Present On The Date",     description: "Did not grade, did not interview, did not pre-emptively refuse the second one.",                                    icon: "sparkles", rarity: "gold",   category: "recovery",  secret: false, unlockHint: "Clear anx-3-1 on the good path." },
  { slug: "the-warm-man-recognised",  name: "The Warm Man Recognised", description: "Accepted the structural reason for a ninety-minute close as the warm move, not a rejection.",                      icon: "eye",      rarity: "silver", category: "recovery",  secret: true,  unlockHint: "Implicit via the present-on-the-date path." },

  // ======== toxic-narc / tn-1-1 — "The Mother's Call" ========
  { slug: "warm-no-mother",      name: "The Warm No",          description: "A boundary with your mother at normal volume, without negotiation.",                              icon: "shield",   rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear tn-1-1 with the warm-no path." },
  { slug: "call-declined-clean", name: "The Silent Decline",   description: "Declined the call, no follow-up text, read voicemail on your schedule.",                          icon: "eye",      rarity: "silver",   category: "scenarios", secret: false, unlockHint: "Clear tn-1-1 with a clean decline." },
  { slug: "forty-eight-held",    name: "Forty-Eight Hours Held", description: "Invoked the 48-hour rule. Decided at hour 47, not hour 2.",                                     icon: "award",    rarity: "silver",   category: "discipline", secret: false, unlockHint: "Clear tn-1-1 after holding the 48-hour window." },
  { slug: "one-week-quiet",      name: "One Week Quiet",       description: "Seven full days of structural quiet. Rarest reply in this scenario.",                             icon: "crown",    rarity: "obsidian", category: "legend",    secret: true  },
  { slug: "lured-back",          name: "The Reversal",         description: "Declined, then reversed under the martyr register.",                                              icon: "skull",    rarity: "bronze",   category: "scenarios", secret: true  },
  { slug: "booked-in",           name: "The Weekend",          description: "Accepted. Scope widened. The whole weekend is hers.",                                             icon: "skull",    rarity: "bronze",   category: "scenarios", secret: true  },

  // ======== toxic-narc / tn-1-2 — "The Missed Calls" ========
  { slug: "pile-triaged",        name: "The Pile Triaged",     description: "Fourteen calls, twenty-three messages, no Monday lost.",                                          icon: "award",    rarity: "silver",   category: "scenarios", secret: false, unlockHint: "Clear tn-1-2 on the good path." },

  // ======== toxic-narc / tn-2-1 — "The Boss's 6 p.m. Email" ========
  { slug: "weekend-held",        name: "The Weekend Held",     description: "One Friday reply. Specific Monday slot. No apology. The covert-narc boss calibrated down.",       icon: "shield",   rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear tn-2-1 on the good path." },

  // ======== toxic-narc / tn-3-1 — "The Family Group Chat" ========
  { slug: "funeral-held",            name: "The Funeral Held",         description: "Practical work with Aunt Prue, declined to enter the grief-ranking economy. The relationship that mattered was made, not performed.", icon: "crown", rarity: "obsidian", category: "legend",    secret: true  },
  { slug: "apologised-to-a-narc",    name: "The Permanent Record",     description: "Apology landed inside the martyr register — now on file for every future family event.",                                              icon: "skull", rarity: "bronze",   category: "scenarios", secret: true  },
  { slug: "grief-competition-lost",  name: "The Grief Competition",    description: "Entered the grief-ranking contest. Came third behind the narc parent and the golden sibling.",                                       icon: "skull", rarity: "bronze",   category: "scenarios", secret: true  },

  // ======== pc-child / pc-1-1 — "The Hamster" ========
  { slug: "the-kitchen-held",       name: "The Kitchen Held",          description: "Four disciplined moves before 10 a.m. on the hardest Saturday.",                          icon: "shield",   rarity: "silver",   category: "scenarios",  secret: false, unlockHint: "Clear pc-1-1 on the disciplined kitchen path." },
  { slug: "documented",             name: "The Household Log",         description: "Began the dated record that will matter in fifteen years.",                               icon: "award",    rarity: "silver",   category: "discipline", secret: false, unlockHint: "Clear pc-1-1 by starting the documentation." },
  { slug: "sibling-moved",          name: "The Room Change",           description: "Sibling protection formalised the same night, not next week.",                            icon: "shield",   rarity: "gold",     category: "scenarios",  secret: false, unlockHint: "Clear pc-1-1 by moving the younger sibling that night." },
  { slug: "normalised-it",          name: "Wait And See",              description: "Accepted the one-off frame. A lost year of documentation.",                               icon: "skull",    rarity: "bronze",   category: "scenarios",  secret: true  },
  { slug: "first-real-conversation", name: "The First Real Conversation", description: "The double truth spoken in daylight with your co-parent.",                            icon: "crown",    rarity: "obsidian", category: "legend",     secret: true  },
  { slug: "opted-out",              name: "Not Tonight",               description: "Respected your own bandwidth. The scenario will return.",                                 icon: "eye",      rarity: "bronze",   category: "discipline", secret: false, unlockHint: "Decline the pc-1-1 content gate." },

  // ======== pc-child / pc-2-1 — "The School Calls" ========
  { slug: "meeting-held",           name: "The Meeting Held",          description: "Five years of log-keeping bought the meeting. The meeting bought the next five years of alliance.", icon: "award", rarity: "gold", category: "scenarios", secret: false, unlockHint: "Clear pc-2-1 on the good path." },

  // ======== pc-child / pc-3-1 — "The Triangulation" ========
  { slug: "alliance-repaired",      name: "The Alliance Repaired",     description: "Quote-accurate / frame-wrong triangulation named and closed. The marriage held.",          icon: "sparkles", rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear pc-3-1 on the good path." },

  // ======== pc-child / pc-4-1 — "The Marriage Question" ========
  { slug: "the-marriage-named",     name: "The Marriage Named",        description: "The 6:47 a.m. sentence received cleanly, specific cost named back, structural commitment made.", icon: "shield", rarity: "gold",    category: "scenarios", secret: false, unlockHint: "Clear pc-4-1 on the good path." },
  { slug: "the-fifteen-year-thank-you", name: "The Fifteen-Year Thank You", description: "Both partners named one specific unnamed act of the other across the decade. The obsidian path of pc-4-1.", icon: "crown", rarity: "obsidian", category: "legend", secret: true },
  { slug: "door-closed",            name: "The Door Closed",           description: "Defended against the naming. The window at 6:47 a.m. closed by 7:02 a.m. The next one is harder.", icon: "skull", rarity: "bronze",   category: "scenarios", secret: true  },
];

/**
 * The full display catalogue. Order: arrival → scenarios → mastery → levels →
 * tracks → discipline → recovery → legend. Inside each category, entries
 * are inserted in the order of SIMULATOR_BADGES / ACHIEVEMENTS / V3 so the
 * shelf reads left-to-right through the game's actual progression.
 */
function buildCatalogue(): AchievementMeta[] {
  const scenarios: AchievementMeta[] = [];
  const masteries: AchievementMeta[] = [];
  const recoveries: AchievementMeta[] = [];
  const levels: AchievementMeta[] = [];
  const discipline: AchievementMeta[] = [];
  const legend: AchievementMeta[] = [];
  const tracks: AchievementMeta[] = [];

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
  for (const m of metas.filter((m) => m.category === "tracks")) tracks.push(m);
  for (const m of metas.filter((m) => m.category === "discipline")) discipline.push(m);
  for (const m of metas.filter((m) => m.category === "legend")) legend.push(m);

  // Merge V3 hand-authored entries into their respective category buckets.
  // Each V3 badge carries its own canonical category (recovery / scenarios /
  // discipline / legend), so this is a declarative route, not a guess.
  for (const m of V3_SCENARIO_BADGES) {
    switch (m.category) {
      case "recovery":   recoveries.push(m); break;
      case "scenarios":  scenarios.push(m); break;
      case "discipline": discipline.push(m); break;
      case "legend":     legend.push(m); break;
      case "mastery":    masteries.push(m); break;
      case "levels":     levels.push(m); break;
      case "tracks":     tracks.push(m); break;
      case "arrival":    /* V3 has none */ break;
    }
  }

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
