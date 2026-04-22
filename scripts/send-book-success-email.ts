/**
 * One-off: send the book-delivery "success" email to a single address.
 * Uses a placeholder download token — links won't resolve to real files,
 * but the email template, styling, and copy are production-identical.
 *
 * Usage:
 *   NODE_ENV=development npx tsx scripts/send-book-success-email.ts <email> [name] [PREMIUM|STANDARD]
 */

import * as dotenv from "dotenv";

// Load .env.local first (SMTP creds live here), then .env for anything missing.
dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const { sendBookDelivery } = await import("../lib/email");

  const [email, nameArg, variantArg] = process.argv.slice(2);
  if (!email) {
    console.error(
      "Usage: npx tsx scripts/send-book-success-email.ts <email> [name] [PREMIUM|STANDARD]",
    );
    process.exit(1);
  }

  const name = nameArg || "Kanika";
  const variant = (variantArg || "PREMIUM").toUpperCase();
  const token = "preview-" + Math.random().toString(36).slice(2, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  console.log(
    `Sending ${variant} book delivery email to ${email} (as "${name}")...`,
  );
  const ok = await sendBookDelivery(email, name, token, variant, expiresAt);
  if (ok) {
    console.log("Sent.");
  } else {
    console.error("Email function returned false — check transport logs.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
