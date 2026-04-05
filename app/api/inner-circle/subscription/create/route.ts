import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

const COMMUNITY_PLAN_ID = process.env.PAYPAL_COMMUNITY_PLAN_ID;

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    if (!COMMUNITY_PLAN_ID) {
      return NextResponse.json(
        { error: "Community subscription plan not configured" },
        { status: 500 },
      );
    }

    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status === "PENDING") {
      return NextResponse.json(
        { error: "Application must be approved before subscribing" },
        { status: 403 },
      );
    }

    if (membership.status === "ACTIVE" && membership.billingCycle !== "trial") {
      return NextResponse.json(
        { error: "Already an active subscriber" },
        { status: 400 },
      );
    }

    if (membership.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "Membership suspended" },
        { status: 403 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, name: true },
    });

    const accessToken = await getPayPalAccessToken();

    const subscriptionRes = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        plan_id: COMMUNITY_PLAN_ID,
        subscriber: {
          name: { given_name: dbUser?.name || "Member" },
          email_address: dbUser?.email || user.email,
        },
        application_context: {
          brand_name: "Kanika Batra — The Inner Circle",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inner-circle/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/inner-circle?cancelled=true`,
        },
      }),
    });

    const subscription = await subscriptionRes.json();

    if (!subscriptionRes.ok) {
      console.error("PayPal subscription error:", subscription);
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 500 },
      );
    }

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: { paypalSubscriptionId: subscription.id },
    });

    const approveLink = subscription.links?.find(
      (l: { rel: string }) => l.rel === "approve",
    );

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      approveUrl: approveLink?.href,
    });
  });
}
