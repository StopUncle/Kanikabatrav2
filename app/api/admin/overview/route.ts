/**
 * GET /api/admin/overview
 *
 * Everything waiting on Kanika, and the numbers worth glancing at, in one
 * request.
 *
 * The point is that nothing needing a human should be discoverable only by
 * remembering to visit the right page. If it needs her, it appears here.
 * Adding a new manual queue to the product means adding it to this file,
 * and nowhere else.
 */

import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { readRunway } from "@/lib/program/runway";
import { INTRO_PROMPT_MARKER } from "@/lib/day0/checklist";

export const dynamic = "force-dynamic";

export async function GET() {
  // requireAdminSession returns the 401 response when the caller is NOT an
  // admin, and null when they are. Returning it directly is the only safe
  // shape; testing it for falsiness inverts the gate.
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const now = Date.now();
  const dayAgo = new Date(now - 24 * 3600_000);
  const weekAgo = new Date(now - 7 * 24 * 3600_000);

  const introPrompt = await prisma.feedPost.findFirst({
    where: { metadata: { path: ["marker"], equals: INTRO_PROMPT_MARKER } },
    select: { id: true },
  });

  const [
    pendingComments,
    pendingQuestions,
    unreadConversations,
    draftScenarios,
    failedEmails,
    activeMembers,
    seenThisWeek,
    newThisWeek,
    introAwaitingReply,
    runway,
  ] = await Promise.all([
    prisma.feedComment.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.memberQuestion.count({ where: { status: "PENDING" } }),
    prisma.conversation.count({ where: { adminUnread: { gt: 0 } } }),
    prisma.generatedScenario.count({ where: { status: "DRAFT" } }),
    prisma.emailQueue.count({ where: { status: "FAILED" } }),
    prisma.communityMembership.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({
      where: {
        communityMembership: { status: "ACTIVE" },
        isBot: false,
        lastSeenAt: { gte: weekAgo },
      },
    }),
    prisma.communityMembership.count({
      where: { status: "ACTIVE", activatedAt: { gte: weekAgo } },
    }),
    // The reply guarantee. Anything older than a day with no reply from her
    // is the promise starting to slip, which is why the window here is
    // wider than the cron's one-shot 48-72h notification band.
    introPrompt
      ? prisma.feedComment.count({
          where: {
            postId: introPrompt.id,
            parentId: null,
            status: { not: "REJECTED" },
            author: { role: { not: "ADMIN" } },
            createdAt: { lt: dayAgo },
            children: { none: { author: { role: "ADMIN" } } },
          },
        })
      : Promise.resolve(0),
    readRunway(prisma),
  ]);

  // Ordered by what it costs to leave undone, not by size. A member waiting
  // on a personal reply outranks a moderation queue.
  const needsYou = [
    {
      key: "dms",
      count: unreadConversations,
      label: "Direct messages waiting",
      detail: "Someone wrote to you and has not heard back.",
      href: "/admin/messages",
    },
    {
      key: "intro",
      count: introAwaitingReply,
      label: "Introductions without a reply",
      detail: "You promised to read every one.",
      href: introPrompt ? `/admin/posts` : "/admin/posts",
    },
    {
      key: "questions",
      count: pendingQuestions,
      label: "Questions to answer",
      detail: "Asked and waiting for a voice note or video.",
      href: "/admin/questions",
    },
    {
      key: "comments",
      count: pendingComments,
      label: "Comments to review",
      detail: "Held until you approve them.",
      href: "/admin/comments",
    },
    {
      key: "scenarios",
      count: draftScenarios,
      label: "Scenario drafts",
      detail: "Generated overnight, not live until published.",
      href: "/admin/scenarios",
    },
    {
      key: "emails",
      count: failedEmails,
      label: "Emails that failed",
      detail: "Nobody received these.",
      href: "/admin/email-queue",
    },
  ].filter((i) => i.count > 0);

  return NextResponse.json({
    needsYou,
    runway,
    health: {
      activeMembers,
      seenThisWeek,
      newThisWeek,
      dormant: Math.max(0, activeMembers - seenThisWeek),
    },
  });
}
