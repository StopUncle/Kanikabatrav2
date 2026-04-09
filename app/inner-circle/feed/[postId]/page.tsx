import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import FeedPost from "@/components/inner-circle/FeedPost";
import FeedCommentSection from "@/components/inner-circle/FeedCommentSection";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
    select: { title: true },
  });

  return {
    title: post ? `${post.title} — The Inner Circle | Kanika Batra` : "Post — The Inner Circle",
    description: "Inner Circle community post",
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const userId = await requireServerAuth(`/inner-circle/feed/${postId}`);

  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember && redirectUrl) {
    redirect(redirectUrl);
  }

  if (!isMember) {
    redirect("/inner-circle");
  }

  const post = await prisma.feedPost.findUnique({
    where: { id: postId },
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
          name: post.author.displayName || post.author.name,
          avatarUrl: post.author.avatarUrl,
          role: post.author.role,
        }
      : null,
  };

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <p className="text-accent-gold text-sm uppercase tracking-[0.3em] mb-4">Members Only</p>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-widest uppercase gradient-text-gold mb-4">
            The Feed
          </h1>
          <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-4" />
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <a href="/inner-circle/feed" className="px-5 py-2 rounded-full text-sm bg-accent-gold/10 text-accent-gold border border-accent-gold/30">Feed</a>
          <a href="/inner-circle/voice-notes" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Voice Notes</a>
          <a href="/inner-circle/classroom" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Classroom</a>
        </div>

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
    </div>
  );
}
