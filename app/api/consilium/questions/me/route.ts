import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkAskCooldown } from "@/lib/questions/cooldown";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";

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
      isAdmin: false,
    });
  }

  // The only Ask Kanika route without a tier check. It returns the
  // caller's own rows only, so it never leaked another member's question,
  // but it handed cooldown state and the isAdmin flag to any signed-in
  // account and broke the pattern its two siblings follow. Soft-fails to
  // the empty shape for the same reason the logged-out branch does: this
  // drives a nav pill, and a lapsed member should see it vanish rather
  // than watch the console fill with 403s.
  const access = await getAccess(userId);
  if (!canAccessMemberOnly(access)) {
    return NextResponse.json({
      cooldown: null,
      questions: [],
      hasUnreadAnswer: false,
      isAdmin: false,
    });
  }

  const [cooldown, mine, viewer] = await Promise.all([
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
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    }),
  ]);
  const isAdmin = viewer?.role === "ADMIN";

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
    isAdmin,
  });
}
