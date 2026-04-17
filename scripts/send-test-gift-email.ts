/**
 * One-off test: send a single Consilium gift-invite email to verify
 * rendering + claim flow end-to-end before running the full book-buyer
 * backfill.
 *
 * Usage:
 *   npx tsx scripts/send-test-gift-email.ts <email> [name]
 *
 * Example:
 *   npx tsx scripts/send-test-gift-email.ts sdmatheson@outlook.com "Scott"
 *
 * Requires (from .env):
 *   - JWT_SECRET          to sign the claim token
 *   - RESEND_API_KEY      preferred transport
 *     (or SMTP_HOST/USER/PASS as fallback)
 *   - NEXT_PUBLIC_BASE_URL for the claim link
 */

import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function signClaimToken(email: string, name: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required to sign claim tokens");
  return jwt.sign(
    { type: "consilium-gift", email: email.toLowerCase(), name, v: 1 },
    secret,
    { expiresIn: "90d" },
  );
}

async function main() {
  const email = process.argv[2];
  const name = process.argv[3] ?? "Scott";
  if (!email) {
    console.error("Usage: npx tsx scripts/send-test-gift-email.ts <email> [name]");
    process.exit(1);
  }

  const token = signClaimToken(email, name);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const claimUrl = `${baseUrl}/consilium/claim?token=${token}`;

  console.log(`Sending test gift invite to ${email} (${name})...`);
  console.log(`Claim URL: ${claimUrl}\n`);

  const { sendConsiliumGiftInvite } = await import("../lib/email");
  const ok = await sendConsiliumGiftInvite(email, name, token);

  if (ok) {
    console.log("✅ Email sent successfully.");
  } else {
    console.error("❌ Email send returned false — check transport logs.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
