import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTrialExpiringSoon } from "@/lib/email";

/**
 * Cron: check for trial memberships expiring in 3 days. Sends a
 * single nudge email per trial member. Idempotent — tracks whether
 * the email was already sent via applicationData.trialExpiryNotified.
 *
 * Schedule: daily, same time as daily-insight.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    // Find ACTIVE trials expiring within 3 days that haven't been notified
    const expiringTrials = await prisma.communityMembership.findMany({
      where: {
        status: "ACTIVE",
        billingCycle: "trial",
        expiresAt: {
          gt: now,
          lte: threeDaysFromNow,
        },
      },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });

    let sent = 0;
    let skipped = 0;

    for (const membership of expiringTrials) {
      // Idempotency: skip if already notified
      const data = (membership.applicationData as Record<string, unknown>) || {};
      if (data.trialExpiryNotified) {
        skipped++;
        continue;
      }

      if (!membership.user?.email || !membership.expiresAt) continue;

      const daysLeft = Math.max(
        1,
        Math.ceil((membership.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      );

      const emailSent = await sendTrialExpiringSoon(
        membership.user.email,
        membership.user.name || "there",
        daysLeft,
      );

      if (emailSent) {
        await prisma.communityMembership.update({
          where: { id: membership.id },
          data: {
            applicationData: {
              ...data,
              trialExpiryNotified: true,
              trialExpiryNotifiedAt: new Date().toISOString(),
            },
          },
        });
        sent++;
      }
    }

    return NextResponse.json({
      success: true,
      found: expiringTrials.length,
      sent,
      skipped,
    });
  } catch (error) {
    console.error("[cron/trial-expiry] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
