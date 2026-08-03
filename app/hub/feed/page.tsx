import { requireServerAuth } from "@/lib/auth/server-auth";
import { feedPostGenderWhere } from "@/lib/community/gender-filter";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";
import { tierForMember } from "@/components/consilium/badge-tiers";
import { maskPactAuthor, pactNoteMeta } from "@/lib/pact/note";
import { formatPoll, pollInclude } from "@/lib/community/poll-format";
import AppFeedList from "@/components/app-shell/feed/AppFeedList";
import { memberGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "Feed | Consilium",
};

/**
 * The Feed tab: Kanika's room in the app skin. Same data assembly as the
 * old /consilium/feed page (gender filter, pinned-first with dedupe,
 * cursor pagination via the existing API); only the render layer is new.
 * Comment threads open /app/feed/[postId].
 */
export default async function AppFeedPage() {
  const userId = await requireServerAuth("/app/feed");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Feed",
  });
  if (gate) return gate;

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
  }));

  return (
    <PageShell>
      <PageHeader
        title="Feed"
        lede="Kanika's room. Posts, voice notes, and the talk under them."
      />

      {formatted.length === 0 ? (
        <EmptyState
          line="Nothing here yet."
          hint="New posts land here the moment Kanika shares something."
        />
      ) : (
        <AppFeedList
          initialPosts={formatted}
          initialNextCursor={initialNextCursor}
        />
      )}
    </PageShell>
  );
}
