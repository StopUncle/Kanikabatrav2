/**
 * GET /api/board/activity
 *
 * Powers the live activity ticker + headline counters. The client polls
 * this every ~15-30s. Every row is a real event (vote, petition, debut,
 * re-score reveal); no fabricated liveness. Cheap single-query reads,
 * never cached so the tally is current.
 */

import { NextResponse } from "next/server";
import { getRecentActivity, getBoardStats } from "@/lib/board/db";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [activity, stats] = await Promise.all([
      getRecentActivity(12),
      getBoardStats(),
    ]);
    return NextResponse.json(
      { activity, stats },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    logger.error(
      "[board.activity] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { error: "Could not load activity" },
      { status: 500 },
    );
  }
}
