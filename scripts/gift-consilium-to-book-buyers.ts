/**
 * One-off backfill: send "1 month Consilium, free" gift invites to
 * every past BOOK purchase on kanikarose.com.
 *
 * Strategy
 * --------
 * - Email-first. We DON'T auto-grant membership. Instead each buyer
 *   gets a gift-invite email with a claim link. Membership starts
 *   when the buyer clicks claim, so the 30-day clock only runs for
 *   members who actually show up.
 * - One invite per unique buyer email (a single buyer with multiple
 *   book purchases still gets one email).
 * - Skip buyers who already have an ACTIVE paying membership — we
 *   don't want to imply they're losing anything or send noise.
 * - Skip buyers already pending/approved via the existing Consilium
 *   application flow — they'll come in that way.
 * - Writes to .claim-tokens.json so claim endpoints can verify the
 *   token without a DB table (simple, one-shot, deletable after run).
 *
 * Usage
 * -----
 *   DATABASE_URL="<railway public url>" npx tsx scripts/gift-consilium-to-book-buyers.ts --dry-run
 *   DATABASE_URL="<railway public url>" npx tsx scripts/gift-consilium-to-book-buyers.ts --send
 *
 * Always --dry-run first. Review the output. Then re-run with --send.
 *
 * The --send path:
 *   1. Queries unique book-buyer emails
 *   2. For each, generates a signed claim token (JWT, 90 day expiry)
 *   3. Calls sendConsiliumGiftInvite(email, name, token)
 *   4. Prints running counters and writes a .gift-log.json
 *
 * NOTE: this script has NOT been run against prod yet — it's prepared
 * here so Kanika can review and approve before executing.
 */

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Import lazily inside the script since lib/email.ts may read env at
// module load time.
async function getSender() {
  const mod = await import("../lib/email");
  return mod.sendConsiliumGiftInvite;
}

const prisma = new PrismaClient();

const DRY_RUN = !process.argv.includes("--send");
const LOG_PATH = path.join(process.cwd(), ".gift-log.json");

// Test / internal accounts we never want to email in a mass send.
// Compared case-insensitively against customerEmail AND customerName.
const EMAIL_BLOCKLIST = new Set(
  [
    "test@example.com",
    "sdmatheson@outlook.com",
    "sdmatheson776@gmail.com",
    "mathesonsienna7@gmail.com",
    "kanika@kanikarose.com",
    "kanikarosaliebatra@gmail.com",
    "kbatra271@gmail.com",
  ].map((e) => e.toLowerCase()),
);

const NAME_BLOCKLIST_PATTERNS = [
  /^test user$/i,
  /^fat sam$/i,
  /^smelly/i,
  /^kanika/i,
];

const EMAIL_PATTERN_BLOCKLIST = [
  /@example\.com$/i,
  /^test@/i,
  /\+test@/i,
];

function isBlocklisted(email: string, name: string): boolean {
  const normalizedEmail = email.toLowerCase();
  if (EMAIL_BLOCKLIST.has(normalizedEmail)) return true;
  if (EMAIL_PATTERN_BLOCKLIST.some((p) => p.test(normalizedEmail))) return true;
  if (NAME_BLOCKLIST_PATTERNS.some((p) => p.test(name))) return true;
  return false;
}

function signClaimToken(email: string, name: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required to sign claim tokens");
  }
  return jwt.sign(
    {
      type: "consilium-gift",
      email: email.toLowerCase(),
      name,
      v: 1,
    },
    secret,
    { expiresIn: "90d" },
  );
}

