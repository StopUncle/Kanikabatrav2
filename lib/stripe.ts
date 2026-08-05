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
  /**
   * The Consilium, monthly. Still the original $29 price: the 2026-07-28
   * reset briefly pointed this at the $9 price and was reverted before it
   * reached customers, and the reset has since been repriced to $19.99,
   * which needs a NEW price pair before launch.
   *
   * Stripe prices are immutable, so a reprice is always a new price plus a
   * pointer swap here. The old $29 price stays alive and active on purpose:
   * 17 live subscriptions still sit on it, and archiving a price that has
   * subscribers does not move them, it just makes the object harder to
   * reason about. They move in M9, one at a time, deliberately.
   *
   * Display copy comes from MEMBERSHIP in lib/constants. Nothing connects
   * the two automatically, so if you change one, change the other.
   */
  INNER_CIRCLE: "price_1TJug1Jv9vx5CHTwjPYeSm7E",
  /**
   * The $9/mo price, created 2026-07-28 and NOT yet in use.
   *
   * It exists on the Stripe account and nothing points at it. INNER_CIRCLE
   * briefly did, which would have charged new members $9; that was reverted
   * on 2026-07-29 before the deploy reached customers, because the reset is
   * agreed but not signed off to go live. Launching it means swapping this
   * id into INNER_CIRCLE above and moving MEMBERSHIP in lib/constants to
   * match. Do not do one without the other.
   */
  INNER_CIRCLE_NEW_9: "price_1TyFx2Jv9vx5CHTwBLpMLCze",
  /**
   * Annual Consilium plan. $90/year = two months free against $9/mo. Same
   * Stripe product as INNER_CIRCLE so members bill under one brand line.
   * Annual subscribers churn ~51% less than monthly (Recurly benchmark).
   * Nobody was on the old $290 annual price when it was replaced.
   */
  INNER_CIRCLE_ANNUAL: "price_1TY0ggJv9vx5CHTw87YoIcZn",
  /** The $90/yr price, created 2026-07-28. Unused until the reset ships. */
  INNER_CIRCLE_ANNUAL_NEW_90: "price_1TyFxCJv9vx5CHTwQYf1iVot",
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
  /**
   * The Blood Pact. $4.99/week or $149/year, no monthly on purpose: weekly
   * matches the product's cadence and annual is the commitment move.
   *
   * These read from the environment, unlike every other price above, because
   * they are the only two that do not exist yet. Hardcoding them empty meant
   * that running scripts/create-pact-product.ts (a live Stripe write, Sam's
   * to run) was only the first half of opening the product: the ids then had
   * to be pasted into this file, committed, and waited out through a Railway
   * build before anyone could pay. Reading them from Railway turns that into
   * one paste. The create route still refuses checkout while they are unset,
   * so an unconfigured deploy stays safe.
   */
  PACT_WEEKLY: process.env.STRIPE_PRICE_PACT_WEEKLY ?? "",
  PACT_ANNUAL: process.env.STRIPE_PRICE_PACT_ANNUAL ?? "",
};

/**
 * Whether the Pact can actually be bought right now.
 *
 * The door sells a product whose checkout returns 503 until the two prices
 * above exist. Zero pact memberships had ever been created when this was
 * added, which is exactly what that looks like from the outside: a member
 * picks a track, signs an oath, draws their signature, and only then meets
 * the failure. Surfaces that lead into the ceremony check this first.
 */
export function isPactCheckoutOpen(): boolean {
  return Boolean(STRIPE_PRICES.PACT_WEEKLY && STRIPE_PRICES.PACT_ANNUAL);
}

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
  /**
   * Coupon id to apply directly at checkout (e.g. the referee referral
   * reward). When set, the promo-code box is disabled: Stripe forbids
   * `discounts` and `allow_promotion_codes` together, and a checkout that
   * already carries its discount does not need the box.
   */
  discountCouponId?: string;
  /**
   * Promotion code id (`promo_...`, not the human code) to apply directly
   * at checkout, e.g. a quiz buyer's Consilium credit. Preferred over
   * `discountCouponId` for anything single-use: Stripe enforces the code's
   * own max_redemptions and expiry, and counts the redemption, which a
   * bare coupon does not. Also disables the promo-code box, since Stripe
   * forbids `discounts` and `allow_promotion_codes` together.
   */
  discountPromotionCodeId?: string;
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
    ...(options.discountPromotionCodeId
      ? { discounts: [{ promotion_code: options.discountPromotionCodeId }] }
      : options.discountCouponId
        ? { discounts: [{ coupon: options.discountCouponId }] }
        : { allow_promotion_codes: true }),
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
