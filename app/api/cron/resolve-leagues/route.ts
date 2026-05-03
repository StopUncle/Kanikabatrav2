/**
 * POST /api/cron/resolve-leagues
 *
 * Weekly cron. Finalises every unresolved League whose weekKey is
 * earlier than the current ISO week. Fires Sunday 23:59 UTC; the
 * 23:59 timing matches the existing `freezeWeekKey` rollover so the
 * streak-freeze refill and the league reset land in the same minute.
 *
 * Idempotent. Already-resolved leagues are skipped, so a manual
 * re-fire after a partial failure is safe.
 *
 * Auth: x-cron-secret header (CRON_SECRET or ADMIN_SECRET fallback).
 */

import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { resolveLeagues } from "@/lib/tells/leagues/resolve";
import { isoWeekKey } from "@/lib/tells/streak";

function authorize(request: NextRequest): boolean {
  const secret = request.headers.get("x-cron-secret");
  return (
    secret === process.env.CRON_SECRET ||
    secret === process.env.ADMIN_SECRET
  );
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Cutoff is the current ISO week — all leagues with weekKey < this
    // get resolved. The live week stays live.
    const cutoffWeekKey = isoWeekKey();
    const result = await resolveLeagues({ cutoffWeekKey });
    return NextResponse.json({ ok: true, cutoffWeekKey, ...result });
  } catch (err) {
    logger.error(
      "[cron resolve-leagues] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { error: "Resolution failed" },
      { status: 500 },
    );
  }
}
