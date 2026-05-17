import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

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
  const secret = request.headers.get("x-cron-secret");
  if (
    secret !== process.env.CRON_SECRET &&
    secret !== process.env.ADMIN_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const candidates = await prisma.communityMembership.findMany({
      where: {
        status: "SUSPENDED",
        suspendReason: "member-requested-pause",
        expiresAt: { lte: now },
      },
      include: {
        user: { select: { id: true, email: true } },
      },
    });

    let scanned = 0;
    let resumed = 0;
    let stripeFailed = 0;
    const errors: Array<{ membershipId: string; error: string }> = [];

    for (const m of candidates) {
      scanned++;

      if (m.paypalSubscriptionId?.startsWith("ST-")) {
        const subscriptionId = m.paypalSubscriptionId.slice(3);
        try {
          const stripe = getStripe();
          await stripe.subscriptions.update(subscriptionId, {
            pause_collection: null,
          });
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

      await prisma.communityMembership.update({
        where: { id: m.id },
        data: {
          status: "ACTIVE",
          suspendedAt: null,
          suspendReason: null,
          activatedAt: now,
        },
      });
      resumed++;
    }

    return NextResponse.json({
      success: true,
      scanned,
      resumed,
      stripeFailed,
      errors: errors.slice(0, 10),
    });
  } catch (error) {
    console.error("[cron/auto-resume-pauses] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
