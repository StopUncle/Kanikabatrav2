import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { isPactPreset } from "@/lib/pact/presets";

/**
 * Blood Pact subscription lifecycle, called from the Stripe webhook.
 *
 * Kept out of the webhook route so that file only gains thin call sites:
 * every consilium handler already looks up CommunityMembership by
 * subscription id, and when that misses, it hands the id here. The two
 * products never share a subscription, so "not consilium" plus "is pact"
 * partitions cleanly.
 *
 * State machine mirrors CommunityMembership exactly, with one addition:
 * when the subscription truly ends (deleted, refunded), the active Pact row
 * gets brokenAt stamped. That is the scar. Suspensions (dunning, pauses) do
 * NOT break the pact; a failed card is not a broken promise.
 */

export type PactProductKey = "PACT_WEEKLY" | "PACT_ANNUAL";

export function isPactProductKey(key: string): key is PactProductKey {
  return key === "PACT_WEEKLY" || key === "PACT_ANNUAL";
}

function fallbackExpiry(billingCycle: string): Date {
  const d = new Date();
  if (billingCycle === "annual") {
    d.setFullYear(d.getFullYear() + 1);
  } else {
    d.setDate(d.getDate() + 7);
  }
  return d;
}

/** Stamp the scar on the user's active pact, if one exists. Idempotent. */
async function breakActivePact(userId: string): Promise<void> {
  await prisma.pact.updateMany({
    where: { userId, brokenAt: null },
    data: { brokenAt: new Date() },
  });
}

/**
 * checkout.session.completed for PACT_WEEKLY / PACT_ANNUAL.
 *
 * Unlike consilium, a pact checkout can only start from inside the app
 * behind requireAuth, so the user always exists; there is no
 * create-account-from-email path. If the user cannot be resolved the event
 * is logged and dropped rather than minting a ghost account.
 */
export async function handlePactCheckoutCompleted(opts: {
  email: string;
  name: string | null;
  sessionId: string;
  subscriptionId: string;
  productKey: PactProductKey;
  amount: number;
  metadataUserId: string | null;
  preset: string;
}): Promise<void> {
  const {
    email,
    name,
    sessionId,
    subscriptionId,
    productKey,
    amount,
    metadataUserId,
    preset,
  } = opts;
  const billingCycle = productKey === "PACT_ANNUAL" ? "annual" : "weekly";

  const idempotencyKey = `ST-${sessionId}`;
  const existingPurchase = await prisma.purchase.findUnique({
    where: { paypalOrderId: idempotencyKey },
  });
  if (existingPurchase) {
    console.log(
      `[stripe-webhook] ${productKey} purchase ${idempotencyKey} already processed, skipping`,
    );
    return;
  }

  const user = metadataUserId
    ? await prisma.user.findUnique({ where: { id: metadataUserId } })
    : await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    console.error(
      "[stripe-webhook] PACT checkout could not resolve a user, dropping",
      { sessionId, metadataUserId, email },
    );
    return;
  }

  let expiresAt: Date;
  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    const periodEnd = (sub as { current_period_end?: number })
      .current_period_end;
    expiresAt = periodEnd
      ? new Date(periodEnd * 1000)
      : fallbackExpiry(billingCycle);
  } catch {
    expiresAt = fallbackExpiry(billingCycle);
  }

  await prisma.pactMembership.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      stripeSubscriptionId: subscriptionId,
      billingCycle,
      activatedAt: new Date(),
      expiresAt,
    },
    update: {
      status: "ACTIVE",
      stripeSubscriptionId: subscriptionId,
      billingCycle,
      activatedAt: new Date(),
      expiresAt,
      cancelledAt: null,
      suspendedAt: null,
      suspendReason: null,
    },
  });

  // The covenant. A re-signer gets number+1 beside their scarred rows; the
  // old record is never touched. Guarded so a duplicate webhook (which the
  // Purchase check above should already stop) cannot double-sign.
  const active = await prisma.pact.findFirst({
    where: { userId: user.id, brokenAt: null },
    select: { id: true },
  });
  if (!active) {
    const last = await prisma.pact.findFirst({
      where: { userId: user.id },
      orderBy: { number: "desc" },
      select: { number: true },
    });
    await prisma.pact.create({
      data: {
        userId: user.id,
        number: (last?.number ?? 0) + 1,
        preset: isPactPreset(preset) ? preset : "confidence",
        signedAt: new Date(),
      },
    });
  }

  captureServerAsync(user.id, ANALYTICS_EVENTS.MEMBER_ACTIVATED, {
    billing_cycle: billingCycle,
    product_key: productKey,
    pact_preset: preset,
  });

  await prisma.purchase.create({
    data: {
      type: "BOOK",
      productVariant: productKey,
      userId: user.id,
      customerEmail: email,
      customerName: name || "Member",
      amount,
      status: "COMPLETED",
      paypalOrderId: idempotencyKey,
      metadata: {
        source: "stripe",
        sessionId,
        productKey,
        billingCycle,
        subscriptionId,
        preset,
      },
    },
  });

  // Welcome email through the queue: keeps the webhook fast and gets the
  // retry machinery for free. Conversion also cancels any pending
  // abandonment nags, which would read absurd arriving after a signature.
  try {
    const recipientEmail = email.toLowerCase();
    await prisma.emailQueue.updateMany({
      where: {
        recipientEmail,
        sequence: "pact-cart-abandonment",
        status: "PENDING",
      },
      data: { status: "CANCELLED" },
    });
    const { buildPactWelcomeEntry } = await import("@/lib/email-sequences");
    await prisma.emailQueue.create({
      data: buildPactWelcomeEntry(recipientEmail, user.name || "there"),
    });
  } catch (err) {
    console.error("[pact/billing] welcome enqueue failed:", err);
  }
}

