/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

async function main() {
  // 1. Why are only 9 of 63 paid quiz unlocks getting credits?
  console.log("=== Paid quiz unlocks vs credit generation ===");
  const breakdown = await prisma.$queryRawUnsafe<
    Array<{
      total_paid: bigint;
      with_credit: bigint;
      without_credit: bigint;
      with_paypal_id: bigint;
      with_stripe_id: bigint;
      no_purchase_link: bigint;
    }>
  >(
    `SELECT
       COUNT(*)::bigint AS total_paid,
       SUM(CASE WHEN "consiliumCreditCode" IS NOT NULL THEN 1 ELSE 0 END)::bigint AS with_credit,
       SUM(CASE WHEN "consiliumCreditCode" IS NULL THEN 1 ELSE 0 END)::bigint AS without_credit,
       SUM(CASE WHEN "paypalOrderId" IS NOT NULL THEN 1 ELSE 0 END)::bigint AS with_paypal_id,
       SUM(CASE WHEN "paypalOrderId" LIKE 'ST-%' THEN 1 ELSE 0 END)::bigint AS with_stripe_id,
       SUM(CASE WHEN "paypalOrderId" IS NULL THEN 1 ELSE 0 END)::bigint AS no_purchase_link
     FROM "QuizResult"
     WHERE paid = true AND "createdAt" >= $1`,
    since,
  );
  console.table(breakdown);

  // Of the ones without credit, are they pre-2026-04-25 (before credits launched)?
  const noCreditByDate = await prisma.$queryRawUnsafe<
    Array<{ week: string; n: bigint }>
  >(
    `SELECT TO_CHAR(DATE_TRUNC('week', "createdAt"), 'YYYY-MM-DD') AS week,
            COUNT(*)::bigint AS n
     FROM "QuizResult"
     WHERE paid = true AND "consiliumCreditCode" IS NULL AND "createdAt" >= $1
     GROUP BY 1 ORDER BY 1`,
    since,
  );
  console.log("\nPaid quiz with NO credit, by week:");
  console.table(noCreditByDate.map((r) => ({ week: r.week, count: Number(r.n) })));

  // 2. Q&A pack: do non-members even know they exist? Check member counts vs pack sales
  console.log("\n=== Q&A pack visibility check ===");
  const askLifetime = await prisma.$queryRawUnsafe<
    Array<{ variant: string; n: bigint; revenue: number }>
  >(
    `SELECT "productVariant" AS variant, COUNT(*)::bigint AS n, SUM(amount)::float AS revenue
     FROM "Purchase"
     WHERE status = 'COMPLETED' AND "productVariant" LIKE 'ASK_%'
     GROUP BY "productVariant"
     ORDER BY "productVariant"`,
  );
  if (askLifetime.length === 0) {
    console.log("  ZERO ASK_* purchases lifetime.");
  } else {
    console.table(askLifetime.map((r) => ({ variant: r.variant, count: Number(r.n), revenue: r.revenue })));
  }

  // 3. Tells engagement (live spike per user memory)
  console.log("\n=== Tells engagement ===");
  const tells = await prisma.$queryRawUnsafe<
    Array<{ total: bigint; in_window: bigint }>
  >(
    `SELECT
       (SELECT COUNT(*)::bigint FROM "Tell") AS total,
       (SELECT COUNT(*)::bigint FROM "Tell" WHERE "createdAt" >= $1) AS in_window`,
    since,
  );
  console.log(`  Total Tells: ${Number(tells[0].total)}, in 30d: ${Number(tells[0].in_window)}`);

  const responses = await prisma.$queryRawUnsafe<
    Array<{ total: bigint; in_window: bigint; unique_users: bigint }>
  >(
    `SELECT
       (SELECT COUNT(*)::bigint FROM "TellResponse") AS total,
       (SELECT COUNT(*)::bigint FROM "TellResponse" WHERE "answeredAt" >= $1) AS in_window,
       (SELECT COUNT(DISTINCT "userId")::bigint FROM "TellResponse" WHERE "answeredAt" >= $1) AS unique_users`,
    since,
  );
  const t = responses[0];
  console.log(`  Tell responses, total: ${Number(t.total)}, 30d: ${Number(t.in_window)}, unique users 30d: ${Number(t.unique_users)}`);

  // InstinctScore is one row per user, updated in place on every scored
  // response — there is no createdAt, so "active in window" reads off
  // updatedAt. Total rows = lifetime players who ever scored.
  const instinct = await prisma.$queryRawUnsafe<
    Array<{ total_rows: bigint; active_in_window: bigint }>
  >(
    `SELECT
       COUNT(*)::bigint AS total_rows,
       COUNT(*) FILTER (WHERE "updatedAt" >= $1)::bigint AS active_in_window
     FROM "InstinctScore"`,
    since,
  );
  console.log(`  InstinctScore rows total: ${Number(instinct[0].total_rows)}, active in 30d: ${Number(instinct[0].active_in_window)}`);

  // 4. Member vs non-member question packs (Q&A)
  const memberQ = await prisma.$queryRawUnsafe<
    Array<{ status: string; n: bigint }>
  >(
    `SELECT status, COUNT(*)::bigint AS n FROM "MemberQuestion"
     GROUP BY status ORDER BY status`,
  );
  console.log("\n  MemberQuestion lifetime counts:");
  console.table(memberQ.map((r) => ({ status: r.status, count: Number(r.n) })));

  // 5. Bundle conversion: BOOK_CONSILIUM_1MO buyers — did they renew or churn?
  console.log("\n=== Bundle (BOOK_CONSILIUM_1MO/3MO) follow-through ===");
  const bundleFollowup = await prisma.$queryRawUnsafe<
    Array<{
      variant: string;
      bundle_buyers: bigint;
      became_recurring: bigint;
    }>
  >(
    `SELECT
       p."productVariant" AS variant,
       COUNT(DISTINCT p.id)::bigint AS bundle_buyers,
       COUNT(DISTINCT CASE WHEN m."paypalSubscriptionId" LIKE 'ST-%' AND m.status = 'ACTIVE' THEN p.id END)::bigint AS became_recurring
     FROM "Purchase" p
     LEFT JOIN "User" u ON LOWER(u.email) = LOWER(p."customerEmail")
     LEFT JOIN "CommunityMembership" m ON m."userId" = u.id
     WHERE p."productVariant" IN ('BOOK_CONSILIUM_1MO', 'BOOK_CONSILIUM_3MO')
       AND p.status = 'COMPLETED'
     GROUP BY p."productVariant"`,
  );
  if (!bundleFollowup.length) {
    console.log("  No bundle purchases lifetime.");
  } else {
    console.table(
      bundleFollowup.map((r) => ({
        variant: r.variant,
        bundle_buyers: Number(r.bundle_buyers),
        converted_to_recurring: Number(r.became_recurring),
      })),
    );
  }

  // 6. Member-priced book usage — do active members actually buy the $9.99 book?
  console.log("\n=== Member-priced book uptake ===");
  const memberBook = await prisma.$queryRawUnsafe<
    Array<{ member_book_buys: bigint; total_active_members: bigint }>
  >(
    `SELECT
       (SELECT COUNT(DISTINCT u.id)::bigint
        FROM "Purchase" p
        JOIN "User" u ON LOWER(u.email) = LOWER(p."customerEmail")
        JOIN "CommunityMembership" m ON m."userId" = u.id
        WHERE p.type = 'BOOK' AND p.status = 'COMPLETED'
          AND p."productVariant" IS NULL
          AND p.amount < 15  -- the $9.99 member tier
          AND m.status = 'ACTIVE') AS member_book_buys,
       (SELECT COUNT(*)::bigint FROM "CommunityMembership" WHERE status = 'ACTIVE') AS total_active_members`,
  );
  if (memberBook[0]) {
    console.log(`  Active members who bought the book at $9.99: ${Number(memberBook[0].member_book_buys)} / ${Number(memberBook[0].total_active_members)} active members`);
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
