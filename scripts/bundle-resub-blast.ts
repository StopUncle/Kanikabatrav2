/**
 * One-shot: send bundle-resubscribe emails to existing bundle holders.
 *
 * For users who bought BOOK_CONSILIUM_1MO or BOOK_CONSILIUM_3MO under the
 * old one-time-payment flow, their access ends on `expiresAt` with no
 * auto-charge. This script gives them a one-click path to continue at
 * $29/mo (per Stripe-mandated opt-in consent — they'd never agreed to
 * recurring billing originally, so we can't auto-bill them).
 *
 * Targets two cohorts:
 *   1. ACTIVE bundle holders within `--upcoming-days` of expiry (default
 *      14). Email subject: "Your X ends in N days".
 *   2. Recently expired bundle holders within `--past-days` since expiry
 *      (default 7). Email subject: "Your access has ended".
 *
 * Idempotent on a new `bundleResubBlastSentAt` flag in
 * applicationData — re-running won't double-email anyone.
 *
 * Run with:
 *   DB_URL=<prod-url> JWT_SECRET=<prod-secret> [SMTP_*=...] [RESEND_*=...] \
 *   NEXT_PUBLIC_BASE_URL=https://kanikarose.com \
 *   npx tsx scripts/bundle-resub-blast.ts [--dry-run] [--upcoming-days=14] [--past-days=7]
 *
 * Always start with --dry-run on prod to inspect the target list.
 */
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("Set DB_URL env var.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Set JWT_SECRET (must match prod).");
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const upcomingDays =
  Number(args.find((a) => a.startsWith("--upcoming-days="))?.split("=")[1]) ||
  14;
const pastDays =
  Number(args.find((a) => a.startsWith("--past-days="))?.split("=")[1]) || 7;

const prisma = new PrismaClient({ datasourceUrl: dbUrl });

async function main() {
  const now = new Date();
  const upcomingCutoff = new Date(
    now.getTime() + upcomingDays * 24 * 60 * 60 * 1000,
  );
  const pastCutoff = new Date(
    now.getTime() - pastDays * 24 * 60 * 60 * 1000,
  );

  const bundleHolders = await prisma.communityMembership.findMany({
    where: {
      billingCycle: { in: ["bundle-1mo", "bundle-3mo"] },
      // Only target rows without a Stripe sub — that means they're on
      // the OLD one-time-payment flow. The new flow already auto-renews.
      paypalSubscriptionId: null,
      expiresAt: {
        gte: pastCutoff,
        lte: upcomingCutoff,
      },
      user: { isBot: false },
    },
    include: {
      user: { select: { id: true, email: true, name: true } },
    },
    orderBy: { expiresAt: "asc" },
  });

  console.log(
    `Found ${bundleHolders.length} bundle holders in window ` +
      `(${pastDays}d past → ${upcomingDays}d future)`,
  );

  let queued = 0;
  let skipped = 0;
  let failed = 0;

  // Lazy-import the email helper so this script can also run as a list-only
  // dry-run on machines without SMTP creds.
  const { sendMembershipEndingSoon } = dryRun
    ? { sendMembershipEndingSoon: async () => true }
    : await import("../lib/email");

  for (const m of bundleHolders) {
    if (!m.user?.email || !m.expiresAt) {
      skipped++;
      continue;
    }

    const data = (m.applicationData as Record<string, unknown>) || {};
    if (data.bundleResubBlastSentAt) {
      console.log(
        `  skip  ${m.user.email}  (already sent at ${String(data.bundleResubBlastSentAt)})`,
      );
      skipped++;
      continue;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
    const token = jwt.sign(
      { userId: m.user.id, type: "bundle-resub" },
      process.env.JWT_SECRET!,
      { expiresIn: "14d" },
    );
    const resubLink = `${baseUrl}/api/consilium/bundle-resubscribe?token=${token}`;

    const msUntilExpiry = m.expiresAt.getTime() - now.getTime();
    const daysLeft = Math.ceil(Math.abs(msUntilExpiry) / (24 * 60 * 60 * 1000));

    console.log(
      `  send  ${m.user.email}  (${m.billingCycle}, ${msUntilExpiry < 0 ? "-" : ""}${daysLeft}d, ${m.expiresAt.toISOString().slice(0, 10)})`,
    );

    if (dryRun) {
      queued++;
      continue;
    }

    try {
      const ok = await sendMembershipEndingSoon(
        m.user.email,
        m.user.name || "there",
        Math.max(1, daysLeft),
        m.billingCycle,
        resubLink,
      );
      if (ok) {
        await prisma.communityMembership.update({
          where: { id: m.id },
          data: {
            applicationData: {
              ...data,
              bundleResubBlastSentAt: new Date().toISOString(),
              bundleResubBlastDaysOffset: msUntilExpiry < 0 ? -daysLeft : daysLeft,
            },
          },
        });
        queued++;
      } else {
        console.error(`    FAIL ${m.user.email}`);
        failed++;
      }
    } catch (err) {
      console.error(`    THREW ${m.user.email}`, err);
      failed++;
    }

    // 200ms breath between sends so SMTP/Resend doesn't choke.
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(
    `\n${dryRun ? "[DRY RUN] would send" : "Sent"}: ${queued} | skipped: ${skipped} | failed: ${failed}`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
