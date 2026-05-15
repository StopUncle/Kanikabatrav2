/**
 * One-shot backfill: enrolls book buyers who have a site account
 * but no active Consilium membership into the
 * `book-buyer-consilium-push` re-engagement sequence.
 *
 * Idempotent: skips anyone already enrolled in that sequence.
 *
 * Run against prod:
 *   $env:DATABASE_URL="<railway public url>"; npx tsx scripts/enroll-stranded-book-buyers.ts
 *
 * Pass --dry to preview without writing.
 */
import { PrismaClient } from "@prisma/client";
import { buildBookBuyerConsiliumPush } from "../lib/email-sequences";

const prisma = new PrismaClient();
const DRY = process.argv.includes("--dry");

async function main() {
  // Active Consilium user IDs to exclude.
  const activeMembers = await prisma.communityMembership.findMany({
    where: { status: { in: ["ACTIVE", "SUSPENDED"] } },
    select: { userId: true },
  });
  const consiliumUserIds = new Set(activeMembers.map((m) => m.userId));

  // Distinct book buyers (by lowercased email).
  const buyers = await prisma.purchase.findMany({
    where: { type: "BOOK", status: "COMPLETED" },
    select: { customerEmail: true, customerName: true, userId: true },
    distinct: ["customerEmail"],
  });

  let enrolled = 0;
  let skippedAlreadyEnrolled = 0;
  let skippedConsilium = 0;
  let skippedNoAccount = 0;
  const enrolledEmails: string[] = [];

  for (const buyer of buyers) {
    const emailLower = buyer.customerEmail.toLowerCase();

    // Need a User account to be inside the "reachable cohort." A
    // book-only buyer without an account is reachable too, but their
    // re-engagement angle is different (it needs an account-creation
    // step) and worth its own pass.
    const user = await prisma.user.findFirst({
      where: { email: emailLower },
      select: { id: true },
    });
    if (!user) {
      skippedNoAccount++;
      continue;
    }

    if (consiliumUserIds.has(user.id)) {
      skippedConsilium++;
      continue;
    }

    const existing = await prisma.emailQueue.findFirst({
      where: {
        recipientEmail: buyer.customerEmail,
        sequence: "book-buyer-consilium-push",
      },
      select: { id: true },
    });
    if (existing) {
      skippedAlreadyEnrolled++;
      continue;
    }

    const entries = buildBookBuyerConsiliumPush(
      buyer.customerEmail,
      buyer.customerName || "there",
    );

    if (!DRY) {
      await prisma.emailQueue.createMany({ data: entries });
    }
    enrolled++;
    enrolledEmails.push(buyer.customerEmail);
  }

  console.log("\n══ ENROLLMENT SUMMARY ══");
  console.log(`  Total distinct book buyers:       ${buyers.length}`);
  console.log(`  Enrolled:                         ${enrolled}${DRY ? " (DRY RUN)" : ""}`);
  console.log(`  Skipped, already in Consilium:    ${skippedConsilium}`);
  console.log(`  Skipped, no site account:         ${skippedNoAccount}`);
  console.log(`  Skipped, already enrolled:        ${skippedAlreadyEnrolled}`);

  if (enrolledEmails.length > 0) {
    console.log("\n══ ENROLLED EMAILS ══");
    enrolledEmails.forEach((e) => console.log(`  ${e}`));
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
