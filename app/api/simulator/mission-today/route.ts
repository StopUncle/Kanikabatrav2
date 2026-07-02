/**
 * GET /api/simulator/mission-today
 *
 * Aggregate of how the council played today's shared Daily Mission:
 * players today + good/neutral/bad outcome split. Powers the "The
 * Council today" reveal on the ending screen (the Wordle mechanic:
 * same puzzle, compare results, no typing).
 *
 * Member-or-admin gated like choice-popularity; aggregates only, never
 * per-user data. Cached in-memory for 5 minutes: the number only needs
 * to feel live, not be exact to the second.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import {
  getMissionCouncilToday,
  type MissionCouncilToday,
} from "@/lib/streak/daily-mission";

type CacheEntry = { value: MissionCouncilToday; expiresAt: number };
let cache: CacheEntry | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function GET(request: NextRequest) {
  return requireAuth(request, async () => {
    const now = Date.now();
    const todayKey = new Date().toISOString().slice(0, 10);
    if (cache && cache.expiresAt > now && cache.value.dateKey === todayKey) {
      return NextResponse.json(cache.value);
    }

    const stats = await getMissionCouncilToday(prisma);
    if (!stats) {
      return NextResponse.json({ error: "no mission today" }, { status: 404 });
    }
    cache = { value: stats, expiresAt: now + TTL_MS };
    return NextResponse.json(stats);
  });
}
