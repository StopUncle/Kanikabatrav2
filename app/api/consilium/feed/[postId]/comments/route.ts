import { NextResponse } from "next/server";
import { checkMembership } from "@/lib/community/membership";
import { isAdmin } from "@/lib/community/membership";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getViewerGender, authorGenderWhere } from "@/lib/community/gender-filter";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { enforceMessagingGuard } from "@/lib/community/messaging-guard";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import { tierForMember } from "@/components/consilium/badge-tiers";

type CommentAuthorRow = {
  id: string;
  name: string | null;
  displayName: string | null;
  role: string;
  communityMembership: { activatedAt: Date | null } | null;
};

function formatAuthor(a: CommentAuthorRow) {
  return {
    id: a.id,
    name: memberSafeName(a),
    role: a.role,
    tier: tierForMember({
      role: a.role,
      activatedAt: a.communityMembership?.activatedAt ?? null,
    }),
  };
}

const authorSelect = {
  id: true,
  name: true,
  displayName: true,
  role: true,
  communityMembership: { select: { activatedAt: true } },
} as const;

/**
 * Resolve the caller's userId from either the member accessToken or
 * the admin_session cookie. Returns null for missing / invalid /
 * BANNED sessions (the shared resolveActiveUserId enforces isBanned +
 * tokenVersion; admin preview falls back last).
 */
async function resolveUserId(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const userId = await resolveUserId();
  if (!userId) {
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
      author: { select: authorSelect },
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
          author: { select: authorSelect },
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
    author: formatAuthor(comment.author),
    children: comment.children.map((child) => ({
      id: child.id,
      content: child.content,
      status: child.status,
      likeCount: child.likeCount,
      isLiked: child.likes.length > 0,
      createdAt: child.createdAt.toISOString(),
      author: formatAuthor(child.author),
      children: [],
    })),
  }));

  return NextResponse.json({ comments: formatted });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isMember } = await checkMembership(userId);
  if (!isMember) {
    return NextResponse.json({ error: "Not a member" }, { status: 403 });
  }

  // Block banned users + messaging-restricted users. See
  // lib/community/messaging-guard.ts for the two states and why we check
  // both. Same guard is used by chat, forum, and reply endpoints so
  // mutes/bans take effect everywhere.
  const guardBlock = await enforceMessagingGuard(userId);
  if (guardBlock) return guardBlock;

  // Rate-limit by user (10 comments/hour) to prevent a compromised
  // account from spam-flooding every post.
  const rateLimited = await enforceRateLimit(limits.feedComment, `user:${userId}`);
  if (rateLimited) return rateLimited;

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

  // Depth flattening: the feed UI only renders 2 levels (top-level
  // comment + one tier of children). If the caller tries to reply to
  // a reply, silently re-point the new comment to the grandparent so
  // it shows up in the thread instead of vanishing into a depth the
  // UI never renders. Also validates the parent exists + is approved.
  let effectiveParentId: string | null = null;
  if (body.parentId) {
    const parentComment = await prisma.feedComment.findFirst({
      where: { id: body.parentId, postId, status: "APPROVED" },
      select: { id: true, parentId: true },
    });
    if (!parentComment) {
      return NextResponse.json({ error: "Parent comment not found" }, { status: 404 });
    }
    effectiveParentId = parentComment.parentId ?? parentComment.id;
  }

  if (status === "APPROVED") {
    const [comment] = await prisma.$transaction([
      prisma.feedComment.create({
        data: {
          postId,
          authorId: userId,
          content,
          status,
          parentId: effectiveParentId,
        },
        include: {
          author: { select: authorSelect },
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
        author: formatAuthor(comment.author),
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
      parentId: effectiveParentId,
    },
    include: {
      author: { select: authorSelect },
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
      author: formatAuthor(comment.author),
      children: [],
    },
  }, { status: 201 });
}
