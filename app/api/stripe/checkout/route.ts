import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";

/**
 * The metadata keys a caller is allowed to influence, and nothing else.
 *
 * `product_key` is deliberately absent. The webhook branches on it to decide
 * what to fulfil and never checks the amount paid, so a caller who can set it
 * pays for the cheapest SKU and claims the most expensive one: a $2 DONATION
 * carrying product_key BOOK delivers the $24.99 book, and COACHING_RETAINER
 * creates a four session record. `member_discount` is server-decided for the
 * same reason. Both are applied after this and cannot be overridden.
 */
const CLIENT_METADATA_KEYS = [
  "source",
  "quizResultId",
  "questions",
  "donor_message",
  "is_anonymous",
  "referral_code",
  "referee_reward",
] as const;

function clientMetadata(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object") return {};
  const input = raw as Record<string, unknown>;
  const safe: Record<string, string> = {};
  for (const key of CLIENT_METADATA_KEYS) {
    const value = input[key];
    // Stripe caps metadata values at 500 characters and rejects the request
    // outright above it, so trim rather than hand it a session it will refuse.
    if (typeof value === "string" && value.length > 0) {
      safe[key] = value.slice(0, 500);
    }
  }
  return safe;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceKey, email, metadata, successUrl, cancelUrl } = body;

    if (!priceKey || !STRIPE_PRICES[priceKey]) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // INNER_CIRCLE checkout must go through /api/consilium/subscription/create
    // which verifies the applicant has APPROVED status. Allowing it here would
    // let anyone bypass the manual application review by hitting this endpoint
    // directly with priceKey: "INNER_CIRCLE".
    if (priceKey === "INNER_CIRCLE") {
      return NextResponse.json(
        { error: "Membership checkout requires an approved application" },
        { status: 400 },
      );
    }

    // BOOK_MEMBER is a server-only price. The client must send priceKey
    // "BOOK" and the server decides whether to swap to the member price
    // after verifying ACTIVE Consilium membership. Accepting BOOK_MEMBER
    // directly from the client would let non-members buy at $9.99 by
    // tampering with the request body.
    if (priceKey === "BOOK_MEMBER") {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 },
      );
    }

    let resolvedPriceKey = priceKey;
    let memberDiscountApplied = false;

    // Member discount: for BOOK purchases, check if the authenticated user
    // has an ACTIVE Consilium membership. If yes, swap to BOOK_MEMBER
    // ($9.99). Otherwise the standard BOOK price ($24.99) is used.
    if (priceKey === "BOOK") {
      const userId = await optionalServerAuth();
      if (userId) {
        const membership = await checkMembership(userId);
        if (membership.isMember && membership.status === "ACTIVE") {
          resolvedPriceKey = "BOOK_MEMBER";
          memberDiscountApplied = true;
        }
      }
    }

    const priceId = STRIPE_PRICES[resolvedPriceKey];
    if (!priceId) {
      return NextResponse.json(
        { error: "Product not configured yet" },
        { status: 400 },
      );
    }

    // Auto-fill the customer email from the authenticated user if the
    // caller didn't provide one. Every product, not just the member book:
    // a logged-in buyer retyping their address at Stripe is friction at
    // the highest-intent moment, and a session with no email is one
    // Stripe can never send a recovery URL for.
    let customerEmail = email as string | undefined;
    if (!customerEmail) {
      const userId = await optionalServerAuth();
      if (userId) {
        const u = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true },
        });
        if (u?.email) customerEmail = u.email;
      }
    }

    // BOOK_CONSILIUM_*MO bundles are sold as a Stripe subscription with
    // a trial: the bundle price ($39 or $79) is charged on day 0 as a
    // one-time line item, the trial covers the bundle period (30 or 90
    // days), and the recurring INNER_CIRCLE line ($29/mo) takes over after
    // the trial. The buyer pays the bundle price today, gets the book,
    // and rolls into the standard monthly subscription unless they cancel.
    const isBundle =
      priceKey === "BOOK_CONSILIUM_1MO" || priceKey === "BOOK_CONSILIUM_3MO";

    const mode: "payment" | "subscription" = isBundle ? "subscription" : "payment";
    const trialPeriodDays = isBundle
      ? priceKey === "BOOK_CONSILIUM_1MO"
        ? 30
        : 90
      : undefined;

    // Subscription-mode bundles need the recurring price as the primary
    // line item and the one-time bundle premium as the add-on.
    const checkoutPriceId = isBundle ? STRIPE_PRICES.INNER_CIRCLE : priceId;
    const bundleAddOnPriceId = isBundle ? priceId : undefined;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    // Preserve the original productKey on metadata so the webhook's
    // existing BOOK branch fires and delivers the book exactly the same
    // way regardless of which price the member paid.
    const session = await createCheckoutSession({
      priceId: checkoutPriceId,
      mode,
      bundleAddOnPriceId,
      trialPeriodDays,
      successUrl:
        successUrl ||
        `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${priceKey}`,
      // A cancelled checkout lands back on the page that sells the thing
      // they were buying, one click from retrying, instead of the generic
      // /cancel dead end. Callers can still override.
      cancelUrl:
        cancelUrl ||
        `${baseUrl}${
          priceKey === "BOOK" ||
          priceKey === "BOOK_CONSILIUM_1MO" ||
          priceKey === "BOOK_CONSILIUM_3MO"
            ? "/book"
            : priceKey.startsWith("COACHING")
              ? "/coaching"
              : "/cancel"
        }`,
      customerEmail,
      metadata: {
        ...clientMetadata(metadata),
        // Server-owned, and last so they win even if the allowlist above ever
        // grows to include one of them by mistake.
        product_key: priceKey === "BOOK" ? "BOOK" : priceKey,
        member_discount: memberDiscountApplied ? "true" : "false",
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
      memberDiscountApplied,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
