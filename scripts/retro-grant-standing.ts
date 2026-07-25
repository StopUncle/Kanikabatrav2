/**
 * Retro-grant Standing from historical activity, run ONCE at Rings launch.
 *
 * Never launch a rank system that tells your most loyal members they're
 * beginners: this script replays each real member's history (simulator XP,
 * scored Tells, drills, lab sessions, receipts, approved comments, answered
 * questions, streak milestones) into one RETRO StandingEvent per user and
 * sets User.standing + ringLevel to match.
 *
 * Safety:
 *  - DRY RUN by default. Pass --apply to write.
 *  - Idempotent: users who already have a RETRO event are skipped, so a
 *    crashed run can be re-run and finishes the remainder.
 *  - Bots excluded (isBot=true), training bots must not hold rings.
 *
 * Performance: all history is read with 8 grouped aggregates (one per
 * activity type) instead of 8 queries per user. Over the Railway proxy the
 * per-user version took ~30 minutes for 1.5k users; this takes seconds.
 *
 * Usage:
 *   npx tsx scripts/retro-grant-standing.ts             # dry run + table
 *   DATABASE_URL=<prod> npx tsx scripts/retro-grant-standing.ts --apply
 *
 * Run BEFORE deploying the live grant wiring to prod (or immediately
 * after, live paths only grant on NEW actions, so order only matters
 * for the few minutes between deploy and script).
 */

import { PrismaClient } from "@prisma/client";
import { STANDING, ringForStanding, RINGS } from "../lib/standing/config";

const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

interface UserTotal {
  userId: string;
  label: string;
  breakdown: Record<string, number>;
  total: number;
}

function toMap<T>(
  rows: T[],
  key: (row: T) => string,
  value: (row: T) => number,
): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows) map.set(key(row), value(row));
  return map;
}

