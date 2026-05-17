import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getStripe, STRIPE_PRICES } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Upgrade an existing monthly Consilium subscription to annual.
 *
 * Why this exists as a dedicated route rather than "cancel + re-subscribe":
 * Stripe's subscriptions.update with proration_behavior=create_prorations
 * handles the math itself. The member is credited for the unused portion
 * of their current month and charged the prorated annual difference on
 * the next invoice. No double-charge, no access gap.
 *
 * Pre-flight:
 *   - Must be ACTIVE
 *   - Must already be on the monthly Stripe price (no point upgrading
 *     gift/bundle/annual)
 *   - Must have a real ST-prefixed Stripe subscription id
 *
 * Post-success: webhook does not need to do anything special. The local
 * billingCycle field is updated optimistically here; the next
 * invoice.payment_succeeded confirms the period_end against Stripe.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "No membership found" }, { status: 404 });
    }
    if (membership.status !== "ACTIVE") {
      return NextResponse.json(
        { error: `Cannot upgrade a ${membership.status.toLowerCase()} membership` },
        { status: 400 },
      );
    }
    if (membership.billingCycle === "annual") {
      return NextResponse.json(
        { error: "Already on the annual plan" },
        { status: 400 },
      );
    }
    if (!membership.paypalSubscriptionId?.startsWith("ST-")) {
      return NextResponse.json(
        {
          error:
            "This membership cannot be upgraded directly. It looks like a gift or bundle. Join the annual plan from the Consilium page when this one ends.",
        },
        { status: 422 },
      );
    }

    const stripeSubId = membership.paypalSubscriptionId.slice(3);

    try {
      const stripe = getStripe();
      const sub = await stripe.subscriptions.retrieve(stripeSubId);
      const currentItemId = sub.items.data[0]?.id;
      if (!currentItemId) {
        logger.error(
          "[subscription-upgrade] subscription has no items",
          new Error("missing-sub-item"),
          { userId: user.id, stripeSubId },
        );
        return NextResponse.json(
          { error: "Could not read the current subscription. Contact support." },
          { status: 502 },
        );
      }

      // Swap the price on the existing subscription. Stripe credits the
      // member for the unused monthly portion and bills the prorated
      // annual amount on the next invoice. invoice.payment_succeeded
      // webhook will fire and confirm the new expiresAt.
      await stripe.subscriptions.update(stripeSubId, {
        items: [
          {
            id: currentItemId,
            price: STRIPE_PRICES.INNER_CIRCLE_ANNUAL,
          },
        ],
        proration_behavior: "create_prorations",
        metadata: {
          ...(sub.metadata ?? {}),
          billing_cycle: "annual",
          product_key: "INNER_CIRCLE_ANNUAL",
        },
      });
    } catch (err) {
      logger.error(
        "[subscription-upgrade] stripe update failed",
        err as Error,
        { userId: user.id, stripeSubId },
      );
      return NextResponse.json(
        {
          error:
            "We couldn't reach Stripe to upgrade your plan. Try again in a moment or use Manage Subscription to switch from Stripe's portal.",
        },
        { status: 502 },
      );
    }

    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        billingCycle: "annual",
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Upgraded to annual. Your next renewal will be a year out, and you'll see a prorated credit from your current month.",
    });
  });
}
