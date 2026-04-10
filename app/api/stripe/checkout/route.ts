import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceKey, email, metadata, successUrl, cancelUrl } = body;

    if (!priceKey || !STRIPE_PRICES[priceKey]) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // INNER_CIRCLE checkout must go through /api/inner-circle/subscription/create
    // which verifies the applicant has APPROVED status. Allowing it here would
    // let anyone bypass the manual application review by hitting this endpoint
    // directly with priceKey: "INNER_CIRCLE".
    if (priceKey === "INNER_CIRCLE") {
      return NextResponse.json(
        { error: "Membership checkout requires an approved application" },
        { status: 400 },
      );
    }

    const priceId = STRIPE_PRICES[priceKey];
    if (!priceId) {
      return NextResponse.json(
        { error: "Product not configured yet" },
        { status: 400 },
      );
    }

    // Determine mode based on product
    const mode = priceKey === "INNER_CIRCLE" ? "subscription" : "payment";

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    const session = await createCheckoutSession({
      priceId,
      mode: mode as "payment" | "subscription",
      successUrl:
        successUrl ||
        `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${priceKey}`,
      cancelUrl: cancelUrl || `${baseUrl}/cancel`,
      customerEmail: email,
      metadata: {
        product_key: priceKey,
        ...metadata,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
