import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWeeklyDigest } from "@/lib/email";
import { feedPostGenderWhere } from "@/lib/community/gender-filter";
import { logger } from "@/lib/logger";

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
 * two emails. That's acceptable — the content is the same, and members
 * can opt out via email preferences.
 */

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  // Accept CRON_SECRET via header (same pattern as daily-insight).
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - ONE_WEEK_MS);

  try {
    // Fetch all ACTIVE members. Join the user so we have email + gender
    // + name in one query.
    const members = await prisma.communityMembership.findMany({
      where: { status: "ACTIVE" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            displayName: true,
            gender: true,
          },
        },
      },
    });

    let sent = 0;
    let failed = 0;
    const failures: Array<{ userId: string; error: string }> = [];

    for (const membership of members) {
      const user = membership.user;
      if (!user.email) continue;

      try {
        // Gender-scoped FeedPost fetch — same filter the live feed uses.
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
                .slice(0, 140) + (p.content.length > 140 ? "…" : ""),
            commentCount: p._count.comments,
          })),
          newVoiceNotes,
          newCourses,
          newCommentsOnYourPosts,
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
      `[cron weekly-digest] completed: ${sent} sent, ${failed} failed of ${members.length} active members`,
    );

    return NextResponse.json({
      success: true,
      totalMembers: members.length,
      sent,
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
