import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId: string;
  try {
    const payload = verifyAccessToken(token);
    userId = payload.userId;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isMember } = await checkMembership(userId);
  if (!isMember) {
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
