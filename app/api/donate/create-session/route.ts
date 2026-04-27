import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, STRIPE_PRICES } from "@/lib/stripe";
import { logger } from "@/lib/logger";

const bodySchema = z.object({
  email: z.string().email().optional(),
  message: z.string().trim().max(500).optional(),
  isAnonymous: z.boolean().optional().default(false),
});

/**
 * POST /api/donate/create-session
 *
 * Creates a Stripe Checkout Session for a pay-what-you-want donation.
 * Public — no auth required, donors can be logged-out visitors.
 *
 * The DONATION price is `custom_unit_amount` (Stripe-side $2 floor /
 * $1000 ceiling / $20 default), so the Checkout page renders an "Enter
 * amount" field rather than a fixed product line. Donors set their
 * own number; min/max enforced by Stripe before payment confirmation.
 *
 * Metadata stamped on the session:
 *   - product_key: "DONATION"        — webhook router uses this to dispatch
 *   - donorMessage: free text       — shown to Kanika in the admin
 *   - isAnonymous: "true" | "false" — controls public attribution
 *
 * Webhook (`/api/webhooks/stripe` checkout.session.completed) creates a
 * Purchase row of type=DONATION and fires the thank-you email.
 */
export async function POST(req: NextRequest) {
  try {
    const body = bodySchema.parse(await req.json());

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kanikarose.com";
    const priceId = STRIPE_PRICES.DONATION;
    if (!priceId) {
      logger.error("[donate] STRIPE_PRICES.DONATION not configured");
      return NextResponse.json(
        { error: "Donations aren't available right now. Please try again later." },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      // Don't show "Apply promotion code" on a donation — feels weird.
      allow_promotion_codes: false,
      // Donate-themed wording on the Stripe-hosted page.
      submit_type: "donate",
      payment_method_types: ["card"],
      customer_email: body.email,
      success_url: `${baseUrl}/donate/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate`,
      metadata: {
        product_key: "DONATION",
        donor_message: body.message ?? "",
        is_anonymous: body.isAnonymous ? "true" : "false",
      },
      // The webhook keys off this for receipt emails; also keeps the
      // donor's message visible in the Stripe Dashboard for context.
      payment_intent_data: {
        description: "Donation to Kanika Batra",
        metadata: {
          product_key: "DONATION",
          donorMessage: body.message ?? "",
          isAnonymous: body.isAnonymous ? "true" : "false",
        },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    logger.error("[donate] failed to create session", err as Error);
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again." },
      { status: 500 },
    );
  }
}
