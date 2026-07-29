import crypto from "node:crypto";
import { getStripe } from "@/lib/stripe";
import { MEMBERSHIP } from "@/lib/constants";

/**
 * The quiz buyer's reward: $9.99 off their first month of the Consilium,
 * matching what they paid for the quiz.
 *
 * The amount is derived from the two prices rather than typed, so it cannot
 * silently become the wrong discount when either moves.
 *
 * A Stripe coupon's `amount_off` is immutable, so repricing this can only
 * ever mean pointing at a different coupon id, never editing this one.
 */
const QUIZ_CREDIT_COUPON_ID = "quiz-credit-999";

/**
 * The $4.99-first-month coupon, created 2026-07-28 for the $9 reset and NOT
 * in use.
 *
 * It briefly was: the reset pointed the code at it, which was reverted on
 * 2026-07-29 before the deploy reached customers. No promotion code was ever
 * issued against it, so nothing is holding an unredeemed code here. When the
 * reset ships, this id becomes the primary one above.
 */
const QUIZ_CREDIT_NEW_COUPON_ID = "quiz-first-month-499";
const QUIZ_CREDIT_AMOUNT_CENTS = Math.round(
  (MEMBERSHIP.price - MEMBERSHIP.quizFirstMonthPrice) * 100,
);
const QUIZ_CREDIT_EXPIRY_DAYS = 14;

let cachedCouponId: string | null = null;

/**
 * Lazily ensure the master "Quiz Credit" coupon exists on the
 * connected Stripe account. Idempotent — returns the same coupon ID
 * for the lifetime of the process, and falls back to retrieving an
 * existing coupon by stable ID so fresh deploys don't recreate it.
 */
async function ensureQuizCreditCoupon(): Promise<string> {
  if (cachedCouponId) return cachedCouponId;

  const stripe = getStripe();

  try {
    const existing = await stripe.coupons.retrieve(QUIZ_CREDIT_COUPON_ID);
    cachedCouponId = existing.id;
    return existing.id;
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code !== "resource_missing") throw err;
  }

  const created = await stripe.coupons.create({
    id: QUIZ_CREDIT_COUPON_ID,
    name: "Quiz buyer first month",
    amount_off: QUIZ_CREDIT_AMOUNT_CENTS,
    currency: "usd",
    duration: "once",
    metadata: { source: "quiz-purchase" },
  });

  cachedCouponId = created.id;
  return created.id;
}

/**
 * Generate a single-use promotion code against the master coupon.
 * The code is human-readable (QUIZ-ABCD1234) so it reads clean in
 * the results email and copies cleanly into Stripe Checkout.
 *
 * Returns null if Stripe credit generation fails — callers should
 * treat this as non-fatal (the quiz purchase still completes; the
 * buyer just doesn't get the upsell).
 */
export async function createQuizConsiliumCredit(
  quizResultId: string,
): Promise<{ code: string; expiresAt: Date } | null> {
  try {
    const couponId = await ensureQuizCreditCoupon();
    const stripe = getStripe();

    // 8 hex chars = 4 billion combinations. Collision risk against
    // the ~thousands of quiz buyers is effectively zero, and
    // Stripe's promotion-code namespace is unique per account so
    // a collision would just error out and retry on next run.
    const suffix = crypto.randomBytes(4).toString("hex").toUpperCase();
    const code = `QUIZ-${suffix}`;

    const expiresAt = new Date(
      Date.now() + QUIZ_CREDIT_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    );

    await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: couponId },
      code,
      max_redemptions: 1,
      expires_at: Math.floor(expiresAt.getTime() / 1000),
      metadata: {
        source: "quiz-purchase",
        quizResultId,
      },
    });

    return { code, expiresAt };
  } catch (err) {
    console.error("[stripe-credits] failed to create quiz credit", err);
    return null;
  }
}

