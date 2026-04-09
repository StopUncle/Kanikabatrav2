import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { getViewerGender, feedPostGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import FeedList from "@/components/inner-circle/FeedList";
import InnerCircleNav from "@/components/inner-circle/InnerCircleNav";
import OnboardingModal from "@/components/inner-circle/OnboardingModal";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "Feed — The Inner Circle | Kanika Batra",
  description: "Community feed for The Inner Circle members",
};

export default async function FeedPage() {
  const userId = await requireServerAuth("/inner-circle/feed");

  const { isMember, redirectUrl } = await checkMembership(userId);

  if (!isMember && redirectUrl) {
    redirect(redirectUrl);
  }

  if (!isMember) {
    redirect("/inner-circle");
  }

  // Check onboarding state — show the welcome modal on first visit
  // after activation. Null timestamp = hasn't dismissed yet.
  const viewerRecord = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboardingSeenAt: true },
  });
  const showOnboarding = viewerRecord?.onboardingSeenAt == null;

  // Gender-split: cron-automated posts (authorId null) and admin posts stay
  // visible to everyone. Member-authored welcome posts and the like only
  // appear for same-gender viewers.
  const viewerGender = await getViewerGender(userId);
  const genderWhere = feedPostGenderWhere(viewerGender);

  // Fetch PAGE_SIZE + 1 posts so we can detect whether there are more pages
  // to load without a second query. The extra post becomes the cursor.
  const PAGE_SIZE = 20;
  const rows = await prisma.feedPost.findMany({
    where: genderWhere,
    take: PAGE_SIZE + 1,
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
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
        where: { userId },
        select: { id: true },
      },
    },
  });

  const hasMore = rows.length > PAGE_SIZE;
  const posts = hasMore ? rows.slice(0, PAGE_SIZE) : rows;
  // Cursor for the client is the createdAt of the LAST (oldest) post shown;
  // /api/inner-circle/feed/posts returns rows with createdAt < cursor.
  const initialNextCursor = hasMore
    ? posts[posts.length - 1].createdAt.toISOString()
    : null;

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

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />
      {showOnboarding && <OnboardingModal />}

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <p className="text-accent-gold text-sm uppercase tracking-[0.3em] mb-4">Members Only</p>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-widest uppercase gradient-text-gold mb-4">
            The Feed
          </h1>
          <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-4" />
          <p className="text-text-gray">
            Posts, voice notes, and announcements from the inner circle.
          </p>
        </div>

        <InnerCircleNav active="feed" />

        {formatted.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-12 h-12 text-text-gray/50 mx-auto mb-4" />
            <h2 className="text-xl font-light text-text-gray mb-2">Nothing here yet</h2>
            <p className="text-text-gray/70 text-sm">
              New posts will appear here when Kanika shares something.
            </p>
          </div>
        ) : (
          <FeedList
            initialPosts={formatted}
            initialNextCursor={initialNextCursor}
          />
        )}
      </div>
    </div>
  );
}
