/**
 * Stuck simulator runs from after the autoAdvance fix shipped
 * (commit a9abd22, 2026-04-25). If the live bug still exists, it
 * shows up here. Anything before that date is pre-fix backlog.
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

async function main() {
  const p = new PrismaClient();
  const fixDate = new Date("2026-04-27T00:00:00Z");

  const stuck = await p.simulatorProgress.findMany({
    where: {
      startedAt: { gte: fixDate },
      completedAt: null,
    },
    select: {
      id: true,
      userId: true,
      scenarioId: true,
      currentSceneId: true,
      choicesMade: true,
      startedAt: true,
      xpEarned: true,
    },
    orderBy: { startedAt: "desc" },
  });

  console.log(
    `Stuck rows started AFTER 2026-04-27 (post-autoAdvance-fix): ${stuck.length}\n`,
  );

  const byScene = new Map<string, number>();
  for (const r of stuck) {
    const key = `${r.scenarioId}::${r.currentSceneId}`;
    byScene.set(key, (byScene.get(key) ?? 0) + 1);
  }
  console.log("Stuck count by scenario::scene:");
  for (const [k, v] of Array.from(byScene.entries()).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${v} × ${k}`);
  }

  console.log("\nDetail:");
  for (const r of stuck) {
    const choices = r.choicesMade as unknown;
    const n = Array.isArray(choices) ? choices.length : "?";
    const last = Array.isArray(choices) && choices.length > 0
      ? `last=${(choices[choices.length - 1] as { sceneId: string; choiceId: string }).sceneId}/${(choices[choices.length - 1] as { sceneId: string; choiceId: string }).choiceId}`
      : "no-choices";
    console.log(
      `  ${r.startedAt.toISOString().slice(0, 16)}  ${r.scenarioId.padEnd(22)} stuck@${(r.currentSceneId ?? "?").padEnd(28)} choices=${n}  ${last}`,
    );
  }

  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
