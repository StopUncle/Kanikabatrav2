import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { logger } from "@/lib/logger";

/**
 * GDPR data export. Returns every piece of data associated with the
 * authenticated user as a single JSON document, served as a file download.
 *
 * GDPR Article 15 (right of access) + Article 20 (right to data
 * portability) require that controllers provide personal data in a
 * structured, commonly-used, machine-readable format. JSON satisfies
 * both.
 *
 * Intentionally excludes:
 *   - password hash (not personal data in a portable sense)
 *   - token versions / auth state
 *   - other users' comments or replies, even in threads the user started
 *     (we only export content authored BY the subject)
 */
export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    try {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          name: true,
          displayName: true,
          avatarUrl: true,
          gender: true,
          role: true,
          points: true,
          level: true,
          createdAt: true,
          updatedAt: true,
          onboardingSeenAt: true,
          emailPreferences: true,
          communityMembership: {
            select: {
              id: true,
              status: true,
              billingCycle: true,
              applicationData: true,
              appliedAt: true,
              approvedAt: true,
              activatedAt: true,
              expiresAt: true,
              suspendedAt: true,
              suspendReason: true,
              cancelledAt: true,
              createdAt: true,
            },
          },
          purchases: {
            select: {
              id: true,
              type: true,
              productVariant: true,
              amount: true,
              status: true,
              downloadCount: true,
              maxDownloads: true,
              expiresAt: true,
              createdAt: true,
              metadata: true,
            },
          },
          sessions: {
            select: {
              id: true,
              packageName: true,
              sessionCount: true,
              scheduledAt: true,
              duration: true,
              status: true,
              notes: true,
              userNotes: true,
              createdAt: true,
            },
          },
          quizResults: {
            select: {
              id: true,
              email: true,
              primaryType: true,
              secondaryType: true,
              scores: true,
              answers: true,
              paid: true,
              shared: true,
              createdAt: true,
            },
          },
          forumPosts: {
            select: {
              id: true,
              title: true,
              slug: true,
              content: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          forumReplies: {
            select: {
              id: true,
              postId: true,
              content: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          feedPosts: {
            select: {
              id: true,
              title: true,
              content: true,
              type: true,
              createdAt: true,
            },
          },
          feedComments: {
            select: {
              id: true,
              postId: true,
              content: true,
              status: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          chatMessages: {
            select: {
              id: true,
              roomId: true,
              content: true,
              type: true,
              createdAt: true,
            },
          },
          enrollments: {
            select: {
              id: true,
              courseId: true,
              progress: true,
              completedAt: true,
              createdAt: true,
            },
          },
          achievements: {
            select: {
              id: true,
              achievementId: true,
              earnedAt: true,
            },
          },
        },
      });

      if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const payload = {
        exportedAt: new Date().toISOString(),
        notice:
          "This file contains all personal data Kanika Batra holds about you, " +
          "in accordance with GDPR Article 15 (right of access) and Article 20 " +
          "(right to data portability). If you have questions about this data " +
          "or want it deleted, contact privacy@kanikarose.com or use the " +
          "account deletion option in your dashboard.",
        user: userData,
      };

      // Convert BigInt / Decimal to JSON-safe types before stringifying.
      // Prisma's Decimal fields don't JSON.stringify directly.
      const json = JSON.stringify(
        payload,
        (_key, value) => (typeof value === "bigint" ? value.toString() : value),
        2,
      );

      const filename = `kanika-rose-data-export-${new Date().toISOString().slice(0, 10)}.json`;

      return new NextResponse(json, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    } catch (err) {
      logger.error("[user-export] failed to build export", err as Error, {
        userId: user.id,
      });
      return NextResponse.json(
        { error: "Failed to build export" },
        { status: 500 },
      );
    }
  });
}
