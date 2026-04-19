import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    // Application gate removed (2026-04-19). Anyone authenticated can
    // proceed to Stripe checkout. Three guard clauses still apply:
    //
    //   1. Already an active paying subscriber — nothing to buy.
    //   2. Suspended for a violation — refunds + bans go through admin,
    //      not a self-service repurchase.
    //   3. Previously rejected at the application stage — kept as a
    //      defensive block for legacy users with rejectedAt stamped on
    //      their applicationData. The form is gone; nobody new can land
    //      in this state.

    if (membership?.status === "ACTIVE" && membership.billingCycle !== "trial") {
      return NextResponse.json(
        { error: "Already an active subscriber" },
        { status: 400 },
      );
    }

    if (membership?.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "Membership suspended" },
        { status: 403 },
      );
    }

    const data = membership?.applicationData as Record<string, unknown> | null;
    const wasRejected = !!(data && (data.rejectedAt || data.rejectionNote));
    if (membership?.status === "CANCELLED" && wasRejected) {
      return NextResponse.json(
        {
          error:
            "Your application was reviewed and not accepted. Please contact support if circumstances have changed.",
        },
        { status: 403 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, name: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    try {
      const session = await createCheckoutSession({
        priceId: STRIPE_PRICES.INNER_CIRCLE,
        mode: "subscription",
        successUrl: `${baseUrl}/consilium/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/consilium`,
        customerEmail: dbUser?.email || user.email,
        metadata: { userId: user.id, product_key: "INNER_CIRCLE" },
      });

      if (!session.url) {
        return NextResponse.json(
          { error: "Failed to create checkout" },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        checkoutUrl: session.url,
      });
    } catch (error) {
      console.error("Stripe subscription error:", error);
      return NextResponse.json(
        { error: "Failed to create subscription checkout" },
        { status: 500 },
      );
    }
  });
}
