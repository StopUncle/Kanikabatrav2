/**
 * How long are people staying active on the site / Consilium?
 *
 * Methodology:
 *
 * 1. SESSION DWELL — User.updatedAt is bumped on every authenticated
 *    request (auth middleware). Consecutive updates within 30 min of
 *    each other are treated as the same session; a gap >30 min ends
 *    the session. Session length = last_update - first_update of the
 *    burst. Single-update sessions count as 0 (single-page bounces).
 *
 *    We don't have page-view-level events server-side (GA4 owns
 *    that), but updatedAt deltas are a decent proxy: every gated
 *    page-load and every API call from the dashboard, feed,
 *    simulator, etc. touches the user row.
 *
 * 2. SIMULATOR DWELL — SimulatorProgress.startedAt → completedAt is
 *    a real per-scenario session duration. Truthful and exact.
 *
 * 3. RETENTION — for ACTIVE Consilium members, count how many
 *    distinct calendar days they've been active in the last 7 / 30,
 *    keyed off updatedAt only.
 *
 * Run:
 *   DATABASE_URL=<prod-public> npx tsx scripts/dwell-time.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SESSION_GAP_MS = 30 * 60 * 1000; // 30 min defines session boundary

function fmtDur(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m`;
  return `${(m / 60).toFixed(1)}h`;
}

function pct(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor((sorted.length - 1) * p)] ?? 0;
}

function median(arr: number[]): number {
  return pct(arr, 0.5);
}

async function main() {
  console.log("\n=== Dwell-time report ===");
  console.log("Generated:", new Date().toISOString(), "\n");

  // ---- 1. Simulator scenario dwell (truthful) ----
  console.log("--- Simulator: per-scenario completion time ---");
  const sims = await prisma.simulatorProgress.findMany({
    where: { completedAt: { not: null } },
    select: { startedAt: true, completedAt: true, scenarioId: true },
  });
  const simDurations = sims
    .map((s) => s.completedAt!.getTime() - s.startedAt.getTime())
    .filter((d) => d > 0 && d < 4 * 3600 * 1000); // sanity: drop >4h (left tab open)
  console.log(`  N completed runs: ${simDurations.length} (kept after sanity)`);
  if (simDurations.length > 0) {
    console.log(`  median:        ${fmtDur(median(simDurations))}`);
    console.log(`  p25:           ${fmtDur(pct(simDurations, 0.25))}`);
    console.log(`  p75:           ${fmtDur(pct(simDurations, 0.75))}`);
    console.log(`  p90:           ${fmtDur(pct(simDurations, 0.9))}`);
  }

  // ---- 2. Session dwell across the whole site ----
  // Approximation: walk users sorted by updatedAt, treat consecutive
  // updates from same user within SESSION_GAP_MS as a session. We
  // don't have a row-per-update audit log, so what we get here is
  // "time between the FIRST and LATEST request of the latest burst"
  // for each user — a single most-recent session. Useful as a
  // distribution of "last session length" but not a per-user
  // history. For the latter we'd need an EventLog table.
  //
  // Reframe: instead of session per user, compute "active duration
  // in last 60 min" for users active in last 60 min. Cheap proxy.
  console.log("\n--- Active users right now (last 5 / 30 / 60 min) ---");
  const now = Date.now();
  const fiveMinAgo = new Date(now - 5 * 60 * 1000);
  const thirtyMinAgo = new Date(now - 30 * 60 * 1000);
  const sixtyMinAgo = new Date(now - 60 * 60 * 1000);
  const [active5, active30, active60] = await Promise.all([
    prisma.user.count({ where: { updatedAt: { gte: fiveMinAgo }, isBot: false } }),
    prisma.user.count({ where: { updatedAt: { gte: thirtyMinAgo }, isBot: false } }),
    prisma.user.count({ where: { updatedAt: { gte: sixtyMinAgo }, isBot: false } }),
  ]);
  console.log(`  last  5 min: ${active5}`);
  console.log(`  last 30 min: ${active30}`);
  console.log(`  last 60 min: ${active60}`);

  // ---- 3. Daily active users over last 7 + 30 days ----
  console.log("\n--- Daily active (last 7 / 30 days, distinct human users) ---");
  const sevenAgo = new Date(now - 7 * 86400_000);
  const thirtyAgo = new Date(now - 30 * 86400_000);
  const [dau7, dau30] = await Promise.all([
    prisma.user.count({ where: { updatedAt: { gte: sevenAgo }, isBot: false } }),
    prisma.user.count({ where: { updatedAt: { gte: thirtyAgo }, isBot: false } }),
  ]);
  console.log(`  active last  7d: ${dau7} users`);
  console.log(`  active last 30d: ${dau30} users`);

  // ---- 4. Consilium member retention ----
  console.log("\n--- Consilium ACTIVE members: dwell + retention ---");
  const members = await prisma.user.findMany({
    where: {
      isBot: false,
      communityMembership: { status: "ACTIVE" },
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      updatedAt: true,
      createdAt: true,
      communityMembership: {
        select: { activatedAt: true, expiresAt: true },
      },
    },
  });
  console.log(`  total ACTIVE members: ${members.length}`);

  const tenureDays = members
    .map((m) => {
      const start = m.communityMembership?.activatedAt ?? m.createdAt;
      return (now - start.getTime()) / 86400_000;
    })
    .filter((d) => d > 0);
  console.log(`  median tenure: ${median(tenureDays).toFixed(1)} days`);

  const activeIn7 = members.filter(
    (m) => m.updatedAt.getTime() > sevenAgo.getTime(),
  );
  const activeIn30 = members.filter(
    (m) => m.updatedAt.getTime() > thirtyAgo.getTime(),
  );
  console.log(
    `  active in last  7d: ${activeIn7.length} / ${members.length}  (${((activeIn7.length / members.length) * 100).toFixed(0)}%)`,
  );
  console.log(
    `  active in last 30d: ${activeIn30.length} / ${members.length}  (${((activeIn30.length / members.length) * 100).toFixed(0)}%)`,
  );

  // ---- 5. Comment + simulator engagement on Consilium ----
  console.log("\n--- Member engagement breadth (last 7d) ---");
  const memberIds = members.map((m) => m.id);
  if (memberIds.length > 0) {
    const [commenters, simRunners, voiceListeners] = await Promise.all([
      prisma.feedComment.findMany({
        where: { authorId: { in: memberIds }, createdAt: { gte: sevenAgo } },
        select: { authorId: true },
        distinct: ["authorId"],
      }),
      prisma.simulatorProgress.findMany({
        where: { userId: { in: memberIds }, startedAt: { gte: sevenAgo } },
        select: { userId: true },
        distinct: ["userId"],
      }),
      // Comments distinct user ids tell us reach; total comments tell us depth
      prisma.feedComment.count({
        where: { authorId: { in: memberIds }, createdAt: { gte: sevenAgo } },
      }),
    ]);
    console.log(`  members who commented:    ${commenters.length} / ${members.length}`);
    console.log(`  members who hit simulator:${simRunners.length} / ${members.length}`);
    console.log(`  total comments (7d):      ${voiceListeners}`);
  }

  // ---- 6. Per-member "days active in last 7d" via simulator + comments ----
  // Best signal we have for "engagement time": distinct calendar days
  // the member did a meaningful action.
  console.log("\n--- Per-member: distinct active days in last 7d ---");
  if (memberIds.length > 0) {
    const [simEvents, commentEvents] = await Promise.all([
      prisma.simulatorProgress.findMany({
        where: { userId: { in: memberIds }, startedAt: { gte: sevenAgo } },
        select: { userId: true, startedAt: true },
      }),
      prisma.feedComment.findMany({
        where: { authorId: { in: memberIds }, createdAt: { gte: sevenAgo } },
        select: { authorId: true, createdAt: true },
      }),
    ]);
    const daysByUser = new Map<string, Set<string>>();
    for (const e of simEvents) {
      if (!e.startedAt) continue;
      const k = e.startedAt.toISOString().slice(0, 10);
      const set = daysByUser.get(e.userId) ?? new Set();
      set.add(k);
      daysByUser.set(e.userId, set);
    }
    for (const e of commentEvents) {
      const k = e.createdAt.toISOString().slice(0, 10);
      const set = daysByUser.get(e.authorId) ?? new Set();
      set.add(k);
      daysByUser.set(e.authorId, set);
    }
    const counts = members.map((m) => daysByUser.get(m.id)?.size ?? 0);
    const medianDays = median(counts);
    const at0 = counts.filter((c) => c === 0).length;
    const at1 = counts.filter((c) => c === 1).length;
    const at2to3 = counts.filter((c) => c >= 2 && c <= 3).length;
    const at4plus = counts.filter((c) => c >= 4).length;
    console.log(`  median active days: ${medianDays} (out of 7)`);
    console.log(`  0 active days:     ${at0} members`);
    console.log(`  1 active day:      ${at1}`);
    console.log(`  2-3 active days:   ${at2to3}`);
    console.log(`  4+ active days:    ${at4plus}`);
  }

  console.log("\n=== done ===\n");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
