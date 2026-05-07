/**
 * Cycle detector for every simulator scenario.
 *
 * Builds a directed graph of scene → next-scenes (via choices + autoAdvance
 * nextSceneId), runs Tarjan-style SCC detection, and reports:
 *
 *   1. SELF-LOOPS — a scene whose own choice/nextSceneId points at itself.
 *      Always a bug.
 *   2. CYCLES — any strongly-connected component of size > 1, or a self-edge.
 *      Listed with the exact edges that close the loop, so the fix is
 *      a one-line edit.
 *   3. TRAP CYCLES — cycles with no path out to an ending scene. These are
 *      the "stuck in a loop forever" bugs the user reported. The other
 *      cycles may be intentional (a scene the player can revisit).
 *
 * Run: `npx tsx scripts/find-simulator-loops.ts`
 *
 * No DB access. Pure static analysis of the scenario data.
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import type { Scene, Scenario } from "../lib/simulator/types";

type Edge = { from: string; to: string; via: string };

function outgoingEdges(scene: Scene): Edge[] {
  const edges: Edge[] = [];
  if (scene.isEnding) return edges; // endings are sinks
  if (scene.choices && scene.choices.length > 0) {
    for (const c of scene.choices) {
      edges.push({ from: scene.id, to: c.nextSceneId, via: `choice:${c.id}` });
    }
  } else if (scene.nextSceneId) {
    edges.push({ from: scene.id, to: scene.nextSceneId, via: "auto" });
  }
  return edges;
}

function buildGraph(scenario: Scenario) {
  const sceneById = new Map<string, Scene>();
  for (const s of scenario.scenes) sceneById.set(s.id, s);
  const adj = new Map<string, Edge[]>();
  for (const s of scenario.scenes) adj.set(s.id, outgoingEdges(s));
  return { sceneById, adj };
}

/** Returns true if a path exists from `start` to any ending scene. */
function canReachEnding(
  start: string,
  scenario: Scenario,
  sceneById: Map<string, Scene>,
  adj: Map<string, Edge[]>,
): boolean {
  const seen = new Set<string>();
  const stack = [start];
  while (stack.length > 0) {
    const id = stack.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    const scene = sceneById.get(id);
    if (!scene) continue;
    if (scene.isEnding) return true;
    for (const e of adj.get(id) ?? []) {
      if (!seen.has(e.to)) stack.push(e.to);
    }
  }
  return false;
}

/**
 * Tarjan's SCC. Returns array of SCCs (each is an array of scene ids).
 * Singletons that have no self-edge are filtered out — only "real" SCCs
 * (cycles) are kept.
 */
function tarjanSCC(
  adj: Map<string, Edge[]>,
  nodes: string[],
): string[][] {
  let index = 0;
  const indices = new Map<string, number>();
  const lowlinks = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const sccs: string[][] = [];

  function strongconnect(v: string) {
    indices.set(v, index);
    lowlinks.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    for (const e of adj.get(v) ?? []) {
      const w = e.to;
      if (!indices.has(w)) {
        strongconnect(w);
        lowlinks.set(v, Math.min(lowlinks.get(v)!, lowlinks.get(w)!));
      } else if (onStack.has(w)) {
        lowlinks.set(v, Math.min(lowlinks.get(v)!, indices.get(w)!));
      }
    }

    if (lowlinks.get(v) === indices.get(v)) {
      const scc: string[] = [];
      while (true) {
        const w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
        if (w === v) break;
      }
      // Keep size-1 SCCs ONLY if they have a self-edge (real loop).
      if (scc.length > 1) {
        sccs.push(scc);
      } else {
        const v0 = scc[0];
        const hasSelfEdge = (adj.get(v0) ?? []).some((e) => e.to === v0);
        if (hasSelfEdge) sccs.push(scc);
      }
    }
  }

  for (const v of nodes) {
    if (!indices.has(v)) strongconnect(v);
  }
  return sccs;
}

/** Edges entirely inside the given SCC — these are the loop-closing edges. */
function sccEdges(scc: Set<string>, adj: Map<string, Edge[]>): Edge[] {
  const edges: Edge[] = [];
  for (const v of Array.from(scc)) {
    for (const e of adj.get(v) ?? []) {
      if (scc.has(e.to)) edges.push(e);
    }
  }
  return edges;
}

let totalLoops = 0;
let totalSelfLoops = 0;
let totalTrapLoops = 0;
let totalDeadEnds = 0;
let totalUnreachable = 0;
let totalBadStart = 0;

