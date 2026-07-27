import type { PrismaClient } from "@prisma/client";

/**
 * The Day-0 checklist: the three moves that predict whether a new
 * member is still here in week two. Shown on Today for the first
 * seven days of membership, gone forever once the window closes or
 * every box is ticked.
 *
 * 1. Sit the Arrival (the welcome video lives there when it exists).
 * 2. Take the Baseline Read (the before-picture).
 * 3. Say something in the room (any comment; the seeded intro prompt
 *    is the landing spot, but any comment counts. A pending-review
 *    comment ticks the box immediately; punishing the member for our
 *    moderation queue would read as a bug.)
 */

export const INTRO_PROMPT_MARKER = "day0-intro-prompt";

export interface Day0Checklist {
  arrivalDone: boolean;
  baselineDone: boolean;
  firstWordDone: boolean;
  /** Feed detail href for the intro prompt, or the feed itself. */
  introHref: string;
  doneCount: number;
}

export async function getDay0Checklist(
  prisma: PrismaClient,
  userId: string,
): Promise<Day0Checklist | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      createdAt: true,
      initiationAt: true,
      communityMembership: { select: { activatedAt: true } },
    },
  });
  if (!user) return null;

  const memberSince = user.communityMembership?.activatedAt ?? user.createdAt;
  const ageDays = (Date.now() - memberSince.getTime()) / 86_400_000;
  if (ageDays >= 7) return null;

  const [baselineCount, commentCount, introPrompt] = await Promise.all([
    prisma.baselineAttempt.count({ where: { userId } }),
    prisma.feedComment.count({
      where: { authorId: userId, status: { not: "REJECTED" } },
    }),
    prisma.feedPost.findFirst({
      where: { metadata: { path: ["marker"], equals: INTRO_PROMPT_MARKER } },
      select: { id: true },
    }),
  ]);

  const checklist: Day0Checklist = {
    arrivalDone: user.initiationAt !== null,
    baselineDone: baselineCount > 0,
    firstWordDone: commentCount > 0,
    introHref: introPrompt ? `/app/feed/${introPrompt.id}` : "/app/feed",
    doneCount: 0,
  };
  checklist.doneCount = [
    checklist.arrivalDone,
    checklist.baselineDone,
    checklist.firstWordDone,
  ].filter(Boolean).length;

  // All three done: the card has said everything it has to say.
  if (checklist.doneCount === 3) return null;

  return checklist;
}
