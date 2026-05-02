/**
 * Scans every scenario for dialog lines whose speakerId isn't in the
 * scenario's characters[] array. Mirrors the check in validate-scenarios
 * but runs it explicitly across every scenario so we can be sure
 * nothing was missed.
 */

import { ALL_SCENARIOS } from "../lib/simulator/scenarios";

let issues = 0;
for (const scenario of ALL_SCENARIOS) {
  const knownIds = new Set(scenario.characters.map((c) => c.id));
  for (const scene of scenario.scenes) {
    if (!scene.dialog) continue;
    for (const line of scene.dialog) {
      if (!line.speakerId) continue;
      if (!knownIds.has(line.speakerId)) {
        console.log(
          `${scenario.id} :: scene "${scene.id}" :: dialog speakerId "${line.speakerId}" not in characters[]`,
        );
        issues++;
      }
    }
    if (scene.presentCharacterIds) {
      for (const id of scene.presentCharacterIds) {
        if (!knownIds.has(id)) {
          console.log(
            `${scenario.id} :: scene "${scene.id}" :: presentCharacterIds "${id}" not in characters[]`,
          );
          issues++;
        }
      }
    }
  }
}

console.log(`\nTotal orphan-speaker issues: ${issues}`);
process.exit(issues > 0 ? 1 : 0);
