import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "PENDING_REVIEW";

    const where =
      statusParam === "ALL" ? {} : { status: statusParam as "PENDING_REVIEW" };

    const comments = await prisma.feedComment.findMany({
      where,
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            displayName: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      comments,
      count: comments.length,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}
