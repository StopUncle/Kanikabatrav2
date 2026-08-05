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
import { resolveScenario } from "@/lib/simulator/resolve";
import { getAccess, canTrain } from "@/lib/access/tier";
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

    const scenario = await resolveScenario(body.scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Unknown scenario" }, { status: 404 });
    }

    // Training tier, and deliberately a stronger gate than canPlay: typing
    // your own line is The Room, which the plan puts on the paid side even
    // for a scenario the free tier can otherwise play (free gets Rehearsal,
    // picking from the written choices). It is also the one call here that
    // spends LLM budget per request, so an open version is a cost hole as
    // well as a product one.
    const access = await getAccess(user.id);
    if (!canTrain(access)) {
      return NextResponse.json(
        { error: "This needs an active subscription. The Pact opens it." },
        { status: 403 },
      );
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
