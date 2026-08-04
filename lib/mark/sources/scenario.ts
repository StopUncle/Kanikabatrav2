import type { ChoiceRecord, Scenario } from "@/lib/simulator/types";
import type { EncounterInput } from "../encounters";
import type { Operator, Tactic } from "../taxonomy";
import {
  GAUNTLET_WEIGHT_MULTIPLIER,
  SCENARIO_DIFFICULTY_WEIGHT,
} from "../weights";

/**
 * Simulator runs as Mark evidence.
 *
 * Scenario choices carry no machine-readable tactic tag (the `tactic`
 * field on a choice is prose feedback), so a run cannot honestly claim
 * "this member missed gaslighting". What a scenario does know is who was
 * being played: the category and the cast's personality types. So runs
 * feed the operator ledger, with the tactic cell only where the category
 * itself names one. Untaggable scenarios write nothing; the honesty rule
 * prefers silence to invention.
 */

const CATEGORY_TACTIC: Partial<Record<Scenario["category"], Tactic>> = {
  gaslighter: "GASLIGHTING",
};

const CATEGORY_OPERATOR: Partial<Record<Scenario["category"], Operator>> = {
  narcissist: "NARCISSIST",
  avoidant: "AVOIDANT",
};

/**
 * Character personalityType values that map cleanly onto the operator
 * taxonomy. Free-form types (friend, mentor, ally, child, hoover) stay
 * unmapped: an operator row must name the antagonist, not the cast.
 */
const PERSONALITY_OPERATOR: Record<string, Operator> = {
  narcissist: "NARCISSIST",
  "workplace-narcissist": "NARCISSIST",
  "narc-parent": "NARCISSIST",
  "covert-narcissist": "COVERT_NARCISSIST",
  borderline: "BORDERLINE",
  histrionic: "HISTRIONIC",
  psychopath: "PSYCHOPATH",
  "factor-1": "PSYCHOPATH",
  avoidant: "AVOIDANT",
  "avoidant-organised": "AVOIDANT",
};

export interface ScenarioMarkCell {
  tactic: Tactic | null;
  operatorType: Operator | null;
}

/**
 * Which ledger cell this scenario's evidence lands in, or null when the
 * scenario has nothing the taxonomy can honestly claim. The cast wins
 * over the category when exactly one mappable antagonist type appears;
 * two different mappable types make the attribution ambiguous, so the
 * operator stays null rather than guessing.
 */
export function resolveScenarioMarkCell(
  scenario: Scenario,
): ScenarioMarkCell | null {
  const castOperators = new Set<Operator>();
  for (const character of scenario.characters) {
    const mapped = PERSONALITY_OPERATOR[character.personalityType ?? ""];
    if (mapped) castOperators.add(mapped);
  }

  let operatorType: Operator | null = null;
  if (castOperators.size === 1) {
    operatorType = castOperators.values().next().value ?? null;
  } else if (castOperators.size === 0) {
    operatorType = CATEGORY_OPERATOR[scenario.category] ?? null;
  }

  const tactic = CATEGORY_TACTIC[scenario.category] ?? null;

  if (!tactic && !operatorType) return null;
  return { tactic, operatorType };
}

/**
 * One encounter per answered choice point that the author graded (the
 * scene offers an isOptimal:true option). Correctness is re-derived from
 * the scenario definition, never taken from the client's wasOptimal.
 * sourceId is scenarioId:sceneId so a replay of the same branch dedupes
 * while a new branch still writes its never-faced choice points.
 */
export function encountersFromScenarioRun(
  scenario: Scenario,
  choicesMade: ChoiceRecord[],
  opts?: { gauntlet?: boolean },
): EncounterInput[] {
  const cell = resolveScenarioMarkCell(scenario);
  if (!cell) return [];

  const weight =
    SCENARIO_DIFFICULTY_WEIGHT[scenario.difficulty] *
    (opts?.gauntlet ? GAUNTLET_WEIGHT_MULTIPLIER : 1);

  const sceneById = new Map(scenario.scenes.map((s) => [s.id, s]));
  const seenScenes = new Set<string>();
  const out: EncounterInput[] = [];

  for (const record of choicesMade) {
    if (seenScenes.has(record.sceneId)) continue;
    const scene = sceneById.get(record.sceneId);
    if (!scene?.choices || scene.choices.length === 0) continue;
    const graded = scene.choices.some((c) => c.isOptimal === true);
    if (!graded) continue;
    const chosen = scene.choices.find((c) => c.id === record.choiceId);
    if (!chosen) continue;

    seenScenes.add(record.sceneId);
    out.push({
      tactic: cell.tactic,
      operatorType: cell.operatorType,
      correct: chosen.isOptimal === true,
      sourceId: `${scenario.id}:${record.sceneId}`,
      weight,
    });
  }

  return out;
}
