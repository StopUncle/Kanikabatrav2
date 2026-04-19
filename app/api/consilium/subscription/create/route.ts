import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status === "PENDING") {
      return NextResponse.json(
        { error: "Application must be approved before subscribing" },
        { status: 403 },
      );
    }

    if (membership.status === "ACTIVE" && membership.billingCycle !== "trial") {
      return NextResponse.json(
        { error: "Already an active subscriber" },
        { status: 400 },
      );
    }

    if (membership.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "Membership suspended" },
        { status: 403 },
      );
    }

    // CANCELLED + EXPIRED need extra logic. Both states cover two very
    // different histories, and only one of each is allowed to subscribe:
    //
    //   CANCELLED + applicationData.rejectedAt set
    //     → admin explicitly rejected this applicant. They must reapply
    //       through the form (which Kanika will re-review) — they cannot
    //       buy their way past a rejection.
    //   CANCELLED + activatedAt null + no rejectedAt
    //     → defensive: a CANCELLED row that was never paid and wasn't
    //       explicitly rejected shouldn't be a thing, but if it exists,
    //       send them through reapplication for safety.
    //   CANCELLED + activatedAt set + no rejectedAt
    //     → former paid member who cancelled. Welcome back, allow.
    //
    //   EXPIRED + activatedAt null
    //     → approved but never paid; the 14-day window lapsed. They must
    //       reapply so Kanika can re-review (they may have changed
    //       circumstances since the original application).
    //   EXPIRED + activatedAt set
    //     → former paid member whose subscription ran out. Allow renewal.
    const data = membership.applicationData as Record<string, unknown> | null;
    const wasRejected = !!(data && (data.rejectedAt || data.rejectionNote));

    if (membership.status === "CANCELLED") {
      if (wasRejected) {
        return NextResponse.json(
          {
            error:
              "Your application was reviewed and not accepted. Please reapply if circumstances have changed.",
          },
          { status: 403 },
        );
      }
      if (!membership.activatedAt) {
        return NextResponse.json(
          { error: "Please reapply to The Consilium." },
          { status: 403 },
        );
      }
      // Former paid member — fall through to allow renewal.
    }

    if (membership.status === "EXPIRED" && !membership.activatedAt) {
      return NextResponse.json(
        {
          error:
            "Your approval window expired. Please reapply to The Consilium.",
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
        metadata: { userId: user.id },
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
