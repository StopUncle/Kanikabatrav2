import type { PrismaClient } from "@prisma/client";

/**
 * One discussion thread per week of the transformation.
 *
 * Members are dripped from their own join date, so nobody is doing week 3
 * on the same calendar day as anybody else. The thread is what buys back
 * the shared moment the per-member drip costs: everyone doing week 3 talks
 * in the same place, whenever they get there.
 *
 * Created lazily, the first time any member unlocks the week, and only for
 * a published week. Kanika publishing a week is the act that authorises its
 * thread; nothing here posts before she does.
 */

export function weekThreadMarker(weekNumber: number): string {
  return `program-week-${weekNumber}`;
}

/**
 * Ensure the thread exists. Returns the post id, or null when there is no
 * admin to author it (the same refusal the intro-prompt seed makes: an
 * authorless post in Kanika's room is worse than no post).
 *
 * Idempotent through the metadata marker, which is also how the intro
 * prompt and the rest of the seeded feed content dedupe.
 */
export async function ensureWeekThread(
  db: PrismaClient,
  weekNumber: number,
): Promise<string | null> {
  const marker = weekThreadMarker(weekNumber);

  const existing = await db.feedPost.findFirst({
    where: { metadata: { path: ["marker"], equals: marker } },
    select: { id: true },
  });
  if (existing) return existing.id;

  const week = await db.transformationWeek.findUnique({
    where: { weekNumber },
    select: { title: true, challenge: true, isPublished: true },
  });
  if (!week?.isPublished) return null;

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
      title: `Week ${weekNumber}: ${week.title}`,
      content: [
        `This is the room for week ${weekNumber}.`,
        "",
        "The challenge:",
        "",
        week.challenge,
        "",
        "Post what happened when you did it. Not what you learned, what happened. The awkward part is the useful part.",
      ].join("\n"),
      metadata: { marker, weekNumber },
    },
    select: { id: true },
  });

  return post.id;
}
