/**
 * One-shot backfill: enrolls book buyers who have NO site account
 * into the `book-buyer-no-account-push` re-engagement sequence.
 *
 * Each enrolled recipient gets a fresh 90-day `consilium-gift` JWT
 * baked into every step's HTML body. The /consilium/claim page
 * verifies that token and creates the account + activates a 30-day
 * gift membership on one button press.
 *
 * Idempotent: skips anyone already enrolled in this sequence.
 *
 * Required env vars:
 *   DATABASE_URL - prod or staging postgres
 *   JWT_SECRET   - same secret /consilium/claim verifies against
 *
 * Run (dry-run):
 *   $env:DATABASE_URL="..."; $env:JWT_SECRET="..."; npx tsx scripts/enroll-accountless-book-buyers.ts --dry
 *
 * Run (live):
 *   $env:DATABASE_URL="..."; $env:JWT_SECRET="..."; npx tsx scripts/enroll-accountless-book-buyers.ts
 */
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { buildBookBuyerNoAccountPush } from "../lib/email-sequences";

const prisma = new PrismaClient();
const DRY = process.argv.includes("--dry");

function mintClaimToken(email: string, name: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET env var is required. /consilium/claim verifies against it.",
    );
  }
  return jwt.sign(
    {
      type: "consilium-gift",
      email: email.toLowerCase(),
      name: name || "Reader",
      v: 1,
    },
    secret,
    { algorithm: "HS256", expiresIn: "90d" },
  );
}

async function main() {
  // Verify JWT_SECRET before doing anything else so a misconfig fails
  // fast rather than after partial enrollment.
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env var required.");
  }

  // productVariant=null = the standalone $24.99 book purchase.
  // Filters out bundle SKUs (BOOK_CONSILIUM_*), Ask-Kanika packs,
  // and historical mistyped QUIZ rows (cleaned 2026-05-15).
  const buyers = await prisma.purchase.findMany({
    where: {
      type: "BOOK",
      status: "COMPLETED",
      productVariant: null,
    },
    select: { customerEmail: true, customerName: true },
    distinct: ["customerEmail"],
  });

  let enrolled = 0;
  let skippedHasAccount = 0;
  let skippedAlreadyEnrolled = 0;
  const enrolledEmails: string[] = [];

  for (const buyer of buyers) {
    const emailLower = buyer.customerEmail.toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: emailLower },
      select: { id: true },
    });
    if (user) {
      skippedHasAccount++;
      continue;
    }

    const existing = await prisma.emailQueue.findFirst({
      where: {
        recipientEmail: buyer.customerEmail,
        sequence: "book-buyer-no-account-push",
      },
      select: { id: true },
    });
    if (existing) {
      skippedAlreadyEnrolled++;
      continue;
    }

    const name = buyer.customerName || "Reader";
    const claimToken = mintClaimToken(buyer.customerEmail, name);
    const entries = buildBookBuyerNoAccountPush(
      buyer.customerEmail,
      name,
      { claimToken },
    );

    if (!DRY) {
      await prisma.emailQueue.createMany({ data: entries });
    }
    enrolled++;
    enrolledEmails.push(buyer.customerEmail);
  }

  console.log("\n══ ENROLLMENT SUMMARY ══");
  console.log(`  Total distinct book buyers:        ${buyers.length}`);
  console.log(`  Enrolled (account-less):           ${enrolled}${DRY ? " (DRY RUN)" : ""}`);
  console.log(`  Skipped, already has account:      ${skippedHasAccount}`);
  console.log(`  Skipped, already enrolled:         ${skippedAlreadyEnrolled}`);

  if (enrolledEmails.length > 0 && DRY) {
    console.log("\n══ ENROLLED EMAILS (preview) ══");
    enrolledEmails.slice(0, 25).forEach((e) => console.log(`  ${e}`));
    if (enrolledEmails.length > 25) {
      console.log(`  ...and ${enrolledEmails.length - 25} more`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
