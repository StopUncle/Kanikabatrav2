/**
 * POST /api/admin/board — create a figure.
 *
 * Auth: admin session cookie. A new figure starts as a stub (no score)
 * unless one is added afterward via the score endpoint.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { createFigure } from "@/lib/board/db";

const Body = z.object({
  name: z.string().min(1).max(120),
  descriptor: z.string().max(160).nullable().optional(),
  archetype: z.enum(["OPERATOR", "TRAINWRECK"]).nullable().optional(),
  status: z.enum(["ON_BOARD", "RESCORE_PENDING", "MOST_REQUESTED"]).optional(),
  isCalibration: z.boolean().optional(),
  featuredRequest: z.boolean().optional(),
  photoUrl: z.string().url().max(500).nullable().optional(),
});

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const { slug } = await createFigure(body);
  return NextResponse.json({ slug });
}
