import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceKey, email, metadata, successUrl, cancelUrl } = body;

    if (!priceKey || !STRIPE_PRICES[priceKey]) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // INNER_CIRCLE checkout must go through /api/consilium/subscription/create
    // which verifies the applicant has APPROVED status. Allowing it here would
    // let anyone bypass the manual application review by hitting this endpoint
    // directly with priceKey: "INNER_CIRCLE".
    if (priceKey === "INNER_CIRCLE") {
      return NextResponse.json(
        { error: "Membership checkout requires an approved application" },
        { status: 400 },
      );
    }

    // BOOK_MEMBER is a server-only price. The client must send priceKey
    // "BOOK" and the server decides whether to swap to the member price
    // after verifying ACTIVE Consilium membership. Accepting BOOK_MEMBER
    // directly from the client would let non-members buy at $9.99 by
    // tampering with the request body.
    if (priceKey === "BOOK_MEMBER") {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 },
      );
    }

    let resolvedPriceKey = priceKey;
    let memberDiscountApplied = false;

    // Member discount: for BOOK purchases, check if the authenticated user
    // has an ACTIVE Consilium membership. If yes, swap to BOOK_MEMBER
    // ($9.99). Otherwise the standard BOOK price ($24.99) is used.
    if (priceKey === "BOOK") {
      const userId = await optionalServerAuth();
      if (userId) {
        const membership = await checkMembership(userId);
        if (membership.isMember && membership.status === "ACTIVE") {
          resolvedPriceKey = "BOOK_MEMBER";
          memberDiscountApplied = true;
        }
      }
    }

    const priceId = STRIPE_PRICES[resolvedPriceKey];
    if (!priceId) {
      return NextResponse.json(
        { error: "Product not configured yet" },
        { status: 400 },
      );
    }

    // Auto-fill the customer email from the authenticated user if the
    // caller didn't provide one. Makes the member-book flow seamless.
    let customerEmail = email as string | undefined;
    if (!customerEmail && resolvedPriceKey === "BOOK_MEMBER") {
      const userId = await optionalServerAuth();
      if (userId) {
        const u = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true },
        });
        if (u?.email) customerEmail = u.email;
      }
    }

    // Determine mode based on product. BOOK and BOOK_MEMBER are one-time
    // payments; only INNER_CIRCLE is a subscription, and it's gated out
    // above anyway.
    const mode: "payment" | "subscription" = "payment";

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    // Preserve the original productKey on metadata so the webhook's
    // existing BOOK branch fires and delivers the book exactly the same
    // way regardless of which price the member paid.
    const session = await createCheckoutSession({
      priceId,
      mode,
      successUrl:
        successUrl ||
        `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${priceKey}`,
      cancelUrl: cancelUrl || `${baseUrl}/cancel`,
      customerEmail,
      metadata: {
        product_key: priceKey === "BOOK" ? "BOOK" : priceKey,
        member_discount: memberDiscountApplied ? "true" : "false",
        ...metadata,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
      memberDiscountApplied,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
