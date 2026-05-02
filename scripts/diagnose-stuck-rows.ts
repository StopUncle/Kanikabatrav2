/**
 * Inspects the actual data on stuck SimulatorProgress rows for the two
 * suspect scenarios. The choicesMade JSON tells us whether players
 * crashed before choosing (suggests a render bug on entry) or partway
 * (suggests a transition / scene-ref bug downstream).
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

async function main() {
  const p = new PrismaClient();
  const since = new Date(Date.now() - 14 * 86_400_000);

  const stuck = await p.simulatorProgress.findMany({
    where: {
      startedAt: { gte: since },
      completedAt: null,
      scenarioId: { in: ["d1-frame-challenge", "b3-covert-peer"] },
    },
    select: {
      id: true,
      userId: true,
      scenarioId: true,
      currentSceneId: true,
      choicesMade: true,
      startedAt: true,
      outcome: true,
      xpEarned: true,
      completionCount: true,
    },
    orderBy: { startedAt: "desc" },
  });

  console.log(`Stuck rows in suspect scenarios: ${stuck.length}\n`);
  for (const r of stuck) {
    const choicesMade = r.choicesMade as unknown;
    const choiceCount = Array.isArray(choicesMade)
      ? choicesMade.length
      : "non-array";
    console.log(
      `${r.scenarioId.padEnd(22)} user=${r.userId.slice(-6)} scene=${(r.currentSceneId ?? "?").padEnd(20)} choices=${choiceCount} started=${r.startedAt.toISOString()}`,
    );
    console.log(`  choicesMade: ${JSON.stringify(choicesMade)}`);
  }

  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
