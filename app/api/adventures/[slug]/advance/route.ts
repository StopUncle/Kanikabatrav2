/**
 * POST /api/adventures/[slug]/advance
 *
 * Body: { completedScenarioId: string }
 *
 * Called by the adventure runner page after a scenario reaches an ending.
 * Verifies completedScenarioId matches Adventure.scenarioIds[currentStep],
 * then increments the step. When the cursor advances past the final
 * scenario, completedAt is stamped and the response carries { completed: true }.
 *
 * Idempotent on duplicates: if completedScenarioId matches the PRIOR step
 * (player clicked "Next" twice, or a network retry resent the same id), the
 * advance is treated as a no-op and the current next-scenarioId is returned.
 * Without this, a double-fire would silently skip the next chapter.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  completedScenarioId: z.string().min(1).max(100),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof Body>;
    try {
      body = Body.parse(await req.json());
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid body", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const adventure = await prisma.adventure.findUnique({ where: { slug } });
    if (!adventure || !adventure.publishedAt) {
      return NextResponse.json({ error: "Adventure not found" }, { status: 404 });
    }

    const progress = await prisma.adventureProgress.findUnique({
      where: {
        userId_adventureId: { userId: user.id, adventureId: adventure.id },
      },
    });
    if (!progress) {
      return NextResponse.json(
        { error: "Adventure not started" },
        { status: 404 },
      );
    }

    // Already finished. Treat advance as a no-op so a stray retry can't
    // un-complete or wrap.
    if (progress.completedAt) {
      return NextResponse.json({
        progress,
        completed: true,
        nextScenarioId: null,
      });
    }

    const expected = adventure.scenarioIds[progress.currentStep];
    const prior =
      progress.currentStep > 0
        ? adventure.scenarioIds[progress.currentStep - 1]
        : null;

    if (body.completedScenarioId !== expected) {
      // Idempotent retry path: same ID as the prior completed step. Return
      // the current state without advancing.
      if (prior && body.completedScenarioId === prior) {
        const nextScenarioId =
          adventure.scenarioIds[progress.currentStep] ?? null;
        return NextResponse.json({ progress, nextScenarioId, completed: false });
      }
      return NextResponse.json(
        {
          error: "completedScenarioId does not match the expected step",
          expected,
          got: body.completedScenarioId,
        },
        { status: 409 },
      );
    }

    const nextStep = progress.currentStep + 1;
    const isFinalStep = nextStep >= adventure.scenarioIds.length;

    const updated = await prisma.adventureProgress.update({
      where: { id: progress.id },
      data: {
        currentStep: nextStep,
        completedAt: isFinalStep ? new Date() : null,
      },
    });

    return NextResponse.json({
      progress: updated,
      nextScenarioId: isFinalStep ? null : adventure.scenarioIds[nextStep],
      completed: isFinalStep,
    });
  });
}
