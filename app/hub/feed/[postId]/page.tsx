import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import {
  getViewerGender,
  feedPostGenderWhere,
} from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import { tierForMember } from "@/components/consilium/badge-tiers";
import { maskPactAuthor, pactNoteMeta } from "@/lib/pact/note";
import { formatPoll, pollInclude } from "@/lib/community/poll-format";
import AppFeedPost from "@/components/app-shell/feed/AppFeedPost";
import AppCommentSection from "@/components/app-shell/feed/AppCommentSection";
import { memberGate } from "@/lib/access/guard";

/**
 * One post with its comment thread, app skin. Same data assembly as the
 * old /consilium/feed/[postId] page; the render layer is the app's.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: { title: true },
  });

  return {
    title: post ? `${post.title} | Consilium` : "Post | Consilium",
    description: "A post from the Consilium.",
  };
}

export default async function AppPostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const userId = await requireServerAuth(`/app/feed/${postId}`);
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Feed",
  });
  if (gate) return gate;

  const viewerGender = await getViewerGender(userId);
  const post = await prisma.feedPost.findFirst({
    where: { id: postId, ...feedPostGenderWhere(viewerGender) },
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
      likes: {
        where: { userId },
        select: { id: true },
      },
      _count: {
        select: {
          comments: { where: { status: "APPROVED" } },
          likes: true,
        },
      },
      poll: pollInclude,
    },
  });

  if (!post) {
    notFound();
  }

  const formatted = {
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
    poll: formatPoll(post.poll, userId),
    pactWeek: pactNoteMeta(post.metadata)?.weekNumber ?? null,
    author: maskPactAuthor(
      post.metadata,
      post.author
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
    ),
  };

  return (
    <div className="px-5 pb-8 pt-6">
      <Link
        href="/app/feed"
        className="mb-4 inline-flex items-center gap-1.5 text-app-body text-[var(--app-dim)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Feed
      </Link>

      <AppFeedPost post={formatted} detail />

      <section className="mt-6">
        <h2
          className="mb-4 text-app-title font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Comments
        </h2>
        <AppCommentSection postId={post.id} isLocked={post.isLocked} />
      </section>
    </div>
  );
}
