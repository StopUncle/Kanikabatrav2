import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import {
  getViewerGender,
  feedPostGenderWhere,
} from "@/lib/community/gender-filter";
import FeedPost from "@/components/consilium/FeedPost";
import { Video } from "lucide-react";
import { tierForMember } from "@/components/consilium/badge-tiers";

export const metadata = {
  title: "Videos. The Consilium | Kanika Batra",
};

export default async function VideosPage() {
  const userId = await requireServerAuth("/consilium/videos");

  const viewerGender = await getViewerGender(userId);
  const genderWhere = feedPostGenderWhere(viewerGender);

  const videos = await prisma.feedPost.findMany({
    where: { type: "VIDEO", ...genderWhere },
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

  const posts = videos.map((post) => ({
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
            activatedAt:
              post.author.communityMembership?.activatedAt ?? null,
          }),
        }
      : null,
  }));

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          Videos
        </h1>
        <div className="w-12 h-px bg-warm-gold/40 mb-3" />
        <p className="text-text-gray text-sm">Watch every Kanika video in one place.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          <Video className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No videos yet. The first one is coming.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
