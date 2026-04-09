import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> },
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

  const { postId } = await params;

  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const existingLike = await prisma.feedPostLike.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  if (existingLike) {
    const [, updatedPost] = await prisma.$transaction([
      prisma.feedPostLike.delete({ where: { id: existingLike.id } }),
      prisma.feedPost.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
        select: { likeCount: true },
      }),
    ]);

    return NextResponse.json({
      liked: false,
      likeCount: updatedPost.likeCount,
    });
  }

  const [, updatedPost] = await prisma.$transaction([
    prisma.feedPostLike.create({
      data: { postId, userId },
    }),
    prisma.feedPost.update({
      where: { id: postId },
      data: { likeCount: { increment: 1 } },
      select: { likeCount: true },
    }),
  ]);

  return NextResponse.json({
    liked: true,
    likeCount: updatedPost.likeCount,
  });
}
