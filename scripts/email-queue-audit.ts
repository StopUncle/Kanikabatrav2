/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

async function main() {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  console.log("=== EmailQueue last 30d by sequence + status ===");
  const rows = await prisma.$queryRawUnsafe<
    Array<{ sequence: string; status: string; n: bigint }>
  >(
    `SELECT sequence, status, COUNT(*)::bigint AS n
     FROM "EmailQueue"
     WHERE "createdAt" >= $1
     GROUP BY sequence, status
     ORDER BY sequence, status`,
    since,
  );
  console.table(rows.map((r) => ({ sequence: r.sequence, status: r.status, count: Number(r.n) })));

  console.log("\n=== Consilium credit codes generated vs redeemed (30d) ===");
  const credits = await prisma.$queryRawUnsafe<
    Array<{ generated: bigint; redeemed: bigint }>
  >(
    `WITH gen AS (
       SELECT COUNT(*)::bigint AS n FROM "QuizResult"
       WHERE "consiliumCreditCode" IS NOT NULL AND "createdAt" >= $1
     ),
     red AS (
       SELECT COUNT(DISTINCT q.id)::bigint AS n
       FROM "QuizResult" q
       JOIN "User" u ON LOWER(u.email) = LOWER(q.email)
       JOIN "CommunityMembership" m ON m."userId" = u.id
       WHERE q."consiliumCreditCode" IS NOT NULL
         AND q."createdAt" >= $1
         AND m.status = 'ACTIVE'
         AND m."activatedAt" >= q."createdAt"
     )
     SELECT (SELECT n FROM gen) AS generated, (SELECT n FROM red) AS redeemed`,
    since,
  );
  const c = credits[0];
  console.log(
    `Generated: ${Number(c.generated)} | Activated-after-quiz Consilium: ${Number(c.redeemed)} | conversion ${Number(c.generated) ? ((Number(c.redeemed) / Number(c.generated)) * 100).toFixed(1) : 0}%`,
  );

  console.log("\n=== Subscribers (mini-quiz) who later joined Consilium ===");
  const subToCons = await prisma.$queryRawUnsafe<Array<{ source: string; subs: bigint; joined: bigint }>>(
    `SELECT
       s.source,
       COUNT(DISTINCT s.email)::bigint AS subs,
       COUNT(DISTINCT CASE WHEN m."userId" IS NOT NULL THEN s.email END)::bigint AS joined
     FROM (SELECT LOWER(email) AS email, source, "createdAt" FROM "Subscriber" WHERE "createdAt" >= $1) s
     LEFT JOIN "User" u ON LOWER(u.email) = s.email
     LEFT JOIN "CommunityMembership" m
       ON m."userId" = u.id AND m.status = 'ACTIVE' AND m."activatedAt" >= s."createdAt"
     GROUP BY s.source
     ORDER BY subs DESC`,
    since,
  );
  console.table(
    subToCons.map((r) => ({
      source: r.source,
      subs: Number(r.subs),
      joined_consilium: Number(r.joined),
      conv_pct: Number(r.subs) ? ((Number(r.joined) / Number(r.subs)) * 100).toFixed(1) + "%" : "-",
    })),
  );

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
