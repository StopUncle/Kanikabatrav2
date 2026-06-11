import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { stripe } from "@/lib/stripe";
import { sendMembershipResumed } from "@/lib/email";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status !== "SUSPENDED") {
      return NextResponse.json({ error: "No paused membership to resume" }, { status: 400 });
    }

    if (membership.suspendReason !== "member-requested-pause") {
      return NextResponse.json({ error: "This suspension cannot be self-resumed" }, { status: 403 });
    }

    // Unpause the Stripe subscription so billing resumes on the next cycle.
    let resumedExpiresAt: Date | null = null;
    if (membership.paypalSubscriptionId?.startsWith("ST-")) {
      const subscriptionId = membership.paypalSubscriptionId.slice(3);
      try {
        await stripe.subscriptions.update(subscriptionId, {
          pause_collection: null,
        });
        // Re-read the live period end so the resumed row gets a future
        // expiresAt. Without this, a stale/past expiresAt left over from
        // the pause makes the lazy-expiry check in lib/community/
        // membership.ts immediately flip the row back to EXPIRED.
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const periodEnd = (sub as { current_period_end?: number })
          .current_period_end;
        if (periodEnd) resumedExpiresAt = new Date(periodEnd * 1000);
      } catch (err) {
        console.error("[resume] failed to unpause Stripe subscription:", err);
        return NextResponse.json(
          { error: "Failed to resume billing. Please try again or contact support." },
          { status: 502 },
        );
      }
    }

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: {
        status: "ACTIVE",
        suspendedAt: null,
        suspendReason: null,
        activatedAt: new Date(),
        ...(resumedExpiresAt ? { expiresAt: resumedExpiresAt } : {}),
      },
    });

    const userRow = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, name: true, displayName: true },
    });
    if (userRow?.email) {
      sendMembershipResumed(
        userRow.email,
        userRow.displayName || userRow.name || "Member",
      ).catch((err) =>
        logger.error(
          "[subscription-resume] confirmation email failed",
          err as Error,
          { userId: user.id },
        ),
      );
    }

    return NextResponse.json({ success: true, message: "Welcome back! Your membership is active again." });
  });
}
