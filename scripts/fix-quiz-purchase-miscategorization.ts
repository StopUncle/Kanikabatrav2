/**
 * One-shot data fix for the bug surfaced 2026-05-15:
 *
 *   The Stripe webhook QUIZ/DARK_MIRROR branch was writing
 *   Purchase rows with type="BOOK" instead of type="QUIZ".
 *
 * Webhook code is patched (commit alongside this script). This
 * script:
 *
 *   1. Backfills historical Purchase rows: type 'BOOK' → 'QUIZ'
 *      where productVariant ∈ ('QUIZ','DARK_MIRROR').
 *   2. Cancels pending EmailQueue rows for quiz-only buyers who
 *      got pulled into book-buyer-* drips this morning, before
 *      their first emails fire.
 *
 * Idempotent. Safe to re-run.
 *
 * Pass --dry to preview, otherwise it writes.
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const DRY = process.argv.includes("--dry");

async function main() {
  // ── 1. BACKFILL ──────────────────────────────────────────────────────────
  const toBackfill = await prisma.purchase.findMany({
    where: {
      type: "BOOK",
      productVariant: { in: ["QUIZ", "DARK_MIRROR"] },
    },
    select: { id: true, customerEmail: true, productVariant: true, amount: true },
  });

  console.log("\n══ STEP 1: PURCHASE BACKFILL ══");
  console.log(`  Rows to update (type BOOK → QUIZ): ${toBackfill.length}`);
  const sum = toBackfill.reduce((s, r) => s + r.amount, 0);
  console.log(`  Total revenue reclassified:        $${sum.toFixed(2)}`);

  if (!DRY && toBackfill.length > 0) {
    const result = await prisma.purchase.updateMany({
      where: {
        type: "BOOK",
        productVariant: { in: ["QUIZ", "DARK_MIRROR"] },
      },
      data: { type: "QUIZ" },
    });
    console.log(`  Updated: ${result.count}`);
  }

  // ── 2. IDENTIFY QUIZ-ONLY DRIP ENROLLEES ─────────────────────────────────
  // Re-read the purchase table post-backfill semantics: anyone whose ONLY
  // standalone purchase was the quiz (no real BOOK row) and got pulled
  // into a book-buyer-* sequence today.
  const allPurchases = await prisma.purchase.findMany({
    where: { status: "COMPLETED" },
    select: { customerEmail: true, type: true, productVariant: true },
  });

  // After the backfill: type=QUIZ + productVariant in (QUIZ, DARK_MIRROR)
  // means "quiz unlock". type=BOOK + productVariant=null means
  // "real standalone book". Anything else (bundles, ask-kanika) we treat
  // as "real book" for purposes of NOT unenrolling them from book-buyer-*.
  const realBookEmails = new Set<string>();
  const quizUnlockEmails = new Set<string>();
  for (const p of allPurchases) {
    const e = p.customerEmail.toLowerCase();
    // Treat productVariant=QUIZ/DARK_MIRROR as quiz unlock regardless of
    // type, so this is robust whether the backfill ran or not.
    if (
      p.productVariant === "QUIZ" ||
      p.productVariant === "DARK_MIRROR"
    ) {
      quizUnlockEmails.add(e);
    } else if (p.type === "BOOK") {
      realBookEmails.add(e);
    }
  }
  const quizOnlyEmails = new Set(
    Array.from(quizUnlockEmails).filter((e) => !realBookEmails.has(e)),
  );

  console.log("\n══ STEP 2: COHORT MAP (post-backfill) ══");
  console.log(`  Real book buyers (any variant):       ${realBookEmails.size}`);
  console.log(`  Quiz-unlock buyers (any):             ${quizUnlockEmails.size}`);
  console.log(`  Quiz-only (no book purchase ever):    ${quizOnlyEmails.size}`);

  // ── 3. CANCEL CONTAMINATED DRIP ROWS ─────────────────────────────────────
  const sequences = ["book-buyer-consilium-push", "book-buyer-no-account-push"];
  const pendingContaminated = await prisma.emailQueue.findMany({
    where: {
      sequence: { in: sequences },
      status: "PENDING",
      recipientEmail: { in: Array.from(quizOnlyEmails) },
    },
    select: { id: true, recipientEmail: true, sequence: true, step: true },
  });

  console.log("\n══ STEP 3: DRIP CONTAMINATION CLEANUP ══");
  console.log(`  Pending rows to cancel:               ${pendingContaminated.length}`);
  const bySeq = pendingContaminated.reduce<Record<string, number>>((acc, r) => {
    acc[r.sequence] = (acc[r.sequence] ?? 0) + 1;
    return acc;
  }, {});
  Object.entries(bySeq).forEach(([s, n]) =>
    console.log(`    ${s.padEnd(36)} ${n} rows`),
  );

  const distinctRecipients = new Set(
    pendingContaminated.map((r) => r.recipientEmail),
  );
  console.log(`  Distinct recipients unenrolled:       ${distinctRecipients.size}`);

  if (!DRY && pendingContaminated.length > 0) {
    const cancelled = await prisma.emailQueue.updateMany({
      where: { id: { in: pendingContaminated.map((r) => r.id) } },
      data: { status: "CANCELLED" },
    });
    console.log(`  Cancelled: ${cancelled.count}`);
  }

  if (DRY) {
    console.log("\n  (DRY RUN — no writes performed)");
  } else {
    console.log("\n  Done.");
  }

  await prisma.$disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
