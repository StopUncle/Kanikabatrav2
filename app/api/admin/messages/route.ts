import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * GET /api/admin/messages?filter=needs_reply|open|done|all
 *
 * Kanika's 1-on-1 inbox. Lists conversations newest-activity-first with a
 * one-line preview of the last message and the unread count (member messages
 * she hasn't read yet). Admin views legitimately show real identities, so
 * displayName + email come back here (unlike the member-facing privacy gate).
 *
 *  - needs_reply  conversations with at least one unread member message. This
 *                 is the working queue — the fix for replies getting lost.
 *  - open / done  by status.
 *  - all          everything, archived included.
 *
 * Default is needs_reply so the inbox opens on "who is waiting on me".
 */
export async function GET(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const filter = req.nextUrl.searchParams.get("filter") || "needs_reply";

  const where =
    filter === "needs_reply"
      ? { adminUnread: { gt: 0 } }
      : filter === "open"
        ? { status: "OPEN" as const }
        : filter === "done"
          ? { status: "DONE" as const }
          : filter === "archived"
            ? { status: "ARCHIVED" as const }
            : {}; // all

  const conversations = await prisma.conversation.findMany({
    where,
    orderBy: { lastMessageAt: "desc" },
    take: 200,
    select: {
      id: true,
      status: true,
      adminUnread: true,
      lastMessageAt: true,
      member: {
        select: {
          id: true,
          displayName: true,
          name: true,
          avatarUrl: true,
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, fromAdmin: true, createdAt: true },
      },
    },
  });

  const [needsReply, open, done, all] = await Promise.all([
    prisma.conversation.count({ where: { adminUnread: { gt: 0 } } }),
    prisma.conversation.count({ where: { status: "OPEN" } }),
    prisma.conversation.count({ where: { status: "DONE" } }),
    prisma.conversation.count(),
  ]);

  return NextResponse.json({
    conversations: conversations.map((c) => {
      const last = c.messages[0];
      return {
        id: c.id,
        status: c.status,
        adminUnread: c.adminUnread,
        lastMessageAt: c.lastMessageAt.toISOString(),
        member: {
          id: c.member.id,
          name: c.member.displayName || c.member.name || "Member",
          avatarUrl: c.member.avatarUrl,
        },
        lastMessage: last
          ? {
              preview: last.content.slice(0, 140),
              fromAdmin: last.fromAdmin,
              createdAt: last.createdAt.toISOString(),
            }
          : null,
      };
    }),
    tabCounts: { needs_reply: needsReply, open, done, all },
  });
}
