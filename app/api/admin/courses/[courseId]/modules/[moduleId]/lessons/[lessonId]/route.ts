import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;
  return request.headers.get("x-admin-secret") === adminSecret;
}

type RouteParams = {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  try {
    const body = await request.json();
    const { title, description, videoUrl, duration, textContent, isFree, sortOrder } =
      body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) {
      data.title = title.trim();
      data.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    if (description !== undefined) data.description = description?.trim() || null;
    if (videoUrl !== undefined) data.videoUrl = videoUrl?.trim() || null;
    if (duration !== undefined) {
      data.duration = duration ? Math.round(parseFloat(duration) * 60) : null;
    }
    if (textContent !== undefined) data.textContent = textContent?.trim() || null;
    if (isFree !== undefined) data.isFree = isFree;
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder) || 0;

    const lesson = await prisma.courseLesson.update({
      where: { id: lessonId },
      data,
    });

    return NextResponse.json({ success: true, lesson });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  try {
    await prisma.courseLesson.delete({ where: { id: lessonId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 },
    );
  }
}
