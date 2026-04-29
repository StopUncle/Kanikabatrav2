/**
 * Add ContentConfession bank to prod.
 * Run: DATABASE_URL=<prod> npx tsx scripts/apply-confession-migration.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating ContentConfession table...');

  const stmts = [
    `CREATE TABLE IF NOT EXISTS "ContentConfession" (
       "id"         TEXT PRIMARY KEY,
       "category"   TEXT NOT NULL,
       "text"       TEXT NOT NULL,
       "tier"       TEXT NOT NULL DEFAULT 'STANDARD',
       "placement"  TEXT,
       "usedCount"  INTEGER NOT NULL DEFAULT 0,
       "lastUsedAt" TIMESTAMP(3),
       "notes"      TEXT,
       "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
       "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
     )`,
    `CREATE INDEX IF NOT EXISTS "ContentConfession_category_idx" ON "ContentConfession"("category")`,
    `CREATE INDEX IF NOT EXISTS "ContentConfession_tier_idx" ON "ContentConfession"("tier")`,
  ];

  for (const sql of stmts) {
    process.stdout.write(`  ${sql.slice(0, 70)}... `);
    await prisma.$executeRawUnsafe(sql);
    console.log('OK');
  }

  const migrationName = '20260428200000_add_content_confession_bank';
  const exists = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "_prisma_migrations" WHERE migration_name = ${migrationName}
  `;
  if (Number(exists[0].count) === 0) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "_prisma_migrations" (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
      VALUES (gen_random_uuid(), 'manual-apply', '${migrationName}', NOW(), NOW(), 1)
    `);
    console.log(`  ✓ Recorded migration ${migrationName}`);
  }

  const cnt = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint as count FROM "ContentConfession"
  `;
  console.log(`\nContentConfession rows: ${Number(cnt[0].count)}`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
