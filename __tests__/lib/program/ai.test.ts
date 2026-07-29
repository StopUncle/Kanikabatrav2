// safety.ts imports the Anthropic SDK for its classifier half, and the SDK
// refuses to load in jest's fetch-less environment. Everything tested here
// is the pure half, so the SDK wrapper is stubbed out at the boundary.
jest.mock("@/lib/anthropic", () => ({
  getAnthropic: jest.fn(),
  extractText: jest.fn(),
  stripCodeFences: jest.fn(),
}));

import { sweepText, CRISIS_CARD } from "@/lib/program/ai/safety";
import { isGauntletWeek, arcOf, buildWeeksOf } from "@/lib/program/ai/arcs";
import { BANNED_PHRASES } from "@/lib/program/ai/voice";

/**
 * The pure halves of The Twelve's AI layer. The generation itself is gated
 * by the 50-reply audit (scripts/program-voice-audit.ts); these lock the
 * mechanics that never need a model to verify.
 */

describe("arcs", () => {
  it("marks exactly weeks 4, 8 and 12 as gauntlets", () => {
    const gauntlets = Array.from({ length: 12 }, (_, i) => i + 1).filter(
      isGauntletWeek,
    );
    expect(gauntlets).toEqual([4, 8, 12]);
  });

  it("assigns each week to its arc", () => {
    expect(arcOf(1)).toBe(1);
    expect(arcOf(4)).toBe(1);
    expect(arcOf(5)).toBe(2);
    expect(arcOf(8)).toBe(2);
    expect(arcOf(9)).toBe(3);
    expect(arcOf(12)).toBe(3);
  });

  it("compounds the right build weeks into each gauntlet", () => {
    expect(buildWeeksOf(4)).toEqual([1, 2, 3]);
    expect(buildWeeksOf(8)).toEqual([5, 6, 7]);
    expect(buildWeeksOf(12)).toEqual([9, 10, 11]);
  });
});

describe("sweepText", () => {
  it("passes her register", () => {
    expect(
      sweepText(
        "He was not a person; he was a performance. You wrote 340 words about Thursday and 11 of them are about what you did.",
      ).ok,
    ).toBe(true);
  });

  it("catches the em dash, the one character the model is never trusted with", () => {
    const result = sweepText("This is not a flaw—it is programming.");
    expect(result.ok).toBe(false);
    expect(result.problems).toContain("em dash");
  });

  it("catches every banned phrase, case-insensitively", () => {
    for (const phrase of BANNED_PHRASES) {
      const result = sweepText(`Something. ${phrase.toUpperCase()} something.`);
      expect(result.ok).toBe(false);
    }
  });

  it("catches emoji", () => {
    expect(sweepText("You did the thing 🎉").ok).toBe(false);
  });

  it("passes the fixed crisis card, which must never trip its own sweep", () => {
    expect(sweepText(CRISIS_CARD).ok).toBe(true);
  });
});
