/**
 * Audits all ACTIVE community memberships with a Stripe-backed
 * subscription, checks the live Stripe state, and reports any that:
 *   - have cancel_at_period_end=true (will lapse)
 *   - have a non-active Stripe status
 *   - have local expiresAt drifting from Stripe current_period_end
 *
 * Run: railway run npx tsx scripts/audit-stripe-subs.ts
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

config();

async function main() {
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    process.exit(1);
  }
  const stripe = new Stripe(STRIPE_KEY);
  const p = new PrismaClient();

  const rows = await p.communityMembership.findMany({
    where: {
      status: "ACTIVE",
      paypalSubscriptionId: { startsWith: "ST-" },
    },
    select: {
      id: true,
      userId: true,
      paypalSubscriptionId: true,
      expiresAt: true,
      cancelledAt: true,
    },
  });

  console.log(`Active Stripe-backed memberships: ${rows.length}`);
  console.log("");
  console.log(
    "STATUS              SUB ID                              STRIPE   CAP    PERIOD-END  DRIFT",
  );
  console.log("=".repeat(90));

  const issues: string[] = [];
  for (const row of rows) {
    const subId = row.paypalSubscriptionId!.slice(3);
    try {
      const sub = await stripe.subscriptions.retrieve(subId);
      const stripeStatus = sub.status;
      const cap = sub.cancel_at_period_end;
      // current_period_end moved to subscription items in recent Stripe
      // API versions. Try the legacy top-level field first, then fall
      // back to the items array.
      const subAny = sub as unknown as {
        current_period_end?: number;
        items?: { data?: Array<{ current_period_end?: number }> };
      };
      const periodEndSec =
        subAny.current_period_end ??
        subAny.items?.data?.[0]?.current_period_end;
      if (typeof periodEndSec !== "number") {
        throw new Error("no current_period_end found on subscription");
      }
      const periodEnd = new Date(periodEndSec * 1000);
      const expiresAt = row.expiresAt;
      const drift = expiresAt
        ? Math.abs(periodEnd.getTime() - expiresAt.getTime()) / 86_400_000
        : null;

      const flag = cap
        ? "WILL-CANCEL"
        : stripeStatus === "active"
          ? "OK"
          : stripeStatus.toUpperCase();
      console.log(
        `${flag.padEnd(20)}${subId.padEnd(36)}${stripeStatus.padEnd(9)}${String(cap).padEnd(7)}${periodEnd.toISOString().slice(0, 10)}  ${drift?.toFixed(1) ?? "-"}d`,
      );

      if (cap) issues.push(`${row.userId} (${subId}): cancel_at_period_end=true`);
      if (stripeStatus !== "active")
        issues.push(`${row.userId} (${subId}): stripe status=${stripeStatus}`);
      if (drift !== null && drift > 1)
        issues.push(
          `${row.userId} (${subId}): expiresAt drifts ${drift.toFixed(1)}d from stripe`,
        );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`ERROR              ${subId.padEnd(36)} ${msg}`);
      issues.push(`${row.userId} (${subId}): stripe lookup failed (${msg})`);
    }
  }

  console.log("");
  console.log(`Issues found: ${issues.length}`);
  for (const i of issues) console.log("  -", i);
  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
