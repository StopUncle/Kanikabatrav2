/**
 * Apply the 20260428000000_add_content_idea_pipeline_fields migration to prod.
 * Run: DATABASE_URL=<prod> npx tsx scripts/apply-pipeline-migration.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding pipeline fields to ContentIdea...');

  // Each column added separately so partial failure is recoverable.
  const stmts = [
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "line2" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "line3" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "hookType" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "line2Mechanism" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "line3Mechanism" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "frame" TEXT`,
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "developmentStage" TEXT NOT NULL DEFAULT 'CONCEPT'`,
    `CREATE INDEX IF NOT EXISTS "ContentIdea_developmentStage_idx" ON "ContentIdea"("developmentStage")`,
  ];

  for (const sql of stmts) {
    process.stdout.write(`  ${sql.slice(0, 70)}... `);
    await prisma.$executeRawUnsafe(sql);
    console.log('OK');
  }

  // Mark the migration as applied in Prisma's _prisma_migrations table so
  // future `prisma migrate deploy` doesn't re-attempt it.
  const migrationName = '20260428000000_add_content_idea_pipeline_fields';
  const exists = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "_prisma_migrations" WHERE migration_name = ${migrationName}
  `;
  if (Number(exists[0].count) === 0) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "_prisma_migrations" (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
      VALUES (gen_random_uuid(), 'manual-apply', '${migrationName}', NOW(), NOW(), 1)
    `);
    console.log(`  ✓ Recorded migration ${migrationName} in _prisma_migrations`);
  } else {
    console.log(`  ✓ Migration ${migrationName} already recorded`);
  }

  // Sanity check: count rows + show schema.
  const ideaCount = await prisma.contentIdea.count();
  console.log(`\nContentIdea total rows: ${ideaCount}`);

  const cols = await prisma.$queryRaw<{ column_name: string; data_type: string }[]>`
    SELECT column_name, data_type FROM information_schema.columns
    WHERE table_name = 'ContentIdea' ORDER BY ordinal_position
  `;
  console.log('\nFinal ContentIdea columns:');
  cols.forEach((c) => console.log(`  ${c.column_name.padEnd(20)} ${c.data_type}`));

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
