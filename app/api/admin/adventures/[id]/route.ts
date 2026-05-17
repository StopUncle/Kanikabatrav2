/**
 * PATCH  /api/admin/adventures/[id]  — partial update + publish toggle
 * DELETE /api/admin/adventures/[id]  — delete
 *
 * Auth: admin session cookie.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { SCENARIO_BY_ID } from "@/lib/simulator/scenarios";

const PatchBody = z
  .object({
    slug: z
      .string()
      .min(2)
      .max(80)
      .regex(/^[a-z0-9-]+$/),
    title: z.string().min(2).max(120),
    tagline: z.string().min(2).max(200),
    description: z.string().min(2).max(4000),
    scenarioIds: z.array(z.string().min(1)).min(1).max(20),
    tier: z.enum(["free", "premium", "vip"]),
    estimatedMinutes: z.number().int().min(1).max(600),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    coverArt: z.string().url().nullable(),
    endingRecap: z.string().min(2).max(8000),
    isNew: z.boolean(),
    publish: z.boolean(),
  })
  .partial();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  let body: z.infer<typeof PatchBody>;
  try {
    body = PatchBody.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  if (body.scenarioIds) {
    const unknown = body.scenarioIds.filter((sid) => !SCENARIO_BY_ID[sid]);
    if (unknown.length > 0) {
      return NextResponse.json(
        { error: "Unknown scenario ids", unknown },
        { status: 400 },
      );
    }
  }

  // Build the update payload. `publish: true` stamps publishedAt now,
  // `publish: false` clears it (un-publishes). Touching `publish` is the
  // only way to flip the visibility of an adventure.
  const data: Record<string, unknown> = {};
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.title !== undefined) data.title = body.title;
  if (body.tagline !== undefined) data.tagline = body.tagline;
  if (body.description !== undefined) data.description = body.description;
  if (body.scenarioIds !== undefined) data.scenarioIds = body.scenarioIds;
  if (body.tier !== undefined) data.tier = body.tier;
  if (body.estimatedMinutes !== undefined)
    data.estimatedMinutes = body.estimatedMinutes;
  if (body.difficulty !== undefined) data.difficulty = body.difficulty;
  if (body.coverArt !== undefined) data.coverArt = body.coverArt;
  if (body.endingRecap !== undefined) data.endingRecap = body.endingRecap;
  if (body.isNew !== undefined) data.isNew = body.isNew;
  if (body.publish !== undefined)
    data.publishedAt = body.publish ? new Date() : null;

  try {
    const updated = await prisma.adventure.update({
      where: { id },
      data,
    });
    return NextResponse.json({ adventure: updated });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not update adventure", detail: (err as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await prisma.adventure.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not delete adventure", detail: (err as Error).message },
      { status: 400 },
    );
  }
}
