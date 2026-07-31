/**
 * Backfill The Mark from historical Simulator completions.
 *
 * The skill loop now writes SCENARIO evidence at completion time, but every
 * run before that shipped left nothing in the ledger. This replays stored
 * choicesMade through the same mapper the live route uses, so existing
 * members' Marks populate without waiting months for fresh runs.
 *
 * Honesty rules:
 *   - Only rows with completionCount === 1. mergeProgress overwrites
 *     choicesMade with the LATEST run, so a replayed scenario's stored
 *     choices are practiced knowledge, not a first read. Skipped and logged.
 *   - Only static-catalog scenarios. Generated Fresh Files need a DB read
 *     per id and their historical volume is tiny; they are counted and
 *     skipped rather than resolved.
 *   - Writes go through recordEncounters with dedupe, so the script is
 *     idempotent: a second run reports 0 written.
 *
 * Run dry-first: DATABASE_URL=<prod> npx tsx scripts/backfill-mark-from-simulator.ts
 * Then apply:    DATABASE_URL=<prod> npx tsx scripts/backfill-mark-from-simulator.ts --apply
 */
import { PrismaClient } from "@prisma/client";
import { getScenario } from "../lib/simulator/scenarios";
import { encountersFromScenarioRun } from "../lib/mark/sources/scenario";
import { recordEncounters } from "../lib/mark/encounters";
import type { ChoiceRecord } from "../lib/simulator/types";

const prisma = new PrismaClient();
const apply = process.argv.includes("--apply");

async function main() {
  const rows = await prisma.simulatorProgress.findMany({
    where: { completedAt: { not: null } },
    select: {
      userId: true,
      scenarioId: true,
      choicesMade: true,
      completionCount: true,
    },
    orderBy: [{ userId: "asc" }, { scenarioId: "asc" }],
  });

  let replayed = 0;
  let unresolved = 0;
  let untagged = 0;
  let written = 0;
  let planned = 0;
  const perUser = new Map<string, number>();

  for (const row of rows) {
    if (row.completionCount !== 1) {
      replayed++;
      continue;
    }
    const scenario = getScenario(row.scenarioId);
    if (!scenario) {
      unresolved++;
      continue;
    }
    const choices = (row.choicesMade as unknown as ChoiceRecord[]) ?? [];
    const encounters = encountersFromScenarioRun(scenario, choices);
    if (encounters.length === 0) {
      untagged++;
      continue;
    }
    if (apply) {
      const count = await recordEncounters(prisma, {
        userId: row.userId,
        source: "SCENARIO",
        encounters,
        dedupe: true,
      });
      written += count;
      perUser.set(row.userId, (perUser.get(row.userId) ?? 0) + count);
    } else {
      planned += encounters.length;
      perUser.set(
        row.userId,
        (perUser.get(row.userId) ?? 0) + encounters.length,
      );
    }
  }

  console.log(`${apply ? "APPLY" : "DRY RUN"}`);
  console.log(`completed rows scanned: ${rows.length}`);
  console.log(`skipped, replayed (completionCount > 1): ${replayed}`);
  console.log(`skipped, not in static catalog: ${unresolved}`);
  console.log(`skipped, scenario writes no evidence: ${untagged}`);
  console.log(
    apply
      ? `encounters written: ${written}`
      : `encounters that would be written (before dedupe): ${planned}`,
  );
  console.log(`members touched: ${perUser.size}`);
  const tallies = Array.from(perUser.entries()).sort((a, b) => b[1] - a[1]);
  for (const [userId, count] of tallies) {
    console.log(`  ${userId}: ${count}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