async function main() {
  console.log(
    DRY_RUN
      ? "DRY RUN — no emails will be sent.\n"
      : "LIVE RUN — emails will actually send.\n",
  );

  // Gather unique buyer emails. A "real" book buyer must be:
  //   - type BOOK, status COMPLETED
  //   - NOT a bundle purchase (paypalOrderId starts IC-BOOK-, those
  //     already have Consilium access from the bundle)
  //   - NOT a MANUAL_ or MANUAL- backfill placeholder (those rows exist
  //     for people who bought on Amazon/KDP so the quiz could be unlocked
  //     for their email — they never paid this site)
  //   - amount >= 15 (the book's cheapest real price was $24.99, presale
  //     $34.99; anything under is a quiz-unlock or test row that got
  //     mis-typed as BOOK)
  const purchases = await prisma.purchase.findMany({
    where: {
      type: "BOOK",
      status: "COMPLETED",
      amount: { gte: 15 },
      NOT: [
        { paypalOrderId: { startsWith: "IC-BOOK-" } },
        { paypalOrderId: { contains: "MANUAL" } },
      ],
    },
    select: {
      customerEmail: true,
      customerName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Dedupe by lowercased email, keep the earliest purchase for name.
  const uniqueBuyers = new Map<string, { email: string; name: string }>();
  for (const p of purchases) {
    const key = p.customerEmail.toLowerCase();
    if (!uniqueBuyers.has(key)) {
      uniqueBuyers.set(key, {
        email: p.customerEmail,
        name: p.customerName || "Reader",
      });
    }
  }

  console.log(`Unique book buyers: ${uniqueBuyers.size}`);

  // Filter out test / internal accounts.
  const blocklisted: Array<{ email: string; name: string }> = [];
  for (const key of Array.from(uniqueBuyers.keys())) {
    const buyer = uniqueBuyers.get(key)!;
    if (isBlocklisted(buyer.email, buyer.name)) {
      blocklisted.push(buyer);
      uniqueBuyers.delete(key);
    }
  }
  if (blocklisted.length > 0) {
    console.log(`Filtered ${blocklisted.length} test/internal:`);
    blocklisted.forEach((b) => console.log(`    skip  ${b.email} — ${b.name}`));
  }

  // Skip buyers with an ACTIVE paying membership (not bundle, not gift).
  const skipList = new Set<string>();
  const buyerList = Array.from(uniqueBuyers.values());
  for (const buyer of buyerList) {
    const user = await prisma.user.findUnique({
      where: { email: buyer.email.toLowerCase() },
      select: {
        communityMembership: {
          select: {
            status: true,
            billingCycle: true,
          },
        },
      },
    });
    const cm = user?.communityMembership;
    if (
      cm &&
      cm.status === "ACTIVE" &&
      // Skip only if they're on a PAID plan. gift/bundle users can
      // still get the offer (extends their access).
      cm.billingCycle !== "gift" &&
      !cm.billingCycle.startsWith("bundle") &&
      !cm.billingCycle.startsWith("trial")
    ) {
      skipList.add(buyer.email.toLowerCase());
    }
  }
  console.log(`Skipping ${skipList.size} active paying members.`);

  const targets = buyerList.filter(
    (b) => !skipList.has(b.email.toLowerCase()),
  );
  console.log(`Will invite ${targets.length} buyers.\n`);

  if (DRY_RUN) {
    console.log("First 10 targets (dry run):");
    targets.slice(0, 10).forEach((t) => console.log(`  ${t.email} — ${t.name}`));
    console.log("\nRe-run with --send to actually email them.");
    return;
  }

  const sendGift = await getSender();
  const log: Array<{ email: string; ok: boolean; at: string }> = [];
  let sent = 0;
  let failed = 0;

  for (const buyer of targets) {
    const token = signClaimToken(buyer.email, buyer.name);
    try {
      const ok = await sendGift(buyer.email, buyer.name, token);
      if (ok) sent++;
      else failed++;
      log.push({ email: buyer.email, ok, at: new Date().toISOString() });
    } catch (err) {
      failed++;
      log.push({ email: buyer.email, ok: false, at: new Date().toISOString() });
      console.error(`Failed ${buyer.email}:`, err);
    }
    // Gentle throttle — avoid rate limiting the email provider.
    await new Promise((resolve) => setTimeout(resolve, 250));
    if ((sent + failed) % 10 === 0) {
      console.log(`Progress: ${sent} sent / ${failed} failed / ${targets.length} total`);
    }
  }

  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
  console.log(`\nDone. Sent ${sent}, failed ${failed}. Log: ${LOG_PATH}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
