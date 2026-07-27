import { requireServerAuth } from "@/lib/auth/server-auth";
import { feedPostGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import { tierForMember } from "@/components/consilium/badge-tiers";
import { formatPoll, pollInclude } from "@/lib/community/poll-format";
import AppFeedList from "@/components/app-shell/feed/AppFeedList";

export const metadata = {
  title: "Feed | Consilium",
};

/**
 * The Feed tab: Kanika's room in the app skin. Same data assembly as the
 * old /consilium/feed page (gender filter, pinned-first with dedupe,
 * cursor pagination via the existing API); only the render layer is new.
 * Comment threads open /app/feed/[postId].
 */
export default async function AppFeedPage({
  searchParams,
}: {
  searchParams: Promise<{ claimed?: string }>;
}) {
  const userId = await requireServerAuth("/app/feed");
  const justClaimed = (await searchParams).claimed === "1";

  const viewerRecord = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true },
  });
  const genderWhere = feedPostGenderWhere(viewerRecord?.gender ?? null);

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
        select: { comments: { where: { status: "APPROVED" } } },
      },
      likes: { where: { userId }, select: { id: true } },
      poll: pollInclude,
    },
  });

  // Re-pinning an evergreen post leaves its older unpinned copy in the
  // feed; pinned posts sort first, so one forward pass drops the dupes.
  const pinnedTitles = new Set<string>();
  for (const r of rows) {
    if (r.isPinned) pinnedTitles.add(r.title.trim().toLowerCase());
  }
  const deduped = rows.filter(
    (r) => r.isPinned || !pinnedTitles.has(r.title.trim().toLowerCase()),
  );

  const hasMore = deduped.length > PAGE_SIZE;
  const posts = hasMore ? deduped.slice(0, PAGE_SIZE) : deduped;
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
    poll: formatPoll(post.poll, userId),
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

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Feed
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        Kanika&apos;s room. Posts, voice notes, and the talk under them.
      </p>

      {justClaimed && (
        // Shown once, straight off the magic-claim flow. A gift member
        // arrives with a session but no password, so without this they can
        // be locked out the moment they open the app on another device.
        // Non-dismissible on purpose: it disappears as soon as they
        // navigate anywhere else.
        <div className="mb-5 rounded-2xl border border-[var(--app-gold)]/35 bg-[var(--app-gold)]/[0.06] px-4 py-4">
          <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[var(--app-gold)]">
            Your gift is claimed
          </p>
          <p className="text-[13px] font-light leading-relaxed text-[var(--app-text)]">
            30 days start now. Check your email for a{" "}
            <strong className="font-normal text-[var(--app-gold)]">
              set-your-password
            </strong>{" "}
            link so you can log back in from any device later.
          </p>
        </div>
      )}

      {formatted.length === 0 ? (
        <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center text-[13px] text-[var(--app-muted)]">
          Nothing here yet. New posts land here the moment Kanika shares
          something.
        </p>
      ) : (
        <AppFeedList
          initialPosts={formatted}
          initialNextCursor={initialNextCursor}
        />
      )}
    </div>
  );
}
