/**
 * Seed (or re-seed) the Tell table from lib/tells/seed-tells.ts.
 *
 * Idempotent: each seed Tell upserts on its `id`. Re-running it after
 * editing a Tell in seed-tells.ts pushes the new content through.
 *
 * Schedule: each Tell is scheduled sequentially starting today (UTC),
 * one per day, so the public /tells page rotates through the seed pool
 * for the next N days. Re-running shifts schedules forward to today,
 * which is the right behaviour for re-seeds during development.
 *
 * Run locally:
 *   npx tsx scripts/seed-tells.ts
 *
 * Run against production (one-off):
 *   DATABASE_URL=<prod url from Railway> npx tsx scripts/seed-tells.ts
 */

import { config } from "dotenv";
import { PrismaClient, type Prisma } from "@prisma/client";
import { SEED_TELLS } from "../lib/tells/seed-tells";

config();

async function main() {
  const prisma = new PrismaClient();

  console.log(`Seeding ${SEED_TELLS.length} Tell rows…`);

  // Today's UTC midnight as the base date. Each Tell gets +N days.
  const base = new Date();
  base.setUTCHours(0, 0, 0, 0);

  let i = 0;
  for (const t of SEED_TELLS) {
    const scheduleDate = new Date(base.getTime() + i * 86_400_000);
    const slug = slugify(t.id);

    await prisma.tell.upsert({
      where: { id: t.id },
      update: {
        number: t.number,
        slug,
        format: t.format,
        track: t.track,
        axes: t.axes,
        difficulty: t.difficulty,
        artifact: t.artifact as unknown as Prisma.InputJsonValue,
        question: t.question,
        choices: t.choices as unknown as Prisma.InputJsonValue,
        reveal: t.reveal,
        scheduleDate,
        status: "PUBLISHED",
      },
      create: {
        id: t.id,
        number: t.number,
        slug,
        format: t.format,
        track: t.track,
        axes: t.axes,
        difficulty: t.difficulty,
        artifact: t.artifact as unknown as Prisma.InputJsonValue,
        question: t.question,
        choices: t.choices as unknown as Prisma.InputJsonValue,
        reveal: t.reveal,
        scheduleDate,
        status: "PUBLISHED",
      },
    });

    console.log(
      `  upserted ${t.id} (#${t.number}, ${t.track}) → ${scheduleDate.toISOString().slice(0, 10)}`,
    );
    i++;
  }

  await prisma.$disconnect();
  console.log("\nDone.");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
