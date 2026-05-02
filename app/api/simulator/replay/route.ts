/**
 * POST /api/simulator/replay
 *
 * Resets a player's in-progress state for one scenario so they can run
 * it again with different choices. PRESERVES the best-of completion
 * record (xpEarned, outcome) and history counters (completionCount,
 * endingsReached) so the catalog still shows "X / Y endings found"
 * and the player doesn't lose their first-completion badge eligibility.
 *
 * What gets reset:
 *   - currentSceneId  → scenario.startSceneId
 *   - choicesMade     → []
 *   - completedAt     → null
 *   - startedAt       → now (so the speedrun meta times the new run)
 *
 * What stays:
 *   - xpEarned        (best-of merged on next completion via /complete)
 *   - outcome         (best-of merged on next completion)
 *   - completionCount
 *   - endingsReached
 *
 * Why: members frequently complete a scenario optimally, then ask
 * "what would Maris have said if I'd taken the bait?" and have no way
 * to see the alternate paths. Without a replay endpoint, the only
 * options are clear-localStorage hacks or admin DB edits.
 *
 * Cheating concern: a player could grind the same scenario for repeat
 * XP. The /complete endpoint guards against this via mergeProgress —
 * it keeps the BEST run's xpEarned, so subsequent runs only update
 * the row if they exceed the prior best. So replays cannot inflate
 * the recorded XP beyond a single optimal playthrough.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getScenario } from "@/lib/simulator/scenarios";
import { logger } from "@/lib/logger";

const ReplayBody = z.object({
  scenarioId: z.string().min(1).max(100),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof ReplayBody>;
    try {
      body = ReplayBody.parse(await req.json());
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid replay payload", detail: (err as Error).message },
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

    try {
      // Find the existing progress row. If the user has never played
      // this scenario, there's nothing to reset — return success with
      // the fresh start state so the client can begin a normal first
      // run without an extra round-trip.
      const existing = await prisma.simulatorProgress.findUnique({
        where: {
          userId_scenarioId: {
            userId: user.id,
            scenarioId: body.scenarioId,
          },
        },
      });

      if (!existing) {
        return NextResponse.json({
          success: true,
          alreadyFresh: true,
          startSceneId: scenario.startSceneId,
        });
      }

      // Reset the in-progress fields, preserve the history counters.
      const updated = await prisma.simulatorProgress.update({
        where: { id: existing.id },
        data: {
          currentSceneId: scenario.startSceneId,
          choicesMade: [],
          completedAt: null,
          startedAt: new Date(),
          // Keep: xpEarned, outcome, completionCount, endingsReached.
        },
        select: {
          id: true,
          currentSceneId: true,
          completionCount: true,
          endingsReached: true,
          startedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        alreadyFresh: false,
        startSceneId: scenario.startSceneId,
        progress: updated,
      });
    } catch (err) {
      logger.error("[simulator-replay] failed", err as Error, {
        userId: user.id,
        scenarioId: body.scenarioId,
      });
      return NextResponse.json(
        { error: "Failed to reset scenario for replay" },
        { status: 500 },
      );
    }
  });
}
