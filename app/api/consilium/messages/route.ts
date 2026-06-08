import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { enforceMessagingGuard } from "@/lib/community/messaging-guard";
import { triggerDirectMessage } from "@/lib/pusher/server";
import { checkDmCooldown } from "@/lib/messages/cooldown";
import { notifyAdminOfNewThread } from "@/lib/messages/notify";
import {
  DM_MESSAGE_EVENT,
  DM_MAX_LENGTH,
  serializeMessage,
} from "@/lib/messages/dm";

/**
 * GET /api/consilium/messages
 *
 * The member's single thread with Kanika. Opening it marks her messages read.
 * Members can now START a thread, so this also returns the send-cooldown state
 * for the composer; a null conversation just means "no thread yet", which the
 * UI renders as an invitation to write the first message.
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
      messages: { orderBy: { createdAt: "asc" }, take: 300 },
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

  const cooldown = await checkDmCooldown(userId);

  return NextResponse.json({
    conversation: conversation
      ? { id: conversation.id, status: conversation.status }
      : null,
    messages: (conversation?.messages ?? []).map(serializeMessage),
    cooldown: {
      allowed: cooldown.allowed,
      nextAvailableAt: cooldown.nextAvailableAt?.toISOString() ?? null,
    },
  });
}

/**
 * POST /api/consilium/messages  { content }
 *
 * A member sends Kanika a message. Members may now open a thread themselves
 * (first contact creates the conversation). A cooldown stops pile-on: one
 * unanswered message at a time, auto-unlocking 24h later or the moment Kanika
 * replies. Bumps her unread and reopens the thread if she'd marked it Done.
 */
export async function POST(req: NextRequest) {
  const userId = await resolveActiveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guard = await enforceMessagingGuard(userId);
  if (guard) return guard;

  const cooldown = await checkDmCooldown(userId);
  if (!cooldown.allowed) {
    return NextResponse.json(
      {
        error:
          "Your last message is still with Kanika. You can send another once she replies.",
        nextAvailableAt: cooldown.nextAvailableAt?.toISOString() ?? null,
      },
      { status: 429 },
    );
  }

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

  const existing = await prisma.conversation.findUnique({
    where: { memberId: userId },
    select: { id: true },
  });
  const isFirstContact = !existing;

  const { message, conversationId } = await prisma.$transaction(async (tx) => {
    const convo = await tx.conversation.upsert({
      where: { memberId: userId },
      create: {
        memberId: userId,
        status: "OPEN",
        adminUnread: 1,
        lastMessageAt: new Date(),
      },
      update: {
        adminUnread: { increment: 1 },
        lastMessageAt: new Date(),
        status: "OPEN",
      },
    });
    const created = await tx.directMessage.create({
      data: {
        conversationId: convo.id,
        fromAdmin: false,
        senderId: userId,
        content,
      },
    });
    return { message: created, conversationId: convo.id };
  });

  const dto = serializeMessage(message);
  await triggerDirectMessage(conversationId, DM_MESSAGE_EVENT, { message: dto });

  // First contact: email Kanika so a brand-new thread never sits unseen.
  if (isFirstContact) {
    const member = await prisma.user.findUnique({
      where: { id: userId },
      select: { displayName: true, name: true },
    });
    await notifyAdminOfNewThread(
      member?.displayName || member?.name || "A member",
      content,
    );
  }

  return NextResponse.json({ message: dto, conversationId });
}
