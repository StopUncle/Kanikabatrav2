/**
 * POST /api/program/lesson/[lessonId]/view
 *
 * Marks a lesson watched, so a four-lesson week can show progress rather
 * than being all-or-nothing. Idempotent, cheap, and deliberately not worth
 * an error path: losing a view marker is a cosmetic tick, not the member's
 * work.
 */

import { NextResponse, type NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { getAccess, canTrain } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  return requireAuth(request, async (_req, user) => {
    const userId = user.id;
    // Same training gate as the rest of The Twelve.
    const access = await getAccess(userId);
    if (!canTrain(access)) {
      return NextResponse.json(
        { error: "This needs an active subscription. The Pact opens it." },
        { status: 403 },
      );
    }
    const { lessonId } = await params;

    const lesson = await prisma.transformationLesson.findUnique({
      where: { id: lessonId },
      select: { id: true, week: { select: { isPublished: true } } },
    });
    if (!lesson?.week.isPublished) {
      return NextResponse.json({ error: "Unknown lesson" }, { status: 404 });
    }

    await prisma.lessonView.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId },
      update: {},
    });

    return NextResponse.json({ viewed: true });
  });
}
