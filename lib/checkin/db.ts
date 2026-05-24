/**
 * Daily Check-In DB helpers.
 *
 * Reads and writes scoped by UTC calendar day. The unique constraint on
 * (userId, checkedDate) at the schema level enforces "one per day" by
 * construction; writes use upsert so re-answering today silently replaces
 * the prior answer.
 */

import type { PrismaClient } from "@prisma/client";
import {
  resolveTrack,
  type SituationKey,
  utcDateKey,
} from "./situations";

export interface TodayCheckIn {
  situation: SituationKey;
  recommendedTrack: string; // ScenarioTrack slug or "" for exploring
  createdAt: Date;
}

/** Read today's check-in for a user, if any. */
export async function readTodayCheckIn(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<TodayCheckIn | null> {
  const checkedDate = utcDateKey(now);
  const row = await prisma.dailyCheckIn.findUnique({
    where: { userId_checkedDate: { userId, checkedDate } },
    select: { situation: true, recommendedTrack: true, createdAt: true },
  });
  if (!row) return null;
  return {
    situation: row.situation as SituationKey,
    recommendedTrack: row.recommendedTrack,
    createdAt: row.createdAt,
  };
}

/**
 * Record (or replace) today's check-in. Gender is read here so the saved
 * recommendation is correct for the user; the catalogue page just reads
 * the slug back out without re-resolving.
 */
export async function recordTodayCheckIn(
  prisma: PrismaClient,
  userId: string,
  situation: SituationKey,
  now: Date = new Date(),
): Promise<TodayCheckIn> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true },
  });
  const track = resolveTrack(situation, user?.gender ?? null);
  const checkedDate = utcDateKey(now);

  const row = await prisma.dailyCheckIn.upsert({
    where: { userId_checkedDate: { userId, checkedDate } },
    create: {
      userId,
      checkedDate,
      situation,
      recommendedTrack: track ?? "",
    },
    update: {
      situation,
      recommendedTrack: track ?? "",
    },
    select: { situation: true, recommendedTrack: true, createdAt: true },
  });

  return {
    situation: row.situation as SituationKey,
    recommendedTrack: row.recommendedTrack,
    createdAt: row.createdAt,
  };
}
