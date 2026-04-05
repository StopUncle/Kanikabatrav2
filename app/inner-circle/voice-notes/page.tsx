import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import FeedPost from "@/components/inner-circle/FeedPost";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Mic } from "lucide-react";

export const metadata = {
  title: "Voice Notes — The Inner Circle | Kanika Batra",
};

export default async function VoiceNotesPage() {
  const userId = await requireServerAuth("/inner-circle/voice-notes");

  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember && redirectUrl) {
    redirect(redirectUrl);
  }

  if (!isMember) {
    redirect("/inner-circle");
  }

  const voiceNotes = await prisma.feedPost.findMany({
    where: { type: "VOICE_NOTE" },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
      },
      _count: {
        select: {
          comments: { where: { status: "APPROVED" } },
          likes: true,
        },
      },
      likes: {
        where: { userId: userId },
        select: { id: true },
      },
    },
  });

  const posts = voiceNotes.map((post) => ({
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

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-10">
          <span className="text-accent-gold text-xs tracking-[0.3em] uppercase font-medium">The Inner Circle</span>
          <h1 className="text-4xl font-extralight tracking-wider uppercase mt-3 mb-2">
            <span className="gradient-text-gold">Voice Notes</span>
          </h1>
          <div className="w-16 h-px bg-accent-gold/30 mx-auto mt-4 mb-4" />
          <p className="text-text-gray">Raw, unfiltered. Straight from Kanika.</p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <a href="/inner-circle/feed" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Feed</a>
          <a href="/inner-circle/voice-notes" className="px-5 py-2 rounded-full text-sm bg-accent-gold/10 text-accent-gold border border-accent-gold/30">Voice Notes</a>
          <a href="/inner-circle/classroom" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Classroom</a>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-text-gray">
            <Mic className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No voice notes yet. The first one is coming.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
