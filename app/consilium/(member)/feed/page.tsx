import { requireServerAuth } from "@/lib/auth/server-auth";
import { getViewerGender, feedPostGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import FeedList from "@/components/consilium/FeedList";
import OnboardingModal from "@/components/consilium/OnboardingModal";
import FirstMovesChecklist from "@/components/consilium/FirstMovesChecklist";
import { MessageCircle, Mail } from "lucide-react";
import { tierForMember } from "@/components/consilium/badge-tiers";

export const metadata = {
  title: "Feed — The Consilium | Kanika Batra",
  description: "The council feed — insights, discussions, and voice notes from Kanika.",
};

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ claimed?: string }>;
}) {
  const userId = await requireServerAuth("/consilium/feed");
  const params = await searchParams;
  const justClaimed = params.claimed === "1";

  // Pull onboarding state + the signals that back the "Your first moves"
  // checklist in one round-trip. Counts instead of booleans so any future
  // "how many comments/scenarios completed" UI can reuse this shape.
  const viewerRecord = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingSeenAt: true,
      displayName: true,
      _count: {
        select: {
          quizResults: true,
          simulatorProgress: true,
          feedComments: true,
        },
      },
    },
  });
  const showOnboarding = viewerRecord?.onboardingSeenAt == null;
  const firstMovesSignals = {
    hasDisplayName:
      !!viewerRecord?.displayName && viewerRecord.displayName.trim() !== "",
    hasQuizResult: (viewerRecord?._count.quizResults ?? 0) > 0,
    hasSimulatorProgress:
      (viewerRecord?._count.simulatorProgress ?? 0) > 0,
    hasComment: (viewerRecord?._count.feedComments ?? 0) > 0,
  };

  const viewerGender = await getViewerGender(userId);
  const genderWhere = feedPostGenderWhere(viewerGender);

  const PAGE_SIZE = 20;
  const rows = await prisma.feedPost.findMany({
    where: genderWhere,
    take: PAGE_SIZE + 1,
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
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
  const initialNextCursor = hasMore
    ? posts[posts.length - 1].createdAt.toISOString()
    : null;

  const formatted = posts.map((post) => ({
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
    <>
      {showOnboarding && <OnboardingModal />}

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        {justClaimed && (
          // One-off banner shown only when the user just landed via the
          // magic-claim flow (?claimed=1). Tells fresh gift-members to
          // check their inbox for the password-set link so they don't
          // get locked out from a different device later. Non-dismissible
          // on purpose — it goes away the moment they navigate to any
          // other member page or reload /consilium/feed without the
          // query param.
          <div className="mb-6 rounded-xl border border-warm-gold/40 bg-warm-gold/[0.05] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-warm-gold/15 border border-warm-gold/30 flex items-center justify-center">
                <Mail className="w-4 h-4 text-warm-gold" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em] mb-1">
                  Your gift is claimed
                </p>
                <p className="text-text-light text-sm font-light leading-relaxed">
                  30 days start now. Check your email for a{" "}
                  <strong className="text-warm-gold">set-your-password</strong>{" "}
                  link so you can log back in from any device later.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
            The Feed
          </h1>
          <div className="w-12 h-px bg-warm-gold/40 mb-3" />
          <p className="text-text-gray text-sm">
            Posts, insights, and discussions from the council.
          </p>
        </div>

        <FirstMovesChecklist signals={firstMovesSignals} />

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
    </>
  );
}
