/**
 * Comp a copy of the book to an address: create a COMPLETED BOOK purchase with a
 * real download token, then send the standard delivery email.
 *
 * This is the manual equivalent of the BOOK branch of the Stripe webhook. Unlike
 * scripts/send-book-success-email.ts (which fakes the token and whose links 404),
 * the links this sends actually resolve.
 *
 * Idempotent: paypalOrderId is COMP-BOOK-<email>, so a second run for the same
 * address fails on the unique constraint instead of granting twice.
 *
 * Usage:
 *   npx tsx scripts/comp-book.ts <email> [name] [PREMIUM|STANDARD] [--dry-run]
 *
 * Requires DATABASE_URL to point at the target database (prod: DATABASE_PUBLIC_URL
 * from Railway) and SMTP or Resend credentials in the environment.
 */

import * as dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env.local" });
dotenv.config();

// .env.local carries localhost for local dev. Delivery links must be absolute
// and public, so pin the production origin unless the caller says otherwise.
process.env.NEXT_PUBLIC_BASE_URL =
  process.env.BOOK_BASE_URL || "https://kanikarose.com";

const DOWNLOAD_WINDOW_DAYS = 30;

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const [email, nameArg, variantArg] = argv.filter((a) => !a.startsWith("--"));

  if (!email) {
    console.error(
      "Usage: npx tsx scripts/comp-book.ts <email> [name] [PREMIUM|STANDARD] [--dry-run]",
    );
    process.exit(1);
  }

  const { prisma } = await import("../lib/prisma");
  const { sendBookDelivery } = await import("../lib/email");
  const { bookPurchaseWhere } = await import("../lib/book/ownership");

  const name = nameArg || "there";
  const variant = (variantArg || "PREMIUM").toUpperCase();
  if (variant !== "PREMIUM" && variant !== "STANDARD") {
    console.error(`Unknown variant "${variant}". Use PREMIUM or STANDARD.`);
    process.exit(1);
  }

  const dbHost = (process.env.DATABASE_URL || "").split("@")[1] || "unknown";
  console.log(`Database: ${dbHost}`);
  console.log(`Origin:   ${process.env.NEXT_PUBLIC_BASE_URL}`);
  console.log(`Target:   ${email} ("${name}", ${variant})`);
  console.log("");

  // Variant-aware on purpose: `type: "BOOK"` alone also matches the
  // subscription rows the webhook writes for idempotency (Consilium,
  // Pact, Ask packs), which would refuse a comp to anyone who merely
  // subscribed. bookPurchaseWhere is the canonical "owns the book" test.
  const existing = await prisma.purchase.findFirst({
    where: bookPurchaseWhere(email),
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, amount: true, expiresAt: true },
  });

  if (existing) {
    console.log("This address already has a completed BOOK purchase:");
    console.log(
      `  ${existing.id}  $${existing.amount}  bought ${existing.createdAt.toISOString().slice(0, 10)}  expires ${existing.expiresAt?.toISOString().slice(0, 10) ?? "never"}`,
    );
    console.log("");
    console.log(
      "Refusing to comp a second copy. To resend, rotate the token on that row instead.",
    );
    await prisma.$disconnect();
    process.exit(1);
  }

  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + DOWNLOAD_WINDOW_DAYS);

  if (dryRun) {
    console.log("DRY RUN. Would create:");
    console.log(
      JSON.stringify(
        {
          type: "BOOK",
          productVariant: variant,
          customerEmail: email,
          customerName: name,
          amount: 0,
          status: "COMPLETED",
          paypalOrderId: `COMP-BOOK-${email.toLowerCase()}`,
          downloadToken: `${downloadToken.slice(0, 8)}… (${downloadToken.length} chars)`,
          maxDownloads: 10,
          expiresAt: expiresAt.toISOString(),
          metadata: { comped: true, grantedVia: "scripts/comp-book.ts" },
        },
        null,
        2,
      ),
    );
    console.log("");
    console.log("Would then send the book delivery email. Nothing was written.");
    await prisma.$disconnect();
    return;
  }

  const purchase = await prisma.purchase.create({
    data: {
      type: "BOOK",
      productVariant: variant,
      customerEmail: email,
      customerName: name,
      amount: 0,
      status: "COMPLETED",
      paypalOrderId: `COMP-BOOK-${email.toLowerCase()}`,
      downloadToken,
      maxDownloads: 10,
      expiresAt,
      metadata: {
        comped: true,
        grantedVia: "scripts/comp-book.ts",
        grantedAt: new Date().toISOString(),
      },
    },
    select: { id: true },
  });

  console.log(`Created purchase ${purchase.id}`);

  const sent = await sendBookDelivery(
    email,
    name,
    downloadToken,
    variant,
    expiresAt,
  );

  if (!sent) {
    console.error("");
    console.error(
      `Email failed to send. The grant is live, so the links work: reuse token ${downloadToken}`,
    );
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`Sent. Links valid until ${expiresAt.toISOString().slice(0, 10)}.`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
