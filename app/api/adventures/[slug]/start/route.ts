/**
 * POST /api/adventures/[slug]/start
 *
 * Idempotent. If an AdventureProgress row already exists for (user, adventure)
 * it is returned unchanged so a re-tap on Start never resets a half-finished
 * arc. Returns the scenarioId the player should play next (current step) plus
 * the progress row. Unpublished adventures 404.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getScenario } from "@/lib/simulator/scenarios";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return requireAuth(request, async (_req, user) => {
    const adventure = await prisma.adventure.findUnique({ where: { slug } });
    if (!adventure || !adventure.publishedAt) {
      return NextResponse.json({ error: "Adventure not found" }, { status: 404 });
    }

    if (adventure.scenarioIds.length === 0) {
      return NextResponse.json(
        { error: "Adventure has no scenarios" },
        { status: 400 },
      );
    }

    const progress = await prisma.adventureProgress.upsert({
      where: {
        userId_adventureId: { userId: user.id, adventureId: adventure.id },
      },
      create: { userId: user.id, adventureId: adventure.id, currentStep: 0 },
      update: {},
    });

    // Completed arcs return a clean signal so clients can route to the
    // recap rather than re-render the final chapter. Without this guard
    // the cursor was clamped to scenarioIds.length-1 and the response
    // looked indistinguishable from an in-progress run on the last step.
    if (progress.completedAt) {
      return NextResponse.json({
        progress,
        scenarioId: null,
        scenarioExists: false,
        totalSteps: adventure.scenarioIds.length,
        completed: true,
      });
    }

    const scenarioId = adventure.scenarioIds[progress.currentStep] ?? null;
    const scenario = scenarioId ? getScenario(scenarioId) : null;

    return NextResponse.json({
      progress,
      scenarioId,
      scenarioExists: !!scenario,
      totalSteps: adventure.scenarioIds.length,
      completed: false,
    });
  });
}
