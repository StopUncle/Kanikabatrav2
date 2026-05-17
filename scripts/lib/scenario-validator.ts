/**
 * Generated-scenario validator. Two layers:
 *
 * 1. Structural lint, in-process. Loads the generated file via dynamic
 *    import, runs the same checks `scripts/validate-scenarios.ts` does
 *    against a single Scenario object. Cheap, runs in ~1s.
 * 2. Full typecheck, by spawning `tsc --noEmit` against the project.
 *    Slow (10 to 30 seconds) but the only way to catch type errors the
 *    Scenario type would flag. Run last, only when structural lint passes.
 *
 * Returns a list of human-readable error messages. Empty list means the
 * file is good to commit (after a human review of the prose).
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type {
  Scenario,
  Scene,
  MoodType,
  OutcomeType,
} from "../../lib/simulator/types";

const VALID_MOODS: MoodType[] = [
  "romantic",
  "danger",
  "party",
  "cold",
  "peaceful",
  "tense",
  "mysterious",
  "professional",
];

const VALID_OUTCOMES: OutcomeType[] = [
  "good",
  "neutral",
  "bad",
  "passed",
  "failed",
];

/**
 * Structural checks on a Scenario object. Mirrors validate-scenarios.ts
 * for a single scenario. Pure: no I/O, easy to unit-test.
 */
export function lintScenario(scenario: Scenario): string[] {
  const errors: string[] = [];
  const sceneById = new Map(scenario.scenes.map((s) => [s.id, s]));
  const characterById = new Map(scenario.characters.map((c) => [c.id, c]));

  if (sceneById.size !== scenario.scenes.length) {
    errors.push("duplicate scene ids");
  }
  if (characterById.size !== scenario.characters.length) {
    errors.push("duplicate character ids");
  }

  if (!sceneById.has(scenario.startSceneId)) {
    errors.push(`startSceneId "${scenario.startSceneId}" not found`);
  }
  const startScene = sceneById.get(scenario.startSceneId);
  if (startScene?.isEnding) {
    errors.push(`startSceneId "${scenario.startSceneId}" is an ending scene`);
  }

  for (const scene of scenario.scenes) {
    errors.push(...lintScene(scene, sceneById, characterById));
  }

  // Reachability + ensure at least one reachable ending.
  const reachable = new Set<string>([scenario.startSceneId]);
  const queue: string[] = [scenario.startSceneId];
  while (queue.length) {
    const id = queue.shift()!;
    const scene = sceneById.get(id);
    if (!scene) continue;
    const nexts = [
      scene.nextSceneId,
      ...(scene.choices?.map((c) => c.nextSceneId) ?? []),
    ].filter((x): x is string => !!x);
    for (const n of nexts) {
      if (!reachable.has(n)) {
        reachable.add(n);
        queue.push(n);
      }
    }
  }
  const unreachable = scenario.scenes.filter((s) => !reachable.has(s.id));
  if (unreachable.length > 0) {
    errors.push(
      `unreachable scenes: ${unreachable.map((s) => s.id).join(", ")}`,
    );
  }
  const reachableEndings = scenario.scenes.filter(
    (s) => s.isEnding && reachable.has(s.id),
  );
  if (reachableEndings.length === 0) {
    errors.push("no reachable ending scenes; the scenario cannot complete");
  }

  return errors;
}

