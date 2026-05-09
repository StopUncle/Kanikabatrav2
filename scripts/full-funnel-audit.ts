/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const days = parseInt(process.env.WINDOW_DAYS || "30", 10);
const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

function n(b: bigint | number | null | undefined): number {
  if (b === null || b === undefined) return 0;
  if (typeof b === "bigint") return Number(b);
  return b;
}

function pct(num: number, denom: number): string {
  if (!denom) return "-";
  return ((num / denom) * 100).toFixed(1) + "%";
}

async function main() {
  console.log(`\n=== FULL FUNNEL AUDIT, last ${days} days ===\n`);

  // ───────────────────────────────────────────────────────────
  // 1. TOP OF FUNNEL: User registrations + Quiz takes
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ TOP OF FUNNEL ─────────────────────────────────");

  const registrations = await prisma.$queryRawUnsafe<Array<{ n: bigint }>>(
    `SELECT COUNT(*)::bigint AS n FROM "User" WHERE "createdAt" >= $1`,
    since,
  );
  console.log(`  User registrations:     ${n(registrations[0].n)}`);

  const quizTakes = await prisma.$queryRawUnsafe<Array<{ n: bigint }>>(
    `SELECT COUNT(*)::bigint AS n FROM "QuizResult" WHERE "createdAt" >= $1`,
    since,
  );
  const quizTakesUnique = await prisma.$queryRawUnsafe<Array<{ n: bigint }>>(
    `SELECT COUNT(DISTINCT LOWER(email))::bigint AS n FROM "QuizResult"
     WHERE "createdAt" >= $1 AND email IS NOT NULL`,
    since,
  );
  console.log(`  Quiz completions:       ${n(quizTakes[0].n)} (${n(quizTakesUnique[0].n)} unique emails)`);

  const subs = await prisma.$queryRawUnsafe<Array<{ source: string; n: bigint }>>(
    `SELECT source, COUNT(*)::bigint AS n FROM "Subscriber"
     WHERE "createdAt" >= $1 GROUP BY source ORDER BY n DESC`,
    since,
  );
  console.log(`  Email captures by source:`);
  for (const s of subs) console.log(`    ${s.source.padEnd(22)} ${n(s.n)}`);

  // ───────────────────────────────────────────────────────────
  // 2. QUIZ FUNNEL
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ QUIZ FUNNEL ────────────────────────────────────");

  const quizFunnel = await prisma.$queryRawUnsafe<
    Array<{
      total: bigint;
      with_email: bigint;
      paid: bigint;
      with_credit: bigint;
    }>
  >(
    `SELECT
       COUNT(*)::bigint AS total,
       COUNT(email)::bigint AS with_email,
       SUM(CASE WHEN paid THEN 1 ELSE 0 END)::bigint AS paid,
       SUM(CASE WHEN "consiliumCreditCode" IS NOT NULL THEN 1 ELSE 0 END)::bigint AS with_credit
     FROM "QuizResult"
     WHERE "createdAt" >= $1`,
    since,
  );
  const q = quizFunnel[0];
  console.log(`  Quiz takes:                  ${n(q.total)}`);
  console.log(`    └─ with email captured:    ${n(q.with_email)} (${pct(n(q.with_email), n(q.total))})`);
  console.log(`       └─ paid $9.99 unlock:   ${n(q.paid)} (${pct(n(q.paid), n(q.with_email))} of email)`);
  console.log(`          └─ Consilium credit: ${n(q.with_credit)} (${pct(n(q.with_credit), n(q.paid))} of paid)`);

  // ───────────────────────────────────────────────────────────
  // 3. BOOK FUNNEL
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ BOOK FUNNEL ────────────────────────────────────");

  const bookFunnel = await prisma.$queryRawUnsafe<
    Array<{ variant: string | null; n: bigint; revenue: number }>
  >(
    `SELECT "productVariant" AS variant, COUNT(*)::bigint AS n, SUM(amount)::float AS revenue
     FROM "Purchase"
     WHERE status = 'COMPLETED' AND type = 'BOOK' AND "createdAt" >= $1
     GROUP BY "productVariant"
     ORDER BY n DESC`,
    since,
  );
  console.log(`  Purchases by variant (type=BOOK):`);
  let bookOnly = 0;
  let bookRev = 0;
  for (const r of bookFunnel) {
    const label = r.variant ?? "(book standalone)";
    console.log(`    ${label.padEnd(24)} ${n(r.n).toString().padStart(4)} purchases, $${r.revenue.toFixed(2)}`);
    if (r.variant === null || r.variant === "BOOK_CONSILIUM_1MO" || r.variant === "BOOK_CONSILIUM_3MO") {
      bookOnly += n(r.n);
      bookRev += r.revenue;
    }
  }
  console.log(`  → Actual books delivered:  ${bookOnly}, revenue $${bookRev.toFixed(2)}`);

  const downloadStats = await prisma.$queryRawUnsafe<
    Array<{ avg_dl: number | null; never_downloaded: bigint; ten_max: bigint }>
  >(
    `SELECT
       AVG("downloadCount")::float AS avg_dl,
       SUM(CASE WHEN "downloadCount" = 0 THEN 1 ELSE 0 END)::bigint AS never_downloaded,
       SUM(CASE WHEN "downloadCount" >= 10 THEN 1 ELSE 0 END)::bigint AS ten_max
     FROM "Purchase"
     WHERE type = 'BOOK' AND "downloadToken" IS NOT NULL AND "createdAt" >= $1
       AND status = 'COMPLETED'`,
    since,
  );
  if (downloadStats[0]) {
    const d = downloadStats[0];
    console.log(`  Book delivery health:`);
    console.log(`    avg downloads per buyer: ${d.avg_dl?.toFixed(2) ?? "n/a"}`);
    console.log(`    buyers who never opened: ${n(d.never_downloaded)}`);
    console.log(`    buyers at max (10) cap:  ${n(d.ten_max)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 4. CONSILIUM FUNNEL
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ CONSILIUM FUNNEL ───────────────────────────────");

  const consilium = await prisma.$queryRawUnsafe<
    Array<{ status: string; n: bigint }>
  >(
    `SELECT status, COUNT(*)::bigint AS n FROM "CommunityMembership"
     WHERE "appliedAt" >= $1 OR "activatedAt" >= $1 OR "cancelledAt" >= $1
     GROUP BY status`,
    since,
  );
  console.log(`  Membership state changes (activity in window):`);
  for (const c of consilium) console.log(`    ${c.status.padEnd(12)} ${n(c.n)}`);

  const totalActive = await prisma.$queryRawUnsafe<Array<{ n: bigint }>>(
    `SELECT COUNT(*)::bigint AS n FROM "CommunityMembership" WHERE status = 'ACTIVE'`,
  );
  console.log(`  TOTAL active members today: ${n(totalActive[0].n)}`);

  const billingMix = await prisma.$queryRawUnsafe<
    Array<{ type: string; n: bigint }>
  >(
    `SELECT
       CASE
         WHEN "paypalSubscriptionId" LIKE 'ST-%' THEN 'stripe-recurring'
         WHEN "paypalSubscriptionId" IS NULL THEN 'gift/trial/bundle'
         ELSE 'paypal-legacy'
       END AS type,
       COUNT(*)::bigint AS n
     FROM "CommunityMembership"
     WHERE status = 'ACTIVE'
     GROUP BY type`,
  );
  console.log(`  Active member billing mix:`);
  for (const b of billingMix) console.log(`    ${b.type.padEnd(20)} ${n(b.n)}`);

  // Churn in window
  const churn = await prisma.$queryRawUnsafe<
    Array<{ cancelled_in_window: bigint }>
  >(
    `SELECT COUNT(*)::bigint AS cancelled_in_window FROM "CommunityMembership"
     WHERE status = 'CANCELLED' AND "cancelledAt" >= $1`,
    since,
  );
  console.log(`  Cancellations in window:    ${n(churn[0].cancelled_in_window)}`);

  // Acquisition paths
  console.log(`\n  Active members activated in window, by prior touchpoint:`);
  const acquisition = await prisma.$queryRawUnsafe<
    Array<{
      total: bigint;
      from_book: bigint;
      from_quiz_paid: bigint;
      from_quiz_free: bigint;
      from_subscriber: bigint;
      cold: bigint;
    }>
  >(
    `WITH new_members AS (
       SELECT m."userId", LOWER(u.email) AS email, m."activatedAt"
       FROM "CommunityMembership" m
       JOIN "User" u ON u.id = m."userId"
       WHERE m.status = 'ACTIVE' AND m."activatedAt" >= $1
     )
     SELECT
       COUNT(*)::bigint AS total,
       SUM(CASE WHEN EXISTS (
         SELECT 1 FROM "Purchase" p
         WHERE LOWER(p."customerEmail") = nm.email
           AND p.type = 'BOOK' AND p.status = 'COMPLETED'
           AND p."productVariant" IS NULL
           AND p."createdAt" < nm."activatedAt"
       ) THEN 1 ELSE 0 END)::bigint AS from_book,
       SUM(CASE WHEN EXISTS (
         SELECT 1 FROM "QuizResult" q
         WHERE LOWER(q.email) = nm.email AND q.paid = true
           AND q."createdAt" < nm."activatedAt"
       ) THEN 1 ELSE 0 END)::bigint AS from_quiz_paid,
       SUM(CASE WHEN EXISTS (
         SELECT 1 FROM "QuizResult" q
         WHERE LOWER(q.email) = nm.email AND q.paid = false
           AND q."createdAt" < nm."activatedAt"
       ) THEN 1 ELSE 0 END)::bigint AS from_quiz_free,
       SUM(CASE WHEN EXISTS (
         SELECT 1 FROM "Subscriber" s
         WHERE s.email = nm.email AND s."createdAt" < nm."activatedAt"
       ) THEN 1 ELSE 0 END)::bigint AS from_subscriber,
       SUM(CASE WHEN NOT EXISTS (
         SELECT 1 FROM "Purchase" p WHERE LOWER(p."customerEmail") = nm.email AND p."createdAt" < nm."activatedAt"
       ) AND NOT EXISTS (
         SELECT 1 FROM "QuizResult" q WHERE LOWER(q.email) = nm.email AND q."createdAt" < nm."activatedAt"
       ) AND NOT EXISTS (
         SELECT 1 FROM "Subscriber" s WHERE s.email = nm.email AND s."createdAt" < nm."activatedAt"
       ) THEN 1 ELSE 0 END)::bigint AS cold
     FROM new_members nm`,
    since,
  );
  const a = acquisition[0];
  if (a) {
    const total = n(a.total);
    console.log(`    total new ACTIVE:        ${total}`);
    console.log(`    had bought book:         ${n(a.from_book)}`);
    console.log(`    had paid quiz unlock:    ${n(a.from_quiz_paid)}`);
    console.log(`    had taken free quiz:     ${n(a.from_quiz_free)}`);
    console.log(`    on subscriber list:      ${n(a.from_subscriber)}`);
    console.log(`    no prior touchpoint:     ${n(a.cold)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 5. COACHING FUNNEL
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ COACHING FUNNEL ────────────────────────────────");

  const coaching = await prisma.$queryRawUnsafe<
    Array<{ variant: string | null; n: bigint; revenue: number }>
  >(
    `SELECT "productVariant" AS variant, COUNT(*)::bigint AS n, SUM(amount)::float AS revenue
     FROM "Purchase"
     WHERE status = 'COMPLETED' AND type = 'COACHING' AND "createdAt" >= $1
     GROUP BY "productVariant"`,
    since,
  );
  if (coaching.length === 0) {
    console.log(`  No coaching purchases in window.`);
  } else {
    for (const r of coaching) {
      console.log(`  ${(r.variant ?? "(none)").padEnd(24)} ${n(r.n)} purchases, $${r.revenue.toFixed(2)}`);
    }
  }

  const coachingScheduled = await prisma.$queryRawUnsafe<
    Array<{ status: string; n: bigint }>
  >(
    `SELECT status, COUNT(*)::bigint AS n FROM "CoachingSession"
     WHERE "createdAt" >= $1 GROUP BY status`,
    since,
  );
  if (coachingScheduled.length) {
    console.log(`  Coaching session statuses:`);
    for (const r of coachingScheduled) console.log(`    ${r.status.padEnd(20)} ${n(r.n)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 6. Q&A PACKS
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ Q&A PACKS ──────────────────────────────────────");

  const askPacks = await prisma.$queryRawUnsafe<
    Array<{ variant: string | null; n: bigint; revenue: number }>
  >(
    `SELECT "productVariant" AS variant, COUNT(*)::bigint AS n, SUM(amount)::float AS revenue
     FROM "Purchase"
     WHERE status = 'COMPLETED'
       AND ("productVariant" LIKE 'ASK_%')
       AND "createdAt" >= $1
     GROUP BY "productVariant"`,
    since,
  );
  if (!askPacks.length) {
    console.log(`  No Q&A pack purchases in window.`);
  } else {
    for (const r of askPacks) {
      console.log(`  ${(r.variant ?? "(none)").padEnd(24)} ${n(r.n)} purchases, $${r.revenue.toFixed(2)}`);
    }
  }

  const memberQuestions = await prisma.$queryRawUnsafe<
    Array<{ status: string; n: bigint }>
  >(
    `SELECT status, COUNT(*)::bigint AS n FROM "MemberQuestion"
     WHERE "createdAt" >= $1 GROUP BY status`,
    since,
  );
  if (memberQuestions.length) {
    console.log(`  Member question pipeline:`);
    for (const r of memberQuestions) console.log(`    ${r.status.padEnd(12)} ${n(r.n)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 7. EMAIL DRIPS
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ EMAIL DRIPS (queue activity in window) ─────────");

  const drips = await prisma.$queryRawUnsafe<
    Array<{ sequence: string; status: string; n: bigint }>
  >(
    `SELECT sequence, status, COUNT(*)::bigint AS n FROM "EmailQueue"
     WHERE "createdAt" >= $1 GROUP BY sequence, status ORDER BY sequence, status`,
    since,
  );
  let curSeq = "";
  for (const d of drips) {
    if (d.sequence !== curSeq) {
      console.log(`  ${d.sequence}`);
      curSeq = d.sequence;
    }
    console.log(`    ${d.status.padEnd(10)} ${n(d.n)}`);
  }

  // Failed emails
  const failed = await prisma.$queryRawUnsafe<Array<{ n: bigint }>>(
    `SELECT COUNT(*)::bigint AS n FROM "EmailQueue"
     WHERE status = 'FAILED' AND "createdAt" >= $1`,
    since,
  );
  if (n(failed[0].n) > 0) {
    console.log(`  ⚠ FAILED emails in window: ${n(failed[0].n)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 8. CROSS-SELL SIGNALS
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ CROSS-SELL: who's buying multiple things ───────");

  const multiBuyer = await prisma.$queryRawUnsafe<
    Array<{ products: number; customers: bigint }>
  >(
    `WITH buyer_products AS (
       SELECT LOWER("customerEmail") AS email,
              COUNT(DISTINCT
                CASE
                  WHEN type = 'BOOK' AND "productVariant" IS NULL THEN 'BOOK'
                  WHEN type = 'BOOK' AND "productVariant" = 'QUIZ' THEN 'QUIZ'
                  WHEN type = 'BOOK' AND "productVariant" = 'INNER_CIRCLE' THEN 'INNER_CIRCLE'
                  WHEN type = 'BOOK' AND "productVariant" LIKE 'BOOK_CONSILIUM%' THEN 'BUNDLE'
                  WHEN type = 'COACHING' THEN 'COACHING'
                  ELSE "productVariant"
                END) AS products
       FROM "Purchase"
       WHERE status = 'COMPLETED' AND "createdAt" >= $1
       GROUP BY LOWER("customerEmail")
     )
     SELECT products::int, COUNT(*)::bigint AS customers
     FROM buyer_products
     GROUP BY products
     ORDER BY products`,
    since,
  );
  for (const m of multiBuyer) {
    console.log(`  Bought ${m.products} distinct product${m.products === 1 ? "" : "s"}: ${n(m.customers)} customers`);
  }

  // ───────────────────────────────────────────────────────────
  // 9. ATTRIBUTION (where the buyers came from)
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ ATTRIBUTION: paid-traffic sources ──────────────");

  const attrib = await prisma.$queryRawUnsafe<
    Array<{
      utmSource: string | null;
      utmMedium: string | null;
      registrations: bigint;
      buyers: bigint;
    }>
  >(
    `WITH cohort AS (
       SELECT id, "utmSource", "utmMedium", LOWER(email) AS email
       FROM "User" WHERE "createdAt" >= $1
     )
     SELECT
       c."utmSource",
       c."utmMedium",
       COUNT(DISTINCT c.id)::bigint AS registrations,
       COUNT(DISTINCT CASE WHEN p.id IS NOT NULL THEN c.id END)::bigint AS buyers
     FROM cohort c
     LEFT JOIN "Purchase" p
       ON LOWER(p."customerEmail") = c.email AND p.status = 'COMPLETED'
     GROUP BY c."utmSource", c."utmMedium"
     ORDER BY registrations DESC
     LIMIT 10`,
    since,
  );
  for (const r of attrib) {
    const src = r.utmSource ?? "(none)";
    const med = r.utmMedium ?? "(none)";
    console.log(`  ${src.padEnd(15)} / ${med.padEnd(10)} regs=${n(r.registrations).toString().padStart(3)} buyers=${n(r.buyers)}`);
  }

  // ───────────────────────────────────────────────────────────
  // 10. TELLS ENGAGEMENT
  // ───────────────────────────────────────────────────────────
  console.log("\n┌─ TELLS / TRAIN YOUR INSTINCTS ──────────────────");

  const tellsActivity = await prisma.$queryRawUnsafe<
    Array<{ tells_published: bigint; responses: bigint; unique_responders: bigint }>
  >(
    `SELECT
       (SELECT COUNT(*)::bigint FROM "Tell" WHERE status = 'PUBLISHED' AND "scheduleDate" >= $1) AS tells_published,
       (SELECT COUNT(*)::bigint FROM "TellResponse" WHERE "answeredAt" >= $1) AS responses,
       (SELECT COUNT(DISTINCT "userId")::bigint FROM "TellResponse" WHERE "answeredAt" >= $1) AS unique_responders`,
    since,
  );
  if (tellsActivity[0]) {
    const t = tellsActivity[0];
    console.log(`  Tells published:        ${n(t.tells_published)}`);
    console.log(`  Total responses:        ${n(t.responses)}`);
    console.log(`  Unique responders:      ${n(t.unique_responders)}`);
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
