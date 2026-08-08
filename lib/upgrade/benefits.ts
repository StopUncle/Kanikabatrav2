/**
 * The ladder's promises, one source.
 *
 * The Pact sells TRAINING (the catalog, the Lab, Receipts, the Mark, the
 * program); the Consilium sells Kanika's rooms and includes the Pact. A
 * surface must never promise the other rung's goods: a Kanika promise on
 * the Pact door is exactly the arbitrage that would hollow out the $29
 * base. Every pitch surface (the ladder page, the UpgradeSheet, the
 * marketing JoinPanel) renders from these lists, so no two surfaces can
 * promise different products.
 *
 * The copy rule the app surfaces follow: name what CONTINUES, never what
 * is withheld. Skills, never results.
 */

/** What the Pact opens. Training, no Kanika. */
export const PACT_OPENS = [
  "One challenge a week, on your track, and a record that never forgets.",
  "Every chapter of every track, not just the first.",
  // Called "The Room" here and "the Lab" on every other surface, which
  // left the buyer unable to match the promise to the thing they opened.
  "The Lab: say it in your own words, and find out what that costs you.",
  "Receipts: paste the message, get the read.",
  "The Mark: your reads, measured, and a record that holds you to them.",
];

/**
 * Kanika's rooms: what the Consilium opens beyond the Pact. Surfaces add
 * their own "the Pact is included" line in the position that suits them
 * (first on the ladder page, last on the sheet).
 */
export const CONSILIUM_ROOMS = [
  "The feed: her posts, daily drops, and prompts, every morning.",
  // "one question a day, answered" read as a guaranteed daily reply. The
  // right to ask is daily; the answer goes to the most-voted, which is
  // what the product actually does and what the feature page says.
  "Ask Kanika: ask one a day, and the most-voted get answered by voice or video.",
  "Voice notes and videos, for members only.",
  "The book at $9.99 instead of $24.99.",
];

/**
 * Risk-reversal + payment trust, for the exact moment recurring-charge
 * anxiety peaks: right under a join button.
 */
export const TRUST_LINE =
  "7-day money-back guarantee · Cancel anytime · Secure checkout via Stripe";
