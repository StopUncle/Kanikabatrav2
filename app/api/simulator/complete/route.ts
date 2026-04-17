/**
 * POST /api/simulator/complete — called on ending scene reach.
 *
 * Server responsibilities:
 *   1. Resolve the badge keys earned by this run (via badgesEarnedFromState)
 *   2. Upsert progress row with outcome + completedAt
 *   3. Insert SimulatorBadge rows for any new badges (unique constraint
 *      silently skips duplicates)
 *   4. Return the list of NEW badge keys so the ending screen can celebrate
 *
 * Failure is non-fatal for the player — if the request dies, the client
 * still shows the ending; the badge just won't register until they replay.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getScenario } from "@/lib/simulator/scenarios";
import { badgesEarnedFromState } from "@/lib/simulator/badges";
import type { SimulatorState } from "@/lib/simulator/types";
import { logger } from "@/lib/logger";

const CompleteBody = z.object({
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
  outcome: z.enum(["good", "neutral", "bad", "passed", "failed"]),
  endedAt: z.string(),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof CompleteBody>;
    try {
      const json = await req.json();
      body = CompleteBody.parse(json);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid completion payload", detail: (err as Error).message },
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

    const endingScene = scenario.scenes.find(
      (s) => s.id === body.currentSceneId && s.isEnding,
    );
    if (!endingScene) {
      return NextResponse.json(
        { error: "currentSceneId is not a declared ending for this scenario" },
        { status: 400 },
      );
    }

    const state: SimulatorState = {
      scenarioId: body.scenarioId,
      currentSceneId: body.currentSceneId,
      choicesMade: body.choicesMade,
      xpEarned: body.xpEarned,
      outcome: body.outcome,
      endedAt: body.endedAt,
    };

    const earnedKeys = badgesEarnedFromState(scenario, state);

    try {
      // Persist progress + badges in one round-trip.
      const [, existing] = await prisma.$transaction([
        prisma.simulatorProgress.upsert({
          where: {
            userId_scenarioId: {
              userId: user.id,
              scenarioId: body.scenarioId,
            },
          },
          create: {
            userId: user.id,
            scenarioId: body.scenarioId,
            currentSceneId: body.currentSceneId,
            choicesMade: body.choicesMade,
            xpEarned: body.xpEarned,
            outcome: body.outcome,
            completedAt: new Date(body.endedAt),
          },
          update: {
            currentSceneId: body.currentSceneId,
            choicesMade: body.choicesMade,
            xpEarned: body.xpEarned,
            outcome: body.outcome,
            completedAt: new Date(body.endedAt),
          },
        }),
        prisma.simulatorBadge.findMany({
          where: { userId: user.id, badgeKey: { in: earnedKeys } },
          select: { badgeKey: true },
        }),
      ]);

      const alreadyEarned = new Set(existing.map((b) => b.badgeKey));
      const newKeys = earnedKeys.filter((k) => !alreadyEarned.has(k));

      if (newKeys.length > 0) {
        await prisma.simulatorBadge.createMany({
          data: newKeys.map((badgeKey) => ({ userId: user.id, badgeKey })),
          skipDuplicates: true,
        });
      }

      return NextResponse.json({
        success: true,
        allEarnedKeys: earnedKeys, // every badge the run would earn
        newlyEarnedKeys: newKeys, // only the ones not previously held
      });
    } catch (err) {
      logger.error("[simulator-complete] failed", err as Error, {
        userId: user.id,
        scenarioId: body.scenarioId,
      });
      return NextResponse.json(
        { error: "Failed to record completion" },
        { status: 500 },
      );
    }
  });
}
