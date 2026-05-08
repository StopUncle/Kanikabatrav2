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
  // Belt-and-braces self-loop guard. The build-time validator
  // (scripts/validate-scenarios.ts) catches `nextSceneId === id`, but a
  // future content edit that bypasses CI must not oscillate forever
  // through the runner's useEffect → autoAdvance → setState loop.
  if (scene.nextSceneId === scene.id) return state;

  // If the next scene is an ending, finalize directly. finalizeEnding
  // stamps currentSceneId itself so the caller can hand over bare state
  // and never forget to advance the cursor. The previous bug Sten hit
  // (board-escalation auto-advance loop) was exactly this missing step.
  const nextScene = scenario.scenes.find((s) => s.id === scene.nextSceneId);
  if (nextScene?.isEnding) {
    return finalizeEnding(nextScene, state);
  }

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

/**
 * Mark an ending scene as terminal and stamp outcome + XP bonus.
 *
 * Always sets `currentSceneId = scene.id` so callers can hand over
 * pre-advance state without remembering to bump the cursor themselves.
 * The bug that stuck Sten on b2-credit-thief was an autoAdvance branch
 * passing bare `state` (cursor still on the auto-advance scene) into
 * finalizeEnding — the run was marked complete server-side but the UI
 * kept rendering the prior scene because scene.isEnding never became
 * true at the renderer's gate. This invariant rules that class of bug
 * out at the engine level.
 */
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
    currentSceneId: scene.id,
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

/**
 * Streak-bonus XP accrued across a run. Matches the client-side
 * rule in SimulatorRunner: 3 consecutive optimal choices grants +5,
 * 5 grants +10, 7 grants +15. Non-optimal choice resets the counter.
 *
 * Kept here so the server can replay the same logic from `choicesMade`
 * alone — no client trust required. Called by `replayXp` below.
 */
export function streakBonusXp(choicesMade: ChoiceRecord[]): number {
  let bonus = 0;
  let run = 0;
  for (const c of choicesMade) {
    if (c.wasOptimal) {
      run += 1;
      if (run === 3) bonus += 5;
      else if (run === 5) bonus += 10;
      else if (run === 7) bonus += 15;
    } else {
      run = 0;
    }
  }
  return bonus;
}

/**
 * Server-side XP replay.
 *
 * Given a scenario and a list of choices the client claims were made,
 * re-run them through `applyChoice` and return the authoritative XP
 * the run actually earns. Any choice the client "made" that doesn't
 * exist on the scene it claims (choiceId invalid, or sceneId drift
 * from the prior choice's nextSceneId) aborts the replay — the
 * partial XP up to that point is returned rather than throwing, so
 * a slightly-malformed client doesn't lose ALL XP.
 *
 * Includes streak bonuses. Ending XP bonuses (finalizeEnding) are
 * applied when the replay naturally lands on an ending scene.
 *
 * Does NOT depend on the client's reported `xpEarned` — that value
 * is advisory only and may be clipped server-side to `replayXp(...)`
 * to prevent leaderboard inflation.
 */
export function replayXp(
  scenario: Scenario,
  choicesMade: ChoiceRecord[],
): { xp: number; endedAt: SimulatorState } {
  let state = initState(scenario);
  const validated: ChoiceRecord[] = [];
  for (const record of choicesMade) {
    const scene = currentScene(scenario, state);
    if (!scene) break;
    // The record.sceneId must match where the replay currently sits,
    // otherwise the client's choice log is out of sync with the engine.
    if (scene.id !== record.sceneId) break;
    const choice = scene.choices?.find((c) => c.id === record.choiceId);
    if (!choice) break;
    state = applyChoice(scenario, state, choice.id);
    validated.push(record);
  }
  // Drain any auto-advance chain so the final state reflects ending XP
  // when the last validated choice landed on a non-choice scene that
  // routes (directly or via a chain) to an ending. Without this, every
  // scenario that ends via auto-advance under-counts authoritative XP
  // and /complete clamps the player to the lower server number.
  // Cycle-safe via the iteration cap; autoAdvance returns the same
  // reference when it cannot advance further.
  for (let i = 0; i <= scenario.scenes.length; i++) {
    if (isComplete(state)) break;
    const next = autoAdvance(scenario, state);
    if (next === state) break;
    state = next;
  }
  // Streak bonus is computed over validated records only. Padding the
  // input with bogus optimal records past an abort point cannot inflate
  // the bonus.
  return { xp: state.xpEarned + streakBonusXp(validated), endedAt: state };
}
