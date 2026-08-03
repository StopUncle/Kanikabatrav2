import { NextRequest, NextResponse } from "next/server";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";
import { isPactPreset } from "@/lib/pact/presets";

/**
 * Start Blood Pact checkout. Weekly or annual, never monthly.
 *
 * The signature is drawn BEFORE this is called (commitment first, payment
 * second), so the preset and the signature strokes ride along in metadata
 * and the webhook creates the Pact row only once money has actually moved.
 * Signature data does NOT go through Stripe metadata (500-char value limit);
 * the sign page stashes it client-side and posts it to /api/pact/signature
 * after the sealed page loads.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let billingCycle: "weekly" | "annual" = "weekly";
    let preset = "";
    try {
      const body = (await req.json()) as {
        billingCycle?: unknown;
        preset?: unknown;
      };
      if (body.billingCycle === "annual") billingCycle = "annual";
      if (typeof body.preset === "string") preset = body.preset;
    } catch {
      // Empty body, fine.
    }

    if (!isPactPreset(preset)) {
      return NextResponse.json(
        { error: "Choose a track before signing" },
        { status: 400 },
      );
    }

    const priceId =
      billingCycle === "annual"
        ? STRIPE_PRICES.PACT_ANNUAL
        : STRIPE_PRICES.PACT_WEEKLY;
    const productKey =
      billingCycle === "annual" ? "PACT_ANNUAL" : "PACT_WEEKLY";

    // The price ids are pasted in after scripts/create-pact-product.ts runs
    // against the live account. Until then the Pact is not on sale, and this
    // route says so rather than sending anyone to a broken checkout.
    if (!priceId.startsWith("price_")) {
      return NextResponse.json(
        { error: "The Pact is not open yet" },
        { status: 503 },
      );
    }

    const membership = await prisma.pactMembership.findUnique({
      where: { userId: user.id },
    });

    if (membership?.status === "ACTIVE") {
      return NextResponse.json(
        { error: "Your pact is already signed and active" },
        { status: 400 },
      );
    }

    if (
      membership?.status === "SUSPENDED" &&
      membership.suspendReason === "payment-failed" &&
      membership.stripeSubscriptionId
    ) {
      // A live subscription in dunning. A second subscription would
      // double-bill; the fix is updating the card so Stripe's retry fires
      // invoice.payment_succeeded, which reactivates.
      return NextResponse.json(
        {
          error:
            "Your pact is still here. The last payment did not go through.",
          action: "portal",
        },
        { status: 409 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, name: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    try {
      const session = await createCheckoutSession({
        priceId,
        mode: "subscription",
        successUrl: `${baseUrl}/app/pact/sealed?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/app/pact`,
        customerEmail: dbUser?.email || user.email,
        metadata: {
          userId: user.id,
          product_key: productKey,
          billing_cycle: billingCycle,
          pact_preset: preset,
        },
      });

      if (!session.url) {
        return NextResponse.json(
          { error: "Failed to create checkout" },
          { status: 500 },
        );
      }

      // Abandonment drip, idempotent per recipient. The webhook cancels
      // these on conversion. Failures never block checkout.
      try {
        const recipientEmail = (dbUser?.email || user.email).toLowerCase();
        const existing = await prisma.emailQueue.findFirst({
          where: {
            recipientEmail,
            sequence: "pact-cart-abandonment",
            status: "PENDING",
          },
          select: { id: true },
        });
        if (!existing) {
          const { buildPactAbandonmentDrip } = await import(
            "@/lib/email-sequences"
          );
          await prisma.emailQueue.createMany({
            data: buildPactAbandonmentDrip(
              recipientEmail,
              dbUser?.name || "there",
            ),
          });
        }
      } catch (err) {
        console.error("[pact/subscription/create] abandonment enqueue failed:", err);
      }

      captureServerAsync(user.id, ANALYTICS_EVENTS.CHECKOUT_STARTED, {
        billing_cycle: billingCycle,
        product_key: productKey,
        pact_preset: preset,
      });

      return NextResponse.json({ success: true, checkoutUrl: session.url });
    } catch (error) {
      console.error("[pact/subscription/create] Stripe error:", error);
      return NextResponse.json(
        { error: "Failed to create subscription checkout" },
        { status: 500 },
      );
    }
  });
}
