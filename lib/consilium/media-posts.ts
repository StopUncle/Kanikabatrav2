import type { PrismaClient, FeedPostType } from "@prisma/client";
import { memberSafeName } from "@/lib/community/privacy";
import {
  getViewerGender,
  feedPostGenderWhere,
} from "@/lib/community/gender-filter";
import { tierForMember } from "@/components/consilium/badge-tiers";
import type { FeedPostData } from "@/components/consilium/FeedPost";

/**
 * Shared query for the media library shelves (Videos, Voice Notes):
 * newest-first posts of one type, gender-filtered like the feed,
 * shaped for the feed card components. Bounded at 50; add load-more
 * if either archive outgrows it.
 */
export async function getMediaPosts(
  prisma: PrismaClient,
  userId: string,
  type: Extract<FeedPostType, "VIDEO" | "VOICE_NOTE">,
): Promise<FeedPostData[]> {
  const viewerGender = await getViewerGender(userId);

  const rows = await prisma.feedPost.findMany({
    where: { type, ...feedPostGenderWhere(viewerGender) },
    orderBy: { createdAt: "desc" },
    take: 50,
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
      likes: { where: { userId }, select: { id: true } },
    },
  });

  return rows.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    type: post.type,
    voiceNoteUrl: post.voiceNoteUrl,
    videoUrl: post.videoUrl,
    videoPosterUrl: post.videoPosterUrl,
    videoDurationSeconds: post.videoDurationSeconds,
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
            activatedAt: post.author.communityMembership?.activatedAt ?? null,
          }),
        }
      : null,
  }));
}
