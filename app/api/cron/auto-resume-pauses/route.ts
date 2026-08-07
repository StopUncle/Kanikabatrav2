import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { getStripe, readSubscriptionPeriodEnd } from "@/lib/stripe";
import { logger } from "@/lib/logger";
import {
  MEMBER_PAUSE_REASON,
  restoreExpiryAfterPause,
} from "@/lib/community/pause";

/**
 * Cron: auto-resume member-requested pauses whose pause window has elapsed.
 *
 * When a member pauses their Consilium membership via the cancel/pause
 * modal, the pause route stores expiresAt = now + days and flips status
 * to SUSPENDED with suspendReason = member-requested-pause. Stripe
 * billing is paused with pause_collection = void.
 *
 * Nothing in Stripe auto-unpauses. Without this cron, paused members
 * would stay paused indefinitely even after the window they chose. This
 * job runs daily, finds elapsed self-pauses, calls
 * pause_collection = null on the Stripe sub, and flips local status
 * back to ACTIVE so billing resumes on the next natural cycle.
 *
 * Idempotent: re-running on the same day produces no extra effect
 * because already-resumed memberships are no longer in the candidate
 * set (status flipped to ACTIVE).
 */
export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const candidates = await prisma.communityMembership.findMany({
      where: {
        status: "SUSPENDED",
        suspendReason: MEMBER_PAUSE_REASON,
        expiresAt: { lte: now },
      },
      include: {
        user: { select: { id: true, email: true } },
      },
    });

    let scanned = 0;
    let resumed = 0;
    let stripeFailed = 0;
    let unresolvedExpiry = 0;
    const errors: Array<{ membershipId: string; error: string }> = [];

    for (const m of candidates) {
      scanned++;

      // Every row here has expiresAt <= now by definition of the query
      // above, because the pause route parks the pause deadline in that
      // field. Flipping status to ACTIVE without replacing it left the
      // member ACTIVE with an expiry in the past, and the lazy expiry in
      // lib/community/membership.ts then demoted them to EXPIRED on their
      // next page load, locking them out while Stripe kept billing.
      // Stripe is the source of truth when there is a subscription.
      let resumedExpiresAt: Date | null = null;

      if (m.paypalSubscriptionId?.startsWith("ST-")) {
        const subscriptionId = m.paypalSubscriptionId.slice(3);
        try {
          const stripe = getStripe();
          await stripe.subscriptions.update(subscriptionId, {
            pause_collection: null,
          });
          resumedExpiresAt = readSubscriptionPeriodEnd(
            await stripe.subscriptions.retrieve(subscriptionId),
          );
        } catch (err) {
          stripeFailed++;
          const message = err instanceof Error ? err.message : String(err);
          errors.push({ membershipId: m.id, error: message });
          logger.error(
            "[cron/auto-resume-pauses] stripe unpause failed",
            err as Error,
            { membershipId: m.id, userId: m.user?.id },
          );
          // Skip the DB flip so we retry tomorrow. Without the Stripe
          // unpause, flipping local to ACTIVE would lie about billing.
          continue;
        }
      }

      // No subscription to consult (a gift or comped row): give back the
      // days the pause consumed, from the date stashed at pause time.
      if (!resumedExpiresAt) {
        resumedExpiresAt = restoreExpiryAfterPause(
          m.applicationData,
          m.suspendedAt,
          now,
        );
      }

      // Resuming into an already-past date is the exact bug this cron
      // used to ship. Leave the row paused and shout instead, so it
      // retries tomorrow and an admin can see it, rather than silently
      // handing the member an account that locks itself a day later.
      if (!resumedExpiresAt || resumedExpiresAt <= now) {
        unresolvedExpiry++;
        errors.push({ membershipId: m.id, error: "no future expiry available" });
        logger.error(
          "[cron/auto-resume-pauses] cannot resolve a future expiry, leaving paused",
          new Error("unresolved expiry on resume"),
          { membershipId: m.id, userId: m.user?.id },
        );
        continue;
      }

      await prisma.communityMembership.update({
        where: { id: m.id },
        data: {
          status: "ACTIVE",
          suspendedAt: null,
          suspendReason: null,
          activatedAt: now,
          expiresAt: resumedExpiresAt,
        },
      });
      resumed++;
    }

    return NextResponse.json({
      success: true,
      scanned,
      resumed,
      stripeFailed,
      unresolvedExpiry,
      errors: errors.slice(0, 10),
    });
  } catch (error) {
    console.error("[cron/auto-resume-pauses] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
