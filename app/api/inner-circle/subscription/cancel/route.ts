import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { cancelLemonSubscription } from "@/lib/lemonsqueezy";

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

    const lsSubscriptionId = membership.paypalSubscriptionId.replace(/^LS-/, "");

    try {
      await cancelLemonSubscription(lsSubscriptionId);
    } catch (error) {
      console.error("Lemon Squeezy cancel error:", error);
      return NextResponse.json(
        { error: "Failed to cancel subscription" },
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
