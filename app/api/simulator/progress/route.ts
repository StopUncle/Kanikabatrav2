/**
 * GET  /api/simulator/progress             — list the user's progress across all scenarios
 * GET  /api/simulator/progress?scenarioId= — load one scenario's progress (for resume)
 * POST /api/simulator/progress             — upsert progress for one scenario
 *
 * The POST is called from the client on every meaningful state transition
 * (scene change, choice, ending). It's fire-and-forget — client-side game
 * state is authoritative during play; the server-side copy is for resume
 * and analytics.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import type { SimulatorState } from "@/lib/simulator/types";
import { getScenario } from "@/lib/simulator/scenarios";
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
      // Persisted row is the player's PERSONAL BEST plus a live pointer
      // at the current scene for mid-run resume. Three cases:
      //
      //   A) mid-run save (body.endedAt falsy)
      //      - advance currentSceneId + choicesMade pointer
      //      - DO NOT touch outcome / completedAt / xpEarned if the
      //        player already has a completion — those are their best
      //      - xpEarned on an uncompleted row bumps only upward
      //
      //   B) first-ever completion (existing falsy OR existing.completedAt null)
      //      - write the whole thing
      //
      //   C) replay completion (both existing.completedAt and body.endedAt set)
      //      - keep the HIGHER xpEarned
      //      - keep the BETTER outcome (good > neutral|passed > failed|bad)
      //      - keep the ORIGINAL completedAt — first-completion timestamp
      //        is load-bearing for "when did you beat this"
      //      - advance currentSceneId pointer
      //
      // Previously a worse replay (outcome=bad at 60 XP after a first
      // run of outcome=good at 100 XP) would overwrite the mastery
      // completion with the defeat, losing the player's best run.
      const existing = await prisma.simulatorProgress.findUnique({
        where: {
          userId_scenarioId: { userId: user.id, scenarioId: body.scenarioId },
        },
      });

      const outcomeRank = (o: string | null): number => {
        // Higher = better. Unset = 0 so any real outcome beats it.
        if (o === "good") return 4;
        if (o === "passed") return 3;
        if (o === "neutral") return 2;
        if (o === "failed") return 1;
        if (o === "bad") return 0;
        return -1;
      };

      const hadCompletion = !!existing?.completedAt;
      const isCompletingNow = !!body.endedAt;
      const isReplayCompletion = hadCompletion && isCompletingNow;
      const isMidRunSave = !isCompletingNow;

      // Best-of XP across runs (floor zero).
      const bestXp = Math.max(existing?.xpEarned ?? 0, body.xpEarned);

      // Best-of outcome across runs (existing vs incoming).
      let bestOutcome: string | null = existing?.outcome ?? null;
      if (body.outcome) {
        if (outcomeRank(body.outcome) > outcomeRank(bestOutcome)) {
          bestOutcome = body.outcome;
        }
      }

      // completedAt: sticky once set. First completion timestamp wins
      // (no re-stamping on replay completion).
      const keptCompletedAt: Date | null = hadCompletion
        ? existing!.completedAt!
        : isCompletingNow
          ? new Date(body.endedAt!)
          : null;

      const saved = await prisma.simulatorProgress.upsert({
        where: {
          userId_scenarioId: { userId: user.id, scenarioId: body.scenarioId },
        },
        create: {
          userId: user.id,
          scenarioId: body.scenarioId,
          currentSceneId: body.currentSceneId,
          choicesMade: body.choicesMade,
          xpEarned: body.xpEarned,
          outcome: body.outcome ?? null,
          completedAt: body.endedAt ? new Date(body.endedAt) : null,
        },
        update: {
          currentSceneId: body.currentSceneId,
          choicesMade: body.choicesMade,
          xpEarned:
            isMidRunSave && hadCompletion
              ? // Mid-run save on an already-completed row must not touch the
                // player's best XP.
                existing!.xpEarned
              : isReplayCompletion
                ? bestXp
                : body.xpEarned,
          outcome:
            isMidRunSave && hadCompletion
              ? existing!.outcome
              : isReplayCompletion
                ? bestOutcome
                : (body.outcome ?? null),
          completedAt: keptCompletedAt,
        },
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
