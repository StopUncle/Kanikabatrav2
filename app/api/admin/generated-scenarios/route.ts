/**
 * GET  /api/admin/generated-scenarios — list all generated scenarios.
 * POST /api/admin/generated-scenarios — generate one now (manual trigger).
 *
 * Auth: admin session.
 */

import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { generateDailyScenario } from "@/lib/simulator/generated";
import { logger } from "@/lib/logger";

export const maxDuration = 300;

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const rows = await prisma.generatedScenario.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
    select: {
      id: true,
      scenarioId: true,
      title: true,
      tagline: true,
      status: true,
      briefKey: true,
      model: true,
      costMicros: true,
      notes: true,
      createdAt: true,
      publishedAt: true,
      json: true,
    },
  });

  return NextResponse.json({
    items: rows.map((r) => {
      const scenario = r.json as {
        scenes?: unknown[];
        description?: string;
        difficulty?: string;
        estimatedMinutes?: number;
      };
      return {
        id: r.id,
        scenarioId: r.scenarioId,
        title: r.title,
        tagline: r.tagline,
        status: r.status,
        briefKey: r.briefKey,
        model: r.model,
        costMicros: r.costMicros,
        notes: r.notes,
        createdAt: r.createdAt,
        publishedAt: r.publishedAt,
        sceneCount: Array.isArray(scenario.scenes) ? scenario.scenes.length : 0,
        description:
          typeof scenario.description === "string" ? scenario.description : "",
        difficulty:
          typeof scenario.difficulty === "string" ? scenario.difficulty : "",
        estimatedMinutes:
          typeof scenario.estimatedMinutes === "number"
            ? scenario.estimatedMinutes
            : 0,
      };
    }),
  });
}

export async function POST() {
  const denied = await requireAdminSession();
  if (denied) return denied;

  try {
    const outcome = await generateDailyScenario();
    return NextResponse.json({ success: true, ...outcome });
  } catch (err) {
    logger.error(
      "[admin/generated-scenarios] manual generation failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { success: false, error: "Generation failed" },
      { status: 502 },
    );
  }
}
