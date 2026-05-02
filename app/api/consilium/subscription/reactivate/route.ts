import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Reactivate auto-renewal on a Consilium membership that was previously
 * set to cancel_at_period_end. Mirrors the cancel route in reverse.
 *
 * Only works while the subscription is still ACTIVE on Stripe (i.e.
 * before the period actually ends). After the period ends Stripe
 * deletes the subscription and reactivation requires a new checkout.
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

    if (!membership.paypalSubscriptionId?.startsWith("ST-")) {
      return NextResponse.json(
        { error: "This membership doesn't auto-renew." },
        { status: 422 },
      );
    }

    if (membership.status !== "ACTIVE") {
      return NextResponse.json(
        {
          error:
            "Reactivation only works while the membership is still active. Resubscribe from the Consilium page.",
        },
        { status: 400 },
      );
    }

    const stripeSubId = membership.paypalSubscriptionId.slice(3);

    let updatedExpiresAt: Date | null = membership.expiresAt;
    try {
      const stripe = getStripe();
      const updated = await stripe.subscriptions.update(stripeSubId, {
        cancel_at_period_end: false,
      });
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
        "[subscription-reactivate] stripe update failed",
        error as Error,
        { userId: user.id, stripeSubId },
      );
      return NextResponse.json(
        { error: "We couldn't reach Stripe. Try again in a moment." },
        { status: 502 },
      );
    }

    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        cancelledAt: null,
        ...(updatedExpiresAt ? { expiresAt: updatedExpiresAt } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Auto-renewal reactivated.",
      expiresAt: updatedExpiresAt?.toISOString() ?? null,
    });
  });
}
