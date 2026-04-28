import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, STRIPE_PRICES } from "@/lib/stripe";

/**
 * One-click resubscribe for bundle buyers whose access has ended (or is
 * about to). Linked from the expiry-reminder email; turns a click into
 * a Stripe Checkout for the standard INNER_CIRCLE subscription ($29/mo)
 * without forcing the user to re-apply.
 *
 * Flow:
 *   1. Email contains /api/consilium/bundle-resubscribe?token=<JWT>
 *   2. JWT carries { userId, type: "bundle-resub" }, signed with JWT_SECRET,
 *      14-day expiry. Tokens are not single-use; sharing a link only lets
 *      another buyer pay for the original user's subscription, which is a
 *      non-issue because Stripe still requires their card.
 *   3. On valid token: look up the user, create a Stripe Checkout Session
 *      in subscription mode for INNER_CIRCLE, 302-redirect to checkout.url.
 *   4. On invalid/expired token: 302-redirect to /consilium?status=expired
 *      so the user lands on the standard Consilium pitch page.
 */

interface ResubTokenPayload {
  userId: string;
  type: "bundle-resub";
  iat?: number;
  exp?: number;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  if (!token) {
    return NextResponse.redirect(
      `${baseUrl}/consilium?status=resub-no-token`,
      302,
    );
  }

  let payload: ResubTokenPayload;
  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as ResubTokenPayload;
  } catch {
    return NextResponse.redirect(
      `${baseUrl}/consilium?status=resub-token-expired`,
      302,
    );
  }

  if (payload.type !== "bundle-resub" || !payload.userId) {
    return NextResponse.redirect(
      `${baseUrl}/consilium?status=resub-token-invalid`,
      302,
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return NextResponse.redirect(
      `${baseUrl}/consilium?status=resub-user-missing`,
      302,
    );
  }

  // If the user already has an active paying subscription, don't create
  // a duplicate. Send them to the dashboard.
  const membership = await prisma.communityMembership.findUnique({
    where: { userId: user.id },
    select: { status: true, paypalSubscriptionId: true, billingCycle: true },
  });

  const alreadySubscribed =
    membership?.status === "ACTIVE" &&
    membership.paypalSubscriptionId !== null &&
    !membership.billingCycle.startsWith("bundle");

  if (alreadySubscribed) {
    return NextResponse.redirect(`${baseUrl}/consilium/feed`, 302);
  }

  try {
    const session = await createCheckoutSession({
      priceId: STRIPE_PRICES.INNER_CIRCLE,
      mode: "subscription",
      successUrl: `${baseUrl}/consilium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/consilium`,
      customerEmail: user.email,
      metadata: {
        userId: user.id,
        product_key: "INNER_CIRCLE",
        source: "bundle-resub",
      },
    });

    if (!session.url) {
      console.error(
        `[bundle-resubscribe] Stripe returned no checkout URL for user ${user.id}`,
      );
      return NextResponse.redirect(
        `${baseUrl}/consilium?status=resub-stripe-error`,
        302,
      );
    }

    return NextResponse.redirect(session.url, 302);
  } catch (err) {
    console.error("[bundle-resubscribe] failed to create checkout:", err);
    return NextResponse.redirect(
      `${baseUrl}/consilium?status=resub-stripe-error`,
      302,
    );
  }
}
