import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { checkAccessTier } from "@/lib/community/access";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  return requireAuth(request, async (_req, user) => {
    try {
      const { postId } = await params;

      const post = await prisma.forumPost.findUnique({
        where: { id: postId },
        include: { category: { select: { accessTier: true } } },
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const access = await checkAccessTier(user.id, post.category.accessTier);
      if (!access.hasAccess) {
        return NextResponse.json({ error: access.reason }, { status: 403 });
      }

      const existingLike = await prisma.postLike.findUnique({
        where: {
          postId_userId: { postId, userId: user.id },
        },
      });

      if (existingLike) {
        await prisma.$transaction([
          prisma.postLike.delete({
            where: { id: existingLike.id },
          }),
          prisma.forumPost.update({
            where: { id: postId },
            data: { likeCount: { decrement: 1 } },
          }),
        ]);

        return NextResponse.json({
          success: true,
          liked: false,
          likeCount: post.likeCount - 1,
        });
      } else {
        await prisma.$transaction([
          prisma.postLike.create({
            data: { postId, userId: user.id },
          }),
          prisma.forumPost.update({
            where: { id: postId },
            data: { likeCount: { increment: 1 } },
          }),
        ]);

        return NextResponse.json({
          success: true,
          liked: true,
          likeCount: post.likeCount + 1,
        });
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      return NextResponse.json(
        { error: "Failed to toggle like" },
        { status: 500 },
      );
    }
  });
}
