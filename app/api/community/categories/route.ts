import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import { resolveActiveUserIdFromRequest } from "@/lib/auth/resolve-user";

export async function GET(request: NextRequest) {
  try {
    // Ban-aware resolver. Banned users downgrade to PUBLIC-tier access
    // via the checkAccessTier filter below.
    const userId = await resolveActiveUserIdFromRequest(request);

    // Get all categories
    const categories = await prisma.forumCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: {
            posts: true,
            chatRooms: true,
          },
        },
      },
    });

    // Filter based on user access
    const accessibleCategories = await Promise.all(
      categories.map(async (category) => {
        const access = await checkAccessTier(userId, category.accessTier);
        return {
          ...category,
          postCount: category._count.posts,
          chatRoomCount: category._count.chatRooms,
          hasAccess: access.hasAccess,
          accessReason: access.reason,
          _count: undefined,
        };
      }),
    );

    return NextResponse.json({
      success: true,
      categories: accessibleCategories,
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
