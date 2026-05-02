/**
 * Backfills local CommunityMembership.expiresAt to match Stripe's
 * authoritative current_period_end for active subs whose local
 * expiresAt has drifted. Surfaced by the Apr-30 audit:
 *
 *   sub_1TPzo7Jv9vx5CHTwK0ZwMwpW (cmodyrxfl0001pt011tke1op8) — 30d drift
 *   sub_1TQ2uzJv9vx5CHTw5B7pervD (cmoe5vbqq0009oy01ditjsd4r) — 30d drift
 *
 * Both members will renew correctly per Stripe; this only fixes the
 * "Renews on" date displayed in the dashboard. Idempotent — re-running
 * after Stripe state has changed will resync.
 *
 * Run: see audit-stripe-subs.ts for the env-passing pattern.
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
    select: { id: true, paypalSubscriptionId: true, expiresAt: true },
  });

  console.log(`Auditing ${rows.length} active Stripe-backed memberships`);
  let fixed = 0;

  for (const row of rows) {
    const subId = row.paypalSubscriptionId!.slice(3);
    try {
      const sub = await stripe.subscriptions.retrieve(subId);
      const subAny = sub as unknown as {
        current_period_end?: number;
        items?: { data?: Array<{ current_period_end?: number }> };
      };
      const periodEndSec =
        subAny.current_period_end ??
        subAny.items?.data?.[0]?.current_period_end;
      if (typeof periodEndSec !== "number") continue;
      const stripeEnd = new Date(periodEndSec * 1000);
      const localEnd = row.expiresAt;
      if (!localEnd) continue;
      const driftDays =
        Math.abs(stripeEnd.getTime() - localEnd.getTime()) / 86_400_000;
      if (driftDays < 1) continue;

      await p.communityMembership.update({
        where: { id: row.id },
        data: { expiresAt: stripeEnd },
      });
      console.log(
        `  fixed ${row.id} (${subId}): ${localEnd.toISOString().slice(0, 10)} → ${stripeEnd.toISOString().slice(0, 10)} (was ${driftDays.toFixed(1)}d off)`,
      );
      fixed++;
    } catch (err) {
      console.error(`  error on ${row.id} (${subId}): ${(err as Error).message}`);
    }
  }

  console.log(`\nFixed ${fixed} membership(s).`);
  await p.$disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
