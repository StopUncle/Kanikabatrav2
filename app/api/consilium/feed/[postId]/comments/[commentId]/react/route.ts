import { NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";

async function resolveUserId(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A4 decision: MEMBER-ONLY, same as the Feed it hangs off.
  const access = await getAccess(userId);
  if (!canAccessMemberOnly(access)) {
    return NextResponse.json({ error: "Not a member" }, { status: 403 });
  }

  const { postId, commentId } = await params;

  const comment = await prisma.feedComment.findFirst({
    where: { id: commentId, postId, status: "APPROVED" },
    select: { id: true },
  });

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: { commentId_userId: { commentId, userId } },
  });

  if (existingLike) {
    const [, updatedComment] = await prisma.$transaction([
      prisma.commentLike.delete({ where: { id: existingLike.id } }),
      prisma.feedComment.update({
        where: { id: commentId },
        data: { likeCount: { decrement: 1 } },
        select: { likeCount: true },
      }),
    ]);

    return NextResponse.json({
      liked: false,
      likeCount: updatedComment.likeCount,
    });
  }

  const [, updatedComment] = await prisma.$transaction([
    prisma.commentLike.create({
      data: { commentId, userId },
    }),
    prisma.feedComment.update({
      where: { id: commentId },
      data: { likeCount: { increment: 1 } },
      select: { likeCount: true },
    }),
  ]);

  return NextResponse.json({
    liked: true,
    likeCount: updatedComment.likeCount,
  });
}
