import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { trainingGate } from "@/lib/access/guard";
import { readPact } from "@/lib/pact/read";
import { pactNoteMeta } from "@/lib/pact/note";
import { PageShell } from "@/components/app-shell/ui";
import WeekClient from "@/components/app-shell/pact/WeekClient";
import ActivatePact from "@/components/app-shell/pact/ActivatePact";

export const metadata = {
  title: "This week | Consilium",
};

/** The live week. No pact means the door; the door means the sell. */
export default async function PactWeekPage() {
  const userId = await requireServerAuth("/app/pact/week");
  const wall = await trainingGate(userId, {
    trigger: "locked-nav",
    // The door, not this page: a walled viewer pressing Back on a wall
    // that links to itself goes nowhere.
    returnHref: "/app/pact",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);

  // Signed, not yet activated: the clock is theirs to start. The
  // challenge on `read` is the week-one preview.
  if (read.pact && read.awaitingActivation) {
    return (
      <PageShell>
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
          The Blood Pact
        </p>
        <h1
          className="mt-1 text-app-hero font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          It is signed.
        </h1>
        <ActivatePact challengeTitle={read.challenge?.title ?? null} />
      </PageShell>
    );
  }

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
