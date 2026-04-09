import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type RouteParams = { params: Promise<{ courseId: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { courseId } = await params;

  try {
    const body = await request.json();
    const { title, description, sortOrder } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);

    const created = await prisma.courseModule.create({
      data: {
        courseId,
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        sortOrder: parseInt(sortOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, module: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 },
    );
  }
}
