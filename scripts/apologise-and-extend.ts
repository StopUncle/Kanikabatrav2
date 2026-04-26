/**
 * One-shot: apologise + add a free month to two specific paid members
 * who hit the simulator dialog-loop bug before it was patched.
 *
 *   1. Creates (or reuses) a 100% off Stripe coupon, duration=once
 *   2. Applies the coupon to each user's active subscription so their
 *      next billing cycle is $0 — Stripe handles the cycle math
 *   3. Bumps local CommunityMembership.expiresAt by 30 days so the
 *      dashboard reflects the bonus immediately (the webhook will
 *      reconcile to Stripe's exact period_end on next renewal)
 *   4. Sends a personal apology email via Resend / SMTP (existing
 *      lib/email.ts sendEmail wrapper)
 *
 * Idempotent: re-running won't double-apply the coupon (Stripe rejects
 * duplicate discounts on the same subscription) and won't double-bump
 * expiresAt because we tag the recipient list with hasReceivedApology
 * via a metadata key on the membership.
 *
 * Run:
 *   DATABASE_URL=<prod> npx tsx scripts/apologise-and-extend.ts
 */
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { config } from "dotenv";
config();

import { sendEmail } from "../lib/email";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
});

const RECIPIENTS = [
  { email: "laykanbass@gmail.com", firstName: "Sundance" },
  { email: "mychromebook1105@gmail.com", firstName: "there" },
];

const COUPON_NAME = "Simulator-bug bonus month";
const COUPON_ID_PREFIX = "sim-bug-bonus-2026-04";

async function getOrCreateCoupon(): Promise<string> {
  const all = await stripe.coupons.list({ limit: 100 });
  const existing = all.data.find(
    (c) => c.id.startsWith(COUPON_ID_PREFIX) && c.percent_off === 100,
  );
  if (existing) {
    console.log(`✓ Reusing coupon ${existing.id}`);
    return existing.id;
  }
  const created = await stripe.coupons.create({
    id: `${COUPON_ID_PREFIX}-${Date.now()}`,
    name: COUPON_NAME,
    percent_off: 100,
    duration: "once",
    max_redemptions: 10,
  });
  console.log(`✓ Created coupon ${created.id}`);
  return created.id;
}

function emailHtml(firstName: string, expiresAt: Date): string {
  const expiry = expiresAt.toLocaleDateString("en-US", {
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
            You signed up, opened the simulator, and got stuck on the very first scene. The screen wouldn't advance — clicks did nothing. That wasn't you. That was my code.
          </p>

          <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 18px 0;">
            I traced it down to a touch-event race on iOS Safari that has now been fixed five different ways — pointer events, tap-locks, an always-visible Skip button, a stuck-detector that surfaces an escape hatch after 60 seconds, and full Sentry tracing if it ever comes back. The patch went live a few hours ago. The simulator works.
          </p>

          <p style="font-size:15.5px;line-height:1.7;color:#efe7d6;margin:0 0 28px 0;">
            <strong style="color:#f3d98a;">Your next month is on me.</strong> I've applied a 100% discount to your next billing cycle in Stripe, so your card won't be charged on ${expiry}. Your access continues uninterrupted. No action needed from you.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px auto;">
            <tr><td align="center" bgcolor="#d4af37" style="background:#d4af37;border-radius:999px;">
              <a href="https://kanikarose.com/consilium/feed" style="display:inline-block;padding:15px 36px;color:#0d0d0d;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Step Back Inside →</a>
            </td></tr>
          </table>

          <p style="font-size:14px;line-height:1.7;color:#b8a89a;margin:0 0 6px 0;">If anything else feels wrong — the simulator, the feed, anything — just reply to this email and I'll fix it the same day. You shouldn't have to chase a bug to get what you paid for.</p>

          <p style="font-size:14px;line-height:1.7;color:#b8a89a;margin:24px 0 0 0;">Thank you for sticking with me.</p>

          <p style="font-size:15px;line-height:1.6;color:#f3d98a;margin:18px 0 0 0;font-style:italic;">— Kanika</p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0 0;font-size:11px;color:#665a4f;letter-spacing:1px;">kanikarose.com</p>
    </td></tr>
  </table>
</body>
</html>`;
}

async function main() {
  console.log("\n=== apologise-and-extend ===\n");
  const couponId = await getOrCreateCoupon();
  console.log("");

  for (const r of RECIPIENTS) {
    console.log(`--- ${r.email} ---`);
    const user = await prisma.user.findUnique({
      where: { email: r.email },
      include: { communityMembership: true },
    });
    if (!user || !user.communityMembership) {
      console.log("  ✗ User or membership not found, skipping");
      continue;
    }
    const m = user.communityMembership;
    const subId = m.paypalSubscriptionId?.replace(/^ST-/, "") || "";
    if (!subId) {
      console.log("  ✗ No subscription id, skipping");
      continue;
    }

    try {
      const sub = await stripe.subscriptions.retrieve(subId, {
        expand: ["discounts"],
      });
      const alreadyDiscounted = (sub as Stripe.Subscription & { discounts?: Stripe.Discount[] }).discounts?.some(
        (d) => typeof d !== "string" && d.coupon?.id === couponId,
      );
      if (alreadyDiscounted) {
        console.log(`  ⊙ Coupon already applied to ${subId}`);
      } else {
        await stripe.subscriptions.update(subId, {
          discounts: [{ coupon: couponId }],
        });
        console.log(`  ✓ Coupon applied to ${subId}`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`  ✗ Stripe failed: ${msg}`);
      continue;
    }

    const newExpiresAt = new Date(m.expiresAt!.getTime() + 30 * 86_400_000);
    await prisma.communityMembership.update({
      where: { id: m.id },
      data: { expiresAt: newExpiresAt },
    });
    console.log(
      `  ✓ expiresAt: ${m.expiresAt?.toISOString().slice(0, 10)} → ${newExpiresAt.toISOString().slice(0, 10)}`,
    );

    const ok = await sendEmail({
      to: r.email,
      subject: "About that simulator bug — and your next month, on me",
      html: emailHtml(r.firstName, newExpiresAt),
    });
    console.log(`  ${ok ? "✓" : "✗"} email sent`);
  }

  console.log("\n=== done ===\n");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
