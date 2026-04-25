/**
 * Engagement deep-dive — three threads:
 *   1. Gift → paid conversion (do gifts ever upgrade?)
 *   2. Mission L2 → L5 drop-off (where exactly do players quit?)
 *   3. Zero-comments feed (is it stuck moderation, gated UI, or just dead?)
 *
 * Read-only. Run with: DATABASE_URL=<prod> npx tsx scripts/engagement-deep-dive.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function ago(d: Date | null): string {
  if (!d) return "—";
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 1440)}d ago`;
}

function until(d: Date | null): string {
  if (!d) return "—";
  const mins = Math.round((d.getTime() - Date.now()) / 60000);
  if (mins < 0) return `expired ${ago(d)}`;
  if (mins < 60) return `in ${mins}m`;
  if (mins < 1440) return `in ${Math.round(mins / 60)}h`;
  return `in ${Math.round(mins / 1440)}d`;
}

async function main() {
  const h = (s: string) => console.log(`\n━━━━ ${s} ━━━━`);

  // ====================================================================
  h("THREAD 1: GIFT → PAID CONVERSION");
  // ====================================================================

  // All memberships that ever had a gift cycle
  const allGifts = await prisma.communityMembership.findMany({
    where: {
      OR: [{ billingCycle: "gift" }, { billingCycle: "trial" }],
    },
    select: {
      id: true,
      userId: true,
      status: true,
      billingCycle: true,
      createdAt: true,
      activatedAt: true,
      expiresAt: true,
      paypalSubscriptionId: true,
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`  Total gift/trial memberships ever: ${allGifts.length}`);

  // Status breakdown
  const byStatus = new Map<string, number>();
  for (const g of allGifts) {
    const key = `${g.billingCycle}/${g.status}`;
    byStatus.set(key, (byStatus.get(key) || 0) + 1);
  }
  for (const [k, v] of Array.from(byStatus.entries()).sort()) {
    console.log(`    ${k.padEnd(20)} ${v}`);
  }

  // Gifts/trials with expiresAt in the past — did they convert?
  const now = new Date();
  const expired = allGifts.filter(
    (g) => g.expiresAt && g.expiresAt.getTime() < now.getTime(),
  );
  console.log(`\n  Gifts/trials past expiresAt: ${expired.length}`);

  let converted = 0;
  let stillActive = 0;
  let lapsed = 0;
  for (const g of expired) {
    if (g.paypalSubscriptionId) {
      // They have a subscription ID — converted to paid (or still on
      // monthly after gift)
      converted++;
    } else if (g.status === "ACTIVE") {
      stillActive++;
    } else {
      lapsed++;
    }
  }
  console.log(`    converted to paid (has paypalSubscriptionId): ${converted}`);
  console.log(`    still ACTIVE somehow (no sub):                ${stillActive}`);
  console.log(`    lapsed (CANCELLED/EXPIRED, no sub):            ${lapsed}`);

  // Gifts/trials expiring in the next 14d — the actionable cohort
  const in14d = new Date(now.getTime() + 14 * 86400_000);
  const expiringSoon = allGifts.filter(
    (g) =>
      g.status === "ACTIVE" &&
      g.expiresAt &&
      g.expiresAt.getTime() > now.getTime() &&
      g.expiresAt.getTime() < in14d.getTime(),
  );
  console.log(`\n  Active gifts/trials expiring in next 14d: ${expiringSoon.length}`);
  for (const g of expiringSoon.slice(0, 12)) {
    console.log(
      `    ${g.billingCycle.padEnd(7)}  ${g.user?.email?.padEnd(35) || "—".padEnd(35)}  ${until(g.expiresAt)}`,
    );
  }

  // ====================================================================
  h("THREAD 2: SIMULATOR DROP-OFF — WHERE DO PLAYERS QUIT?");
  // ====================================================================

  // For each scenario, count: started vs completed, and time-to-quit
  const allRuns = await prisma.simulatorProgress.findMany({
    select: {
      id: true,
      userId: true,
      scenarioId: true,
      outcome: true,
      currentSceneId: true,
      startedAt: true,
      completedAt: true,
    },
  });

  console.log(`  Total simulator runs (all time): ${allRuns.length}`);

  // Group by scenario
  const byScenario = new Map<
    string,
    {
      starts: number;
      completed: number;
      good: number;
      bad: number;
      neutral: number;
      abandoned: number;
      avgScenesIfAbandoned: number[];
    }
  >();
  for (const r of allRuns) {
    const e = byScenario.get(r.scenarioId) || {
      starts: 0,
      completed: 0,
      good: 0,
      bad: 0,
      neutral: 0,
      abandoned: 0,
      avgScenesIfAbandoned: [],
    };
    e.starts++;
    if (r.completedAt) {
      e.completed++;
      if (r.outcome === "good") e.good++;
      else if (r.outcome === "bad") e.bad++;
      else if (r.outcome === "neutral") e.neutral++;
    } else {
      e.abandoned++;
    }
    byScenario.set(r.scenarioId, e);
  }

  // Sort by starts desc, show top 30 with abandon-rate
  const sorted = Array.from(byScenario.entries()).sort(
    (a, b) => b[1].starts - a[1].starts,
  );
  console.log("");
  console.log(
    `  ${"scenario".padEnd(26)} ${"starts".padStart(7)} ${"done".padStart(5)} ${"abnd".padStart(5)}  abandon%   verdicts`,
  );
  console.log("  " + "─".repeat(80));
  for (const [sid, s] of sorted.slice(0, 30)) {
    const abandonPct = s.starts > 0 ? Math.round((s.abandoned / s.starts) * 100) : 0;
    const verdict = `g${s.good} b${s.bad} n${s.neutral}`;
    console.log(
      `  ${sid.padEnd(26)} ${String(s.starts).padStart(7)} ${String(s.completed).padStart(5)} ${String(s.abandoned).padStart(5)}     ${String(abandonPct).padStart(3)}%      ${verdict}`,
    );
  }

  // Where exactly are abandoned runs stalled?
  console.log("\n  ABANDONED RUNS — last scene reached (mission-2-x and mission-3-x):");
  const stalledMissions = allRuns
    .filter(
      (r) =>
        !r.completedAt &&
        (r.scenarioId.startsWith("mission-2") ||
          r.scenarioId.startsWith("mission-3") ||
          r.scenarioId.startsWith("mission-4") ||
          r.scenarioId.startsWith("mission-5")),
    )
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  for (const r of stalledMissions.slice(0, 15)) {
    console.log(
      `    ${r.scenarioId.padEnd(20)}  stalled at: ${(r.currentSceneId || "—").padEnd(30)}  started ${ago(r.startedAt)}`,
    );
  }

  // Multi-scenario players — who's actually progressing?
  const playerScenarios = new Map<string, Set<string>>();
  for (const r of allRuns) {
    const set = playerScenarios.get(r.userId) || new Set();
    set.add(r.scenarioId);
    playerScenarios.set(r.userId, set);
  }
  const userIds = Array.from(playerScenarios.keys());
  const usersById = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true },
  });
  const emailById = new Map(usersById.map((u) => [u.id, u.email]));

  console.log("\n  PLAYERS BY SCENARIO COUNT (depth of engagement):");
  const sortedPlayers = Array.from(playerScenarios.entries()).sort(
    (a, b) => b[1].size - a[1].size,
  );
  for (const [uid, set] of sortedPlayers.slice(0, 12)) {
    console.log(
      `    ${String(set.size).padStart(3)} unique scenarios  ${emailById.get(uid) || uid}`,
    );
  }

  // ====================================================================
  h("THREAD 3: ZERO-COMMENTS FEED — WHY?");
  // ====================================================================

  // Total feed posts vs total comments (all time)
  const totalPosts = await prisma.feedPost.count();
  const totalComments = await prisma.feedComment.count();
  console.log(`  Total feed posts (all time): ${totalPosts}`);
  console.log(`  Total comments (all time):   ${totalComments}`);

  // Comments by status — anyone stuck in moderation queue?
  const commentsByStatus = await prisma.feedComment.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  console.log(`\n  Comments by status:`);
  for (const c of commentsByStatus) {
    console.log(`    ${String(c.status).padEnd(20)} ${c._count._all}`);
  }

  // Recent feed posts — likes + comment counts per post
  const recentPosts = await prisma.feedPost.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 30 * 86400_000) } },
    select: {
      id: true,
      title: true,
      type: true,
      createdAt: true,
      _count: {
        select: { comments: true, likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  console.log(`\n  Recent feed posts (last 30d, ${recentPosts.length} shown):`);
  console.log(
    `    ${"when".padEnd(8)} ${"type".padEnd(18)} ${"likes".padStart(5)} ${"cmts".padStart(5)}  title`,
  );
  for (const p of recentPosts) {
    const t = (p.title || "").slice(0, 60);
    console.log(
      `    ${ago(p.createdAt).padEnd(8)} ${(p.type || "—").padEnd(18)} ${String(p._count.likes).padStart(5)} ${String(p._count.comments).padStart(5)}  ${t}`,
    );
  }

  // Member count check — how many people CAN comment?
  const activeMembers = await prisma.communityMembership.count({
    where: { status: "ACTIVE" },
  });
  console.log(`\n  Active members who could comment: ${activeMembers}`);

  // Likes per post (engagement floor — if even likes are zero, that's a UX/visibility issue)
  const likesByPost = await prisma.feedPostLike.groupBy({
    by: ["postId"],
    _count: { _all: true },
  });
  const totalLikes = likesByPost.reduce((acc, x) => acc + x._count._all, 0);
  const postsWithAnyLike = likesByPost.length;
  console.log(`  Total likes ever:           ${totalLikes}`);
  console.log(`  Posts with ≥1 like:         ${postsWithAnyLike} / ${totalPosts}`);

  // Distinct unique commenters (lifetime)
  const commenterIds = await prisma.feedComment.findMany({
    select: { authorId: true },
    distinct: ["authorId"],
  });
  console.log(`  Distinct commenters lifetime: ${commenterIds.length}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
