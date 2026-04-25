/**
 * Quick snapshot of recent user activity. Read-only.
 * Prints the last N hours of: logins, simulator runs, purchases,
 * new registrations, comments, application submissions.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const HOURS = 24;

async function main() {
  const since = new Date(Date.now() - HOURS * 3600 * 1000);
  const h = (s: string) => console.log(`\n=== ${s} (last ${HOURS}h) ===`);

  h("NEW USERS");
  const newUsers = await prisma.user.count({ where: { createdAt: { gte: since } } });
  const newUserRows = await prisma.user.findMany({
    where: { createdAt: { gte: since } },
    select: { email: true, createdAt: true, role: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  console.log(`  Total new registrations: ${newUsers}`);
  for (const u of newUserRows) {
    const mins = Math.round((Date.now() - u.createdAt.getTime()) / 60000);
    console.log(`    ${String(mins).padStart(4)}m ago  ${u.role.padEnd(7)} ${u.email}`);
  }

  h("USERS WITH RECENT ACTIVITY (updatedAt proxy)");
  const recentlySeen = await prisma.user.findMany({
    where: { updatedAt: { gte: since } },
    select: { email: true, updatedAt: true, role: true, createdAt: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });
  console.log(`  Users touched in last ${HOURS}h: ${recentlySeen.length}`);
  for (const u of recentlySeen) {
    const mins = Math.round((Date.now() - u.updatedAt.getTime()) / 60000);
    const isNew = u.createdAt.getTime() === u.updatedAt.getTime() ? "(new)" : "";
    console.log(`    ${String(mins).padStart(4)}m ago  ${u.role.padEnd(7)} ${u.email} ${isNew}`);
  }

  h("SIMULATOR RUNS (started)");
  const recentRuns = await prisma.simulatorProgress.findMany({
    where: { startedAt: { gte: since } },
    select: {
      scenarioId: true,
      completedAt: true,
      outcome: true,
      xpEarned: true,
      startedAt: true,
      user: { select: { email: true } },
    },
    orderBy: { startedAt: "desc" },
    take: 30,
  });
  console.log(`  Runs started in last ${HOURS}h: ${recentRuns.length}`);
  for (const r of recentRuns) {
    const mins = Math.round((Date.now() - r.startedAt.getTime()) / 60000);
    const done = r.completedAt ? `${r.outcome ?? "?"} +${r.xpEarned}xp` : "in-progress";
    console.log(`    ${String(mins).padStart(4)}m ago  ${r.scenarioId.padEnd(22)} ${done.padEnd(18)} ${r.user?.email ?? "?"}`);
  }

  h("PURCHASES");
  const recentPurchases = await prisma.purchase.findMany({
    where: { createdAt: { gte: since } },
    select: {
      type: true,
      productVariant: true,
      amount: true,
      createdAt: true,
      customerName: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  console.log(`  Purchases in last ${HOURS}h: ${recentPurchases.length}`);
  for (const p of recentPurchases) {
    const mins = Math.round((Date.now() - p.createdAt.getTime()) / 60000);
    const amt = typeof p.amount === "number" ? p.amount.toFixed(2) : String(p.amount);
    console.log(
      `    ${String(mins).padStart(4)}m ago  ${p.type.padEnd(22)} $${amt.padStart(7)}  ${p.user?.email ?? p.customerName ?? "?"}`,
    );
  }

  h("COMMENTS");
  const recentComments = await prisma.feedComment.findMany({
    where: { createdAt: { gte: since } },
    select: {
      status: true,
      createdAt: true,
      content: true,
      author: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
  console.log(`  Comments in last ${HOURS}h: ${recentComments.length}`);
  for (const c of recentComments) {
    const mins = Math.round((Date.now() - c.createdAt.getTime()) / 60000);
    const preview = (c.content ?? "").slice(0, 70).replace(/\s+/g, " ");
    console.log(`    ${String(mins).padStart(4)}m ago  ${c.status.padEnd(16)} ${c.author?.email ?? "?"}  "${preview}"`);
  }

  h("QUIZ RESULTS");
  const recentQuiz = await prisma.quizResult.count({
    where: { createdAt: { gte: since } },
  });
  console.log(`  Quiz completions in last ${HOURS}h: ${recentQuiz}`);

  h("APPLICATIONS");
  const pendingApps = await prisma.communityMembership.findMany({
    where: { status: "PENDING", createdAt: { gte: since } },
    select: {
      createdAt: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  console.log(`  New applications in last ${HOURS}h: ${pendingApps.length}`);
  for (const a of pendingApps) {
    const mins = Math.round((Date.now() - a.createdAt.getTime()) / 60000);
    console.log(`    ${String(mins).padStart(4)}m ago  ${a.user?.email ?? "?"}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
