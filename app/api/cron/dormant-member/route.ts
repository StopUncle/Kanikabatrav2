import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import {
  buildDormantReengagementEmailEntry,
  buildFreeDormantEmailEntry,
} from "@/lib/email-sequences";

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
  if (!verifyCronSecret(request)) {
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

    // Free-tier pass. Same 14-day dormancy bar, but only for accounts
    // that actually used the app (sat the Arrival or played at least
    // once): a registrant who never came in gets the onboarding drip,
    // not a "come back" for a place they never were. Free accounts have
    // no membership row to stamp a cooldown on, so the dedupe reads
    // this sequence's own EmailQueue rows inside the cooldown window.
    const freeCandidates = await prisma.user.findMany({
      where: {
        isBot: false,
        isTrainingBot: false,
        isBanned: false,
        OR: [
          { arrivalAt: { not: null } },
          { dailyStreakLastDate: { not: null } },
        ],
        NOT: { communityMembership: { status: "ACTIVE" } },
      },
      select: {
        email: true,
        name: true,
        lastSeenAt: true,
        createdAt: true,
      },
    });

    const recentFreeSends = await prisma.emailQueue.findMany({
      where: {
        sequence: "free-dormant-reengagement",
        createdAt: { gte: cooldownCutoff },
      },
      select: { recipientEmail: true },
    });
    const recentFreeSet = new Set(
      recentFreeSends.map((r) => r.recipientEmail.toLowerCase()),
    );

    let freeScanned = 0;
    let freeSent = 0;
    let freeSkippedCooldown = 0;
    let freeSkippedRecent = 0;

    for (const u of freeCandidates) {
      freeScanned++;
      if (!u.email) continue;
      const email = u.email.toLowerCase();

      const lastTouch = u.lastSeenAt ?? u.createdAt;
      if (lastTouch >= dormancyCutoff) {
        freeSkippedRecent++;
        continue;
      }
      if (recentFreeSet.has(email)) {
        freeSkippedCooldown++;
        continue;
      }

      await prisma.emailQueue.create({
        data: buildFreeDormantEmailEntry(email, u.name || "there"),
      });
      recentFreeSet.add(email);
      freeSent++;
    }

    return NextResponse.json({
      success: true,
      scanned,
      sent,
      skippedCooldown,
      skippedRecent,
      freeScanned,
      freeSent,
      freeSkippedCooldown,
      freeSkippedRecent,
    });
  } catch (error) {
    console.error("[cron/dormant-member] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
