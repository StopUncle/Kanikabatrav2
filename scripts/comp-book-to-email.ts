/**
 * Comp a copy of the Sociopathic Dating Bible to a single email address.
 * Creates a real COMPLETED Purchase row with a fresh 30-day download token
 * (same shape as a Stripe BOOK purchase) and sends the production delivery
 * email, so every download link in it actually resolves.
 *
 * Idempotent: if the address already has a live BOOK purchase (unexpired,
 * downloads remaining), its token is reused and the email is simply re-sent.
 *
 * Required env vars:
 *   DATABASE_URL             - prod postgres
 *   RESEND_API_KEY or SMTP_* - email transport (see lib/email.ts)
 *
 * Usage:
 *   npx tsx scripts/comp-book-to-email.ts <email> [name] [--dry]
 */

import * as dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env.local" });
dotenv.config();

const DRY = process.argv.includes("--dry");

async function main() {
  const [email, nameArg] = process.argv.slice(2).filter((a) => a !== "--dry");
  if (!email || !email.includes("@")) {
    console.error(
      "Usage: npx tsx scripts/comp-book-to-email.ts <email> [name] [--dry]",
    );
    process.exit(1);
  }
  const name = nameArg || "Reader";

  const { PrismaClient } = await import("@prisma/client");
  const { sendBookDelivery } = await import("../lib/email");
  const prisma = new PrismaClient();

  try {
    const existing = await prisma.purchase.findFirst({
      where: {
        customerEmail: { equals: email, mode: "insensitive" },
        type: "BOOK",
        status: "COMPLETED",
        downloadToken: { not: null },
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    let downloadToken: string;
    let expiresAt: Date;

    if (
      existing &&
      existing.downloadToken &&
      existing.downloadCount < existing.maxDownloads
    ) {
      downloadToken = existing.downloadToken;
      expiresAt = existing.expiresAt!;
      console.log(
        `Live purchase ${existing.id} already exists for ${email} (expires ${expiresAt.toISOString()}). Reusing its token.`,
      );
    } else {
      downloadToken = crypto.randomBytes(32).toString("hex");
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      if (DRY) {
        console.log(
          `[dry] Would create comp BOOK purchase for ${email} ("${name}") expiring ${expiresAt.toISOString()}.`,
        );
      } else {
        const purchase = await prisma.purchase.create({
          data: {
            type: "BOOK",
            customerEmail: email,
            customerName: name,
            amount: 0,
            status: "COMPLETED",
            paypalOrderId: `COMP-${crypto.randomBytes(12).toString("hex")}`,
            downloadToken,
            expiresAt,
            maxDownloads: 10,
            metadata: { source: "comp-book-to-email" },
          },
        });
        console.log(`Created comp purchase ${purchase.id} for ${email}.`);
      }
    }

    if (DRY) {
      console.log(`[dry] Would send book delivery email to ${email}.`);
      return;
    }

    console.log(`Sending book delivery email to ${email} (as "${name}")...`);
    const ok = await sendBookDelivery(email, name, downloadToken, null, expiresAt);
    if (ok) {
      console.log("Sent. All download links in the email are live.");
    } else {
      console.error(
        "Email transport returned false. The purchase row exists, so re-run this script to retry the send without creating a duplicate.",
      );
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
