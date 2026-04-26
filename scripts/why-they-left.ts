/**
 * Why didn't they come back? Profiles every ACTIVE Consilium member
 * who has been silent for 7+ days, against everything the DB knows
 * about how they spent their time before going dark.
 *
 * For each silent member we look at:
 *   - Account age vs last-active gap (how long did they stick?)
 *   - Their final action and timestamp (where did they bounce?)
 *   - Any stuck SimulatorProgress row (did they hit the loop bug?)
 *   - Their UTM source / referrer / landing page (channel mismatch?)
 *   - Whether they've ever commented, opened a course, etc. (did they
 *     even start using the membership benefits?)
 *
 * Run:
 *   DATABASE_URL=<prod-public> npx tsx scripts/why-they-left.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SILENCE_DAYS = 7;
// The simulator dialog-loop bug was patched in commit a8844f0 on
// 2026-04-25 ~21:48 UTC. Stuck SimulatorProgress rows from BEFORE
// that timestamp could have been caused by the bug. After that —
// the patch is live, so it's something else.
const SIM_FIX_AT = new Date("2026-04-25T21:48:00Z");

function daysAgo(d: Date | null): string {
  if (!d) return "never";
  const ms = Date.now() - d.getTime();
  const days = ms / 86400_000;
  if (days < 1) return `${Math.round(ms / 3600_000)}h ago`;
  return `${days.toFixed(1)}d ago`;
}

async function main() {
  const sevenAgo = new Date(Date.now() - SILENCE_DAYS * 86400_000);

  const silent = await prisma.user.findMany({
    where: {
      isBot: false,
      communityMembership: { status: "ACTIVE" },
      updatedAt: { lt: sevenAgo },
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      createdAt: true,
      updatedAt: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      referrer: true,
      landingPage: true,
      ipCountry: true,
      communityMembership: {
        select: {
          activatedAt: true,
          billingCycle: true,
          paypalSubscriptionId: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`\n=== Silent ACTIVE members (no activity for ${SILENCE_DAYS}+ days) ===\n`);
  console.log(`Total silent: ${silent.length}\n`);

  // Pre-fetch their final actions in parallel
  const ids = silent.map((s) => s.id);

  const [simRuns, comments, courseEnrolls, feedLikes, books] = await Promise.all([
    prisma.simulatorProgress.findMany({
      where: { userId: { in: ids } },
      select: {
        userId: true,
        scenarioId: true,
        currentSceneId: true,
        startedAt: true,
        completedAt: true,
        choicesMade: true,
        outcome: true,
      },
      orderBy: { startedAt: "desc" },
    }),
    prisma.feedComment.findMany({
      where: { authorId: { in: ids } },
      select: { authorId: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.courseEnrollment.findMany({
      where: { userId: { in: ids } },
      select: { userId: true, createdAt: true },
    }),
    prisma.feedPostLike.findMany({
      where: { userId: { in: ids } },
      select: { userId: true, createdAt: true },
    }),
    prisma.purchase.findMany({
      where: { userId: { in: ids }, type: "BOOK" },
      select: { userId: true, createdAt: true },
    }),
  ]);

  // Per-user last-action map
  type Action = { kind: string; at: Date; meta?: string };
  const lastActionByUser = new Map<string, Action>();
  function consider(uid: string, kind: string, at: Date, meta?: string) {
    const prev = lastActionByUser.get(uid);
    if (!prev || at.getTime() > prev.at.getTime()) {
      lastActionByUser.set(uid, { kind, at, meta });
    }
  }
  for (const s of simRuns) {
    if (s.completedAt) consider(s.userId, `sim:done:${s.scenarioId}`, s.completedAt, s.outcome ?? undefined);
    if (s.startedAt) consider(s.userId, `sim:start:${s.scenarioId}@${s.currentSceneId ?? "?"}`, s.startedAt);
  }
  for (const c of comments) consider(c.authorId, "comment", c.createdAt);
  for (const c of courseEnrolls) consider(c.userId, "course:enroll", c.createdAt);
  for (const f of feedLikes) consider(f.userId, "feed:like", f.createdAt);
  for (const b of books) {
    if (b.userId) consider(b.userId, "book:purchase", b.createdAt);
  }

  // Stuck-on-simulator detection: incomplete runs where currentSceneId
  // hasn't changed and choicesMade is empty/short — particularly if
  // they happened BEFORE the loop fix.
  const stuckByUser = new Map<string, { scenarioId: string; sceneId: string | null; startedAt: Date; preFix: boolean; choices: number }>();
  for (const s of simRuns) {
    if (s.completedAt) continue;
    const choices = Array.isArray(s.choicesMade) ? s.choicesMade.length : 0;
    if (choices >= 3) continue; // they were progressing, not stuck
    const existing = stuckByUser.get(s.userId);
    if (!existing || s.startedAt.getTime() > existing.startedAt.getTime()) {
      stuckByUser.set(s.userId, {
        scenarioId: s.scenarioId,
        sceneId: s.currentSceneId,
        startedAt: s.startedAt,
        preFix: s.startedAt.getTime() < SIM_FIX_AT.getTime(),
        choices,
      });
    }
  }

  // Categorise
  const buckets = {
    bouncedAtSignup: [] as string[], // never did anything beyond register
    hitLoopBug: [] as string[],       // last action was a stuck pre-fix sim
    triedSimGaveUp: [] as string[],   // started sim, didn't finish, post-fix
    boughtBook: [] as string[],       // engaged once around the book
    other: [] as string[],
  };

  for (const u of silent) {
    const last = lastActionByUser.get(u.id);
    const stuck = stuckByUser.get(u.id);

    const tenureMs = u.updatedAt.getTime() - u.createdAt.getTime();
    const tenureDays = tenureMs / 86400_000;
    const lastAct = last ? last.kind : "—";
    const gapDays = (Date.now() - u.updatedAt.getTime()) / 86400_000;

    let bucket = "other";
    if (!last || tenureDays < 0.05) {
      buckets.bouncedAtSignup.push(u.email);
      bucket = "BOUNCED-AT-SIGNUP";
    } else if (stuck && stuck.preFix && stuck.choices === 0) {
      buckets.hitLoopBug.push(u.email);
      bucket = "LIKELY-HIT-LOOP-BUG";
    } else if (last.kind.startsWith("sim:start") && (!stuck || stuck.choices < 3)) {
      buckets.triedSimGaveUp.push(u.email);
      bucket = "STARTED-SIM-DIDNT-FINISH";
    } else if (last.kind.startsWith("book")) {
      buckets.boughtBook.push(u.email);
      bucket = "BOOK-BUYER-LURKER";
    } else {
      buckets.other.push(u.email);
    }

    const utm = [u.utmSource, u.utmMedium, u.utmCampaign].filter(Boolean).join("/") || "(none)";
    console.log(
      `${u.email.padEnd(36)}  ${u.displayName?.padEnd(18) ?? "—".padEnd(18)}  signup ${daysAgo(u.createdAt).padStart(7)}  last ${daysAgo(u.updatedAt).padStart(7)}  tenure ${tenureDays.toFixed(1).padStart(4)}d  silent ${gapDays.toFixed(1).padStart(4)}d`,
    );
    console.log(`    bucket:    ${bucket}`);
    console.log(`    last act:  ${lastAct}${last?.meta ? ` (${last.meta})` : ""}`);
    if (stuck) {
      console.log(
        `    stuck:     ${stuck.scenarioId} @ ${stuck.sceneId} · ${stuck.choices} choices · ${stuck.preFix ? "PRE-FIX (loop bug suspect)" : "post-fix"}`,
      );
    }
    console.log(`    utm:       ${utm}`);
    console.log(`    landing:   ${u.landingPage ?? "—"}    ref: ${u.referrer ?? "—"}    geo: ${u.ipCountry ?? "—"}`);
    console.log("");
  }

  console.log(`=== Buckets ===`);
  console.log(`  bounced at signup:           ${buckets.bouncedAtSignup.length}`);
  console.log(`  likely hit loop bug:         ${buckets.hitLoopBug.length}`);
  console.log(`  started sim, didn't finish:  ${buckets.triedSimGaveUp.length}`);
  console.log(`  book buyer + lurker:         ${buckets.boughtBook.length}`);
  console.log(`  other:                       ${buckets.other.length}`);
  console.log("");

  // Cross-tab attribution: which UTM sources convert to silence at
  // higher rates than baseline? Useful if "instagram-ad-XYZ" is
  // sending high-bounce traffic vs organic.
  console.log(`=== Attribution of silent members ===`);
  const sourceTally = new Map<string, number>();
  for (const u of silent) {
    const k = u.utmSource ?? (u.referrer ? new URL(u.referrer).hostname : "(direct)");
    sourceTally.set(k, (sourceTally.get(k) ?? 0) + 1);
  }
  for (const [k, n] of Array.from(sourceTally.entries()).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(30)}  ${n}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
