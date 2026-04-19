import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

/**
 * Admin-only: list every feed post regardless of gender gating / membership
 * status. Used by /admin/posts to let Kanika moderate / delete / pin / lock
 * anything on the feed. Returns the 200 most recent posts.
 */
export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const posts = await prisma.feedPost.findMany({
    take: 200,
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: {
      author: {
        select: { id: true, name: true, role: true },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  return NextResponse.json({
    posts: posts.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      type: p.type,
      isPinned: p.isPinned,
      isLocked: p.isLocked,
      likeCount: p._count.likes,
      commentCount: p._count.comments,
      voiceNoteUrl: p.voiceNoteUrl,
      videoUrl: p.videoUrl,
      videoPosterUrl: p.videoPosterUrl,
      videoDurationSeconds: p.videoDurationSeconds,
      createdAt: p.createdAt.toISOString(),
      author: p.author,
    })),
  });
}
