import { parseSpec } from "@/scripts/lib/scenario-spec-parser";

const VALID_FRONTMATTER = `---
id: b15-the-acquisition-table
track: male-business
level: 9
order: 1
title: The Acquisition Table
tagline: The number is the smaller question.
difficulty: advanced
category: business
estimatedMinutes: 12
tier: premium
tactic-spotlight: silence-as-leverage
red-flags-taught:
  - lowball-anchored-as-friendly
characters:
  - id: kai
    name: Kai
    description: Founder.
    traits: [calculating]
    defaultEmotion: neutral
  - id: marc
    name: Marc Devereaux
    description: Acquisition lead.
    traits: [smooth]
    defaultEmotion: smirking
setting: A glass-walled boardroom.
opening-beat: Marc slides a single sheet across.
desired-endings:
  - good: Kai counters with silence and a written term sheet.
  - bad: Kai accepts on the spot.
---

## Brief

Some prose here.
`;

describe("parseSpec", () => {
  test("parses a well-formed spec", () => {
    const { spec, body } = parseSpec(VALID_FRONTMATTER);
    expect(spec.id).toBe("b15-the-acquisition-table");
    expect(spec.track).toBe("male-business");
    expect(spec.characters).toHaveLength(2);
    expect(spec.endings).toHaveLength(2);
    expect(spec.endings[0]).toEqual({
      outcome: "good",
      summary: "Kai counters with silence and a written term sheet.",
    });
    expect(body).toContain("## Brief");
  });

  test("coerces a single tactic string into an array", () => {
    const { spec } = parseSpec(VALID_FRONTMATTER);
    expect(Array.isArray(spec.tacticsLearned)).toBe(true);
    expect(spec.tacticsLearned).toContain("silence-as-leverage");
  });

  test("rejects an unknown track", () => {
    const bad = VALID_FRONTMATTER.replace(
      "track: male-business",
      "track: not-a-track",
    );
    expect(() => parseSpec(bad)).toThrow(/track/);
  });

  test("rejects an id with uppercase letters", () => {
    const bad = VALID_FRONTMATTER.replace(
      "id: b15-the-acquisition-table",
      "id: B15-AcquisitionTable",
    );
    expect(() => parseSpec(bad)).toThrow(/id/);
  });

  test("rejects a spec with only one ending", () => {
    const bad = VALID_FRONTMATTER.replace(
      `desired-endings:
  - good: Kai counters with silence and a written term sheet.
  - bad: Kai accepts on the spot.`,
      `desired-endings:
  - good: Only one ending.`,
    );
    expect(() => parseSpec(bad)).toThrow(/endings/);
  });

  test("rejects a spec missing required fields", () => {
    expect(() => parseSpec("---\nid: x\n---\nbody")).toThrow();
  });
});
