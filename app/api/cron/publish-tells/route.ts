/**
 * POST /api/cron/publish-tells
 *
 * Daily cron, fires shortly after 00:00 UTC. Promotes every Tell in
 * SCHEDULED status whose scheduleDate has arrived to PUBLISHED.
 *
 * This lets Kanika queue a month of Tells in advance via /admin/tells
 * with status=SCHEDULED + a future scheduleDate; the cron flips them
 * live without any manual touch.
 *
 * Idempotent: re-running it is a no-op if no SCHEDULED Tells are due.
 *
 * Auth: x-cron-secret, with ADMIN_SECRET fallback to match the other
 * cron routes.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

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
    const result = await prisma.tell.updateMany({
      where: {
        status: "SCHEDULED",
        scheduleDate: { lte: new Date() },
      },
      data: { status: "PUBLISHED" },
    });

    if (result.count > 0) {
      logger.info(`[cron publish-tells] promoted ${result.count} Tell(s) to PUBLISHED`);
    }

    return NextResponse.json({
      ok: true,
      promoted: result.count,
    });
  } catch (err) {
    logger.error(
      "[cron publish-tells] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { error: "publish failed" },
      { status: 500 },
    );
  }
}
