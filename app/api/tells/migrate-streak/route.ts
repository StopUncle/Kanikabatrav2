/**
 * POST /api/tells/migrate-streak
 *
 * Reconcile a freshly-authed user's TellStreak server-side. Derives
 * currentDays + longestDays from the user's actual TellResponse history
 * (their `userId` rows plus any rows still keyed to the anonymous cookie
 * they carry). The client's localStorage value is NOT trusted, so a
 * malicious caller cannot grant themselves a fake streak.
 *
 * Two-phase:
 *   1. Re-key any `anonId`-keyed TellResponse rows belonging to the
 *      current cookie onto this user. Best-effort: identifies anon rows
 *      that the same browser actually produced, no cross-user adoption.
 *   2. Read distinct UTC days the user has now answered, derive the
 *      current streak (consecutive days ending today or yesterday) and
 *      longest run, write the TellStreak row.
 *
 * No request body is required. The cookie identifies the anon set, the
 * session identifies the user, the DB tells us the truth.
 */

import { NextResponse } from "next/server";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { prisma } from "@/lib/prisma";
import { isoWeekKey, utcDateKey, daysBetween } from "@/lib/tells/streak";

export async function POST() {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }
  const userId = ctx.userId;

  // Phase 1: re-key the user's anonymous responses, if any. Skipped when
  // there's no cookie or it's a fresh anonId minted on this same request.
  if (ctx.anonId && !ctx.anonIdMinted) {
    await prisma.tellResponse.updateMany({
      where: { anonId: ctx.anonId, userId: null },
      data: { userId, anonId: null },
    });
  }

  // Phase 2: derive the streak from server truth.
  const responses = await prisma.tellResponse.findMany({
    where: { userId },
    select: { answeredAt: true },
    orderBy: { answeredAt: "asc" },
  });

  const dayKeys = new Set<string>();
  for (const r of responses) {
    dayKeys.add(utcDateKey(r.answeredAt));
  }
  const sortedDays = Array.from(dayKeys).sort();

  const longestDays = computeLongestRun(sortedDays);
  const currentDays = computeCurrentRun(sortedDays, utcDateKey());
  const lastTellDate = sortedDays.length
    ? sortedDays[sortedDays.length - 1]
    : null;

  const existing = await prisma.tellStreak.findUnique({ where: { userId } });
  const thisWeek = isoWeekKey();

  // Preserve an existing freeze count within the same ISO week, refill on
  // rollover. New rows start the week with 1 freeze available.
  const freezesAvail =
    existing && existing.freezeWeekKey === thisWeek
      ? existing.freezesAvail
      : 1;

  const merged = {
    currentDays,
    longestDays: Math.max(existing?.longestDays ?? 0, longestDays),
    lastTellDate,
    freezeWeekKey: thisWeek,
    freezesAvail,
  };

  await prisma.tellStreak.upsert({
    where: { userId },
    update: merged,
    create: { userId, ...merged },
  });

  return NextResponse.json({ migrated: true, ...merged });
}

/**
 * Longest run of consecutive UTC days in a sorted-ascending list of
 * YYYY-MM-DD strings. Treats duplicates safely (input is a Set list).
 */
function computeLongestRun(sortedDays: string[]): number {
  if (sortedDays.length === 0) return 0;
  let longest = 1;
  let run = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const gap = daysBetween(sortedDays[i - 1], sortedDays[i]);
    if (gap === 1) {
      run += 1;
      if (run > longest) longest = run;
    } else if (gap > 1) {
      run = 1;
    }
    // gap === 0 (duplicate) leaves the run unchanged.
  }
  return longest;
}

/**
 * The streak ending today or yesterday. If the user last answered 2+
 * days ago, the current streak is 0 even if they used to have one.
 * Mirrors the in-app rule that a missed day breaks the streak.
 */
function computeCurrentRun(sortedDays: string[], today: string): number {
  if (sortedDays.length === 0) return 0;
  const last = sortedDays[sortedDays.length - 1];
  const gapFromToday = daysBetween(last, today);
  if (gapFromToday > 1) return 0;

  let run = 1;
  for (let i = sortedDays.length - 1; i > 0; i--) {
    const gap = daysBetween(sortedDays[i - 1], sortedDays[i]);
    if (gap === 1) run += 1;
    else if (gap > 1) break;
    // gap === 0 leaves run unchanged.
  }
  return run;
}
