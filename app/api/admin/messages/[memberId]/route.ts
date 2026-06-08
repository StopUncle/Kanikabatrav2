import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { triggerDirectMessage } from "@/lib/pusher/server";
import { notifyMemberOfDirectMessage } from "@/lib/messages/notify";
import {
  DM_MESSAGE_EVENT,
  DM_MAX_LENGTH,
  serializeMessage,
} from "@/lib/messages/dm";

/**
 * GET /api/admin/messages/[memberId]
 *
 * The full thread with one member, plus that member's identity (admin views
 * legitimately show real names + email). Opening the thread marks it read:
 * adminUnread -> 0 and every unread member message gets a readAt stamp.
 *
 * Returns a member shell even when no conversation exists yet, so Kanika can
 * open the composer and send the first message (the POST creates the thread).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { memberId } = await params;

  const member = await prisma.user.findUnique({
    where: { id: memberId },
    select: {
      id: true,
      displayName: true,
      name: true,
      email: true,
      avatarUrl: true,
      isBanned: true,
      messagingRestricted: true,
      communityMembership: { select: { status: true } },
    },
  });
  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { memberId },
    select: {
      id: true,
      status: true,
      messages: {
        orderBy: { createdAt: "asc" },
        take: 300,
      },
    },
  });

  // Mark read on open: clear Kanika's unread and stamp the member's messages.
  if (conversation) {
    await prisma.$transaction([
      prisma.conversation.update({
        where: { id: conversation.id },
        data: { adminUnread: 0 },
      }),
      prisma.directMessage.updateMany({
        where: {
          conversationId: conversation.id,
          fromAdmin: false,
          readAt: null,
        },
        data: { readAt: new Date() },
      }),
    ]);
  }

  return NextResponse.json({
    member: {
      id: member.id,
      name: member.displayName || member.name || "Member",
      email: member.email,
      avatarUrl: member.avatarUrl,
      isBanned: member.isBanned,
      messagingRestricted: member.messagingRestricted,
      membershipStatus: member.communityMembership?.status ?? null,
    },
    conversation: conversation
      ? { id: conversation.id, status: conversation.status }
      : null,
    messages: (conversation?.messages ?? []).map(serializeMessage),
  });
}

/**
 * POST /api/admin/messages/[memberId]  { content }
 *
 * Kanika sends a message. Creates the conversation if it doesn't exist — this
 * is the "Kanika opens a thread" action, the only way a thread starts. Bumps
 * the member's unread, reopens the thread if it was Done/Archived, then fires
 * realtime + push + email out-of-band.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { memberId } = await params;

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

  const member = await prisma.user.findUnique({
    where: { id: memberId },
    select: {
      id: true,
      email: true,
      displayName: true,
      name: true,
      isTrainingBot: true,
    },
  });
  if (!member || member.isTrainingBot) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const { conversationId, message } = await prisma.$transaction(async (tx) => {
    const convo = await tx.conversation.upsert({
      where: { memberId },
      create: {
        memberId,
        status: "OPEN",
        memberUnread: 1,
        lastMessageAt: new Date(),
      },
      update: {
        memberUnread: { increment: 1 },
        lastMessageAt: new Date(),
        status: "OPEN",
      },
    });
    const created = await tx.directMessage.create({
      data: {
        conversationId: convo.id,
        fromAdmin: true,
        senderId: "admin",
        content,
      },
    });
    return { conversationId: convo.id, message: created };
  });

  const dto = serializeMessage(message);

  // Realtime to the open thread, then off-site notification. Both best-effort;
  // the message is already persisted.
  await triggerDirectMessage(conversationId, DM_MESSAGE_EVENT, { message: dto });
  await notifyMemberOfDirectMessage(
    {
      id: member.id,
      email: member.email,
      displayName: member.displayName,
      name: member.name,
    },
    content,
  );

  return NextResponse.json({ message: dto, conversationId });
}
