import {
  DIFFICULTY_ANCHORS,
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
  MISS_NOTE_MAX,
  NUDGE_DAYS_LEFT,
  PACT_MISS_REASONS,
  canUndoKeep,
  daysLeft,
  isValidDifficulty,
  isValidMissReason,
  missReasonLabel,
} from "@/lib/pact/reflection";

/**
 * The rules behind a week's outcome.
 *
 * Two of these are product decisions with teeth, not utilities:
 *
 * `canUndoKeep` is bounded to the live week because a keep you can take
 * back later makes every kept week provisional, and a record of
 * provisional weeks is worth nothing.
 *
 * The difficulty scale rates the CHALLENGE. If it ever becomes a rating of
 * the member, the Pact stops being binary and starts being a mood.
 */

describe("difficulty", () => {
  it("accepts the whole 1 to 10 range", () => {
    for (let n = MIN_DIFFICULTY; n <= MAX_DIFFICULTY; n++) {
      expect(isValidDifficulty(n)).toBe(true);
    }
  });

  it("rejects out of range, fractions and non-numbers", () => {
    for (const bad of [0, 11, -1, 5.5, "7", null, undefined, NaN, {}, []]) {
      expect(isValidDifficulty(bad)).toBe(false);
    }
  });

  it("labels only the ends and the middle", () => {
    // Naming all ten invites people to calibrate against our words rather
    // than their week, and then the number means our thing, not theirs.
    expect(Object.keys(DIFFICULTY_ANCHORS)).toHaveLength(3);
    expect(DIFFICULTY_ANCHORS[MIN_DIFFICULTY]).toBeDefined();
    expect(DIFFICULTY_ANCHORS[MAX_DIFFICULTY]).toBeDefined();
  });

  it("never describes the member, only the week", () => {
    // A guard on wording. "You" in an anchor is the first step to a
    // self-score, which is the thing this scale exists to avoid.
    for (const label of Object.values(DIFFICULTY_ANCHORS)) {
      expect(label.toLowerCase()).not.toMatch(/\byou\b|\byour\b/);
    }
  });
});

describe("miss reasons", () => {
  it("accepts every published key and nothing else", () => {
    for (const r of PACT_MISS_REASONS) {
      expect(isValidMissReason(r.key)).toBe(true);
    }
    for (const bad of ["", "lazy", null, undefined, 3, {}]) {
      expect(isValidMissReason(bad)).toBe(false);
    }
  });

  it("gives every reason a label and a hint", () => {
    for (const r of PACT_MISS_REASONS) {
      expect(r.label.length).toBeGreaterThan(0);
      expect(r.hint.length).toBeGreaterThan(0);
    }
  });

  it("has unique keys", () => {
    const keys = PACT_MISS_REASONS.map((r) => r.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("blames nobody", () => {
    // A list that reads as an accusation gets the honest answer swapped
    // for whichever option stings least, and then the data is worse than
    // having none.
    const blaming = /lazy|excuse|failed|weak|couldn't be bothered|gave up/i;
    for (const r of PACT_MISS_REASONS) {
      expect(r.label).not.toMatch(blaming);
      expect(r.hint).not.toMatch(blaming);
    }
  });

  it("leads with the one a nudge can actually fix", () => {
    // Forgetting is expected to be the most common and is the only reason
    // on the list that a reminder moves.
    expect(PACT_MISS_REASONS[0].key).toBe("forgot");
  });

  it("resolves a label, and null for an unknown key", () => {
    expect(missReasonLabel("forgot")).toBe("It slipped");
    expect(missReasonLabel("nonsense")).toBeNull();
    expect(missReasonLabel(null)).toBeNull();
  });

  it("caps the free-text note", () => {
    expect(MISS_NOTE_MAX).toBeGreaterThan(200);
  });
});

describe("canUndoKeep", () => {
  const ends = new Date("2026-08-10T00:00:00Z");

  it("allows it while the week is running", () => {
    expect(canUndoKeep(ends, new Date("2026-08-09T23:59:00Z"))).toBe(true);
  });

  it("refuses it the moment the week closes", () => {
    // History does not get edited. A late undo would make every kept week
    // provisional.
    expect(canUndoKeep(ends, ends)).toBe(false);
    expect(canUndoKeep(ends, new Date("2026-08-10T00:00:01Z"))).toBe(false);
  });
});

describe("daysLeft", () => {
  const ends = new Date("2026-08-10T00:00:00Z");

  it("counts part days up, so the last day reads as one", () => {
    expect(daysLeft(ends, new Date("2026-08-09T01:00:00Z"))).toBe(1);
    expect(daysLeft(ends, new Date("2026-08-08T01:00:00Z"))).toBe(2);
  });

  it("floors at zero once the week has ended", () => {
    expect(daysLeft(ends, ends)).toBe(0);
    expect(daysLeft(ends, new Date("2026-08-12T00:00:00Z"))).toBe(0);
  });

  it("steps down exactly one per daily sweep, so the nudge fires once", () => {
    // The cron has no dedup state: it relies on only one daily pass seeing
    // NUDGE_DAYS_LEFT. If this ever skips a value, members get nudged
    // twice or not at all.
    const seen: number[] = [];
    for (let d = 0; d < 7; d++) {
      const at = new Date(ends.getTime() - (7 - d) * 86_400_000 + 3_600_000);
      seen.push(daysLeft(ends, at));
    }
    const hits = seen.filter((n) => n === NUDGE_DAYS_LEFT);
    expect(hits).toHaveLength(1);
  });

  it("nudges with time left to act on it", () => {
    // A reminder on the last afternoon is an accusation, not a nudge.
    expect(NUDGE_DAYS_LEFT).toBeGreaterThanOrEqual(1);
  });
});
