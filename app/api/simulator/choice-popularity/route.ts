/**
 * GET /api/simulator/choice-popularity?scenarioId=X
 *
 * Returns per-(sceneId, choiceId) pick rates across all completed runs of
 * the scenario. Cached in-memory for 1h, pick rates move slowly, and a
 * cold query scans the JSON `choicesMade` column on every progress row
 * for the scenario, which is too expensive to do on every choice.
 *
 * Shape: { rates: { [sceneId]: { [choiceId]: 0.0-1.0 } }, totalRuns: N }
 *
 * Used by the runner to show "Only 23% of players chose this" briefly
 * after a pick resolves. Loaded once when the scenario starts.
 *
 * Note: anonymous players' choices ARE counted (we still record progress
 * for all authenticated runs). The endpoint itself is admin-or-member —
 * we don't expose per-user breakdowns, only aggregates.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getScenario } from "@/lib/simulator/scenarios";

type ChoicesJsonShape = Array<{
  sceneId: string;
  choiceId: string;
  wasOptimal: boolean;
  timestamp: string;
}>;

interface PopularityResponse {
  rates: Record<string, Record<string, number>>;
  totalRuns: number;
  generatedAt: string;
}

// In-memory cache. Keyed by scenarioId. Survives the lifetime of the
// serverless lambda. Vercel/Railway containers stay warm long enough that
// hot scenarios get the benefit; cold ones recompute infrequently anyway.
type CacheEntry = { value: PopularityResponse; expiresAt: number };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 60 * 60 * 1000; // 1h

/**
 * Aggregate pick rates from raw progress rows. For a scene with 2 choices
 * picked 30 and 70 times respectively, returns { sceneId: { c1: 0.3, c2: 0.7 } }.
 * Scenes with fewer than 5 total picks are excluded, the rate isn't
 * meaningful and showing "Only 100% chose this" reads as broken.
 */
function aggregate(
  rows: Array<{ choicesMade: ChoicesJsonShape | unknown }>,
): PopularityResponse {
  const counts: Record<string, Record<string, number>> = {};
  const sceneTotals: Record<string, number> = {};

  for (const row of rows) {
    const arr = row.choicesMade as ChoicesJsonShape | null;
    if (!Array.isArray(arr)) continue;
    for (const c of arr) {
      if (!c || typeof c.sceneId !== "string" || typeof c.choiceId !== "string") {
        continue;
      }
      counts[c.sceneId] ??= {};
      counts[c.sceneId][c.choiceId] = (counts[c.sceneId][c.choiceId] ?? 0) + 1;
      sceneTotals[c.sceneId] = (sceneTotals[c.sceneId] ?? 0) + 1;
    }
  }

  const rates: Record<string, Record<string, number>> = {};
  for (const [sceneId, choices] of Object.entries(counts)) {
    const total = sceneTotals[sceneId];
    if (total < 5) continue; // suppress noisy small-N rates
    rates[sceneId] = {};
    for (const [choiceId, n] of Object.entries(choices)) {
      rates[sceneId][choiceId] = n / total;
    }
  }

  return {
    rates,
    totalRuns: rows.length,
    generatedAt: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req) => {
    const scenarioId = req.nextUrl.searchParams.get("scenarioId");
    if (!scenarioId) {
      return NextResponse.json(
        { error: "scenarioId is required" },
        { status: 400 },
      );
    }
    const scenario = getScenario(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: `Unknown scenario: ${scenarioId}` },
        { status: 404 },
      );
    }

    const now = Date.now();
    const cached = cache.get(scenarioId);
    if (cached && cached.expiresAt > now) {
      return NextResponse.json(cached.value);
    }

    const rows = await prisma.simulatorProgress.findMany({
      where: { scenarioId },
      select: { choicesMade: true },
    });
    const result = aggregate(rows);
    cache.set(scenarioId, { value: result, expiresAt: now + TTL_MS });
    return NextResponse.json(result);
  });
}
