import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";

/**
 * POST /api/initiation/complete — stamp the member's initiationAt and
 * return the placement payload for the final ceremony step.
 *
 * Called when the flow reaches The Placement, not when the member
 * clicks through it: the ceremony IS the completion. Idempotent; a
 * re-entry (refresh on the last step) re-reads the same numbers
 * without moving the timestamp.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const row = await prisma.user.findUnique({
      where: { id: user.id },
      select: { initiationAt: true, standing: true, ringLevel: true },
    });
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (!row.initiationAt) {
      await prisma.user.update({
        where: { id: user.id },
        data: { initiationAt: new Date() },
      });
    }

    const ring = ringByLevel(row.ringLevel);
    const next = standingToNextRing(row.standing);
    return NextResponse.json({
      standing: row.standing,
      ringLevel: ring.level,
      ringName: ring.name,
      ringEpithet: ring.epithet,
      nextRingName: next?.next.name ?? null,
      standingToNext: next?.remaining ?? null,
    });
  });
}
