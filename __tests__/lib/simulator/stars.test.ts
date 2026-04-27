import {
  computeStars,
  computeStarsFromJson,
  isPassingOutcome,
  masteryRatio,
  masteryPercent,
  STAR_THRESHOLD,
} from "@/lib/simulator/stars";
import type { ChoiceRecord } from "@/lib/simulator/types";

const ts = "2026-04-27T00:00:00Z";
const optimal = (n: number): ChoiceRecord[] =>
  Array.from({ length: n }, (_, i) => ({
    sceneId: `s${i}`,
    choiceId: `c${i}`,
    wasOptimal: true,
    timestamp: ts,
  }));
const nonOptimal = (n: number): ChoiceRecord[] =>
  Array.from({ length: n }, (_, i) => ({
    sceneId: `s${i}`,
    choiceId: `c${i}`,
    wasOptimal: false,
    timestamp: ts,
  }));
const mix = (good: number, bad: number): ChoiceRecord[] => [
  ...optimal(good),
  ...nonOptimal(bad),
];

describe("isPassingOutcome", () => {
  it("treats good and passed as wins", () => {
    expect(isPassingOutcome("good")).toBe(true);
    expect(isPassingOutcome("passed")).toBe(true);
  });
  it("treats neutral / failed / bad as not-wins", () => {
    expect(isPassingOutcome("neutral")).toBe(false);
    expect(isPassingOutcome("failed")).toBe(false);
    expect(isPassingOutcome("bad")).toBe(false);
  });
  it("null is not a win", () => {
    expect(isPassingOutcome(null)).toBe(false);
    expect(isPassingOutcome(undefined)).toBe(false);
  });
});

describe("masteryRatio + masteryPercent", () => {
  it("0 for empty choices", () => {
    expect(masteryRatio([])).toBe(0);
    expect(masteryPercent([])).toBe(0);
  });
  it("1.0 for all-optimal", () => {
    expect(masteryRatio(optimal(5))).toBe(1);
    expect(masteryPercent(optimal(5))).toBe(100);
  });
  it("0 for all-non-optimal", () => {
    expect(masteryRatio(nonOptimal(5))).toBe(0);
    expect(masteryPercent(nonOptimal(5))).toBe(0);
  });
  it("rounds percent correctly for fractional ratio", () => {
    // 4/7 = 0.571 → 57%
    expect(masteryPercent(mix(4, 3))).toBe(57);
  });
});

describe("computeStars", () => {
  it("returns 0 when outcome is null (uncompleted run)", () => {
    expect(computeStars({ outcome: null, choicesMade: optimal(10) })).toBe(0);
  });
  it("returns 1 for failed runs even with all-optimal choices", () => {
    expect(computeStars({ outcome: "failed", choicesMade: optimal(10) })).toBe(1);
    expect(computeStars({ outcome: "bad", choicesMade: optimal(10) })).toBe(1);
  });
  it("returns 1 for neutral outcome (didn't lose, didn't win)", () => {
    expect(computeStars({ outcome: "neutral", choicesMade: optimal(10) })).toBe(1);
  });
  it("returns 2 for passing run below mastery threshold", () => {
    // 4/10 optimal = 40%, well below 80%
    expect(computeStars({ outcome: "passed", choicesMade: mix(4, 6) })).toBe(2);
  });
  it("returns 3 for passing run AT or ABOVE the threshold", () => {
    // 8/10 = 80% exactly — should hit the 3-star threshold (>=)
    expect(computeStars({ outcome: "passed", choicesMade: mix(8, 2) })).toBe(3);
    // 9/10 = 90%
    expect(computeStars({ outcome: "good", choicesMade: mix(9, 1) })).toBe(3);
  });
  it("respects per-scenario threshold override", () => {
    // 6/10 = 60%. Default threshold (80%) → 2 stars. Override to 50% → 3.
    expect(computeStars({ outcome: "passed", choicesMade: mix(6, 4) })).toBe(2);
    expect(
      computeStars({ outcome: "passed", choicesMade: mix(6, 4), threshold: 0.5 }),
    ).toBe(3);
  });
  it("STAR_THRESHOLD is 0.8 for v1", () => {
    expect(STAR_THRESHOLD).toBe(0.8);
  });
});

describe("computeStarsFromJson", () => {
  it("handles JSON-shaped choicesMade from prisma", () => {
    const json = optimal(8).concat(nonOptimal(2)) as unknown;
    expect(computeStarsFromJson("passed", json)).toBe(3);
  });
  it("doesn't crash on malformed json — caps stars at 2 when mastery can't be proven", () => {
    // Outcome=good is enough for tier 2 (winning). Tier 3 requires
    // mastery data, which is absent → cap at 2 rather than throw.
    expect(computeStarsFromJson("good", null)).toBe(2);
    expect(computeStarsFromJson("good", "not an array")).toBe(2);
    expect(computeStarsFromJson("good", { not: "array" })).toBe(2);
  });
  it("returns 1 even with bad json on a failed outcome", () => {
    // Outcome alone determines the lower-tier rating, so failed/bad
    // still get 1 star for completion regardless of choice data quality.
    expect(computeStarsFromJson("failed", null)).toBe(1);
  });
});
