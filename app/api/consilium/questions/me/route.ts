import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkAskCooldown } from "@/lib/questions/cooldown";

// Same dual-session resolver as the submit + upvote endpoints.
async function resolveActor(): Promise<string | null> {
  const active = await resolveActiveUserId();
  if (active) return active;
  return await getAdminUserId();
}

/**
 * GET /api/consilium/questions/me
 *
 * Everything the asker's pill needs to render its 3-state UI:
 * - cooldown: are they allowed to ask now? when does the next slot open?
 * - questions: their own submission history with status + answer link
 * - hasUnreadAnswer: any ANSWERED question whose answer they haven't
 *   acknowledged yet (drives the green-dot pill state)
 *
 * Single endpoint to keep the pill cheap on every feed-page render.
 */
export async function GET() {
  const userId = await resolveActor();
  if (!userId) {
    // Soft-fail: if the pill mounts on a logged-out page (race condition
    // during logout, or admin previewing as anon), don't 401-spam the
    // browser console. Return an empty state and let the pill show idle.
    return NextResponse.json({
      cooldown: null,
      questions: [],
      hasUnreadAnswer: false,
    });
  }

  const [cooldown, mine] = await Promise.all([
    checkAskCooldown(userId),
    prisma.memberQuestion.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        content: true,
        status: true,
        answeredAt: true,
        createdAt: true,
        answerPost: {
          select: {
            id: true,
            title: true,
            type: true,
            voiceNoteUrl: true,
            videoUrl: true,
          },
        },
      },
    }),
  ]);

  // "Unread" = answered in the last 14 days. Members can dismiss the
  // green-dot state explicitly later; for now the timer expires it.
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const hasUnreadAnswer = mine.some(
    (q) => q.status === "ANSWERED" && q.answeredAt && q.answeredAt > fourteenDaysAgo,
  );

  return NextResponse.json({
    cooldown,
    questions: mine,
    hasUnreadAnswer,
  });
}
