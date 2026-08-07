/**
 * Send someone a Consilium gift invite: sign a 90 day claim token for
 * their address and email them the claim link. Clicking it grants a 30
 * day ACTIVE membership on the `gift` billing cycle, creating their
 * account first if they do not have one (see the upsert in
 * app/consilium/claim/page.tsx).
 *
 * Nothing is written to the database here. The token is a signed JWT and
 * the membership only exists once the recipient claims it, so re-running
 * is safe and simply issues a fresh link.
 *
 * Usage:
 *   npx tsx scripts/send-gift-invite.ts <email> [name]
 *
 * Example:
 *   npx tsx scripts/send-gift-invite.ts reader@example.com "Maria"
 *
 * Requires (from .env):
 *   - JWT_SECRET          to sign the claim token. Must be the SAME
 *     secret production runs on, or the claim page rejects the link.
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
  // "there" reads fine in the greeting. The old default was a test
  // name, which shipped to whoever the caller forgot to name.
  const name = process.argv[3] ?? "there";
  if (!email) {
    console.error("Usage: npx tsx scripts/send-gift-invite.ts <email> [name]");
    process.exit(1);
  }

  const token = signClaimToken(email, name);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const claimUrl = `${baseUrl}/consilium/claim?token=${token}`;

  console.log(`Sending gift invite to ${email} (${name})...`);
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
