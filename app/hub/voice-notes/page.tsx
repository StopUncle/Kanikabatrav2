import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getMediaPosts } from "@/lib/consilium/media-posts";
import AppFeedPost from "@/components/app-shell/feed/AppFeedPost";

export const metadata = {
  title: "Voice notes | Consilium",
};

/** The voice-note shelf in the app skin. */
export default async function AppVoiceNotesPage() {
  const userId = await requireServerAuth("/app/voice-notes");
  const posts = await getMediaPosts(prisma, userId, "VOICE_NOTE");

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Voice notes
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        Raw, unfiltered. Kanika, in your ear.
      </p>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center text-[13px] text-[var(--app-muted)]">
          No voice notes yet. The first one is coming.
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