/**
 * Resolve a human credit code (QUIZ-ABCD1234) to its Stripe promotion
 * code id so it can be applied directly at checkout instead of asking
 * the buyer to retype it into the promo box.
 *
 * Returns null when the code is unknown, inactive, expired, or already
 * redeemed. Callers treat that as "no discount" and continue: a credit
 * that cannot be resolved must never block someone from subscribing.
 */
export async function resolveQuizCreditPromotionCode(
  code: string,
): Promise<string | null> {
  try {
    const stripe = getStripe();
    const matches = await stripe.promotionCodes.list({
      code,
      active: true,
      limit: 1,
    });

    const promo = matches.data[0];
    if (!promo) return null;

    // Guard against a code that happens to exist but hangs off a
    // different coupon (a referral reward, a one-off campaign). Only the
    // quiz-credit coupons are redeemable through this path, current and
    // retired: someone holding an unredeemed code from before the reprice
    // was promised a credit when they paid, and gets it.
    const coupon = promo.promotion?.coupon;
    const couponId = typeof coupon === "string" ? coupon : coupon?.id;
    if (
      couponId !== QUIZ_CREDIT_COUPON_ID &&
      couponId !== QUIZ_CREDIT_NEW_COUPON_ID
    ) {
      return null;
    }

    return promo.id;
  } catch (err) {
    console.error("[stripe-credits] failed to resolve quiz credit", err);
    return null;
  }
}

/**
 * What the buyer is told, as opposed to what Stripe does.
 *
 * Stripe applies a discount; the buyer cares what they pay. Today those are
 * the same story told two ways, because the credit equals the quiz price, so
 * every surface quotes the discount: "your $9.99 credit, off your first
 * month". `firstMonthPrice` is what that leaves them paying, and it becomes
 * the headline promise when the reset ships and the flat $4.99 first month
 * replaces the credit.
 */
export const QUIZ_CREDIT = {
  /** What the buyer pays for their first month. */
  firstMonthPrice: MEMBERSHIP.quizFirstMonthPrice,
  firstMonthDisplay: MEMBERSHIP.quizFirstMonthDisplay,
  /** What Stripe takes off the first invoice. */
  discount: QUIZ_CREDIT_AMOUNT_CENTS / 100,
  expiryDays: QUIZ_CREDIT_EXPIRY_DAYS,
} as const;

/* -------------------------------------------------------------------------- */
/* Referral: referee reward (50% off first Consilium month)                   */
/* -------------------------------------------------------------------------- */

// The new joiner's reward in a two-sided referral: 50% off the first month,
// applied as a "once" coupon directly at checkout. Stable ID so we look it
// up (or lazily create it) on first use and never spin up duplicates across
// deploys, mirroring the quiz-credit coupon above.
const REFEREE_REFERRAL_COUPON_ID = "referral-referee-50pct";
export const REFEREE_REFERRAL_PERCENT_OFF = 50;

let cachedRefereeCouponId: string | null = null;

/**
 * Lazily ensure the master "referee reward" coupon exists on the connected
 * Stripe account. Idempotent: returns the same coupon ID for the lifetime of
 * the process, and retrieves an existing coupon by stable ID so fresh deploys
 * do not recreate it. Duration "once" means it discounts only the first
 * invoice, so on a monthly plan it is exactly one month at half price.
 */
export async function ensureRefereeReferralCoupon(): Promise<string> {
  if (cachedRefereeCouponId) return cachedRefereeCouponId;

  const stripe = getStripe();

  try {
    const existing = await stripe.coupons.retrieve(REFEREE_REFERRAL_COUPON_ID);
    cachedRefereeCouponId = existing.id;
    return existing.id;
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code !== "resource_missing") throw err;
  }

  const created = await stripe.coupons.create({
    id: REFEREE_REFERRAL_COUPON_ID,
    name: "Referral reward: 50% off first month",
    percent_off: REFEREE_REFERRAL_PERCENT_OFF,
    duration: "once",
    metadata: { source: "referral-referee" },
  });

  cachedRefereeCouponId = created.id;
  return created.id;
}
