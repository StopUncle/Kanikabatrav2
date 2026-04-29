/**
 * Add Tier 1 retention infrastructure to prod:
 *   - User.simulatorStreakCurrent / simulatorStreakLongest / simulatorLastSession
 *   - SimulatorProgress.endingsReached (text[])
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/apply-simulator-retention-migration.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding simulator retention fields to prod...');

  const stmts = [
    // Daily streak — three columns on User
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "simulatorStreakCurrent" INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "simulatorStreakLongest" INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "simulatorLastSession" TIMESTAMP(3)`,

    // Endings tracking — array of endSceneIds the user has reached, per scenario.
    // Length of this array vs scenario.scenes.filter(isEnding).length =
    // "X / Y endings found" displayed on catalog cards.
    `ALTER TABLE "SimulatorProgress" ADD COLUMN IF NOT EXISTS "endingsReached" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[]`,
  ];

  for (const sql of stmts) {
    process.stdout.write(`  ${sql.slice(0, 80).replace(/\s+/g, ' ')}... `);
    await prisma.$executeRawUnsafe(sql);
    console.log('OK');
  }

  // Backfill: any SimulatorProgress row with an outcome already has at least
  // one ending reached. Seed the array with currentSceneId where empty.
  await prisma.$executeRawUnsafe(`
    UPDATE "SimulatorProgress"
    SET "endingsReached" = ARRAY["currentSceneId"]
    WHERE "outcome" IS NOT NULL
      AND "completedAt" IS NOT NULL
      AND ("endingsReached" IS NULL OR cardinality("endingsReached") = 0)
  `);
  const backfilled = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "SimulatorProgress"
    WHERE cardinality("endingsReached") > 0
  `;
  console.log(`  ✓ Backfilled endingsReached on ${Number(backfilled[0].count)} rows`);

  const migrationName = '20260429000000_simulator_retention_tier1';
  const exists = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "_prisma_migrations" WHERE migration_name = ${migrationName}
  `;
  if (Number(exists[0].count) === 0) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "_prisma_migrations" (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
      VALUES (gen_random_uuid(), 'manual-apply', '${migrationName}', NOW(), NOW(), 1)
    `);
    console.log(`  ✓ Recorded ${migrationName}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
