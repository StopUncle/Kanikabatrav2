import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMembershipEndingSoon } from "@/lib/email";

/**
 * Cron: expiry reminders for genuinely non-renewing Consilium cycles.
 *
 * Covers:  gift  (only)
 * Skips:   monthly, annual (Stripe renews those automatically),
 *          bundle-1mo, bundle-3mo (these are Stripe subscriptions with
 *          a trial period; when the trial ends, the $29/mo INNER_CIRCLE
 *          line auto-renews. Stripe sends its own trial-ending email.
 *          Our "no auto-charge, you won't be billed" copy is factually
 *          wrong for bundle holders, so they're now excluded entirely.)
 *
 *          trial  (no current code path creates this billingCycle, so
 *          the legacy filter is dropped to avoid misleading reminders
 *          to historic rows whose true status we can't verify.)
 *
 * Window: ACTIVE memberships expiring in the next 7 days that haven't
 * received a reminder yet. Idempotent via `expiryNotified7d` flag on
 * applicationData, keeps the legacy `trialExpiryNotified` flag intact
 * so memberships already notified under the old 3-day window still have
 * their history.
 *
 * Expected schedule: daily. Because this flips a flag the first time
 * each membership comes into range, running it multiple times a day is
 * safe (subsequent runs find nothing to do).
 */

const NON_RENEWING_CYCLES = ["gift"] as const;

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const expiring = await prisma.communityMembership.findMany({
      where: {
        status: "ACTIVE",
        billingCycle: { in: [...NON_RENEWING_CYCLES] },
        expiresAt: {
          gt: now,
          lte: sevenDaysFromNow,
        },
        user: { isBot: false },
      },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });

    let sent = 0;
    let skipped = 0;
    const perCycle: Record<string, number> = {};

    for (const membership of expiring) {
      const data = (membership.applicationData as Record<string, unknown>) || {};
      if (data.expiryNotified7d) {
        skipped++;
        continue;
      }

      if (!membership.user?.email || !membership.expiresAt) continue;

      const daysLeft = Math.max(
        1,
        Math.ceil(
          (membership.expiresAt.getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      );

      // Bundle holders were previously sent a tokened resub link; that
      // branch is gone now that bundle cycles are out of scope.
      const emailSent = await sendMembershipEndingSoon(
        membership.user.email,
        membership.user.name || "there",
        daysLeft,
        membership.billingCycle,
      );

      if (emailSent) {
        await prisma.communityMembership.update({
          where: { id: membership.id },
          data: {
            applicationData: {
              ...data,
              expiryNotified7d: true,
              expiryNotified7dAt: new Date().toISOString(),
              expiryNotifiedCycle: membership.billingCycle,
            },
          },
        });
        sent++;
        perCycle[membership.billingCycle] =
          (perCycle[membership.billingCycle] ?? 0) + 1;
      }
    }

    return NextResponse.json({
      success: true,
      found: expiring.length,
      sent,
      skipped,
      perCycle,
    });
  } catch (error) {
    console.error("[cron/trial-expiry] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
