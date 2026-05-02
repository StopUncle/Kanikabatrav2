/**
 * Diagnoses possible simulator crash patterns by querying recent
 * SimulatorProgress rows: which scenarios get the most starts vs.
 * completions, where players abandon, and any stuck-in-progress
 * outliers.
 *
 * Run: see audit-stripe-subs.ts for the env-passing pattern.
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

async function main() {
  const p = new PrismaClient();
  const since = new Date(Date.now() - 14 * 86_400_000);

  const all = await p.simulatorProgress.findMany({
    where: { startedAt: { gte: since } },
    select: {
      id: true,
      scenarioId: true,
      currentSceneId: true,
      outcome: true,
      completedAt: true,
      startedAt: true,
      choicesMade: true,
    },
    orderBy: { startedAt: "desc" },
  });

  console.log(`Total progress rows in last 14d: ${all.length}`);
  console.log("");

  const byScenario = new Map<
    string,
    { starts: number; completions: number; stuck: number; lastSceneIds: string[] }
  >();
  for (const r of all) {
    const s = byScenario.get(r.scenarioId) ?? {
      starts: 0,
      completions: 0,
      stuck: 0,
      lastSceneIds: [],
    };
    s.starts += 1;
    if (r.completedAt) s.completions += 1;
    // Stuck: not completed, started > 24h ago (proxy for abandoned)
    const stale =
      !r.completedAt &&
      r.startedAt.getTime() < Date.now() - 24 * 60 * 60 * 1000;
    if (stale) {
      s.stuck += 1;
      s.lastSceneIds.push(r.currentSceneId ?? "?");
    }
    byScenario.set(r.scenarioId, s);
  }

  const sorted = Array.from(byScenario.entries()).sort(
    (a, b) => b[1].starts - a[1].starts,
  );

  console.log("Scenario               Starts  Done  Stuck  Top stuck-at-scenes");
  console.log("=".repeat(85));
  for (const [scenarioId, stats] of sorted) {
    const completionPct =
      stats.starts > 0 ? Math.round((stats.completions / stats.starts) * 100) : 0;
    const sceneCounts = new Map<string, number>();
    for (const sid of stats.lastSceneIds) {
      sceneCounts.set(sid, (sceneCounts.get(sid) ?? 0) + 1);
    }
    const topStuck = Array.from(sceneCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([sid, n]) => `${sid}(${n})`)
      .join(", ");
    console.log(
      `${scenarioId.padEnd(22)} ${String(stats.starts).padEnd(6)}  ${String(stats.completions).padEnd(4)}  ${String(stats.stuck).padEnd(5)}  ${topStuck} [${completionPct}%]`,
    );
  }

  console.log("");
  console.log(
    "Scenarios with low completion ratio (potential crash candidates):",
  );
  for (const [scenarioId, stats] of sorted) {
    if (stats.starts < 3) continue;
    const pct = stats.completions / stats.starts;
    if (pct < 0.4 && stats.stuck > 0) {
      console.log(
        `  ${scenarioId}: ${stats.completions}/${stats.starts} completed, ${stats.stuck} stuck`,
      );
    }
  }

  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
