import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;
  return request.headers.get("x-admin-secret") === adminSecret;
}

type RouteParams = { params: Promise<{ courseId: string; moduleId: string }> };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { moduleId } = await params;

  try {
    const body = await request.json();
    const { title, description, sortOrder } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) {
      data.title = title.trim();
      data.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    if (description !== undefined) data.description = description?.trim() || null;
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder) || 0;

    const updated = await prisma.courseModule.update({
      where: { id: moduleId },
      data,
    });

    return NextResponse.json({ success: true, module: updated });
  } catch (error) {
    console.error("Error updating module:", error);
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { moduleId } = await params;

  try {
    await prisma.courseModule.delete({ where: { id: moduleId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting module:", error);
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 },
    );
  }
}
