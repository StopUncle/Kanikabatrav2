import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { resolveReferralCode, REFERRER_REWARD_CENTS } from "@/lib/referrals";
import { logger } from "@/lib/logger";

/**
 * Convert a pending referral on successful Consilium checkout.
 *
 * Flow:
 *   1. Resolve the code to a referrer.
 *   2. Refuse self-referrals (cookie set on the referrer's own browser).
 *   3. Refuse if the referee already has a CONVERTED referral on record
 *      (UNIQUE constraint on Referral.refereeUserId enforces this at
 *      the DB level too; this just gives us a clean log line).
 *   4. Upsert a Referral row with status CONVERTED.
 *   5. Credit the referrer's Stripe customer balance by $29 so it
 *      deducts off their next invoice. If the referrer has no Stripe
 *      customer (gift-only / never paid), we record the referral as
 *      CONVERTED without a rewardTxnId; admin can grant the credit
 *      manually when they next subscribe.
 *
 * Failures are logged + swallowed so a referral mishap never blocks
 * the wider checkout flow.
 */
export async function recordReferralConversion(args: {
  referralCode: string;
  refereeUserId: string;
  refereeEmail: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const { referralCode, refereeUserId, refereeEmail } = args;

  try {
    const referrer = await resolveReferralCode(referralCode);
    if (!referrer) return { ok: false, reason: "code-not-found" };
    if (referrer.id === refereeUserId) {
      return { ok: false, reason: "self-referral" };
    }

    const existing = await prisma.referral.findUnique({
      where: { refereeUserId },
    });
    if (existing?.status === "CONVERTED") {
      return { ok: false, reason: "already-converted" };
    }

    // Credit the referrer in Stripe. We look up the referrer's Stripe
    // customer id via their ACTIVE membership (which carries the
    // subscription id and therefore the customer). If they have no
    // sub yet, skip the credit, the referral still counts.
    let rewardTxnId: string | null = null;
    const referrerMembership = await prisma.communityMembership.findUnique({
      where: { userId: referrer.id },
      select: { paypalSubscriptionId: true },
    });
    const stripeSubId = referrerMembership?.paypalSubscriptionId?.startsWith(
      "ST-",
    )
      ? referrerMembership.paypalSubscriptionId.slice(3)
      : null;

    if (stripeSubId) {
      try {
        const stripe = getStripe();
        const sub = await stripe.subscriptions.retrieve(stripeSubId);
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
        if (customerId) {
          const txn = await stripe.customers.createBalanceTransaction(
            customerId,
            {
              amount: -REFERRER_REWARD_CENTS, // negative = credit
              currency: "usd",
              description: `Referral reward: ${refereeEmail} joined via your link`,
              metadata: {
                source: "referral",
                refereeEmail,
                refereeUserId,
                referrerId: referrer.id,
              },
            },
          );
          rewardTxnId = txn.id;
        }
      } catch (err) {
        logger.error(
          "[referrals] stripe credit failed; recording referral without reward",
          err as Error,
          { referrerId: referrer.id, refereeUserId },
        );
      }
    }

    await prisma.referral.upsert({
      where: { refereeUserId },
      create: {
        referrerId: referrer.id,
        refereeUserId,
        refereeEmail: refereeEmail.toLowerCase(),
        status: "CONVERTED",
        rewardTxnId,
        convertedAt: new Date(),
      },
      update: {
        status: "CONVERTED",
        rewardTxnId,
        convertedAt: new Date(),
      },
    });

    return { ok: true };
  } catch (err) {
    logger.error(
      "[referrals] conversion handler threw",
      err as Error,
      { referralCode, refereeUserId },
    );
    return { ok: false, reason: "exception" };
  }
}
