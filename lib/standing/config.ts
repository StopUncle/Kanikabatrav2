/**
 * Ranks: unified progression config.
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
  /** Drill bonus for a full-deck run at 80 percent accuracy or better. */
  DRILL_SHARP_BONUS: 5,
  /** Drill bonus on top for a perfect full deck. */
  DRILL_PERFECT_BONUS: 5,
  /** A Lab session brought to an end state. */
  LAB: 40,
  /**
   * Bonus on LAB when the judge's outcome is "held". Showing up still
   * pays the floor; holding the line pays more, following the
   * TELL_CORRECT_AXIS precedent: small performance bonuses on top of a
   * guaranteed floor keep the "Standing measures showing up" law intact.
   * The Mark alone measures skill.
   */
  LAB_HELD_BONUS: 20,
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
  /**
   * Finished a sitting of the Baseline Read. Paid for showing up, never
   * for the result: The Mark measures skill, Standing measures presence,
   * and the two stay strictly separate.
   */
  BASELINE: 75,
  /**
   * Finished a week of the 12 Week Transformation. The largest single grant
   * in the system, because it is the only one that asks the member to do
   * something away from the screen and come back.
   */
  PROGRAM_WEEK: 150,
  /** Finishing a league week in the promotion band. */
  LEAGUE_PROMOTION: 75,
  /** Finishing first in The Detached, the top league tier. */
  LEAGUE_CHAMPION: 150,
  /** First time this member reaches a given ending on a scenario. */
  ENDING_FOUND: 15,
  /** Unified-streak milestones, keyed by day count. */
  STREAK_MILESTONES: { 7: 100, 30: 500, 100: 2000 } as Record<number, number>,
} as const;

/**
 * Where free-tier Standing stops: the Analyst threshold. Derived from the
 * ring table so the ceiling and the rank can never drift apart. The
 * upgrade sheet's standing-frozen copy promises exactly this line.
 */
export const FREE_STANDING_CEILING = RINGS.find((r) => r.level === 3)!.threshold;

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
