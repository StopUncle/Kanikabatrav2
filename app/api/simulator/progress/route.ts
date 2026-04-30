/**
 * GET  /api/simulator/progress            , list the user's progress across all scenarios
 * GET  /api/simulator/progress?scenarioId=, load one scenario's progress (for resume)
 * POST /api/simulator/progress            , upsert progress for one scenario
 *
 * The POST is called from the client on every meaningful state transition
 * (scene change, choice, ending). It's fire-and-forget, client-side game
 * state is authoritative during play; the server-side copy is for resume
 * and analytics.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import type { SimulatorState } from "@/lib/simulator/types";
import { getScenario } from "@/lib/simulator/scenarios";
import { replayXp } from "@/lib/simulator/engine";
import { mergeProgress } from "@/lib/simulator/progress-merge";
import { bumpSimulatorStreak } from "@/lib/simulator/streak";
import { logger } from "@/lib/logger";

const ProgressBody = z.object({
  scenarioId: z.string().min(1).max(100),
  currentSceneId: z.string().min(1).max(200),
  choicesMade: z.array(
    z.object({
      sceneId: z.string(),
      choiceId: z.string(),
      wasOptimal: z.boolean(),
      timestamp: z.string(),
    }),
  ),
  xpEarned: z.number().int().min(0).max(10_000),
  outcome: z.enum(["good", "neutral", "bad", "passed", "failed"]).nullable().optional(),
  endedAt: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const { searchParams } = new URL(request.url);
    const scenarioId = searchParams.get("scenarioId");

    if (scenarioId) {
      const row = await prisma.simulatorProgress.findUnique({
        where: { userId_scenarioId: { userId: user.id, scenarioId } },
      });
      return NextResponse.json({ progress: row ?? null });
    }

    const rows = await prisma.simulatorProgress.findMany({
      where: { userId: user.id },
      orderBy: { startedAt: "desc" },
    });
    return NextResponse.json({ progress: rows });
  });
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof ProgressBody>;
    try {
      const json = await req.json();
      body = ProgressBody.parse(json);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid progress payload", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const scenario = getScenario(body.scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: `Unknown scenario: ${body.scenarioId}` },
        { status: 404 },
      );
    }

    // Server-side sanity: the currentSceneId must be a scene that actually
    // exists in the scenario. Prevents a client from persisting garbage.
    if (!scenario.scenes.find((s) => s.id === body.currentSceneId)) {
      return NextResponse.json(
        { error: `Scene "${body.currentSceneId}" not in scenario` },
        { status: 400 },
      );
    }

    try {
      // Anti-cheat: recompute XP server-side from the claimed
      // choicesMade rather than trusting the client number. The
      // server owns the engine + scenario data, so it can verify
      // the actual XP earned. The persisted value is clamped to
      // min(client, server) so a cheater sending xpEarned=10000
      // via curl can't inflate the leaderboard. Honest clients
      // will hit equality, the extra work is only penalised on
      // tampering.
      const authoritative = replayXp(scenario, body.choicesMade);
      const safeXp = Math.min(body.xpEarned, authoritative.xp);

      // Best-of merge, shared with /api/simulator/complete via
      // lib/simulator/progress-merge so both routes agree on
      // personal-best preservation. Without the shared helper, a
      // replay completion would go through /complete, which used to
      // clobber the existing row with a destructive upsert, losing
      // the player's prior mastery.
      const existing = await prisma.simulatorProgress.findUnique({
        where: {
          userId_scenarioId: { userId: user.id, scenarioId: body.scenarioId },
        },
      });

      const { create, update } = mergeProgress(existing, {
        currentSceneId: body.currentSceneId,
        choicesMade: body.choicesMade,
        xpEarned: safeXp,
        outcome: body.outcome ?? null,
        endedAt: body.endedAt ?? null,
      });

      const saved = await prisma.simulatorProgress.upsert({
        where: {
          userId_scenarioId: { userId: user.id, scenarioId: body.scenarioId },
        },
        create: {
          userId: user.id,
          scenarioId: body.scenarioId,
          ...create,
        },
        update,
      });

      // Daily-streak bump. Fire-and-forget, a failure here must not 500
      // the progress save itself. See `lib/simulator/streak.ts` for the
      // UTC-day rollover logic.
      bumpSimulatorStreak(prisma, user.id).catch((err) => {
        logger.error("[simulator-progress] streak bump failed", err as Error, {
          userId: user.id,
        });
      });

      return NextResponse.json({ progress: saved });
    } catch (err) {
      logger.error("[simulator-progress] upsert failed", err as Error, {
        userId: user.id,
        scenarioId: body.scenarioId,
      });
      return NextResponse.json(
        { error: "Failed to save progress" },
        { status: 500 },
      );
    }
  });
}

// Helper for the runner so it can build a fresh state from the persisted row.
export type SimulatorProgressShape = SimulatorState;
