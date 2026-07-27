import type { PrismaClient } from "@prisma/client";
import { TOTAL_WEEKS } from "./curriculum";
import { currentWeekFor, programLaunchDate } from "./read";

/**
 * Runway: how many published weeks sit ahead of the member who is furthest
 * along.
 *
 * This is the number that decides whether the program keeps its promise. A
 * twelve week program that stalls at week five is worse than never having
 * offered one, and the failure is silent: nothing breaks, members simply
 * arrive at a week that is not there. So it is computed against the real
 * leading member rather than against a filming schedule.
 */

export interface Runway {
  /** Highest week any active member has reached by elapsed time. */
  leadingWeek: number;
  /** Highest consecutive published week starting from week 1. */
  publishedThrough: number;
  /** publishedThrough - leadingWeek. Negative means someone is already past the end. */
  weeksAhead: number;
  /** True when the buffer is thin enough to act on. */
  lowRunway: boolean;
  totalWeeks: number;
}

/** Below this many weeks of buffer, the admin surface says so loudly. */
export const LOW_RUNWAY_THRESHOLD = 2;

export async function readRunway(db: PrismaClient): Promise<Runway> {
  const [published, oldest] = await Promise.all([
    db.transformationWeek.findMany({
      where: { isPublished: true },
      select: { weekNumber: true },
      orderBy: { weekNumber: "asc" },
    }),
    db.communityMembership.findFirst({
      where: { status: "ACTIVE", activatedAt: { not: null } },
      orderBy: { activatedAt: "asc" },
      select: { activatedAt: true },
    }),
  ]);

  // Consecutive from week 1: a gap means the member stops there regardless
  // of what is published beyond it, so week 7 published while 4 is not
  // counts for nothing.
  let publishedThrough = 0;
  const numbers = new Set(published.map((p) => p.weekNumber));
  for (let n = 1; n <= TOTAL_WEEKS; n++) {
    if (!numbers.has(n)) break;
    publishedThrough = n;
  }

  // Same rule the member surface uses: the launch date floors everyone, so
  // the leading member is measured from when the program opened rather than
  // from when they joined Consilium.
  const launch = programLaunchDate();
  const leadStart = oldest?.activatedAt
    ? launch && launch > oldest.activatedAt
      ? launch
      : oldest.activatedAt
    : null;
  const leadingWeek = leadStart ? currentWeekFor(leadStart) : 0;

  const weeksAhead = publishedThrough - leadingWeek;

  return {
    leadingWeek,
    publishedThrough,
    weeksAhead,
    // Once everything is published there is nothing left to fall behind on.
    lowRunway:
      publishedThrough < TOTAL_WEEKS && weeksAhead < LOW_RUNWAY_THRESHOLD,
    totalWeeks: TOTAL_WEEKS,
  };
}
