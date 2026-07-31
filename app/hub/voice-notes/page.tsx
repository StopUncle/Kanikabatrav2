import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getMediaPosts } from "@/lib/consilium/media-posts";
import AppFeedPost from "@/components/app-shell/feed/AppFeedPost";
import { memberGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "Voice notes | Consilium",
};

/** The voice-note shelf in the app skin. */
export default async function AppVoiceNotesPage() {
  const userId = await requireServerAuth("/app/voice-notes");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Voice notes",
  });
  if (gate) return gate;
  const posts = await getMediaPosts(prisma, userId, "VOICE_NOTE");

  return (
    <PageShell>
      <PageHeader title="Voice notes" lede="Raw, unfiltered. Kanika, in your ear." />

      {posts.length === 0 ? (
        <EmptyState line="No voice notes yet. The first one is coming." />
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
