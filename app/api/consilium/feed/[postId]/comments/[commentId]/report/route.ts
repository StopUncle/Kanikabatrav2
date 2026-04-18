import { NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { checkMembership } from "@/lib/community/membership";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

/**
 * Member action: flag a feed comment for admin review.
 *
 * Creates a CommentReport row. The (commentId, reporterId) unique
 * constraint means a member can only report a given comment once —
 * subsequent calls are a no-op (returns the existing report).
 *
 * Comments aren't auto-hidden on report — a single troll can't make
 * another member's comment vanish. Admin triages reports via
 * /admin/reports and decides what to do.
 */
async function resolveUserId(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ postId: string; commentId: string }>;
  },
) {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isMember } = await checkMembership(userId);
  if (!isMember) {
    return NextResponse.json({ error: "Not a member" }, { status: 403 });
  }

  // Rate-limit to prevent report-storming (shared bucket with posting
  // comments — aggressive by design; reports should be rare per user).
  const rateLimited = await enforceRateLimit(
    limits.feedComment,
    `report:${userId}`,
  );
  if (rateLimited) return rateLimited;

  const { commentId, postId } = await params;

  const comment = await prisma.feedComment.findFirst({
    where: { id: commentId, postId },
    select: { id: true, authorId: true },
  });
  if (!comment) {
    return NextResponse.json(
      { error: "Comment not found" },
      { status: 404 },
    );
  }

  // Don't let a user report their own comment — confusing UX and not
  // what the button is for.
  if (comment.authorId === userId) {
    return NextResponse.json(
      { error: "You can't report your own comment" },
      { status: 400 },
    );
  }

  let reason: string | null = null;
  try {
    const body = await request.json().catch(() => ({}));
    if (typeof body.reason === "string") {
      reason = body.reason.trim().slice(0, 500) || null;
    }
  } catch {
    /* reason is optional — ignore body parse errors */
  }

  // Upsert so the UI can always call this without caring whether
  // the member has already reported the comment before.
  await prisma.commentReport.upsert({
    where: {
      commentId_reporterId: { commentId, reporterId: userId },
    },
    update: reason ? { reason } : {},
    create: {
      commentId,
      reporterId: userId,
      reason,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