/**
 * invoice.payment_succeeded fallthrough. Returns true when the
 * subscription belonged to a pact (handled), false when it is unknown.
 * Same guards as consilium: never extend CANCELLED, only reactivate from a
 * payment-failed suspension, never shorten expiry.
 */
export async function handlePactInvoicePaid(
  subscriptionId: string,
  newExpiresAt: Date,
): Promise<boolean> {
  const membership = await prisma.pactMembership.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (!membership) return false;

  if (membership.expiresAt && membership.expiresAt >= newExpiresAt) {
    return true;
  }
  if (membership.status === "CANCELLED") return true;

  const shouldReactivate =
    membership.status === "ACTIVE" ||
    membership.suspendReason === "payment-failed";
  if (!shouldReactivate) return true;

  await prisma.pactMembership.update({
    where: { id: membership.id },
    data: {
      expiresAt: newExpiresAt,
      status: "ACTIVE",
      suspendReason: null,
      suspendedAt: null,
    },
  });
  return true;
}

/** invoice.payment_failed fallthrough. Suspends, never scars. */
export async function handlePactInvoiceFailed(
  subscriptionId: string,
): Promise<boolean> {
  const membership = await prisma.pactMembership.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (!membership) return false;
  if (membership.status === "ACTIVE") {
    await prisma.pactMembership.update({
      where: { id: membership.id },
      data: {
        status: "SUSPENDED",
        suspendedAt: new Date(),
        suspendReason: "payment-failed",
      },
    });
  }
  return true;
}

/**
 * customer.subscription.deleted fallthrough. The subscription is gone for
 * real, so this is the one place besides a refund where the pact breaks.
 */
export async function handlePactSubscriptionDeleted(
  subscriptionId: string,
): Promise<boolean> {
  const membership = await prisma.pactMembership.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (!membership) return false;
  await prisma.pactMembership.update({
    where: { id: membership.id },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });
  await breakActivePact(membership.userId);

  // Winback, voluntary breaks only. A refund or a dunning death is not a
  // decision to come back from, and the copy would read wrong.
  const voluntary = !membership.suspendedAt && !membership.suspendReason;
  if (voluntary) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: membership.userId },
        select: { email: true, name: true },
      });
      if (user?.email) {
        const recipientEmail = user.email.toLowerCase();
        const existing = await prisma.emailQueue.findFirst({
          where: {
            recipientEmail,
            sequence: "pact-winback",
            status: "PENDING",
          },
          select: { id: true },
        });
        if (!existing) {
          const { buildPactWinbackEntry } = await import(
            "@/lib/email-sequences"
          );
          await prisma.emailQueue.create({
            data: buildPactWinbackEntry(recipientEmail, user.name || "there"),
          });
        }
      }
    } catch (err) {
      console.error("[pact/billing] winback enqueue failed:", err);
    }
  }
  return true;
}

/** customer.subscription.paused fallthrough. */
export async function handlePactSubscriptionPaused(
  subscriptionId: string,
): Promise<boolean> {
  const membership = await prisma.pactMembership.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (!membership) return false;
  await prisma.pactMembership.update({
    where: { id: membership.id },
    data: {
      status: "SUSPENDED",
      suspendedAt: new Date(),
      suspendReason: "payment-paused",
    },
  });
  return true;
}

/**
 * customer.subscription.updated fallthrough. Mirrors the portal's
 * cancel-at-period-end flag and only ever advances expiry, same guards as
 * the consilium handler. A scheduled cancellation is not yet a broken pact;
 * the scar waits for subscription.deleted.
 */
export async function handlePactSubscriptionUpdated(
  subscriptionId: string,
  willCancel: boolean,
  periodEndMs: number | null,
): Promise<boolean> {
  const membership = await prisma.pactMembership.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (!membership) return false;
  const shouldAdvanceExpiry =
    periodEndMs !== null &&
    (!membership.expiresAt || new Date(periodEndMs) > membership.expiresAt);
  await prisma.pactMembership.update({
    where: { id: membership.id },
    data: {
      cancelledAt: willCancel ? (membership.cancelledAt ?? new Date()) : null,
      ...(shouldAdvanceExpiry
        ? { expiresAt: new Date(periodEndMs as number) }
        : {}),
    },
  });
  return true;
}

/**
 * charge.refunded, called by the webhook after it marks the Purchase
 * REFUNDED and recognises a PACT productVariant. Full refund = the pact
 * ends and the scar lands, same as a deletion.
 */
export async function handlePactRefund(userId: string): Promise<void> {
  await prisma.pactMembership.updateMany({
    where: { userId, status: { not: "CANCELLED" } },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      suspendReason: "refunded",
    },
  });
  await breakActivePact(userId);
}
