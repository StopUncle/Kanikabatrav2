/**
 * Read-only snapshot: who has used Consilium and what they've done.
 * Joins members against their feed activity, simulator runs, lessons,
 * forum posts, and chat messages.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function fmt(d: Date | null | undefined): string {
  if (!d) return "—";
  return d.toISOString().slice(0, 10);
}

async function main() {
  // Everyone who has ever held a Consilium membership row, regardless of state.
  const members = await prisma.communityMembership.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          displayName: true,
          createdAt: true,
        },
      },
    },
    orderBy: { appliedAt: "desc" },
  });

  console.log(`\n=== MEMBERSHIPS (${members.length} total) ===\n`);
  const byStatus = new Map<string, number>();
  for (const m of members) {
    byStatus.set(m.status, (byStatus.get(m.status) ?? 0) + 1);
  }
  byStatus.forEach((c, s) => console.log(`  ${s.padEnd(12)} ${c}`));

  const userIds = members.map((m) => m.userId);

  // Activity counts per user — all done in parallel.
  const [
    feedComments,
    feedLikes,
    commentLikes,
    forumPosts,
    forumReplies,
    chatMessages,
    simulatorRuns,
    lessonProgress,
    courseEnrollments,
    purchases,
  ] = await Promise.all([
    prisma.feedComment.groupBy({
      by: ["authorId"],
      where: { authorId: { in: userIds } },
      _count: true,
    }),
    prisma.feedPostLike.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: true,
    }),
    prisma.commentLike.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: true,
    }),
    prisma.forumPost.groupBy({
      by: ["authorId"],
      where: { authorId: { in: userIds } },
      _count: true,
    }),
    prisma.forumReply.groupBy({
      by: ["authorId"],
      where: { authorId: { in: userIds } },
      _count: true,
    }),
    prisma.chatMessage.groupBy({
      by: ["authorId"],
      where: { authorId: { in: userIds } },
      _count: true,
    }),
    prisma.simulatorProgress.findMany({
      where: { userId: { in: userIds } },
      select: {
        userId: true,
        scenarioId: true,
        outcome: true,
        xpEarned: true,
        completedAt: true,
        startedAt: true,
      },
    }),
    prisma.lessonProgress.findMany({
      where: { isCompleted: true, enrollment: { userId: { in: userIds } } },
      select: { enrollment: { select: { userId: true } } },
    }),
    prisma.courseEnrollment.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: true,
    }),
    prisma.purchase.findMany({
      where: { userId: { in: userIds } },
      select: { userId: true, type: true, productVariant: true, amount: true, status: true, createdAt: true },
    }),
  ]);

  const idx = <T extends { _count: number }>(rows: T[], key: keyof T) => {
    const m = new Map<string, number>();
    for (const r of rows) m.set(r[key] as unknown as string, r._count);
    return m;
  };

  const cFeedComments = idx(feedComments, "authorId");
  const cFeedLikes = idx(feedLikes, "userId");
  const cCommentLikes = idx(commentLikes, "userId");
  const cForumPosts = idx(forumPosts, "authorId");
  const cForumReplies = idx(forumReplies, "authorId");
  const cChat = idx(chatMessages, "authorId");
  const cLessons = new Map<string, number>();
  for (const lp of lessonProgress) {
    const uid = lp.enrollment.userId;
    cLessons.set(uid, (cLessons.get(uid) ?? 0) + 1);
  }
  const cEnrollments = idx(courseEnrollments, "userId");

  const simByUser = new Map<string, typeof simulatorRuns>();
  for (const s of simulatorRuns) {
    const arr = simByUser.get(s.userId) ?? [];
    arr.push(s);
    simByUser.set(s.userId, arr);
  }
  const purByUser = new Map<string, typeof purchases>();
  for (const p of purchases) {
    if (!p.userId) continue;
    const arr = purByUser.get(p.userId) ?? [];
    arr.push(p);
    purByUser.set(p.userId, arr);
  }

  console.log(`\n=== PER-MEMBER ACTIVITY ===\n`);
  for (const m of members) {
    const u = m.user;
    const name = u.displayName || u.name || "(no name)";
    const sims = simByUser.get(u.id) ?? [];
    const purs = purByUser.get(u.id) ?? [];
    const totals = {
      comments: cFeedComments.get(u.id) ?? 0,
      feedLikes: cFeedLikes.get(u.id) ?? 0,
      commentLikes: cCommentLikes.get(u.id) ?? 0,
      forumPosts: cForumPosts.get(u.id) ?? 0,
      forumReplies: cForumReplies.get(u.id) ?? 0,
      chat: cChat.get(u.id) ?? 0,
      enrollments: cEnrollments.get(u.id) ?? 0,
      lessonsDone: cLessons.get(u.id) ?? 0,
    };
    const totalEngagement =
      totals.comments +
      totals.feedLikes +
      totals.commentLikes +
      totals.forumPosts +
      totals.forumReplies +
      totals.chat +
      totals.lessonsDone +
      sims.length;

    console.log(
      `\n— ${name}  <${u.email}>  [${m.status}, ${m.billingCycle}]  applied=${fmt(m.appliedAt)} active=${fmt(m.activatedAt)} expires=${fmt(m.expiresAt)}`
    );
    if (purs.length) {
      const lines = purs.map(
        (p) =>
          `    ${fmt(p.createdAt)} ${p.type.padEnd(14)} ${(p.productVariant ?? "").padEnd(18)} $${Number(p.amount).toFixed(2)} ${p.status}`
      );
      console.log(`  Purchases (${purs.length}):`);
      for (const l of lines) console.log(l);
    }
    console.log(
      `  Activity: comments=${totals.comments} feedLikes=${totals.feedLikes} commentLikes=${totals.commentLikes} forumPosts=${totals.forumPosts} forumReplies=${totals.forumReplies} chat=${totals.chat} courses=${totals.enrollments} lessonsCompleted=${totals.lessonsDone} simulatorRuns=${sims.length}  TOTAL=${totalEngagement}`
    );
    if (sims.length) {
      for (const s of sims) {
        console.log(
          `    sim ${s.scenarioId} outcome=${s.outcome ?? "in-progress"} xp=${s.xpEarned} started=${fmt(s.startedAt)} done=${fmt(s.completedAt)}`
        );
      }
    }
  }

  // Last 20 user-authored events anywhere on Consilium for a "what's been happening" feed.
  console.log(`\n=== LAST 20 MEMBER ACTIONS ===\n`);
  const recentComments = await prisma.feedComment.findMany({
    where: { authorId: { in: userIds } },
    select: {
      createdAt: true,
      content: true,
      author: { select: { email: true, displayName: true, name: true } },
      post: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  for (const c of recentComments) {
    const who = c.author?.displayName ?? c.author?.name ?? c.author?.email ?? "?";
    const snippet = c.content.replace(/\s+/g, " ").slice(0, 80);
    console.log(`  ${c.createdAt.toISOString()}  ${who}  on "${c.post?.title ?? "?"}": ${snippet}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
