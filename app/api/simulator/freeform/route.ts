/**
 * POST /api/simulator/freeform, judge a typed move against the current
 * scene's authored choices.
 *
 * The response carries a resolved choiceId (or none) plus a short
 * Kanika-voice read. The client applies the resolved choice through the
 * normal engine path, so this route never mutates progress itself.
 *
 * Cost controls, cheap to expensive:
 *   1. Per-user burst limit (8/min) blocks retry loops.
 *   2. Per-user daily ceiling (80/day) bounds the long tail.
 *   3. Haiku model with a 300-token output cap.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";
import { getScenario } from "@/lib/simulator/scenarios";
import { judgeFreeformMove, JudgeInputError } from "@/lib/simulator/judge";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const Body = z.object({
  scenarioId: z.string().min(1).max(100),
  sceneId: z.string().min(1).max(200),
  text: z.string().min(2).max(300),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const burstLimited = await enforceRateLimit(
      limits.simFreeformBurst,
      `user:${user.id}`,
    );
    if (burstLimited) return burstLimited;
    const dailyLimited = await enforceRateLimit(
      limits.simFreeformDaily,
      `user:${user.id}`,
    );
    if (dailyLimited) return dailyLimited;

    let body: z.infer<typeof Body>;
    try {
      body = Body.parse(await req.json());
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid payload", detail: (err as Error).message },
        { status: 400 },
      );
    }

    const scenario = getScenario(body.scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Unknown scenario" }, { status: 404 });
    }

    try {
      const result = await judgeFreeformMove(scenario, body.sceneId, body.text);
      return NextResponse.json({
        matched: result.choice !== null,
        choiceId: result.choice?.id ?? null,
        read: result.read,
      });
    } catch (err) {
      if (err instanceof JudgeInputError) {
        const status = err.kind === "no-scene" ? 404 : 400;
        return NextResponse.json(
          { error: err.message, kind: err.kind },
          { status },
        );
      }
      logger.error(
        "[simulator/freeform] judge failed",
        err instanceof Error ? err : new Error(String(err)),
        { userId: user.id, scenarioId: body.scenarioId, sceneId: body.sceneId },
      );
      return NextResponse.json(
        { error: "Could not read your move. Tap a choice or try again." },
        { status: 502 },
      );
    }
  });
}
