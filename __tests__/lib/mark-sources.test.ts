import {
  resolveScenarioMarkCell,
  encountersFromScenarioRun,
} from "@/lib/mark/sources/scenario";
import {
  DRILL_CARD_TACTIC,
  encountersFromDrillAnswers,
} from "@/lib/mark/sources/drill";
import {
  LAB_PERSONA_MARKS,
  encountersFromLabScore,
} from "@/lib/mark/sources/lab";
import { DRILL_BANK } from "@/lib/games/speed-drill/content";
import { LAB_PERSONAS } from "@/lib/lab/personas";
import type { Scenario, ChoiceRecord } from "@/lib/simulator/types";

function makeScenario(overrides: Partial<Scenario> = {}): Scenario {
  return {
    id: "test-scn",
    title: "Test",
    tagline: "",
    description: "",
    tier: "free",
    level: 1,
    order: 1,
    estimatedMinutes: 5,
    difficulty: "beginner",
    category: "narcissist",
    xpReward: 100,
    startSceneId: "s1",
    characters: [
      {
        id: "vic",
        name: "Vic",
        description: "",
        traits: [],
        defaultEmotion: "neutral",
        personalityType: "narcissist",
      },
    ],
    scenes: [
      {
        id: "s1",
        dialog: [],
        choices: [
          { id: "a", text: "", nextSceneId: "s2", isOptimal: true },
          { id: "b", text: "", nextSceneId: "s2", isOptimal: false },
        ],
      },
      {
        id: "s2",
        dialog: [],
        choices: [
          { id: "c", text: "", nextSceneId: "end" },
          { id: "d", text: "", nextSceneId: "end" },
        ],
      },
      { id: "end", dialog: [], isEnding: true, outcomeType: "good" },
    ],
    tacticsLearned: [],
    redFlagsTaught: [],
    ...overrides,
  };
}

function record(sceneId: string, choiceId: string): ChoiceRecord {
  return { sceneId, choiceId, wasOptimal: true, timestamp: "t" };
}

describe("resolveScenarioMarkCell", () => {
  it("maps a single mappable cast member to its operator", () => {
    const cell = resolveScenarioMarkCell(makeScenario());
    expect(cell).toEqual({ tactic: null, operatorType: "NARCISSIST" });
  });

  it("refines the catch-all category via personalityType", () => {
    const cell = resolveScenarioMarkCell(
      makeScenario({
        characters: [
          {
            id: "vic",
            name: "V",
            description: "",
            traits: [],
            defaultEmotion: "neutral",
            personalityType: "borderline",
          },
        ],
      }),
    );
    expect(cell?.operatorType).toBe("BORDERLINE");
  });

  it("drops the operator when two different clusters appear in the cast", () => {
    const cell = resolveScenarioMarkCell(
      makeScenario({
        category: "gaslighter",
        characters: [
          {
            id: "a",
            name: "A",
            description: "",
            traits: [],
            defaultEmotion: "neutral",
            personalityType: "narcissist",
          },
          {
            id: "b",
            name: "B",
            description: "",
            traits: [],
            defaultEmotion: "neutral",
            personalityType: "borderline",
          },
        ],
      }),
    );
    expect(cell).toEqual({ tactic: "GASLIGHTING", operatorType: null });
  });

  it("falls back to the category when no cast member maps", () => {
    const cell = resolveScenarioMarkCell(
      makeScenario({
        characters: [
          {
            id: "f",
            name: "F",
            description: "",
            traits: [],
            defaultEmotion: "neutral",
            personalityType: "friend",
          },
        ],
      }),
    );
    expect(cell?.operatorType).toBe("NARCISSIST");
  });

  it("returns null for categories the taxonomy cannot claim", () => {
    const cell = resolveScenarioMarkCell(
      makeScenario({ category: "healthy", characters: [] }),
    );
    expect(cell).toBeNull();
  });
});

describe("encountersFromScenarioRun", () => {
  it("writes one encounter per graded choice point with re-derived correctness", () => {
    const scenario = makeScenario();
    const out = encountersFromScenarioRun(scenario, [
      { sceneId: "s1", choiceId: "b", wasOptimal: true, timestamp: "t" },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].correct).toBe(false);
    expect(out[0].sourceId).toBe("test-scn:s1");
  });

  it("skips ungraded choice points and unknown scenes or choices", () => {
    const scenario = makeScenario();
    const out = encountersFromScenarioRun(scenario, [
      record("s2", "c"),
      record("ghost", "a"),
      { sceneId: "s1", choiceId: "ghost", wasOptimal: true, timestamp: "t" },
    ]);
    expect(out).toHaveLength(0);
  });

  it("dedupes repeated visits to the same scene within a run", () => {
    const scenario = makeScenario();
    const out = encountersFromScenarioRun(scenario, [
      record("s1", "a"),
      record("s1", "b"),
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].correct).toBe(true);
  });

  it("writes nothing for an unmappable scenario", () => {
    const scenario = makeScenario({ category: "dating", characters: [] });
    expect(encountersFromScenarioRun(scenario, [record("s1", "a")])).toEqual(
      [],
    );
  });

  it("weights by difficulty, and gauntlet runs prove more", () => {
    expect(
      encountersFromScenarioRun(makeScenario(), [record("s1", "a")])[0].weight,
    ).toBe(0.6);

    const advanced = makeScenario({ difficulty: "advanced" });
    expect(
      encountersFromScenarioRun(advanced, [record("s1", "a")])[0].weight,
    ).toBe(1.5);
    expect(
      encountersFromScenarioRun(advanced, [record("s1", "a")], {
        gauntlet: true,
      })[0].weight,
    ).toBe(1.5 * 1.25);
  });
});

describe("drill mapper", () => {
  it("maps only card ids that exist in the bank", () => {
    const bankIds = new Set(DRILL_BANK.map((c) => c.id));
    for (const id of Object.keys(DRILL_CARD_TACTIC)) {
      expect(bankIds.has(id)).toBe(true);
    }
  });

  it("re-derives correctness from the bank and keeps answerMs", () => {
    const out = encountersFromDrillAnswers([
      { cardId: "m-gaslight", picked: true, answerMs: 1200 },
      { cardId: "m-gaslight", picked: false },
      { cardId: "c-boundary", picked: false },
      { cardId: "m-ultimatum", picked: true },
      { cardId: "ghost-card", picked: true },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      tactic: "GASLIGHTING",
      correct: true,
      sourceId: "m-gaslight",
      answerMs: 1200,
      // m-gaslight is a tier 2 card, the standard band.
      weight: 1,
    });
  });
});

describe("lab mapper", () => {
  it("maps every shipped persona", () => {
    for (const persona of LAB_PERSONAS) {
      expect(LAB_PERSONA_MARKS[persona.key]).toBeDefined();
    }
  });

  it("held writes correct rows, played writes incorrect, mixed writes nothing", () => {
    const held = encountersFromLabScore("guilt-weaver", "sess-1", "held");
    expect(held).toHaveLength(3);
    expect(held.every((e) => e.correct)).toBe(true);
    expect(held.every((e) => e.weight === 1.5)).toBe(true);
    expect(held.every((e) => e.operatorType === "COVERT_NARCISSIST")).toBe(
      true,
    );

    const played = encountersFromLabScore("guilt-weaver", "sess-1", "played");
    expect(played.every((e) => !e.correct)).toBe(true);

    expect(encountersFromLabScore("guilt-weaver", "sess-1", "mixed")).toEqual(
      [],
    );
    expect(encountersFromLabScore("ghost", "sess-1", "held")).toEqual([]);
  });
});
