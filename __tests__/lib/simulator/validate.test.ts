import { collectScenarioIssues } from "@/lib/simulator/validate";
import type { Scenario, Scene } from "@/lib/simulator/types";

function scene(partial: Partial<Scene> & { id: string }): Scene {
  return { dialog: [{ text: "line" }], ...partial };
}

function scenario(scenes: Scene[], startSceneId = scenes[0].id): Scenario {
  return {
    id: "test-scenario",
    title: "Test",
    tagline: "",
    description: "",
    tier: "free",
    level: 1,
    order: 1,
    estimatedMinutes: 1,
    difficulty: "beginner",
    category: "healthy",
    xpReward: 0,
    startSceneId,
    characters: [],
    scenes,
    tacticsLearned: [],
    redFlagsTaught: [],
  };
}

const codes = (s: Scenario) => collectScenarioIssues(s).map((i) => i.code);

describe("collectScenarioIssues: empty-non-ending-scene", () => {
  it("flags a non-ending scene with empty dialog and no choices as an error, even with a nextSceneId", () => {
    const sc = scenario([
      scene({ id: "s1", dialog: [], nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
      scene({
        id: "s0-router",
        dialog: [{ text: "go" }],
        choices: [
          { id: "a", text: "to s1", nextSceneId: "s1", isOptimal: true },
          { id: "b", text: "to end", nextSceneId: "end" },
        ],
      }),
    ], "s0-router");

    const issue = collectScenarioIssues(sc).find(
      (i) => i.code === "empty-non-ending-scene",
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("error");
    expect(issue?.message).toContain("s1");
  });

  it("does not flag a non-ending auto-advance scene that has dialog", () => {
    const sc = scenario([
      scene({ id: "s1", nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
      scene({
        id: "start",
        choices: [
          { id: "a", text: "to s1", nextSceneId: "s1", isOptimal: true },
          { id: "b", text: "to end", nextSceneId: "end" },
        ],
      }),
    ], "start");
    expect(codes(sc)).not.toContain("empty-non-ending-scene");
  });

  it("does not flag an ending scene with empty dialog", () => {
    const sc = scenario([
      scene({
        id: "start",
        choices: [
          { id: "a", text: "win", nextSceneId: "good", isOptimal: true },
          { id: "b", text: "lose", nextSceneId: "bad" },
        ],
      }),
      scene({ id: "good", dialog: [], isEnding: true, outcomeType: "good" }),
      scene({ id: "bad", dialog: [], isEnding: true, outcomeType: "bad" }),
    ], "start");
    expect(codes(sc)).not.toContain("empty-non-ending-scene");
  });
});
