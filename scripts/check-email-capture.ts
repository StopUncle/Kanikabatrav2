/**
 * Read-only diagnostic: how many emails has every capture surface
 * collected, and what's the recency profile? Writes nothing.
 *
 * Run: DATABASE_URL=<prod-public> npx tsx scripts/check-email-capture.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function pct(n: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((n / total) * 100)}%`;
}

async function main() {
  const now = new Date();
  const day7 = new Date(now.getTime() - 7 * 86_400_000);
  const day30 = new Date(now.getTime() - 30 * 86_400_000);
  const day90 = new Date(now.getTime() - 90 * 86_400_000);

  console.log("\n=== Email capture audit ===\n");

  // 1. Subscriber table (newsletter / quiz / presale / book-sample)
  const subTotal = await prisma.subscriber.count();
  const subBySource = await prisma.subscriber.groupBy({
    by: ["source"],
    _count: { _all: true },
    orderBy: { _count: { source: "desc" } },
  });
  const sub7 = await prisma.subscriber.count({
    where: { createdAt: { gte: day7 } },
  });
  const sub30 = await prisma.subscriber.count({
    where: { createdAt: { gte: day30 } },
  });
  const sub90 = await prisma.subscriber.count({
    where: { createdAt: { gte: day90 } },
  });

  console.log(`Subscribers (newsletter / quiz / presale / book-sample)`);
  console.log(`  total:     ${subTotal}`);
  console.log(`  last 7d:   ${sub7}`);
  console.log(`  last 30d:  ${sub30}`);
  console.log(`  last 90d:  ${sub90}`);
  console.log(`  by source:`);
  for (const s of subBySource) {
    console.log(`    ${s.source.padEnd(20)} ${s._count._all}`);
  }
  console.log("");

  // 2. Users (registrations — actual accounts)
  const userTotal = await prisma.user.count({
    where: { isBot: false, isTrainingBot: false },
  });
  const user7 = await prisma.user.count({
    where: {
      isBot: false,
      isTrainingBot: false,
      createdAt: { gte: day7 },
    },
  });
  const user30 = await prisma.user.count({
    where: {
      isBot: false,
      isTrainingBot: false,
      createdAt: { gte: day30 },
    },
  });
  const user90 = await prisma.user.count({
    where: {
      isBot: false,
      isTrainingBot: false,
      createdAt: { gte: day90 },
    },
  });

  console.log(`Users (real accounts, excluding all bots)`);
  console.log(`  total:     ${userTotal}`);
  console.log(`  last 7d:   ${user7}`);
  console.log(`  last 30d:  ${user30}`);
  console.log(`  last 90d:  ${user90}`);
  console.log("");

  // 3. Quiz results — anonymous + authenticated
  const quizTotal = await prisma.quizResult.count();
  const quizWithEmail = await prisma.quizResult.count({
    where: { email: { not: null } },
  });
  const quizPaid = await prisma.quizResult.count({ where: { paid: true } });
  const quiz7 = await prisma.quizResult.count({
    where: { createdAt: { gte: day7 } },
  });
  const quiz30 = await prisma.quizResult.count({
    where: { createdAt: { gte: day30 } },
  });
  const quiz90 = await prisma.quizResult.count({
    where: { createdAt: { gte: day90 } },
  });
  const quiz7Email = await prisma.quizResult.count({
    where: { createdAt: { gte: day7 }, email: { not: null } },
  });
  const quiz30Email = await prisma.quizResult.count({
    where: { createdAt: { gte: day30 }, email: { not: null } },
  });

  console.log(`Quiz results (Dark Mirror — full quiz, not the mini)`);
  console.log(`  total:                ${quizTotal}`);
  console.log(`  with email captured:  ${quizWithEmail} (${pct(quizWithEmail, quizTotal)})`);
  console.log(`  paid unlocks:         ${quizPaid}`);
  console.log(`  last 7d:   ${quiz7} (${quiz7Email} with email)`);
  console.log(`  last 30d:  ${quiz30} (${quiz30Email} with email)`);
  console.log(`  last 90d:  ${quiz90}`);
  console.log("");

  // 4. Quiz attribution — how are people finding the quiz?
  const quizBySource = await prisma.quizResult.groupBy({
    by: ["utmSource"],
    _count: { _all: true },
    where: { utmSource: { not: null } },
    orderBy: { _count: { utmSource: "desc" } },
    take: 10,
  });
  if (quizBySource.length > 0) {
    console.log(`Quiz attribution (top utm_source values)`);
    for (const s of quizBySource) {
      console.log(`  ${(s.utmSource ?? "—").padEnd(20)} ${s._count._all}`);
    }
    console.log("");
  } else {
    console.log(`Quiz attribution: no utmSource captured yet`);
    console.log("");
  }

  // 5. Email overlap. How many of the unique emails across all three
  //    surfaces are net-new vs already-on-some-other-list?
  const subEmails = await prisma.subscriber.findMany({
    select: { email: true },
  });
  const userEmails = await prisma.user.findMany({
    where: { isBot: false, isTrainingBot: false },
    select: { email: true },
  });
  const quizEmails = await prisma.quizResult.findMany({
    where: { email: { not: null } },
    select: { email: true },
  });

  const subSet = new Set(subEmails.map((r) => r.email.toLowerCase()));
  const userSet = new Set(userEmails.map((r) => r.email.toLowerCase()));
  const quizSet = new Set(
    quizEmails.map((r) => (r.email as string).toLowerCase()),
  );

  const allUnique = new Set<string>([
    ...Array.from(subSet),
    ...Array.from(userSet),
    ...Array.from(quizSet),
  ]);
  const inAllThree = Array.from(allUnique).filter(
    (e) => subSet.has(e) && userSet.has(e) && quizSet.has(e),
  ).length;
  const onlyInSub = Array.from(subSet).filter(
    (e) => !userSet.has(e) && !quizSet.has(e),
  ).length;
  const onlyInUser = Array.from(userSet).filter(
    (e) => !subSet.has(e) && !quizSet.has(e),
  ).length;
  const onlyInQuiz = Array.from(quizSet).filter(
    (e) => !subSet.has(e) && !userSet.has(e),
  ).length;

  console.log(`Cross-surface overlap (deduped, lowercased)`);
  console.log(`  total unique emails:        ${allUnique.size}`);
  console.log(`  on all three surfaces:      ${inAllThree}`);
  console.log(`  only Subscriber:            ${onlyInSub}`);
  console.log(`  only User (account-only):   ${onlyInUser}`);
  console.log(`  only QuizResult:            ${onlyInQuiz}`);
  console.log("");

  // 6. Recent activity quick scan: 7-day flow visible?
  console.log(`Last 7 days, all surfaces combined: ${sub7 + user7 + quiz7Email}`);
  console.log(`Last 30 days, all surfaces combined: ${sub30 + user30 + quiz30Email}`);
  console.log("");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
