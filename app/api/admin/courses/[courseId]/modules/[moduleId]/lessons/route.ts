import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type RouteParams = {
  params: Promise<{ courseId: string; moduleId: string }>;
};

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { moduleId } = await params;

  try {
    const body = await request.json();
    const { title, description, videoUrl, duration, textContent, isFree, sortOrder } =
      body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);

    const durationSeconds = duration ? Math.round(parseFloat(duration) * 60) : null;

    const lesson = await prisma.courseLesson.create({
      data: {
        moduleId,
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        videoUrl: videoUrl?.trim() || null,
        duration: durationSeconds,
        textContent: textContent?.trim() || null,
        isFree: isFree ?? false,
        sortOrder: parseInt(sortOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 },
    );
  }
}
