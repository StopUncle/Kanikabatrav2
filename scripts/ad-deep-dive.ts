/**
 * Deeper look at the ad-window funnel.
 * - Average revenue per user signup, per day
 * - What % of users have ANY attribution
 * - Hour-of-day distribution for the last 7 days
 * - Bounced sessions (signup but no quiz, no purchase)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

const NOW = new Date();
const SEVEN_DAYS_AGO = new Date(NOW.getTime() - 7 * 24 * 3600 * 1000);

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

async function attributionGap() {
  console.log("\n=== ATTRIBUTION GAP (last 7 days) ===\n");
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: SEVEN_DAYS_AGO }, isBot: false },
    select: {
      utmSource: true,
      utmCampaign: true,
      fbclid: true,
      gclid: true,
      ttclid: true,
      referrer: true,
    },
  });

  let tagged = 0;
  let untagged = 0;
  let referrerOnly = 0;
  for (const u of users) {
    if (u.utmSource || u.fbclid || u.gclid || u.ttclid) tagged++;
    else if (u.referrer) referrerOnly++;
    else untagged++;
  }

  console.log(`Total signups (7d): ${users.length}`);
  console.log(`  Properly UTM-tagged:    ${tagged} (${((tagged / users.length) * 100).toFixed(0)}%)`);
  console.log(`  Referrer-only (no UTM): ${referrerOnly} (${((referrerOnly / users.length) * 100).toFixed(0)}%)`);
  console.log(`  No attribution at all:  ${untagged} (${((untagged / users.length) * 100).toFixed(0)}%)`);
  console.log();
  console.log("Implication: untagged + referrer-only traffic cannot be attributed to a specific ad creative.");
  console.log("This is the %% of paid traffic you can't optimize against.");
}

async function fbInstaCohort() {
  console.log("\n=== INSTAGRAM/FACEBOOK COHORT (any signal: utm/click-id/referrer) ===\n");
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: SEVEN_DAYS_AGO }, isBot: false },
    select: {
      id: true, email: true, createdAt: true,
      utmSource: true, utmCampaign: true, utmContent: true,
      fbclid: true, gclid: true, ttclid: true, referrer: true,
    },
  });

  const meta = users.filter(u =>
    u.fbclid ||
    (u.utmSource && /instagram|facebook|fb|ig|meta/i.test(u.utmSource)) ||
    (u.referrer && /instagram\.com|facebook\.com|fb\.com|l\.instagram\.com/i.test(u.referrer))
  );

  console.log(`Meta-attributed signups (7d): ${meta.length}`);
  if (meta.length > 0) {
    console.log("\nDate         Source          Campaign        Content");
    for (const u of meta.slice(0, 50)) {
      const day = u.createdAt.toISOString().slice(0, 10);
      const src = u.utmSource ?? (u.fbclid ? "(fbclid)" : (u.referrer ? "(ref)" : "?"));
      const camp = u.utmCampaign ?? "—";
      const cont = u.utmContent ?? "—";
      console.log(pad(day, 13) + pad(src, 16) + pad(camp, 16) + cont);
    }
  }

  // Count purchases tied to this cohort
  const userIds = meta.map(u => u.id);
  const purchases = await prisma.purchase.findMany({
    where: { userId: { in: userIds }, status: "COMPLETED" },
    select: { type: true, productVariant: true, amount: true, createdAt: true },
  });

  console.log();
  console.log(`Purchases from Meta-attributed cohort (7d): ${purchases.length}`);
  const total = purchases.reduce((acc, p) => acc + Number(p.amount ?? 0), 0);
  console.log(`Revenue from Meta-attributed cohort: $${total.toFixed(2)}`);
}

async function landingPageDistribution() {
  console.log("\n=== LANDING PAGE DISTRIBUTION (7d, by source) ===\n");
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: SEVEN_DAYS_AGO }, isBot: false },
    select: { landingPage: true, createdAt: true, utmSource: true, fbclid: true, referrer: true },
  });
  const lpCount = new Map<string, number>();
  for (const u of users) {
    const lp = u.landingPage ?? "(null)";
    lpCount.set(lp, (lpCount.get(lp) ?? 0) + 1);
  }
  const sorted = [...lpCount.entries()].sort((a, b) => b[1] - a[1]);
  console.log(pad("LANDING", 50) + "COUNT");
  for (const [lp, c] of sorted.slice(0, 20)) {
    console.log(pad(lp.slice(0, 49), 50) + c);
  }
}

async function dailyConvBreakdown() {
  console.log("\n=== QUIZ COMPLETION & PAID CONVERSION RATE BY DAY (7d) ===\n");
  const quizzes = await prisma.quizResult.findMany({
    where: { createdAt: { gte: SEVEN_DAYS_AGO } },
    select: { createdAt: true, paid: true, completed: true, email: true },
  });
  const byDay = new Map<string, { total: number; completed: number; paid: number }>();
  for (const q of quizzes) {
    const day = q.createdAt.toISOString().slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, { total: 0, completed: 0, paid: 0 });
    const b = byDay.get(day)!;
    b.total++;
    if (q.completed) b.completed++;
    if (q.paid) b.paid++;
  }
  console.log(pad("DATE", 12) + pad("TAKES", 8) + pad("FINISHED", 10) + pad("PAID", 6) + pad("FIN%", 7) + "PAID%");
  for (const [day, b] of [...byDay.entries()].sort()) {
    const fin = b.total > 0 ? ((b.completed / b.total) * 100).toFixed(0) : "0";
    const paid = b.completed > 0 ? ((b.paid / b.completed) * 100).toFixed(1) : "0.0";
    console.log(pad(day, 12) + pad(String(b.total), 8) + pad(String(b.completed), 10) + pad(String(b.paid), 6) + pad(fin + "%", 7) + paid + "%");
  }
}

async function main() {
  await attributionGap();
  await fbInstaCohort();
  await landingPageDistribution();
  await dailyConvBreakdown();
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
