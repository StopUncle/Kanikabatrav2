/**
 * Locates the user "Megan" and dumps her simulator progress so we can
 * see exactly which scene + choice path she's stuck on. The complaint
 * was "she will never get to find out what Maris says to her about
 * being her best friend" — finding the actual stuck-state lets us
 * trace from there.
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

async function main() {
  const p = new PrismaClient();

  const candidates = await p.user.findMany({
    where: {
      OR: [
        { name: { contains: "megan", mode: "insensitive" } },
        { email: { contains: "megan", mode: "insensitive" } },
        { displayName: { contains: "megan", mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      createdAt: true,
    },
  });

  console.log(`Found ${candidates.length} candidate user(s) named Megan:\n`);
  for (const u of candidates) {
    console.log(
      `  ${u.id}  email=${u.email}  name=${u.name}  display=${u.displayName}  created=${u.createdAt.toISOString().slice(0, 10)}`,
    );

    const progress = await p.simulatorProgress.findMany({
      where: { userId: u.id },
      select: {
        scenarioId: true,
        currentSceneId: true,
        choicesMade: true,
        startedAt: true,
        completedAt: true,
        outcome: true,
      },
      orderBy: { startedAt: "desc" },
    });

    console.log(`  ${progress.length} simulator runs:`);
    for (const r of progress) {
      const choices = r.choicesMade as unknown;
      const choicesArr = Array.isArray(choices) ? choices : [];
      const status = r.completedAt ? `done(${r.outcome})` : "in-progress";
      console.log(
        `    ${r.startedAt.toISOString().slice(0, 16)}  ${r.scenarioId.padEnd(22)} scene=${(r.currentSceneId ?? "?").padEnd(28)} ${status}  choices=${choicesArr.length}`,
      );
      for (const c of choicesArr) {
        const cc = c as { sceneId: string; choiceId: string };
        console.log(`      → ${cc.sceneId} :: ${cc.choiceId}`);
      }
    }
    console.log("");
  }

  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
