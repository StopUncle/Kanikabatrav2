import type { PrismaClient } from "@prisma/client";

/**
 * The Day-0 checklist: the three moves that predict whether a new
 * account is still here in week two. Shown on Today for the first
 * seven days, gone forever once the window closes or every box is
 * ticked. The items depend on the tier, because a box a free account
 * cannot tick is not a checklist, it is a wall with a checkbox on it.
 *
 * Members: sit the Arrival, take the Baseline Read, say something in
 * the room (any comment counts; a pending-review comment ticks the box
 * immediately, punishing the member for our moderation queue would
 * read as a bug).
 *
 * Free: sit the Arrival, run the first scenario, run the Speed Drill.
 * The drill over the Tell because a Tell can be editorially absent on
 * a given day.
 */

export const INTRO_PROMPT_MARKER = "day0-intro-prompt";

export interface Day0Item {
  key: string;
  done: boolean;
  href: string;
  title: string;
  sub: string;
}

export interface Day0Checklist {
  items: Day0Item[];
  doneCount: number;
}

export async function getDay0Checklist(
  prisma: PrismaClient,
  userId: string,
  opts: { isMember: boolean },
): Promise<Day0Checklist | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      createdAt: true,
      initiationAt: true,
      arrivalAt: true,
      gender: true,
      communityMembership: { select: { activatedAt: true } },
    },
  });
  if (!user) return null;

  const memberSince = opts.isMember
    ? (user.communityMembership?.activatedAt ?? user.createdAt)
    : user.createdAt;
  const ageDays = (Date.now() - memberSince.getTime()) / 86_400_000;
  if (ageDays >= 7) return null;

  // Members who initiated before arrivalAt existed keep their tick.
  const arrivalDone = user.arrivalAt !== null || user.initiationAt !== null;

  let items: Day0Item[];

  if (opts.isMember) {
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
    items = [
      {
        key: "arrival",
        done: arrivalDone,
        href: "/app/welcome",
        title: "Sit the Arrival",
        sub: "Two minutes. How this place works.",
      },
      {
        key: "baseline",
        done: baselineCount > 0,
        href: "/app/measure/baseline",
        title: "Take the Baseline Read",
        sub: "Your before-picture. You will want it later.",
      },
      {
        key: "firstWord",
        done: commentCount > 0,
        href: introPrompt ? `/app/feed/${introPrompt.id}` : "/app/feed",
        title: "Say something in the room",
        sub: "The tactic you fell for once. Never again.",
      },
    ];
  } else {
    const [scenarioCount, drillCount] = await Promise.all([
      prisma.simulatorProgress.count({
        where: { userId, completedAt: { not: null } },
      }),
      prisma.gameSession.count({
        where: { userId, gameKey: "speed-drill" },
      }),
    ]);
    const firstScenarioHref =
      user.gender === "MALE"
        ? "/app/train/d1-frame-challenge"
        : "/app/train/mission-1-1";
    items = [
      {
        key: "arrival",
        done: arrivalDone,
        href: "/app/welcome",
        title: "Sit the Arrival",
        sub: "Two minutes. How this place works.",
      },
      {
        key: "firstScenario",
        done: scenarioCount > 0,
        href: firstScenarioHref,
        title: "Run your first scenario",
        sub: "Ten minutes inside a conversation you will recognise.",
      },
      {
        key: "firstDrill",
        done: drillCount > 0,
        href: "/app/play/drill",
        title: "Run the Speed Drill",
        sub: "Sixty seconds. Call each line as it comes.",
      },
    ];
  }

  const doneCount = items.filter((i) => i.done).length;
  if (doneCount === items.length) return null;

  return { items, doneCount };
}
