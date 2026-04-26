import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import { logger } from "@/lib/logger";

/**
 * POST /api/admin/questions/[id]/reveal
 *
 * Returns the asker's identity for an anonymous question. Separate
 * endpoint (not bundled into the list payload) so the action is an
 * explicit moderation step — easy to audit-log later if needed, and
 * Kanika can't accidentally see identities by glancing at the queue.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const u = await requireAdminSession();
  if (u) return u;

  const { id } = await params;

  const q = await prisma.memberQuestion.findUnique({
    where: { id },
    select: {
      isAnonymous: true,
      user: { select: { id: true, email: true, displayName: true, name: true } },
    },
  });
  if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });

  logger.info("[admin/questions] identity revealed", {
    questionId: id,
    targetUserId: q.user.id,
  });

  return NextResponse.json({
    userId: q.user.id,
    displayName: q.user.displayName ?? q.user.name ?? "Member",
    email: q.user.email,
    wasAnonymous: q.isAnonymous,
  });
}
