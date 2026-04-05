import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

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
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "No membership found" },
        { status: 404 },
      );
    }

    if (membership.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Membership is not active" },
        { status: 400 },
      );
    }

    if (!membership.paypalSubscriptionId) {
      return NextResponse.json(
        { error: "No subscription to cancel" },
        { status: 400 },
      );
    }

    // Cancel at PayPal
    const accessToken = await getPayPalAccessToken();
    const cancelRes = await fetch(
      `${PAYPAL_API}/v1/billing/subscriptions/${membership.paypalSubscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason: "User requested cancellation" }),
      },
    );

    if (!cancelRes.ok && cancelRes.status !== 204) {
      console.error("PayPal cancel error:", cancelRes.status);
      return NextResponse.json(
        { error: "Failed to cancel subscription with PayPal" },
        { status: 500 },
      );
    }

    // Set status to CANCELLED and cancelledAt, but preserve expiresAt
    // so the user keeps access until their current paid period ends.
    // The checkMembership lazy expiry will revoke access when expiresAt passes.
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Subscription cancelled. You will retain access until the end of your current billing period.",
      expiresAt: membership.expiresAt?.toISOString(),
    });
  });
}
