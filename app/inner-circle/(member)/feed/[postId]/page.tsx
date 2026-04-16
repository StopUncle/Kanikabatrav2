import { notFound } from "next/navigation";
import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getViewerGender, feedPostGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import FeedPost from "@/components/inner-circle/FeedPost";
import FeedCommentSection from "@/components/inner-circle/FeedCommentSection";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: { title: true },
  });

  return {
    title: post ? `${post.title} — The Consilium | Kanika Batra` : "Post — The Consilium",
    description: "A post from the Consilium council.",
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const userId = await requireServerAuth(`/inner-circle/feed/${postId}`);

  const viewerGender = await getViewerGender(userId);
  const post = await prisma.feedPost.findFirst({
    where: { id: postId, ...feedPostGenderWhere(viewerGender) },
    include: {
      author: {
        select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
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
          avatarUrl: post.author.avatarUrl,
          role: post.author.role,
        }
      : null,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 lg:py-12">
      <Link
        href="/inner-circle/feed"
        className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-accent-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      <FeedPost post={formatted} isDetail />

      <div className="mt-8 bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl p-6">
        <h2 className="text-lg font-medium text-text-light mb-6">Comments</h2>
        <FeedCommentSection postId={post.id} isLocked={post.isLocked} />
      </div>
    </div>
  );
}
