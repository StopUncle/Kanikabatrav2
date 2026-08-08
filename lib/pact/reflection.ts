/**
 * What a member says about a week, either way it went.
 *
 * Two things are captured, and the split matters:
 *
 * DIFFICULTY rates the CHALLENGE, not the person. A self-score on your own
 * performance turns a binary commitment into a feeling ("I kept it, 6/10"),
 * and the Pact's entire power is that it is binary. Rating the week instead
 * leaves kept-or-scarred untouched and answers a question nothing else in
 * the product can: is week three too easy, and is week seven brutal.
 *
 * THE MISS REASON exists because a scar used to arrive in silence. The week
 * lapsed, a cron flipped it, and the member was never asked. That threw away
 * the only data that explains why people fail, and it turned the most
 * salvageable moment in the product into the least engaged one.
 */

export const MIN_DIFFICULTY = 1;
export const MAX_DIFFICULTY = 10;

export function isValidDifficulty(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= MIN_DIFFICULTY &&
    value <= MAX_DIFFICULTY
  );
}

/**
 * Anchors under the difficulty scale. Only the ends and the middle are
 * labelled: naming all ten would invite the member to calibrate against our
 * words instead of their week.
 */
export const DIFFICULTY_ANCHORS: Record<number, string> = {
  1: "Barely noticed it",
  5: "Had to make myself",
  10: "Hardest thing I did",
};

/**
 * Why a week did not happen.
 *
 * Tappable, because free text is excellent for Kanika and useless in
 * aggregate: five keys give you the pattern across a cohort, and the note
 * underneath keeps the human. Deliberately blameless wording. A list that
 * reads as an accusation gets the honest answer replaced by whichever
 * option stings least, and then the data is worse than none.
 *
 * `forgot` is first because it is expected to be the most common and the
 * most fixable: it is the one a day-five nudge actually moves.
 */
export const PACT_MISS_REASONS = [
  {
    key: "forgot",
    label: "It slipped",
    hint: "The week got away from me.",
  },
  {
    key: "no-occasion",
    label: "No chance to",
    hint: "The situation never came up.",
  },
  {
    key: "nerve",
    label: "Lost my nerve",
    hint: "The moment came and I did not take it.",
  },
  {
    key: "unclear",
    label: "Did not understand it",
    hint: "I was not sure what it was asking.",
  },
  {
    key: "life",
    label: "Life happened",
    hint: "Something bigger was going on.",
  },
] as const;

export type PactMissReasonKey = (typeof PACT_MISS_REASONS)[number]["key"];

const REASON_KEYS: ReadonlySet<string> = new Set(
  PACT_MISS_REASONS.map((r) => r.key),
);

export function isValidMissReason(value: unknown): value is PactMissReasonKey {
  return typeof value === "string" && REASON_KEYS.has(value);
}

export function missReasonLabel(key: string | null): string | null {
  return PACT_MISS_REASONS.find((r) => r.key === key)?.label ?? null;
}

/** Free-text cap on the "what was hard" note. */
export const MISS_NOTE_MAX = 1000;

/**
 * How long a keep can be taken back.
 *
 * Until the week ends, and not a moment after. Keep is not destructive, so
 * this is not a safety net; it is about the record being TRUE. A fat-fingered
 * keep is a lie sitting permanently in the one artefact whose whole value is
 * that it does not lie. Once the week closes the row is history and history
 * does not get edited.
 */
export function canUndoKeep(weekEndsAt: Date, now: Date = new Date()): boolean {
  return now < weekEndsAt;
}

/** Whole days left in the week, floored at zero. */
export function daysLeft(weekEndsAt: Date, now: Date = new Date()): number {
  const ms = weekEndsAt.getTime() - now.getTime();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

/**
 * When the week is close enough to its end to be worth a nudge.
 *
 * Most misses are not refusals, they are the week getting away from
 * somebody. The nudge exists for those, so it fires with two days left
 * rather than on the last afternoon, when there is still time to act.
 */
export const NUDGE_DAYS_LEFT = 2;
