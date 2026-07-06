/**
 * Source of truth for structural scenario checks.
 *
 * Runs the full graph walk on an already-shape-valid Scenario and returns
 * every issue found, in a stable order, each tagged with a stable code and
 * a default severity. Consumers decide what to do with each finding:
 *
 * - scripts/validate-scenarios.ts prints errors and warnings over the
 *   static registry (warnings do not fail the build).
 * - lib/simulator/generated.ts gates AI-generated scenarios before publish
 *   and treats structural issues as fatal.
 *
 * Shape and type validation (Zod) and content rules (the em-dash ban,
 * ending copy, minimum ending count) are consumer concerns and live in the
 * consumers, not here. This module only knows the graph.
 */

import type { Scenario } from "./types";

export type IssueSeverity = "error" | "warning";

export type IssueCode =
  | "duplicate-scene-id"
  | "duplicate-character-id"
  | "start-scene-missing"
  | "start-scene-is-ending"
  | "scene-ambiguous"
  | "ending-has-next-scene"
  | "ending-has-choices"
  | "soft-lock"
  | "duplicate-choice-id"
  | "choice-next-missing"
  | "scene-next-missing"
  | "scene-self-loop"
  | "choice-self-loop"
  | "invalid-mood"
  | "speaker-missing"
  | "present-character-missing"
  | "unreachable-scenes"
  | "no-reachable-ending"
  | "ending-missing-outcome-type"
  | "choice-missing-is-optimal"
  | "empty-non-ending-scene";

export interface ScenarioIssue {
  code: IssueCode;
  severity: IssueSeverity;
  message: string;
}

const VALID_MOODS: ReadonlySet<string> = new Set([
  "romantic",
  "danger",
  "party",
  "cold",
  "peaceful",
  "tense",
  "mysterious",
  "professional",
]);

/**
 * Codes that are advisory rather than structural. Everything else defaults
 * to "error". A missing outcomeType only downgrades a run to a neutral
 * ending, and an unset isOptimal is sometimes intentional on neutral
 * choices. Neither breaks the graph, so the build script surfaces them as
 * warnings.
 */
const WARNING_CODES: ReadonlySet<IssueCode> = new Set<IssueCode>([
  "ending-missing-outcome-type",
  "choice-missing-is-optimal",
]);

function severityFor(code: IssueCode): IssueSeverity {
  return WARNING_CODES.has(code) ? "warning" : "error";
}

