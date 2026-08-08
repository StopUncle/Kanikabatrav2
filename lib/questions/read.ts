import { prisma } from "@/lib/prisma";
import { checkAskCooldown, type CooldownState } from "./cooldown";
import { getQuestionSettings, type QuestionSettings } from "./settings";

/**
 * The reads behind Ask Kanika, in one place.
 *
 * The old skin drove the whole feature from a modal that fetched two API
 * routes on open, so the queries lived in the route handlers. The app
 * renders it as a page and wants the first paint to arrive with the data
 * already in it, which would have meant a second copy of the same
 * selects. Same pattern as `lib/pact/read.ts`: the routes and the page
 * call this, and there is one definition of what a question looks like on
 * the way out.
 *
 * Access is deliberately NOT checked here. Every caller already gates
 * (the routes with canAccessMemberOnly, the page with memberGate), and a
 * read helper that silently returned empty for the unentitled would make
 * a missing gate look like an empty queue.
 */

export interface QueueQuestion {
  id: string;
  content: string;
  upvoteCount: number;
  createdAt: Date;
  hasUpvoted: boolean;
  isMine: boolean;
  /** Null when asked anonymously. */
  author: string | null;
}

export interface MyQuestion {
  id: string;
  content: string;
  status: string;
  answeredAt: Date | null;
  createdAt: Date;
  answerPost: {
    id: string;
    title: string;
    type: string;
    voiceNoteUrl: string | null;
    videoUrl: string | null;
  } | null;
}

/** How long an answer stays "new" on the asker's screen. */
const UNREAD_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * The public queue: top voted PENDING questions.
 *
 * ANSWERED questions are deliberately absent. They surface on the
 * answering post itself, and the asker sees their own in `readMyQuestions`.
 */
export async function readAskQueue(userId: string): Promise<QueueQuestion[]> {
  const questions = await prisma.memberQuestion.findMany({
    where: { status: "PENDING" },
    orderBy: [{ upvoteCount: "desc" }, { createdAt: "desc" }],
    take: 50,
    select: {
      id: true,
      content: true,
      isAnonymous: true,
      upvoteCount: true,
      createdAt: true,
      userId: true,
      user: { select: { displayName: true, name: true } },
      upvotes: { where: { userId }, select: { id: true } },
    },
  });

  return questions.map((q) => ({
    id: q.id,
    content: q.content,
    upvoteCount: q.upvoteCount,
    createdAt: q.createdAt,
    hasUpvoted: q.upvotes.length > 0,
    isMine: q.userId === userId,
    // The author's identity never leaves the server for an anonymous ask.
    // `userId` is always stored, so the masking has to happen here rather
    // than being left to whoever renders it.
    author: q.isAnonymous
      ? null
      : (q.user.displayName ?? q.user.name ?? "Member"),
  }));
}

/** The asker's own history, newest first. */
export async function readMyQuestions(userId: string): Promise<MyQuestion[]> {
  return prisma.memberQuestion.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      content: true,
      status: true,
      answeredAt: true,
      createdAt: true,
      answerPost: {
        select: {
          id: true,
          title: true,
          type: true,
          voiceNoteUrl: true,
          videoUrl: true,
        },
      },
    },
  });
}

export function hasUnreadAnswer(mine: MyQuestion[]): boolean {
  const cutoff = new Date(Date.now() - UNREAD_WINDOW_MS);
  return mine.some(
    (q) => q.status === "ANSWERED" && q.answeredAt && q.answeredAt > cutoff,
  );
}

export interface AskState {
  cooldown: CooldownState;
  settings: QuestionSettings;
  mine: MyQuestion[];
  queue: QueueQuestion[];
  unread: boolean;
}

/** Everything the Ask page needs, in one round of parallel queries. */
export async function readAskState(userId: string): Promise<AskState> {
  const [cooldown, settings, mine, queue] = await Promise.all([
    checkAskCooldown(userId),
    getQuestionSettings(),
    readMyQuestions(userId),
    readAskQueue(userId),
  ]);
  return { cooldown, settings, mine, queue, unread: hasUnreadAnswer(mine) };
}
