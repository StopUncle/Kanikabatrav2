/**
 * Ranks — unified progression config.
 *
 * Standing is the engagement currency every surface grants; the rank is the
 * member's earned position, counted INWARD (4 = the door, 1 = innermost).
 * Four ranks: Initiate, Analyst, Profiler, IC. The top rank is a job, not a
 * badge: IC carries duties (welcomer role, Board input) assigned by Kanika.
 *
 * Design rules:
 *  - Standing only goes up. It measures showing up, not skill.
 *  - The skill Measure (Baseline Read) never feeds Standing and Standing
 *    never feeds it.
 *  - Analyst must be reachable in week one for a normally engaged member
 *    (the activation rule). Profiler lands around month two; IC takes a
 *    committed half year.
 */

export interface RingDef {
  /** 4 (outermost) … 1 (innermost). */
  level: number;
  /** Display name, e.g. "Analyst". */
  name: string;
  /** Minimum lifetime Standing to hold this rank. */
  threshold: number;
}

/** Ordered outermost → innermost. */
export const RINGS: readonly RingDef[] = [
  { level: 4, name: "Initiate", threshold: 0 },
  { level: 3, name: "Analyst", threshold: 250 },
  { level: 2, name: "Profiler", threshold: 2500 },
  { level: 1, name: "IC", threshold: 10000 },
];

/** Standing granted per action. One place, so amounts never drift. */
export const STANDING = {
  /** Multiplier on a scenario's earned XP at first completion. */
  SCENARIO_XP_MULTIPLIER: 1,
  /** Bonus on top of scenario XP when the run was today's daily mission. */
  DAILY_MISSION_BONUS: 50,
  /** First scored response to a daily Tell. */
  TELL: 25,
  /** Extra per correct axis on that response. */
  TELL_CORRECT_AXIS: 15,
  /** A finished Speed Drill session. */
  DRILL: 20,
  /** Max DRILL grants per UTC day (anti-farm). */
  DRILL_DAILY_CAP: 3,
  /** A Lab session brought to an end state. */
  LAB: 40,
  /** A submitted Receipt (already quota-capped upstream). */
  RECEIPT: 15,
  /** An approved-path feed comment. */
  COMMENT: 10,
  /** Max COMMENT grants per UTC day (anti-spam). */
  COMMENT_DAILY_CAP: 3,
  /** Kanika answered your Ask-Kanika question. */
  QUESTION_ANSWERED: 100,
  /** Watched a weekly Session video (Phase 2 surface). */
  SESSION_WATCH: 60,
  /** Completed a Path chapter (the Seal bonus, deduped per chapter). */
  CHAPTER: 100,
  /** Unified-streak milestones, keyed by day count. */
  STREAK_MILESTONES: { 7: 100, 30: 500, 100: 2000 } as Record<number, number>,
} as const;

/** Resolve the rank a lifetime-Standing total earns. */
export function ringForStanding(standing: number): RingDef {
  let ring: RingDef = RINGS[0];
  for (const r of RINGS) {
    if (standing >= r.threshold) ring = r;
  }
  return ring;
}

export function ringByLevel(level: number): RingDef {
  return RINGS.find((r) => r.level === level) ?? RINGS[0];
}

/**
 * Standing still needed to reach the next rank inward, or null at IC.
 */
export function standingToNextRing(standing: number): {
  next: RingDef;
  remaining: number;
} | null {
  const current = ringForStanding(standing);
  const next = RINGS.find((r) => r.level === current.level - 1);
  if (!next) return null;
  return { next, remaining: Math.max(0, next.threshold - standing) };
}
