import { prisma } from "@/lib/prisma";
import { getQuestionSettings } from "./settings";

export interface CooldownState {
  allowed: boolean;
  /** When the user can submit again. Only set when allowed=false. */
  nextAvailableAt?: Date;
  /** How many submissions the user has left in the current 24h window. */
  remainingToday: number;
  /** Configured daily cap (1 by default; mutable via admin settings). */
  dailyCap: number;
}

const WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Check whether `userId` is allowed to submit a new question right now.
 *
 * Rolling 24h window — if the cap is N, the user can submit while they have
 * fewer than N questions in the most recent 24h. The next slot opens 24h
 * after the OLDEST submission inside the current window (so a user who fires
 * three asks in 1 hour at cap=3 has to wait ~23h, not 24h × 3).
 *
 * Source of truth lives server-side; the client countdown is purely cosmetic.
 */
export async function checkAskCooldown(userId: string): Promise<CooldownState> {
  const settings = await getQuestionSettings();
  const since = new Date(Date.now() - WINDOW_MS);

  const recent = await prisma.memberQuestion.findMany({
    where: { userId, createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });

  if (recent.length < settings.dailyCap) {
    return {
      allowed: true,
      remainingToday: settings.dailyCap - recent.length,
      dailyCap: settings.dailyCap,
    };
  }

  // Locked. Next slot opens 24h after the OLDEST submission in the window.
  const nextAvailableAt = new Date(recent[0].createdAt.getTime() + WINDOW_MS);
  return {
    allowed: false,
    nextAvailableAt,
    remainingToday: 0,
    dailyCap: settings.dailyCap,
  };
}
