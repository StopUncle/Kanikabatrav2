import { NextRequest, NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { requireAdminSession } from "@/lib/admin/auth";
import { checkMembership } from "@/lib/community/membership";
import {
  getViewerGender,
  feedPostGenderWhere,
} from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import { tierForMember } from "@/components/consilium/badge-tiers";
import { z } from "zod";
import { logger } from "@/lib/logger";

async function resolveUserId(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

/**
 * Cursor-paginated feed fetch. Used by the client-side "Load more" button
 * on /consilium/feed. The initial 20 posts come from the server-rendered
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
          role: true,
          communityMembership: { select: { activatedAt: true } },
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
          name: memberSafeName(post.author),
          role: post.author.role,
          tier: tierForMember({
            role: post.author.role,
            activatedAt:
              post.author.communityMembership?.activatedAt ?? null,
          }),
        }
      : null,
  }));

  const nextCursor = hasMore
    ? posts[posts.length - 1].createdAt.toISOString()
    : null;

  return NextResponse.json({ posts: formatted, nextCursor });
}

// ---------------------------------------------------------------------------
// POST — admin creates a feed post (announcement / discussion prompt /
// voice-note post). Gated on the admin_session cookie. This was silently
// missing — /admin/posts and /admin/voice-notes both POSTed to a 404.
// ---------------------------------------------------------------------------

const CreatePostBody = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10_000),
  type: z.enum([
    "ANNOUNCEMENT",
    "DISCUSSION_PROMPT",
    "VOICE_NOTE",
    "AUTOMATED",
  ]),
  isPinned: z.boolean().optional().default(false),
  voiceNoteUrl: z.string().url().optional().nullable(),
});

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let payload: z.infer<typeof CreatePostBody>;
  try {
    const json = await request.json();
    payload = CreatePostBody.parse(json);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid post payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  // VOICE_NOTE posts must carry a voiceNoteUrl. Reject early so the feed
  // UI never renders a broken audio player.
  if (payload.type === "VOICE_NOTE" && !payload.voiceNoteUrl) {
    return NextResponse.json(
      { error: "VOICE_NOTE posts require a voiceNoteUrl" },
      { status: 400 },
    );
  }

  // Attribute to Kanika's admin user so the feed avatar + Queen badge
  // render correctly. getAdminUserId() pulls the first ADMIN user.
  const authorId = await getAdminUserId();

  try {
    const post = await prisma.feedPost.create({
      data: {
        title: payload.title,
        content: payload.content,
        type: payload.type,
        isPinned: payload.isPinned,
        voiceNoteUrl: payload.voiceNoteUrl ?? null,
        authorId: authorId ?? undefined,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        type: true,
      },
    });
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err) {
    logger.error("[admin/feed-create] failed", err as Error, {
      type: payload.type,
    });
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
