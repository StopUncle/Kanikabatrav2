import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import {
  getViewerGender,
  feedPostGenderWhere,
} from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";

async function resolveUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (token) {
    try { return verifyAccessToken(token).userId; } catch { /* fall through */ }
  }
  return await getAdminUserId();
}

/**
 * Cursor-paginated feed fetch. Used by the client-side "Load more" button
 * on /inner-circle/feed. The initial 20 posts come from the server-rendered
 * page; this route returns subsequent pages.
 *
 * Cursor is the ISO timestamp of the oldest post already visible. We fetch
 * posts with `createdAt < cursor` to get the next page. Pinned posts are
 * excluded from the cursor fetch since they're already at the top of the
 * initial render — otherwise they'd re-appear on every "load more".
 */
export async function GET(request: NextRequest) {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isMember } = await checkMembership(userId);
  if (!isMember) {
    return NextResponse.json({ error: "Not a member" }, { status: 403 });
  }

  const cursor = request.nextUrl.searchParams.get("cursor");
  if (!cursor) {
    return NextResponse.json({ error: "cursor required" }, { status: 400 });
  }

  const cursorDate = new Date(cursor);
  if (Number.isNaN(cursorDate.getTime())) {
    return NextResponse.json({ error: "invalid cursor" }, { status: 400 });
  }

  const viewerGender = await getViewerGender(userId);
  const genderWhere = feedPostGenderWhere(viewerGender);

  const PAGE_SIZE = 20;
  // Fetch PAGE_SIZE + 1 so we can detect hasMore without a second query.
  const rows = await prisma.feedPost.findMany({
    where: {
      ...genderWhere,
      isPinned: false,
      createdAt: { lt: cursorDate },
    },
    take: PAGE_SIZE + 1,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          avatarUrl: true,
          role: true,
        },
      },
      _count: {
        select: {
          comments: { where: { status: "APPROVED" } },
          likes: true,
        },
      },
      likes: {
        where: { userId },
        select: { id: true },
      },
    },
  });

  const hasMore = rows.length > PAGE_SIZE;
  const posts = hasMore ? rows.slice(0, PAGE_SIZE) : rows;

  const formatted = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    type: post.type,
    voiceNoteUrl: post.voiceNoteUrl,
    isPinned: post.isPinned,
    isLocked: post.isLocked,
    likeCount: post.likeCount,
    commentCount: post._count.comments,
    isLiked: post.likes.length > 0,
    createdAt: post.createdAt.toISOString(),
    author: post.author
      ? {
          id: post.author.id,
          name: post.author.displayName || post.author.name,
          avatarUrl: post.author.avatarUrl,
          role: post.author.role,
        }
      : null,
  }));

  const nextCursor = hasMore
    ? posts[posts.length - 1].createdAt.toISOString()
    : null;

  return NextResponse.json({ posts: formatted, nextCursor });
}
