/**
 * Showing up, drawn.
 *
 * `StandingEvent` is already a unified activity log: one row per earning
 * action across every surface, indexed on (userId, createdAt). So a twelve
 * week grid and a by-source breakdown are one query and no migration.
 *
 * One honesty caveat worth keeping in mind when reading the grid. The
 * `@@unique([userId, source, refId])` constraint means deduped one-shot
 * grants do not write a second row, so replaying a scenario does not light
 * a day up. This measures days you earned something new, not days you
 * opened the app. That is arguably the better signal, and it is the one the
 * copy claims.
 */

import type { PrismaClient, StandingSource } from "@prisma/client";

export interface ActivityDay {
  /** YYYY-MM-DD, UTC. */
  date: string;
  amount: number;
  count: number;
  /** Past the end of today: rendered as a hole so the grid stays square. */
  future: boolean;
  /** Before this member existed: also a hole, but not their fault. */
  beforeJoining: boolean;
}

export interface SourceTotal {
  source: StandingSource;
  label: string;
  amount: number;
}

export interface StandingActivity {
  /** weeks * 7 days, oldest first, aligned so each run of 7 is Mon..Sun. */
  days: ActivityDay[];
  weeks: number;
  /** Last 30 days, biggest first, zero-amount sources dropped. */
  bySource: SourceTotal[];
  /** Highest single-day total in the window, for scaling the shading. */
  peak: number;
  /** Days in the window with any activity. */
  activeDays: number;
}

/** Plain-language names. The enum is not member-facing. */
export const SOURCE_LABELS: Record<StandingSource, string> = {
  SCENARIO: "Scenarios",
  DAILY_MISSION: "Daily missions",
  TELL: "Daily Tells",
  DRILL: "Speed Drill",
  LAB: "The Lab",
  RECEIPT: "Receipts",
  COMMENT: "Comments",
  QUESTION_ANSWERED: "Questions answered",
  STREAK_MILESTONE: "Streak milestones",
  BASELINE: "Baseline Read",
  SESSION_WATCH: "Sessions",
  CHAPTER: "Path chapters",
  RETRO: "Backdated",
};

function utcKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addUtcDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + n);
  return out;
}

/** Never draw a grid narrower than this: one row of squares is not a chart. */
const MIN_WEEKS = 4;

export async function getStandingActivity(
  prisma: PrismaClient,
  userId: string,
  maxWeeks = 12,
  now = new Date(),
): Promise<StandingActivity> {
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  // Pad to the end of the current week so each column is a full Mon..Sun and
  // the rows mean the same weekday all the way across.
  const mondayIndex = (today.getUTCDay() + 6) % 7;
  const weekEnd = addUtcDays(today, 6 - mondayIndex);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdAt: true },
  });

  // Narrow the window to how long they have actually been here. A member of
  // three weeks looking at twelve weeks of empty squares reads it as a broken
  // chart, or worse, as a reproach for time they could not have used.
  let weeks = maxWeeks;
  if (user) {
    const joinedDays = Math.floor(
      (weekEnd.getTime() -
        Date.UTC(
          user.createdAt.getUTCFullYear(),
          user.createdAt.getUTCMonth(),
          user.createdAt.getUTCDate(),
        )) /
        86_400_000,
    );
    const tenureWeeks = Math.ceil((joinedDays + 1) / 7);
    weeks = Math.max(MIN_WEEKS, Math.min(maxWeeks, tenureWeeks));
  }

  const gridStart = addUtcDays(weekEnd, -(weeks * 7 - 1));

  const events = await prisma.standingEvent.findMany({
    where: { userId, createdAt: { gte: gridStart } },
    select: { source: true, amount: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const joinedKey = user ? utcKey(user.createdAt) : null;
  const todayKey = utcKey(today);

  const byDay = new Map<string, { amount: number; count: number }>();
  for (const e of events) {
    const key = utcKey(e.createdAt);
    const cell = byDay.get(key) ?? { amount: 0, count: 0 };
    cell.amount += e.amount;
    cell.count += 1;
    byDay.set(key, cell);
  }

  const days: ActivityDay[] = [];
  let peak = 0;
  let activeDays = 0;
  for (let i = 0; i < weeks * 7; i++) {
    const date = utcKey(addUtcDays(gridStart, i));
    const cell = byDay.get(date);
    const amount = cell?.amount ?? 0;
    if (amount > peak) peak = amount;
    if (amount > 0) activeDays += 1;
    days.push({
      date,
      amount,
      count: cell?.count ?? 0,
      future: date > todayKey,
      beforeJoining: joinedKey !== null && date < joinedKey,
    });
  }

  // The breakdown is a shorter window than the grid on purpose: "where your
  // Standing came from" is a question about now, not about the quarter.
  const thirtyAgo = addUtcDays(today, -29);
  const totals = new Map<StandingSource, number>();
  for (const e of events) {
    if (e.createdAt < thirtyAgo) continue;
    totals.set(e.source, (totals.get(e.source) ?? 0) + e.amount);
  }

  const bySource: SourceTotal[] = Array.from(totals)
    .filter(([, amount]) => amount > 0)
    .map(([source, amount]): SourceTotal => ({
      source,
      label: SOURCE_LABELS[source],
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  return { days, weeks, bySource, peak, activeDays };
}
