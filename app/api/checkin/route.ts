/**
 * POST /api/checkin — record today's check-in for the member.
 *
 * Body: { situation: SituationKey }
 * Returns: { situation, recommendedTrack, createdAt }
 *
 * Upserts on (userId, today's UTC date) so re-answering replaces the
 * prior answer cleanly. The recommended track is derived server-side
 * from the user's stored gender, so the client can't manipulate it.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { recordTodayCheckIn } from "@/lib/checkin/db";
import { SITUATIONS } from "@/lib/checkin/situations";
import { logger } from "@/lib/logger";

const SITUATION_KEYS = SITUATIONS.map((s) => s.key) as [string, ...string[]];

const Body = z.object({
  situation: z.enum(SITUATION_KEYS as [string, ...string[]]),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let parsed: z.infer<typeof Body>;
    try {
      parsed = Body.parse(await req.json());
    } catch (_err) {
      return NextResponse.json(
        { error: "invalid situation" },
        { status: 400 },
      );
    }

    try {
      const result = await recordTodayCheckIn(
        prisma,
        user.id,
        parsed.situation as never,
      );
      return NextResponse.json(result);
    } catch (err) {
      logger.error(
        "checkin save failed",
        err instanceof Error ? err : undefined,
      );
      return NextResponse.json({ error: "save failed" }, { status: 500 });
    }
  });
}
