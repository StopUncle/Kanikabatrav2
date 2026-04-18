/**
 * Production health snapshot — inspects the Consilium tables for stuck
 * states, pending-review queues, and inconsistencies that the UI
 * wouldn't necessarily surface. Read-only.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const h = (s: string) => console.log(`\n=== ${s} ===`);

  h("MEMBERSHIPS");
  const membershipByStatus = await prisma.communityMembership.groupBy({
    by: ["status"],
    _count: true,
  });
  for (const row of membershipByStatus) {
    console.log(`  ${row.status.padEnd(12)} ${row._count}`);
  }

  const byCycle = await prisma.communityMembership.groupBy({
    by: ["billingCycle"],
    where: { status: "ACTIVE" },
    _count: true,
  });
  console.log("  Active memberships by billingCycle:");
  for (const row of byCycle) {
    console.log(`    ${row.billingCycle.padEnd(14)} ${row._count}`);
  }

  // Stuck: ACTIVE but expiresAt in the past (lazy expiry hasn't run)
  const stuckExpired = await prisma.communityMembership.count({
    where: { status: "ACTIVE", expiresAt: { lt: now } },
  });
  console.log(`  Stuck ACTIVE-but-expired: ${stuckExpired} (lazy-expiry will flip on next read)`);

  // Expiring in 7 days — will hit the cron reminder
  const expiringSoon = await prisma.communityMembership.count({
    where: {
      status: "ACTIVE",
      expiresAt: { gt: now, lte: new Date(now.getTime() + 7 * 86400000) },
    },
  });
  console.log(`  Expiring in next 7 days (needs cron to send reminder): ${expiringSoon}`);

  h("COMMENTS");
  const commentsByStatus = await prisma.feedComment.groupBy({
    by: ["status"],
    _count: true,
  });
  for (const row of commentsByStatus) {
    console.log(`  ${row.status.padEnd(20)} ${row._count}`);
  }
  const pendingTotal =
    commentsByStatus.find((r) => r.status === "PENDING_REVIEW")?._count ?? 0;
  if (pendingTotal > 0) {
    console.log(`  ${pendingTotal} comments awaiting admin review`);
  }

  h("REPORTS");
  const totalReports = await prisma.commentReport.count();
  const unresolvedReports = await prisma.commentReport.count({
    where: { resolvedAt: null },
  });
  console.log(`  Total: ${totalReports}`);
  console.log(`  Unresolved (needs admin triage): ${unresolvedReports}`);

  h("APPLICATIONS");
  const apps = await prisma.communityMembership.groupBy({
    by: ["status"],
    where: { status: { in: ["PENDING", "APPROVED"] } },
    _count: true,
  });
  for (const row of apps) {
    console.log(`  ${row.status.padEnd(10)} ${row._count}`);
  }

  h("FEED POSTS");
  const postsByType = await prisma.feedPost.groupBy({
    by: ["type"],
    _count: true,
  });
  for (const row of postsByType) {
    console.log(`  ${row.type.padEnd(20)} ${row._count}`);
  }
  const pinnedCount = await prisma.feedPost.count({ where: { isPinned: true } });
  console.log(`  Pinned posts: ${pinnedCount}`);

  h("CHAT MESSAGES");
  const msgCount = await prisma.chatMessage.count();
  const lastMsg = await prisma.chatMessage.findFirst({
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  console.log(`  Total: ${msgCount}`);
  console.log(`  Last sent: ${lastMsg?.createdAt?.toISOString() ?? "never"}`);

  h("EMAIL QUEUE");
  const emailsByStatus = await prisma.emailQueue.groupBy({
    by: ["status"],
    _count: true,
  });
  for (const row of emailsByStatus) {
    console.log(`  ${row.status.padEnd(14)} ${row._count}`);
  }
  const oldestPending = await prisma.emailQueue.findFirst({
    where: { status: "PENDING" },
    orderBy: { scheduledAt: "asc" },
    select: { scheduledAt: true, sequence: true },
  });
  if (oldestPending) {
    console.log(
      `  Oldest PENDING: ${oldestPending.scheduledAt.toISOString()} (${oldestPending.sequence}) — needs cron`,
    );
  }

  h("BANS");
  const banCount = await prisma.user.count({ where: { isBanned: true } });
  console.log(`  Total banned users: ${banCount}`);

  h("SIMULATOR USAGE");
  const playCount = await prisma.simulatorProgress.count({
    where: { completedAt: { not: null } },
  });
  const uniqPlayers = await prisma.simulatorProgress.groupBy({
    by: ["userId"],
    where: { completedAt: { not: null } },
    _count: true,
  });
  console.log(`  Scenarios completed: ${playCount}`);
  console.log(`  Unique players: ${uniqPlayers.length}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
