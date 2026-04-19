/**
 * Read-only health check on the payment funnel. Run against prod DB
 * to surface symptoms of broken purchase flows that the Railway HTTP
 * logs aren't captured in here:
 *
 *   - Purchase rows in non-terminal states (PENDING that never settled,
 *     FAILED that need reconciliation)
 *   - Stripe-webhook orphans (Purchase without a User, or a User created
 *     by webhook with no membership row)
 *   - Recent users who hit /register but never completed a purchase
 *     (signal of a drop-off in the new instant-pay flow)
 *   - Memberships in inconsistent state (PENDING/APPROVED that should
 *     no longer exist after the application gate was removed)
 *   - Recent webhook activity by inferring from Purchase.createdAt
 */

import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const since7d = new Date(Date.now() - 7 * 86_400_000);
  const since30d = new Date(Date.now() - 30 * 86_400_000);

  console.log("\n=== PURCHASE STATUS BREAKDOWN (last 30d) ===");
  const purByStatus = await p.purchase.groupBy({
    by: ["status"],
    where: { createdAt: { gte: since30d } },
    _count: { _all: true },
  });
  for (const row of purByStatus) {
    console.log(`  ${row.status.padEnd(15)} ${row._count._all}`);
  }

  console.log("\n=== NON-COMPLETED PURCHASES (last 30d) ===");
  const stuck = await p.purchase.findMany({
    where: {
      createdAt: { gte: since30d },
      status: { not: "COMPLETED" },
    },
    orderBy: { createdAt: "desc" },
    take: 25,
    select: {
      id: true,
      type: true,
      productVariant: true,
      amount: true,
      status: true,
      customerEmail: true,
      paypalOrderId: true,
      createdAt: true,
      userId: true,
    },
  });
  if (stuck.length === 0) {
    console.log("  (none — all recent purchases completed)");
  } else {
    for (const r of stuck) {
      console.log(
        `  [${r.createdAt.toISOString().slice(0, 16)}] ${r.status.padEnd(10)} ${r.type.padEnd(14)} ${(r.productVariant ?? "").padEnd(18)} $${Number(r.amount).toFixed(2)} <${r.customerEmail ?? "?"}> stripeRef=${r.paypalOrderId ?? "—"}`,
      );
    }
  }

  console.log("\n=== RECENT PURCHASES (last 7d, all statuses) ===");
  const recent = await p.purchase.findMany({
    where: { createdAt: { gte: since7d } },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      type: true,
      productVariant: true,
      amount: true,
      status: true,
      customerEmail: true,
      paypalOrderId: true,
      createdAt: true,
      userId: true,
    },
  });
  console.log(`  ${recent.length} purchase row(s)`);
  for (const r of recent) {
    console.log(
      `  [${r.createdAt.toISOString().slice(0, 16)}] ${r.status.padEnd(10)} ${r.type.padEnd(14)} ${(r.productVariant ?? "").padEnd(18)} $${Number(r.amount).toFixed(2)} <${r.customerEmail ?? "?"}> ${r.userId ? "" : "[NO USER]"}`,
    );
  }

  console.log("\n=== ORPHAN PURCHASES (no userId) ===");
  const orphans = await p.purchase.count({
    where: { userId: null, createdAt: { gte: since30d } },
  });
  console.log(`  ${orphans} purchase row(s) without a userId in last 30d`);

  console.log("\n=== MEMBERSHIPS BY STATUS ===");
  const membershipStatus = await p.communityMembership.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  for (const row of membershipStatus) {
    console.log(`  ${row.status.padEnd(12)} ${row._count._all}`);
  }

  // Inconsistent: status PENDING / APPROVED rows still in the table.
  // After the application-gate removal, these shouldn't be created
  // anymore, so any new ones indicate a dead code path firing.
  console.log("\n=== STALE PENDING/APPROVED MEMBERSHIPS (created last 7d) ===");
  const staleApps = await p.communityMembership.findMany({
    where: {
      status: { in: ["PENDING", "APPROVED"] },
      createdAt: { gte: since7d },
    },
    include: {
      user: { select: { email: true, displayName: true, createdAt: true } },
    },
  });
  if (staleApps.length === 0) {
    console.log("  (none — application gate removal is holding)");
  } else {
    for (const m of staleApps) {
      console.log(
        `  [${m.createdAt.toISOString().slice(0, 16)}] ${m.status} <${m.user.email}> applied=${m.appliedAt.toISOString().slice(0, 10)}`,
      );
    }
  }

  console.log("\n=== STRIPE-CREATED MEMBERSHIPS (last 7d, paypalSubscriptionId starts with ST-) ===");
  const stripeSubs = await p.communityMembership.findMany({
    where: {
      paypalSubscriptionId: { startsWith: "ST-" },
      createdAt: { gte: since7d },
    },
    include: {
      user: { select: { email: true } },
    },
  });
  console.log(`  ${stripeSubs.length} Stripe subscription(s) created in last 7d`);
  for (const m of stripeSubs) {
    console.log(
      `  [${m.createdAt.toISOString().slice(0, 16)}] ${m.status.padEnd(10)} <${m.user.email}> activated=${m.activatedAt?.toISOString().slice(0, 10) ?? "—"} expires=${m.expiresAt?.toISOString().slice(0, 10) ?? "—"}`,
    );
  }

  console.log("\n=== USERS REGISTERED LAST 7d WITHOUT A PURCHASE OR MEMBERSHIP ===");
  // These are the candidates who hit /register but didn't convert.
  // Most useful drop-off signal in the new instant-pay flow.
  const orphanUsers = await p.user.findMany({
    where: {
      createdAt: { gte: since7d },
      purchases: { none: {} },
      communityMembership: null,
    },
    select: {
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  console.log(`  ${orphanUsers.length} user(s) signed up but never bought anything`);
  for (const u of orphanUsers) {
    console.log(`  [${u.createdAt.toISOString().slice(0, 16)}] <${u.email}>`);
  }

  console.log("\n=== USERS WITH MEMBERSHIP BUT NO PURCHASE (gift / trial path) ===");
  const giftUsers = await p.user.count({
    where: {
      communityMembership: { isNot: null },
      purchases: { none: {} },
    },
  });
  console.log(`  ${giftUsers} user(s) with membership but no Purchase row (gift/trial as expected)`);

  await p.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
