import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { stripe } from "@/lib/stripe";

const ALLOWED_PAUSE_DAYS = new Set([30, 60, 90]);

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let days = 30;
    try {
      const body = (await req.json()) as { days?: unknown };
      if (typeof body.days === "number" && ALLOWED_PAUSE_DAYS.has(body.days)) {
        days = body.days;
      }
    } catch {
      // Empty body is fine, falls back to 30.
    }

    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status !== "ACTIVE") {
      return NextResponse.json({ error: "No active membership to pause" }, { status: 400 });
    }

    // Pause the actual Stripe subscription so the user isn't charged on the
    // next cycle. Without this the local DB lies, we mark them SUSPENDED
    // but Stripe keeps billing. `pause_collection` with `void` is the right
    // mode for member-requested pauses; we keep the subscription itself
    // alive so resume is just unpause.
    if (membership.paypalSubscriptionId?.startsWith("ST-")) {
      const subscriptionId = membership.paypalSubscriptionId.slice(3);
      try {
        await stripe.subscriptions.update(subscriptionId, {
          pause_collection: { behavior: "void" },
        });
      } catch (err) {
        console.error("[pause] failed to pause Stripe subscription:", err);
        return NextResponse.json(
          { error: "Failed to pause billing. Please try again or contact support." },
          { status: 502 },
        );
      }
    }

    const pauseUntil = new Date();
    pauseUntil.setDate(pauseUntil.getDate() + days);

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: {
        status: "SUSPENDED",
        suspendedAt: new Date(),
        suspendReason: "member-requested-pause",
        expiresAt: pauseUntil,
      },
    });

    return NextResponse.json({
      success: true,
      pausedUntil: pauseUntil.toISOString(),
      days,
      message: `Your membership has been paused for ${days} days. You can resume anytime.`,
    });
  });
}
