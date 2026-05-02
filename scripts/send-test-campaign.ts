/**
 * Send a single campaign email to one specific recipient AS IF
 * it were a normal queued send — same path, same headers, same
 * footer, same Resend/SMTP transport — so we can validate the
 * full pipeline end-to-end before doing a 352-recipient blast.
 *
 * Steps:
 *   1. Resolve the recipient's User row + first name on prod DB.
 *   2. Build the campaign HTML (with marketing footer baked in).
 *   3. Insert ONE EmailQueue row scheduled for now.
 *   4. POST to the production /api/admin/email-queue/process
 *      with the cron secret so the row is sent immediately
 *      from Railway's IP (not this local machine).
 *
 * The email therefore comes out of the production SMTP / Resend
 * exactly as a real campaign send would. SPF/DKIM/DMARC pass.
 *
 * Usage:
 *   PROD_BASE_URL=https://kanikarose.com \
 *   CRON_SECRET=<...> \
 *   DATABASE_URL=<prod-public> \
 *   npx tsx scripts/send-test-campaign.ts <campaignId> <email>
 *
 * Defaults: campaignId=drip-quiz, email=sdmatheson@outlook.com
 */
import { PrismaClient } from "@prisma/client";
import { CAMPAIGNS, type CampaignId } from "../lib/email-campaigns";
import { marketingFooterHtml } from "../lib/email-marketing";

const prisma = new PrismaClient();

const campaignId = (process.argv[2] || "drip-quiz") as CampaignId;
const targetEmail = (process.argv[3] || "sdmatheson@outlook.com").toLowerCase();
const baseUrl = process.env.PROD_BASE_URL || "https://kanikarose.com";
const cronSecret = process.env.CRON_SECRET;

async function main() {
  console.log(`\n=== send-test-campaign ===`);
  console.log(`  campaign: ${campaignId}`);
  console.log(`  to:       ${targetEmail}`);
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

  // 1. Resolve the recipient.
  const user = await prisma.user.findUnique({
    where: { email: targetEmail },
    select: { id: true, name: true, displayName: true, emailPreferences: true },
  });
  if (!user) {
    console.error(`No user found in prod DB for ${targetEmail}`);
    process.exit(1);
  }
  const firstName = user.displayName || user.name || "there";
  console.log(`✓ user resolved: id=${user.id} name=${firstName}`);

  // 2. Build content (same path the real campaign uses).
  const ctx = { userId: user.id, email: targetEmail, firstName };
  const subject = def.subject(ctx);
  const inner = def.html(ctx);
  const footer = marketingFooterHtml(user.id, def.type, targetEmail);
  const html = inner.includes("</body>")
    ? inner.replace("</body>", `${footer}</body>`)
    : `${inner}\n${footer}`;
  console.log(`✓ html built (${html.length} bytes)`);
  console.log(`  subject: ${subject}`);

  // 3. Wipe any prior test row for this campaign+recipient so we
  //    don't accumulate duplicates across re-runs, then insert fresh.
  await prisma.emailQueue.deleteMany({
    where: {
      sequence: campaignId,
      recipientEmail: targetEmail,
      status: { in: ["PENDING", "SENT", "FAILED", "CANCELLED"] },
    },
  });
  const row = await prisma.emailQueue.create({
    data: {
      recipientEmail: targetEmail,
      recipientName: firstName,
      sequence: campaignId,
      step: 1,
      subject,
      htmlBody: html,
      scheduledAt: new Date(),
      status: "PENDING",
      metadata: {
        isMarketing: true,
        unsubscribeType: def.type,
        campaign: campaignId,
        testSend: true,
      },
    },
  });
  console.log(`✓ queued row: ${row.id}`);

  // 4. Hit the prod processor with the cron secret. The processor
  //    runs against the same DB, sees our new row scheduled-for-now,
  //    and sends it via prod's email transport.
  console.log(`→ triggering prod cron processor at ${baseUrl}/api/admin/email-queue/process ...`);
  const r = await fetch(`${baseUrl}/api/admin/email-queue/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cron-secret": cronSecret,
    },
    body: JSON.stringify({ dryRun: false }),
  });
  const result = await r.json();
  console.log(`← ${r.status}`, JSON.stringify(result, null, 2));

  // 5. Confirm the row's final status.
  const final = await prisma.emailQueue.findUnique({ where: { id: row.id } });
  console.log("");
  console.log(`Final row status: ${final?.status}`);
  console.log(`Sent at:          ${final?.sentAt?.toISOString() ?? "—"}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
