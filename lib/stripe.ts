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
  QUIZ: "price_1TJug0Jv9vx5CHTwa9tjzDlu",
  INNER_CIRCLE: "price_1TJug1Jv9vx5CHTwjPYeSm7E",
  COACHING_SINGLE: "price_1TJug1Jv9vx5CHTw6FT0vzoW",
  COACHING_INTENSIVE: "price_1TJug2Jv9vx5CHTwiikiPESt",
  COACHING_CAREER: "price_1TJug3Jv9vx5CHTwU3XgjOGH",
  COACHING_RETAINER: "price_1TJug4Jv9vx5CHTwmEAoOJaf",
  ASK_WRITTEN_1Q: "price_1TJug4Jv9vx5CHTwxraDwrfD",
  ASK_WRITTEN_3Q: "price_1TJug5Jv9vx5CHTwYYFHcu3f",
  ASK_VOICE_1Q: "price_1TJug6Jv9vx5CHTwEaZ0yyS7",
  ASK_VOICE_3Q: "price_1TJug6Jv9vx5CHTwK0OanIFn",
};

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession(options: {
  priceId: string;
  mode: "payment" | "subscription";
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: options.priceId, quantity: 1 }],
    mode: options.mode,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    customer_email: options.customerEmail,
    metadata: options.metadata,
    allow_promotion_codes: true,
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
