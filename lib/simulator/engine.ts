/**
 * Simulator engine — pure state-transition functions.
 *
 * Kept framework-agnostic on purpose: no React, no DOM, no Prisma. That way
 * (a) tests are trivial, (b) we can run the same engine in a Node API route
 * to validate server-authoritative transitions when a user submits a choice.
 *
 * The engine is STATELESS — all state lives in `SimulatorState` and the
 * caller owns persistence.
 */

import type {
  Scenario,
  Scene,
  Choice,
  SimulatorState,
  ChoiceRecord,
  OutcomeType,
} from "./types";

/** Returns the scene a state is currently pointing at, or null if missing. */
export function currentScene(
  scenario: Scenario,
  state: SimulatorState,
): Scene | null {
  return scenario.scenes.find((s) => s.id === state.currentSceneId) ?? null;
}

/** Fresh state at the start of a scenario. */
export function initState(scenario: Scenario): SimulatorState {
  return {
    scenarioId: scenario.id,
    currentSceneId: scenario.startSceneId,
    choicesMade: [],
    xpEarned: 0,
  };
}

/**
 * Advance past an auto-advance scene (no choices, has nextSceneId).
 * Returns updated state. If the current scene requires a choice or is an
 * ending, returns the state unchanged.
 */
export function autoAdvance(
  scenario: Scenario,
  state: SimulatorState,
): SimulatorState {
  const scene = currentScene(scenario, state);
  if (!scene) return state;
  if (scene.isEnding) return finalizeEnding(scene, state);
  if (scene.choices && scene.choices.length > 0) return state;
  if (!scene.nextSceneId) return state;

  return {
    ...state,
    currentSceneId: scene.nextSceneId,
  };
}

/**
 * Apply a player choice. Returns new state pointing at the next scene +
 * records the choice. If the resulting scene is an ending, finalizes
 * outcome + XP.
 *
 * Throws if the choice doesn't belong to the current scene — guards against
 * a stale client POSTing an outdated choice id.
 */
export function applyChoice(
  scenario: Scenario,
  state: SimulatorState,
  choiceId: string,
): SimulatorState {
  const scene = currentScene(scenario, state);
  if (!scene) throw new Error(`Unknown scene: ${state.currentSceneId}`);

  const choice = scene.choices?.find((c) => c.id === choiceId);
  if (!choice) {
    throw new Error(
      `Choice "${choiceId}" not available on scene "${scene.id}"`,
    );
  }

  const record: ChoiceRecord = {
    sceneId: scene.id,
    choiceId: choice.id,
    wasOptimal: choice.isOptimal === true,
    timestamp: new Date().toISOString(),
  };

  const xpDelta = xpForChoice(choice);

  const nextState: SimulatorState = {
    ...state,
    currentSceneId: choice.nextSceneId,
    choicesMade: [...state.choicesMade, record],
    xpEarned: state.xpEarned + xpDelta,
  };

  // If the next scene is an ending, finalize outcome + ending XP.
  const nextScene = scenario.scenes.find((s) => s.id === choice.nextSceneId);
  if (nextScene?.isEnding) {
    return finalizeEnding(nextScene, nextState);
  }
  return nextState;
}

/** XP earned for making a given choice (optimal > neutral > bad). */
function xpForChoice(choice: Choice): number {
  const base = choice.xpBonus ?? 0;
  if (choice.isOptimal === true) return base + 10;
  if (choice.isOptimal === false) return base; // explicit non-optimal
  return base + 3; // neither flagged — mid-tier credit
}

/** Mark an ending scene as terminal and stamp the outcome + XP bonus. */
function finalizeEnding(scene: Scene, state: SimulatorState): SimulatorState {
  const outcome: OutcomeType = scene.outcomeType ?? "neutral";
  const endingBonus =
    outcome === "good"
      ? 50
      : outcome === "neutral" || outcome === "passed"
        ? 20
        : 0;

  return {
    ...state,
    outcome,
    xpEarned: state.xpEarned + endingBonus,
    endedAt: new Date().toISOString(),
  };
}

/** Convenience — did the player hit an ending scene? */
export function isComplete(state: SimulatorState): boolean {
  return !!state.outcome && !!state.endedAt;
}

/** How many scenes the player traversed (including the current one). */
export function progressDepth(state: SimulatorState): number {
  return state.choicesMade.length + 1;
}

/** Count of choices flagged optimal. Used for mastery grading. */
export function optimalCount(state: SimulatorState): number {
  return state.choicesMade.filter((c) => c.wasOptimal).length;
}
