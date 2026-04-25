/**
 * Real-time traffic pulse. Shows hourly registrations, quiz takes, and
 * book purchases for the last 24 hours so you can see where traffic
 * is actually landing right now vs the perceived "people on site."
 *
 * Note: there's no UTM/referrer capture in the DB. Source attribution
 * has to come from Google Analytics (GA4 ID G-DTNLQQ321K is wired in
 * app/layout.tsx). This script measures *outcomes* not *impressions*.
 *
 * Read-only.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const since1h = new Date(now.getTime() - 3600_000);
  const since6h = new Date(now.getTime() - 6 * 3600_000);
  const since24h = new Date(now.getTime() - 24 * 3600_000);

  console.log(`\nNow (UTC): ${now.toISOString()}`);

  // Real-time funnel: last 1h, 6h, 24h
  const h = (s: string) => console.log(`\n━━━━ ${s} ━━━━`);

  h("REAL-TIME FUNNEL");
  const reg1 = await prisma.user.count({ where: { createdAt: { gte: since1h } } });
  const reg6 = await prisma.user.count({ where: { createdAt: { gte: since6h } } });
  const reg24 = await prisma.user.count({ where: { createdAt: { gte: since24h } } });
  const quiz1 = await prisma.quizResult.count({ where: { createdAt: { gte: since1h } } });
  const quiz6 = await prisma.quizResult.count({ where: { createdAt: { gte: since6h } } });
  const quiz24 = await prisma.quizResult.count({ where: { createdAt: { gte: since24h } } });
  const buy1 = await prisma.purchase.count({
    where: { createdAt: { gte: since1h }, status: "COMPLETED" },
  });
  const buy24 = await prisma.purchase.count({
    where: { createdAt: { gte: since24h }, status: "COMPLETED" },
  });

  console.log(`                    1h     6h    24h`);
  console.log(`  Registrations     ${String(reg1).padStart(2)}     ${String(reg6).padStart(2)}    ${String(reg24).padStart(3)}`);
  console.log(`  Quiz takes        ${String(quiz1).padStart(2)}     ${String(quiz6).padStart(2)}    ${String(quiz24).padStart(3)}`);
  console.log(`  Purchases         ${String(buy1).padStart(2)}     ${"—".padStart(2)}    ${String(buy24).padStart(3)}`);

  // Hourly distribution — last 24h
  h("HOURLY REGISTRATIONS (last 24h, UTC)");
  const hourly = await prisma.$queryRaw<Array<{ hour: Date; count: bigint }>>`
    SELECT date_trunc('hour', "createdAt") AS hour, COUNT(*) AS count
    FROM "User"
    WHERE "createdAt" >= ${since24h}
    GROUP BY 1
    ORDER BY 1 ASC
  `;
  const max = Math.max(1, ...hourly.map((r) => Number(r.count)));
  for (const r of hourly) {
    const c = Number(r.count);
    const bar = "▓".repeat(Math.round((c / max) * 30));
    const label = r.hour.toISOString().slice(0, 13) + "h";
    console.log(`  ${label}  ${bar} ${c}`);
  }

  // Hourly quiz takes — same window — quiz takes are a better proxy
  // for "first-touch" traffic since users land on /quiz and complete
  // before deciding whether to register.
  h("HOURLY QUIZ TAKES (last 24h, UTC) — best proxy for landing traffic");
  const hourlyQuiz = await prisma.$queryRaw<Array<{ hour: Date; count: bigint }>>`
    SELECT date_trunc('hour', "createdAt") AS hour, COUNT(*) AS count
    FROM "QuizResult"
    WHERE "createdAt" >= ${since24h}
    GROUP BY 1
    ORDER BY 1 ASC
  `;
  const qmax = Math.max(1, ...hourlyQuiz.map((r) => Number(r.count)));
  for (const r of hourlyQuiz) {
    const c = Number(r.count);
    const bar = "▓".repeat(Math.round((c / qmax) * 30));
    const label = r.hour.toISOString().slice(0, 13) + "h";
    console.log(`  ${label}  ${bar} ${c}`);
  }

  // Country/IP signal — from RateLimit "subject" field where it's an IP
  // address. Not perfect (only counts users who hit rate-limited endpoints
  // like register/login) but it's the only IP signal we store.
  h("RECENT REGISTRATION IPs (last 24h, from rate-limit log)");
  const recentIps = await prisma.rateLimit.findMany({
    where: {
      action: { startsWith: "auth:" },
      updatedAt: { gte: since24h },
    },
    orderBy: { updatedAt: "desc" },
    take: 30,
  });
  for (const r of recentIps.slice(0, 20)) {
    console.log(
      `  ${r.action.padEnd(20)} ${r.subject.padEnd(20)} count=${r.count}  last ${r.updatedAt.toISOString().slice(11, 19)}`,
    );
  }

  // Where did unique users land first? Look at first registration source
  // proxy: Subscriber.source field for newsletter signups.
  h("NEWSLETTER + PRESALE SIGNUPS (last 24h, by source)");
  const subSources = await prisma.subscriber.groupBy({
    by: ["source"],
    where: { createdAt: { gte: since24h } },
    _count: { _all: true },
  });
  for (const s of subSources) {
    console.log(`  ${String(s.source).padEnd(18)} ${s._count._all}`);
  }
  if (subSources.length === 0) {
    console.log(`  (none in last 24h)`);
  }

  // Quiz email tags — set by /api/links capture flow with traffic context
  h("QUIZ-RESULTS WITH TRAFFIC TAGS (last 7d)");
  const taggedSubs = await prisma.subscriber.findMany({
    where: {
      tags: { isEmpty: false },
      createdAt: { gte: new Date(now.getTime() - 7 * 86400_000) },
    },
    select: { email: true, source: true, tags: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
  for (const t of taggedSubs) {
    const ago = Math.round((now.getTime() - t.createdAt.getTime()) / 60000);
    const agoStr = ago < 60 ? `${ago}m` : `${Math.round(ago / 60)}h`;
    console.log(`  ${agoStr.padStart(6)} ago  ${t.source.padEnd(15)} tags=[${t.tags.join(",")}]  ${t.email}`);
  }
  if (taggedSubs.length === 0) {
    console.log(`  (no tagged subs in 7d)`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
