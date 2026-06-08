import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { enforceMessagingGuard } from "@/lib/community/messaging-guard";
import { triggerDirectMessage } from "@/lib/pusher/server";
import {
  DM_MESSAGE_EVENT,
  DM_MAX_LENGTH,
  serializeMessage,
} from "@/lib/messages/dm";

/**
 * GET /api/consilium/messages
 *
 * The member's single thread with Kanika. Opening it marks Kanika's messages
 * read (memberUnread -> 0 + readAt stamp). Returns a null conversation when
 * Kanika has never messaged them — members can't start a thread, so the UI
 * shows a quiet empty state rather than a composer.
 */
export async function GET() {
  const userId = await resolveActiveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: {
      id: true,
      status: true,
      messages: {
        orderBy: { createdAt: "asc" },
        take: 300,
      },
    },
  });

  if (conversation) {
    await prisma.$transaction([
      prisma.conversation.update({
        where: { id: conversation.id },
        data: { memberUnread: 0 },
      }),
      prisma.directMessage.updateMany({
        where: {
          conversationId: conversation.id,
          fromAdmin: true,
          readAt: null,
        },
        data: { readAt: new Date() },
      }),
    ]);
  }

  return NextResponse.json({
    conversation: conversation
      ? { id: conversation.id, status: conversation.status }
      : null,
    messages: (conversation?.messages ?? []).map(serializeMessage),
  });
}

/**
 * POST /api/consilium/messages  { content }
 *
 * A member replies. Allowed ONLY when Kanika has already opened the thread —
 * this is the burnout guardrail: members reply, they don't cold-open. Bumps
 * Kanika's unread and reopens the thread if she'd marked it Done.
 */
export async function POST(req: NextRequest) {
  const userId = await resolveActiveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guard = await enforceMessagingGuard(userId);
  if (guard) return guard;

  let body: { content?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Message is empty" }, { status: 400 });
  }
  if (content.length > DM_MAX_LENGTH) {
    return NextResponse.json(
      { error: `Message too long (max ${DM_MAX_LENGTH} characters)` },
      { status: 400 },
    );
  }

  const conversation = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: { id: true },
  });
  if (!conversation) {
    return NextResponse.json(
      { error: "Kanika hasn't started a conversation with you yet." },
      { status: 403 },
    );
  }

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.directMessage.create({
      data: {
        conversationId: conversation.id,
        fromAdmin: false,
        senderId: userId,
        content,
      },
    });
    await tx.conversation.update({
      where: { id: conversation.id },
      data: {
        adminUnread: { increment: 1 },
        lastMessageAt: new Date(),
        status: "OPEN",
      },
    });
    return created;
  });

  const dto = serializeMessage(message);
  await triggerDirectMessage(conversation.id, DM_MESSAGE_EVENT, {
    message: dto,
  });

  return NextResponse.json({ message: dto });
}
