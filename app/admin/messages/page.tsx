import { prisma } from "@/lib/prisma";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

/**
 * Admin Messages — Kanika's dedicated 1-on-1 inbox.
 *
 * Server-renders the needs-reply queue + tab counts so the inbox lights up
 * immediately; the client refetches on tab switches and opens a thread on
 * demand. A `?to=<memberId>` param (from the "Message privately" button on a
 * feed comment) deep-links straight into a thread with that member.
 */
export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;

  const [conversations, needsReply, open, done, all] = await Promise.all([
    prisma.conversation.findMany({
      where: { adminUnread: { gt: 0 } },
      orderBy: { lastMessageAt: "desc" },
      take: 200,
      select: {
        id: true,
        status: true,
        adminUnread: true,
        lastMessageAt: true,
        member: {
          select: { id: true, displayName: true, name: true, avatarUrl: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, fromAdmin: true, createdAt: true },
        },
      },
    }),
    prisma.conversation.count({ where: { adminUnread: { gt: 0 } } }),
    prisma.conversation.count({ where: { status: "OPEN" } }),
    prisma.conversation.count({ where: { status: "DONE" } }),
    prisma.conversation.count(),
  ]);

  return (
    <MessagesClient
      initialConversations={conversations.map((c) => {
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
      })}
      initialTabCounts={{ needs_reply: needsReply, open, done, all }}
      initialMemberId={to ?? null}
    />
  );
}
