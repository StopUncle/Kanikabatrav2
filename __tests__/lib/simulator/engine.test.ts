import {
  currentScene,
  initState,
  autoAdvance,
  applyChoice,
  isComplete,
  progressDepth,
  optimalCount,
  streakBonusXp,
  replayXp,
  replayXpDetailed,
  endingBonusFor,
} from "@/lib/simulator/engine";
import type {
  Scenario,
  Scene,
  ChoiceRecord,
  SimulatorState,
} from "@/lib/simulator/types";

// Minimal inline fixtures. Real scenario files under lib/simulator/scenarios
// are huge prose and must never be imported into a unit test.
function scene(partial: Partial<Scene> & { id: string }): Scene {
  return { dialog: [], ...partial };
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

function rec(
  sceneId: string,
  choiceId: string,
  wasOptimal: boolean,
): ChoiceRecord {
  return {
    sceneId,
    choiceId,
    wasOptimal,
    timestamp: "2026-07-06T00:00:00.000Z",
  };
}

describe("initState", () => {
  it("starts on startSceneId with no choices and zero xp", () => {
    const sc = scenario([scene({ id: "s1" })]);
    const state = initState(sc);

    expect(state.scenarioId).toBe("test-scenario");
    expect(state.currentSceneId).toBe("s1");
    expect(state.choicesMade).toEqual([]);
    expect(state.xpEarned).toBe(0);
    expect(state.outcome).toBeUndefined();
    expect(state.endedAt).toBeUndefined();
  });
});

describe("currentScene", () => {
  it("returns the pointed-at scene or null when missing", () => {
    const sc = scenario([scene({ id: "s1" }), scene({ id: "s2" })]);
    expect(currentScene(sc, initState(sc))?.id).toBe("s1");
    expect(
      currentScene(sc, { ...initState(sc), currentSceneId: "ghost" }),
    ).toBeNull();
  });
});

describe("autoAdvance", () => {
  it("advances to a non-ending scene via nextSceneId", () => {
    const sc = scenario([
      scene({ id: "a", nextSceneId: "b" }),
      scene({ id: "b" }),
    ]);
    const next = autoAdvance(sc, initState(sc));

    expect(next.currentSceneId).toBe("b");
    expect(next.outcome).toBeUndefined();
    expect(isComplete(next)).toBe(false);
  });

  it("finalizes directly when nextSceneId points at an ending", () => {
    const sc = scenario([
      scene({ id: "a", nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
    ]);
    const next = autoAdvance(sc, initState(sc));

    expect(next.currentSceneId).toBe("end");
    expect(next.outcome).toBe("good");
    expect(next.xpEarned).toBe(50);
    expect(isComplete(next)).toBe(true);
  });

  it("stamps currentSceneId onto the ending even though the caller passed pre-advance state", () => {
    const sc = scenario([
      scene({ id: "a", nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
    ]);
    // Caller hands over state whose cursor is still on "a".
    const next = autoAdvance(sc, initState(sc));
    expect(next.currentSceneId).toBe("end");
  });

  it("is a no-op when nextSceneId is missing (dead-end scene)", () => {
    const sc = scenario([scene({ id: "a" })]);
    const state = initState(sc);
    expect(autoAdvance(sc, state)).toBe(state);
  });

  it("is a no-op on a self-loop", () => {
    const sc = scenario([scene({ id: "a", nextSceneId: "a" })]);
    const state = initState(sc);
    expect(autoAdvance(sc, state)).toBe(state);
  });

  it("is a no-op when the scene has choices", () => {
    const sc = scenario([
      scene({
        id: "a",
        nextSceneId: "b",
        choices: [{ id: "c", text: "go", nextSceneId: "b" }],
      }),
      scene({ id: "b" }),
    ]);
    const state = initState(sc);
    expect(autoAdvance(sc, state)).toBe(state);
  });

  it("is a no-op when the current scene id is missing", () => {
    const sc = scenario([scene({ id: "a", nextSceneId: "b" })]);
    const state = { ...initState(sc), currentSceneId: "ghost" };
    expect(autoAdvance(sc, state)).toBe(state);
  });

  it("finalizes an ending scene the cursor already sits on", () => {
    const sc = scenario([scene({ id: "end", isEnding: true, outcomeType: "passed" })]);
    const next = autoAdvance(sc, initState(sc));
    // Not a pure no-op: it stamps the outcome. Cursor stays put.
    expect(next.currentSceneId).toBe("end");
    expect(next.outcome).toBe("passed");
    expect(isComplete(next)).toBe(true);
  });

  it("does not double-credit the ending bonus when called again on a finalized state", () => {
    const sc = scenario([scene({ id: "end", isEnding: true, outcomeType: "good" })]);
    const once = autoAdvance(sc, initState(sc));
    const twice = autoAdvance(sc, once);
    expect(twice).toBe(once);
    expect(twice.xpEarned).toBe(once.xpEarned);
    expect(twice.endedAt).toBe(once.endedAt);
  });
});

describe("applyChoice", () => {
  it("records the choice, advances the cursor, and credits xp", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [
          { id: "opt", text: "best", nextSceneId: "rest", isOptimal: true, xpBonus: 5 },
        ],
      }),
      scene({ id: "rest" }),
    ]);
    const next = applyChoice(sc, initState(sc), "opt");

    expect(next.currentSceneId).toBe("rest");
    expect(next.choicesMade).toHaveLength(1);
    expect(next.choicesMade[0]).toMatchObject({
      sceneId: "s1",
      choiceId: "opt",
      wasOptimal: true,
    });
    // optimal: xpBonus 5 + 10
    expect(next.xpEarned).toBe(15);
    expect(isComplete(next)).toBe(false);
  });

  it("credits mid-tier xp for an unflagged choice and base-only for explicit non-optimal", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [
          { id: "mid", text: "meh", nextSceneId: "rest" },
          { id: "bad", text: "bad", nextSceneId: "rest", isOptimal: false, xpBonus: 2 },
        ],
      }),
      scene({ id: "rest" }),
    ]);
    // unflagged: base 0 + 3
    expect(applyChoice(sc, initState(sc), "mid").xpEarned).toBe(3);
    // explicit non-optimal: base 2 only, no bonus
    expect(applyChoice(sc, initState(sc), "bad").xpEarned).toBe(2);
  });

  it("finalizes outcome and ending bonus when the choice lands on an ending", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "win", text: "win", nextSceneId: "end", isOptimal: true }],
      }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
    ]);
    const next = applyChoice(sc, initState(sc), "win");

    expect(next.currentSceneId).toBe("end");
    expect(next.outcome).toBe("good");
    // optimal 10 + good ending 50
    expect(next.xpEarned).toBe(60);
    expect(isComplete(next)).toBe(true);
  });

  it("defaults a bonus-less neutral ending to +20 and outcome 'neutral'", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "go", text: "go", nextSceneId: "end" }],
      }),
      scene({ id: "end", isEnding: true }),
    ]);
    const next = applyChoice(sc, initState(sc), "go");
    // unflagged choice 3 + neutral ending 20
    expect(next.xpEarned).toBe(23);
    expect(next.outcome).toBe("neutral");
  });

  it("throws on a choice that does not belong to the current scene", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "real", text: "real", nextSceneId: "rest" }],
      }),
      scene({ id: "rest" }),
    ]);
    expect(() => applyChoice(sc, initState(sc), "fake")).toThrow();
  });

  it("throws when the cursor points at a missing scene", () => {
    const sc = scenario([scene({ id: "s1" })]);
    const state = { ...initState(sc), currentSceneId: "ghost" };
    expect(() => applyChoice(sc, state, "whatever")).toThrow();
  });
});

