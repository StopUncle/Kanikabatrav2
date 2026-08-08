import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { cancelStripeSubscription } from "@/lib/stripe";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { logger } from "@/lib/logger";

/**
 * Stripe's way of saying the subscription is not there. Either it never
 * existed or it is already cancelled and swept; both mean there is
 * nothing left to stop, which is the state we were trying to reach.
 */
function isAlreadyGone(err: unknown): boolean {
  const e = err as { code?: string; statusCode?: number; message?: string };
  return (
    e?.code === "resource_missing" ||
    (e?.statusCode === 404 && /no such subscription/i.test(e?.message ?? ""))
  );
}

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
      select: { id: true, number: true, preset: true, startedAt: true },
    });
    if (!pact) {
      return NextResponse.json({ error: "No pact to break" }, { status: 404 });
    }

    const membership = await prisma.pactMembership.findUnique({
      where: { userId: user.id },
      select: { id: true, stripeSubscriptionId: true, status: true },
    });

    const billing =
      membership?.stripeSubscriptionId &&
      (membership.status === "ACTIVE" || membership.status === "SUSPENDED")
        ? membership
        : null;

    // Money first, and it either works or nothing else happens.
    //
    // This used to swallow the Stripe failure and scar the pact anyway,
    // on the reasoning that a dangling subscription dies in dunning. It
    // does, but only after charging them again, while their record says
    // the pact is over and the app shows them no billing to cancel. That
    // is the one outcome worse than the break not going through: the
    // member is out of the product and still paying, with no signal
    // anywhere. So a genuine Stripe failure now aborts the whole thing
    // and says so, and the member can retry or use the portal.
    if (billing?.stripeSubscriptionId) {
      try {
        await cancelStripeSubscription(billing.stripeSubscriptionId);
      } catch (err) {
        // A subscription Stripe has never heard of, or has already
        // deleted, is not a failure to cancel: it is already cancelled.
        // Treating it as an error would trap anyone whose row points at a
        // stale id, permanently unable to break their own pact.
        if (!isAlreadyGone(err)) {
          logger.error("[pact/break] stripe cancel failed", err as Error, {
            userId: user.id,
            subscriptionId: billing.stripeSubscriptionId,
          });
          return NextResponse.json(
            {
              error:
                "We could not stop the billing just now, so we have left your pact standing rather than break it while you are still being charged. Try again in a moment, or use Manage billing on your profile.",
            },
            { status: 502 },
          );
        }
        logger.warn("[pact/break] stripe subscription already gone", {
          userId: user.id,
          subscriptionId: billing.stripeSubscriptionId,
        });
      }
    }

    // Claim the break. Conditional on brokenAt still being null, so two
    // concurrent submits cannot both pass the read above and then both
    // count as churn. The loser reports success: the pact is broken,
    // which is what the caller asked for.
    const claimed = await prisma.pact.updateMany({
      where: { id: pact.id, brokenAt: null },
      data: { brokenAt: new Date() },
    });
    if (claimed.count === 0) {
      return NextResponse.json({ success: true, alreadyBroken: true });
    }

    if (billing) {
      await prisma.pactMembership.update({
        where: { id: billing.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      });
    }

    // Churn, with the shape of it: how far they got and what the record
    // said when they walked. A pact broken at week one with no scars is a
    // different problem from one broken at week six with four.
    const [kept, scarred] = await Promise.all([
      prisma.pactEntry.count({ where: { pactId: pact.id, status: "kept" } }),
      prisma.pactEntry.count({ where: { pactId: pact.id, status: "scarred" } }),
    ]);
    captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_BROKEN, {
      pact_preset: pact.preset,
      pact_number: pact.number,
      weeks_kept: kept,
      weeks_scarred: scarred,
      ever_activated: pact.startedAt !== null,
      had_subscription: !!membership?.stripeSubscriptionId,
    });

    return NextResponse.json({ success: true });
  });
}
