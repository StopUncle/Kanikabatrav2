/**
 * Email-only follow-up to scripts/apologise-and-extend.ts. The
 * earlier script already created the Stripe coupon, applied it to
 * both subscriptions, and bumped CommunityMembership.expiresAt
 * (visible in the dashboard); only the email step failed because
 * Resend isn't configured and local SMTP hits a self-signed
 * cert chain on this Windows host.
 *
 * This script: just sends the apology, with NODE_TLS_REJECT_UNAUTHORIZED=0
 * pre-set in the parent shell to bypass the local cert chain issue.
 *
 * Run:
 *   NODE_TLS_REJECT_UNAUTHORIZED=0 npx tsx scripts/send-apology-emails.ts
 */
import { sendEmail } from "../lib/email";

const RECIPIENTS = [
  {
    email: "laykanbass@gmail.com",
    firstName: "Sundance",
    nextChargeDate: new Date("2026-06-24"),
  },
  {
    email: "mychromebook1105@gmail.com",
    firstName: "there",
    nextChargeDate: new Date("2026-06-24"),
  },
];

function emailHtml(firstName: string, nextChargeDate: Date): string {
  const expiry = nextChargeDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>An apology from Kanika</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,sans-serif;color:#efe7d6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#13100b;border:1px solid #d4af3722;border-radius:12px;">
        <tr><td style="padding:36px 32px 28px 32px;">
          <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d4af37;margin:0 0 18px 0;font-weight:600;">A personal note</p>
          <h1 style="font-size:22px;font-weight:300;color:#f5efe2;margin:0 0 24px 0;letter-spacing:0.5px;">${firstName}, I owe you an apology.</h1>

          <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
            You signed up, opened the simulator, and got stuck on the very first scene. The screen wouldn't advance &mdash; clicks did nothing. That wasn't you. That was my code.
          </p>

          <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
            I traced it down to a touch-event race on iOS Safari that has now been fixed five different ways &mdash; pointer events, tap-locks, an always-visible Skip button, a stuck-detector that surfaces an escape hatch after 60 seconds, and full Sentry tracing if it ever comes back. The patch went live a few hours ago. The simulator works.
          </p>

          <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
            <strong style="color:#f3d98a;">Your next month is on me.</strong> I've applied a 100% discount to your next billing cycle in Stripe, so your card won't be charged on ${expiry}. Your access continues uninterrupted. No action needed from you.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px auto;">
            <tr><td align="center" bgcolor="#d4af37" style="background:#d4af37;border-radius:999px;">
              <a href="https://kanikarose.com/consilium/feed" style="display:inline-block;padding:15px 36px;color:#0d0d0d;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Step Back Inside &rarr;</a>
            </td></tr>
          </table>

          <p style="font-size:14px;line-height:1.7;color:#b8a89a;margin:0 0 6px 0;">If anything else feels wrong &mdash; the simulator, the feed, anything &mdash; just reply to this email and I'll fix it the same day. You shouldn't have to chase a bug to get what you paid for.</p>

          <p style="font-size:14px;line-height:1.7;color:#b8a89a;margin:24px 0 0 0;">Thank you for sticking with me.</p>

          <p style="font-size:15px;line-height:1.6;color:#f3d98a;margin:18px 0 0 0;font-style:italic;">&mdash; Kanika</p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0 0;font-size:11px;color:#665a4f;letter-spacing:1px;">kanikarose.com</p>
    </td></tr>
  </table>
</body>
</html>`;
}

async function main() {
  console.log("\n=== send-apology-emails ===\n");
  for (const r of RECIPIENTS) {
    const ok = await sendEmail({
      to: r.email,
      subject: "About that simulator bug — and your next month, on me",
      html: emailHtml(r.firstName, r.nextChargeDate),
    });
    console.log(`${ok ? "✓" : "✗"} ${r.email}`);
  }
  console.log("\n=== done ===\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
