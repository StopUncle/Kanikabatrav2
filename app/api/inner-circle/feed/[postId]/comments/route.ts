import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { checkMembership } from "@/lib/community/membership";
import { isAdmin } from "@/lib/community/membership";
import { getViewerGender, authorGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";

export async function GET(
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

  // Gender-split: members only see comments from their own gender + admin/mod
  // content. Legacy users with no gender set see everything (authorWhere = undefined).
  const viewerGender = await getViewerGender(userId);
  const authorWhere = authorGenderWhere(viewerGender);

  // Visibility rule: APPROVED comments to everyone (subject to gender), PLUS
  // the viewer's own PENDING_REVIEW comments so they can see "your comment is
  // awaiting approval" instead of mysteriously vanishing.
  const visibilityWhere = {
    OR: [
      { status: "APPROVED" as const },
      { authorId: userId, status: "PENDING_REVIEW" as const },
    ],
  };

  const comments = await prisma.feedComment.findMany({
    where: {
      postId,
      parentId: null,
      ...visibilityWhere,
      ...(authorWhere ? { author: authorWhere } : {}),
    },
    orderBy: { createdAt: "asc" },
    include: {
      author: {
        select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
      },
      likes: {
        where: { userId },
        select: { id: true },
      },
      children: {
        where: {
          ...visibilityWhere,
          ...(authorWhere ? { author: authorWhere } : {}),
        },
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
          },
          likes: {
            where: { userId },
            select: { id: true },
          },
        },
      },
    },
  });

  const formatted = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    status: comment.status,
    likeCount: comment.likeCount,
    isLiked: comment.likes.length > 0,
    createdAt: comment.createdAt.toISOString(),
    author: {
      id: comment.author.id,
      name: comment.author.displayName || comment.author.name,
      avatarUrl: comment.author.avatarUrl,
      role: comment.author.role,
    },
    children: comment.children.map((child) => ({
      id: child.id,
      content: child.content,
      status: child.status,
      likeCount: child.likeCount,
      isLiked: child.likes.length > 0,
      createdAt: child.createdAt.toISOString(),
      author: {
        id: child.author.id,
        name: child.author.displayName || child.author.name,
        avatarUrl: child.author.avatarUrl,
        role: child.author.role,
      },
      children: [],
    })),
  }));

  return NextResponse.json({ comments: formatted });
}

export async function POST(
  request: Request,
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
    select: { id: true, isLocked: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.isLocked) {
    return NextResponse.json({ error: "Comments are locked on this post" }, { status: 403 });
  }

  let body: { content?: string; parentId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const content = body.content?.trim();
  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  if (content.length > 2000) {
    return NextResponse.json({ error: "Comment is too long (max 2000 characters)" }, { status: 400 });
  }

  const userIsAdmin = await isAdmin(userId);
  const status = userIsAdmin ? "APPROVED" : "PENDING_REVIEW";

  if (body.parentId) {
    const parentComment = await prisma.feedComment.findFirst({
      where: { id: body.parentId, postId, status: "APPROVED" },
    });
    if (!parentComment) {
      return NextResponse.json({ error: "Parent comment not found" }, { status: 404 });
    }
  }

  if (status === "APPROVED") {
    const [comment] = await prisma.$transaction([
      prisma.feedComment.create({
        data: {
          postId,
          authorId: userId,
          content,
          status,
          parentId: body.parentId || null,
        },
        include: {
          author: {
            select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
          },
        },
      }),
      prisma.feedPost.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({
      comment: {
        id: comment.id,
        content: comment.content,
        status: comment.status,
        likeCount: 0,
        isLiked: false,
        createdAt: comment.createdAt.toISOString(),
        author: {
          id: comment.author.id,
          name: comment.author.displayName || comment.author.name,
          avatarUrl: comment.author.avatarUrl,
          role: comment.author.role,
        },
        children: [],
      },
    }, { status: 201 });
  }

  const comment = await prisma.feedComment.create({
    data: {
      postId,
      authorId: userId,
      content,
      status,
      parentId: body.parentId || null,
    },
    include: {
      author: {
        select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
      },
    },
  });

  return NextResponse.json({
    comment: {
      id: comment.id,
      content: comment.content,
      status: comment.status,
      likeCount: 0,
      isLiked: false,
      createdAt: comment.createdAt.toISOString(),
      author: {
        id: comment.author.id,
        name: comment.author.displayName || comment.author.name,
        avatarUrl: comment.author.avatarUrl,
        role: comment.author.role,
      },
      children: [],
    },
  }, { status: 201 });
}
