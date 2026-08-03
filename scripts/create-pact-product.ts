/**
 * One-shot: create the Blood Pact product + its two prices.
 *
 * The Pact deliberately has no monthly price. Weekly matches the cadence of
 * the product (a weekly challenge, a weekly billing decision the record
 * argues against) and annual is the commitment move, priced at $149 so the
 * story stays clean: the year costs what the 12-week course used to.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/create-pact-product.ts
 *
 * Idempotent-ish: aborts if a Blood Pact product already exists.
 */

import Stripe from "stripe";

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) {
  console.error("STRIPE_SECRET_KEY env var required");
  process.exit(1);
}

const stripe = new Stripe(KEY);

async function main() {
  const existing = await stripe.products.list({ limit: 100 });
  const dupe = existing.data.find((p) =>
    p.name.toLowerCase().includes("blood pact"),
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
    name: "The Blood Pact",
    description:
      "A signed commitment to weekly challenges that transform you. One preset, one challenge a week, a record that never forgets.",
  });
  console.log("Product:", product.id);

  console.log("Creating weekly price ($4.99/week)…");
  const weekly = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: 499,
    recurring: { interval: "week" },
    nickname: "Blood Pact weekly",
  });
  console.log("Weekly price:", weekly.id);

  console.log("Creating annual price ($149/year)…");
  const annual = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: 14900,
    recurring: { interval: "year" },
    nickname: "Blood Pact annual",
  });
  console.log("Annual price:", annual.id);

  console.log("");
  console.log("Add these to lib/stripe.ts STRIPE_PRICES:");
  console.log(`  PACT_WEEKLY: "${weekly.id}",`);
  console.log(`  PACT_ANNUAL: "${annual.id}",`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
