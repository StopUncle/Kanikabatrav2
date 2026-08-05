/**
 * POST /api/program/week/[weekNumber]/complete
 *
 * The member says they did the challenge. This is the only moment in the
 * program that matters: the videos are delivery, the challenge is the thing
 * that changes someone.
 *
 * Refuses a week that has not opened for this member yet, so the derived
 * unlock is enforced on the server and not merely respected by the UI.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { grantStanding } from "@/lib/standing/grant";
import { STANDING } from "@/lib/standing/config";
import { programStartFor, unlockDateFor } from "@/lib/program/read";
import { TOTAL_WEEKS } from "@/lib/program/curriculum";
import { getAccess, canTrain } from "@/lib/access/tier";
import { logger } from "@/lib/logger";

const Body = z.object({
  reflection: z.string().trim().max(2000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ weekNumber: string }> },
) {
  return requireAuth(request, async (_req, user) => {
    const userId = user.id;
    // Same training gate as the rest of The Twelve; completing a week is
    // the program's core write and must lapse with the subscription.
    const access = await getAccess(userId);
    if (!canTrain(access)) {
      return NextResponse.json(
        { error: "This needs an active subscription. The Pact opens it." },
        { status: 403 },
      );
    }
    const weekNumber = Number((await params).weekNumber);
    if (
      !Number.isInteger(weekNumber) ||
      weekNumber < 1 ||
      weekNumber > TOTAL_WEEKS
    ) {
      return NextResponse.json({ error: "Unknown week" }, { status: 404 });
    }

    let body: z.infer<typeof Body> = {};
    try {
      const raw = await request.text();
      if (raw) body = Body.parse(JSON.parse(raw));
    } catch {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const week = await prisma.transformationWeek.findUnique({
      where: { weekNumber },
      select: { isPublished: true },
    });
    if (!week?.isPublished) {
      return NextResponse.json({ error: "Week not available" }, { status: 404 });
    }

    const startedAt = await programStartFor(prisma, userId);
    if (!startedAt) {
      return NextResponse.json(
        { error: "No active membership" },
        { status: 403 },
      );
    }

    // The server owns the unlock. A member cannot finish week 9 in their
    // first fortnight by calling this directly.
    if (unlockDateFor(startedAt, weekNumber) > new Date()) {
      return NextResponse.json(
        { error: "That week has not opened yet" },
        { status: 403 },
      );
    }

    const existing = await prisma.weekCompletion.findUnique({
      where: { userId_weekNumber: { userId, weekNumber } },
      select: { id: true },
    });

    await prisma.weekCompletion.upsert({
      where: { userId_weekNumber: { userId, weekNumber } },
      create: { userId, weekNumber, reflection: body.reflection ?? null },
      // Re-submitting only ever edits the reflection. completedAt keeps the
      // first date, because that is when they actually did it.
      update: { reflection: body.reflection ?? undefined },
    });

    let standing = null;
    if (!existing) {
      try {
        const grant = await grantStanding(prisma, {
          userId,
          source: "PROGRAM_WEEK",
          amount: STANDING.PROGRAM_WEEK,
          refId: `week-${weekNumber}`,
          dedupe: true,
        });
        if (grant.granted) {
          standing = {
            amount: grant.amount,
            newStanding: grant.newStanding,
            rangUp: grant.rangUp,
          };
        }
      } catch (err) {
        // A Standing failure must never cost them the completion itself.
        logger.error(
          "[program.complete] standing grant failed",
          err instanceof Error ? err : new Error(String(err)),
          { userId, weekNumber },
        );
      }
    }

    return NextResponse.json({
      completed: true,
      alreadyCompleted: Boolean(existing),
      standing,
    });
  });
}
