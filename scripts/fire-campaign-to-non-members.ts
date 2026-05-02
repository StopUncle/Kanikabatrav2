/**
 * Enqueue a marketing campaign to every OPTED-IN user who does NOT
 * currently have an ACTIVE Consilium membership, then kick off the
 * production processor to start sending the first batch
 * immediately. The 15-min cron continues from there.
 *
 * Use this when the campaign's pitch is "join the Consilium" — we
 * shouldn't pitch a $29/mo membership to people who already pay.
 *
 * Usage:
 *   PROD_BASE_URL=https://kanikarose.com \
 *   CRON_SECRET=<railway> \
 *   DATABASE_URL=<prod-public> \
 *   npx tsx scripts/fire-campaign-to-non-members.ts <campaignId>
 *
 * Defaults: campaignId=drip-ask-kanika
 */
import { PrismaClient } from "@prisma/client";
import { CAMPAIGNS, type CampaignId } from "../lib/email-campaigns";
import { marketingFooterHtml } from "../lib/email-marketing";

const prisma = new PrismaClient();
const campaignId = (process.argv[2] || "drip-ask-kanika") as CampaignId;
const baseUrl = process.env.PROD_BASE_URL || "https://kanikarose.com";
const cronSecret = process.env.CRON_SECRET;

async function main() {
  console.log(`\n=== fire-campaign-to-non-members ===`);
  console.log(`  campaign: ${campaignId}`);
  console.log(`  via:      ${baseUrl}`);
  console.log("");

  const def = CAMPAIGNS[campaignId];
  if (!def) {
    console.error(`Unknown campaign: ${campaignId}`);
    process.exit(1);
  }
  if (!cronSecret) {
    console.error(`CRON_SECRET env var required to trigger prod processor`);
    process.exit(1);
  }

  // Eligibility:
  //   - not banned
  //   - not a bot
  //   - emailPreferences.marketing !== false (NULL counts as opted-in)
  //   - no ACTIVE communityMembership row
  // The membership filter via the relation: where the user has NO
  // membership row OR a membership row with status != ACTIVE.
  const candidates = await prisma.user.findMany({
    where: {
      isBanned: false,
      isBot: false,
      OR: [
        { communityMembership: null },
        { communityMembership: { status: { not: "ACTIVE" } } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      emailPreferences: true,
    },
  });
  console.log(`Candidates (non-member, non-banned, non-bot): ${candidates.length}`);

  // Skip users who already have a PENDING/SENT row for this campaign
  // (idempotent re-runs).
  const existing = await prisma.emailQueue.findMany({
    where: {
      sequence: campaignId,
      recipientEmail: { in: candidates.map((c) => c.email.toLowerCase()) },
      status: { in: ["PENDING", "SENT"] },
    },
    select: { recipientEmail: true },
  });
  const alreadyQueuedSet = new Set(
    existing.map((e) => e.recipientEmail.toLowerCase()),
  );

  const tally = { sent: 0, optedOut: 0, alreadyQueued: 0 };
  const STAGGER_SECONDS = 30;
  const scheduleStart = Date.now();
  const rows: Array<{
    recipientEmail: string;
    recipientName: string;
    sequence: string;
    step: number;
    subject: string;
    htmlBody: string;
    scheduledAt: Date;
    status: string;
    metadata: object;
  }> = [];

  for (const u of candidates) {
    const lower = u.email.toLowerCase();
    if (alreadyQueuedSet.has(lower)) {
      tally.alreadyQueued++;
      continue;
    }
    const prefs = u.emailPreferences as { marketing?: boolean } | null;
    if (prefs && prefs.marketing === false) {
      tally.optedOut++;
      continue;
    }

    const firstName = u.displayName || u.name || "there";
    const ctx = { userId: u.id, email: lower, firstName };
    const subject = def.subject(ctx);
    const inner = def.html(ctx);
    const footer = marketingFooterHtml(u.id, def.type, lower);
    const html = inner.includes("</body>")
      ? inner.replace("</body>", `${footer}</body>`)
      : `${inner}\n${footer}`;

    rows.push({
      recipientEmail: lower,
      recipientName: firstName,
      sequence: campaignId,
      step: 1,
      subject,
      htmlBody: html,
      scheduledAt: new Date(scheduleStart + tally.sent * STAGGER_SECONDS * 1000),
      status: "PENDING",
      metadata: {
        isMarketing: true,
        unsubscribeType: def.type,
        campaign: campaignId,
      },
    });
    tally.sent++;
  }

  if (rows.length === 0) {
    console.log(`Nothing to enqueue. Tally: ${JSON.stringify(tally)}`);
    await prisma.$disconnect();
    return;
  }

  await prisma.emailQueue.createMany({ data: rows });
  console.log(`✓ Enqueued ${tally.sent} rows`);
  console.log(`  Skipped: ${tally.optedOut} opted-out, ${tally.alreadyQueued} already-queued`);
  console.log(`  First sends: now`);
  console.log(`  Last send:   ~${(tally.sent * STAGGER_SECONDS / 60).toFixed(0)} min from now`);

  // Trigger prod cron processor — sends the first 50 immediately,
  // the rest follow via the GitHub Actions cron every 15 min.
  console.log(`\n→ Kicking off prod processor...`);
  const r = await fetch(`${baseUrl}/api/admin/email-queue/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cron-secret": cronSecret,
    },
    body: JSON.stringify({ dryRun: false }),
  });
  const result = await r.json();
  console.log(`← ${r.status}`, JSON.stringify(result));

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
