import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CommentStatus } from "@prisma/client";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error("ADMIN_SECRET environment variable not configured");
    return false;
  }

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

const ACTION_TO_STATUS: Record<string, CommentStatus> = {
  approve: "APPROVED",
  reject: "REJECTED",
  hide: "HIDDEN",
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: "Unauthorized - valid admin credentials required" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body as { action: string };

    if (!action || !ACTION_TO_STATUS[action]) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve', 'reject', or 'hide'" },
        { status: 400 },
      );
    }

    const comment = await prisma.feedComment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 },
      );
    }

    const updated = await prisma.feedComment.update({
      where: { id },
      data: { status: ACTION_TO_STATUS[action] },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Comment ${action}d`,
      comment: updated,
    });
  } catch (error) {
    console.error("Error moderating comment:", error);
    return NextResponse.json(
      { error: "Failed to moderate comment" },
      { status: 500 },
    );
  }
}
