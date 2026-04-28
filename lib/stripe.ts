import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Keep backward compat export — lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Product prices — create these in Stripe Dashboard with clean names
// After creating, fill in the price IDs (starts with price_)
export const STRIPE_PRICES: Record<string, string> = {
  BOOK: "price_1TJufzJv9vx5CHTwnijydfaY",
  /**
   * Member-exclusive book price. Used by /api/stripe/checkout when the
   * authenticated buyer has an ACTIVE Consilium membership. Never exposed
   * as a priceKey to the client — the swap happens server-side so the
   * standard $24.99 BOOK key cannot be manipulated into $9.99 by a
   * non-member via devtools.
   */
  BOOK_MEMBER: "price_1TNS57Jv9vx5CHTw3Miq2KmS",
  QUIZ: "price_1TJug0Jv9vx5CHTwa9tjzDlu",
  INNER_CIRCLE: "price_1TJug1Jv9vx5CHTwjPYeSm7E",
  COACHING_SINGLE: "price_1TJug1Jv9vx5CHTw6FT0vzoW",
  COACHING_CLARITY: "price_1TN3uWJv9vx5CHTwUELJJn5E",
  COACHING_INTENSIVE: "price_1TJug2Jv9vx5CHTwiikiPESt",
  COACHING_CAREER: "price_1TJug3Jv9vx5CHTwU3XgjOGH",
  COACHING_RETAINER: "price_1TJug4Jv9vx5CHTwmEAoOJaf",
  ASK_WRITTEN_1Q: "price_1TJug4Jv9vx5CHTwxraDwrfD",
  ASK_WRITTEN_3Q: "price_1TJug5Jv9vx5CHTwYYFHcu3f",
  ASK_VOICE_1Q: "price_1TJug6Jv9vx5CHTwEaZ0yyS7",
  ASK_VOICE_3Q: "price_1TJug6Jv9vx5CHTwK0OanIFn",
  // Book + Consilium bundles. One-time purchase: book delivery +
  // time-boxed community access, no Stripe subscription created.
  // Membership is granted with expiresAt = now + N days and expires
  // cleanly at end of term.
  BOOK_CONSILIUM_1MO: "price_1TMpaDJv9vx5CHTwGzAnGrMz", // $39 USD, 30 days access
  BOOK_CONSILIUM_3MO: "price_1TMpaEJv9vx5CHTwfYMIfOik", // $79 USD, 90 days access
  // Custom-amount price ($2 floor / $1000 ceiling / $20 preset). The
  // Checkout Session will render an "Enter amount" field. See
  // scripts/create-donation-product.ts for the canonical create-once
  // command that produced these IDs.
  DONATION: "price_1TQiacJv9vx5CHTweR3SpX3k",
};

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

/**
 * Create a Stripe Checkout Session.
 *
 * Supports three shapes:
 *   1. mode="payment" — single one-time price (book, coaching, ask, donation).
 *   2. mode="subscription" with one recurring price — straight monthly/annual
 *      sub (INNER_CIRCLE).
 *   3. mode="subscription" with a recurring price PLUS a one-time price as
 *      `bundleAddOnPriceId`, plus `trialPeriodDays` — used for the
 *      BOOK_CONSILIUM bundles. The one-time price is charged on the first
 *      invoice; the recurring price kicks in after the trial. End result for
 *      the buyer: pays $39 (or $79) today, then $29/mo after 30 (or 90) days
 *      until they cancel.
 */
export async function createCheckoutSession(options: {
  priceId: string;
  mode: "payment" | "subscription";
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
  /** Stripe price id to add as a one-time line item alongside `priceId`. */
  bundleAddOnPriceId?: string;
  /** Trial length when bundling — keeps the recurring price free during the bundle period. */
  trialPeriodDays?: number;
}) {
  const lineItems = [
    { price: options.priceId, quantity: 1 },
  ];
  if (options.bundleAddOnPriceId) {
    lineItems.push({ price: options.bundleAddOnPriceId, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: options.mode,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    customer_email: options.customerEmail,
    metadata: options.metadata,
    allow_promotion_codes: true,
    ...(options.mode === "subscription" && options.trialPeriodDays
      ? {
          subscription_data: {
            trial_period_days: options.trialPeriodDays,
            // Mirror the session metadata onto the subscription so the
            // invoice.payment_succeeded handler can recognise
            // bundle-originated subs without doing an extra lookup.
            metadata: options.metadata,
          },
        }
      : {}),
  });

  return session;
}

/**
 * Cancel a Stripe subscription
 */
export async function cancelStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Get a Stripe subscription
 */
export async function getStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}
