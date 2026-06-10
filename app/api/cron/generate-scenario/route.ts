/**
 * POST /api/cron/generate-scenario — daily scenario generation.
 *
 * Generates one scenario into the GeneratedScenario table as DRAFT for
 * admin review (or REJECTED with validator notes when the output fails
 * the engine contract). Nothing auto-publishes: the drip stays behind
 * the same editorial gate as static content.
 *
 * Idempotent per UTC day so a GitHub Actions retry can't double-spend
 * the Opus call.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { generateDailyScenario } from "@/lib/simulator/generated";
import { logger } from "@/lib/logger";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const todayStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const todayRows = await prisma.generatedScenario.findMany({
    where: { createdAt: { gte: todayStart } },
    select: { status: true },
  });
  // Skip only when today already produced a reviewable draft (or one was
  // published). A REJECTED-only day means the generation failed, so a
  // GitHub Actions retry should be allowed to try again, not silently
  // report success. The attempt cap bounds Opus spend on a pathological
  // day where every generation keeps failing.
  const hasReviewable = todayRows.some(
    (r) => r.status === "DRAFT" || r.status === "PUBLISHED",
  );
  if (hasReviewable) {
    return NextResponse.json({
      success: true,
      skipped: true,
      message: "Already generated today",
    });
  }
  const MAX_ATTEMPTS_PER_DAY = 3;
  if (todayRows.length >= MAX_ATTEMPTS_PER_DAY) {
    return NextResponse.json({
      success: false,
      skipped: true,
      message: "Daily generation attempts exhausted",
    });
  }

  try {
    const outcome = await generateDailyScenario();
    logger.info("[cron/generate-scenario] generated", {
      rowId: outcome.rowId,
      scenarioId: outcome.scenarioId,
      status: outcome.status,
      failureCount: outcome.failures.length,
    });
    return NextResponse.json({ success: true, ...outcome });
  } catch (err) {
    logger.error(
      "[cron/generate-scenario] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { success: false, error: "Generation failed" },
      { status: 502 },
    );
  }
}
