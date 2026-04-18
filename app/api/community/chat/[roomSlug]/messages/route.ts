import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import { requireAuth } from "@/lib/auth/middleware";
import { pusherServer } from "@/lib/pusher/server";
import { memberSafeName } from "@/lib/community/privacy";
import { enforceMessagingGuard } from "@/lib/community/messaging-guard";
import { resolveActiveUserIdFromRequest } from "@/lib/auth/resolve-user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> },
) {
  try {
    const { roomSlug } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    // Ban-aware resolve: banned or revoked sessions return null so the
    // checkAccessTier call below treats them as anonymous and denies.
    const userId = await resolveActiveUserIdFromRequest(request);

    const room = await prisma.chatRoom.findUnique({
      where: { slug: roomSlug },
    });

    if (!room || !room.isActive) {
      return NextResponse.json(
        { error: "Chat room not found" },
        { status: 404 },
      );
    }

    const access = await checkAccessTier(userId, room.accessTier);
    if (!access.hasAccess) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    const messages = await prisma.chatMessage.findMany({
      where: { roomId: room.id },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            displayName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });

    const hasMore = messages.length > limit;
    const results = hasMore ? messages.slice(0, -1) : messages;
    const nextCursor = hasMore ? results[results.length - 1].id : null;

    return NextResponse.json({
      success: true,
      messages: results.reverse().map((msg) => ({
        id: msg.id,
        content: msg.content,
        type: msg.type,
        createdAt: msg.createdAt,
        author: {
          id: msg.author.id,
          name: memberSafeName(msg.author),
          avatar: msg.author.avatarUrl,
        },
      })),
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomSlug: string }> },
) {
  return requireAuth(request, async (_req, user) => {
    try {
      // Block banned users + messaging-restricted users before any work.
      const guardBlock = await enforceMessagingGuard(user.id);
      if (guardBlock) return guardBlock;

      const { roomSlug } = await params;
      const body = await request.json();
      const { content, type = "TEXT" } = body;

      const validTypes = ["TEXT", "IMAGE", "SYSTEM"];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          { error: "Invalid message type" },
          { status: 400 },
        );
      }

      if (!content || content.trim().length === 0) {
        return NextResponse.json(
          { error: "Message content is required" },
          { status: 400 },
        );
      }

      if (content.length > 2000) {
        return NextResponse.json(
          { error: "Message too long (max 2000 characters)" },
          { status: 400 },
        );
      }

      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug },
      });

      if (!room || !room.isActive) {
        return NextResponse.json(
          { error: "Chat room not found or inactive" },
          { status: 404 },
        );
      }

      const access = await checkAccessTier(user.id, room.accessTier);
      if (!access.hasAccess) {
        return NextResponse.json({ error: access.reason }, { status: 403 });
      }

      const membership = await prisma.chatMember.findUnique({
        where: {
          roomId_userId: { roomId: room.id, userId: user.id },
        },
      });

      if (!membership) {
        await prisma.chatMember.create({
          data: {
            roomId: room.id,
            userId: user.id,
            role: "MEMBER",
          },
        });
      }

      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          name: true,
          displayName: true,
          avatarUrl: true,
          role: true,
        },
      });

      const message = await prisma.chatMessage.create({
        data: {
          roomId: room.id,
          authorId: user.id,
          content: content.trim(),
          type: type as "TEXT" | "IMAGE" | "SYSTEM",
        },
      });

      const channelName =
        room.accessTier === "PREMIUM" || room.accessTier === "COACHING_CLIENT"
          ? `private-premium-${roomSlug}`
          : `presence-chat-${roomSlug}`;

      try {
        await pusherServer.trigger(channelName, "message", {
          id: message.id,
          content: message.content,
          type: message.type,
          createdAt: message.createdAt.toISOString(),
          authorId: user.id,
          authorName: memberSafeName(userData),
          authorAvatar: userData?.avatarUrl,
        });
      } catch (pusherError) {
        console.warn("Pusher broadcast failed:", pusherError);
      }

      return NextResponse.json(
        {
          success: true,
          message: {
            id: message.id,
            content: message.content,
            type: message.type,
            createdAt: message.createdAt,
            author: {
              id: user.id,
              name: memberSafeName(userData),
              avatar: userData?.avatarUrl,
            },
          },
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Send message error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }
  });
}
