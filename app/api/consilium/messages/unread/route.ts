import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";

/**
 * GET /api/consilium/messages/unread
 *
 * Drives the Messages pill in the member nav: does a thread exist, and how
 * many of Kanika's messages are unread. The pill stays hidden entirely until
 * a thread exists, so members never see a channel they can't start.
 */
export async function GET() {
  const userId = await resolveActiveUserId();
  if (!userId) {
    return NextResponse.json({ hasConversation: false, unread: 0 });
  }

  // Matches the thread itself. Soft-fails to the empty shape rather than
  // 403ing, because this drives a nav pill on shared chrome and a lapsed
  // member should see the pill disappear, not an error in the console.
  const access = await getAccess(userId);
  if (!canAccessMemberOnly(access)) {
    return NextResponse.json({ hasConversation: false, unread: 0 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: { memberUnread: true },
  });

  return NextResponse.json({
    hasConversation: conversation !== null,
    unread: conversation?.memberUnread ?? 0,
  });
}
