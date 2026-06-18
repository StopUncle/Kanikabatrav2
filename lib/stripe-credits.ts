import crypto from "node:crypto";
import { getStripe } from "@/lib/stripe";
import { QUIZ_INFO } from "@/lib/quiz-data";

// $9.99 off once, applied to the first invoice. Stable ID means we
// look it up (or lazily create it) on first use and never spin up
// duplicates across deploys.
const QUIZ_CREDIT_COUPON_ID = "quiz-credit-999";
const QUIZ_CREDIT_AMOUNT_CENTS = Math.round(QUIZ_INFO.price * 100);
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
    name: "Quiz Credit",
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

export const QUIZ_CREDIT = {
  amount: QUIZ_INFO.price,
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
