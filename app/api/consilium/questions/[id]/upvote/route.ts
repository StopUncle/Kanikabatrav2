import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";

// Same dual-session resolver as the submit endpoint. Member or admin
// can both upvote, admins testing the surface shouldn't 401.
async function resolveActor(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

/**
 * POST /api/consilium/questions/[id]/upvote
 *
 * Toggle the current member's upvote on a question. Idempotent: existing
 * upvote → removed; no upvote → added. The denormalized
 * MemberQuestion.upvoteCount is kept in sync inside the same transaction
 * so the "top voted" sort stays correct.
 *
 * Returns the new state ({ upvoted, upvoteCount }) so the client can
 * update without refetching the whole list.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await resolveActor();
  if (!userId) {
    return NextResponse.json(
      { error: "Your session expired, please refresh and log in again" },
      { status: 401 },
    );
  }

  const m = await checkMembership(userId);
  if (!m.isMember) return NextResponse.json({ error: "Members only" }, { status: 403 });

  const { id } = await params;

  // Confirm the question exists and is votable. PENDING + ANSWERING accept
  // votes; ANSWERED / REJECTED / HIDDEN do not (they're out of the queue).
  const q = await prisma.memberQuestion.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (q.status !== "PENDING" && q.status !== "ANSWERING") {
    return NextResponse.json({ error: "Question closed" }, { status: 409 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.questionUpvote.findUnique({
      where: { questionId_userId: { questionId: id, userId } },
      select: { id: true },
    });
    if (existing) {
      await tx.questionUpvote.delete({ where: { id: existing.id } });
      const updated = await tx.memberQuestion.update({
        where: { id },
        data: { upvoteCount: { decrement: 1 } },
        select: { upvoteCount: true },
      });
      return { upvoted: false, upvoteCount: updated.upvoteCount };
    } else {
      await tx.questionUpvote.create({ data: { questionId: id, userId } });
      const updated = await tx.memberQuestion.update({
        where: { id },
        data: { upvoteCount: { increment: 1 } },
        select: { upvoteCount: true },
      });
      return { upvoted: true, upvoteCount: updated.upvoteCount };
    }
  });

  return NextResponse.json(result);
}
