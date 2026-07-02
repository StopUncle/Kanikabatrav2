import { NextResponse } from "next/server";
import { checkMembership } from "@/lib/community/membership";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { enforceRateLimit, limits } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/**
 * POST /api/consilium/feed/[postId]/poll-vote
 *
 * Cast (or change) the viewer's vote on a post's one-tap poll. One row
 * per (poll, user), enforced by the unique index; re-voting updates in
 * place. Returns the fresh counts so the client can reconcile its
 * optimistic state. resolveActiveUserId is ban-aware, so banned users
 * never reach here; messaging-restricted members CAN vote (a stance tap
 * is participation, not content).
 */

const bodySchema = z.object({
  optionIndex: z.number().int().min(0),
});

async function resolveUserId(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isMember } = await checkMembership(userId);
  if (!isMember) {
    return NextResponse.json({ error: "Not a member" }, { status: 403 });
  }

  // Same budget as comments (10/h). Generous for honest re-votes,
  // stops a compromised account from hammering the upsert.
  const rateLimited = await enforceRateLimit(
    limits.feedComment,
    `pollvote:user:${userId}`,
  );
  if (rateLimited) return rateLimited;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { postId } = await params;
  const poll = await prisma.feedPostPoll.findUnique({
    where: { postId },
    select: { id: true, options: true },
  });
  if (!poll) {
    return NextResponse.json({ error: "No poll on this post" }, { status: 404 });
  }
  const { optionIndex } = parsed.data;
  if (optionIndex >= poll.options.length) {
    return NextResponse.json({ error: "Invalid option" }, { status: 400 });
  }

  await prisma.feedPostPollVote.upsert({
    where: { pollId_userId: { pollId: poll.id, userId } },
    create: { pollId: poll.id, userId, optionIndex },
    update: { optionIndex },
  });

  const grouped = await prisma.feedPostPollVote.groupBy({
    by: ["optionIndex"],
    where: { pollId: poll.id },
    _count: { _all: true },
  });
  const counts = poll.options.map(
    (_, i) => grouped.find((g) => g.optionIndex === i)?._count._all ?? 0,
  );

  return NextResponse.json({
    counts,
    viewerVote: optionIndex,
    totalVotes: counts.reduce((a, b) => a + b, 0),
  });
}
