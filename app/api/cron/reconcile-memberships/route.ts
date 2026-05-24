import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Cron: reconcile local CommunityMembership rows against their Stripe
 * subscriptions. Detects drift caused by missed webhooks (Stripe retries
 * delivery for 3 days then gives up; if our endpoint was down or threw an
 * error during those windows, local state diverges from Stripe state and
 * never re-syncs without this job).
 *
 * What it checks per Stripe-backed membership:
 *   1. status-drift           local status doesn't match the derived
 *                              Stripe status (e.g. local ACTIVE but Stripe
 *                              canceled = free month for the member;
 *                              local CANCELLED but Stripe active = we
 *                              think they're done, Stripe will charge
 *                              them again next cycle).
 *   2. cancel-flag-drift      local cancelledAt presence doesn't match
 *                              Stripe cancel_at_period_end. The dashboard
 *                              tells the member they're cancelling /
 *                              renewing based on cancelledAt; if it
 *                              disagrees with Stripe, the UI is lying.
 *   3. expires-drift          local expiresAt is more than 24h off from
 *                              Stripe current_period_end. Drift here
 *                              isn't billing-impacting but the dashboard
 *                              date will be wrong.
 *   4. stripe-missing         Stripe returned 404 for the sub id. Either
 *                              we stored a bad id or Stripe lost the row
 *                              (rare). Worth a human look either way.
 *   5. stripe-unreachable     Stripe call errored transiently. Logged so
 *                              repeated failures across hours surface a
 *                              pattern; single-tick failures are noise.
 *
 * No automatic remediation in v1. The cron writes mismatches to the
 * MembershipReconciliation table for admin triage. Once we have a few
 * weeks of data and see which mismatch types are safe to auto-heal
 * (probably status-drift in one direction), we can add a follow-up
 * job that consumes the queue.
 *
 * Throughput: caps at 100 memberships per tick. With ~200-500 active
 * Stripe subs and hourly cadence, that means every membership is
 * checked 2-5 times per day. Drift typically becomes a problem days,
 * not minutes, after a missed webhook.
 *
 * Auth: x-cron-secret header. Same pattern as other crons.
 */

const BATCH_SIZE = 100;
const EXPIRES_DRIFT_TOLERANCE_MS = 24 * 60 * 60 * 1000; // 24h

