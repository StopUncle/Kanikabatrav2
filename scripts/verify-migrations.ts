/**
 * Verify the three pending migrations actually landed.
 * Read-only — just SELECTs the new columns / indexes to confirm.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) completionCount column on SimulatorProgress
  const simRows = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'SimulatorProgress'
      AND column_name = 'completionCount'
  `;
  console.log("SimulatorProgress.completionCount:", simRows.length > 0 ? "✓ exists" : "✗ MISSING");

  // 2) Quiz Consilium credit columns
  const quizCreditCols = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'QuizResult'
      AND column_name IN ('consiliumCreditCode', 'consiliumCreditExpiresAt')
  `;
  console.log(`QuizResult credit fields: ${quizCreditCols.length}/2 present`);
  for (const c of quizCreditCols) console.log(`  ✓ ${c.column_name}`);

  // 3) Attribution columns on User
  const userAttrCols = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'User'
      AND column_name IN (
        'utmSource','utmMedium','utmCampaign','utmContent','utmTerm',
        'gclid','fbclid','ttclid','referrer','landingPage',
        'userAgent','ipCountry','language','timezone'
      )
    ORDER BY column_name
  `;
  console.log(`User attribution fields: ${userAttrCols.length}/14 present`);
  if (userAttrCols.length < 14) {
    console.log(`  Present: ${userAttrCols.map((c) => c.column_name).join(", ")}`);
  }

  // 4) Attribution columns on QuizResult
  const quizAttrCols = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'QuizResult'
      AND column_name IN (
        'utmSource','utmMedium','utmCampaign','utmContent','utmTerm',
        'gclid','fbclid','ttclid','referrer','landingPage',
        'userAgent','ipCountry','language','timezone'
      )
    ORDER BY column_name
  `;
  console.log(`QuizResult attribution fields: ${quizAttrCols.length}/14 present`);
  if (quizAttrCols.length < 14) {
    console.log(`  Present: ${quizAttrCols.map((c) => c.column_name).join(", ")}`);
  }

  // 5) Indexes
  const indexes = await prisma.$queryRaw<Array<{ indexname: string }>>`
    SELECT indexname
    FROM pg_indexes
    WHERE tablename IN ('User','QuizResult','SimulatorProgress')
      AND indexname IN (
        'User_utmSource_idx','User_utmCampaign_idx',
        'QuizResult_utmSource_idx','QuizResult_utmCampaign_idx',
        'QuizResult_consiliumCreditCode_key'
      )
    ORDER BY indexname
  `;
  console.log(`\nIndexes: ${indexes.length}/5 present`);
  for (const i of indexes) console.log(`  ✓ ${i.indexname}`);

  // 6) Migration history
  const history = await prisma.$queryRaw<
    Array<{ migration_name: string; finished_at: Date | null }>
  >`
    SELECT migration_name, finished_at
    FROM "_prisma_migrations"
    WHERE migration_name LIKE '%2026042500%'
       OR migration_name LIKE '%2026042512%'
       OR migration_name LIKE '%2026042513%'
    ORDER BY migration_name
  `;
  console.log(`\nMigration history (today's three):`);
  for (const m of history) {
    console.log(
      `  ${m.finished_at ? "✓" : "⚠"} ${m.migration_name}  ${m.finished_at ? m.finished_at.toISOString() : "(unfinished)"}`,
    );
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
