import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";

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

  const conversation = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: { memberUnread: true },
  });

  return NextResponse.json({
    hasConversation: conversation !== null,
    unread: conversation?.memberUnread ?? 0,
  });
}
