import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
import { readPact } from "@/lib/pact/read";
import { PageShell } from "@/components/app-shell/ui";
import WeekClient from "@/components/app-shell/pact/WeekClient";

export const metadata = {
  title: "This week | Consilium",
};

/** The live week. No pact means the door; the door means the sell. */
export default async function PactWeekPage() {
  const userId = await requireServerAuth("/app/pact/week");
  const wall = await memberGate(userId, {
    trigger: "locked-nav",
    returnHref: "/app/pact/week",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);
  if (!read.pact || !read.entry || !read.weekEndsAt) {
    redirect("/app/pact");
  }

  // Where the shared note lives on the feed, so the saved view can link
  // straight to the week's thread instead of the top of the feed.
  const feedPostId = read.entry.feedCommentId
    ? (
        await prisma.feedComment.findUnique({
          where: { id: read.entry.feedCommentId },
          select: { postId: true },
        })
      )?.postId ?? null
    : null;

  return (
    <PageShell>
      <WeekClient
        weekNumber={read.weekNumber}
        endsAtIso={read.weekEndsAt.toISOString()}
        preset={read.pact.preset}
        challenge={
          read.challenge
            ? {
                title: read.challenge.title,
                challenge: read.challenge.challenge,
                journalPrompt: read.challenge.journalPrompt,
                intensity: read.challenge.intensity,
                readingLabel: read.challenge.readingLabel,
                readingWhy: read.challenge.readingWhy,
                voiceNoteUrl: read.challenge.voiceNoteUrl,
              }
            : null
        }
        entry={{
          status: read.entry.status as "open" | "kept" | "scarred",
          journalBody: read.entry.journalBody,
          publicBody: read.entry.publicBody,
          shared: read.entry.sharedAt !== null,
          flagged: read.entry.flagged,
          aiReply: read.entry.aiReply,
          feedPostId,
        }}
      />
    </PageShell>
  );
}