function lintScene(
  scene: Scene,
  sceneById: Map<string, Scene>,
  characterById: Map<string, { id: string }>,
): string[] {
  const errors: string[] = [];

  if (scene.choices?.length && scene.nextSceneId) {
    errors.push(`scene "${scene.id}": both choices[] and nextSceneId`);
  }
  if (scene.isEnding && scene.nextSceneId) {
    errors.push(`ending scene "${scene.id}" has nextSceneId`);
  }
  if (scene.isEnding && scene.choices?.length) {
    errors.push(`ending scene "${scene.id}" has choices[]`);
  }
  if (
    !scene.isEnding &&
    !scene.nextSceneId &&
    (!scene.choices || scene.choices.length === 0)
  ) {
    errors.push(`scene "${scene.id}" soft-locks (no choices, no nextSceneId)`);
  }
  if (scene.isEnding && !scene.outcomeType) {
    errors.push(`ending scene "${scene.id}" missing outcomeType`);
  }
  if (scene.isEnding && !scene.endingTitle) {
    errors.push(`ending scene "${scene.id}" missing endingTitle`);
  }
  if (scene.isEnding && !scene.endingSummary) {
    errors.push(`ending scene "${scene.id}" missing endingSummary`);
  }
  if (scene.outcomeType && !VALID_OUTCOMES.includes(scene.outcomeType)) {
    errors.push(
      `scene "${scene.id}" invalid outcomeType "${scene.outcomeType}"`,
    );
  }
  if (scene.mood && !VALID_MOODS.includes(scene.mood)) {
    errors.push(`scene "${scene.id}" invalid mood "${scene.mood}"`);
  }

  if (scene.nextSceneId) {
    if (!sceneById.has(scene.nextSceneId)) {
      errors.push(
        `scene "${scene.id}" nextSceneId points at missing scene "${scene.nextSceneId}"`,
      );
    }
    if (scene.nextSceneId === scene.id) {
      errors.push(`scene "${scene.id}" nextSceneId is a self-loop`);
    }
  }

  if (scene.choices) {
    const seen = new Set<string>();
    for (const c of scene.choices) {
      if (seen.has(c.id)) {
        errors.push(`scene "${scene.id}" duplicate choice id "${c.id}"`);
      }
      seen.add(c.id);
      if (!sceneById.has(c.nextSceneId)) {
        errors.push(
          `scene "${scene.id}" choice "${c.id}" points at missing scene "${c.nextSceneId}"`,
        );
      }
      if (c.nextSceneId === scene.id) {
        errors.push(
          `scene "${scene.id}" choice "${c.id}" loops back to same scene`,
        );
      }
    }
  }

  for (const line of scene.dialog ?? []) {
    if (
      line.speakerId &&
      line.speakerId !== "inner-voice" &&
      !characterById.has(line.speakerId)
    ) {
      errors.push(
        `scene "${scene.id}" dialog speakerId "${line.speakerId}" not in characters[]`,
      );
    }
  }

  return errors;
}

/**
 * Load the generated file and lint it. Returns the errors plus the
 * scenario object so the caller can show stats (scene count, ending
 * count) alongside the result.
 */
export async function lintGeneratedFile(
  filePath: string,
): Promise<{ scenario: Scenario | null; errors: string[] }> {
  let mod: { default?: unknown };
  try {
    // pathToFileURL is the cross-platform safe way to feed an absolute
    // path into a dynamic import. On Windows a bare `C:\...` path is
    // misinterpreted as a bare specifier and fails with ERR_INVALID_URL.
    const url = pathToFileURL(path.resolve(filePath)).href;
    mod = (await import(url)) as { default?: unknown };
  } catch (err) {
    return {
      scenario: null,
      errors: [`failed to import generated file: ${(err as Error).message}`],
    };
  }
  const scenario = mod.default as Scenario | undefined;
  if (!scenario || typeof scenario !== "object") {
    return {
      scenario: null,
      errors: ["generated file has no default export, or the export is not an object"],
    };
  }
  return { scenario, errors: lintScenario(scenario) };
}

/**
 * Run the project's typechecker as a subprocess. Slow, but the only
 * way to verify a generated file satisfies the Scenario type.
 */
export function runTypecheck(projectRoot: string): {
  ok: boolean;
  output: string;
} {
  const result = spawnSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "type-check"],
    { cwd: projectRoot, encoding: "utf8" },
  );
  return {
    ok: result.status === 0,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim(),
  };
}
