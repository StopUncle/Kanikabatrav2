import {
  drillStandingBreakdown,
  DRILL_SHARP_ACCURACY,
} from "@/lib/games/speed-drill/scoring";
import { DRILL_CARDS } from "@/lib/games/speed-drill/content";
import { STANDING } from "@/lib/standing/config";

describe("drillStandingBreakdown", () => {
  it("pays base plus sharp plus perfect on a perfect full deck", () => {
    const b = drillStandingBreakdown(DRILL_CARDS, DRILL_CARDS);
    expect(b.base).toBe(STANDING.DRILL);
    expect(b.sharpBonus).toBe(STANDING.DRILL_SHARP_BONUS);
    expect(b.perfectBonus).toBe(STANDING.DRILL_PERFECT_BONUS);
    expect(b.total).toBe(
      STANDING.DRILL +
        STANDING.DRILL_SHARP_BONUS +
        STANDING.DRILL_PERFECT_BONUS,
    );
  });

  it("pays sharp but not perfect at 80 percent on a full deck", () => {
    const score = Math.ceil((DRILL_SHARP_ACCURACY / 100) * DRILL_CARDS);
    const b = drillStandingBreakdown(score, DRILL_CARDS);
    expect(b.sharpBonus).toBe(STANDING.DRILL_SHARP_BONUS);
    expect(b.perfectBonus).toBe(0);
    expect(b.total).toBe(STANDING.DRILL + STANDING.DRILL_SHARP_BONUS);
  });

  it("pays only the floor below the sharp threshold", () => {
    const b = drillStandingBreakdown(7, DRILL_CARDS);
    expect(b.sharpBonus).toBe(0);
    expect(b.perfectBonus).toBe(0);
    expect(b.total).toBe(STANDING.DRILL);
  });

  it("never bonuses a partial deck, even a perfect one", () => {
    const b = drillStandingBreakdown(5, 5);
    expect(b.sharpBonus).toBe(0);
    expect(b.perfectBonus).toBe(0);
    expect(b.total).toBe(STANDING.DRILL);
  });

  it("keeps the floor on a zero-answer run", () => {
    const b = drillStandingBreakdown(0, 0);
    expect(b.total).toBe(STANDING.DRILL);
  });
});
