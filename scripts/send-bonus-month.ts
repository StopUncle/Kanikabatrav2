/**
 * One-off: send a "bonus month" Consilium gift-invite email to a single
 * existing member. Signs the same consilium-gift JWT the batch script
 * uses, so the claim link hits the hardened /consilium/claim flow and
 * extends their CommunityMembership by 30 days when clicked.
 *
 * Usage:
 *   NODE_ENV=development npx tsx scripts/send-bonus-month.ts <email> <name>
 *
 * Example:
 *   NODE_ENV=development npx tsx scripts/send-bonus-month.ts sarahluna0@gmail.com "Sarah Luna"
 *
 * NODE_ENV=development is required because .env sets NODE_ENV=production,
 * which flips lib/email.ts into strict TLS mode and rejects Gmail SMTP's
 * cert chain on this dev machine.
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
  const name = process.argv[3];
  if (!email || !name) {
    console.error(
      'Usage: NODE_ENV=development npx tsx scripts/send-bonus-month.ts <email> "<name>"',
    );
    process.exit(1);
  }

  const token = signClaimToken(email, name);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const claimUrl = `${baseUrl}/consilium/claim?token=${token}`;

  console.log(`Sending bonus-month invite to ${email} (${name})...`);
  console.log(`Claim URL: ${claimUrl}\n`);

  const { sendConsiliumBonusMonth } = await import("../lib/email");
  const ok = await sendConsiliumBonusMonth(email, name, token);

  if (ok) {
    console.log("Email sent successfully.");
  } else {
    console.error("Email send returned false — check transport logs.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
