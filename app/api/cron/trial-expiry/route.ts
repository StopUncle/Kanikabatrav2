import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { sendMembershipEndingSoon } from "@/lib/email";

/**
 * Cron: expiry reminders for every non-renewing Consilium cycle.
 *
 * Covers:  trial · gift · bundle-1mo · bundle-3mo
 * Skips:   monthly, annual (Stripe renews those automatically)
 *
 * Window: ACTIVE memberships expiring in the next 7 days that haven't
 * received a reminder yet. Idempotent via `expiryNotified7d` flag on
 * applicationData — keeps the legacy `trialExpiryNotified` flag intact
 * so memberships already notified under the old 3-day window still have
 * their history.
 *
 * Expected schedule: daily. Because this flips a flag the first time
 * each membership comes into range, running it multiple times a day is
 * safe (subsequent runs find nothing to do).
 */

const NON_RENEWING_CYCLES = ["trial", "gift", "bundle-1mo", "bundle-3mo"] as const;

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

      // For bundle holders, mint a one-click resubscribe JWT so the
      // email link goes straight to Stripe Checkout for the standard
      // $29/mo subscription — no re-application, no re-login. Other
      // cycles (trial, gift) keep the default upgrade page which
      // already routes through the right pitch flow.
      let resubLink: string | undefined;
      if (
        membership.billingCycle === "bundle-1mo" ||
        membership.billingCycle === "bundle-3mo"
      ) {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
        const token = jwt.sign(
          { userId: membership.userId, type: "bundle-resub" },
          process.env.JWT_SECRET!,
          { expiresIn: "14d" },
        );
        resubLink = `${baseUrl}/api/consilium/bundle-resubscribe?token=${token}`;
      }

      const emailSent = await sendMembershipEndingSoon(
        membership.user.email,
        membership.user.name || "there",
        daysLeft,
        membership.billingCycle,
        resubLink,
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
