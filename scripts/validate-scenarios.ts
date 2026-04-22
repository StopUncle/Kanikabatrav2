/**
 * Offline validator for all Dark Mirror scenarios.
 * Run via: npx tsx scripts/validate-scenarios.ts
 *
 * Checks for structural bugs that would silently dead-end or crash a player:
 * - startSceneId points at a real scene
 * - every choice.nextSceneId points at a real scene
 * - every scene.nextSceneId (auto-advance) points at a real scene
 * - no scene is non-ending without either choices[] or nextSceneId (soft-lock)
 * - ending scenes don't carry nextSceneId (dead code)
 * - no scene is orphaned (unreachable from startSceneId)
 * - no duplicate scene ids within a scenario
 * - no duplicate choice ids within a scene
 * - no duplicate scenario ids across tracks
 * - at least one reachable ending
 */
import { ALL_SCENARIOS } from "../lib/simulator/scenarios";

let failures = 0;
const warn = (scenarioId: string, msg: string) => {
  failures++;
  console.log(`  ✗ ${scenarioId}: ${msg}`);
};

// Duplicate scenario ids
const seenIds = new Set<string>();
for (const s of ALL_SCENARIOS) {
  if (seenIds.has(s.id)) console.log(`DUPLICATE SCENARIO ID: ${s.id}`);
  seenIds.add(s.id);
}

console.log(`Validating ${ALL_SCENARIOS.length} scenarios...\n`);

for (const scenario of ALL_SCENARIOS) {
  const sceneById = new Map(scenario.scenes.map((s) => [s.id, s]));

  // Duplicate scene ids
  const sceneIds = scenario.scenes.map((s) => s.id);
  const uniqueSceneIds = new Set(sceneIds);
  if (sceneIds.length !== uniqueSceneIds.size) {
    warn(scenario.id, `duplicate scene ids`);
  }

  // startSceneId resolves
  if (!sceneById.has(scenario.startSceneId)) {
    warn(scenario.id, `startSceneId "${scenario.startSceneId}" not found`);
    continue;
  }

  for (const scene of scenario.scenes) {
    // Scene has choices AND nextSceneId → ambiguous
    if (scene.choices?.length && scene.nextSceneId) {
      warn(
        scenario.id,
        `scene "${scene.id}" has BOTH choices[] and nextSceneId (ambiguous)`,
      );
    }
    // Ending with nextSceneId → dead code
    if (scene.isEnding && scene.nextSceneId) {
      warn(
        scenario.id,
        `ending scene "${scene.id}" has nextSceneId (will never fire)`,
      );
    }
    // Ending with choices → confusing
    if (scene.isEnding && scene.choices?.length) {
      warn(
        scenario.id,
        `ending scene "${scene.id}" has choices[] (will never be rendered)`,
      );
    }
    // Non-ending with no way forward → soft-lock
    if (
      !scene.isEnding &&
      !scene.nextSceneId &&
      (!scene.choices || scene.choices.length === 0)
    ) {
      warn(
        scenario.id,
        `scene "${scene.id}" has no choices and no nextSceneId AND is not an ending — SOFT-LOCK`,
      );
    }
    // Choices reference a real scene
    if (scene.choices) {
      const seenChoiceIds = new Set<string>();
      for (const c of scene.choices) {
        if (seenChoiceIds.has(c.id)) {
          warn(
            scenario.id,
            `scene "${scene.id}" has duplicate choice id "${c.id}"`,
          );
        }
        seenChoiceIds.add(c.id);
        if (!sceneById.has(c.nextSceneId)) {
          warn(
            scenario.id,
            `scene "${scene.id}" choice "${c.id}" → missing scene "${c.nextSceneId}"`,
          );
        }
      }
    }
    // nextSceneId resolves
    if (scene.nextSceneId && !sceneById.has(scene.nextSceneId)) {
      warn(
        scenario.id,
        `scene "${scene.id}" nextSceneId → missing "${scene.nextSceneId}"`,
      );
    }
  }

  // Reachability (BFS from startSceneId)
  const reachable = new Set<string>([scenario.startSceneId]);
  const queue: string[] = [scenario.startSceneId];
  while (queue.length) {
    const id = queue.shift()!;
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
    warn(
      scenario.id,
      `${unreachable.length} unreachable scene(s): ${unreachable.map((s) => s.id).join(", ")}`,
    );
  }

  // Ensure at least one ending is reachable
  const reachableEndings = scenario.scenes.filter(
    (s) => s.isEnding && reachable.has(s.id),
  );
  if (reachableEndings.length === 0) {
    warn(scenario.id, `no reachable ending scenes — scenario cannot complete`);
  }
}

console.log(
  `\n${failures === 0 ? "✓ All clear." : `✗ ${failures} issue(s) found`}`,
);
process.exit(failures === 0 ? 0 : 1);
