/**
 * POST /api/admin/board/[slug]/score — add a (re)score to a figure.
 *
 * Auth: admin session cookie. Creates a Score row, makes it current,
 * derives the tier, and logs the DEBUT / RESCORE_REVEALED event. Every
 * call is one entry on the figure's living re-score timeline.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { addScore, BoardInputError } from "@/lib/board/db";

const Body = z.object({
  composite: z.number().int().min(0).max(100),
  factor1: z.number().int().min(0).max(100),
  factor2: z.number().int().min(0).max(100),
  verdict: z.string().min(1).max(4000),
  sectors: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        score: z.number().int().min(0).max(100),
        note: z.string().max(400).optional(),
      }),
    )
    .max(12),
  triggerEvent: z.string().max(200).nullable().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { slug } = await params;

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
    await addScore({ figureId: figure.id, ...body });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof BoardInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
