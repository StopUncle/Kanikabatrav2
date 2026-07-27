import type { PrismaClient } from "@prisma/client";
import { TOTAL_WEEKS } from "./curriculum";

/**
 * Reading a member's place in the 12 Week Transformation.
 *
 * The unlock is derived, never stored. Week n opens at
 * `startedAt + (n - 1) * 7 days`, counted from the member's OWN start, so
 * everybody gets all twelve weeks from wherever they joined and a member who
 * joins in month four does not land in a half-finished ladder.
 *
 * Derived also means there is no per-member per-week row to backfill when a
 * week is added, and nothing that can drift out of sync with the truth.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

export type WeekState = "open" | "next" | "locked";

export interface ProgramLesson {
  id: string;
  orderIndex: number;
  title: string;
  videoUrl: string | null;
  videoDurationSeconds: number | null;
  posterUrl: string | null;
  notes: string | null;
  viewed: boolean;
}

export interface ProgramWeek {
  weekNumber: number;
  title: string;
  lede: string;
  challenge: string;
  readingLabel: string | null;
  readingWhy: string | null;
  state: WeekState;
  /** When this week opens (or opened) for this member. */
  unlocksAt: Date;
  completed: boolean;
  completedAt: Date | null;
  lessons: ProgramLesson[];
}

export interface ProgramRead {
  /** False when the member has no membership start date to count from. */
  enrolled: boolean;
  startedAt: Date | null;
  /** The furthest week this member has reached, capped at TOTAL_WEEKS. */
  currentWeek: number;
  weeks: ProgramWeek[];
  completedCount: number;
  /** The week to act on now: the earliest open, unfinished, published week. */
  actionable: ProgramWeek | null;
  /** True once every published week through TOTAL_WEEKS is complete. */
  graduated: boolean;
}

/** Week n opens this many ms after the member's start. */
export function unlockOffsetMs(weekNumber: number): number {
  return (weekNumber - 1) * WEEK_MS;
}

export function unlockDateFor(startedAt: Date, weekNumber: number): Date {
  return new Date(startedAt.getTime() + unlockOffsetMs(weekNumber));
}

/**
 * Which week the member is up to, by elapsed time alone. Independent of what
 * they have completed: falling behind on the work does not slow the drip, it
 * just leaves earlier weeks sitting open and unfinished.
 */
export function currentWeekFor(startedAt: Date, now: Date = new Date()): number {
  const elapsed = now.getTime() - startedAt.getTime();
  if (elapsed < 0) return 1;
  return Math.min(TOTAL_WEEKS, Math.floor(elapsed / WEEK_MS) + 1);
}

/**
 * The member's start date for the program: when their membership went active.
 * Null for someone with no active membership row, who therefore has not
 * started.
 */
export async function programStartFor(
  db: PrismaClient,
  userId: string,
): Promise<Date | null> {
  const membership = await db.communityMembership.findUnique({
    where: { userId },
    select: { activatedAt: true },
  });
  return membership?.activatedAt ?? null;
}

export async function readProgram(
  db: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<ProgramRead> {
  const startedAt = await programStartFor(db, userId);

  const [rows, completions, views] = await Promise.all([
    db.transformationWeek.findMany({
      where: { isPublished: true },
      orderBy: { weekNumber: "asc" },
      include: { lessons: { orderBy: { orderIndex: "asc" } } },
    }),
    db.weekCompletion.findMany({
      where: { userId },
      select: { weekNumber: true, completedAt: true },
    }),
    db.lessonView.findMany({
      where: { userId },
      select: { lessonId: true },
    }),
  ]);

  const completedBy = new Map(
    completions.map((c) => [c.weekNumber, c.completedAt]),
  );
  const viewed = new Set(views.map((v) => v.lessonId));

  if (!startedAt) {
    return {
      enrolled: false,
      startedAt: null,
      currentWeek: 0,
      weeks: [],
      completedCount: 0,
      actionable: null,
      graduated: false,
    };
  }

  const currentWeek = currentWeekFor(startedAt, now);

  const weeks: ProgramWeek[] = rows.map((row) => {
    const unlocksAt = unlockDateFor(startedAt, row.weekNumber);
    const completedAt = completedBy.get(row.weekNumber) ?? null;
    // "next" is the one immediately ahead, and it is the only locked week
    // that shows its date. A lock with a date on it reads as anticipation;
    // a lock without one reads as a paywall.
    const state: WeekState =
      unlocksAt <= now
        ? "open"
        : row.weekNumber === currentWeek + 1
          ? "next"
          : "locked";

    return {
      weekNumber: row.weekNumber,
      title: row.title,
      lede: row.lede,
      challenge: row.challenge,
      readingLabel: row.readingLabel,
      readingWhy: row.readingWhy,
      state,
      unlocksAt,
      completed: completedAt !== null,
      completedAt,
      lessons: row.lessons.map((l) => ({
        id: l.id,
        orderIndex: l.orderIndex,
        title: l.title,
        videoUrl: l.videoUrl,
        videoDurationSeconds: l.videoDurationSeconds,
        posterUrl: l.posterUrl,
        notes: l.notes,
        viewed: viewed.has(l.id),
      })),
    };
  });

  const actionable =
    weeks.find((w) => w.state === "open" && !w.completed) ?? null;

  const openWeeks = weeks.filter((w) => w.state === "open");

  return {
    enrolled: true,
    startedAt,
    currentWeek,
    weeks,
    completedCount: weeks.filter((w) => w.completed).length,
    actionable,
    graduated:
      weeks.length === TOTAL_WEEKS &&
      openWeeks.length === TOTAL_WEEKS &&
      openWeeks.every((w) => w.completed),
  };
}
