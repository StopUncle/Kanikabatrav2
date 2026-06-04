import { prisma } from "@/lib/prisma";

/**
 * Hard cap on how deep an Ask Kanika thread can go. The original question
 * is depth 0; each follow-up adds one. With a cap of 2 a thread can run
 * "question, answer, follow-up, answer, follow-up, answer" and then closes.
 * This is the line between an invited continuation and a private chat
 * (the failure mode that sank Cinderella's Revenge), so keep it small.
 */
export const MAX_FOLLOWUP_DEPTH = 2;

/**
 * Count how many ancestors a question has by walking the parent chain.
 * Returns 0 for a root question. The walk is bounded to MAX_FOLLOWUP_DEPTH + 1
 * steps so a malformed cycle can never spin forever.
 */
export async function followUpDepth(questionId: string): Promise<number> {
  let depth = 0;
  let currentId: string | null = questionId;
  for (let i = 0; i <= MAX_FOLLOWUP_DEPTH + 1 && currentId; i++) {
    const row: { parentQuestionId: string | null } | null =
      await prisma.memberQuestion.findUnique({
        where: { id: currentId },
        select: { parentQuestionId: true },
      });
    if (!row?.parentQuestionId) break;
    depth += 1;
    currentId = row.parentQuestionId;
  }
  return depth;
}

export type FollowUpCheck =
  | { ok: true }
  | { ok: false; status: number; error: string };

/**
 * Authoritative server-side check: may `userId` post a follow-up to
 * `parentQuestionId`? The member UI shows the reply box optimistically,
 * but this is the gate that actually decides. A follow-up is allowed only
 * when the parent is the member's own, has been ANSWERED, has no existing
 * follow-up yet (one reply per answer), and the thread is under the depth
 * cap.
 */
export async function checkFollowUpEligibility(
  userId: string,
  parentQuestionId: string,
): Promise<FollowUpCheck> {
  const parent = await prisma.memberQuestion.findUnique({
    where: { id: parentQuestionId },
    select: {
      userId: true,
      status: true,
      _count: { select: { followUps: true } },
    },
  });

  if (!parent) {
    return { ok: false, status: 404, error: "That question no longer exists." };
  }
  if (parent.userId !== userId) {
    return { ok: false, status: 403, error: "You can only reply to your own questions." };
  }
  if (parent.status !== "ANSWERED") {
    return {
      ok: false,
      status: 409,
      error: "You can reply once Kanika has answered.",
    };
  }
  if (parent._count.followUps > 0) {
    return {
      ok: false,
      status: 409,
      error: "You've already replied to this answer.",
    };
  }

  const depth = await followUpDepth(parentQuestionId);
  if (depth >= MAX_FOLLOWUP_DEPTH) {
    return {
      ok: false,
      status: 409,
      error: "This thread is complete. Start a new question instead.",
    };
  }

  return { ok: true };
}
