import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status !== "SUSPENDED") {
      return NextResponse.json({ error: "No paused membership to resume" }, { status: 400 });
    }

    if (membership.suspendReason !== "member-requested-pause") {
      return NextResponse.json({ error: "This suspension cannot be self-resumed" }, { status: 403 });
    }

    // Unpause the Stripe subscription so billing resumes on the next cycle.
    if (membership.paypalSubscriptionId?.startsWith("ST-")) {
      const subscriptionId = membership.paypalSubscriptionId.slice(3);
      try {
        await stripe.subscriptions.update(subscriptionId, {
          pause_collection: null,
        });
      } catch (err) {
        console.error("[resume] failed to unpause Stripe subscription:", err);
        return NextResponse.json(
          { error: "Failed to resume billing. Please try again or contact support." },
          { status: 502 },
        );
      }
    }

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: {
        status: "ACTIVE",
        suspendedAt: null,
        suspendReason: null,
        activatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: "Welcome back! Your membership is active again." });
  });
}
