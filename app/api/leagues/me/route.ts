/**
 * GET /api/leagues/me
 *
 * Returns the current user's live league bracket: tier name + ladder
 * position, your row, the top 8 by score, the cutoffs for promotion +
 * demotion. Members-only (anonymous /tells players don't have league
 * memberships).
 *
 * Returns null when the user hasn't yet answered a Tell this week —
 * the LeagueCard component renders a placeholder in that case.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { isoWeekKey } from "@/lib/tells/streak";

const ROSTER_LIMIT = 8;

export async function GET() {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  const weekKey = isoWeekKey();

  const myMembership = await prisma.leagueMembership.findUnique({
    where: { userId_weekKey: { userId: ctx.userId, weekKey } },
    select: {
      id: true,
      weeklyScore: true,
      weeklyAnswered: true,
      startElo: true,
      league: {
        select: {
          id: true,
          tierName: true,
          tierOrder: true,
          eloMin: true,
          eloMax: true,
        },
      },
    },
  });

  if (!myMembership) {
    return NextResponse.json({ membership: null });
  }

  // Pull the bracket ranked by score. Bigger brackets cap at ROSTER_LIMIT
  // for the card; the full bracket page (separate route, not built yet)
  // shows everyone.
  const roster = await prisma.leagueMembership.findMany({
    where: { leagueId: myMembership.league.id },
    orderBy: [
      { weeklyScore: "desc" },
      { weeklyAnswered: "desc" },
      { joinedAt: "asc" },
    ],
    select: {
      id: true,
      userId: true,
      weeklyScore: true,
      weeklyAnswered: true,
      user: {
        select: {
          handle: true,
          displayName: true,
          isTrainingBot: true,
        },
      },
    },
  });

  const myRank =
    roster.findIndex((m) => m.userId === ctx.userId) + 1; // 1-based, 0 if missing
  const totalInBracket = roster.length;

  // Promotion + demotion thresholds match the resolve.ts math so the
  // card shows the same numbers the cron will use.
  const promoteCount = Math.min(5, Math.max(1, Math.floor(totalInBracket * 0.2)));
  const demoteCount =
    totalInBracket >= 8
      ? Math.min(5, Math.max(1, Math.floor(totalInBracket * 0.2)))
      : 0;

  // Scores at the relevant cutoff lines, so the card can show "you need
  // 18 more to promote" without exposing raw rank-of-everyone.
  const promoteCutoffScore =
    totalInBracket > promoteCount
      ? roster[promoteCount - 1].weeklyScore
      : 0;
  const demoteCutoffScore =
    demoteCount > 0
      ? roster[totalInBracket - demoteCount].weeklyScore
      : 0;

  return NextResponse.json({
    membership: {
      weekKey,
      tierName: myMembership.league.tierName,
      tierOrder: myMembership.league.tierOrder,
      eloMin: myMembership.league.eloMin,
      eloMax: myMembership.league.eloMax,
      startElo: myMembership.startElo,
      weeklyScore: myMembership.weeklyScore,
      weeklyAnswered: myMembership.weeklyAnswered,
      myRank,
      totalInBracket,
      promoteCount,
      demoteCount,
      promoteCutoffScore,
      demoteCutoffScore,
      roster: roster.slice(0, ROSTER_LIMIT).map((m, i) => ({
        rank: i + 1,
        // Display name preference: handle (claimed by member) →
        // displayName → "anonymous." Bots always have a handle so
        // this falls through to handle for them. The isMe flag drives
        // a "you" highlight on the card without leaking the real
        // userId to the client.
        label: m.user.handle ?? m.user.displayName ?? "anonymous",
        score: m.weeklyScore,
        answered: m.weeklyAnswered,
        isMe: m.userId === ctx.userId,
        // We deliberately do NOT expose isTrainingBot to the client.
        // The leaderboard treats bots and humans uniformly. The bot-
        // can't-be-#1 invariant runs at resolution time.
      })),
    },
  });
}
