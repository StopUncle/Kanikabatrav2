/**
 * Measures actual scenario length: scenes per path, dialog lines,
 * average click count from start to each ending. Reveals which
 * scenarios are anaemic ("3 clicks to done") vs which feel meaty.
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";

function pathsToEndings(scenarioId: string) {
  const sc = ALL_SCENARIOS.find((s) => s.id === scenarioId);
  if (!sc) return [];
  const sceneById = new Map(sc.scenes.map((s) => [s.id, s]));
  const paths: Array<{
    endingId: string;
    outcome: string;
    sceneCount: number;
    clickCount: number;
    dialogLines: number;
  }> = [];

  // BFS, tracking every distinct path. Cap depth to prevent infinite
  // loops (no scenario should be > 30 deep).
  type Frame = {
    sceneId: string;
    depth: number;
    clicks: number;
    lines: number;
    visited: Set<string>;
  };
  const queue: Frame[] = [
    {
      sceneId: sc.startSceneId,
      depth: 1,
      clicks: 0,
      lines: 0,
      visited: new Set([sc.startSceneId]),
    },
  ];

  while (queue.length) {
    const f = queue.shift()!;
    const scene = sceneById.get(f.sceneId);
    if (!scene) continue;
    const lines = f.lines + (scene.dialog?.length ?? 0);
    if (scene.isEnding) {
      paths.push({
        endingId: scene.id,
        outcome: scene.outcomeType ?? "neutral",
        sceneCount: f.depth,
        clickCount: f.clicks,
        dialogLines: lines,
      });
      continue;
    }
    if (f.depth > 30) continue;

    if (scene.choices && scene.choices.length > 0) {
      for (const c of scene.choices) {
        if (f.visited.has(c.nextSceneId)) continue;
        queue.push({
          sceneId: c.nextSceneId,
          depth: f.depth + 1,
          clicks: f.clicks + 1,
          lines,
          visited: new Set(Array.from(f.visited).concat(c.nextSceneId)),
        });
      }
    } else if (scene.nextSceneId && !f.visited.has(scene.nextSceneId)) {
      queue.push({
        sceneId: scene.nextSceneId,
        depth: f.depth + 1,
        clicks: f.clicks,
        lines,
        visited: new Set(Array.from(f.visited).concat(scene.nextSceneId)),
      });
    }
  }

  return paths;
}

const summary: Array<{
  id: string;
  scenes: number;
  endings: number;
  shortestClicks: number;
  longestClicks: number;
  avgClicks: number;
  avgLines: number;
}> = [];

for (const sc of ALL_SCENARIOS) {
  const paths = pathsToEndings(sc.id);
  if (paths.length === 0) {
    console.log(`[${sc.id}] no reachable endings — skipping`);
    continue;
  }
  const clicks = paths.map((p) => p.clickCount);
  const lines = paths.map((p) => p.dialogLines);
  summary.push({
    id: sc.id,
    scenes: sc.scenes.length,
    endings: sc.scenes.filter((s) => s.isEnding).length,
    shortestClicks: Math.min(...clicks),
    longestClicks: Math.max(...clicks),
    avgClicks: Math.round((clicks.reduce((a, b) => a + b, 0) / clicks.length) * 10) / 10,
    avgLines: Math.round((lines.reduce((a, b) => a + b, 0) / lines.length) * 10) / 10,
  });
}

// Sort by avgClicks ascending — shortest first
summary.sort((a, b) => a.avgClicks - b.avgClicks);

console.log(
  "\n  ID                            scenes  endings   clicks(min/avg/max)   avg dialog lines",
);
console.log(
  "  ──────────────────────────── ─────── ───────── ────────────────────── ─────────────────",
);
for (const r of summary) {
  console.log(
    `  ${r.id.padEnd(28)} ${String(r.scenes).padStart(5)}   ${String(r.endings).padStart(5)}     ${String(r.shortestClicks).padStart(2)} / ${String(r.avgClicks).padStart(4)} / ${String(r.longestClicks).padStart(2)}            ${String(r.avgLines).padStart(5)}`,
  );
}

const allClicks = summary.map((s) => s.avgClicks);
const overallAvg = Math.round(
  (allClicks.reduce((a, b) => a + b, 0) / allClicks.length) * 10,
) / 10;
console.log(
  `\n  Overall avg clicks per playthrough: ${overallAvg}`,
);