export function collectScenarioIssues(scenario: Scenario): ScenarioIssue[] {
  const issues: ScenarioIssue[] = [];
  const add = (code: IssueCode, message: string) => {
    issues.push({ code, severity: severityFor(code), message });
  };

  const sceneById = new Map(scenario.scenes.map((s) => [s.id, s]));
  const characterById = new Map(scenario.characters.map((c) => [c.id, c]));

  const sceneIds = scenario.scenes.map((s) => s.id);
  if (sceneIds.length !== new Set(sceneIds).size) {
    add("duplicate-scene-id", "duplicate scene ids");
  }

  const charIds = scenario.characters.map((c) => c.id);
  if (charIds.length !== new Set(charIds).size) {
    add("duplicate-character-id", "duplicate character ids");
  }

  // startSceneId must resolve. If it doesn't the rest of the walk would
  // cascade on a broken root, so stop after reporting it.
  if (!sceneById.has(scenario.startSceneId)) {
    add(
      "start-scene-missing",
      `startSceneId "${scenario.startSceneId}" not found`,
    );
    return issues;
  }

  const startScene = sceneById.get(scenario.startSceneId);
  if (startScene?.isEnding) {
    add(
      "start-scene-is-ending",
      `startSceneId "${scenario.startSceneId}" is an ending scene (player starts on loss screen)`,
    );
  }

  for (const scene of scenario.scenes) {
    if (scene.choices?.length && scene.nextSceneId) {
      add(
        "scene-ambiguous",
        `scene "${scene.id}" has BOTH choices[] and nextSceneId (ambiguous)`,
      );
    }
    if (scene.isEnding && scene.nextSceneId) {
      add(
        "ending-has-next-scene",
        `ending scene "${scene.id}" has nextSceneId (will never fire)`,
      );
    }
    if (scene.isEnding && scene.choices?.length) {
      add(
        "ending-has-choices",
        `ending scene "${scene.id}" has choices[] (will never be rendered)`,
      );
    }
    if (
      !scene.isEnding &&
      !scene.nextSceneId &&
      (!scene.choices || scene.choices.length === 0)
    ) {
      add(
        "soft-lock",
        `scene "${scene.id}" has no choices and no nextSceneId AND is not an ending: SOFT-LOCK`,
      );
    }

    if (scene.choices) {
      const seenChoiceIds = new Set<string>();
      for (const c of scene.choices) {
        if (seenChoiceIds.has(c.id)) {
          add(
            "duplicate-choice-id",
            `scene "${scene.id}" has duplicate choice id "${c.id}"`,
          );
        }
        seenChoiceIds.add(c.id);
        if (!sceneById.has(c.nextSceneId)) {
          add(
            "choice-next-missing",
            `scene "${scene.id}" choice "${c.id}" -> missing scene "${c.nextSceneId}"`,
          );
        }
      }
    }

    if (scene.nextSceneId && !sceneById.has(scene.nextSceneId)) {
      add(
        "scene-next-missing",
        `scene "${scene.id}" nextSceneId -> missing "${scene.nextSceneId}"`,
      );
    }

    if (scene.nextSceneId === scene.id) {
      add(
        "scene-self-loop",
        `scene "${scene.id}" nextSceneId points at itself`,
      );
    }
    if (scene.choices) {
      for (const c of scene.choices) {
        if (c.nextSceneId === scene.id) {
          add(
            "choice-self-loop",
            `scene "${scene.id}" choice "${c.id}" loops back to same scene`,
          );
        }
      }
    }

    if (scene.mood && !VALID_MOODS.has(scene.mood)) {
      add(
        "invalid-mood",
        `scene "${scene.id}" has invalid mood "${scene.mood}" (not in MoodType union)`,
      );
    }

    if (scene.isEnding && !scene.outcomeType) {
      add(
        "ending-missing-outcome-type",
        `ending scene "${scene.id}" has no outcomeType (will default to "neutral")`,
      );
    }

    for (const line of scene.dialog ?? []) {
      if (
        line.speakerId &&
        line.speakerId !== "inner-voice" &&
        !characterById.has(line.speakerId)
      ) {
        add(
          "speaker-missing",
          `scene "${scene.id}" dialog line speakerId "${line.speakerId}" not found in characters[]`,
        );
      }
    }

    for (const cid of scene.presentCharacterIds ?? []) {
      if (cid !== "inner-voice" && !characterById.has(cid)) {
        add(
          "present-character-missing",
          `scene "${scene.id}" presentCharacterIds "${cid}" not found in characters[]`,
        );
      }
    }

    if (scene.choices) {
      for (const c of scene.choices) {
        if (c.isOptimal === undefined) {
          add(
            "choice-missing-is-optimal",
            `scene "${scene.id}" choice "${c.id}" has no isOptimal (will default to middle-tier XP)`,
          );
        }
      }
    }

    // A non-ending scene with neither dialog nor choices renders nothing
    // the player can read or tap. If it carries a nextSceneId the runner
    // may still stall on the empty beat; if it does not, it is also a
    // soft-lock. Either way there is nothing to present, so this is an
    // error, not a cosmetic warning.
    if (
      !scene.isEnding &&
      (!scene.dialog || scene.dialog.length === 0) &&
      (!scene.choices || scene.choices.length === 0)
    ) {
      add(
        "empty-non-ending-scene",
        `scene "${scene.id}" is not an ending but has no dialog and no choices (renders nothing tappable, can soft-lock the run)`,
      );
    }
  }

  // Reachability (BFS from startSceneId).
  const reachable = new Set<string>([scenario.startSceneId]);
  const queue: string[] = [scenario.startSceneId];
  while (queue.length) {
    const id = queue.shift() as string;
    const scene = sceneById.get(id);
    if (!scene) continue;
    const nextIds = [
      scene.nextSceneId,
      ...(scene.choices?.map((c) => c.nextSceneId) ?? []),
    ].filter((x): x is string => !!x);
    for (const n of nextIds) {
      if (!reachable.has(n)) {
        reachable.add(n);
        queue.push(n);
      }
    }
  }
  const unreachable = scenario.scenes.filter((s) => !reachable.has(s.id));
  if (unreachable.length > 0) {
    add(
      "unreachable-scenes",
      `${unreachable.length} unreachable scene(s): ${unreachable
        .map((s) => s.id)
        .join(", ")}`,
    );
  }

  const reachableEndings = scenario.scenes.filter(
    (s) => s.isEnding && reachable.has(s.id),
  );
  if (reachableEndings.length === 0) {
    add(
      "no-reachable-ending",
      "no reachable ending scenes (scenario cannot complete)",
    );
  }

  return issues;
}
