/**
 * POST /api/cron/program-unlock
 *
 * Daily. Tells members whose next week of the transformation has just
 * opened, and makes sure that week has a discussion thread.
 *
 * The unlock itself is derived from dates and stored nowhere. This route
 * only handles the side effects, and both are guarded so a manual
 * workflow_dispatch re-run is harmless: the notification dedupes on
 * (userId, weekNumber), the thread dedupes on its metadata marker.
 *
 * It notifies about the CURRENT week rather than looking for a same-day
 * anniversary. Someone whose week opened while an earlier run was broken,
 * or who joined before the program launched, still gets told once rather
 * than silently missing it.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { logger } from "@/lib/logger";
import { currentWeekFor, programLaunchDate } from "@/lib/program/read";
import { ensureWeekThread } from "@/lib/program/thread";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const published = await prisma.transformationWeek.findMany({
      where: { isPublished: true },
      select: { weekNumber: true, title: true, lede: true },
      orderBy: { weekNumber: "asc" },
    });
    if (published.length === 0) {
      return NextResponse.json({ ok: true, skipped: "nothing published" });
    }

    // Consecutive from week 1. A gap means members stop there, so a week
    // published beyond a hole must not notify anyone.
    const byNumber = new Map(published.map((w) => [w.weekNumber, w]));
    let openThrough = 0;
    for (let n = 1; n <= 12; n++) {
      if (!byNumber.has(n)) break;
      openThrough = n;
    }
    if (openThrough === 0) {
      return NextResponse.json({ ok: true, skipped: "week 1 not published" });
    }

    const launch = programLaunchDate();
    const members = await prisma.communityMembership.findMany({
      where: { status: "ACTIVE", activatedAt: { not: null } },
      select: { userId: true, activatedAt: true },
    });

    let notified = 0;
    let pushed = 0;
    let alreadyKnown = 0;
    const threadsTouched = new Set<number>();

    for (const m of members) {
      if (!m.activatedAt) continue;
      const start =
        launch && launch > m.activatedAt ? launch : m.activatedAt;

      // Cap at what is actually open, so nobody is told about a week that
      // has not been filmed.
      const week = Math.min(currentWeekFor(start), openThrough);
      if (week < 1) continue;

      const already = await prisma.programUnlockNotice.findUnique({
        where: {
          userId_weekNumber: { userId: m.userId, weekNumber: week },
        },
        select: { id: true },
      });
      if (already) {
        alreadyKnown++;
        continue;
      }

      const info = byNumber.get(week);
      if (!info) continue;

      // Claim first. If the push throws, the member has still been counted
      // as told, which loses one notification. Notifying first and claiming
      // after would risk telling them every day until the write succeeded,
      // and a repeated notification is far worse than a missed one.
      await prisma.programUnlockNotice.create({
        data: { userId: m.userId, weekNumber: week },
      });
      notified++;

      if (!threadsTouched.has(week)) {
        threadsTouched.add(week);
        await ensureWeekThread(prisma, week).catch((err) => {
          logger.error(
            "[program-unlock] thread create failed",
            err instanceof Error ? err : new Error(String(err)),
            { weekNumber: week },
          );
        });
      }

      const delivered = await sendPushToUser(m.userId, "programUnlock", {
        title: `Week ${week} is open`,
        body: `${info.title}. ${info.lede}`,
        // The Twelve has no /consilium home, so while the app is sealed this
        // lands on the feed rather than a door the member cannot open.
        url: "/consilium/feed",
        tag: `program-week-${week}`,
      }).catch(() => 0);
      if (delivered > 0) pushed++;
    }

    return NextResponse.json({
      ok: true,
      openThrough,
      members: members.length,
      notified,
      pushed,
      alreadyKnown,
      threads: Array.from(threadsTouched),
    });
  } catch (err) {
    logger.error(
      "[program-unlock] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
