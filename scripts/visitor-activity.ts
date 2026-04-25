/**
 * Comprehensive visitor+member activity snapshot.
 * Splits into OUTSIDE the Consilium (public site) vs INSIDE (paid members).
 * Read-only.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function ago(d: Date): string {
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return `${String(mins).padStart(4)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `${String(hours).padStart(3)}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

async function main() {
  const h1 = new Date(Date.now() - 1 * 3600 * 1000);
  const h6 = new Date(Date.now() - 6 * 3600 * 1000);
  const h24 = new Date(Date.now() - 24 * 3600 * 1000);
  const h48 = new Date(Date.now() - 48 * 3600 * 1000);

  const sec = (s: string) => console.log(`\n\n########  ${s}  ########`);
  const h = (s: string) => console.log(`\n--- ${s} ---`);

  sec("BIG PICTURE");

  // Traffic proxies — things anyone (logged-in or not) can do
  const [
    quizLast1h,
    quizLast6h,
    quizLast24h,
    usersLast1h,
    usersLast6h,
    usersLast24h,
    purchaseLast24h,
    purchaseLast48h,
  ] = await Promise.all([
    prisma.quizResult.count({ where: { createdAt: { gte: h1 } } }),
    prisma.quizResult.count({ where: { createdAt: { gte: h6 } } }),
    prisma.quizResult.count({ where: { createdAt: { gte: h24 } } }),
    prisma.user.count({ where: { createdAt: { gte: h1 } } }),
    prisma.user.count({ where: { createdAt: { gte: h6 } } }),
    prisma.user.count({ where: { createdAt: { gte: h24 } } }),
    prisma.purchase.count({ where: { createdAt: { gte: h24 } } }),
    prisma.purchase.count({ where: { createdAt: { gte: h48 } } }),
  ]);

  console.log(`Quiz completions  last 1h: ${quizLast1h}   6h: ${quizLast6h}   24h: ${quizLast24h}`);
  console.log(`New registrations last 1h: ${usersLast1h}   6h: ${usersLast6h}   24h: ${usersLast24h}`);
  console.log(`Purchases total   last 24h: ${purchaseLast24h}   48h: ${purchaseLast48h}`);

  // ========================================================================
  sec("OUTSIDE THE CONSILIUM  (public visitors — quiz, book, registrations)");
  // ========================================================================

  h("QUIZ RESULTS (last 24h, anonymous + logged-in)");
  const quizRows = await prisma.quizResult.findMany({
    where: { createdAt: { gte: h24 } },
    select: {
      primaryType: true,
      secondaryType: true,
      email: true,
      paid: true,
      shared: true,
      createdAt: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
  for (const q of quizRows) {
    const who = q.user?.email ?? q.email ?? "(anonymous)";
    const flags = [q.paid ? "paid" : "free", q.shared ? "shared" : null]
      .filter(Boolean)
      .join(" ");
    console.log(
      `  ${ago(q.createdAt)}  ${q.primaryType.padEnd(14)} / ${(q.secondaryType ?? "—").padEnd(14)}  ${flags.padEnd(10)}  ${who}`,
    );
  }

  h("PRIMARY-TYPE DISTRIBUTION (all quiz results, all time)");
  const typeCounts = await prisma.quizResult.groupBy({
    by: ["primaryType"],
    _count: true,
    orderBy: { _count: { primaryType: "desc" } },
  });
  for (const t of typeCounts) {
    console.log(`  ${t.primaryType.padEnd(14)} ${t._count}`);
  }

  h("NEW REGISTRATIONS (last 48h)");
  const newUsers = await prisma.user.findMany({
    where: { createdAt: { gte: h48 } },
    select: { email: true, createdAt: true, role: true, name: true },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
  for (const u of newUsers) {
    console.log(`  ${ago(u.createdAt)}  ${u.role.padEnd(7)} ${u.email}  ${u.name ? `"${u.name}"` : ""}`);
  }

  h("PURCHASES (last 48h)");
  const purchases = await prisma.purchase.findMany({
    where: { createdAt: { gte: h48 } },
    select: {
      type: true,
      productVariant: true,
      amount: true,
      status: true,
      customerEmail: true,
      customerName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  for (const p of purchases) {
    console.log(
      `  ${ago(p.createdAt)}  ${p.type.padEnd(20)} $${p.amount.toFixed(2).padStart(7)}  ${p.status.padEnd(10)}  ${p.customerEmail}  (${p.customerName})`,
    );
  }

  h("NEWSLETTER / PRESALE SUBSCRIBERS (last 7d)");
  const recentSubs = await prisma.subscriber.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 7 * 86400 * 1000) } },
    select: { email: true, source: true, createdAt: true, name: true, tags: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  for (const s of recentSubs) {
    console.log(
      `  ${ago(s.createdAt)}  ${s.source.padEnd(12)}  ${s.email}  ${s.name ? `"${s.name}"` : ""}  [${s.tags.join(",")}]`,
    );
  }
  const subSourceCounts = await prisma.subscriber.groupBy({
    by: ["source"],
    _count: true,
    orderBy: { _count: { source: "desc" } },
  });
  console.log("  Totals by source:");
  for (const s of subSourceCounts) {
    console.log(`    ${s.source.padEnd(12)} ${s._count}`);
  }

  // ========================================================================
  sec("INSIDE THE CONSILIUM  (paid / trial members)");
  // ========================================================================

  h("MEMBERSHIPS BY STATUS");
  const memStatus = await prisma.communityMembership.groupBy({
    by: ["status"],
    _count: true,
  });
  for (const m of memStatus) {
    console.log(`  ${m.status.padEnd(12)} ${m._count}`);
  }

  h("MEMBERSHIPS BY BILLING CYCLE (active only)");
  const memCycle = await prisma.communityMembership.groupBy({
    by: ["billingCycle"],
    where: { status: "ACTIVE" },
    _count: true,
  });
  for (const m of memCycle) {
    console.log(`  ${m.billingCycle.padEnd(14)} ${m._count}`);
  }

  h("RECENT SIMULATOR RUNS (last 48h)");
  const runs = await prisma.simulatorProgress.findMany({
    where: { startedAt: { gte: h48 } },
    select: {
      scenarioId: true,
      startedAt: true,
      completedAt: true,
      outcome: true,
      xpEarned: true,
      user: { select: { email: true } },
    },
    orderBy: { startedAt: "desc" },
    take: 40,
  });
  for (const r of runs) {
    const status = r.completedAt
      ? `${r.outcome ?? "?"} +${r.xpEarned}xp`
      : "in-progress";
    console.log(
      `  ${ago(r.startedAt)}  ${r.scenarioId.padEnd(24)} ${status.padEnd(18)} ${r.user?.email ?? "?"}`,
    );
  }

  h("SCENARIOS STARTED (all time, top 10)");
  const topScenarios = await prisma.simulatorProgress.groupBy({
    by: ["scenarioId"],
    _count: true,
    orderBy: { _count: { scenarioId: "desc" } },
    take: 10,
  });
  for (const s of topScenarios) {
    console.log(`  ${s.scenarioId.padEnd(24)} ${s._count}`);
  }

  h("RECENT FEED COMMENTS (last 48h)");
  const comments = await prisma.feedComment.findMany({
    where: { createdAt: { gte: h48 } },
    select: {
      status: true,
      content: true,
      createdAt: true,
      author: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  for (const c of comments) {
    const preview = (c.content ?? "").slice(0, 70).replaceAll(/\s+/g, " ");
    console.log(
      `  ${ago(c.createdAt)}  ${c.status.padEnd(16)} ${c.author?.email ?? "?"}  "${preview}"`,
    );
  }

  h("FEED POST LIKES (last 48h)");
  const likes = await prisma.feedPostLike.count({
    where: { createdAt: { gte: h48 } },
  });
  console.log(`  Total: ${likes}`);

  h("CHAT MESSAGES");
  const chatMsgs = await prisma.chatMessage.count({
    where: { createdAt: { gte: h48 } },
  });
  const totalChat = await prisma.chatMessage.count();
  console.log(`  Last 48h: ${chatMsgs}    All time: ${totalChat}`);

  h("FORUM ACTIVITY");
  const [forumPosts48h, forumReplies48h] = await Promise.all([
    prisma.forumPost.count({ where: { createdAt: { gte: h48 } } }),
    prisma.forumReply.count({ where: { createdAt: { gte: h48 } } }),
  ]);
  const totalForumPosts = await prisma.forumPost.count();
  console.log(`  Forum posts  last 48h: ${forumPosts48h}   all time: ${totalForumPosts}`);
  console.log(`  Forum replies last 48h: ${forumReplies48h}`);

  h("CLASSROOM — COURSE ENROLLMENTS & LESSON PROGRESS");
  const enrolls48h = await prisma.courseEnrollment.count({
    where: { createdAt: { gte: h48 } },
  });
  const lessonDone48h = await prisma.lessonProgress.count({
    where: { isCompleted: true, updatedAt: { gte: h48 } },
  });
  const totalEnrolls = await prisma.courseEnrollment.count();
  console.log(`  New enrollments last 48h: ${enrolls48h}   all time: ${totalEnrolls}`);
  console.log(`  Lessons completed last 48h: ${lessonDone48h}`);

  h("ACTIVITY LOG (last 24h, aggregated)");
  const activityTypes = await prisma.activityLog.groupBy({
    by: ["type"],
    where: { createdAt: { gte: h24 } },
    _count: true,
    orderBy: { _count: { type: "desc" } },
  });
  for (const a of activityTypes) {
    console.log(`  ${a.type.padEnd(22)} ${a._count}`);
  }

  h("USER ACHIEVEMENTS EARNED (last 48h)");
  const achievements48h = await prisma.userAchievement.count({
    where: { earnedAt: { gte: h48 } },
  });
  console.log(`  Total: ${achievements48h}`);

  h("COACHING SESSIONS (booked, last 14d)");
  const sessions = await prisma.coachingSession.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 14 * 86400 * 1000) } },
    select: {
      status: true,
      createdAt: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  for (const s of sessions) {
    console.log(`  ${ago(s.createdAt)}  ${s.status.padEnd(12)}  ${s.user?.email ?? "?"}`);
  }

  h("EMAIL QUEUE STATE");
  const emailStatus = await prisma.emailQueue.groupBy({
    by: ["status"],
    _count: true,
  });
  for (const e of emailStatus) {
    console.log(`  ${e.status.padEnd(14)} ${e._count}`);
  }
  const overduePending = await prisma.emailQueue.count({
    where: { status: "PENDING", scheduledAt: { lt: new Date() } },
  });
  console.log(`  Overdue PENDING (should have fired already): ${overduePending}`);

  h("RATE-LIMIT HITS (last 24h — anyone who got throttled)");
  const rateHits = await prisma.rateLimit.findMany({
    where: { updatedAt: { gte: h24 } },
    select: {
      action: true,
      subject: true,
      count: true,
      updatedAt: true,
      windowStart: true,
    },
    orderBy: { count: "desc" },
    take: 10,
  });
  for (const r of rateHits) {
    const label = `${r.action}:${r.subject}`;
    console.log(`  ${ago(r.updatedAt)}  ${label.padEnd(50)} count=${r.count}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