async function main() {
  console.log(
    APPLY ? "== RETRO-GRANT: APPLY MODE ==" : "== RETRO-GRANT: DRY RUN ==",
  );

  const users = await prisma.user.findMany({
    where: { isBot: false },
    select: {
      id: true,
      email: true,
      displayName: true,
      dailyStreakLongest: true,
      standingEvents: {
        where: { source: "RETRO" },
        select: { id: true },
        take: 1,
      },
    },
  });

  const pending = users.filter((u) => u.standingEvents.length === 0);
  console.log(
    `${users.length} real users, ${users.length - pending.length} already retro-granted, ${pending.length} to process\n`,
  );

  // One grouped aggregate per activity type instead of one per user.
  const [
    scenarioXp,
    scoredTells,
    correctTells,
    drills,
    labs,
    receipts,
    comments,
    answered,
  ] = await Promise.all([
    prisma.simulatorProgress.groupBy({
      by: ["userId"],
      where: { completedAt: { not: null } },
      _sum: { xpEarned: true },
    }),
    prisma.tellResponse.groupBy({
      by: ["userId"],
      where: { countedScored: true },
      _count: { _all: true },
    }),
    prisma.tellResponse.groupBy({
      by: ["userId"],
      where: { countedScored: true, isCorrect: true },
      _count: { _all: true },
    }),
    prisma.gameSession.groupBy({
      by: ["userId"],
      _count: { _all: true },
    }),
    prisma.labSession.groupBy({
      by: ["userId"],
      where: { status: "ENDED" },
      _count: { _all: true },
    }),
    prisma.receipt.groupBy({
      by: ["userId"],
      _count: { _all: true },
    }),
    prisma.feedComment.groupBy({
      by: ["authorId"],
      where: { status: "APPROVED" },
      _count: { _all: true },
    }),
    prisma.memberQuestion.groupBy({
      by: ["userId"],
      where: { status: "ANSWERED" },
      _count: { _all: true },
    }),
  ]);

  const xpByUser = toMap(
    scenarioXp,
    (r) => r.userId,
    (r) => r._sum.xpEarned ?? 0,
  );
  // tellResponse.userId is nullable (guest responses); null keys can never
  // match a real user id, so folding them to "" is safe.
  const scoredByUser = toMap(
    scoredTells,
    (r) => r.userId ?? "",
    (r) => r._count._all,
  );
  const correctByUser = toMap(
    correctTells,
    (r) => r.userId ?? "",
    (r) => r._count._all,
  );
  const drillsByUser = toMap(drills, (r) => r.userId, (r) => r._count._all);
  const labsByUser = toMap(labs, (r) => r.userId, (r) => r._count._all);
  const receiptsByUser = toMap(receipts, (r) => r.userId, (r) => r._count._all);
  const commentsByUser = toMap(
    comments,
    (r) => r.authorId,
    (r) => r._count._all,
  );
  const answeredByUser = toMap(answered, (r) => r.userId, (r) => r._count._all);

  const totals: UserTotal[] = pending.map((user) => {
    const breakdown: Record<string, number> = {
      scenario:
        (xpByUser.get(user.id) ?? 0) * STANDING.SCENARIO_XP_MULTIPLIER,
      // Approximate the per-axis bonus with one axis per correct answer,
      // historical axesImpact isn't worth re-deriving row by row.
      tells:
        (scoredByUser.get(user.id) ?? 0) * STANDING.TELL +
        (correctByUser.get(user.id) ?? 0) * STANDING.TELL_CORRECT_AXIS,
      drills: (drillsByUser.get(user.id) ?? 0) * STANDING.DRILL,
      lab: (labsByUser.get(user.id) ?? 0) * STANDING.LAB,
      receipts: (receiptsByUser.get(user.id) ?? 0) * STANDING.RECEIPT,
      comments: (commentsByUser.get(user.id) ?? 0) * STANDING.COMMENT,
      questions:
        (answeredByUser.get(user.id) ?? 0) * STANDING.QUESTION_ANSWERED,
      streaks: Object.entries(STANDING.STREAK_MILESTONES)
        .filter(([days]) => user.dailyStreakLongest >= Number(days))
        .reduce((sum, [, amount]) => sum + amount, 0),
    };
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    return {
      userId: user.id,
      label: user.displayName || user.email,
      breakdown,
      total,
    };
  });

  // Ring distribution, the founder gut-check.
  const dist = new Map<number, number>();
  for (const t of totals) {
    const ring = ringForStanding(t.total);
    dist.set(ring.level, (dist.get(ring.level) ?? 0) + 1);
  }
  console.log("Ring distribution:");
  for (const r of RINGS) {
    const n = dist.get(r.level) ?? 0;
    if (n > 0 || r.level === 7) {
      console.log(`  ${r.name.padEnd(18)} ${String(n).padStart(4)} members`);
    }
  }

  console.log("\nTop 15 by Standing (gut-check these against who you know):");
  const top = [...totals].sort((a, b) => b.total - a.total).slice(0, 15);
  for (const t of top) {
    const ring = ringForStanding(t.total);
    const parts = Object.entries(t.breakdown)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${k}:${v}`)
      .join(" ");
    console.log(
      `  ${t.label.slice(0, 28).padEnd(30)} ${String(t.total).padStart(6)}  ${ring.name}  (${parts})`,
    );
  }

  if (!APPLY) {
    console.log("\nDry run only. Re-run with --apply to write.");
    return;
  }

  // Zero-history users only need their RETRO marker so a re-run skips
  // them, one createMany instead of a row-by-row loop.
  const zero = totals.filter((t) => t.total <= 0);
  if (zero.length > 0) {
    await prisma.standingEvent.createMany({
      data: zero.map((t) => ({
        userId: t.userId,
        source: "RETRO" as const,
        amount: 0,
        refId: "launch",
      })),
    });
  }

  let written = 0;
  for (const t of totals) {
    if (t.total <= 0) continue;
    const ring = ringForStanding(t.total);
    await prisma.$transaction([
      prisma.standingEvent.create({
        data: {
          userId: t.userId,
          source: "RETRO",
          amount: t.total,
          refId: "launch",
        },
      }),
      prisma.user.update({
        where: { id: t.userId },
        data: { standing: { increment: t.total }, ringLevel: ring.level },
      }),
    ]);
    written++;
  }
  console.log(
    `\nApplied: ${written} users granted, ${zero.length} zero-history markers.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
