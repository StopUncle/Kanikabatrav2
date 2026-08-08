import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { checkAskCooldown } from "@/lib/questions/cooldown";
import { hasUnreadAnswer, readMyQuestions } from "@/lib/questions/read";

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

  const [cooldown, mine, viewer] = await Promise.all([
    checkAskCooldown(userId),
    readMyQuestions(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    }),
  ]);

  return NextResponse.json({
    cooldown,
    questions: mine,
    // "Unread" = answered in the last 14 days. The timer expires it; there
    // is no explicit dismissal yet.
    hasUnreadAnswer: hasUnreadAnswer(mine),
    isAdmin: viewer?.role === "ADMIN",
  });
}
