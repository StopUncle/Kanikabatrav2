/* eslint-disable no-console */
/**
 * One-shot backfill for paid-quiz buyers who got a Consilium credit
 * code but never got the 3-email drip enqueued.
 *
 * The drip enqueue logic was added in commit 077ba3a on 2026-05-08.
 * Nine buyers between 2026-04-26 and 2026-05-07 received credit codes
 * (still valid for up to 14 days) but no follow-up emails. This script
 * enqueues the drip retroactively, scheduling around the actual time
 * they have left on their credit:
 *
 *   - 1 step "results recap" sent immediately
 *   - 1 step "last call" sent ~48h before credit expiry
 *
 * Skips step 2 (the "9 days left" copy) because the hardcoded copy
 * doesn't match a backfilled buyer's variable remaining window.
 *
 * Idempotent. Run with --apply to actually enqueue, default is dry-run.
 *
 *   npx tsx scripts/backfill-quiz-buyer-drip.ts             # dry run
 *   npx tsx scripts/backfill-quiz-buyer-drip.ts --apply     # write
 */
import { PrismaClient } from "@prisma/client";
import { buildQuizBuyerSequence } from "../lib/email-sequences";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const APPLY = process.argv.includes("--apply");

type Candidate = {
  qid: string;
  email: string;
  name: string | null;
  code: string;
  expiresAt: Date;
  daysLeft: number;
};

async function findCandidates(): Promise<Candidate[]> {
  const rows = await prisma.$queryRawUnsafe<
    Array<{
      qid: string;
      email: string;
      name: string | null;
      code: string;
      expires: Date;
      days_left: number;
    }>
  >(`
    SELECT
      qr.id AS qid,
      qr.email AS email,
      u.name AS name,
      qr."consiliumCreditCode" AS code,
      qr."consiliumCreditExpiresAt" AS expires,
      EXTRACT(EPOCH FROM (qr."consiliumCreditExpiresAt" - NOW())) / 86400 AS days_left
    FROM "QuizResult" qr
    LEFT JOIN "User" u ON LOWER(u.email) = LOWER(qr.email)
    WHERE qr."consiliumCreditCode" IS NOT NULL
      AND qr."consiliumCreditExpiresAt" > NOW()
      AND NOT EXISTS (
        SELECT 1 FROM "EmailQueue" eq
        WHERE eq.sequence = 'quiz-buyer-welcome'
          AND LOWER(eq."recipientEmail") = LOWER(qr.email)
          AND eq.metadata->>'quizResultId' = qr.id
      )
    ORDER BY qr."consiliumCreditExpiresAt" ASC`);
  return rows.map((r) => ({
    qid: r.qid,
    email: r.email,
    name: r.name,
    code: r.code,
    expiresAt: new Date(r.expires),
    daysLeft: Number(r.days_left),
  }));
}

function pickStep1(entries: ReturnType<typeof buildQuizBuyerSequence>) {
  return entries.find((e) => e.step === 1)!;
}

function pickStep3(entries: ReturnType<typeof buildQuizBuyerSequence>) {
  return entries.find((e) => e.step === 3)!;
}

async function main() {
  const candidates = await findCandidates();
  console.log(
    `Found ${candidates.length} buyers with valid credit + no drip enqueued.`,
  );
  if (!candidates.length) return;

  const now = new Date();
  let totalEnqueued = 0;

  for (const c of candidates) {
    const display = c.name?.trim() || c.email.split("@")[0] || "you";
    const template = buildQuizBuyerSequence(c.email, display, {
      quizResultId: c.qid,
      creditCode: c.code,
      creditAmount: 9.99,
      creditExpiresAt: c.expiresAt,
    });

    const queue: Array<(typeof template)[number]> = [];

    // Step 1 ("results recap") goes out immediately, +5min so the
    // queue processor catches it on the next 15-minute tick.
    const step1 = { ...pickStep1(template), scheduledAt: new Date(now.getTime() + 5 * 60 * 1000) };
    queue.push(step1);

    // Step 3 ("last call, 48 hours") goes ~48h before expiry, but
    // never sooner than 24h after step 1 (so they aren't both pelted
    // out in the same processor tick).
    const step3Target = new Date(c.expiresAt.getTime() - 48 * 60 * 60 * 1000);
    const earliestStep3 = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const step3At = step3Target > earliestStep3 ? step3Target : earliestStep3;
    const step3 = { ...pickStep3(template), scheduledAt: step3At };
    queue.push(step3);

    console.log(
      `  ${c.email.padEnd(40)} daysLeft=${c.daysLeft.toFixed(1).padStart(5)}  step1=${step1.scheduledAt.toISOString().slice(0, 16)}  step3=${step3.scheduledAt.toISOString().slice(0, 16)}`,
    );

    if (APPLY) {
      await prisma.emailQueue.createMany({ data: queue });
    }
    totalEnqueued += queue.length;
  }

  console.log(
    `\n${APPLY ? "ENQUEUED" : "WOULD ENQUEUE"} ${totalEnqueued} emails across ${candidates.length} buyers.`,
  );
  if (!APPLY) {
    console.log("Re-run with --apply to actually write rows.");
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
