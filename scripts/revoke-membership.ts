// One-off: revoke a Consilium membership immediately.
//
// Cancels the Stripe subscription (no proration, immediate end) and
// updates the CommunityMembership row to CANCELLED with expiresAt=now.
// Used when a member has been refunded and wants access removed.
//
// Usage:
//   STRIPE_SECRET_KEY=<live> DATABASE_URL=<prod> npx tsx scripts/revoke-membership.ts <userId>
//
// Prints what it found before mutating. Pass --apply to actually write;
// without --apply this is a dry run.

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const apply = process.argv.includes("--apply");
const userId = process.argv.find((a) => !a.startsWith("--") && a !== process.argv[0] && a !== process.argv[1]);

if (!userId) {
  console.error("usage: tsx scripts/revoke-membership.ts <userId> [--apply]");
  process.exit(1);
}

const prisma = new PrismaClient();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is required");
  process.exit(1);
}

// No explicit apiVersion — let the installed Stripe SDK pin to its
// default. One-off script, not worth tracking the SDK's type changes.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      displayName: true,
      communityMembership: {
        select: {
          id: true,
          status: true,
          paypalSubscriptionId: true,
          activatedAt: true,
          expiresAt: true,
        },
      },
    },
  });

  if (!user) {
    console.error(`User ${userId} not found.`);
    process.exit(1);
  }

  console.log(`\nUser:        ${user.email}  (${user.displayName ?? "no displayName"})`);
  console.log(`Membership:  ${user.communityMembership?.status ?? "(no row)"}`);
  console.log(`Sub ID:      ${user.communityMembership?.paypalSubscriptionId ?? "(null)"}`);
  console.log(`ActivatedAt: ${user.communityMembership?.activatedAt?.toISOString() ?? "(null)"}`);
  console.log(`ExpiresAt:   ${user.communityMembership?.expiresAt?.toISOString() ?? "(null)"}`);

  if (!user.communityMembership) {
    console.error("\nNo CommunityMembership row to revoke.");
    process.exit(1);
  }

  // Strip the "ST-" prefix if present (the project encodes Stripe sub IDs
  // in the paypalSubscriptionId field as "ST-<id>" for backwards compat
  // with the pre-2026 PayPal schema).
  const rawSubId = user.communityMembership.paypalSubscriptionId ?? "";
  const stripeSubId = rawSubId.startsWith("ST-") ? rawSubId.slice(3) : rawSubId;

  console.log(`\nWill:`);
  if (stripeSubId) {
    console.log(`  - Stripe: cancel subscription ${stripeSubId} (immediate, no proration)`);
  } else {
    console.log(`  - Stripe: skip (no subscription ID on record)`);
  }
  console.log(`  - DB: set membership status=CANCELLED, cancelledAt=now, expiresAt=now`);

  if (!apply) {
    console.log(`\n(dry run — re-run with --apply to execute)`);
    return;
  }

  // Cancel the Stripe subscription, if any. Use a try-catch so a
  // missing/already-cancelled sub doesn't block the DB update.
  if (stripeSubId) {
    try {
      const sub = await stripe.subscriptions.cancel(stripeSubId, {
        invoice_now: false,
        prorate: false,
      });
      console.log(`\nStripe: subscription ${sub.id} → ${sub.status}`);
    } catch (err) {
      const message =
        err instanceof Stripe.errors.StripeError ? err.message : String(err);
      console.log(`\nStripe: cancel failed (continuing) — ${message}`);
    }
  }

  const now = new Date();
  await prisma.communityMembership.update({
    where: { id: user.communityMembership.id },
    data: {
      status: "CANCELLED",
      cancelledAt: now,
      expiresAt: now,
    },
  });

  console.log(`\nDB: membership ${user.communityMembership.id} → CANCELLED`);
  console.log(`Done.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
