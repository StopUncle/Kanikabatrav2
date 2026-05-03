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

/**
 * GET /api/tells/[id]/my-response
 *
 * Returns the most recent response by the current user (or anonId)
 * for a given Tell, or null if not yet answered. Used by TellPlayer
 * on mount so a refresh lands on the reveal screen instead of the
 * empty form.
 *
 * If the user has answered, the response includes the full reveal
 * payload (choices with isCorrect/why + the reveal text). Without
 * an answer, the reveal payload is null and the client renders the
 * empty form. This is the post-answer "earned" delivery of the
 * answer key.
 */

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveTellContext } from "@/lib/tells/auth-context";
import type { TellChoice } from "@/lib/tells/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ctx = await resolveTellContext();

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

  if (!response) {
    return NextResponse.json({ response: null, reveal: null });
  }

  // User has answered, fetch the full Tell so the client can render
  // the reveal screen with choices' isCorrect/why and Kanika's read.
  const tell = await prisma.tell.findUnique({
    where: { id },
    select: { choices: true, reveal: true },
  });

  return NextResponse.json({
    response,
    reveal: tell
      ? {
          choices: tell.choices as unknown as TellChoice[],
          reveal: tell.reveal,
        }
      : null,
  });
}
