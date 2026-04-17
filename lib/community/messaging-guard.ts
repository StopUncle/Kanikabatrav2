import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Shared guard for "user is posting content" endpoints (feed comments,
 * forum posts, forum replies, chat messages, chat room joins).
 *
 * Two distinct states block posting:
 *   - `isBanned`  — hard ban. User can't read or post. Surfaces banReason
 *                   to the user (admins often leave a short reason).
 *   - `messagingRestricted` — soft mute. User can still read + browse the
 *                   community, but can't post anything new. Toggled per-user
 *                   from /admin/members.
 *
 * Returns a 403 NextResponse when the caller is blocked, or null when they
 * are allowed to proceed. The null-return pattern matches
 * `enforceRateLimit` so callers can use the same `if (result) return result`
 * short-circuit.
 */
export async function enforceMessagingGuard(
  userId: string,
): Promise<NextResponse | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      isBanned: true,
      banReason: true,
      messagingRestricted: true,
    },
  });

  if (user?.isBanned) {
    return NextResponse.json(
      {
        error:
          user.banReason ||
          "Your account has been suspended.",
      },
      { status: 403 },
    );
  }

  if (user?.messagingRestricted) {
    return NextResponse.json(
      {
        error:
          "Your messaging has been restricted. Contact Kanika if you think this is a mistake.",
      },
      { status: 403 },
    );
  }

  return null;
}
