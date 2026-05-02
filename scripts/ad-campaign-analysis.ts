/**
 * Ad campaign post-mortem.
 *
 * Goal: explain why escalating ad spend ($25 -> $50 -> $75 across 6 days)
 * produced diminishing return on the same video.
 *
 * Pulls last 14 days of:
 *   - User registrations (with attribution: utmSource, fbclid, ipCountry,
 *     landingPage, referrer)
 *   - QuizResult creations (same attribution columns)
 *   - Purchase rows (Stripe + legacy)
 *   - SimulatorProgress starts (proxy for free engagement)
 *
 * Reports:
 *   1. Daily revenue + count, last 14 days
 *   2. Daily new-user count by source (organic / instagram / tiktok / etc.)
 *   3. Daily quiz-takes by source
 *   4. Conversion funnel: quiz-take -> quiz-purchase -> book / membership
 *   5. Ad-tagged traffic vs untagged (proxy for ad-driven vs organic)
 *
 * Read-only. No writes.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const NOW = new Date();
const FOURTEEN_DAYS_AGO = new Date(NOW.getTime() - 14 * 24 * 3600 * 1000);

function toDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

async function dailyRevenue() {
  console.log("\n=== DAILY REVENUE & PURCHASE COUNT (last 14 days) ===\n");
  const purchases = await prisma.purchase.findMany({
    where: { createdAt: { gte: FOURTEEN_DAYS_AGO }, status: "COMPLETED" },
    select: { createdAt: true, type: true, productVariant: true, amount: true },
  });

  const byDay = new Map<string, { count: number; usd: number; products: Map<string, number> }>();
  for (const p of purchases) {
    const day = toDayKey(p.createdAt);
    if (!byDay.has(day)) {
      byDay.set(day, { count: 0, usd: 0, products: new Map() });
    }
    const bucket = byDay.get(day)!;
    bucket.count += 1;
    bucket.usd += Number(p.amount ?? 0);
    const productKey = p.productVariant ?? p.type;
    bucket.products.set(productKey, (bucket.products.get(productKey) ?? 0) + 1);
  }

  const days = [...byDay.keys()].sort();
  console.log(pad("DATE", 12) + pad("COUNT", 8) + pad("USD", 10) + "PRODUCTS");
  for (const day of days) {
    const b = byDay.get(day)!;
    const productStr = [...b.products.entries()]
      .map(([k, v]) => `${k}:${v}`)
      .join(" ");
    console.log(
      pad(day, 12) +
        pad(String(b.count), 8) +
        pad("$" + b.usd.toFixed(0), 10) +
        productStr,
    );
  }
}

async function dailyUserSignups() {
  console.log("\n=== DAILY USER SIGNUPS BY SOURCE (last 14 days) ===\n");
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: FOURTEEN_DAYS_AGO }, isBot: false },
    select: {
      createdAt: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      fbclid: true,
      gclid: true,
      ttclid: true,
      referrer: true,
      ipCountry: true,
    },
  });

  const byDay = new Map<string, { total: number; sources: Map<string, number> }>();
  for (const u of users) {
    const day = toDayKey(u.createdAt);
    if (!byDay.has(day)) byDay.set(day, { total: 0, sources: new Map() });
    const bucket = byDay.get(day)!;
    bucket.total += 1;

    let source: string;
    if (u.utmSource) source = u.utmSource;
    else if (u.fbclid) source = "(fbclid)";
    else if (u.gclid) source = "(gclid)";
    else if (u.ttclid) source = "(ttclid)";
    else if (u.referrer && u.referrer.includes("instagram")) source = "(ref:instagram)";
    else if (u.referrer && u.referrer.includes("tiktok")) source = "(ref:tiktok)";
    else if (u.referrer) source = "(ref:other)";
    else source = "(direct/null)";
    bucket.sources.set(source, (bucket.sources.get(source) ?? 0) + 1);
  }

  console.log(pad("DATE", 12) + pad("TOTAL", 8) + "BY SOURCE");
  const days = [...byDay.keys()].sort();
  for (const day of days) {
    const b = byDay.get(day)!;
    const sourceStr = [...b.sources.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}:${v}`)
      .join("  ");
    console.log(pad(day, 12) + pad(String(b.total), 8) + sourceStr);
  }
}

async function dailyQuizTakes() {
  console.log("\n=== DAILY QUIZ TAKES BY SOURCE (last 14 days) ===\n");
  const quizzes = await prisma.quizResult.findMany({
    where: { createdAt: { gte: FOURTEEN_DAYS_AGO } },
    select: {
      createdAt: true,
      utmSource: true,
      fbclid: true,
      gclid: true,
      ttclid: true,
      referrer: true,
      paid: true,
    },
  });

  const byDay = new Map<
    string,
    { total: number; paid: number; sources: Map<string, number> }
  >();
  for (const q of quizzes) {
    const day = toDayKey(q.createdAt);
    if (!byDay.has(day))
      byDay.set(day, { total: 0, paid: 0, sources: new Map() });
    const bucket = byDay.get(day)!;
    bucket.total += 1;
    if (q.paid) bucket.paid += 1;

    let source: string;
    if (q.utmSource) source = q.utmSource;
    else if (q.fbclid) source = "(fbclid)";
    else if (q.gclid) source = "(gclid)";
    else if (q.ttclid) source = "(ttclid)";
    else if (q.referrer && q.referrer.includes("instagram"))
      source = "(ref:instagram)";
    else if (q.referrer && q.referrer.includes("tiktok"))
      source = "(ref:tiktok)";
    else if (q.referrer) source = "(ref:other)";
    else source = "(direct/null)";
    bucket.sources.set(source, (bucket.sources.get(source) ?? 0) + 1);
  }

  console.log(
    pad("DATE", 12) + pad("TOTAL", 8) + pad("PAID", 8) + pad("CONV%", 8) + "BY SOURCE",
  );
  const days = [...byDay.keys()].sort();
  for (const day of days) {
    const b = byDay.get(day)!;
    const conv = b.total > 0 ? ((b.paid / b.total) * 100).toFixed(1) : "0.0";
    const sourceStr = [...b.sources.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}:${v}`)
      .join("  ");
    console.log(
      pad(day, 12) +
        pad(String(b.total), 8) +
        pad(String(b.paid), 8) +
        pad(conv + "%", 8) +
        sourceStr,
    );
  }
}

async function attributionSourceTotals() {
  console.log("\n=== 14-DAY TOTALS BY SOURCE (combined User + QuizResult) ===\n");
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: FOURTEEN_DAYS_AGO }, isBot: false },
    select: { utmSource: true, fbclid: true, ttclid: true, gclid: true, referrer: true },
  });
  const quizzes = await prisma.quizResult.findMany({
    where: { createdAt: { gte: FOURTEEN_DAYS_AGO } },
    select: {
      utmSource: true,
      fbclid: true,
      ttclid: true,
      gclid: true,
      referrer: true,
      paid: true,
    },
  });

  const sourceCounts = new Map<
    string,
    { users: number; quizzes: number; paidQuizzes: number }
  >();
  function classify(row: { utmSource: string | null; fbclid: string | null; ttclid: string | null; gclid: string | null; referrer: string | null }): string {
    if (row.utmSource) return row.utmSource;
    if (row.fbclid) return "(fbclid)";
    if (row.gclid) return "(gclid)";
    if (row.ttclid) return "(ttclid)";
    if (row.referrer && row.referrer.includes("instagram")) return "(ref:instagram)";
    if (row.referrer && row.referrer.includes("tiktok")) return "(ref:tiktok)";
    if (row.referrer && row.referrer.includes("facebook")) return "(ref:facebook)";
    if (row.referrer && row.referrer.includes("google")) return "(ref:google)";
    if (row.referrer) return "(ref:other)";
    return "(direct/null)";
  }

  for (const u of users) {
    const s = classify(u);
    if (!sourceCounts.has(s)) sourceCounts.set(s, { users: 0, quizzes: 0, paidQuizzes: 0 });
    sourceCounts.get(s)!.users += 1;
  }
  for (const q of quizzes) {
    const s = classify(q);
    if (!sourceCounts.has(s)) sourceCounts.set(s, { users: 0, quizzes: 0, paidQuizzes: 0 });
    sourceCounts.get(s)!.quizzes += 1;
    if (q.paid) sourceCounts.get(s)!.paidQuizzes += 1;
  }

  const sorted = [...sourceCounts.entries()].sort(
    (a, b) => b[1].users + b[1].quizzes - (a[1].users + a[1].quizzes),
  );
  console.log(
    pad("SOURCE", 25) +
      pad("USERS", 8) +
      pad("QUIZZES", 9) +
      pad("PAID", 6) +
      "Q->PAID%",
  );
  for (const [source, c] of sorted) {
    const conv = c.quizzes > 0 ? ((c.paidQuizzes / c.quizzes) * 100).toFixed(1) : "0.0";
    console.log(
      pad(source, 25) +
        pad(String(c.users), 8) +
        pad(String(c.quizzes), 9) +
        pad(String(c.paidQuizzes), 6) +
        conv + "%",
    );
  }
}

async function dailySimulatorStarts() {
  console.log("\n=== DAILY SIMULATOR STARTS (free engagement) (last 14 days) ===\n");
  const starts = await prisma.simulatorProgress.findMany({
    where: { startedAt: { gte: FOURTEEN_DAYS_AGO } },
    select: { startedAt: true, completedAt: true },
  });
  const byDay = new Map<string, { starts: number; completes: number }>();
  for (const s of starts) {
    const day = toDayKey(s.startedAt);
    if (!byDay.has(day)) byDay.set(day, { starts: 0, completes: 0 });
    byDay.get(day)!.starts += 1;
    if (s.completedAt) byDay.get(day)!.completes += 1;
  }
  console.log(pad("DATE", 12) + pad("STARTS", 8) + pad("COMPLETES", 12) + "RATE");
  const days = [...byDay.keys()].sort();
  for (const day of days) {
    const b = byDay.get(day)!;
    const rate = b.starts > 0 ? ((b.completes / b.starts) * 100).toFixed(0) : "0";
    console.log(
      pad(day, 12) +
        pad(String(b.starts), 8) +
        pad(String(b.completes), 12) +
        rate + "%",
    );
  }
}

async function main() {
  await dailyRevenue();
  await dailyUserSignups();
  await dailyQuizTakes();
  await attributionSourceTotals();
  await dailySimulatorStarts();
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