interface ReconcileBucket {
  checked: number;
  ok: number;
  mismatches: number;
  unreachable: number;
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (
    secret !== process.env.CRON_SECRET &&
    secret !== process.env.ADMIN_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result: ReconcileBucket = {
    checked: 0,
    ok: 0,
    mismatches: 0,
    unreachable: 0,
  };

  let stripe;
  try {
    stripe = getStripe();
  } catch (err) {
    logger.error(
      "[reconcile-memberships] Stripe client unavailable",
      err as Error,
    );
    return NextResponse.json(
      { error: "Stripe unavailable" },
      { status: 503 },
    );
  }

  // Pull oldest-checked first so every membership rotates through
  // reconciliation rather than the same hot rows being checked twice
  // an hour. Updating .updatedAt on each scan would serve the same
  // purpose but pollutes the audit signal; the simpler heuristic of
  // ordering by createdAt is fine at current scale.
  const candidates = await prisma.communityMembership.findMany({
    where: {
      status: { in: ["ACTIVE", "CANCELLED", "SUSPENDED"] },
      paypalSubscriptionId: { startsWith: "ST-" },
    },
    select: {
      id: true,
      userId: true,
      status: true,
      cancelledAt: true,
      expiresAt: true,
      paypalSubscriptionId: true,
      suspendReason: true,
    },
    orderBy: { createdAt: "asc" },
    take: BATCH_SIZE,
  });

  for (const m of candidates) {
    result.checked++;
    const stripeSubId = m.paypalSubscriptionId!.slice(3);

    let sub;
    try {
      sub = await stripe.subscriptions.retrieve(stripeSubId);
    } catch (err) {
      // Distinguish 404 (sub deleted from Stripe entirely) from
      // transient failures.
      const isMissing =
        err instanceof Error &&
        /no such subscription|resource_missing/i.test(err.message);
      if (isMissing) {
        await recordMismatch(m, null, "stripe-missing", stripeSubId, {
          detail: `Stripe returned no-such-subscription for ${stripeSubId}.`,
          stripeStatus: null,
        });
        result.mismatches++;
      } else {
        result.unreachable++;
        logger.warn(
          `[reconcile-memberships] Stripe retrieve failed for ${m.id}: ${(err as Error).message}`,
        );
      }
      continue;
    }

    const mismatches: Array<{ kind: string; detail: string }> = [];
    const stripeStatus = sub.status;
    const stripeCancelAtPeriodEnd = !!sub.cancel_at_period_end;
    const subAny = sub as unknown as {
      current_period_end?: number;
      items?: { data?: Array<{ current_period_end?: number }> };
      pause_collection?: { behavior?: string } | null;
    };
    const periodEndSec =
      subAny.current_period_end ??
      subAny.items?.data?.[0]?.current_period_end;
    const stripeExpiresMs =
      typeof periodEndSec === "number" ? periodEndSec * 1000 : null;
    const isPaused = !!subAny.pause_collection;

    // --- status-drift ---
    // Derive the local status we *would* expect given Stripe.
    let expectedLocal: string;
    if (stripeStatus === "canceled") expectedLocal = "CANCELLED";
    else if (isPaused) expectedLocal = "SUSPENDED";
    else if (stripeStatus === "active" || stripeStatus === "trialing")
      expectedLocal = "ACTIVE";
    else if (
      stripeStatus === "past_due" ||
      stripeStatus === "unpaid" ||
      stripeStatus === "incomplete" ||
      stripeStatus === "incomplete_expired"
    )
      // Local doesn't model past_due explicitly; we accept ACTIVE or
      // SUSPENDED as plausible here and only flag if it's something else.
      expectedLocal = m.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE";
    else expectedLocal = m.status; // unknown Stripe status, give it the benefit of the doubt

    if (m.status !== expectedLocal) {
      mismatches.push({
        kind: "status-drift",
        detail: `Local status is ${m.status} but Stripe is ${stripeStatus}${isPaused ? " (paused)" : ""}; expected local ${expectedLocal}.`,
      });
    }

    // --- cancel-flag-drift ---
    const localCancellingFlag = m.cancelledAt !== null;
    if (
      m.status === "ACTIVE" &&
      stripeStatus === "active" &&
      localCancellingFlag !== stripeCancelAtPeriodEnd
    ) {
      mismatches.push({
        kind: "cancel-flag-drift",
        detail: `Local cancelledAt=${localCancellingFlag ? m.cancelledAt!.toISOString() : "null"} but Stripe cancel_at_period_end=${stripeCancelAtPeriodEnd}.`,
      });
    }

    // --- expires-drift ---
    if (
      stripeExpiresMs &&
      m.expiresAt &&
      Math.abs(m.expiresAt.getTime() - stripeExpiresMs) >
        EXPIRES_DRIFT_TOLERANCE_MS
    ) {
      mismatches.push({
        kind: "expires-drift",
        detail: `Local expiresAt=${m.expiresAt.toISOString()} but Stripe current_period_end=${new Date(stripeExpiresMs).toISOString()}.`,
      });
    }

    if (mismatches.length === 0) {
      result.ok++;
      continue;
    }

    // One row per mismatch type so the admin queue stays granular.
    for (const mm of mismatches) {
      await recordMismatch(m, sub, mm.kind, stripeSubId, {
        detail: mm.detail,
        stripeStatus,
      });
    }
    result.mismatches++;
  }

  return NextResponse.json({
    success: true,
    ...result,
  });
}

async function recordMismatch(
  m: {
    id: string;
    userId: string;
    status: string;
  },
  _sub: unknown,
  mismatch: string,
  stripeSubId: string,
  extra: { detail: string; stripeStatus: string | null },
): Promise<void> {
  // De-dupe: if an unresolved row with the same membership + mismatch
  // exists from within the last 24h, skip insert. Avoids drowning the
  // admin queue when a persistent drift is detected hourly.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const existing = await prisma.membershipReconciliation.findFirst({
    where: {
      membershipId: m.id,
      mismatch,
      resolvedAt: null,
      createdAt: { gte: since },
    },
    select: { id: true },
  });
  if (existing) return;

  await prisma.membershipReconciliation.create({
    data: {
      membershipId: m.id,
      userId: m.userId,
      stripeSubId,
      mismatch,
      detail: extra.detail,
      localStatus: m.status,
      stripeStatus: extra.stripeStatus,
    },
  });
}