describe("streakBonusXp", () => {
  it("pays 5 at three, 15 at five, and 30 at seven consecutive optimals", () => {
    const run = (n: number) =>
      streakBonusXp(Array.from({ length: n }, () => rec("s", "c", true)));
    expect(run(2)).toBe(0);
    expect(run(3)).toBe(5);
    expect(run(5)).toBe(15); // 5 + 10
    expect(run(7)).toBe(30); // 5 + 10 + 15
  });

  it("resets the run on a non-optimal choice", () => {
    const choices = [
      rec("s", "a", true),
      rec("s", "b", true),
      rec("s", "c", false), // reset before the 3rd streak point
      rec("s", "d", true),
      rec("s", "e", true),
    ];
    expect(streakBonusXp(choices)).toBe(0);
  });
});

describe("progressDepth / optimalCount", () => {
  it("counts traversed scenes and optimal choices", () => {
    const state: SimulatorState = {
      scenarioId: "x",
      currentSceneId: "s3",
      choicesMade: [rec("s1", "a", true), rec("s2", "b", false)],
      xpEarned: 0,
    };
    expect(progressDepth(state)).toBe(3); // 2 choices + current scene
    expect(optimalCount(state)).toBe(1);
  });
});

describe("replayXp", () => {
  it("drains an auto-advance chain and credits the ending bonus", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "go", text: "go", nextSceneId: "auto1", isOptimal: true }],
      }),
      scene({ id: "auto1", nextSceneId: "auto2" }),
      scene({ id: "auto2", nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
    ]);
    const { xp, finalState } = replayXp(sc, [rec("s1", "go", true)]);

    // optimal choice 10 + good ending 50; streak needs 3, so no bonus
    expect(xp).toBe(60);
    expect(finalState.currentSceneId).toBe("end");
    expect(finalState.outcome).toBe("good");
    expect(isComplete(finalState)).toBe(true);
  });

  it("aborts on a stale sceneId and ignores optimal padding past the abort", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "a", text: "a", nextSceneId: "s2", isOptimal: true }],
      }),
      scene({
        id: "s2",
        choices: [{ id: "b", text: "b", nextSceneId: "s3", isOptimal: true }],
      }),
      scene({ id: "s3" }),
    ]);
    const { xp } = replayXp(sc, [
      rec("s1", "a", true),
      rec("s2", "b", true),
      // sceneId no longer matches where the replay sits -> abort here
      rec("nope", "b", true),
      // padding past the abort must not count toward xp or the streak bonus
      rec("nope", "b", true),
      rec("nope", "b", true),
    ]);

    // Two optimal choices (10 + 10). Only 2 validated, so no streak bonus,
    // and the three padding records are ignored entirely.
    expect(xp).toBe(20);
  });

  it("aborts on an invalid choiceId", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "a", text: "a", nextSceneId: "s2", isOptimal: true }],
      }),
      scene({ id: "s2" }),
    ]);
    const { xp, finalState } = replayXp(sc, [rec("s1", "ghost", true)]);
    // Nothing validated: no xp, cursor never moved off the start.
    expect(xp).toBe(0);
    expect(finalState.currentSceneId).toBe("s1");
  });

  it("adds the streak bonus once three optimal choices validate", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "a", text: "a", nextSceneId: "s2", isOptimal: true }],
      }),
      scene({
        id: "s2",
        choices: [{ id: "b", text: "b", nextSceneId: "s3", isOptimal: true }],
      }),
      scene({
        id: "s3",
        choices: [{ id: "c", text: "c", nextSceneId: "s4", isOptimal: true }],
      }),
      scene({ id: "s4" }),
    ]);
    const { xp } = replayXp(sc, [
      rec("s1", "a", true),
      rec("s2", "b", true),
      rec("s3", "c", true),
    ]);
    // three optimal choices: 30 xp + 5 streak bonus
    expect(xp).toBe(35);
  });
});

