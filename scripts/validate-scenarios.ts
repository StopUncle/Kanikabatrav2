/**
 * Offline validator for all Dark Mirror scenarios.
 * Run via: npx tsx scripts/validate-scenarios.ts
 *
 * The structural checks live in lib/simulator/validate.ts, the single
 * source of truth shared with the runtime publish gate in
 * lib/simulator/generated.ts. This script runs that shared graph walk over
 * the whole static registry and prints its issues: an "error" fails the
 * check (exit 1), a "warning" is advisory (exit 0). The one thing that only
 * makes sense here, and so stays here, is the cross-scenario duplicate id
 * scan across tracks; the shared validator only knows one scenario at a
 * time.
 */
import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import { collectScenarioIssues } from "../lib/simulator/validate";

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

// Duplicate scenario ids across tracks (registry-level, not a per-scenario
// graph property, so it stays here rather than in the shared validator).
const seenIds = new Set<string>();
for (const s of ALL_SCENARIOS) {
  if (seenIds.has(s.id)) console.log(`DUPLICATE SCENARIO ID: ${s.id}`);
  seenIds.add(s.id);
}

console.log(`Validating ${ALL_SCENARIOS.length} scenarios...\n`);

for (const scenario of ALL_SCENARIOS) {
  for (const issue of collectScenarioIssues(scenario)) {
    if (issue.severity === "error") warn(scenario.id, issue.message);
    else note(scenario.id, issue.message);
  }
}

console.log(
  `\n${failures === 0 ? "✓ No errors." : `✗ ${failures} error(s)`}${
    warnings > 0 ? `, ${warnings} warning(s)` : ""
  }`,
);
// Exit 1 on errors; warnings don't fail the check.
process.exit(failures === 0 ? 0 : 1);
