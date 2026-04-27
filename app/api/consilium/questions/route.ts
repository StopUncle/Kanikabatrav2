import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { checkAskCooldown } from "@/lib/questions/cooldown";
import { getQuestionSettings } from "@/lib/questions/settings";
import { logger } from "@/lib/logger";

// Resolve the acting user across BOTH session types:
//   - member session (accessToken cookie) — normal member submitting a question
//   - admin session (admin_session cookie) — Kanika testing or seeding
// Mirrors the pattern in /api/consilium/feed/posts so admins aren't
// 401-walled out of their own surfaces. Returns null if neither session
// is valid (anonymous visitor or expired member token).
async function resolveActor(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

/**
 * GET /api/consilium/questions
 *
 * Top voted PENDING questions, sorted by upvoteCount desc then recency.
 * Each entry is annotated with `hasUpvoted` for the current member so
 * the upvote button can show on/off state without a second round-trip.
 *
 * ANSWERED questions are deliberately NOT in this list — they're
 * surfaced on the answering FeedPost itself ("This answers: ..."). The
 * asker's pill picks them up via /api/consilium/questions/me.
 */
export async function GET() {
  const userId = await resolveActor();
  if (!userId) {
    return NextResponse.json(
      { error: "Your session expired — please refresh the page and log in again" },
      { status: 401 },
    );
  }

  const m = await checkMembership(userId);
  if (!m.isMember) return NextResponse.json({ error: "Members only" }, { status: 403 });

  const questions = await prisma.memberQuestion.findMany({
    where: { status: "PENDING" },
    orderBy: [{ upvoteCount: "desc" }, { createdAt: "desc" }],
    take: 50,
    select: {
      id: true,
      content: true,
      isAnonymous: true,
      upvoteCount: true,
      createdAt: true,
      userId: true,
      user: { select: { displayName: true, name: true } },
      upvotes: { where: { userId }, select: { id: true } },
    },
  });

  return NextResponse.json({
    questions: questions.map((q) => ({
      id: q.id,
      content: q.content,
      upvoteCount: q.upvoteCount,
      createdAt: q.createdAt,
      hasUpvoted: q.upvotes.length > 0,
      isMine: q.userId === userId,
      author: q.isAnonymous ? null : (q.user.displayName ?? q.user.name ?? "Member"),
    })),
  });
}

const submitSchema = z.object({
  content: z.string().trim().min(10, "Question is too short").max(500, "500 char max"),
  isAnonymous: z.boolean().default(false),
});

/**
 * POST /api/consilium/questions
 *
 * Submit a new question. Server-side cooldown enforcement (rolling 24h,
 * configurable cap). Bot users are explicitly rejected — bots engage on
 * existing posts via the BotAction queue, not by submitting questions.
 */
export async function POST(req: NextRequest) {
  const userId = await resolveActor();
  if (!userId) {
    return NextResponse.json(
      { error: "Your session expired — please refresh the page and log in again" },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isBot: true },
  });
  if (!user || user.isBot) {
    return NextResponse.json({ error: "Members only" }, { status: 403 });
  }

  const m = await checkMembership(userId);
  if (!m.isMember) return NextResponse.json({ error: "Members only" }, { status: 403 });

  let payload: z.infer<typeof submitSchema>;
  try {
    const body = await req.json();
    const settings = await getQuestionSettings();
    payload = submitSchema
      .extend({ content: z.string().trim().min(10).max(settings.maxLength) })
      .parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const cooldown = await checkAskCooldown(userId);
  if (!cooldown.allowed) {
    return NextResponse.json(
      {
        error: "Daily limit reached",
        nextAvailableAt: cooldown.nextAvailableAt,
        dailyCap: cooldown.dailyCap,
      },
      { status: 429 },
    );
  }

  const question = await prisma.memberQuestion.create({
    data: {
      userId,
      content: payload.content,
      isAnonymous: payload.isAnonymous,
    },
    select: { id: true, createdAt: true },
  });

  logger.info("[questions] submitted", {
    questionId: question.id,
    userId,
    anonymous: payload.isAnonymous,
  });

  // Fresh cooldown state for the client to drive the countdown.
  const next = await checkAskCooldown(userId);
  return NextResponse.json({
    success: true,
    question,
    cooldown: next,
  });
}
