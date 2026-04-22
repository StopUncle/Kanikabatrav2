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
 * - no duplicate character ids within a scenario
 * - no duplicate scenario ids across tracks
 * - at least one reachable ending
 * - every dialog speakerId resolves to a real character (or is "inner-voice" / null)
 * - every presentCharacterIds id resolves to a real character
 * - mood values are valid MoodType values
 * - ending scenes declare outcomeType
 * - no scene has empty dialog AND no auto-advance AND no choices (would render blank)
 * - every choice.isOptimal is set (choices without it get a middle-tier XP
 *   fallback that's easy to miss at authoring time — flag as warning, not error)
 */
import { ALL_SCENARIOS } from "../lib/simulator/scenarios";

const VALID_MOODS = [
  "romantic",
  "danger",
  "party",
  "cold",
  "peaceful",
  "tense",
  "mysterious",
  "professional",
];

let failures = 0;
let warnings = 0;
const warn = (scenarioId: string, msg: string) => {
  failures++;
  console.log(`  ✗ ${scenarioId}: ${msg}`);
};
const note = (scenarioId: string, msg: string) => {
  warnings++;
  console.log(`  ⚠ ${scenarioId}: ${msg}`);
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
  const characterById = new Map(scenario.characters.map((c) => [c.id, c]));

  // Duplicate scene ids
  const sceneIds = scenario.scenes.map((s) => s.id);
  const uniqueSceneIds = new Set(sceneIds);
  if (sceneIds.length !== uniqueSceneIds.size) {
    warn(scenario.id, `duplicate scene ids`);
  }

  // Duplicate character ids
  const charIds = scenario.characters.map((c) => c.id);
  const uniqueCharIds = new Set(charIds);
  if (charIds.length !== uniqueCharIds.size) {
    warn(scenario.id, `duplicate character ids`);
  }

  // startSceneId resolves
  if (!sceneById.has(scenario.startSceneId)) {
    warn(scenario.id, `startSceneId "${scenario.startSceneId}" not found`);
    continue;
  }

  // Starting scene must not be an ending
  const startScene = sceneById.get(scenario.startSceneId);
  if (startScene?.isEnding) {
    warn(
      scenario.id,
      `startSceneId "${scenario.startSceneId}" is an ending scene — player starts on loss screen`,
    );
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

    // Self-loop — scene pointing at itself. Would lock the player on
    // the scene forever (auto-advance to same scene, or choice that
    // goes back to the same scene).
    if (scene.nextSceneId === scene.id) {
      warn(scenario.id, `scene "${scene.id}" nextSceneId points at itself`);
    }
    if (scene.choices) {
      for (const c of scene.choices) {
        if (c.nextSceneId === scene.id) {
          warn(
            scenario.id,
            `scene "${scene.id}" choice "${c.id}" loops back to same scene`,
          );
        }
      }
    }

    // mood — optional but if set must be valid
    if (scene.mood && !VALID_MOODS.includes(scene.mood)) {
      warn(
        scenario.id,
        `scene "${scene.id}" has invalid mood "${scene.mood}" — not in MoodType union`,
      );
    }

    // ending scenes should declare outcomeType
    if (scene.isEnding && !scene.outcomeType) {
      note(
        scenario.id,
        `ending scene "${scene.id}" has no outcomeType — will default to "neutral"`,
      );
    }

    // dialog speakerId resolves. "inner-voice" is a special sentinel
    // for narration; null/undefined means pure narrator line. Anything
    // else must be a character id on the scenario.
    for (const line of scene.dialog ?? []) {
      if (
        line.speakerId &&
        line.speakerId !== "inner-voice" &&
        !characterById.has(line.speakerId)
      ) {
        warn(
          scenario.id,
          `scene "${scene.id}" dialog line speakerId "${line.speakerId}" not found in characters[]`,
        );
      }
    }

    // presentCharacterIds all resolve
    for (const cid of scene.presentCharacterIds ?? []) {
      if (cid !== "inner-voice" && !characterById.has(cid)) {
        warn(
          scenario.id,
          `scene "${scene.id}" presentCharacterIds "${cid}" not found in characters[]`,
        );
      }
    }

    // choice.isOptimal unset → middle-tier XP fallback silently applies.
    // Notes-level warning because sometimes this is intentional (neutral
    // choices with no right answer) but most often it's an authoring miss.
    if (scene.choices) {
      for (const c of scene.choices) {
        if (c.isOptimal === undefined) {
          note(
            scenario.id,
            `scene "${scene.id}" choice "${c.id}" has no isOptimal — will default to middle-tier XP`,
          );
        }
      }
    }

    // Empty dialog + no choices + has nextSceneId → scene renders
    // blank for a tick while auto-advance runs. Harmless but jarring.
    if (
      !scene.isEnding &&
      (!scene.dialog || scene.dialog.length === 0) &&
      (!scene.choices || scene.choices.length === 0) &&
      scene.nextSceneId
    ) {
      note(
        scenario.id,
        `scene "${scene.id}" has empty dialog and no choices — renders blank briefly before auto-advance`,
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
  `\n${failures === 0 ? "✓ No errors." : `✗ ${failures} error(s)`}${
    warnings > 0 ? `, ${warnings} warning(s)` : ""
  }`,
);
// Exit 1 on errors; warnings don't fail the check.
process.exit(failures === 0 ? 0 : 1);
