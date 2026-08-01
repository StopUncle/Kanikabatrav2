import type { PrismaClient } from "@prisma/client";
import { isGauntletWeek, buildWeeksOf } from "./arcs";
import {
  generateDoorTexts,
  generateGauntletText,
  type IntakeAnswers,
  type WeekMaterial,
  type PriorEntry,
} from "./generate";

/**
 * Shared reads for The Twelve's AI layer. The delivery layer
 * (lib/program/read.ts) owns the time-based drip; this owns everything the
 * AI adds on top: the enrollment, the doors, the journal gate.
 */

export interface EnrollmentRecord extends IntakeAnswers {
  id: string;
  readLetter: string;
  pausedAt: Date | null;
  startedAt: Date;
}

export async function getEnrollment(
  db: PrismaClient,
  userId: string,
): Promise<EnrollmentRecord | null> {
  const row = await db.programEnrollment.findUnique({ where: { userId } });
  if (!row) return null;
  return {
    id: row.id,
    situation: row.situation,
    counterpart: row.counterpart,
    lastFailure: row.lastFailure,
    goal: row.goal,
    readLetter: row.readLetter,
    pausedAt: row.pausedAt,
    startedAt: row.startedAt,
  };
}

export async function weekMaterial(
  db: PrismaClient,
  weekNumber: number,
): Promise<WeekMaterial | null> {
  const row = await db.transformationWeek.findUnique({
    where: { weekNumber },
    select: {
      weekNumber: true,
      title: true,
      challenge: true,
      readingLabel: true,
      readingWhy: true,
    },
  });
  return row ?? null;
}

export async function priorEntries(
  db: PrismaClient,
  userId: string,
  beforeWeek: number,
  limit = 4,
): Promise<PriorEntry[]> {
  const rows = await db.journalEntry.findMany({
    where: { userId, weekNumber: { lt: beforeWeek } },
    orderBy: { weekNumber: "desc" },
    take: limit,
    select: { weekNumber: true, body: true },
  });
  return rows.reverse();
}

/**
 * The journal gate: week N is workable only when week N-1 has an entry.
 * Week 1 is always workable. This sits alongside the time drip, not instead
 * of it: both must open before a Threshold can be crossed.
 */
export async function journalGateOpen(
  db: PrismaClient,
  userId: string,
  weekNumber: number,
): Promise<boolean> {
  if (weekNumber <= 1) return true;
  const prev = await db.journalEntry.findUnique({
    where: { userId_weekNumber: { userId, weekNumber: weekNumber - 1 } },
    select: { id: true },
  });
  if (prev) return true;
  // Members who were mid-program before the journal existed have
  // WeekCompletion rows with no entries. Those weeks stay satisfied;
  // the journal starts gating from wherever they are now.
  const legacy = await db.weekCompletion.findUnique({
    where: { userId_weekNumber: { userId, weekNumber: weekNumber - 1 } },
    select: { id: true },
  });
  return legacy !== null;
}

/**
 * The member's Threshold row for a week, generating the door texts on first
 * touch. Generation happens once per member per week and is stored; a
 * concurrent duplicate loses to the unique constraint and reads the winner.
 */
export async function ensureThreshold(
  db: PrismaClient,
  userId: string,
  enrollment: EnrollmentRecord,
  weekNumber: number,
) {
  const existing = await db.programThreshold.findUnique({
    where: { userId_weekNumber: { userId, weekNumber } },
  });
  if (existing) return existing;

  const material = await weekMaterial(db, weekNumber);
  if (!material) return null;

  const recent = await priorEntries(db, userId, weekNumber, 3);
  const intake: IntakeAnswers = {
    situation: enrollment.situation,
    counterpart: enrollment.counterpart,
    lastFailure: enrollment.lastFailure,
    goal: enrollment.goal,
  };

  let standardText: string;
  let deeperText: string | null;
  if (isGauntletWeek(weekNumber)) {
    const builds = (
      await Promise.all(buildWeeksOf(weekNumber).map((w) => weekMaterial(db, w)))
    ).filter((w): w is WeekMaterial => w !== null);
    standardText = await generateGauntletText(intake, material, builds, recent);
    deeperText = null;
  } else {
    const doors = await generateDoorTexts(intake, material, recent);
    standardText = doors.standardText;
    deeperText = doors.deeperText;
  }

  try {
    return await db.programThreshold.create({
      data: { userId, weekNumber, standardText, deeperText },
    });
  } catch {
    // Concurrent first touch: the other request won the unique race.
    return db.programThreshold.findUnique({
      where: { userId_weekNumber: { userId, weekNumber } },
    });
  }
}
