/**
 * Scenario data auditor. Run by the build pipeline so structural bugs
 * fail the build instead of leaking to prod.
 *
 * Two classes of finding:
 *   - ERRORS  (exit 1): missing startSceneId, dangling nextSceneId,
 *     start scene marked isEnding. These are real data bugs.
 *   - WARNINGS (exit 0): scenarios where the very first click can
 *     reach an ending. Often intentional (a "fast-exit" choice that
 *     teaches the player not to take the bait), but worth surfacing
 *     during review so designers can decide.
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";

let errors = 0;
let warnings = 0;

for (const sc of ALL_SCENARIOS) {
  const sceneById = new Map(sc.scenes.map((s) => [s.id, s]));
  const start = sceneById.get(sc.startSceneId);
  if (!start) {
    console.log(
      `[ERROR] [${sc.id}] BAD startSceneId "${sc.startSceneId}" — no such scene`,
    );
    errors++;
    continue;
  }

  if (start.isEnding) {
    console.log(
      `[ERROR] [${sc.id}] start scene "${sc.startSceneId}" is marked isEnding`,
    );
    errors++;
  }

  // Walk every reachable scene, breadth-first.
  const visited = new Set<string>();
  const queue: Array<{ id: string; depth: number }> = [
    { id: sc.startSceneId, depth: 0 },
  ];
  while (queue.length) {
    const { id, depth } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);

    const scene = sceneById.get(id);
    if (!scene) continue;

    if (scene.isEnding && depth > 0 && depth < 2) {
      console.log(
        `[warn]  [${sc.id}] one-click ending — "${id}" reachable in 1 hop from start`,
      );
      warnings++;
    }

    if (scene.choices) {
      for (const c of scene.choices) {
        if (!c.nextSceneId) {
          console.log(
            `[ERROR] [${sc.id}] choice "${c.id}" on scene "${id}" missing nextSceneId`,
          );
          errors++;
          continue;
        }
        if (!sceneById.has(c.nextSceneId)) {
          console.log(
            `[ERROR] [${sc.id}] choice "${c.id}" on scene "${id}" → dangling "${c.nextSceneId}"`,
          );
          errors++;
          continue;
        }
        queue.push({ id: c.nextSceneId, depth: depth + 1 });
      }
    } else if (scene.nextSceneId) {
      if (!sceneById.has(scene.nextSceneId)) {
        console.log(
          `[ERROR] [${sc.id}] scene "${id}" → dangling "${scene.nextSceneId}"`,
        );
        errors++;
      } else {
        queue.push({ id: scene.nextSceneId, depth: depth + 1 });
      }
    }
  }
}

console.log(
  `\nScenario audit: ${errors} error(s), ${warnings} one-click-ending warning(s).`,
);

if (errors > 0) {
  console.error(
    "Build blocked: fix the dangling/missing scene references above.",
  );
  process.exit(1);
}
