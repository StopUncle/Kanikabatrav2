/**
 * GET /api/tells/[id]/my-response
 *
 * Returns the most recent response by the current user (or anonId)
 * for a given Tell, or null if not yet answered. Used by TellPlayer
 * on mount so a refresh lands on the reveal screen instead of the
 * empty form.
 *
 * Anonymous-friendly: looks up by anonId when no userId.
 */

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveTellContext } from "@/lib/tells/auth-context";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ctx = await resolveTellContext();

  // Find the last scored response for this Tell by this user (or anon).
  const where = ctx.userId
    ? { userId: ctx.userId, tellId: id }
    : { anonId: ctx.anonId, tellId: id };

  const response = await prisma.tellResponse.findFirst({
    where,
    orderBy: { answeredAt: "desc" },
    select: {
      choiceId: true,
      isCorrect: true,
      scoreImpact: true,
      countedScored: true,
      countedStreak: true,
      answeredAt: true,
    },
  });

  return NextResponse.json({ response });
}
