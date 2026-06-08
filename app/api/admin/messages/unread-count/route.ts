import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * GET /api/admin/messages/unread-count
 *
 * Lightweight badge feed for the admin sidebar: how many conversations have
 * at least one unread member message. Polled on a slow interval; one indexed
 * count query, cheap to call often.
 */
export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const needsReply = await prisma.conversation.count({
    where: { adminUnread: { gt: 0 } },
  });

  return NextResponse.json({ needsReply });
}
