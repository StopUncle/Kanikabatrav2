/**
 * One-shot: create the Stripe Donation product + custom-amount price.
 *
 * Why this is a script and not the MCP create_price tool: the MCP
 * version requires a fixed unit_amount. Donations are pay-what-you-
 * want, which Stripe supports via the `custom_unit_amount` shape on
 * Price objects — not exposed by the MCP. So we go direct via the SDK.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/create-donation-product.ts
 *
 * Idempotent-ish: if a Donation product already exists in this account,
 * the script aborts with a message rather than create a duplicate.
 */

import Stripe from "stripe";

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) {
  console.error("STRIPE_SECRET_KEY env var required");
  process.exit(1);
}

const stripe = new Stripe(KEY);

async function main() {
  // Guard against duplicates — search for an existing donation product.
  const existing = await stripe.products.list({ limit: 100 });
  const dupe = existing.data.find(
    (p) => p.name.toLowerCase().includes("donation") || p.name.toLowerCase().includes("support kanika"),
  );
  if (dupe) {
    console.error(
      `Found existing product: ${dupe.id} (${dupe.name}). Aborting to avoid a duplicate. ` +
        `If you really want a new one, archive the existing one first.`,
    );
    process.exit(1);
  }

  console.log("Creating Stripe product…");
  const product = await stripe.products.create({
    name: "Support Kanika",
    description:
      "A one-time gift toward Kanika's work — the books, the simulator, the community, the writing. Pay what you want.",
  });
  console.log("Product:", product.id);

  console.log("Creating custom-amount price…");
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    custom_unit_amount: {
      enabled: true,
      minimum: 200, // $2 floor — keeps spam donations from being a thing
      maximum: 100000, // $1000 ceiling — guards against fat-finger typos
      preset: 2000, // $20 default suggestion
    },
  });
  console.log("Price:", price.id);

  console.log("");
  console.log("Add this to lib/stripe.ts STRIPE_PRICES:");
  console.log(`  DONATION: "${price.id}",`);
  console.log("");
  console.log("Or set STRIPE_PRICE_DONATION env var on Railway with that value.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
