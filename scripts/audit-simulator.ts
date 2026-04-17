/**
 * Scenario integrity auditor. Runs pure checks — no DB, no runtime.
 *
 *   1. Every scene id is unique within its scenario
 *   2. Every choice.nextSceneId resolves to a real scene
 *   3. Every scene.nextSceneId (auto-advance) resolves to a real scene
 *   4. Every non-ending scene either has choices OR nextSceneId (no dead-ends)
 *   5. The startSceneId exists
 *   6. Every scene is reachable from startSceneId
 *   7. Every reachable path terminates at an ending scene (no infinite loops)
 *   8. All characters referenced by speakerId are declared on the scenario
 *      (except "inner-voice" which is narrator-styled)
 *   9. Every ending has a title + summary (otherwise the ending screen looks broken)
 *
 * Run: `npx ts-node --compiler-options {"module":"CommonJS"} scripts/audit-simulator.ts`
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import type { Scenario } from "../lib/simulator/types";

type Issue = {
  scenario: string;
  level: "error" | "warn";
  message: string;
};

function auditScenario(s: Scenario): Issue[] {
  const issues: Issue[] = [];
  const push = (level: Issue["level"], msg: string) =>
    issues.push({ scenario: s.id, level, message: msg });

  // 1. Unique scene ids
  const seen = new Set<string>();
  for (const scene of s.scenes) {
    if (seen.has(scene.id)) push("error", `Duplicate scene id: ${scene.id}`);
    seen.add(scene.id);
  }

  const sceneById = new Map(s.scenes.map((sc) => [sc.id, sc]));

  // 5. startSceneId exists
  if (!sceneById.has(s.startSceneId)) {
    push("error", `startSceneId "${s.startSceneId}" not found in scenes[]`);
  }

  // 2, 3, 4. Transitions
  for (const scene of s.scenes) {
    if (scene.choices) {
      for (const c of scene.choices) {
        if (!sceneById.has(c.nextSceneId)) {
          push(
            "error",
            `Scene "${scene.id}" choice "${c.id}" targets missing scene "${c.nextSceneId}"`,
          );
        }
      }
    }
    if (scene.nextSceneId && !sceneById.has(scene.nextSceneId)) {
      push(
        "error",
        `Scene "${scene.id}" auto-advance targets missing scene "${scene.nextSceneId}"`,
      );
    }
    // Non-ending dead-end
    if (
      !scene.isEnding &&
      (!scene.choices || scene.choices.length === 0) &&
      !scene.nextSceneId
    ) {
      push(
        "error",
        `Scene "${scene.id}" is not an ending but has no choices and no nextSceneId (dead-end)`,
      );
    }
  }

  // 6. Reachability from startSceneId (BFS)
  const reachable = new Set<string>();
  const queue: string[] = [s.startSceneId];
  while (queue.length) {
    const id = queue.shift()!;
    if (reachable.has(id)) continue;
    reachable.add(id);
    const scene = sceneById.get(id);
    if (!scene) continue;
    if (scene.choices) {
      for (const c of scene.choices) queue.push(c.nextSceneId);
    }
    if (scene.nextSceneId) queue.push(scene.nextSceneId);
  }
  for (const scene of s.scenes) {
    if (!reachable.has(scene.id)) {
      push("warn", `Scene "${scene.id}" unreachable from startSceneId`);
    }
  }

  // 7. Every reachable path terminates at an ending (DFS with cycle detection)
  function canReachEnding(startId: string): boolean {
    const stack: string[] = [startId];
    const visited = new Set<string>();
    while (stack.length) {
      const id = stack.pop()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const scene = sceneById.get(id);
      if (!scene) continue;
      if (scene.isEnding) return true;
      if (scene.choices) for (const c of scene.choices) stack.push(c.nextSceneId);
      if (scene.nextSceneId) stack.push(scene.nextSceneId);
    }
    return false;
  }
  for (const scene of s.scenes) {
    if (!reachable.has(scene.id)) continue;
    if (!scene.isEnding && !canReachEnding(scene.id)) {
      push(
        "error",
        `Scene "${scene.id}" cannot reach any ending (would trap the player)`,
      );
    }
  }

  // 8. Characters referenced by speakerId are declared (or "inner-voice")
  const charIds = new Set(s.characters.map((c) => c.id));
  for (const scene of s.scenes) {
    for (const line of scene.dialog) {
      if (line.speakerId == null) continue;
      if (line.speakerId === "inner-voice") continue;
      if (!charIds.has(line.speakerId)) {
        push(
          "error",
          `Scene "${scene.id}" speaker "${line.speakerId}" not in characters[]`,
        );
      }
    }
  }

  // 9. Endings must have a title + summary
  for (const scene of s.scenes) {
    if (!scene.isEnding) continue;
    if (!scene.endingTitle) push("warn", `Ending "${scene.id}" has no endingTitle`);
    if (!scene.endingSummary)
      push("warn", `Ending "${scene.id}" has no endingSummary`);
  }

  return issues;
}

// Main
const all: Issue[] = [];
for (const s of ALL_SCENARIOS) {
  all.push(...auditScenario(s));
}

const errors = all.filter((i) => i.level === "error");
const warnings = all.filter((i) => i.level === "warn");

console.log(`\nScenarios audited: ${ALL_SCENARIOS.length}`);
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

for (const i of all) {
  const tag = i.level === "error" ? "\x1b[31mERR\x1b[0m " : "\x1b[33mWARN\x1b[0m";
  console.log(`${tag} [${i.scenario}] ${i.message}`);
}

process.exit(errors.length > 0 ? 1 : 0);
