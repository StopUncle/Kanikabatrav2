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
import type { OutcomeType, Scenario, ChoiceRecord, SimulatorState } from "./types";
import { ALL_SCENARIOS } from "./scenarios";

export type AchievementProgressSnapshot = {
  /** All completed SimulatorProgress rows for the user. */
  completions: Array<{
    scenarioId: string;
    outcome: OutcomeType | null;
    xpEarned: number;
    choicesMade: Array<{ wasOptimal: boolean }>;
    /**
     * Optional event tags observed during this completed run. Populated by
     * the snapshot builder (see /api/simulator/complete) when it has access
     * to the scenario object. See `reference/ACHIEVEMENT-HOOKS.md` for the
     * event vocabulary. Empty / undefined on un-instrumented scenarios.
     */
    events?: string[];
    /**
     * Run wall-clock duration in ms (`completedAt − startedAt`). Populated
     * when both timestamps are available on the SimulatorProgress row.
     * Used by `speedrun` (<5min threshold). Undefined for in-progress or
     * legacy rows without a startedAt.
     */
    durationMs?: number;
    /**
     * Total completions for this scenario (ticks on every ending, not
     * just the first). Read directly off the SimulatorProgress row's
     * completionCount column. Used by `three-time-reader`. Legacy rows
     * (pre-migration) were backfilled to 1 on any row with completedAt.
     */
    completionCount?: number;
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

/**
 * All required scenario IDs cleared on a good ending. True iff the snapshot
 * has a good completion for every id in the list. Used by the V3
 * track-completion meta-achievements.
 */
function allGood(snap: AchievementProgressSnapshot, ids: string[]): boolean {
  return ids.every((id) => goodOrMastery(snap, id));
}

function countGood(
  snap: AchievementProgressSnapshot,
  ids: string[],
): number {
  return ids.filter((id) => goodOrMastery(snap, id)).length;
}

/**
 * Walk a completed run and collect every `event` string fired by either a
 * chosen Choice or a DialogLine in a visited Scene. Call this at snapshot
 * construction time so the resulting events[] list rides along with the
 * completion entry for event-based achievement evaluation.
 *
 * "Visited scenes" = start + every sceneId the player chose from + the
 * ending scene. Dialog lines on non-visited branches are excluded.
 * Duplicate events are deduped with a set preserving first-seen order,
 * so a player who hit the same event twice only records it once.
 */
export function eventsObserved(
  scenario: Scenario,
  state: Pick<SimulatorState, "choicesMade" | "currentSceneId">,
): string[] {
  const sceneById = new Map(scenario.scenes.map((s) => [s.id, s]));
  const visitedSceneIds = new Set<string>([scenario.startSceneId]);
  const events = new Set<string>();

  for (const c of state.choicesMade) {
    visitedSceneIds.add(c.sceneId);
    const scene = sceneById.get(c.sceneId);
    if (!scene?.choices) continue;
    const picked = scene.choices.find((ch) => ch.id === c.choiceId);
    if (picked?.event) events.add(picked.event);
  }
  visitedSceneIds.add(state.currentSceneId);

  // `for (const id of visitedSceneIds)` is blocked by Railway's ES5 tsc
  // target without downlevelIteration — use Array.from for iteration.
  const visitedArr = Array.from(visitedSceneIds);
  for (const sceneId of visitedArr) {
    const scene = sceneById.get(sceneId);
    if (!scene?.dialog) continue;
    for (const d of scene.dialog) {
      if (d.event) events.add(d.event);
    }
  }

  return Array.from(events);
}

/**
 * Utility — snapshot-level event count. Sums `events.length` across
 * completions (events are per-run deduped by `eventsObserved`, so this
 * counts distinct events per run, not raw text matches within a run).
 * Filtered by prefix (e.g. "tactic-named:") when provided.
 */
export function countEvents(
  snap: AchievementProgressSnapshot,
  prefix?: string,
): number {
  let n = 0;
  for (const c of snap.completions) {
    if (!c.events) continue;
    for (const e of c.events) {
      if (!prefix || e.startsWith(prefix)) n++;
    }
  }
  return n;
}

/**
 * Snapshot-level DISTINCT event set — unions the per-completion event
 * lists into a single set across all runs. Different from countEvents
 * which treats each run's contribution as additive. Used by
 * `the-whole-vocabulary` (needs ≥1 fire of each distinct tactic slug
 * across all runs combined, not 1+ fires in any single run).
 */
export function distinctEvents(
  snap: AchievementProgressSnapshot,
  prefix?: string,
): Set<string> {
  const out = new Set<string>();
  for (const c of snap.completions) {
    if (!c.events) continue;
    for (const e of c.events) {
      if (!prefix || e.startsWith(prefix)) out.add(e);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Canonical tactic vocabulary.
//
// Mirrors the canonical table in `reference/ACHIEVEMENT-HOOKS.md`. The
// doc is the human-facing authority; this constant is the machine-facing
// one. When Claude A or Daisy adds a new slug, update both — the
// `the-whole-vocabulary` meta uses the INSTRUMENTED-scenarios scan below
// (so the achievement stays earnable as instrumentation catches up),
// but this list documents the intent. Kebab-case, one canonical form
// per tactic. Prefix `tactic-named:` is implicit for this list.
// ---------------------------------------------------------------------------

export const CANONICAL_TACTIC_SLUGS: string[] = [
  // Original Phase 4 vocabulary (14)
  "love-bombing",
  "triangulation",
  "darvo",
  "gaslighting",
  "future-faking",
  "post-win-extraction",
  "info-laundering",
  "fog",
  "martyr-register",
  "grief-ranking",
  "fawn",
  "urge-surfing",
  "pre-emptive-no",
  "body-check",
  // Phase 4 cluster-b-lab additions (2)
  "borderline",
  "antisocial",
  // Phase 5 cluster-b-lab additions (2)
  "narcissistic",
  "histrionic",
];

/**
 * Scan ALL_SCENARIOS and collect every distinct `tactic-named:*` event
 * actually fired in a dialog or choice. The set of slugs a player must
 * cover to unlock `the-whole-vocabulary` is this set, not
 * CANONICAL_TACTIC_SLUGS — so the achievement stays earnable even when
 * the canonical doc ships ahead of instrumentation.
 *
 * Computed lazily and cached: scenario data is static at module load.
 */
let _instrumentedTactics: Set<string> | null = null;
export function instrumentedTactics(): Set<string> {
  if (_instrumentedTactics) return _instrumentedTactics;
  const set = new Set<string>();
  for (const scenario of ALL_SCENARIOS) {
    for (const scene of scenario.scenes) {
      for (const d of scene.dialog ?? []) {
        if (d.event?.startsWith("tactic-named:")) set.add(d.event);
      }
      for (const c of scene.choices ?? []) {
        if (c.event?.startsWith("tactic-named:")) set.add(c.event);
      }
    }
  }
  _instrumentedTactics = set;
  return set;
}

// Re-export the ChoiceRecord alias so callers of eventsObserved can
// construct the Pick<SimulatorState, ...> argument without reaching
// into lib/simulator/types.ts directly.
export type { ChoiceRecord };

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

  // -----------------------------------------------------------------
  // V3 track-completion meta-achievements.
  //
  // "All good" means `outcome === "good"` on every required scenario. V3
  // scenarios don't use the legacy -mastery layer; a good ending is the
  // top tier. `pc-child-complete-no-obsidian` is the disciplined-all-the-
  // way prestige: clear the whole track without stumbling into an obsidian
  // secret path. Obsidian paths give you a different prestige lineage.
  // -----------------------------------------------------------------
  {
    key: "anxiety-l1-complete",
    title: "The 3 a.m. Track",
    description: "All three anxiety L1 scenarios cleared on a good ending.",
    icon: "shield",
    isEarned: (s) => allGood(s, ["anx-1-1", "anx-1-2", "anx-1-3"]),
    progress: (s) => ({
      current: countGood(s, ["anx-1-1", "anx-1-2", "anx-1-3"]),
      total: 3,
    }),
  },
  {
    key: "anxiety-l2-complete",
    title: "The Waiting Held",
    description: "Both anxiety L2 scenarios cleared on a good ending.",
    icon: "shield",
    isEarned: (s) => allGood(s, ["anx-2-1", "anx-2-2"]),
    progress: (s) => ({
      current: countGood(s, ["anx-2-1", "anx-2-2"]),
      total: 2,
    }),
  },
  {
    key: "toxic-narc-l1-complete",
    title: "The Mother Decoded",
    description: "Both toxic-narc L1 scenarios cleared on a good ending.",
    icon: "shield",
    isEarned: (s) => allGood(s, ["tn-1-1", "tn-1-2"]),
    progress: (s) => ({
      current: countGood(s, ["tn-1-1", "tn-1-2"]),
      total: 2,
    }),
  },
  {
    key: "toxic-narc-l2-l3-complete",
    title: "The Public Registers",
    description: "tn-2-1 and tn-3-1 both cleared on a good ending.",
    icon: "award",
    isEarned: (s) => allGood(s, ["tn-2-1", "tn-3-1"]),
    progress: (s) => ({
      current: countGood(s, ["tn-2-1", "tn-3-1"]),
      total: 2,
    }),
  },
  {
    key: "pc-child-l1-l2-l3-complete",
    title: "The Ten-Year Log",
    description:
      "pc-1-1, pc-2-1, and pc-3-1 all cleared on a good ending. The disciplined log.",
    icon: "award",
    isEarned: (s) => allGood(s, ["pc-1-1", "pc-2-1", "pc-3-1"]),
    progress: (s) => ({
      current: countGood(s, ["pc-1-1", "pc-2-1", "pc-3-1"]),
      total: 3,
    }),
  },
  {
    key: "pc-child-complete-no-obsidian",
    title: "The Parent Who Stayed",
    description:
      "All four pc-child scenarios cleared on a good ending — without taking either obsidian shortcut. The disciplined lineage.",
    icon: "crown",
    isEarned: (s) => {
      const ids = ["pc-1-1", "pc-2-1", "pc-3-1", "pc-4-1"];
      if (!allGood(s, ids)) return false;
      // Hold the line on the disciplined path: obsidian secrets live on
      // a different prestige lineage. `first-real-conversation` comes
      // from pc-1-1, `the-fifteen-year-thank-you` from pc-4-1.
      const obsidians = ["first-real-conversation", "the-fifteen-year-thank-you"];
      return !obsidians.some((k) => s.badgesHeld.has(k));
    },
    progress: (s) => ({
      current: countGood(s, ["pc-1-1", "pc-2-1", "pc-3-1", "pc-4-1"]),
      total: 4,
    }),
  },

  // -----------------------------------------------------------------
  // Phase 5 — event-based meta-achievements.
  //
  // Read off the Phase 4 instrumentation contract (see
  // `reference/ACHIEVEMENT-HOOKS.md`). Events are populated per-completion
  // by eventsObserved() at snapshot-build time. countEvents sums across
  // runs; distinctEvents unions across runs. Thresholds chosen so the
  // achievements are reachable by an engaged player — not gimmes — but
  // not so rare they're invisible. `the-whole-vocabulary` is the
  // obsidian prestige tier, keyed to the CURRENTLY INSTRUMENTED set of
  // tactic-named:* slugs so it stays earnable as scenarios ship.
  // -----------------------------------------------------------------
  {
    key: "named-the-move",
    title: "Named The Move",
    description: "Five tactic-naming beats hit across all runs. Naming it is the first defence.",
    icon: "eye",
    isEarned: (s) => countEvents(s, "tactic-named:") >= 5,
    progress: (s) => ({
      current: Math.min(countEvents(s, "tactic-named:"), 5),
      total: 5,
    }),
  },
  {
    key: "grace-under",
    title: "Grace Under",
    description:
      "Five optimal-with-grace choices. The disciplined move, kept warm. Harder than the cold version.",
    icon: "sparkles",
    isEarned: (s) => countEvents(s, "optimal-with-grace") >= 5,
    progress: (s) => ({
      current: Math.min(countEvents(s, "optimal-with-grace"), 5),
      total: 5,
    }),
  },
  {
    key: "refused-the-frame",
    title: "Refused The Frame",
    description:
      "Five failure-rejected choices. Each one a path the scenario tried to pull you into, and you stepped out of.",
    icon: "shield",
    isEarned: (s) => countEvents(s, "failure-rejected") >= 5,
    progress: (s) => ({
      current: Math.min(countEvents(s, "failure-rejected"), 5),
      total: 5,
    }),
  },
  {
    key: "quiet-power",
    title: "Quiet Power",
    description:
      "Five restraint-shown choices. Power available, power held back. The pc-child-track specialty — but not only there.",
    icon: "shield",
    isEarned: (s) => countEvents(s, "restraint-shown") >= 5,
    progress: (s) => ({
      current: Math.min(countEvents(s, "restraint-shown"), 5),
      total: 5,
    }),
  },
  {
    key: "the-whole-vocabulary",
    title: "The Whole Vocabulary",
    description:
      "One fire of each distinct tactic-named beat in the current instrumented catalogue. The rarest meta — requires running through every instrumented scenario.",
    icon: "crown",
    isEarned: (s) => {
      const seen = distinctEvents(s, "tactic-named:");
      const required = instrumentedTactics();
      // `for (const slug of required)` blocked by Railway ES5 tsc target
      // without downlevelIteration — use Array.from for iteration.
      const requiredArr = Array.from(required);
      return requiredArr.length > 0 && requiredArr.every((t) => seen.has(t));
    },
    progress: (s) => {
      const seen = distinctEvents(s, "tactic-named:");
      const required = instrumentedTactics();
      const requiredArr = Array.from(required);
      const hit = requiredArr.filter((t) => seen.has(t)).length;
      return { current: hit, total: Math.max(1, requiredArr.length) };
    },
  },

  // -----------------------------------------------------------------
  // Phase 5 — story-arc meta-achievements.
  //
  // Multi-scenario arcs running through the catalogue. Each arc is a
  // list of scenario IDs that must all complete with outcome:"good".
  // Arc definitions sourced from reference/STORY-ARCS.md (published by
  // Claude A). Rarity scales with arc depth + register:
  //   rhys (3 scenarios, lighter register) → silver
  //   theo (5 scenarios, breakup arc) → gold
  //   mother (4 scenarios, narc family) → gold
  //   partner (4 scenarios, co-parent thread) → gold
  //   finn (5 scenarios, 15 in-story years, pc-child register) → obsidian
  //
  // Scenarios not yet shipped (tn-6-1) are still in the scenario ID list
  // — the achievement simply stays unreachable until they ship, which is
  // the correct behaviour (no false-positive earns).
  // -----------------------------------------------------------------
  {
    key: "the-theo-arc",
    title: "The Theo Arc",
    description:
      "Moved through the break-up across five scenarios. 3 a.m. spiral to ninety-second-pause reply, eleven weeks in.",
    icon: "sparkles",
    isEarned: (s) =>
      allGood(s, ["anx-1-1", "anx-1-2", "anx-1-3", "anx-2-1", "anx-2-2"]),
    progress: (s) => ({
      current: countGood(s, ["anx-1-1", "anx-1-2", "anx-1-3", "anx-2-1", "anx-2-2"]),
      total: 5,
    }),
  },
  {
    key: "the-rhys-arc",
    title: "The Rhys Arc",
    description:
      "Met the warm man, held the first date, replied to his text without authoring a rejection into him.",
    icon: "sparkles",
    isEarned: (s) => allGood(s, ["anx-1-3", "anx-3-1", "anx-2-2"]),
    progress: (s) => ({
      current: countGood(s, ["anx-1-3", "anx-3-1", "anx-2-2"]),
      total: 3,
    }),
  },
  {
    key: "the-mother-arc",
    title: "The Mother Arc",
    description:
      "One mother in four registers — the Sunday call, missed-calls triage, grandmother's funeral, and the friend-capstone.",
    icon: "shield",
    isEarned: (s) => allGood(s, ["tn-1-1", "tn-1-2", "tn-3-1", "tn-6-1"]),
    progress: (s) => ({
      current: countGood(s, ["tn-1-1", "tn-1-2", "tn-3-1", "tn-6-1"]),
      total: 4,
    }),
  },
  {
    key: "the-partner-arc",
    title: "The Partner Arc",
    description:
      "Four scenarios across the child's arc — how the co-parenting alliance held, when it strained, and the 6:47 a.m. naming.",
    icon: "award",
    isEarned: (s) => allGood(s, ["pc-1-1", "pc-3-1", "pc-4-1", "pc-5-1"]),
    progress: (s) => ({
      current: countGood(s, ["pc-1-1", "pc-3-1", "pc-4-1", "pc-5-1"]),
      total: 4,
    }),
  },
  {
    key: "the-finn-arc",
    title: "The Finn Arc",
    description:
      "Fifteen in-story years with Finn, from the hamster at age five to the 11:12 p.m. phone call at twenty. The rarest arc.",
    icon: "crown",
    isEarned: (s) => allGood(s, ["pc-1-1", "pc-2-1", "pc-3-1", "pc-4-1", "pc-5-1"]),
    progress: (s) => ({
      current: countGood(s, ["pc-1-1", "pc-2-1", "pc-3-1", "pc-4-1", "pc-5-1"]),
      total: 5,
    }),
  },

  // -----------------------------------------------------------------
  // Phase 5 — mastery / replay metas.
  //
  // `speedrun` reads the new `durationMs` field on the snapshot
  // completion entry (populated by /api/simulator/complete and the
  // profile snapshot builder from completedAt − startedAt). Threshold
  // 300 seconds = 5 minutes.
  //
  // `all-optimal-first-try` is emitted directly by /api/simulator/
  // complete on the first completion of a scenario where every choice
  // was optimal — the "first try" aspect isn't recoverable from the
  // snapshot (SimulatorProgress is best-of merged, not append-only),
  // so the emission lives in the complete route. The isEarned check
  // here just mirrors the persisted SimulatorBadge row.
  //
  // `three-time-reader` ships this phase — schema migration landed in
  // 20260425000000_add_simulator_completion_count.
  // -----------------------------------------------------------------
  {
    key: "three-time-reader",
    title: "Three-Time Reader",
    description:
      "Played the same scenario three times. Mastery is not the first clear — it's the run where the tactic cards stop surprising you.",
    icon: "sparkles",
    isEarned: (s) =>
      s.completions.some(
        (c) => (c.completionCount ?? 0) >= 3,
      ),
    progress: (s) => {
      const best = s.completions.reduce(
        (max, c) => Math.max(max, c.completionCount ?? 0),
        0,
      );
      return { current: Math.min(best, 3), total: 3 };
    },
  },
  {
    key: "speedrun",
    title: "Decisive",
    description: "Cleared a scenario in under five minutes. Decisions, not deliberation.",
    icon: "flame",
    isEarned: (s) =>
      s.completions.some(
        (c) => typeof c.durationMs === "number" && c.durationMs < 300_000,
      ),
  },
  {
    key: "all-optimal-first-try",
    title: "All Optimal, First Try",
    description:
      "Any scenario cleared 100% optimal on the very first attempt. Emission tracked at completion time — replays can't backfill this one.",
    icon: "award",
    // Mirror-only — the complete route emits `ach-all-optimal-first-try`
    // directly when it detects first-completion + all-optimal + good.
    // Replays can't earn it because it's tied to the "existingRow === null"
    // state which isn't observable from the snapshot.
    isEarned: (s) => s.badgesHeld.has("ach-all-optimal-first-try"),
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
  | "story-arcs"
  | "tracks"
  | "vocabulary"
  | "discipline"
  | "legend";

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  arrival: "Arrival",
  scenarios: "Scenarios",
  mastery: "Mastery",
  recovery: "Fail-paths",
  levels: "Levels",
  "story-arcs": "Story Arcs",
  tracks: "Tracks",
  vocabulary: "Vocabulary",
  discipline: "Discipline",
  legend: "Legend",
};

// Order on the shelf — arrivals first, then scenario-grained rewards,
// then the higher-level meta bands (story arcs → tracks → vocabulary →
// discipline), with fail-paths before the obsidian legend tier. Story
// arcs sit above tracks because they're more meaningful to a player
// than level-number rollups ("The Theo Arc" reads; "Level 2 cleared"
// is a mechanic).
export const CATEGORY_ORDER: AchievementCategory[] = [
  "arrival",
  "scenarios",
  "mastery",
  "levels",
  "story-arcs",
  "tracks",
  "vocabulary",
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
      // Rebalanced Phase 5 — legacy -good moved bronze → silver so the
      // pyramid isn't 49% bronze / 18% silver. -good is "cleared the
      // scenario on the intended path," which is meaningfully above
      // the -neutral/-bad alternate endings (which stay bronze). The
      // -mastery layer remains the gold top-tier.
      rarity: "silver",
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
    // V3 track-completion metas (Phase 4)
    "anxiety-l1-complete":          { rarity: "silver",   category: "tracks", secret: false },
    "anxiety-l2-complete":          { rarity: "gold",     category: "tracks", secret: false },
    "toxic-narc-l1-complete":       { rarity: "silver",   category: "tracks", secret: false },
    "toxic-narc-l2-l3-complete":    { rarity: "gold",     category: "tracks", secret: false },
    "pc-child-l1-l2-l3-complete":   { rarity: "gold",     category: "tracks", secret: false },
    "pc-child-complete-no-obsidian":{ rarity: "obsidian", category: "legend", secret: false },
    // Event-based metas (Phase 5)
    "named-the-move":       { rarity: "gold",     category: "vocabulary", secret: false },
    "grace-under":          { rarity: "gold",     category: "vocabulary", secret: false },
    "refused-the-frame":    { rarity: "silver",   category: "vocabulary", secret: false },
    "quiet-power":          { rarity: "silver",   category: "vocabulary", secret: false },
    "the-whole-vocabulary": { rarity: "obsidian", category: "legend",     secret: false },
    // Story-arc metas (Phase 5)
    "the-theo-arc":    { rarity: "gold",     category: "story-arcs", secret: false },
    "the-rhys-arc":    { rarity: "silver",   category: "story-arcs", secret: false },
    "the-mother-arc":  { rarity: "gold",     category: "story-arcs", secret: false },
    "the-partner-arc": { rarity: "gold",     category: "story-arcs", secret: false },
    "the-finn-arc":    { rarity: "obsidian", category: "legend",     secret: false },
    // Mastery / replay metas (Phase 5)
    "speedrun":              { rarity: "bronze", category: "mastery",    secret: false },
    "all-optimal-first-try": { rarity: "gold",   category: "mastery",    secret: false },
    "three-time-reader":     { rarity: "silver", category: "mastery",    secret: false },
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
// V3 scenario badges — display policy.
//
// The badge key → name/description/icon source-of-truth lives in
// `lib/simulator/badges.ts` (SIMULATOR_BADGES). This file only adds the
// shelf-level display policy: rarity tier, category, secret flag, and an
// optional unlock hint. buildCatalogue() joins the two sources at load time.
//
// V3_METADATA_POLICY is keyed by SimulatorBadge key (which matches the
// AchievementMeta.slug 1:1). If a V3 SimulatorBadgeDef exists without a
// matching policy entry, buildCatalogue falls back to generic bronze
// scenario metadata so the shelf doesn't crash — same fallback contract
// used for unregistered legacy keys.
// ---------------------------------------------------------------------------

type V3Policy = Pick<AchievementMeta, "rarity" | "category" | "secret" | "unlockHint">;

const V3_METADATA_POLICY: Record<string, V3Policy> = {
  // anxiety — anx-1-1 "The 3 a.m. Draft"
  "first-outlast":    { rarity: "bronze",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 via the pure outlast path." },
  "noor-called":      { rarity: "silver",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 by calling Noor instead of sending." },
  "sent-and-sat":     { rarity: "bronze",   category: "recovery",  secret: false, unlockHint: "Clear anx-1-1 on the neutral send-and-sit ending." },
  "sent-and-chased":  { rarity: "bronze",   category: "recovery",  secret: true  },
  "sober-as-a-nun":   { rarity: "obsidian", category: "legend",    secret: true  },

  // anxiety — anx-1-2 / anx-1-3 / anx-2-1 / anx-3-1
  "morning-protocol":        { rarity: "silver", category: "recovery", secret: false, unlockHint: "Clear anx-1-2 on the good path." },
  "showed-up-anyway":        { rarity: "silver", category: "recovery", secret: false, unlockHint: "Clear anx-1-3 on the good path." },
  "sat-with-silence":        { rarity: "silver", category: "recovery", secret: false, unlockHint: "Clear anx-2-1 on the good path." },
  "present-on-the-date":     { rarity: "gold",   category: "recovery", secret: false, unlockHint: "Clear anx-3-1 on the good path." },
  "the-warm-man-recognised": { rarity: "silver", category: "recovery", secret: true,  unlockHint: "Implicit via the present-on-the-date path." },

  // toxic-narc — tn-1-1 "The Mother's Call"
  "warm-no-mother":      { rarity: "gold",     category: "scenarios",  secret: false, unlockHint: "Clear tn-1-1 with the warm-no path." },
  "call-declined-clean": { rarity: "silver",   category: "scenarios",  secret: false, unlockHint: "Clear tn-1-1 with a clean decline." },
  "forty-eight-held":    { rarity: "silver",   category: "discipline", secret: false, unlockHint: "Clear tn-1-1 after holding the 48-hour window." },
  "one-week-quiet":      { rarity: "obsidian", category: "legend",     secret: true  },
  "lured-back":          { rarity: "bronze",   category: "scenarios",  secret: true  },
  "booked-in":           { rarity: "bronze",   category: "scenarios",  secret: true  },

  // toxic-narc — tn-1-2 / tn-2-1 / tn-3-1
  "pile-triaged":           { rarity: "silver",   category: "scenarios", secret: false, unlockHint: "Clear tn-1-2 on the good path." },
  "weekend-held":           { rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear tn-2-1 on the good path." },
  "funeral-held":           { rarity: "obsidian", category: "legend",    secret: true  },
  "apologised-to-a-narc":   { rarity: "bronze",   category: "scenarios", secret: true  },
  "grief-competition-lost": { rarity: "bronze",   category: "scenarios", secret: true  },

  // pc-child — pc-1-1 "The Hamster"
  "the-kitchen-held":        { rarity: "silver",   category: "scenarios",  secret: false, unlockHint: "Clear pc-1-1 on the disciplined kitchen path." },
  "documented":              { rarity: "silver",   category: "discipline", secret: false, unlockHint: "Clear pc-1-1 with the log-started choice." },
  "sibling-moved":           { rarity: "gold",     category: "scenarios",  secret: false, unlockHint: "Clear pc-1-1 by moving the younger sibling that night." },
  "normalised-it":           { rarity: "bronze",   category: "scenarios",  secret: true  },
  "first-real-conversation": { rarity: "obsidian", category: "legend",     secret: true  },
  "opted-out":               { rarity: "bronze",   category: "discipline", secret: false, unlockHint: "Decline the pc-1-1 content gate." },

  // pc-child — pc-2-1 / pc-3-1 / pc-4-1
  "meeting-held":                { rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear pc-2-1 on the good path." },
  "alliance-repaired":           { rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear pc-3-1 on the good path." },
  "the-marriage-named":          { rarity: "gold",     category: "scenarios", secret: false, unlockHint: "Clear pc-4-1 on the good path." },
  "the-fifteen-year-thank-you":  { rarity: "obsidian", category: "legend",    secret: true  },
  "door-closed":                 { rarity: "bronze",   category: "scenarios", secret: true  },
};

/** Join a V3 SimulatorBadgeDef with its display policy. */
function v3Meta(def: SimulatorBadgeDef): AchievementMeta {
  const policy = V3_METADATA_POLICY[def.key] ?? {
    rarity: "bronze" as const,
    category: "scenarios" as const,
    secret: false,
  };
  return {
    slug: def.key,
    name: def.title,
    description: def.description,
    icon: def.icon,
    rarity: policy.rarity,
    category: policy.category,
    secret: policy.secret,
    unlockHint: policy.unlockHint,
  };
}

/** A legacy mission-* key uses the `${scenarioId}-good` suffix pattern. */
function isLegacyScenarioKey(key: string): boolean {
  return (
    key.endsWith("-good") ||
    key.endsWith("-neutral") ||
    key.endsWith("-bad") ||
    key.endsWith("-mastery")
  );
}

/**
 * The full display catalogue. Order: arrival → scenarios → mastery → levels →
 * tracks → discipline → recovery → legend. Inside each category, entries
 * are inserted in the order of SIMULATOR_BADGES / ACHIEVEMENTS so the shelf
 * reads left-to-right through the game's actual progression. V3 keys are
 * routed through the V3_METADATA_POLICY layer; legacy mission-* keys go
 * through scenarioMeta; level-complete keys go through levelMeta.
 */
function buildCatalogue(): AchievementMeta[] {
  const scenarios: AchievementMeta[] = [];
  const masteries: AchievementMeta[] = [];
  const recoveries: AchievementMeta[] = [];
  const levels: AchievementMeta[] = [];
  const discipline: AchievementMeta[] = [];
  const legend: AchievementMeta[] = [];
  const tracks: AchievementMeta[] = [];

  const route = (meta: AchievementMeta) => {
    switch (meta.category) {
      case "recovery":   recoveries.push(meta); break;
      case "scenarios":  scenarios.push(meta); break;
      case "discipline": discipline.push(meta); break;
      case "legend":     legend.push(meta); break;
      case "mastery":    masteries.push(meta); break;
      case "levels":     levels.push(meta); break;
      case "tracks":     tracks.push(meta); break;
      case "arrival":    /* only meta-achievements produce arrival entries */ break;
    }
  };

  for (const def of SIMULATOR_BADGES) {
    if (def.tier === "level") {
      levels.push(levelMeta(def));
      continue;
    }
    // Legacy mission-* keys use the -good/-neutral/-bad/-mastery suffix
    // pattern; everything else is a V3 semantic-slug badge.
    route(isLegacyScenarioKey(def.key) ? scenarioMeta(def) : v3Meta(def));
  }

  const metas = ACHIEVEMENTS.map(metaAchievementMeta);
  const arrival = metas.filter((m) => m.category === "arrival");
  for (const m of metas) {
    if (m.category !== "arrival") route(m);
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
