import crypto from "node:crypto";
import { getStripe } from "@/lib/stripe";
import { MEMBERSHIP } from "@/lib/constants";

/**
 * The quiz buyer's reward: their first month of the Consilium at $4.99.
 *
 * It used to be a flat $9.99 off, matching the quiz price. Against the old
 * $29 membership that was a third off; against $9 it would have been a free
 * month, which gives away the entry rung rather than discounting it. So the
 * coupon is now sized to land the first month exactly on $4.99, and it is
 * derived from both prices rather than typed, because a hand-typed 401 would
 * quietly become the wrong discount the moment either number moved.
 *
 * The id changed because it had to. A Stripe coupon's `amount_off` is
 * immutable: the old `quiz-credit-999` had already been redeemed twice and
 * could not be edited, only replaced. Leave it in place for anyone still
 * holding an unredeemed code against it.
 */
const QUIZ_CREDIT_COUPON_ID = "quiz-first-month-499";

/**
 * The retired $9.99-off coupon. Codes issued against it are still honoured.
 *
 * At the time of the switch two unredeemed codes were still live, both
 * expiring within a week. Refusing them would have quietly broken a promise
 * made at the moment someone paid for the quiz, which is the worst possible
 * moment to break one. Stripe caps a discount at the invoice total, so an
 * old code now buys a free first month rather than $9.99 off $9. Two people,
 * one month, and the exposure ends when the last code expires.
 *
 * This entry can be deleted once no active promotion codes hang off it.
 */
const QUIZ_CREDIT_LEGACY_COUPON_ID = "quiz-credit-999";
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
      couponId !== QUIZ_CREDIT_LEGACY_COUPON_ID
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
 * These are not the same number and never were. Stripe applies a discount;
 * the buyer cares what they pay. While the discount happened to equal the
 * quiz price the two could be conflated, and every surface quoted the
 * discount ("your $9.99 credit"). Now the promise is a price: your first
 * month is $4.99. `discount` stays exported for anywhere that genuinely
 * needs the amount coming off.
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
