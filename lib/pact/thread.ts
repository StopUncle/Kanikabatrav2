import type { PrismaClient } from "@prisma/client";

/**
 * One feed thread per pact week, mirroring lib/program/thread.ts. Members
 * are dripped from their own signing date, so nobody hits week 3 on the
 * same calendar day; the thread is the shared room they all arrive in
 * whenever they get there. Shared notes from the week screen land here as
 * comments, which is what puts them on the feed.
 *
 * Created lazily on the first share of that week. The thread does not name
 * any preset's challenge: three tracks share one room, and the notes are
 * the content.
 */

export function pactWeekThreadMarker(weekNumber: number): string {
  return `pact-week-${weekNumber}`;
}

/**
 * Ensure the thread exists and return its post id, or null when there is
 * no admin to author it (an authorless post in Kanika's room is worse
 * than no post). Idempotent through the metadata marker.
 */
export async function ensurePactWeekThread(
  db: PrismaClient,
  weekNumber: number,
): Promise<string | null> {
  const marker = pactWeekThreadMarker(weekNumber);

  const existing = await db.feedPost.findFirst({
    where: { metadata: { path: ["marker"], equals: marker } },
    select: { id: true },
  });
  if (existing) return existing.id;

  const admin = await db.user.findFirst({
    where: { role: "ADMIN", isBot: false },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  if (!admin) return null;

  const post = await db.feedPost.create({
    data: {
      authorId: admin.id,
      type: "DISCUSSION_PROMPT",
      title: `The Pact, week ${weekNumber}`,
      content: [
        `This is the room for week ${weekNumber} of the Pact.`,
        "",
        "The notes below were shared on purpose, from the week screen. Journals stay private; this is only what people chose to say out loud.",
      ].join("\n"),
      metadata: { marker, weekNumber },
    },
    select: { id: true },
  });

  return post.id;
}
