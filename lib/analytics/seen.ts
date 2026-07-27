import { prisma } from "@/lib/prisma";
import { ANALYTICS_EVENTS } from "./events";
import { captureServerAsync } from "./server";

/**
 * Stamp lastSeenAt, and notice the first time someone comes back on or
 * after day seven.
 *
 * Day 7 is the retention question that matters: almost everyone opens a
 * thing they just paid for, and far fewer are still opening it a week
 * later. Firing it exactly once needs no new column and no marker,
 * because the old lastSeenAt already answers "have they been back since
 * the boundary": if their previous visit was before day 7 and this one is
 * after it, this is the crossing. A second visit the same week reads as
 * already-crossed and stays silent.
 */
const DAY_MS = 24 * 60 * 60 * 1000;

export async function markSeen(userId: string): Promise<void> {
  try {
    const row = await prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true, lastSeenAt: true },
    });
    if (!row) return;

    const now = new Date();
    const day7 = new Date(row.createdAt.getTime() + 7 * DAY_MS);
    const crossingNow =
      now >= day7 && (!row.lastSeenAt || row.lastSeenAt < day7);

    await prisma.user.update({
      where: { id: userId },
      data: { lastSeenAt: now },
    });

    if (crossingNow) {
      captureServerAsync(userId, ANALYTICS_EVENTS.D7_RETURN, {
        days_since_signup: Math.floor(
          (now.getTime() - row.createdAt.getTime()) / DAY_MS,
        ),
      });
    }
  } catch {
    /* presence tracking is never worth an error path */
  }
}
