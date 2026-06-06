/**
 * PATCH /api/admin/board/[slug] — update a figure's fields and sources.
 *
 * Auth: admin session cookie. Editorial metadata only (name, descriptor,
 * archetype, status, flags, photo, source list). Scores are immutable
 * history, added via the score endpoint, never edited here.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  name: z.string().min(1).max(120).optional(),
  descriptor: z.string().max(160).nullable().optional(),
  archetype: z.enum(["OPERATOR", "TRAINWRECK"]).nullable().optional(),
  status: z.enum(["ON_BOARD", "RESCORE_PENDING", "MOST_REQUESTED"]).optional(),
  isCalibration: z.boolean().optional(),
  featuredRequest: z.boolean().optional(),
  photoUrl: z.string().url().max(500).nullable().optional(),
  sources: z
    .array(
      z.object({
        label: z.string().min(1).max(200),
        url: z.string().url().max(2000),
      }),
    )
    .max(20)
    .optional(),
});

export async function PATCH(
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

  const { sources, ...fields } = body;

  await prisma.figure.update({
    where: { id: figure.id },
    data: {
      ...(fields.name !== undefined ? { name: fields.name } : {}),
      ...(fields.descriptor !== undefined ? { descriptor: fields.descriptor } : {}),
      ...(fields.archetype !== undefined ? { archetype: fields.archetype } : {}),
      ...(fields.status !== undefined ? { status: fields.status } : {}),
      ...(fields.isCalibration !== undefined ? { isCalibration: fields.isCalibration } : {}),
      ...(fields.featuredRequest !== undefined ? { featuredRequest: fields.featuredRequest } : {}),
      ...(fields.photoUrl !== undefined ? { photoUrl: fields.photoUrl } : {}),
    },
  });

  // Replace the source list wholesale when provided.
  if (sources) {
    await prisma.source.deleteMany({ where: { figureId: figure.id } });
    if (sources.length > 0) {
      await prisma.source.createMany({
        data: sources.map((s, i) => ({
          figureId: figure.id,
          label: s.label,
          url: s.url,
          sortOrder: i,
        })),
      });
    }
  }

  return NextResponse.json({ ok: true });
}
