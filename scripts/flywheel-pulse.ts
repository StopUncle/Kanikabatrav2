/**
 * Read-only pulse on the ad → quiz → book → Consilium flywheel.
 * Run: DATABASE_URL=<prod-public-url> npx tsx scripts/flywheel-pulse.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  console.log('\n=== REVENUE & PURCHASES ===');
  for (const [label, since] of [['7d', d7], ['30d', d30]] as const) {
    const rows = await prisma.$queryRaw<{ type: string; variant: string | null; cnt: bigint; rev: number }[]>`
      SELECT "type"::text, "productVariant" as variant, COUNT(*) as cnt, COALESCE(SUM("amount"), 0) as rev
      FROM "Purchase"
      WHERE "createdAt" >= ${since} AND "status" = 'COMPLETED'
      GROUP BY 1, 2
      ORDER BY 4 DESC
    `;
    const total = rows.reduce((s, r) => s + Number(r.rev), 0);
    const totalCount = rows.reduce((s, r) => s + Number(r.cnt), 0);
    console.log(`\n--- last ${label} ---  $${total.toFixed(2)} from ${totalCount} purchases`);
    rows.forEach((r) => {
      const label2 = r.variant ? `${r.type}/${r.variant}` : r.type;
      console.log(`  ${label2.padEnd(28)} ${String(Number(r.cnt)).padStart(4)}× = $${Number(r.rev).toFixed(2)}`);
    });
  }

  console.log('\n\n=== TOP-OF-FUNNEL (humans only) ===');
  for (const [label, since] of [['7d', d7], ['30d', d30]] as const) {
    const newUsers = await prisma.user.count({ where: { createdAt: { gte: since }, isBot: false } });
    const quizAttempts = await prisma.quizResult.count({ where: { createdAt: { gte: since } } });
    const quizPaid = await prisma.quizResult.count({ where: { createdAt: { gte: since }, paid: true } });
    console.log(`\n--- last ${label} ---`);
    console.log(`  new registrations:    ${newUsers}`);
    console.log(`  quiz attempts:        ${quizAttempts}`);
    console.log(`  quiz paid unlocks:    ${quizPaid}`);
  }

  console.log('\n\n=== CONSILIUM MEMBERSHIP STATE ===');
  const memberByStatus = await prisma.communityMembership.groupBy({ by: ['status'], _count: true });
  memberByStatus.sort((a, b) => b._count - a._count).forEach((r) => {
    console.log(`  ${r.status.padEnd(12)} ${r._count}`);
  });
  for (const [label, since] of [['7d', d7], ['30d', d30]] as const) {
    const newApps = await prisma.communityMembership.count({ where: { createdAt: { gte: since } } });
    const wentActive = await prisma.communityMembership.count({
      where: { createdAt: { gte: since }, status: 'ACTIVE' },
    });
    console.log(`  new applications ${label}: ${newApps}    -> ACTIVE: ${wentActive}`);
  }

  console.log('\n\n=== TRAFFIC ATTRIBUTION (last 30d) ===');
  const userBySource = await prisma.$queryRaw<{ src: string | null; cnt: bigint }[]>`
    SELECT COALESCE("utmSource", '(untagged)') as src, COUNT(*) as cnt
    FROM "User"
    WHERE "createdAt" >= ${d30} AND "isBot" = false
    GROUP BY 1 ORDER BY 2 DESC
  `;
  console.log('User registrations by utm_source:');
  userBySource.forEach((r) => console.log(`  ${(r.src ?? '').padEnd(20)} ${Number(r.cnt)}`));

  const quizBySource = await prisma.$queryRaw<{ src: string | null; cnt: bigint }[]>`
    SELECT COALESCE("utmSource", '(untagged)') as src, COUNT(*) as cnt
    FROM "QuizResult"
    WHERE "createdAt" >= ${d30}
    GROUP BY 1 ORDER BY 2 DESC
  `;
  console.log('\nQuiz attempts by utm_source:');
  quizBySource.forEach((r) => console.log(`  ${(r.src ?? '').padEnd(20)} ${Number(r.cnt)}`));

  console.log('\n\n=== DAILY REVENUE (last 14d) ===');
  const d14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const dailyRows = await prisma.$queryRaw<{ day: Date; cnt: bigint; rev: number }[]>`
    SELECT date_trunc('day', "createdAt")::date as day,
           COUNT(*) as cnt,
           COALESCE(SUM("amount"), 0) as rev
    FROM "Purchase"
    WHERE "createdAt" >= ${d14} AND "status" = 'COMPLETED'
    GROUP BY 1 ORDER BY 1 DESC
  `;
  dailyRows.forEach((r) => {
    const day = r.day instanceof Date ? r.day.toISOString().slice(0, 10) : String(r.day).slice(0, 10);
    console.log(`  ${day}  ${String(Number(r.cnt)).padStart(3)}× = $${Number(r.rev).toFixed(2)}`);
  });

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
