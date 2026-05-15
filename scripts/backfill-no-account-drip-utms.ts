/**
 * One-shot rewrite for the book-buyer-no-account-push EmailQueue
 * rows shipped earlier today (commit ca5ac68). Their HTML body
 * contained an un-tagged /consilium/claim?token=... URL. Now that
 * /consilium/claim captures attribution from query params, retro-
 * tagging the pending sends lets us attribute claims back to which
 * email step drove them.
 *
 * For each PENDING row in that sequence, re-render the email body
 * with the current builder (which now adds utm_source / medium /
 * campaign / content) and write back. Untouched: SENT, CANCELLED,
 * FAILED rows.
 *
 * Idempotent: applies the same transform regardless of how many
 * times it runs; the result is deterministic for a given queue row.
 *
 * Required env:
 *   DATABASE_URL  - prod postgres
 *   JWT_SECRET    - to verify the embedded claimToken is still good
 *
 * Pass --dry to preview without writing.
 */
import { PrismaClient } from "@prisma/client";
import { buildBookBuyerNoAccountPush } from "../lib/email-sequences";
const prisma = new PrismaClient();
const DRY = process.argv.includes("--dry");

async function main() {
  const pending = await prisma.emailQueue.findMany({
    where: {
      sequence: "book-buyer-no-account-push",
      status: "PENDING",
    },
    select: {
      id: true,
      recipientEmail: true,
      recipientName: true,
      step: true,
      metadata: true,
    },
    orderBy: [{ recipientEmail: "asc" }, { step: "asc" }],
  });

  console.log("\n══ NO-ACCOUNT DRIP BACKFILL ══");
  console.log(`  Pending rows in scope:            ${pending.length}`);

  // Group by recipient so we can re-render the 3-step sequence once
  // per person and pick the matching step's body to write back.
  const byEmail = new Map<string, typeof pending>();
  for (const row of pending) {
    const arr = byEmail.get(row.recipientEmail) ?? [];
    arr.push(row);
    byEmail.set(row.recipientEmail, arr);
  }

  let written = 0;
  let skipped = 0;

  for (const rows of Array.from(byEmail.values())) {
    // Pull the claim token from the metadata stored on the first row.
    // All steps for a recipient share the same token (per the original
    // enroll script), so we read it once.
    const first = rows[0];
    const meta = first.metadata as Record<string, unknown> | null;
    const claimToken = typeof meta?.claimToken === "string"
      ? (meta.claimToken as string)
      : null;
    if (!claimToken) {
      console.warn(
        `  skip ${first.recipientEmail}: no claimToken in metadata`,
      );
      skipped += rows.length;
      continue;
    }

    // Re-render the full 3-step sequence so each row gets the body
    // that matches its step.
    const rebuilt = buildBookBuyerNoAccountPush(
      first.recipientEmail,
      first.recipientName,
      { claimToken },
    );

    for (const row of rows) {
      const match = rebuilt.find((e) => e.step === row.step);
      if (!match) {
        console.warn(
          `  skip row ${row.id}: no rebuilt entry for step ${row.step}`,
        );
        skipped++;
        continue;
      }
      if (!DRY) {
        await prisma.emailQueue.update({
          where: { id: row.id },
          data: { htmlBody: match.htmlBody, subject: match.subject },
        });
      }
      written++;
    }
  }

  console.log(`  Rewritten:                        ${written}${DRY ? " (DRY RUN)" : ""}`);
  console.log(`  Skipped:                          ${skipped}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
