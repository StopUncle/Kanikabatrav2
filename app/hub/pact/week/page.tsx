import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { trainingGate } from "@/lib/access/guard";
import { readPact } from "@/lib/pact/read";
import { pactNoteMeta } from "@/lib/pact/note";
import { PageShell } from "@/components/app-shell/ui";
import WeekClient from "@/components/app-shell/pact/WeekClient";

export const metadata = {
  title: "This week | Consilium",
};

/** The live week. No pact means the door; the door means the sell. */
export default async function PactWeekPage() {
  const userId = await requireServerAuth("/app/pact/week");
  const wall = await trainingGate(userId, {
    trigger: "locked-nav",
    returnHref: "/app/pact/week",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);
  if (!read.pact || !read.entry || !read.weekEndsAt) {
    redirect("/app/pact");
  }

  // The shared note's own post, when there is one: the saved view links
  // to it, and its metadata carries the member's anonymity choice.
  const notePost = read.entry.feedPostId
    ? await prisma.feedPost.findUnique({
        where: { id: read.entry.feedPostId },
        select: { id: true, metadata: true },
      })
    : null;
  const noteMeta = pactNoteMeta(notePost?.metadata);

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
          feedPostId: notePost?.id ?? null,
          sharedAnonymously: noteMeta?.anonymous ?? false,
        }}
      />
    </PageShell>
  );
}
