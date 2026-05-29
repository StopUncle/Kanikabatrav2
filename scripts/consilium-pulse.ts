/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const d7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const d30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

async function main() {
  // ---- 1. Membership base ----
  console.log("=== MEMBERSHIP BASE ===");
  const byStatus = await prisma.communityMembership.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  console.table(byStatus.map((r) => ({ status: r.status, count: r._count._all })));

  const bots = await prisma.user.count({ where: { isBot: true } });
  const activeMembers = await prisma.user.count({
    where: { isBot: false, communityMembership: { status: "ACTIVE" } },
  });
  console.log(`Bot users (synthetic): ${bots}`);
  console.log(`ACTIVE human members: ${activeMembers}`);

  // ---- 2. Member recency (lastSeenAt) ----
  const seen7 = await prisma.user.count({
    where: { isBot: false, communityMembership: { status: "ACTIVE" }, lastSeenAt: { gte: d7 } },
  });
  const seen30 = await prisma.user.count({
    where: { isBot: false, communityMembership: { status: "ACTIVE" }, lastSeenAt: { gte: d30 } },
  });
  console.log(`Active members seen in 7d: ${seen7} / ${activeMembers}`);
  console.log(`Active members seen in 30d: ${seen30} / ${activeMembers}`);

  // ---- 3. SIMULATOR ----
  console.log("\n=== SIMULATOR ===");
  const simAgg = await prisma.simulatorProgress.aggregate({
    _count: { _all: true },
    _sum: { completionCount: true, xpEarned: true },
  });
  const uniquePlayers = await prisma.simulatorProgress.findMany({
    distinct: ["userId"],
    select: { userId: true },
  });
  const distinctScenarios = await prisma.simulatorProgress.findMany({
    distinct: ["scenarioId"],
    select: { scenarioId: true },
  });
  console.log(`Progress rows (user×scenario started): ${simAgg._count._all}`);
  console.log(`Total completions (incl. replays): ${simAgg._sum.completionCount ?? 0}`);
  console.log(`Total XP earned: ${(simAgg._sum.xpEarned ?? 0).toLocaleString()}`);
  console.log(`Unique players: ${uniquePlayers.length}`);
  console.log(`Distinct scenarios touched: ${distinctScenarios.length}`);

  const started7 = await prisma.simulatorProgress.count({ where: { startedAt: { gte: d7 } } });
  const started30 = await prisma.simulatorProgress.count({ where: { startedAt: { gte: d30 } } });
  const completed7 = await prisma.simulatorProgress.count({ where: { completedAt: { gte: d7 } } });
  const completed30 = await prisma.simulatorProgress.count({ where: { completedAt: { gte: d30 } } });
  console.log(`New runs started 7d/30d: ${started7} / ${started30}`);
  console.log(`Runs completed 7d/30d: ${completed7} / ${completed30}`);

  // Per-player leaderboard (top 15 by total completions)
  const perUser = await prisma.$queryRawUnsafe<
    Array<{ email: string; is_bot: boolean; rows: bigint; completions: bigint; xp: bigint; endings: bigint; last_played: Date | null }>
  >(
    `SELECT u.email,
            u."isBot" AS is_bot,
            COUNT(sp.id)::bigint AS rows,
            COALESCE(SUM(sp."completionCount"),0)::bigint AS completions,
            COALESCE(SUM(sp."xpEarned"),0)::bigint AS xp,
            COALESCE(SUM(COALESCE(array_length(sp."endingsReached",1),0)),0)::bigint AS endings,
            MAX(GREATEST(sp."startedAt", sp."completedAt")) AS last_played
     FROM "SimulatorProgress" sp
     JOIN "User" u ON u.id = sp."userId"
     GROUP BY u.email, u."isBot"
     ORDER BY completions DESC, xp DESC
     LIMIT 15`,
  );
  console.log("\nTop players (by completions):");
  console.table(
    perUser.map((r) => ({
      email: r.email?.slice(0, 28),
      bot: r.is_bot,
      scenarios: Number(r.rows),
      completions: Number(r.completions),
      xp: Number(r.xp),
      endings: Number(r.endings),
      last_played: r.last_played ? r.last_played.toISOString().slice(0, 10) : "-",
    })),
  );

  const badges = await prisma.simulatorBadge.count();
  const badgeUsers = (await prisma.simulatorBadge.findMany({ distinct: ["userId"], select: { userId: true } })).length;
  console.log(`Simulator badges earned: ${badges} across ${badgeUsers} users`);

  // ---- 4. TELLS / INSTINCTS ----
  console.log("\n=== TELLS / INSTINCTS ===");
  const tellResp = await prisma.tellResponse.aggregate({ _count: { _all: true } });
  const tellResp7 = await prisma.tellResponse.count({ where: { answeredAt: { gte: d7 } } });
  const tellResp30 = await prisma.tellResponse.count({ where: { answeredAt: { gte: d30 } } });
  const tellUsers30 = (
    await prisma.tellResponse.findMany({
      where: { answeredAt: { gte: d30 }, userId: { not: null } },
      distinct: ["userId"],
      select: { userId: true },
    })
  ).length;
  console.log(`Tell responses total: ${tellResp._count._all}, 7d: ${tellResp7}, 30d: ${tellResp30}, unique users 30d: ${tellUsers30}`);

  const instinct = await prisma.instinctScore.aggregate({
    _count: { _all: true },
    _avg: { totalAnswered: true },
    _max: { totalAnswered: true },
  });
  console.log(`InstinctScore rows: ${instinct._count._all}, avg answered: ${Math.round(instinct._avg.totalAnswered ?? 0)}, max answered: ${instinct._max.totalAnswered ?? 0}`);

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
