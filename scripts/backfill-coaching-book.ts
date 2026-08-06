/**
 * Every coaching package promises "Includes the Sociopathic Dating Bible",
 * but until 2026-08-06 the webhook's COACHING branch never delivered it.
 * This backfills the gap: for each COMPLETED coaching purchase whose email
 * owns no real book row, mint the zero-amount BOOK row (variant COACHING)
 * the webhook now writes, and send the delivery email.
 *
 * Dry run (default):  DATABASE_URL=<prod> npx tsx scripts/backfill-coaching-book.ts
 * Execute:            DATABASE_URL=<prod> npx tsx scripts/backfill-coaching-book.ts --send
 * One buyer only:     add --only <email or purchase id>
 *
 * Idempotent: skips any coaching purchase that already has its -BOOK row,
 * and any email that already owns the book some other way.
 */

import * as dotenv from "dotenv";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { bookPurchaseWhere } from "../lib/book/ownership";
import { sendBookDelivery } from "../lib/email";

dotenv.config({ path: ".env.local" });
dotenv.config();

// .env.local carries localhost for local dev. Delivery links must be absolute
// and public, so pin the production origin.
process.env.NEXT_PUBLIC_BASE_URL = "https://kanikarose.com";

const SEND = process.argv.includes("--send");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1]?.toLowerCase() : null;

async function main() {
  const coaching = await prisma.purchase.findMany({
    where: { type: "COACHING", status: "COMPLETED" },
    orderBy: { createdAt: "desc" },
  });

  console.log(`${coaching.length} completed coaching purchases found.`);

  for (const p of coaching) {
    if (
      ONLY &&
      p.id !== ONLY &&
      p.customerEmail.toLowerCase() !== ONLY
    ) {
      continue;
    }

    const bookKey = `${p.paypalOrderId ?? `BF-${p.id}`}-BOOK`;

    const alreadyBackfilled = await prisma.purchase.findUnique({
      where: { paypalOrderId: bookKey },
      select: { id: true },
    });
    if (alreadyBackfilled) {
      console.log(`SKIP  ${p.customerEmail}  (already backfilled)`);
      continue;
    }

    const ownsBook = await prisma.purchase.findFirst({
      where: bookPurchaseWhere(p.customerEmail),
      select: { id: true },
    });
    if (ownsBook) {
      console.log(`SKIP  ${p.customerEmail}  (already owns the book)`);
      continue;
    }

    if (!SEND) {
      console.log(
        `WOULD DELIVER  ${p.customerEmail}  $${p.amount}  ${p.createdAt.toISOString()}  (${p.id})`,
      );
      continue;
    }

    const downloadToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.purchase.create({
      data: {
        type: "BOOK",
        productVariant: "COACHING",
        customerEmail: p.customerEmail,
        customerName: p.customerName,
        amount: 0,
        status: "COMPLETED",
        paypalOrderId: bookKey,
        downloadToken,
        expiresAt,
        maxDownloads: 10,
        metadata: { source: "backfill-coaching-book", coachingPurchaseId: p.id },
      },
    });

    const sent = await sendBookDelivery(
      p.customerEmail,
      p.customerName,
      downloadToken,
      null,
      expiresAt,
    );

    console.log(
      `${sent ? "DELIVERED" : "ROW CREATED, EMAIL FAILED"}  ${p.customerEmail}  (${p.id})`,
    );
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
