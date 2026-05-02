/**
 * Resend transport verification script.
 *
 * Sends a small test email through whichever transport the running
 * environment is configured for (Resend if RESEND_API_KEY is set,
 * SMTP fallback otherwise) and prints a structured result.
 *
 * Usage:
 *   npx tsx scripts/verify-resend.ts <recipient-email>
 *
 * Example:
 *   npx tsx scripts/verify-resend.ts you@gmail.com
 *
 * Run AFTER:
 *   1. RESEND_API_KEY is set in the local .env (or piped from Railway
 *      via `railway variables --kv`)
 *   2. Resend dashboard shows the sending domain "Verified"
 *
 * What it does:
 *   - Logs which transport will fire (Resend vs SMTP fallback)
 *   - Logs the FROM address that will be used
 *   - Sends a single test email with a clearly-marked subject + body
 *   - Reports success or the underlying error
 *
 * What it doesn't:
 *   - Doesn't write to the DB. Doesn't queue. Doesn't subscribe the
 *     recipient to anything. Pure send-test.
 *   - Doesn't validate deliverability vs Microsoft. For that, send to
 *     an Outlook / Hotmail address and check the inbox + spam folder.
 */

import { config } from "dotenv";
import { sendEmail } from "@/lib/email";

// Load .env so the script works locally without Railway env injection.
config();

async function main() {
  const recipient = process.argv[2];
  if (!recipient || !recipient.includes("@")) {
    console.error(
      "Usage: npx tsx scripts/verify-resend.ts <recipient-email>",
    );
    process.exit(1);
  }

  const hasResend = !!process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    process.env.FROM_EMAIL ||
    "noreply@kanikarose.com";

  console.log("=".repeat(60));
  console.log("Resend transport verification");
  console.log("=".repeat(60));
  console.log(`Transport:    ${hasResend ? "Resend (preferred)" : "SMTP fallback"}`);
  console.log(`From:         ${fromEmail}`);
  console.log(`To:           ${recipient}`);
  console.log(`Time:         ${new Date().toISOString()}`);
  console.log("=".repeat(60));

  const subject = "Resend transport test — Kanika Rose";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 30px; background: #1a0d11; color: #f5efe2;">
      <h1 style="color: #d4af37; margin: 0 0 20px 0; font-weight: 300; letter-spacing: 1.5px; text-transform: uppercase;">
        Transport test
      </h1>
      <p style="line-height: 1.7; color: #d6cfc4;">
        If you can read this in your inbox (not spam), Resend is
        sending correctly from <strong style="color: #d4af37;">${fromEmail}</strong>.
      </p>
      <p style="line-height: 1.7; color: #d6cfc4;">
        Sent at ${new Date().toLocaleString()} via the
        ${hasResend ? "Resend" : "SMTP fallback"} transport.
      </p>
      <hr style="border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 30px 0;" />
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        This is a non-transactional verification email sent by
        scripts/verify-resend.ts. Discard.
      </p>
    </div>
  `;

  const start = Date.now();
  const ok = await sendEmail({
    to: recipient,
    subject,
    html,
  });
  const ms = Date.now() - start;

  console.log("=".repeat(60));
  if (ok) {
    console.log(`✓ Success in ${ms}ms`);
    console.log("");
    console.log("Next checks:");
    console.log("  1. Check the inbox at " + recipient + " (allow ~30 sec).");
    console.log("  2. If it's in spam, the FROM address may not be");
    console.log("     domain-authenticated yet. Check Resend dashboard");
    console.log("     for any DNS records still pending.");
    console.log("  3. To test Microsoft deliverability specifically,");
    console.log("     re-run with an outlook.com / hotmail.com / live.com");
    console.log("     recipient.");
  } else {
    console.log(`✗ Failed after ${ms}ms`);
    console.log("");
    console.log("Likely causes (in order of probability):");
    console.log("  1. Domain not yet verified in Resend (DNS still");
    console.log("     propagating). Check Resend dashboard.");
    console.log("  2. RESEND_API_KEY missing or wrong. Verify with");
    console.log("     `railway variables --kv | grep RESEND_API_KEY`.");
    console.log("  3. From address (" + fromEmail + ") not on a");
    console.log("     verified Resend domain. Either verify the domain");
    console.log("     or set RESEND_FROM_EMAIL to an already-verified one.");
    console.log("  4. Resend account suspended (check dashboard).");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
