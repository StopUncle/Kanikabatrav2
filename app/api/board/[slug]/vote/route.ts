/**
 * POST /api/board/[slug]/vote
 *
 * Cast or update the logged-in member's crowd score (/100) for a figure.
 * Account-gated: an anonymous caller gets 401, which the UI turns into
 * the signup prompt (this is the conversion wall). One vote per figure
 * per account; re-voting overwrites. Returns the fresh weighted aggregate
 * so the client can reconcile its optimistic update.
 *
 * Body: { composite: number }  // 0-100
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { recordCrowdVote, BoardInputError } from "@/lib/board/db";
import { logger } from "@/lib/logger";

const Body = z.object({
  composite: z.number().int().min(0).max(100),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json(
      { error: "Sign in to cast your score", requiresAuth: true },
      { status: 401 },
    );
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const figure = await prisma.figure.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!figure) {
    return NextResponse.json({ error: "Figure not found" }, { status: 404 });
  }

  try {
    const result = await recordCrowdVote({
      figureId: figure.id,
      userId,
      composite: body.composite,
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof BoardInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    logger.error(
      "[board.vote] failed",
      err instanceof Error ? err : new Error(String(err)),
      { slug, userId },
    );
    return NextResponse.json({ error: "Could not record vote" }, { status: 500 });
  }
}
