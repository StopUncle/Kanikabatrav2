import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildDormantReengagementEmailEntry } from "@/lib/email-sequences";

/**
 * Cron: dormant-member re-engagement.
 *
 * Identifies ACTIVE Consilium members who have gone dark for 14+
 * days and queues a single "what you've missed" email. Catches
 * silent churn before the cancel click. Best-practice winback
 * conversion runs 18-28%, the dormant cohort is the highest-yield
 * recoverable group.
 *
 * Dormancy signal: User.lastSeenAt, written by /api/auth/refresh
 * (every ~15min for any active session) and /api/auth/login. If
 * lastSeenAt is null we fall back to membership.activatedAt, that
 * way pre-feature members who haven't logged in since the field
 * shipped still get evaluated against their activation date.
 *
 * Idempotency: applicationData.dormantReminderSentAt blocks
 * re-sending within a 30-day window. A member who returns and
 * then dormants again gets a fresh reminder once the 30-day
 * cooldown passes.
 *
 * Schedule: daily. Cheap enough to run every day, the body of the
 * query is bounded by ACTIVE membership count.
 */

const DORMANCY_THRESHOLD_DAYS = 14;
const REMINDER_COOLDOWN_DAYS = 30;

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (
    secret !== process.env.CRON_SECRET &&
    secret !== process.env.ADMIN_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const dormancyCutoff = new Date(
      now.getTime() - DORMANCY_THRESHOLD_DAYS * 24 * 60 * 60 * 1000,
    );
    const cooldownCutoff = new Date(
      now.getTime() - REMINDER_COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
    );

    // ACTIVE memberships only. Suspended / cancelled members are
    // handled by the winback drip, not this cron.
    const candidates = await prisma.communityMembership.findMany({
      where: {
        status: "ACTIVE",
        user: { isBot: false, isBanned: false },
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            lastSeenAt: true,
          },
        },
      },
    });

    let scanned = 0;
    let sent = 0;
    let skippedCooldown = 0;
    let skippedRecent = 0;

    for (const m of candidates) {
      scanned++;
      if (!m.user?.email) continue;

      // Dormancy check: lastSeenAt older than cutoff, OR null AND
      // activated more than the threshold ago (catches pre-feature
      // members who never refreshed their token after the field
      // shipped).
      const lastTouch =
        m.user.lastSeenAt ?? m.activatedAt ?? m.createdAt;
      if (!lastTouch || lastTouch >= dormancyCutoff) {
        skippedRecent++;
        continue;
      }

      // Cooldown: don't re-email a member within 30 days of the
      // last reminder. Persisted in applicationData rather than a
      // dedicated column to avoid a second migration.
      const data = (m.applicationData as Record<string, unknown>) || {};
      const lastSentRaw = data.dormantReminderSentAt;
      const lastSent =
        typeof lastSentRaw === "string" ? new Date(lastSentRaw) : null;
      if (lastSent && lastSent >= cooldownCutoff) {
        skippedCooldown++;
        continue;
      }

      const entry = buildDormantReengagementEmailEntry(
        m.user.email.toLowerCase(),
        m.user.name || "there",
      );
      await prisma.emailQueue.create({ data: entry });
      await prisma.communityMembership.update({
        where: { id: m.id },
        data: {
          applicationData: {
            ...data,
            dormantReminderSentAt: now.toISOString(),
            dormantReminderLastSeenAt: m.user.lastSeenAt
              ? m.user.lastSeenAt.toISOString()
              : null,
          },
        },
      });
      sent++;
    }

    return NextResponse.json({
      success: true,
      scanned,
      sent,
      skippedCooldown,
      skippedRecent,
    });
  } catch (error) {
    console.error("[cron/dormant-member] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
