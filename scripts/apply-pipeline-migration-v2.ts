/**
 * Add the full 60-second architecture fields to ContentIdea:
 * setup, deepening, close beat, tail, deepening/close mechanisms, video format.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/apply-pipeline-migration-v2.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding 60-second architecture fields to ContentIdea...');

  const stmts = [
    // 8-15s — orient the viewer
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "setup" TEXT`,
    // 30-45s — the deepening beat
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "deepening" TEXT`,
    // SECOND_EXAMPLE | OBJECTION_HANDLE | PERSONAL_DISCLOSURE | ESCALATION
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "deepeningMechanism" TEXT`,
    // 45-55s — the close beat (separate from previous "close the loop" mechanism)
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "closeBeat" TEXT`,
    // FRAMEWORK_SUMMARY | PROTECTIVE_HANDOFF | DIAGNOSTIC_QUESTION | IMPLIED_CATALOGUE
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "closeMechanism" TEXT`,
    // 55-60s — optional rewatch trigger
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "tail" TEXT`,
    // LONG (45-60s) | SHORT (15-25s)
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "videoFormat" TEXT NOT NULL DEFAULT 'LONG'`,
  ];

  for (const sql of stmts) {
    process.stdout.write(`  ${sql.slice(0, 70)}... `);
    await prisma.$executeRawUnsafe(sql);
    console.log('OK');
  }

  const migrationName = '20260428100000_add_full_60s_architecture_fields';
  const exists = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "_prisma_migrations" WHERE migration_name = ${migrationName}
  `;
  if (Number(exists[0].count) === 0) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "_prisma_migrations" (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
      VALUES (gen_random_uuid(), 'manual-apply', '${migrationName}', NOW(), NOW(), 1)
    `);
    console.log(`  ✓ Recorded migration ${migrationName}`);
  } else {
    console.log(`  ✓ Migration ${migrationName} already recorded`);
  }

  const cols = await prisma.$queryRaw<{ column_name: string }[]>`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'ContentIdea' ORDER BY ordinal_position
  `;
  console.log('\nFinal columns:');
  cols.forEach((c) => console.log(`  ${c.column_name}`));

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
