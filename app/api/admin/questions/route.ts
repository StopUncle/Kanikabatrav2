import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import type { QuestionStatus } from "@prisma/client";

const VALID_STATUSES: QuestionStatus[] = [
  "PENDING",
  "ANSWERING",
  "ANSWERED",
  "REJECTED",
  "HIDDEN",
];

/**
 * GET /api/admin/questions?status=PENDING
 *
 * Admin queue listing. Returns full question content, vote count, asker
 * `userId` (always present so reveal works) but NOT asker name in the
 * default payload. Kanika clicks "Show identity" to fetch the name
 * via the /reveal endpoint, which separates the moderation action from
 * casual queue browsing.
 *
 * Sorted by upvoteCount desc by default (top voted first), then by
 * recency. Caps at 100, the admin UI has its own pagination.
 */
export async function GET(req: NextRequest) {
  const u = await requireAdminSession();
  if (u) return u;

  const sp = req.nextUrl.searchParams;
  const statusParam = sp.get("status");
  const status: QuestionStatus | undefined =
    statusParam && (VALID_STATUSES as string[]).includes(statusParam)
      ? (statusParam as QuestionStatus)
      : undefined;

  const questions = await prisma.memberQuestion.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ upvoteCount: "desc" }, { createdAt: "desc" }],
    take: 100,
    select: {
      id: true,
      content: true,
      isAnonymous: true,
      status: true,
      upvoteCount: true,
      createdAt: true,
      answeredAt: true,
      rejectionReason: true,
      userId: true,
      answerPost: { select: { id: true, title: true, type: true } },
    },
  });

  const counts = await prisma.memberQuestion.groupBy({
    by: ["status"],
    _count: true,
  });
  const tabCounts: Record<string, number> = {
    PENDING: 0,
    ANSWERING: 0,
    ANSWERED: 0,
    REJECTED: 0,
    HIDDEN: 0,
  };
  for (const c of counts) tabCounts[c.status] = c._count;

  return NextResponse.json({ questions, tabCounts });
}
