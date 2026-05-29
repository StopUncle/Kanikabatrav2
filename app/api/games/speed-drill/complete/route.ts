/**
 * POST /api/games/speed-drill/complete, called when a Speed Drill run ends.
 *
 * Server responsibilities:
 *   1. Validate the payload (Zod, plus internal-consistency checks)
 *   2. Insert a GameSession row
 *   3. Bump the user's games streak (idempotent within a UTC calendar day)
 *   4. Return the updated streak so the results screen can show it
 *
 * Failure is non-fatal: if the request dies, the player still sees their
 * score. The row just doesn't persist; the next session will.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { bumpGamesStreak } from "@/lib/games/status";
import { bumpDailyStreak } from "@/lib/streak/daily";
import { DRILL_CARDS } from "@/lib/games/speed-drill/content";
import { logger } from "@/lib/logger";

const CompleteBody = z.object({
  /** Number of correct calls in the run. */
  score: z.number().int().min(0).max(DRILL_CARDS),
  /** Cards actually answered (could be < DRILL_CARDS if the timer ran out). */
  totalCards: z.number().int().min(0).max(DRILL_CARDS),
  /** Longest correct streak during the run. */
  maxCombo: z.number().int().min(0).max(DRILL_CARDS),
  /** Total session length in seconds, including countdown. Cap at 5 min
   *  to catch tab-left-open garbage payloads. */
  durationSec: z.number().int().min(0).max(300),
  /** Difficulty tier used for the draw. 1=warm-up, 2=sharp, 3=ruthless. */
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let body: z.infer<typeof CompleteBody>;
    try {
      body = CompleteBody.parse(await req.json());
    } catch (_err) {
      return NextResponse.json({ error: "invalid payload" }, { status: 400 });
    }

    if (body.score > body.totalCards) {
      return NextResponse.json(
        { error: "score exceeds totalCards" },
        { status: 400 },
      );
    }

    // Server-side accuracy. Trust this column, not the client's value.
    const accuracy =
      body.totalCards > 0
        ? Math.round((body.score / body.totalCards) * 100)
        : 0;

    try {
      const session = await prisma.gameSession.create({
        data: {
          userId: user.id,
          gameKey: "speed-drill",
          score: body.score,
          totalCards: body.totalCards,
          accuracy,
          maxCombo: body.maxCombo,
          durationSec: body.durationSec,
          tier: body.tier,
        },
        select: {
          id: true,
          score: true,
          accuracy: true,
          maxCombo: true,
          playedAt: true,
        },
      });

      const streak = await bumpGamesStreak(prisma, user.id).catch((err) => {
        // Don't fail the request if the streak update errors. The session
        // is the load-bearing artefact; the streak is a derivative.
        logger.error(
          "games streak bump failed",
          err instanceof Error ? err : undefined,
        );
        return null;
      });

      // Unified Consilium daily streak — any game session counts toward it.
      bumpDailyStreak(prisma, user.id).catch((err) => {
        logger.error(
          "daily streak bump failed",
          err instanceof Error ? err : undefined,
        );
      });

      return NextResponse.json({ session, streak });
    } catch (err) {
      logger.error(
        "speed-drill complete failed",
        err instanceof Error ? err : undefined,
      );
      return NextResponse.json({ error: "save failed" }, { status: 500 });
    }
  });
}
