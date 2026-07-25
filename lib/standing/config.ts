/**
 * The Rings — unified progression config.
 *
 * Standing is the engagement currency every surface grants; the ring is the
 * member's earned position, counted INWARD (7 = the door, 1 = innermost).
 * Above the First Ring sits The Seat, which is invitation-only and lives
 * outside this ladder (a flag Kanika sets, not a threshold).
 *
 * Design rules (docs/CONSILIUM-REMAKE-PLAN.md §3, §5.5):
 *  - Standing only goes up. It measures showing up, not skill.
 *  - The skill Measure (Elo / Baseline Read) never feeds Standing and
 *    Standing never feeds it.
 *  - Thresholds are tuned so an engaged member (daily mission + tell +
 *    ~3 scenarios a week) advances roughly every 4-6 weeks early on,
 *    slowing to quarterly at the top. Re-tune against the retro-grant
 *    distribution before launch, not after.
 */

export interface RingDef {
  /** 7 (outermost) … 1 (innermost). */
  level: number;
  /** Display name, e.g. "The Fifth Ring". */
  name: string;
  /** One-word flavor shown under the name in ceremonies. */
  epithet: string;
  /** Minimum lifetime Standing to hold this ring. */
  threshold: number;
}

/** Ordered outermost → innermost. */
export const RINGS: readonly RingDef[] = [
  { level: 7, name: "The Seventh Ring", epithet: "the door", threshold: 0 },
  { level: 6, name: "The Sixth Ring", epithet: "the listeners", threshold: 500 },
  { level: 5, name: "The Fifth Ring", epithet: "the readers", threshold: 1500 },
  { level: 4, name: "The Fourth Ring", epithet: "the operators", threshold: 3500 },
  { level: 3, name: "The Third Ring", epithet: "the strategists", threshold: 7000 },
  { level: 2, name: "The Second Ring", epithet: "the counsel", threshold: 12000 },
  { level: 1, name: "The First Ring", epithet: "the regents", threshold: 20000 },
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
  /** Unified-streak milestones, keyed by day count. */
  STREAK_MILESTONES: { 7: 100, 30: 500, 100: 2000 } as Record<number, number>,
} as const;

/** Resolve the ring a lifetime-Standing total earns. */
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
 * Standing still needed to reach the next ring inward, or null at the
 * First Ring (The Seat is not a threshold — it is an invitation).
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
