import { lintScenario } from "@/scripts/lib/scenario-validator";
import type { Scenario } from "@/lib/simulator/types";

function baseScenario(overrides: Partial<Scenario> = {}): Scenario {
  return {
    id: "test-scenario",
    title: "Test",
    tagline: "A test scenario.",
    description: "A scenario used in the validator unit tests.",
    tier: "free",
    level: 1,
    order: 1,
    estimatedMinutes: 5,
    difficulty: "beginner",
    category: "professional",
    xpReward: 0,
    startSceneId: "opening",
    characters: [
      {
        id: "kai",
        name: "Kai",
        description: "The player.",
        traits: [],
        defaultEmotion: "neutral",
      },
    ],
    scenes: [
      {
        id: "opening",
        dialog: [{ speakerId: "kai", text: "Hello." }],
        choices: [
          {
            id: "go",
            text: "Continue.",
            isOptimal: true,
            nextSceneId: "good-ending",
          },
          {
            id: "stop",
            text: "Bail.",
            isOptimal: false,
            nextSceneId: "bad-ending",
          },
        ],
      },
      {
        id: "good-ending",
        isEnding: true,
        outcomeType: "good",
        endingTitle: "Won",
        endingSummary: "You won.",
        dialog: [{ speakerId: "kai", text: "Done." }],
      },
      {
        id: "bad-ending",
        isEnding: true,
        outcomeType: "bad",
        endingTitle: "Lost",
        endingSummary: "You lost.",
        dialog: [{ speakerId: "kai", text: "Failed." }],
      },
    ],
    tacticsLearned: [],
    redFlagsTaught: [],
    ...overrides,
  };
}

describe("lintScenario", () => {
  test("a well-formed scenario passes", () => {
    expect(lintScenario(baseScenario())).toEqual([]);
  });

  test("catches a missing scene referenced from a choice", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "opening"
          ? {
              ...s,
              choices: s.choices!.map((c, i) =>
                i === 0 ? { ...c, nextSceneId: "does-not-exist" } : c,
              ),
            }
          : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("does-not-exist"))).toBe(true);
  });

  test("catches a self-loop", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "opening"
          ? {
              ...s,
              choices: s.choices!.map((c, i) =>
                i === 0 ? { ...c, nextSceneId: "opening" } : c,
              ),
            }
          : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("loops back"))).toBe(true);
  });

  test("catches an ending missing outcomeType", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "good-ending" ? { ...s, outcomeType: undefined } : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("missing outcomeType"))).toBe(true);
  });

  test("catches an ending missing endingTitle / endingSummary", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "good-ending"
          ? { ...s, endingTitle: undefined, endingSummary: undefined }
          : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("endingTitle"))).toBe(true);
    expect(errors.some((e) => e.includes("endingSummary"))).toBe(true);
  });

  test("catches an unreachable scene", () => {
    const bad = baseScenario({
      scenes: [
        ...baseScenario().scenes,
        {
          id: "orphan",
          isEnding: true,
          outcomeType: "neutral",
          endingTitle: "Orphan",
          endingSummary: "Never reached.",
          dialog: [],
        },
      ],
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.toLowerCase().includes("unreachable"))).toBe(
      true,
    );
  });

  test("catches a non-ending scene with no choices and no nextSceneId", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "opening" ? { ...s, choices: undefined, nextSceneId: undefined } : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("soft-locks"))).toBe(true);
  });

  test("catches a dialog speakerId not in characters[]", () => {
    const bad = baseScenario({
      scenes: baseScenario().scenes.map((s) =>
        s.id === "opening"
          ? { ...s, dialog: [{ speakerId: "ghost", text: "Boo." }] }
          : s,
      ),
    });
    const errors = lintScenario(bad);
    expect(errors.some((e) => e.includes("ghost"))).toBe(true);
  });
});
