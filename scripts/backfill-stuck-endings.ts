/**
 * Backfill stuck-at-ending SimulatorProgress rows.
 *
 * The autoAdvance bug (fixed in commit a9abd22) left legacy rows where the
 * player reached an ending scene but the row was never finalized — outcome,
 * endedAt, and xpEarned were never stamped. These rows show up as
 * "abandoned" in the engagement deep-dive even though the player completed
 * the scenario successfully.
 *
 * This script finds every SimulatorProgress where:
 *   - completedAt IS NULL (still flagged in-progress)
 *   - currentSceneId points to a scene with isEnding === true in our content
 *
 * For each, it replays choicesMade through the engine to derive authoritative
 * XP, reads the scene's outcomeType, and stamps the row.
 *
 * Run dry-first: DATABASE_URL=<prod> npx tsx scripts/backfill-stuck-endings.ts
 * Then apply:    DATABASE_URL=<prod> npx tsx scripts/backfill-stuck-endings.ts --apply
 */
import { PrismaClient } from "@prisma/client";
import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import { replayXp } from "../lib/simulator/engine";
import type { ChoiceRecord, OutcomeType } from "../lib/simulator/types";

const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

function parseChoicesMade(raw: unknown): ChoiceRecord[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (r): r is ChoiceRecord =>
      r != null &&
      typeof r === "object" &&
      typeof (r as ChoiceRecord).sceneId === "string" &&
      typeof (r as ChoiceRecord).choiceId === "string",
  );
}

async function main() {
  console.log(
    `\nMode: ${APPLY ? "APPLY (will write to DB)" : "DRY RUN (no writes)"}\n`,
  );

  const scenarioById = new Map(ALL_SCENARIOS.map((s) => [s.id, s]));

  const stuck = await prisma.simulatorProgress.findMany({
    where: {
      completedAt: null,
      currentSceneId: { startsWith: "ending-" },
    },
    select: {
      id: true,
      userId: true,
      scenarioId: true,
      currentSceneId: true,
      startedAt: true,
      choicesMade: true,
      xpEarned: true,
    },
    orderBy: { startedAt: "asc" },
  });

  console.log(`Found ${stuck.length} stuck-at-ending rows.\n`);
  if (stuck.length === 0) {
    await prisma.$disconnect();
    return;
  }

  const updates: Array<{
    id: string;
    scenarioId: string;
    sceneId: string;
    outcome: OutcomeType;
    xp: number;
    completedAt: Date;
    reason: string;
  }> = [];
  const skipped: Array<{ id: string; scenarioId: string; sceneId: string; why: string }> = [];

  for (const row of stuck) {
    const scenario = scenarioById.get(row.scenarioId);
    if (!scenario) {
      skipped.push({
        id: row.id,
        scenarioId: row.scenarioId,
        sceneId: row.currentSceneId ?? "(none)",
        why: "scenario not in registry (legacy/removed)",
      });
      continue;
    }
    const scene = scenario.scenes.find((s) => s.id === row.currentSceneId);
    if (!scene) {
      skipped.push({
        id: row.id,
        scenarioId: row.scenarioId,
        sceneId: row.currentSceneId ?? "(none)",
        why: "scene id no longer exists in scenario",
      });
      continue;
    }
    if (!scene.isEnding) {
      skipped.push({
        id: row.id,
        scenarioId: row.scenarioId,
        sceneId: scene.id,
        why: "scene.isEnding=false (false positive on prefix match)",
      });
      continue;
    }
    if (!scene.outcomeType) {
      skipped.push({
        id: row.id,
        scenarioId: row.scenarioId,
        sceneId: scene.id,
        why: "scene.outcomeType missing — can't infer outcome",
      });
      continue;
    }

    const choices = parseChoicesMade(row.choicesMade);
    const { xp } = replayXp(scenario, choices);
    // Estimate completedAt as startedAt + 10 min (typical scenario length).
    // We don't have per-line timestamps so this is the best we can do.
    const completedAt = new Date(row.startedAt.getTime() + 10 * 60_000);

    updates.push({
      id: row.id,
      scenarioId: row.scenarioId,
      sceneId: scene.id,
      outcome: scene.outcomeType,
      xp,
      completedAt,
      reason: `${choices.length} choices replayed → ${xp} xp`,
    });
  }

  console.log(`Will update: ${updates.length}`);
  console.log(`Will skip:   ${skipped.length}\n`);

  if (updates.length > 0) {
    console.log(
      `  ${"scenario".padEnd(20)} ${"ending scene".padEnd(28)} ${"outcome".padEnd(8)} ${"xp".padStart(4)}  notes`,
    );
    console.log("  " + "─".repeat(80));
    for (const u of updates) {
      console.log(
        `  ${u.scenarioId.padEnd(20)} ${u.sceneId.padEnd(28)} ${u.outcome.padEnd(8)} ${String(u.xp).padStart(4)}  ${u.reason}`,
      );
    }
  }

  if (skipped.length > 0) {
    console.log(`\n  SKIPPED:`);
    for (const s of skipped) {
      console.log(
        `    ${s.scenarioId.padEnd(20)} ${s.sceneId.padEnd(28)} — ${s.why}`,
      );
    }
  }

  if (!APPLY) {
    console.log(`\n[DRY RUN] No changes written. Re-run with --apply to commit.\n`);
    await prisma.$disconnect();
    return;
  }

  console.log(`\nApplying ${updates.length} updates...`);
  let written = 0;
  for (const u of updates) {
    await prisma.simulatorProgress.update({
      where: { id: u.id },
      data: {
        outcome: u.outcome,
        xpEarned: u.xp,
        completedAt: u.completedAt,
      },
    });
    written++;
  }
  console.log(`Done. ${written} rows updated.\n`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
