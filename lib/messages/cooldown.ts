import { prisma } from "@/lib/prisma";

export interface DmCooldownState {
  allowed: boolean;
  /** When the member can send again. Only set when allowed is false. */
  nextAvailableAt?: Date;
}

const WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Whether `userId` may send Kanika a direct message right now.
 *
 * Rule: a member may have at most ONE unanswered message in flight. After
 * sending, they're on cooldown until either Kanika replies (which clears it
 * instantly, so a real conversation can flow) or 24h passes (an auto-unlock
 * nudge if she hasn't responded). First contact is always allowed.
 *
 * This is the release valve on member-initiated DMs: it stops pile-on / spam
 * (the burnout failure mode) without freezing a live two-way thread the way a
 * flat 24h-per-message cap would. Server-enforced; the client countdown is
 * cosmetic.
 */
export async function checkDmCooldown(
  userId: string,
): Promise<DmCooldownState> {
  const convo = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { fromAdmin: true, createdAt: true },
      },
    },
  });

  const last = convo?.messages[0];
  // No thread yet, or Kanika spoke last: the member is free to send.
  if (!last || last.fromAdmin) return { allowed: true };

  // The member's own message is the latest. Locked until 24h after it, unless
  // Kanika replies first (which makes her message the latest and clears this).
  const elapsed = Date.now() - last.createdAt.getTime();
  if (elapsed >= WINDOW_MS) return { allowed: true };
  return {
    allowed: false,
    nextAvailableAt: new Date(last.createdAt.getTime() + WINDOW_MS),
  };
}
