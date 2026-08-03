import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { cancelStripeSubscription } from "@/lib/stripe";

/**
 * Breaking the pact. The interstitial at /app/pact/break makes the member
 * type the word; this route requires it again so the ceremony cannot be
 * skipped by calling the API directly. Immediate, not at period end: a
 * broken pact that keeps quietly billing until Friday is neither broken
 * nor kept.
 *
 * Consilium-included members have no pact subscription; for them breaking
 * is purely the scar. The webhook's subscription.deleted handler will
 * arrive later for paid pacts and finds both writes already done, which it
 * treats as a no-op.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const body = (await req.json().catch(() => null)) as {
      confirm?: unknown;
    } | null;
    if (body?.confirm !== "break") {
      return NextResponse.json(
        { error: "Type the word to break it" },
        { status: 400 },
      );
    }

    const pact = await prisma.pact.findFirst({
      where: { userId: user.id, brokenAt: null },
      select: { id: true },
    });
    if (!pact) {
      return NextResponse.json({ error: "No pact to break" }, { status: 404 });
    }

    const membership = await prisma.pactMembership.findUnique({
      where: { userId: user.id },
      select: { id: true, stripeSubscriptionId: true, status: true },
    });

    if (
      membership?.stripeSubscriptionId &&
      (membership.status === "ACTIVE" || membership.status === "SUSPENDED")
    ) {
      try {
        await cancelStripeSubscription(membership.stripeSubscriptionId);
      } catch (err) {
        // Proceed with the scar regardless: the member asked to break it,
        // and a dangling sub dies in dunning. Log so it can be chased.
        console.error("[pact/break] Stripe cancel failed:", err);
      }
      await prisma.pactMembership.update({
        where: { id: membership.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      });
    }

    await prisma.pact.update({
      where: { id: pact.id },
      data: { brokenAt: new Date() },
    });

    return NextResponse.json({ success: true });
  });
}
