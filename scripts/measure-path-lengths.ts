/**
 * For every scenario, compute:
 *   - total scene count
 *   - shortest path from startSceneId to any ending
 *   - longest path (cycle-safe — scenarios are DAGs in practice)
 *   - median path length via BFS enumeration (capped)
 *   - total dialog line count across all scenes
 * Prints a table so we can see which scenarios are genuinely thin.
 */
import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import type { Scene } from "../lib/simulator/types";

function successors(scene: Scene): string[] {
  if (scene.isEnding) return [];
  if (scene.choices && scene.choices.length > 0) {
    return scene.choices.map((c) => c.nextSceneId);
  }
  if (scene.nextSceneId) return [scene.nextSceneId];
  return [];
}

function analyze(scenarioId: string, scenes: Scene[], startId: string) {
  const byId = new Map(scenes.map((s) => [s.id, s]));
  const endings = new Set(scenes.filter((s) => s.isEnding).map((s) => s.id));

  // BFS from start, tracking path length to each node.
  const shortest: Record<string, number> = { [startId]: 1 };
  const queue: string[] = [startId];
  while (queue.length) {
    const id = queue.shift();
    if (!id) continue;
    const scene = byId.get(id);
    if (!scene) continue;
    for (const next of successors(scene)) {
      if (shortest[next] === undefined) {
        shortest[next] = shortest[id] + 1;
        queue.push(next);
      }
    }
  }

  const endingDepths = Array.from(endings)
    .filter((id) => shortest[id] !== undefined)
    .map((id) => shortest[id]);

  // Enumerate paths (capped) to get a distribution of path lengths.
  const pathLengths: number[] = [];
  const LIMIT = 5000;
  function dfs(id: string, depth: number, visited: Set<string>) {
    if (pathLengths.length >= LIMIT) return;
    if (visited.has(id)) return; // cycle guard
    visited.add(id);
    const scene = byId.get(id);
    if (!scene) return;
    if (scene.isEnding) {
      pathLengths.push(depth);
      visited.delete(id);
      return;
    }
    const next = successors(scene);
    if (next.length === 0) {
      pathLengths.push(depth); // dead-end (non-ending leaf)
    } else {
      for (const n of next) dfs(n, depth + 1, visited);
    }
    visited.delete(id);
  }
  dfs(startId, 1, new Set());

  const totalDialog = scenes.reduce((acc, s) => acc + (s.dialog?.length ?? 0), 0);

  const min = endingDepths.length ? Math.min(...endingDepths) : 0;
  const max = pathLengths.length ? Math.max(...pathLengths) : 0;
  const sorted = [...pathLengths].sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;

  return {
    scenarioId,
    scenes: scenes.length,
    endings: endings.size,
    totalDialog,
    shortestToEnding: min,
    longestPath: max,
    medianPath: median,
    pathsSampled: pathLengths.length,
  };
}

const rows = ALL_SCENARIOS.map((s) =>
  analyze(s.id, s.scenes, s.startSceneId),
);

const fmt = (n: number | string) => String(n).padStart(6);

console.log(
  [
    "scenarioId".padEnd(26),
    "scenes".padStart(6),
    "endngs".padStart(6),
    "diaLns".padStart(6),
    "minP".padStart(6),
    "medP".padStart(6),
    "maxP".padStart(6),
  ].join(" "),
);
console.log("-".repeat(72));

for (const r of rows) {
  console.log(
    [
      r.scenarioId.padEnd(26),
      fmt(r.scenes),
      fmt(r.endings),
      fmt(r.totalDialog),
      fmt(r.shortestToEnding),
      fmt(r.medianPath),
      fmt(r.longestPath),
    ].join(" "),
  );
}

console.log("");
console.log("minP = shortest path from start to any ending (in scenes)");
console.log("medP = median path length across sampled runs");
console.log("maxP = longest path length across sampled runs");
