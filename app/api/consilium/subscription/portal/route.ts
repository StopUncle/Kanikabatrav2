import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Stripe Customer Portal redirect.
 *
 * The portal lets members self-service their subscription:
 *   - see next charge date + amount
 *   - update their payment method
 *   - download invoices
 *   - cancel the subscription (at period end)
 *   - change plan (if multiple prices configured)
 *
 * Before this route, all of the above had to be done manually by emailing
 * Kanika. One less support burden.
 *
 * REQUIRED ONE-TIME STRIPE DASHBOARD SETUP:
 *   1. Dashboard → Settings → Billing → Customer Portal
 *   2. Enable the portal
 *   3. Set default return URL to https://kanikarose.com/dashboard
 *   4. Configure which features members can access (cancel, update payment,
 *      invoices. All enabled by default, fine to leave as-is)
 *   5. Set up the business info (branding, terms, privacy URLs)
 *   6. Save
 *
 * Without this setup, stripe.billingPortal.sessions.create() will 400
 * with "No configuration provided" on the first request.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
      select: { paypalSubscriptionId: true, status: true },
    });

    if (!membership || !membership.paypalSubscriptionId?.startsWith("ST-")) {
      return NextResponse.json(
        { error: "No active Stripe subscription found" },
        { status: 404 },
      );
    }

    const subscriptionId = membership.paypalSubscriptionId.slice(3);

    try {
      // Look up the customer id from the subscription. We don't store it
      // directly on the membership row (legacy schema), so derive it here.
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      });

      return NextResponse.json({ url: session.url });
    } catch (err) {
      logger.error(
        "[subscription-portal] failed to create portal session",
        err as Error,
        { userId: user.id, subscriptionId },
      );
      // The most common failure mode is "No configuration provided" when
      // the portal hasn't been enabled in the Stripe dashboard yet. Surface
      // a message that guides toward the fix without leaking internals.
      const message =
        err instanceof Error && err.message.includes("configuration")
          ? "Customer portal is not configured yet. Please contact support."
          : "Failed to open the customer portal. Please try again.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  });
}
