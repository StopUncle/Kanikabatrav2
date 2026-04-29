/**
 * Add ContentIdea.confessionId FK → ContentConfession.
 * Run: DATABASE_URL=<prod> npx tsx scripts/apply-confession-fk.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding confessionId FK to ContentIdea...');

  const stmts = [
    `ALTER TABLE "ContentIdea" ADD COLUMN IF NOT EXISTS "confessionId" TEXT`,
    // Drop existing constraint if re-running, then re-add (idempotent)
    `DO $$ BEGIN
       ALTER TABLE "ContentIdea"
         ADD CONSTRAINT "ContentIdea_confessionId_fkey"
         FOREIGN KEY ("confessionId") REFERENCES "ContentConfession"("id") ON DELETE SET NULL;
     EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `CREATE INDEX IF NOT EXISTS "ContentIdea_confessionId_idx" ON "ContentIdea"("confessionId")`,
  ];

  for (const sql of stmts) {
    process.stdout.write(`  ${sql.slice(0, 70).replace(/\s+/g, ' ')}... `);
    await prisma.$executeRawUnsafe(sql);
    console.log('OK');
  }

  const migrationName = '20260428300000_add_content_idea_confession_fk';
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
