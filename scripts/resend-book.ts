/**
 * Resend the book to someone who already bought it: rotate the download
 * token on their existing purchase, clear the download counter, reopen the
 * 30 day window, then send the standard delivery email.
 *
 * This is the "rotate the token on that row instead" that comp-book.ts
 * points at when it refuses to grant a second copy. Rotating means the old
 * links stop working, which is the point: the row keeps one live token.
 *
 * Usage:
 *   npx tsx scripts/resend-book.ts <email> [--dry-run]
 *
 * Requires DATABASE_URL to point at the target database (prod:
 * DATABASE_PUBLIC_URL from Railway) and SMTP or Resend credentials.
 */

import * as dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env.local" });
dotenv.config();

// .env.local carries localhost for local dev. Delivery links must be
// absolute and public, so pin production unless the caller says otherwise.
process.env.NEXT_PUBLIC_BASE_URL =
  process.env.BOOK_BASE_URL || "https://kanikarose.com";

const DOWNLOAD_WINDOW_DAYS = 30;

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const [email] = argv.filter((a) => !a.startsWith("--"));

  if (!email) {
    console.error("Usage: npx tsx scripts/resend-book.ts <email> [--dry-run]");
    process.exit(1);
  }

  const { prisma } = await import("../lib/prisma");
  const { sendBookDelivery } = await import("../lib/email");
  const { bookPurchaseWhere } = await import("../lib/book/ownership");

  const dbHost = (process.env.DATABASE_URL || "").split("@")[1] || "unknown";
  console.log(`Database: ${dbHost}`);
  console.log(`Origin:   ${process.env.NEXT_PUBLIC_BASE_URL}`);
  console.log(`Target:   ${email}`);
  console.log("");

  // bookPurchaseWhere is the canonical "owns the book" test. Without it a
  // plain type:"BOOK" match also hits the subscription rows the webhook
  // writes for idempotency, and this script would mint a real download
  // token onto a membership row and email the book to a non-buyer.
  const purchase = await prisma.purchase.findFirst({
    where: bookPurchaseWhere(email),
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      customerName: true,
      productVariant: true,
      downloadCount: true,
      maxDownloads: true,
      expiresAt: true,
      createdAt: true,
    },
  });

  if (!purchase) {
    console.error(`No completed book purchase found for ${email}.`);
    console.error("To grant a free copy instead, use scripts/comp-book.ts.");
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(
    `Found purchase ${purchase.id}, bought ${purchase.createdAt.toISOString().slice(0, 10)}`,
  );
  console.log(
    `  downloads used: ${purchase.downloadCount}/${purchase.maxDownloads}`,
  );
  console.log(
    `  window expires: ${purchase.expiresAt?.toISOString().slice(0, 10) ?? "never"}`,
  );
  console.log("");

  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + DOWNLOAD_WINDOW_DAYS);

  if (dryRun) {
    console.log("DRY RUN. Would rotate the token, reset downloadCount to 0,");
    console.log(`extend the window to ${expiresAt.toISOString().slice(0, 10)},`);
    console.log("and resend the delivery email. Nothing was written.");
    await prisma.$disconnect();
    return;
  }

  await prisma.purchase.update({
    where: { id: purchase.id },
    data: { downloadToken, downloadCount: 0, expiresAt },
  });

  console.log("Token rotated, counter reset.");

  const sent = await sendBookDelivery(
    email,
    purchase.customerName?.trim() || "there",
    downloadToken,
    purchase.productVariant,
    expiresAt,
  );

  if (!sent) {
    console.error("");
    console.error(
      `Email failed to send. The new links are live: reuse token ${downloadToken}`,
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
