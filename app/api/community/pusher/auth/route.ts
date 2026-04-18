import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher/server";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import { memberSafeName } from "@/lib/community/privacy";
import { resolveActiveUserIdFromRequest } from "@/lib/auth/resolve-user";

/**
 * Pusher channel authentication.
 *
 * Pusher opens long-lived real-time connections. Without a ban-aware gate,
 * a banned user with a still-cryptographically-valid JWT can remain
 * subscribed to presence and private channels indefinitely. Using the
 * unified resolveActiveUserIdFromRequest closes that: banned users and
 * revoked tokenVersions return null and Pusher rejects the subscription.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await resolveActiveUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const socketId = formData.get("socket_id") as string;
    const channelName = formData.get("channel_name") as string;

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: "Missing socket_id or channel_name" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        displayName: true,
        avatarUrl: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (channelName.startsWith("private-premium-")) {
      const roomSlug = channelName.replace("private-premium-", "");
      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug },
      });

      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      const access = await checkAccessTier(userId, room.accessTier);
      if (!access.hasAccess) {
        return NextResponse.json(
          { error: "Access denied to premium room" },
          { status: 403 },
        );
      }

      const authResponse = pusherServer.authorizeChannel(socketId, channelName);
      return NextResponse.json(authResponse);
    }

    if (channelName.startsWith("presence-chat-")) {
      const roomSlug = channelName.replace("presence-chat-", "");
      const room = await prisma.chatRoom.findUnique({
        where: { slug: roomSlug },
      });

      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      const access = await checkAccessTier(userId, room.accessTier);
      if (!access.hasAccess) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }

      const presenceData = {
        user_id: user.id,
        user_info: {
          name: memberSafeName(user),
          avatar: user.avatarUrl,
        },
      };

      const authResponse = pusherServer.authorizeChannel(
        socketId,
        channelName,
        presenceData,
      );
      return NextResponse.json(authResponse);
    }

    if (channelName.startsWith("private-user-")) {
      const targetUserId = channelName.replace("private-user-", "");

      if (targetUserId !== userId) {
        return NextResponse.json(
          { error: "Cannot subscribe to other user channels" },
          { status: 403 },
        );
      }

      const authResponse = pusherServer.authorizeChannel(socketId, channelName);
      return NextResponse.json(authResponse);
    }

    return NextResponse.json(
      { error: "Unknown channel type" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Pusher auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
