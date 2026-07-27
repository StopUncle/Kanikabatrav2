/**
 * Seed the 12 Week Transformation curriculum.
 *
 * Idempotent, and safe to re-run after editing copy in
 * `lib/program/curriculum.ts`: weeks and lessons are upserted by their
 * number and order.
 *
 * It deliberately never writes `isPublished`, and never clears a `videoUrl`.
 * Re-seeding is a copy edit, not a republish, so it can never open a week
 * Kanika has not filmed or blank a video that is already live.
 *
 * Usage:
 *   npx tsx scripts/seed-transformation.ts
 *   DATABASE_URL=<prod> npx tsx scripts/seed-transformation.ts
 */

import { PrismaClient } from "@prisma/client";
import { CURRICULUM } from "../lib/program/curriculum";

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let updated = 0;

  for (const week of CURRICULUM) {
    const copy = {
      title: week.title,
      lede: week.lede,
      challenge: week.challenge,
      readingLabel: week.readingLabel ?? null,
      readingWhy: week.readingWhy ?? null,
    };

    const existing = await prisma.transformationWeek.findUnique({
      where: { weekNumber: week.weekNumber },
      select: { id: true },
    });

    const row = await prisma.transformationWeek.upsert({
      where: { weekNumber: week.weekNumber },
      // isPublished is absent from both branches on purpose.
      create: { weekNumber: week.weekNumber, ...copy },
      update: copy,
      select: { id: true },
    });

    if (existing) updated++;
    else created++;

    for (const [index, lesson] of Array.from(week.lessons.entries())) {
      await prisma.transformationLesson.upsert({
        where: { weekId_orderIndex: { weekId: row.id, orderIndex: index } },
        create: {
          weekId: row.id,
          orderIndex: index,
          title: lesson.title,
          notes: lesson.notes ?? null,
        },
        // videoUrl, posterUrl and duration are left alone: they are set by
        // the admin uploader and a copy re-seed must never blank them.
        update: { title: lesson.title, notes: lesson.notes ?? null },
      });
    }

    // Lessons removed from the curriculum should not linger in the DB.
    await prisma.transformationLesson.deleteMany({
      where: { weekId: row.id, orderIndex: { gte: week.lessons.length } },
    });
  }

  const published = await prisma.transformationWeek.count({
    where: { isPublished: true },
  });
  const withVideo = await prisma.transformationLesson.count({
    where: { videoUrl: { not: null } },
  });
  const totalLessons = await prisma.transformationLesson.count();

  console.log(`Weeks created: ${created}, updated: ${updated}.`);
  console.log(`Published weeks: ${published}/${CURRICULUM.length}.`);
  console.log(`Lessons with video: ${withVideo}/${totalLessons}.`);
  if (published === 0) {
    console.log(
      "\nNothing is published yet, which is correct for a fresh seed.\n" +
        "Publish a week from /admin/transformation once its videos are up.",
    );
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