for (const scenario of ALL_SCENARIOS) {
  const { sceneById, adj } = buildGraph(scenario);
  const nodes = scenario.scenes.map((s) => s.id);

  // 1. Self-loops (choice or auto pointing back at the same scene).
  const selfLoops: Edge[] = [];
  for (const v of nodes) {
    for (const e of adj.get(v) ?? []) {
      if (e.to === v) selfLoops.push(e);
    }
  }

  // 2. SCCs (real cycles).
  const sccs = tarjanSCC(adj, nodes);

  // 3. Dangling edges (choices pointing at scene ids that don't exist).
  const dangling: Edge[] = [];
  for (const v of nodes) {
    for (const e of adj.get(v) ?? []) {
      if (!sceneById.has(e.to)) dangling.push(e);
    }
  }

  // 4. Dead-end scenes — non-ending scenes with no outgoing edges.
  //    Player lands on the screen and has nothing to tap. Looks like a freeze
  //    / a loop on the same screen. The simulator runner has no fallback for
  //    this — choices.length === 0 + !isEnding + no nextSceneId is just stuck.
  const deadEnds: string[] = [];
  for (const s of scenario.scenes) {
    if (s.isEnding) continue;
    const hasChoices = (s.choices?.length ?? 0) > 0;
    const hasAuto = !!s.nextSceneId;
    if (!hasChoices && !hasAuto) deadEnds.push(s.id);
  }

  // 5. Unreachable scenes — not reachable from startSceneId. Orphan content.
  const reachable = new Set<string>();
  const queue: string[] = scenario.startSceneId ? [scenario.startSceneId] : [];
  while (queue.length > 0) {
    const id = queue.pop()!;
    if (reachable.has(id)) continue;
    reachable.add(id);
    for (const e of adj.get(id) ?? []) {
      if (!reachable.has(e.to)) queue.push(e.to);
    }
  }
  const unreachable = nodes.filter((id) => !reachable.has(id));

  // 6. startSceneId points at a scene that does not exist.
  const badStart =
    !!scenario.startSceneId && !sceneById.has(scenario.startSceneId);

  if (
    sccs.length === 0 &&
    selfLoops.length === 0 &&
    dangling.length === 0 &&
    deadEnds.length === 0 &&
    unreachable.length === 0 &&
    !badStart
  ) {
    continue;
  }

  console.log("\n========================================");
  console.log(`Scenario: ${scenario.id}  (${scenario.title})`);
  console.log(`  track=${scenario.track ?? "female"}  scenes=${scenario.scenes.length}`);
  console.log("========================================");

  if (badStart) {
    totalBadStart++;
    console.log(
      `\n  BAD START: startSceneId="${scenario.startSceneId}" not found in scenes`,
    );
  }

  if (selfLoops.length > 0) {
    totalSelfLoops += selfLoops.length;
    console.log(`\n  SELF-LOOPS (${selfLoops.length}):`);
    for (const e of selfLoops) {
      console.log(`    - ${e.from} --(${e.via})--> ${e.to}`);
    }
  }

  if (dangling.length > 0) {
    console.log(`\n  DANGLING EDGES (${dangling.length}):`);
    for (const e of dangling) {
      console.log(`    - ${e.from} --(${e.via})--> ${e.to}  [missing scene]`);
    }
  }

  if (deadEnds.length > 0) {
    totalDeadEnds += deadEnds.length;
    console.log(
      `\n  DEAD-END SCENES (${deadEnds.length})  [no choices, no nextSceneId, not isEnding — player stuck on screen]:`,
    );
    for (const id of deadEnds) {
      console.log(`    - ${id}`);
    }
  }

  if (unreachable.length > 0) {
    totalUnreachable += unreachable.length;
    console.log(
      `\n  UNREACHABLE SCENES (${unreachable.length})  [orphan content, no path from startSceneId]:`,
    );
    for (const id of unreachable) {
      console.log(`    - ${id}`);
    }
  }

  if (sccs.length > 0) {
    for (const scc of sccs) {
      totalLoops++;
      const sccSet = new Set(scc);
      const edges = sccEdges(sccSet, adj);
      const trapEntirely = scc.every(
        (id) => !canReachEnding(id, scenario, sceneById, adj),
      );
      if (trapEntirely) totalTrapLoops++;
      console.log(
        `\n  ${trapEntirely ? "TRAP " : ""}CYCLE  (${scc.length} scene${
          scc.length === 1 ? "" : "s"
        })${trapEntirely ? "  [no path to any ending — players will be stuck]" : ""}:`,
      );
      console.log(`    scenes: ${scc.join(", ")}`);
      console.log(`    edges that close the loop:`);
      for (const e of edges) {
        console.log(`      ${e.from} --(${e.via})--> ${e.to}`);
      }
    }
  }
}

console.log("\n========================================");
console.log("SUMMARY");
console.log("========================================");
console.log(`  scenarios scanned : ${ALL_SCENARIOS.length}`);
console.log(`  self-loops        : ${totalSelfLoops}`);
console.log(`  cycles total      : ${totalLoops}`);
console.log(`  trap cycles       : ${totalTrapLoops}  ← cycles with no path to any ending`);
console.log(`  dead-end scenes   : ${totalDeadEnds}   ← non-ending scenes with no exit, player stuck on screen`);
console.log(`  unreachable scenes: ${totalUnreachable}  ← orphan content, no path from start`);
console.log(`  bad startSceneId  : ${totalBadStart}   ← scenario boots into a non-existent scene`);
console.log("========================================\n");

if (totalSelfLoops + totalTrapLoops + totalDeadEnds + totalBadStart > 0) {
  process.exit(1);
}
