/**
 * GET /api/instincts/me
 *
 * Returns the current user's score + streak. Auth required (member
 * surface). Used by /consilium/instincts/today and /consilium/instincts/score.
 */

import { NextResponse } from "next/server";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { getInstinctScore, getTellStreak } from "@/lib/tells/db";

export async function GET() {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  const [score, streak] = await Promise.all([
    getInstinctScore(ctx.userId),
    getTellStreak(ctx.userId),
  ]);

  return NextResponse.json({
    score,
    streak: streak
      ? {
          currentDays: streak.currentDays,
          longestDays: streak.longestDays,
          freezesAvail: streak.freezesAvail,
          lastTellDate: streak.lastTellDate,
        }
      : { currentDays: 0, longestDays: 0, freezesAvail: 1, lastTellDate: null },
  });
}
