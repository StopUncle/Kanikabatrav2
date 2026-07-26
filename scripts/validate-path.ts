/**
 * Path registry validation. Run with: npx tsx scripts/validate-path.ts
 *
 * Guards the invariants the runtime assumes:
 *  - step ids unique across the whole curriculum, and never colliding
 *    with the synthetic "<chapterId>-seal" markers
 *  - every scenario step (both genders) references a real catalog id
 *  - chapter numbers are 1..N sequential
 *  - cumulative counts (tells, receipts, labs, electives) never decrease
 *    from one step to a later step of the same kind
 */

import { PATH_CHAPTERS, ALL_STEPS } from "../lib/path/curriculum";
import { SCENARIO_BY_ID } from "../lib/simulator/scenarios";

const errors: string[] = [];

const ids = new Set<string>();
for (const step of ALL_STEPS) {
  if (ids.has(step.id)) errors.push(`duplicate step id: ${step.id}`);
  ids.add(step.id);
}
for (const chapter of PATH_CHAPTERS) {
  const seal = `${chapter.id}-seal`;
  if (ids.has(seal)) errors.push(`step id collides with seal marker: ${seal}`);
}

for (const step of ALL_STEPS) {
  if (step.kind.type === "scenario") {
    for (const g of ["female", "male"] as const) {
      const id = step.kind[g];
      if (!SCENARIO_BY_ID[id]) {
        errors.push(`${step.id}: unknown ${g} scenario "${id}"`);
      }
    }
  }
}

PATH_CHAPTERS.forEach((c, i) => {
  if (c.number !== i + 1) {
    errors.push(`chapter ${c.id} has number ${c.number}, expected ${i + 1}`);
  }
});

const lastCount: Record<string, number> = {};
for (const step of ALL_STEPS) {
  const k = step.kind;
  if ("count" in k) {
    const prev = lastCount[k.type] ?? 0;
    if (k.count < prev) {
      errors.push(
        `${step.id}: ${k.type} count ${k.count} decreases from earlier ${prev}`,
      );
    }
    lastCount[k.type] = k.count;
  }
}

if (errors.length > 0) {
  console.error(`Path validation FAILED (${errors.length}):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(
  `Path validation OK: ${PATH_CHAPTERS.length} chapters, ${ALL_STEPS.length} steps, all scenario refs resolve.`,
);
