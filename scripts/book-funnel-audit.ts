/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

async function main() {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  console.log("=== Last 30 days, COMPLETED purchases by type/variant ===");
  const purchases = await prisma.$queryRawUnsafe<Array<{ type: string; productVariant: string | null; n: bigint; revenue: number }>>(
    `SELECT type, "productVariant", COUNT(*)::bigint AS n, SUM(amount)::float AS revenue
     FROM "Purchase"
     WHERE status = 'COMPLETED' AND "createdAt" >= $1
     GROUP BY type, "productVariant"
     ORDER BY n DESC`,
    since,
  );
  console.table(
    purchases.map((p) => ({ type: p.type, variant: p.productVariant, count: Number(p.n), revenue: p.revenue })),
  );

  console.log("\n=== Same window, INNER_CIRCLE membership state changes ===");
  const memberships = await prisma.$queryRawUnsafe<Array<{ status: string; n: bigint }>>(
    `SELECT status, COUNT(*)::bigint AS n
     FROM "CommunityMembership"
     WHERE "appliedAt" >= $1 OR "activatedAt" >= $1
     GROUP BY status`,
    since,
  );
  console.table(memberships.map((m) => ({ status: m.status, count: Number(m.n) })));

  console.log("\n=== Book buyers in last 30d: did they take the quiz first? ===");
  const bookBuyerQuizFlow = await prisma.$queryRawUnsafe<Array<{ bucket: string; n: bigint }>>(
    `WITH book_buyers AS (
       SELECT DISTINCT LOWER("customerEmail") AS email, MIN("createdAt") AS bought_at
       FROM "Purchase"
       WHERE status = 'COMPLETED'
         AND "createdAt" >= $1
         AND (type::text = 'BOOK'
              OR "productVariant" IN ('BOOK','BOOK_CONSILIUM_1MO','BOOK_CONSILIUM_3MO'))
       GROUP BY LOWER("customerEmail")
     ),
     joined AS (
       SELECT
         bb.email,
         bb.bought_at,
         q.id AS quiz_id,
         q."createdAt" AS quiz_at,
         q.paid AS quiz_paid
       FROM book_buyers bb
       LEFT JOIN LATERAL (
         SELECT id, "createdAt", paid
         FROM "QuizResult"
         WHERE LOWER(email) = bb.email
         ORDER BY "createdAt" ASC
         LIMIT 1
       ) q ON TRUE
     )
     SELECT
       CASE
         WHEN quiz_id IS NULL THEN 'no_quiz'
         WHEN quiz_at <= bought_at AND quiz_paid THEN 'paid_quiz_before_book'
         WHEN quiz_at <= bought_at AND NOT quiz_paid THEN 'free_quiz_before_book'
         WHEN quiz_at > bought_at THEN 'quiz_after_book'
         ELSE 'unknown'
       END AS bucket,
       COUNT(*)::bigint AS n
     FROM joined
     GROUP BY bucket
     ORDER BY n DESC`,
    since,
  );
  console.table(bookBuyerQuizFlow.map((r) => ({ bucket: r.bucket, count: Number(r.n) })));

  console.log("\n=== Quiz takers in last 30d: how many bought the book? ===");
  const quizToBook = await prisma.$queryRawUnsafe<Array<{ bucket: string; n: bigint }>>(
    `WITH q AS (
       SELECT DISTINCT LOWER(email) AS email, MIN("createdAt") AS quiz_at, BOOL_OR(paid) AS any_paid
       FROM "QuizResult"
       WHERE "createdAt" >= $1 AND email IS NOT NULL
       GROUP BY LOWER(email)
     ),
     bought AS (
       SELECT DISTINCT LOWER("customerEmail") AS email, MIN("createdAt") AS bought_at
       FROM "Purchase"
       WHERE status = 'COMPLETED'
         AND (type::text = 'BOOK'
              OR "productVariant" IN ('BOOK','BOOK_CONSILIUM_1MO','BOOK_CONSILIUM_3MO'))
       GROUP BY LOWER("customerEmail")
     )
     SELECT
       CASE
         WHEN b.email IS NULL THEN 'quiz_only'
         WHEN b.bought_at >= q.quiz_at AND q.any_paid THEN 'paid_quiz_then_book'
         WHEN b.bought_at >= q.quiz_at AND NOT q.any_paid THEN 'free_quiz_then_book'
         WHEN b.bought_at < q.quiz_at THEN 'book_then_quiz'
         ELSE 'unknown'
       END AS bucket,
       COUNT(*)::bigint AS n
     FROM q
     LEFT JOIN bought b ON b.email = q.email
     GROUP BY bucket
     ORDER BY n DESC`,
    since,
  );
  console.table(quizToBook.map((r) => ({ bucket: r.bucket, count: Number(r.n) })));

  console.log("\n=== Subscriber table (email capture) — last 30d sources ===");
  const subs = await prisma.$queryRawUnsafe<Array<{ source: string; n: bigint }>>(
    `SELECT source, COUNT(*)::bigint AS n
     FROM "Subscriber"
     WHERE "createdAt" >= $1
     GROUP BY source
     ORDER BY n DESC`,
    since,
  );
  console.table(subs.map((s) => ({ source: s.source, count: Number(s.n) })));

  console.log("\n=== Subscribers who later bought the book ===");
  const subToBook = await prisma.$queryRawUnsafe<Array<{ source: string; subs: bigint; bought: bigint }>>(
    `SELECT
       s.source,
       COUNT(DISTINCT s.email)::bigint AS subs,
       COUNT(DISTINCT CASE WHEN p.email IS NOT NULL THEN s.email END)::bigint AS bought
     FROM (
       SELECT LOWER(email) AS email, source, "createdAt" FROM "Subscriber" WHERE "createdAt" >= $1
     ) s
     LEFT JOIN (
       SELECT DISTINCT LOWER("customerEmail") AS email, MIN("createdAt") AS bought_at
       FROM "Purchase"
       WHERE status = 'COMPLETED'
         AND (type::text = 'BOOK'
              OR "productVariant" IN ('BOOK','BOOK_CONSILIUM_1MO','BOOK_CONSILIUM_3MO'))
       GROUP BY LOWER("customerEmail")
     ) p ON p.email = s.email AND p.bought_at >= s."createdAt"
     GROUP BY s.source
     ORDER BY subs DESC`,
    since,
  );
  console.table(
    subToBook.map((r) => ({
      source: r.source,
      subs: Number(r.subs),
      bought_book: Number(r.bought),
      conv_pct: Number(r.subs) ? ((Number(r.bought) / Number(r.subs)) * 100).toFixed(1) + "%" : "-",
    })),
  );

  console.log("\n=== Top UTM sources for book purchases in last 30d (joined via User) ===");
  const utm = await prisma.$queryRawUnsafe<Array<{ utmSource: string | null; utmMedium: string | null; utmCampaign: string | null; n: bigint }>>(
    `SELECT u."utmSource", u."utmMedium", u."utmCampaign", COUNT(*)::bigint AS n
     FROM "Purchase" p
     LEFT JOIN "User" u ON u.id = p."userId"
     WHERE p.status = 'COMPLETED'
       AND p."createdAt" >= $1
       AND (p.type::text = 'BOOK'
            OR p."productVariant" IN ('BOOK','BOOK_CONSILIUM_1MO','BOOK_CONSILIUM_3MO'))
     GROUP BY u."utmSource", u."utmMedium", u."utmCampaign"
     ORDER BY n DESC
     LIMIT 15`,
    since,
  );
  console.table(
    utm.map((r) => ({
      source: r.utmSource ?? "(none)",
      medium: r.utmMedium ?? "(none)",
      campaign: r.utmCampaign ?? "(none)",
      count: Number(r.n),
    })),
  );

  console.log("\n=== Time-to-purchase from quiz: median minutes for paid_quiz_then_book ===");
  const ttp = await prisma.$queryRawUnsafe<Array<{ p50: number | null; p90: number | null; n: bigint }>>(
    `WITH paired AS (
       SELECT
         q."createdAt" AS quiz_at,
         p."createdAt" AS bought_at,
         EXTRACT(EPOCH FROM (p."createdAt" - q."createdAt")) / 60.0 AS mins
       FROM "QuizResult" q
       JOIN "Purchase" p
         ON LOWER(p."customerEmail") = LOWER(q.email)
        AND p.status = 'COMPLETED'
        AND (p.type::text = 'BOOK'
             OR p."productVariant" IN ('BOOK','BOOK_CONSILIUM_1MO','BOOK_CONSILIUM_3MO'))
        AND p."createdAt" >= q."createdAt"
       WHERE q."createdAt" >= $1 AND q.email IS NOT NULL
     )
     SELECT
       PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY mins)::float AS p50,
       PERCENTILE_DISC(0.9) WITHIN GROUP (ORDER BY mins)::float AS p90,
       COUNT(*)::bigint AS n
     FROM paired`,
    since,
  );
  console.table(ttp.map((r) => ({ pairs: Number(r.n), median_min: r.p50, p90_min: r.p90 })));

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
