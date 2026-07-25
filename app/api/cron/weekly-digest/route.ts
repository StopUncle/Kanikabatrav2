import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { sendWeeklyDigest } from "@/lib/email";
import { feedPostGenderWhere } from "@/lib/community/gender-filter";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token";
import { logger } from "@/lib/logger";
import { getPathState } from "@/lib/path/progress";
import { stepHref } from "@/lib/path/curriculum";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";
import { isoWeekKey } from "@/lib/tells/streak";
import type { LeagueOutcome } from "@prisma/client";

/**
 * Weekly digest for ACTIVE Inner Circle members.
 *
 * Scheduled via .github/workflows/cron.yml to run Sunday mornings. For
 * each ACTIVE member, composes a personalized email summarizing new
 * content from the last 7 days, then sends via the existing email
 * transport.
 *
 * Per-member steps:
 *   1. Compute the window (now - 7d, now)
 *   2. Fetch new FeedPosts in the window, filtered by the member's
 *      gender (so gender-split works correctly)
 *   3. Fetch new voice notes (FeedPosts with type VOICE_NOTE)
 *   4. Fetch new courses created in the window
 *   5. Count new replies on the member's own comments
 *   6. Call sendWeeklyDigest
 *
 * Idempotency: the cron fires once per week per the schedule, but if it
 * runs twice within the same week (manual dispatch, retry) members get
 * two emails. That's acceptable, the content is the same, and members
 * can opt out via email preferences (toggle in /dashboard settings, or
 * one-click via the unsubscribe link in the digest itself).
 *
 * Opt-out: members whose `emailPreferences.weeklyDigest === false` are
 * skipped entirely. Members with null/missing prefs are treated as
 * opted-in (matches DEFAULT_PREFERENCES in /api/user/settings).
 */

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - ONE_WEEK_MS);

  try {
    // Fetch all ACTIVE members. Join the user so we have email + gender
    // + name + emailPreferences in one query.
    const members = await prisma.communityMembership.findMany({
      where: { status: "ACTIVE", user: { isBot: false } },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            displayName: true,
            gender: true,
            emailPreferences: true,
            standing: true,
            ringLevel: true,
          },
        },
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    // The week's most-misread Tell (plan §6.3), computed ONCE for all
    // members: among Tells scheduled in the window with at least 3
    // scored answers, the one the room got wrong most often. Kanika's
    // read is the first sentence of the reveal.
    let misreadTell: {
      question: string;
      missRate: number;
      read: string;
      href: string;
    } | null = null;
    try {
      const weekTells = await prisma.tell.findMany({
        where: {
          scheduleDate: { gte: weekAgo, lte: now },
          status: { in: ["PUBLISHED", "ARCHIVED"] },
        },
        select: { id: true, slug: true, question: true, reveal: true },
      });
      if (weekTells.length > 0) {
        const ids = weekTells.map((t) => t.id);
        const [totals, corrects] = await Promise.all([
          prisma.tellResponse.groupBy({
            by: ["tellId"],
            where: { tellId: { in: ids }, countedScored: true },
            _count: { _all: true },
          }),
          prisma.tellResponse.groupBy({
            by: ["tellId"],
            where: { tellId: { in: ids }, countedScored: true, isCorrect: true },
            _count: { _all: true },
          }),
        ]);
        const totalBy = new Map(totals.map((r) => [r.tellId, r._count._all]));
        const correctBy = new Map(corrects.map((r) => [r.tellId, r._count._all]));
        const worst = Array.from(totalBy.entries()).reduce<{
          tellId: string;
          missRate: number;
        } | null>((best, [tellId, total]) => {
          if (total < 3) return best;
          const missRate = Math.round(
            (100 * (total - (correctBy.get(tellId) ?? 0))) / total,
          );
          return !best || missRate > best.missRate ? { tellId, missRate } : best;
        }, null);
        if (worst && worst.missRate >= 40) {
          const tell = weekTells.find((t) => t.id === worst!.tellId)!;
          const firstSentence = tell.reveal
            .replace(/\s+/g, " ")
            .trim()
            .split(/(?<=[.!?])\s/)[0]
            .slice(0, 200);
          misreadTell = {
            question: tell.question,
            missRate: worst.missRate,
            read: firstSentence,
            href: `${baseUrl}/tells/${tell.slug}`,
          };
        }
      }
    } catch (err) {
      // The verdict ships without this card rather than blocking sends.
      logger.error("[cron weekly-digest] misread-tell calc failed", err as Error);
    }

    // Last resolved league week: at Sunday 08:00 the current ISO week
    // has not resolved yet (that cron runs 23:59), so report last week's.
    const lastWeekKey = isoWeekKey(weekAgo);

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    const failures: Array<{ userId: string; error: string }> = [];

    for (const membership of members) {
      const user = membership.user;
      if (!user.email) continue;

      // Honor opt-out: only skip if the user has explicitly set
      // weeklyDigest to false. Null / missing prefs default to opted-in.
      const prefs =
        user.emailPreferences && typeof user.emailPreferences === "object"
          ? (user.emailPreferences as Record<string, unknown>)
          : null;
      if (prefs && prefs.weeklyDigest === false) {
        skipped++;
        continue;
      }

      try {
        // Gender-scoped FeedPost fetch. Same filter the live feed uses.
        const genderWhere = feedPostGenderWhere(user.gender);

        const newPosts = await prisma.feedPost.findMany({
          where: {
            ...genderWhere,
            createdAt: { gte: weekAgo, lte: now },
            type: { not: "VOICE_NOTE" },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            title: true,
            content: true,
            type: true,
            _count: { select: { comments: { where: { status: "APPROVED" } } } },
          },
        });

        const newVoiceNotes = await prisma.feedPost.findMany({
          where: {
            ...genderWhere,
            createdAt: { gte: weekAgo, lte: now },
            type: "VOICE_NOTE",
          },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: { id: true, title: true },
        });

        const newCourses = await prisma.course.findMany({
          where: {
            createdAt: { gte: weekAgo, lte: now },
            isActive: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: { id: true, title: true, slug: true },
        });

        // Replies to the member's own comments in the same window.
        // This catches "your comment got a reply" without needing a
        // dedicated notification table.
        const newCommentsOnYourPosts = await prisma.feedComment.count({
          where: {
            createdAt: { gte: weekAgo, lte: now },
            status: "APPROVED",
            parent: { authorId: user.id },
            // Exclude the member's own self-replies
            authorId: { not: user.id },
          },
        });

        // The personal report card (plan §6.3). Each piece degrades to
        // null independently; the email renders what it gets.
        const [gained, leagueRow, pathState] = await Promise.all([
          prisma.standingEvent.aggregate({
            where: { userId: user.id, createdAt: { gte: weekAgo, lte: now } },
            _sum: { amount: true },
          }),
          prisma.leagueMembership.findUnique({
            where: { userId_weekKey: { userId: user.id, weekKey: lastWeekKey } },
            select: {
              finalRank: true,
              outcome: true,
              league: { select: { tierName: true } },
            },
          }),
          getPathState(prisma, user.id, {
            gender: user.gender,
            ringLevel: user.ringLevel,
          }).catch(() => null),
        ]);

        const toNext = standingToNextRing(user.standing);
        const verdict = {
          standingGained: gained._sum.amount ?? 0,
          standingTotal: user.standing,
          ringName: ringByLevel(user.ringLevel).name,
          toNext: toNext
            ? { ringName: toNext.next.name, remaining: toNext.remaining }
            : null,
          league:
            leagueRow?.outcome && leagueRow.finalRank
              ? {
                  tierName: leagueRow.league.tierName,
                  finalRank: leagueRow.finalRank,
                  outcome: leagueRow.outcome as LeagueOutcome,
                }
              : null,
          misreadTell,
          nextStep: pathState?.current
            ? {
                chapterTitle: `Chapter ${pathState.current.chapter.number} · ${pathState.current.chapter.title}`,
                label: pathState.current.step.label,
                href: `${baseUrl}${stepHref(pathState.current.step, user.gender)}`,
              }
            : null,
        };

        const unsubscribeUrl = buildUnsubscribeUrl({
          userId: user.id,
          type: "weeklyDigest",
        });

        const ok = await sendWeeklyDigest({
          memberEmail: user.email,
          memberName: user.displayName || user.name || "Member",
          weekStart: weekAgo,
          weekEnd: now,
          newPosts: newPosts.map((p) => ({
            id: p.id,
            title: p.title,
            type: p.type,
            // Strip markdown + cap at 140 chars for the digest preview
            excerpt:
              p.content
                .replace(/[*_#`>\[\]]/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 140) + (p.content.replace(/[*_#`>\[\]]/g, "").replace(/\s+/g, " ").trim().length > 140 ? "…" : ""),
            commentCount: p._count.comments,
          })),
          newVoiceNotes,
          newCourses,
          newCommentsOnYourPosts,
          verdict,
          unsubscribeUrl,
        });

        if (ok) {
          sent++;
        } else {
          failed++;
          failures.push({ userId: user.id, error: "sendEmail returned false" });
        }
      } catch (err) {
        failed++;
        failures.push({
          userId: user.id,
          error: err instanceof Error ? err.message : String(err),
        });
        logger.error(
          "[cron weekly-digest] failed to send digest for member",
          err as Error,
          { userId: user.id },
        );
      }
    }

    logger.info(
      `[cron weekly-digest] completed: ${sent} sent, ${skipped} skipped (opted out), ${failed} failed of ${members.length} active members`,
    );

    return NextResponse.json({
      success: true,
      totalMembers: members.length,
      sent,
      skipped,
      failed,
      failures: failed > 0 ? failures : undefined,
    });
  } catch (error) {
    logger.error("[cron weekly-digest] failed", error as Error);
    return NextResponse.json(
      { error: "Digest cron failed" },
      { status: 500 },
    );
  }
}
