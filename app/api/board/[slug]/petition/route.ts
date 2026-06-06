/**
 * POST /api/board/[slug]/petition
 *
 * Sign a re-score petition for a figure. A petition, not a mandate: it
 * decides who gets re-examined; Kanika still assigns the number. A
 * citation is REQUIRED, every signature must point at a real event
 * (news, interview, filing). Account-gated; one signature per account.
 *
 * Body: { sourceUrl: string }
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { signPetition, BoardInputError } from "@/lib/board/db";
import { logger } from "@/lib/logger";

const Body = z.object({
  sourceUrl: z.string().url().max(2000),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json(
      { error: "Sign in to put a figure on the table", requiresAuth: true },
      { status: 401 },
    );
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "A valid source link is required", detail: (err as Error).message },
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
    const result = await signPetition({
      figureId: figure.id,
      userId,
      sourceUrl: body.sourceUrl,
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof BoardInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    logger.error(
      "[board.petition] failed",
      err instanceof Error ? err : new Error(String(err)),
      { slug, userId },
    );
    return NextResponse.json(
      { error: "Could not record petition" },
      { status: 500 },
    );
  }
}
