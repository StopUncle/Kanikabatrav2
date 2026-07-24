/**
 * Retro-grant Standing from historical activity — run ONCE at Rings launch.
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
 *  - Bots excluded (isBot=true) — training bots must not hold rings.
 *
 * Usage:
 *   npx tsx scripts/retro-grant-standing.ts             # dry run + table
 *   DATABASE_URL=<prod> npx tsx scripts/retro-grant-standing.ts --apply
 *
 * Run BEFORE deploying the live grant wiring to prod (or immediately
 * after — live paths only grant on NEW actions, so order only matters
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

async function computeUserTotal(user: {
  id: string;
  email: string;
  displayName: string | null;
  dailyStreakLongest: number;
}): Promise<UserTotal> {
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
    prisma.simulatorProgress.aggregate({
      where: { userId: user.id, completedAt: { not: null } },
      _sum: { xpEarned: true },
    }),
    prisma.tellResponse.count({
      where: { userId: user.id, countedScored: true },
    }),
    prisma.tellResponse.count({
      where: { userId: user.id, countedScored: true, isCorrect: true },
    }),
    prisma.gameSession.count({ where: { userId: user.id } }),
    prisma.labSession.count({
      where: { userId: user.id, status: "ENDED" },
    }),
    prisma.receipt.count({ where: { userId: user.id } }),
    prisma.feedComment.count({
      where: { authorId: user.id, status: "APPROVED" },
    }),
    prisma.memberQuestion.count({
      where: { userId: user.id, status: "ANSWERED" },
    }),
  ]);

  const breakdown: Record<string, number> = {
    scenario:
      (scenarioXp._sum.xpEarned ?? 0) * STANDING.SCENARIO_XP_MULTIPLIER,
    // Approximate the per-axis bonus with one axis per correct answer —
    // historical axesImpact isn't worth re-deriving row by row.
    tells:
      scoredTells * STANDING.TELL + correctTells * STANDING.TELL_CORRECT_AXIS,
    drills: drills * STANDING.DRILL,
    lab: labs * STANDING.LAB,
    receipts: receipts * STANDING.RECEIPT,
    comments: comments * STANDING.COMMENT,
    questions: answered * STANDING.QUESTION_ANSWERED,
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

  const totals: UserTotal[] = [];
  for (const user of pending) {
    totals.push(await computeUserTotal(user));
  }

  // Ring distribution — the founder gut-check.
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

  let written = 0;
  for (const t of totals) {
    if (t.total <= 0) {
      // Zero-history users still get their RETRO marker so a re-run
      // skips them, but no standing change.
      await prisma.standingEvent.create({
        data: {
          userId: t.userId,
          source: "RETRO",
          amount: 0,
          refId: "launch",
        },
      });
      continue;
    }
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
  console.log(`\nApplied: ${written} users granted, ${totals.length - written} zero-history markers.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
