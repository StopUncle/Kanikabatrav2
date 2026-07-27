/**
 * GET  /api/admin/transformation   the twelve weeks, with runway
 * PATCH /api/admin/transformation  publish a week, or set a lesson's video
 *
 * One endpoint for one screen. The surface is deliberately small: Kanika
 * uploads video and publishes weeks. Copy lives in
 * lib/program/curriculum.ts and is changed by editing that file and
 * re-running the seed, so there is no rich-text editor here to maintain
 * and no way for the two to drift apart.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { isSafeMediaUrl } from "@/lib/security/safe-media-url";
import { readRunway } from "@/lib/program/runway";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const [weeks, runway] = await Promise.all([
    prisma.transformationWeek.findMany({
      orderBy: { weekNumber: "asc" },
      include: {
        lessons: { orderBy: { orderIndex: "asc" } },
        _count: { select: { completions: true } },
      },
    }),
    readRunway(prisma),
  ]);

  return NextResponse.json({
    runway,
    weeks: weeks.map((w) => ({
      weekNumber: w.weekNumber,
      title: w.title,
      lede: w.lede,
      challenge: w.challenge,
      readingLabel: w.readingLabel,
      isPublished: w.isPublished,
      completions: w._count.completions,
      lessons: w.lessons.map((l) => ({
        id: l.id,
        orderIndex: l.orderIndex,
        title: l.title,
        videoUrl: l.videoUrl,
      })),
      filmed: w.lessons.filter((l) => l.videoUrl).length,
      lessonCount: w.lessons.length,
    })),
  });
}

const Patch = z.union([
  z.object({
    action: z.literal("publish"),
    weekNumber: z.number().int().min(1),
    isPublished: z.boolean(),
  }),
  z.object({
    action: z.literal("video"),
    lessonId: z.string().min(1),
    videoUrl: z.string().trim(),
  }),
]);

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: z.infer<typeof Patch>;
  try {
    body = Patch.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.action === "publish") {
    if (body.isPublished) {
      // A week with no footage would unlock into an empty room and fire a
      // notification promising something that is not there.
      const filmed = await prisma.transformationLesson.count({
        where: { week: { weekNumber: body.weekNumber }, videoUrl: { not: null } },
      });
      if (filmed === 0) {
        return NextResponse.json(
          { error: "Add at least one video before publishing this week." },
          { status: 400 },
        );
      }
    }

    await prisma.transformationWeek.update({
      where: { weekNumber: body.weekNumber },
      data: { isPublished: body.isPublished },
    });
    return NextResponse.json({ ok: true });
  }

  const url = body.videoUrl.trim();
  if (url && !isSafeMediaUrl(url)) {
    return NextResponse.json({ error: "That URL is not allowed" }, { status: 400 });
  }

  await prisma.transformationLesson.update({
    where: { id: body.lessonId },
    data: { videoUrl: url || null },
  });
  return NextResponse.json({ ok: true });
}
