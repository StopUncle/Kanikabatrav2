import { markScore } from "@/lib/mark/read";

/**
 * The headline maths only: a phantom record of 8 standard answers at
 * 35% sits under every real answer, so early perfection reads modest
 * and the prior fades as genuine evidence accumulates.
 */
describe("markScore", () => {
  it("holds a perfect day-one sitting well under 100", () => {
    // 5 for 5: (5 + 2.8) / (5 + 8) = 60%.
    expect(markScore(5, 5)).toBeCloseTo(0.6, 5);
  });

  it("keeps a perfect three-answer record modest", () => {
    expect(markScore(3, 3)).toBeLessThan(0.55);
  });

  it("fades the prior as the record grows", () => {
    // A genuine 80% catcher over 100 answers reads in the high 70s.
    const settled = markScore(80, 100);
    expect(settled).toBeGreaterThan(0.76);
    expect(settled).toBeLessThan(0.8);
  });

  it("pulls a thin all-miss record toward the prior, not to zero", () => {
    expect(markScore(0, 3)).toBeGreaterThan(0.2);
  });

  it("rewards the same catches more when they carried more weight", () => {
    // Ten catches on advanced material (1.5 each) versus ten on
    // beginner cards (0.6 each): same accuracy, harder evidence wins.
    expect(markScore(15, 15)).toBeGreaterThan(markScore(6, 6));
  });
});
