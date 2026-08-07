import { prisma } from "@/lib/prisma";

/**
 * The Studio inbox: everything waiting on Kanika, in one list.
 *
 * Two sources, one surface. Questions arrive through Ask Kanika and are
 * answered publicly (one answer serves every member). Direct messages are
 * private and answered one to one. She should not have to remember which
 * app each lives in, so they are merged and sorted by age.
 *
 * Anonymity is preserved exactly as /admin/questions preserves it: the
 * asker's name is never returned when `isAnonymous`, and revealing it
 * stays behind the separate /reveal endpoint rather than leaking into a
 * list view she scrolls past in public.
 */

export type InboxKind = "question" | "message";

export interface InboxItem {
  id: string;
  kind: InboxKind;
  /** The question text, or the latest message in the thread. */
  preview: string;
  /** Display name, already masked for anonymous askers. */
  from: string;
  createdAt: Date;
  /** Questions only: how many members upvoted it. Drives "answer this first". */
  upvotes: number;
  /** Messages only: how many member messages she has not read. */
  unread: number;
  /** True when this item is what she is here to deal with. */
  waiting: boolean;
}

export interface Inbox {
  items: InboxItem[];
  /** The number that becomes the home-screen badge. */
  waitingCount: number;
}

function displayName(
  user: { displayName: string | null; name: string | null } | null,
  isAnonymous: boolean,
): string {
  if (isAnonymous) return "Anonymous";
  return user?.displayName || user?.name || "Member";
}

/**
 * Everything waiting, newest-waiting first. Answered questions and quiet
 * threads are included below the fold so the app is not empty on a good
 * day, but only `waiting` items count toward the badge.
 */
export async function getInbox(limit = 60): Promise<Inbox> {
  const [questions, conversations] = await Promise.all([
    prisma.memberQuestion.findMany({
      where: { status: { in: ["PENDING", "ANSWERING", "ANSWERED"] } },
      orderBy: [{ status: "asc" }, { upvoteCount: "desc" }, { createdAt: "asc" }],
      take: limit,
      select: {
        id: true,
        content: true,
        isAnonymous: true,
        status: true,
        upvoteCount: true,
        createdAt: true,
        user: { select: { displayName: true, name: true } },
      },
    }),
    prisma.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      take: limit,
      select: {
        id: true,
        // The thread screen reuses /api/admin/messages/[memberId], which is
        // keyed by member rather than by conversation, so carry the member
        // id as this item's id and keep the two sides speaking one language.
        memberId: true,
        adminUnread: true,
        lastMessageAt: true,
        member: { select: { displayName: true, name: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, voiceNoteUrl: true, fromAdmin: true },
        },
      },
    }),
  ]);

  const questionItems: InboxItem[] = questions.map((q) => ({
    id: q.id,
    kind: "question" as const,
    preview: q.content,
    from: displayName(q.user, q.isAnonymous),
    createdAt: q.createdAt,
    upvotes: q.upvoteCount,
    unread: 0,
    // ANSWERING means she already started; it still needs finishing.
    waiting: q.status === "PENDING" || q.status === "ANSWERING",
  }));

  const messageItems: InboxItem[] = conversations.map((c) => {
    const last = c.messages[0];
    // A voice message is a TEXT row carrying a voiceNoteUrl and often no
    // body at all, so key off the url rather than the type or the preview
    // renders blank.
    const preview = !last
      ? "No messages yet"
      : last.voiceNoteUrl || !last.content
        ? "Voice note"
        : last.content;
    return {
      id: c.memberId,
      kind: "message" as const,
      preview,
      from: displayName(c.member, false),
      createdAt: c.lastMessageAt,
      upvotes: 0,
      unread: c.adminUnread,
      waiting: c.adminUnread > 0,
    };
  });

  const items = [...questionItems, ...messageItems].sort((a, b) => {
    // Waiting always outranks handled; within each, oldest first, because
    // the person who has waited longest is the one to answer next.
    if (a.waiting !== b.waiting) return a.waiting ? -1 : 1;
    if (a.waiting) return a.createdAt.getTime() - b.createdAt.getTime();
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return { items, waitingCount: items.filter((i) => i.waiting).length };
}

/**
 * The badge number on its own. Kept separate from getInbox so the badge
 * endpoint stays two cheap counts rather than loading the whole inbox.
 */
export async function getWaitingCount(): Promise<number> {
  const [questions, threads] = await Promise.all([
    prisma.memberQuestion.count({
      where: { status: { in: ["PENDING", "ANSWERING"] } },
    }),
    prisma.conversation.count({ where: { adminUnread: { gt: 0 } } }),
  ]);
  return questions + threads;
}
