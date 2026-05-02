import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Cancel auto-renewal on a Consilium membership.
 *
 * Behaviour:
 *   - Stripe-side: sets cancel_at_period_end = true. The subscription
 *     stays active in Stripe until the period actually ends, at which
 *     point Stripe fires customer.subscription.deleted and our webhook
 *     flips the local row to CANCELLED.
 *   - Local-side: keeps status = ACTIVE so the member retains access
 *     for the remainder of the billing period they already paid for.
 *     Stamps cancelledAt so the dashboard can render "auto-renewal off,
 *     access until <expiresAt>".
 *
 * Bug history:
 *   - The previous version called stripe.subscriptions.cancel(id) which
 *     is immediate cancellation, while flipping local status to
 *     CANCELLED. The response message claimed "access until end of
 *     billing period" which contradicted the behaviour. Standardised
 *     to cancel-at-period-end which is the SaaS convention members
 *     expect.
 *   - Members without a Stripe subscription (paypalSubscriptionId null
 *     or non-ST- prefix: gift / trial / bundled-with-book) can't cancel
 *     because there's nothing to cancel. For them we return a 422 with
 *     a clear message; the UI is responsible for not showing the cancel
 *     button to those members in the first place.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "No membership found" },
        { status: 404 },
      );
    }

    if (membership.status !== "ACTIVE") {
      return NextResponse.json(
        { error: `Cannot cancel a ${membership.status.toLowerCase()} membership` },
        { status: 400 },
      );
    }

    if (!membership.paypalSubscriptionId?.startsWith("ST-")) {
      // Gift / trial / bundled member. There is no auto-renewal to
      // cancel. The membership lapses naturally at expiresAt.
      return NextResponse.json(
        {
          error:
            "This membership doesn't auto-renew. It expires on its scheduled end date.",
          expiresAt: membership.expiresAt?.toISOString() ?? null,
          isAutoRenewing: false,
        },
        { status: 422 },
      );
    }

    const stripeSubId = membership.paypalSubscriptionId.slice(3);

    let updatedExpiresAt: Date | null = membership.expiresAt;
    try {
      const stripe = getStripe();
      const updated = await stripe.subscriptions.update(stripeSubId, {
        cancel_at_period_end: true,
      });
      // Sync expiresAt to the actual current_period_end Stripe knows
      // about. Cheap belt-and-braces against drift between local and
      // Stripe state. The field moved from the subscription root onto
      // the subscription items in recent Stripe API versions; check
      // both shapes so we work across versions.
      const subAny = updated as unknown as {
        current_period_end?: number;
        items?: { data?: Array<{ current_period_end?: number }> };
      };
      const periodEndSec =
        subAny.current_period_end ??
        subAny.items?.data?.[0]?.current_period_end;
      if (typeof periodEndSec === "number") {
        updatedExpiresAt = new Date(periodEndSec * 1000);
      }
    } catch (error) {
      logger.error(
        "[subscription-cancel] stripe update failed",
        error as Error,
        { userId: user.id, stripeSubId },
      );
      return NextResponse.json(
        {
          error:
            "We couldn't reach Stripe to cancel auto-renewal. Try again in a moment, or use the Manage Subscription button to cancel through Stripe directly.",
        },
        { status: 502 },
      );
    }

    // Local state: stay ACTIVE (member keeps access until expiresAt),
    // stamp cancelledAt so the dashboard can show the "auto-renewal off"
    // state. The webhook handler for customer.subscription.deleted will
    // flip status to CANCELLED at the actual period end.
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        cancelledAt: new Date(),
        ...(updatedExpiresAt ? { expiresAt: updatedExpiresAt } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Auto-renewal cancelled. You'll keep access until the end of your current billing period.",
      expiresAt: updatedExpiresAt?.toISOString() ?? null,
    });
  });
}