describe("replayXpDetailed", () => {
  it("decomposes the auto-advance ending case as choices 10, streak 0, ending 50", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "go", text: "go", nextSceneId: "auto1", isOptimal: true }],
      }),
      scene({ id: "auto1", nextSceneId: "end" }),
      scene({ id: "end", isEnding: true, outcomeType: "good" }),
    ]);
    const d = replayXpDetailed(sc, [rec("s1", "go", true)]);
    expect(d.choiceXp).toBe(10);
    expect(d.streakBonus).toBe(0);
    expect(d.endingBonus).toBe(50);
    expect(d.total).toBe(60);
    expect(d.choiceXp + d.streakBonus + d.endingBonus).toBe(d.total);
  });

  it("decomposes the streak case as choices 30, streak 5, ending 0", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "a", text: "a", nextSceneId: "s2", isOptimal: true }],
      }),
      scene({
        id: "s2",
        choices: [{ id: "b", text: "b", nextSceneId: "s3", isOptimal: true }],
      }),
      scene({
        id: "s3",
        choices: [{ id: "c", text: "c", nextSceneId: "s4", isOptimal: true }],
      }),
      scene({ id: "s4" }),
    ]);
    const d = replayXpDetailed(sc, [
      rec("s1", "a", true),
      rec("s2", "b", true),
      rec("s3", "c", true),
    ]);
    expect(d.choiceXp).toBe(30);
    expect(d.streakBonus).toBe(5);
    expect(d.endingBonus).toBe(0);
    expect(d.total).toBe(35);
  });

  it("matches replayXp's total on every path", () => {
    const sc = scenario([
      scene({
        id: "s1",
        choices: [{ id: "a", text: "a", nextSceneId: "end", isOptimal: false }],
      }),
      scene({ id: "end", isEnding: true, outcomeType: "bad" }),
    ]);
    const record = [rec("s1", "a", false)];
    expect(replayXpDetailed(sc, record).total).toBe(replayXp(sc, record).xp);
  });
});

describe("endingBonusFor", () => {
  it("pays the outcome-rank ladder", () => {
    expect(endingBonusFor("good")).toBe(50);
    expect(endingBonusFor("passed")).toBe(20);
    expect(endingBonusFor("neutral")).toBe(20);
    expect(endingBonusFor("failed")).toBe(10);
    expect(endingBonusFor("bad")).toBe(0);
  });
});
