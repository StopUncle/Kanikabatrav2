/**
 * GET  /api/admin/adventures  — list all adventures (published + draft)
 * POST /api/admin/adventures  — create one
 *
 * Auth: admin session cookie via requireAdminSession.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { SCENARIO_BY_ID } from "@/lib/simulator/scenarios";

const Body = z.object({
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  title: z.string().min(2).max(120),
  tagline: z.string().min(2).max(200),
  description: z.string().min(2).max(4000),
  scenarioIds: z.array(z.string().min(1)).min(1).max(20),
  tier: z.enum(["free", "premium", "vip"]).default("free"),
  estimatedMinutes: z.number().int().min(1).max(600),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  coverArt: z.string().url().nullable().optional(),
  endingRecap: z.string().min(2).max(8000),
  isNew: z.boolean().default(false),
  publish: z.boolean().default(false),
});

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const adventures = await prisma.adventure.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  return NextResponse.json({ adventures });
}

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

  // Validate every scenario id resolves at create time. We still tolerate
  // later code deletions on the read path, but creating an arc with a
  // typo'd id is always a mistake the admin wants caught immediately.
  const unknown = body.scenarioIds.filter((id) => !SCENARIO_BY_ID[id]);
  if (unknown.length > 0) {
    return NextResponse.json(
      { error: "Unknown scenario ids", unknown },
      { status: 400 },
    );
  }

  // Duplicate scenario ids in the same arc cause the self-healing cursor
  // on the run page to silently skip the repeat, which is surprising and
  // wastes the admin's authoring intent. Reject loudly at create time.
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const id of body.scenarioIds) {
    if (seen.has(id)) dupes.push(id);
    seen.add(id);
  }
  if (dupes.length > 0) {
    return NextResponse.json(
      { error: "Duplicate scenario ids in arc", dupes },
      { status: 400 },
    );
  }

  try {
    const adv = await prisma.adventure.create({
      data: {
        slug: body.slug,
        title: body.title,
        tagline: body.tagline,
        description: body.description,
        scenarioIds: body.scenarioIds,
        tier: body.tier,
        estimatedMinutes: body.estimatedMinutes,
        difficulty: body.difficulty,
        coverArt: body.coverArt ?? null,
        endingRecap: body.endingRecap,
        isNew: body.isNew,
        publishedAt: body.publish ? new Date() : null,
      },
    });
    return NextResponse.json({ adventure: adv });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create adventure", detail: (err as Error).message },
      { status: 400 },
    );
  }
}
