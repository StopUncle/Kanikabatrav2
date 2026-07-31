import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * POST /api/arrival/complete, fired by the Arrival's Begin button.
 *
 * Stamps arrivalAt for every tier (members included, so the Day-0 row can
 * tick off the Arrival itself instead of leaning on the member ceremony),
 * and records gender when the free-tier ask on the Arrival provided one.
 * Idempotent: arrivalAt is only ever set once, and gender never overwrites
 * an existing value.
 */

const Body = z.object({
  gender: z.enum(["MALE", "FEMALE"]).optional(),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let gender: "MALE" | "FEMALE" | undefined;
    try {
      const json = await req.json();
      gender = Body.parse(json).gender;
    } catch {
      gender = undefined;
    }

    try {
      const existing = await prisma.user.findUnique({
        where: { id: user.id },
        select: { arrivalAt: true, gender: true },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          arrivalAt: existing?.arrivalAt ?? new Date(),
          ...(gender && !existing?.gender ? { gender } : {}),
        },
      });
      return NextResponse.json({ success: true });
    } catch (err) {
      logger.error("[arrival] complete failed", err as Error, {
        userId: user.id,
      });
      return NextResponse.json({ error: "Failed to record" }, { status: 500 });
    }
  });
}
