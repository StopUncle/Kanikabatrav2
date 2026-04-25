/**
 * Full 7-day activity snapshot. Read-only. Covers:
 *  - Funnel: registrations, applications, memberships, purchases
 *  - Consilium engagement: simulator runs, quiz, feed likes/comments,
 *    forum posts/replies, chat, course progress
 *  - Public-side: book purchases, quiz takes (free), presale signups
 *  - Chronological activity log (who did what, when)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function ago(d: Date): string {
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
}

async function main() {
  const now = new Date();
  const day = 86400_000;
  const since7 = new Date(now.getTime() - 7 * day);
  const since24 = new Date(now.getTime() - day);
  const since1h = new Date(now.getTime() - 3600_000);

  const h = (s: string) => console.log(`\n━━━━ ${s} ━━━━`);

  // ============================================================
  h("TRAFFIC TEMPO");
  // ============================================================
  const usersLastHour = await prisma.user.count({ where: { createdAt: { gte: since1h } } });
  const usersLast24 = await prisma.user.count({ where: { createdAt: { gte: since24 } } });
  const usersLast7 = await prisma.user.count({ where: { createdAt: { gte: since7 } } });
  const usersTotal = await prisma.user.count();
  console.log(`  Registrations   last 1h: ${usersLastHour}   last 24h: ${usersLast24}   last 7d: ${usersLast7}   total: ${usersTotal}`);

  // Registrations by day, last 7 days
  const byDay = await prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`
    SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
    FROM "User"
    WHERE "createdAt" >= ${since7}
    GROUP BY day
    ORDER BY day DESC
  `;
  console.log(`  By day (UTC):`);
  for (const row of byDay) {
    console.log(`    ${row.day.toISOString().slice(0, 10)}  ${"▓".repeat(Math.min(40, Number(row.count)))} ${row.count}`);
  }

  // ============================================================
  h("MEMBERSHIP FUNNEL (7d)");
  // ============================================================
  const apps7 = await prisma.communityMembership.findMany({
    where: { createdAt: { gte: since7 } },
    select: { status: true, billingCycle: true, createdAt: true, activatedAt: true },
  });
  const fByStatus: Record<string, number> = {};
  const fByCycle: Record<string, number> = {};
  for (const a of apps7) {
    fByStatus[a.status] = (fByStatus[a.status] ?? 0) + 1;
    fByCycle[a.billingCycle] = (fByCycle[a.billingCycle] ?? 0) + 1;
  }
  console.log(`  New memberships in 7d: ${apps7.length}`);
  for (const [s, n] of Object.entries(fByStatus)) console.log(`    ${s.padEnd(10)} ${n}`);
  console.log(`  By billing cycle:`);
  for (const [c, n] of Object.entries(fByCycle)) console.log(`    ${c.padEnd(10)} ${n}`);

  // Point-in-time snapshot
  const allMem = await prisma.communityMembership.groupBy({
    by: ["status"],
    _count: true,
  });
  console.log(`  Current state of all memberships (point-in-time):`);
  for (const r of allMem) console.log(`    ${r.status.padEnd(10)} ${r._count}`);

  // ============================================================
  h("PURCHASES (7d)");
  // ============================================================
  const purchases7 = await prisma.purchase.findMany({
    where: { createdAt: { gte: since7 } },
    select: {
      type: true,
      productVariant: true,
      amount: true,
      createdAt: true,
      customerName: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  const revenue = purchases7.reduce((s, p) => s + Number(p.amount || 0), 0);
  console.log(`  ${purchases7.length} purchases, $${revenue.toFixed(2)} total`);
  const byType: Record<string, { count: number; revenue: number }> = {};
  for (const p of purchases7) {
    const k = p.type;
    if (!byType[k]) byType[k] = { count: 0, revenue: 0 };
    byType[k].count++;
    byType[k].revenue += Number(p.amount || 0);
  }
  for (const [t, v] of Object.entries(byType)) {
    console.log(`    ${t.padEnd(22)} ${v.count}  ·  $${v.revenue.toFixed(2)}`);
  }
  console.log(`  Most recent:`);
  for (const p of purchases7.slice(0, 8)) {
    console.log(`    ${ago(p.createdAt).padStart(4)} ago  ${p.type.padEnd(22)} $${Number(p.amount).toFixed(2).padStart(7)}  ${p.user?.email ?? p.customerName ?? "?"}`);
  }

  // ============================================================
  h("SIMULATOR ENGAGEMENT (7d)");
  // ============================================================
  const simRuns = await prisma.simulatorProgress.findMany({
    where: { startedAt: { gte: since7 } },
    select: {
      scenarioId: true,
      completedAt: true,
      outcome: true,
      xpEarned: true,
      startedAt: true,
      user: { select: { email: true } },
    },
    orderBy: { startedAt: "desc" },
  });
  const byScenario: Record<string, { runs: number; completed: number; good: number; bad: number; neutral: number }> = {};
  const byPlayer: Record<string, number> = {};
  for (const r of simRuns) {
    if (!byScenario[r.scenarioId]) byScenario[r.scenarioId] = { runs: 0, completed: 0, good: 0, bad: 0, neutral: 0 };
    byScenario[r.scenarioId].runs++;
    if (r.completedAt) {
      byScenario[r.scenarioId].completed++;
      const o = r.outcome;
      if (o === "good" || o === "passed") byScenario[r.scenarioId].good++;
      else if (o === "bad" || o === "failed") byScenario[r.scenarioId].bad++;
      else byScenario[r.scenarioId].neutral++;
    }
    const email = r.user?.email ?? "?";
    byPlayer[email] = (byPlayer[email] ?? 0) + 1;
  }
  console.log(`  ${simRuns.length} runs from ${Object.keys(byPlayer).length} unique players`);
  console.log(`  By scenario (runs / completed / good / bad):`);
  for (const [sid, s] of Object.entries(byScenario).sort((a, b) => b[1].runs - a[1].runs)) {
    console.log(
      `    ${sid.padEnd(22)} ${String(s.runs).padStart(3)} / ${String(s.completed).padStart(3)} / g${s.good} b${s.bad} n${s.neutral}`,
    );
  }
  console.log(`  Players:`);
  for (const [email, count] of Object.entries(byPlayer).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(count).padStart(3)} runs  ${email}`);
  }

  // ============================================================
  h("QUIZ (7d)");
  // ============================================================
  const quizzes = await prisma.quizResult.findMany({
    where: { createdAt: { gte: since7 } },
    select: { primaryType: true, email: true, paid: true, createdAt: true, userId: true },
    orderBy: { createdAt: "desc" },
  });
  const byPrimary: Record<string, number> = {};
  let anon = 0, linked = 0, paid = 0;
  for (const q of quizzes) {
    byPrimary[q.primaryType] = (byPrimary[q.primaryType] ?? 0) + 1;
    if (q.userId) linked++; else anon++;
    if (q.paid) paid++;
  }
  console.log(`  ${quizzes.length} quiz results  ·  ${linked} linked to account, ${anon} anonymous  ·  ${paid} unlocked`);
  console.log(`  Primary personality types:`);
  for (const [d, n] of Object.entries(byPrimary).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${d.padEnd(16)} ${n}`);
  }

  // ============================================================
  h("FEED ENGAGEMENT (7d)");
  // ============================================================
  const feedLikes = await prisma.feedPostLike.count({ where: { createdAt: { gte: since7 } } });
  const feedComments = await prisma.feedComment.count({ where: { createdAt: { gte: since7 } } });
  const newFeedPosts = await prisma.feedPost.count({ where: { createdAt: { gte: since7 } } });
  console.log(`  New posts: ${newFeedPosts}  ·  Comments: ${feedComments}  ·  Likes: ${feedLikes}`);
  const recentComments = await prisma.feedComment.findMany({
    where: { createdAt: { gte: since7 } },
    select: { status: true, content: true, createdAt: true, author: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  for (const c of recentComments) {
    const preview = (c.content ?? "").slice(0, 60).replace(/\s+/g, " ");
    console.log(`    ${ago(c.createdAt).padStart(4)} ago  ${c.status.padEnd(15)} ${c.author?.email ?? "?"}  "${preview}"`);
  }

  // ============================================================
  h("FORUM (7d)");
  // ============================================================
  const forumPosts = await prisma.forumPost.count({ where: { createdAt: { gte: since7 } } });
  const forumReplies = await prisma.forumReply.count({ where: { createdAt: { gte: since7 } } });
  console.log(`  New posts: ${forumPosts}  ·  Replies: ${forumReplies}`);

  // ============================================================
  h("CHAT (7d)");
  // ============================================================
  const chatMsgs = await prisma.chatMessage.count({ where: { createdAt: { gte: since7 } } });
  const lastMsg = await prisma.chatMessage.findFirst({
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  console.log(`  Messages in 7d: ${chatMsgs}`);
  if (lastMsg?.createdAt) {
    console.log(`  Last message ever: ${ago(lastMsg.createdAt)} ago`);
  } else {
    console.log(`  Never used`);
  }

  // ============================================================
  h("COURSE PROGRESS (7d)");
  // ============================================================
  const newEnrollments = await prisma.courseEnrollment.count({ where: { startedAt: { gte: since7 } } });
  const lessonCompletions = await prisma.lessonProgress.count({
    where: { isCompleted: true, updatedAt: { gte: since7 } },
  });
  console.log(`  New enrollments: ${newEnrollments}  ·  Lessons completed: ${lessonCompletions}`);

  // ============================================================
  h("ACTIVITY LOG (last 30 entries)");
  // ============================================================
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      type: true,
      title: true,
      createdAt: true,
      user: { select: { email: true } },
    },
  });
  for (const l of logs) {
    console.log(`    ${ago(l.createdAt).padStart(4)} ago  ${l.type.padEnd(20)} ${(l.user?.email ?? "?").padEnd(36)} ${l.title}`);
  }

  // ============================================================
  h("MOST-RECENT SIGNALS (last 15 across system)");
  // ============================================================
  type Event = { when: Date; label: string; who: string };
  const events: Event[] = [];
  const u15 = await prisma.user.findMany({
    where: { createdAt: { gte: since7 } },
    select: { email: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  for (const u of u15) events.push({ when: u.createdAt, label: "user registered", who: u.email });
  const q15 = await prisma.quizResult.findMany({
    where: { createdAt: { gte: since7 } },
    select: { email: true, primaryType: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  for (const q of q15) events.push({ when: q.createdAt, label: `quiz: ${q.primaryType}`, who: q.email ?? "?" });
  const p15 = await prisma.purchase.findMany({
    where: { createdAt: { gte: since7 } },
    select: { type: true, amount: true, createdAt: true, user: { select: { email: true } }, customerName: true },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  for (const p of p15) events.push({
    when: p.createdAt,
    label: `purchase: ${p.type} $${Number(p.amount).toFixed(2)}`,
    who: p.user?.email ?? p.customerName ?? "?",
  });
  const s15 = await prisma.simulatorProgress.findMany({
    where: { OR: [{ startedAt: { gte: since7 } }, { completedAt: { gte: since7 } }] },
    select: { scenarioId: true, outcome: true, completedAt: true, startedAt: true, user: { select: { email: true } } },
    orderBy: { startedAt: "desc" },
    take: 15,
  });
  for (const s of s15) {
    events.push({
      when: s.completedAt ?? s.startedAt,
      label: s.completedAt ? `sim: ${s.scenarioId} → ${s.outcome ?? "?"}` : `sim started: ${s.scenarioId}`,
      who: s.user?.email ?? "?",
    });
  }
  events.sort((a, b) => b.when.getTime() - a.when.getTime());
  for (const e of events.slice(0, 25)) {
    console.log(`    ${ago(e.when).padStart(4)} ago  ${e.label.padEnd(40)} ${e.who}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
