import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getMediaPosts } from "@/lib/consilium/media-posts";
import AppFeedPost from "@/components/app-shell/feed/AppFeedPost";

export const metadata = {
  title: "Videos | Consilium",
};

/** The video library in the app skin. */
export default async function AppVideosPage() {
  const userId = await requireServerAuth("/app/videos");
  const posts = await getMediaPosts(prisma, userId, "VIDEO");

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Videos
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        Every Kanika video, one shelf.
      </p>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center text-[13px] text-[var(--app-muted)]">
          No videos yet. The first one is coming.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <AppFeedPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
