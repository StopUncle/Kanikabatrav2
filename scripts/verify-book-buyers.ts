/**
 * Read-only verification that the gift-consilium-to-book-buyers query
 * targets ACTUAL paying book buyers — not bundles, not refunds, not
 * account-only rows. Prints a sample for human eyeballing before the
 * live send.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Tightened filter: only REAL paying book buyers.
  //   - type BOOK, status COMPLETED (basic gate)
  //   - NOT bundle purchases (IC-BOOK-*, those already get Consilium)
  //   - NOT backfill placeholders (MANUAL-*, those are $0 quiz-unlock rows
  //     from an older script — these people bought on Amazon/KDP, not here)
  //   - amount >= 15 — the book's cheapest real price was $24.99, presale
  //     was $34.99. Anything under $15 is a quiz-unlock or test row that
  //     got mis-typed as BOOK.
  const purchases = await prisma.purchase.findMany({
    where: {
      type: "BOOK",
      status: "COMPLETED",
      amount: { gte: 15 },
      NOT: [
        { paypalOrderId: { startsWith: "IC-BOOK-" } },
        { paypalOrderId: { contains: "MANUAL" } },
      ],
    },
    select: {
      id: true,
      customerEmail: true,
      customerName: true,
      amount: true,
      paypalOrderId: true,
      productVariant: true,
      status: true,
      type: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`Total BOOK purchases (status=COMPLETED, not bundle): ${purchases.length}`);
  console.log();

  // Breakdown: amount distribution (should all be ~$24.99 for the real book)
  const byAmount = new Map<number, number>();
  for (const p of purchases) {
    byAmount.set(p.amount, (byAmount.get(p.amount) ?? 0) + 1);
  }
  console.log("Amount distribution:");
  for (const [amt, n] of Array.from(byAmount.entries()).sort((a, b) => b[1] - a[1])) {
    console.log(`  $${amt} — ${n} purchases`);
  }
  console.log();

  // Breakdown: paypalOrderId prefix (tells us Stripe vs PayPal vs weird)
  const byPrefix = new Map<string, number>();
  for (const p of purchases) {
    const prefix = p.paypalOrderId ? p.paypalOrderId.slice(0, 3) : "(null)";
    byPrefix.set(prefix, (byPrefix.get(prefix) ?? 0) + 1);
  }
  console.log("Order-id prefixes (ST- = Stripe, others = PayPal/legacy):");
  for (const [prefix, n] of Array.from(byPrefix.entries()).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${prefix}... — ${n}`);
  }
  console.log();

  // Show 5 oldest + 5 newest so we can eyeball the shape across history
  console.log("Oldest 5 purchases:");
  for (const p of purchases.slice(0, 5)) {
    console.log(
      `  ${p.createdAt.toISOString().slice(0, 10)}  $${p.amount}  ${p.customerEmail}  id=${p.paypalOrderId?.slice(0, 16) ?? "null"}`,
    );
  }
  console.log();
  console.log("Newest 5 purchases:");
  for (const p of purchases.slice(-5)) {
    console.log(
      `  ${p.createdAt.toISOString().slice(0, 10)}  $${p.amount}  ${p.customerEmail}  id=${p.paypalOrderId?.slice(0, 16) ?? "null"}`,
    );
  }
  console.log();

  // Cross-check: any rows that look suspicious
  const zeroAmount = purchases.filter((p) => p.amount === 0);
  const nullOrderId = purchases.filter((p) => !p.paypalOrderId);
  const lowAmount = purchases.filter((p) => p.amount < 10);
  console.log("Suspicious-check:");
  console.log(`  amount = 0:        ${zeroAmount.length}`);
  console.log(`  amount < $10:      ${lowAmount.length}`);
  console.log(`  null paypalOrderId: ${nullOrderId.length}`);
  if (zeroAmount.length > 0) {
    console.log("  Zero-amount rows (need review):");
    for (const p of zeroAmount.slice(0, 20)) {
      console.log(`    ${p.customerEmail} · id=${p.paypalOrderId ?? "null"} · ${p.createdAt.toISOString().slice(0, 10)}`);
    }
  }
  if (lowAmount.length > 0) {
    console.log("  Low-amount rows (need review):");
    for (const p of lowAmount.slice(0, 20)) {
      console.log(`    ${p.customerEmail} · $${p.amount} · id=${p.paypalOrderId ?? "null"} · ${p.createdAt.toISOString().slice(0, 10)}`);
    }
  }

  // Also check: are there users who have an account but NO paid purchase?
  // (These should NOT get the gift — the script already only queries
  // Purchase, so account-only users are never touched. Sanity-confirm by
  // counting).
  const userCount = await prisma.user.count();
  const bookBuyerEmails = new Set(purchases.map((p) => p.customerEmail.toLowerCase()));
  const usersWithoutBookPurchase = await prisma.user.findMany({
    where: { email: { notIn: Array.from(bookBuyerEmails) } },
    select: { email: true },
  });
  console.log();
  console.log(`Total users in DB: ${userCount}`);
  console.log(`Book-buyer emails: ${bookBuyerEmails.size} unique`);
  console.log(
    `Users WITHOUT a book purchase (these never get the gift): ${usersWithoutBookPurchase.length}`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
