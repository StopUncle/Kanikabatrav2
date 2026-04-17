/**
 * Scenario integrity auditor + arc analyzer.
 *
 * Pure checks — no DB, no runtime — over every scenario in the registry:
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
 *   9. Every ending has a title + summary
 *
 * Plus arc-level reports (printed when --report is passed):
 *   - Character appearance matrix (who shows up in which scenarios)
 *   - Tactic coverage (which tactics are taught across scenarios)
 *   - Red-flag coverage
 *   - Scenario tier/difficulty distribution
 *   - Level progression sanity
 *
 * Run:
 *   Validator only:  npx ts-node scripts/audit-simulator.ts
 *   Full report:     npx ts-node scripts/audit-simulator.ts --report
 *
 * (Compiler options must be passed via --compiler-options, see package.json
 * or existing invocations.)
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import type { Scenario } from "../lib/simulator/types";

type Issue = {
  scenario: string;
  level: "error" | "warn";
  message: string;
};

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

function auditScenario(s: Scenario): Issue[] {
  const issues: Issue[] = [];
  const push = (level: Issue["level"], msg: string) =>
    issues.push({ scenario: s.id, level, message: msg });

  const seen = new Set<string>();
  for (const scene of s.scenes) {
    if (seen.has(scene.id)) push("error", `Duplicate scene id: ${scene.id}`);
    seen.add(scene.id);
  }

  const sceneById = new Map(s.scenes.map((sc) => [sc.id, sc]));

  if (!sceneById.has(s.startSceneId)) {
    push("error", `startSceneId "${s.startSceneId}" not found in scenes[]`);
  }

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

  // Reachability from startSceneId (BFS)
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

  // Every reachable path terminates at an ending
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

  for (const scene of s.scenes) {
    if (!scene.isEnding) continue;
    if (!scene.endingTitle) push("warn", `Ending "${scene.id}" has no endingTitle`);
    if (!scene.endingSummary)
      push("warn", `Ending "${scene.id}" has no endingSummary`);
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Arc reports
// ---------------------------------------------------------------------------

function characterAppearanceMatrix(): void {
  // Collect every character id that appears across all scenarios, ordered
  // by first appearance. Skip inner-voice — it's a narration channel, not
  // a tracked person.
  const firstSeen = new Map<string, string>();
  for (const s of ALL_SCENARIOS) {
    for (const c of s.characters) {
      if (c.id === "inner-voice") continue;
      if (!firstSeen.has(c.id)) firstSeen.set(c.id, s.id);
    }
  }

  const charIds = Array.from(firstSeen.keys());

  console.log("\n=== CHARACTER APPEARANCE MATRIX ===\n");
  console.log(
    `${"Character".padEnd(16)}${ALL_SCENARIOS.map((s) => s.id.replace("mission-", "").padStart(5)).join("")}`,
  );
  for (const id of charIds) {
    const cells = ALL_SCENARIOS.map((s) => {
      const inCast = s.characters.some((c) => c.id === id);
      // Also count as present if speaker lines reference them even if not
      // in the cast (should not happen, but checks consistency)
      const speaking = s.scenes.some((sc) =>
        sc.dialog.some((d) => d.speakerId === id),
      );
      if (speaking) return "  ● ";
      if (inCast) return "  ○ ";
      return "    ";
    }).join(" ");
    console.log(`${id.padEnd(16)}${cells}`);
  }
  console.log("\n● = speaks, ○ = cast member but silent\n");
}

function tacticCoverage(): void {
  const tacticCount = new Map<string, string[]>();
  for (const s of ALL_SCENARIOS) {
    for (const t of s.tacticsLearned) {
      const arr = tacticCount.get(t) ?? [];
      arr.push(s.id);
      tacticCount.set(t, arr);
    }
  }

  console.log("\n=== TACTIC COVERAGE ===\n");
  const sorted = Array.from(tacticCount.entries()).sort(
    (a, b) => b[1].length - a[1].length,
  );
  for (const [tactic, scenarios] of sorted) {
    console.log(`  ${scenarios.length}× ${tactic}`);
    if (scenarios.length > 1) {
      console.log(`       → ${scenarios.map((s) => s.replace("mission-", "")).join(", ")}`);
    }
  }
  console.log(`\nTotal distinct tactics: ${sorted.length}\n`);
}

function redFlagCoverage(): void {
  const flags = new Map<string, string[]>();
  for (const s of ALL_SCENARIOS) {
    for (const f of s.redFlagsTaught) {
      const arr = flags.get(f) ?? [];
      arr.push(s.id);
      flags.set(f, arr);
    }
  }

  console.log("\n=== RED FLAG COVERAGE ===\n");
  const sorted = Array.from(flags.entries()).sort(
    (a, b) => b[1].length - a[1].length,
  );
  for (const [flag, scenarios] of sorted) {
    console.log(`  ${scenarios.length}× ${flag}`);
  }
  console.log(`\nTotal distinct red flags: ${sorted.length}\n`);
}

function levelDistribution(): void {
  console.log("\n=== LEVEL DISTRIBUTION ===\n");
  const byLevel = new Map<number, Scenario[]>();
  for (const s of ALL_SCENARIOS) {
    const arr = byLevel.get(s.level) ?? [];
    arr.push(s);
    byLevel.set(s.level, arr);
  }
  const levels = Array.from(byLevel.keys()).sort((a, b) => a - b);
  for (const lvl of levels) {
    const scenarios = byLevel.get(lvl)!;
    const tiers = new Set(scenarios.map((s) => s.tier));
    const diffs = new Set(scenarios.map((s) => s.difficulty));
    const xp = scenarios.reduce((acc, s) => acc + s.xpReward, 0);
    console.log(
      `  L${lvl}: ${scenarios.length} scenarios · tiers:[${Array.from(tiers).join(",")}] · difficulty:[${Array.from(diffs).join(",")}] · ${xp} XP total`,
    );
    for (const s of scenarios.sort((a, b) => a.order - b.order)) {
      const sceneCount = s.scenes.length;
      const endingCount = s.scenes.filter((sc) => sc.isEnding).length;
      const choiceScenes = s.scenes.filter(
        (sc) => sc.choices && sc.choices.length > 0,
      ).length;
      console.log(
        `       ${s.id.replace("mission-", "")}  "${s.title}"  ${sceneCount} scenes (${choiceScenes} choices, ${endingCount} endings)`,
      );
    }
  }
  console.log();
}

function sceneStats(): void {
  let totalScenes = 0;
  let totalChoices = 0;
  let totalEndings = 0;
  let totalGroupScenes = 0;
  let totalDialogLines = 0;
  let scenesWithTrigger = 0;
  let scenesWithShake = 0;

  for (const s of ALL_SCENARIOS) {
    for (const sc of s.scenes) {
      totalScenes++;
      if (sc.choices) totalChoices += sc.choices.length;
      if (sc.isEnding) totalEndings++;
      if (sc.presentCharacterIds && sc.presentCharacterIds.length > 1)
        totalGroupScenes++;
      totalDialogLines += sc.dialog.length;
      if (sc.immersionTrigger) scenesWithTrigger++;
      if (sc.shakeOnEntry) scenesWithShake++;
    }
  }

  console.log("\n=== SCENE STATS ===\n");
  console.log(`  Scenarios:             ${ALL_SCENARIOS.length}`);
  console.log(`  Total scenes:          ${totalScenes}`);
  console.log(`  Total dialog lines:    ${totalDialogLines}`);
  console.log(`  Total choices:         ${totalChoices}`);
  console.log(`  Total endings:         ${totalEndings}`);
  console.log(`  Group scenes:          ${totalGroupScenes}`);
  console.log(`  Immersion triggers:    ${scenesWithTrigger}`);
  console.log(`  Scene shakes:          ${scenesWithShake}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const all: Issue[] = [];
for (const s of ALL_SCENARIOS) {
  all.push(...auditScenario(s));
}

const errors = all.filter((i) => i.level === "error");
const warnings = all.filter((i) => i.level === "warn");

console.log(`\nScenarios audited: ${ALL_SCENARIOS.length}`);
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const i of all) {
  const tag = i.level === "error" ? "\x1b[31mERR\x1b[0m " : "\x1b[33mWARN\x1b[0m";
  console.log(`${tag} [${i.scenario}] ${i.message}`);
}

if (process.argv.includes("--report")) {
  sceneStats();
  levelDistribution();
  characterAppearanceMatrix();
  tacticCoverage();
  redFlagCoverage();
}

process.exit(errors.length > 0 ? 1 : 0);
