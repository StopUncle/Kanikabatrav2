import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getMediaPosts } from "@/lib/consilium/media-posts";
import AppFeedPost from "@/components/app-shell/feed/AppFeedPost";
import { memberGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "Videos | Consilium",
};

/** The video library in the app skin. */
export default async function AppVideosPage() {
  const userId = await requireServerAuth("/app/videos");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Videos",
  });
  if (gate) return gate;
  const posts = await getMediaPosts(prisma, userId, "VIDEO");

  return (
    <PageShell>
      <PageHeader title="Videos" lede="Every Kanika video, one shelf." />

      {posts.length === 0 ? (
        <EmptyState line="No videos yet. The first one is coming." />
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <AppFeedPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
