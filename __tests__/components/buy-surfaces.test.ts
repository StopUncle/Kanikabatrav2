/**
 * Every buy button on the site names a price by key, and the key is only
 * checked at runtime: /api/stripe/checkout looks it up in STRIPE_PRICES and
 * returns 400 "Invalid product" when it is missing. A typo, a renamed entry,
 * or a key deleted from lib/stripe.ts is therefore invisible until a customer
 * clicks and cannot pay, which is exactly the shape of the outage on
 * 2026-08-05: a checkout that failed silently for days.
 *
 * This is a static guard, not a DOM test. It reads the source of app/ and
 * components/ off disk, collects every price key referenced there, and
 * asserts each one exists. Nothing renders, nothing hits Stripe, and the
 * check cannot rot: a new buy surface is covered the moment it is written.
 *
 * lib/stripe.ts is parsed rather than imported on purpose. Importing it pulls
 * in the Stripe SDK and makes PACT_WEEKLY / PACT_ANNUAL depend on whichever
 * environment the test happens to run in; the map's keys are what matters
 * here, and they are static text.
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const SCANNED_DIRS = ["app", "components"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"]);

/** Keys the checkout route refuses outright, so a client that sends one gets a 400. */
const SERVER_ONLY_KEYS = new Set(["INNER_CIRCLE", "BOOK_MEMBER"]);

/**
 * The only entries allowed to hold an empty id: they read from the
 * environment because the live prices do not exist yet, and every surface
 * that leads into that checkout gates on isPactCheckoutOpen() first.
 */
const ENV_DRIVEN_KEYS = new Set(["PACT_WEEKLY", "PACT_ANNUAL"]);

function readStripePrices(): Map<string, string> {
  const source = fs.readFileSync(path.join(ROOT, "lib", "stripe.ts"), "utf8");
  const start = source.indexOf("export const STRIPE_PRICES");
  expect(start).toBeGreaterThan(-1);
  const body = source.slice(start, source.indexOf("\n};", start));

  const prices = new Map<string, string>();
  const entry = /^\s{2}([A-Z][A-Z0-9_]*)\s*:\s*(.+?),\s*(?:\/\/.*)?$/gm;
  let match: RegExpExecArray | null;
  while ((match = entry.exec(body)) !== null) {
    const literal = /^"([^"]*)"$/.exec(match[2]);
    prices.set(match[1], literal ? literal[1] : "");
  }
  return prices;
}

function sourceFiles(): string[] {
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        if (item.name === "node_modules" || item.name.startsWith(".")) continue;
        walk(full);
      } else if (SOURCE_EXTENSIONS.has(path.extname(item.name))) {
        found.push(full);
      }
    }
  };
  for (const dir of SCANNED_DIRS) walk(path.join(ROOT, dir));
  return found;
}

interface Reference {
  key: string;
  file: string;
  line: number;
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

/**
 * Three ways a price key reaches the checkout route:
 *   1. `priceKey="BOOK"` / `priceKey: "BOOK"` — the StripeButton prop and the
 *      hand-rolled fetch bodies that bypass it.
 *   2. `STRIPE_PRICES.INNER_CIRCLE` — server routes reading the map directly.
 *   3. a `*_PRICE_KEYS` lookup table, e.g. COACHING_PRICE_KEYS in the coaching
 *      page, whose values are fed to a StripeButton through a variable and so
 *      never appear next to the word `priceKey`.
 */
function collectReferences(): { direct: Reference[]; all: Reference[] } {
  const direct: Reference[] = [];
  const all: Reference[] = [];

  const literalProp =
    /priceKey\s*(?:=(?!=)|:)\s*\{?\s*["'`]([A-Za-z0-9_]+)["'`]/g;
  const mapAccess =
    /STRIPE_PRICES(?:\.([A-Za-z0-9_]+)|\[\s*["']([A-Za-z0-9_]+)["']\s*\])/g;
  const keyTable = /[A-Z][A-Z0-9_]*PRICE_KEYS[^=]*=\s*\{([\s\S]*?)\n\}/g;

  for (const file of sourceFiles()) {
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");
    const push = (list: Reference[], key: string, index: number) =>
      list.push({ key, file: relative, line: lineOf(source, index) });

    let match: RegExpExecArray | null;
    while ((match = literalProp.exec(source)) !== null) {
      push(direct, match[1], match.index);
      push(all, match[1], match.index);
    }
    while ((match = mapAccess.exec(source)) !== null) {
      push(all, match[1] ?? match[2], match.index);
    }
    while ((match = keyTable.exec(source)) !== null) {
      const table = match[1];
      const offset = match.index + match[0].indexOf(table);
      const value = /["']([A-Z][A-Z0-9_]*)["']/g;
      let entry: RegExpExecArray | null;
      while ((entry = value.exec(table)) !== null) {
        push(direct, entry[1], offset + entry.index);
        push(all, entry[1], offset + entry.index);
      }
    }
  }

  return { direct, all };
}

const STRIPE_PRICES = readStripePrices();
const { direct, all } = collectReferences();

const describeRef = (ref: Reference) => `${ref.file}:${ref.line} -> ${ref.key}`;

describe("buy surfaces", () => {
  it("parses the price map out of lib/stripe.ts", () => {
    // A parser that silently matched nothing would pass every test below.
    expect(STRIPE_PRICES.size).toBeGreaterThan(10);
    expect(STRIPE_PRICES.has("BOOK")).toBe(true);
    expect(STRIPE_PRICES.has("INNER_CIRCLE")).toBe(true);
  });

  it("finds the known buy surfaces", () => {
    // Same reasoning: if the scan stops matching, the guard is gone.
    const files = new Set(all.map((ref) => ref.file));
    expect(files.has("components/StripeButton.tsx")).toBe(false); // prop type only
    expect(files.has("app/book/BookPageClient.tsx")).toBe(true);
    expect(files.has("app/coaching/CoachingPageClient.tsx")).toBe(true);
    expect(all.length).toBeGreaterThan(10);
  });

  it("references only price keys that exist in STRIPE_PRICES", () => {
    const dead = all.filter((ref) => !STRIPE_PRICES.has(ref.key));
    // A key that is not in the map is a button the customer cannot buy
    // through: the route answers 400 and the page shows a generic failure.
    expect(dead.map(describeRef)).toEqual([]);
  });

  it("never sends a server-only key from a client surface", () => {
    // INNER_CIRCLE and BOOK_MEMBER exist in the map but the checkout route
    // rejects both by name, so shipping one as a priceKey is a dead button
    // that this file's existence check would otherwise wave through.
    const rejected = direct.filter(
      (ref) => !ref.file.startsWith("app/api/") && SERVER_ONLY_KEYS.has(ref.key),
    );
    expect(rejected.map(describeRef)).toEqual([]);
  });

  it("resolves every referenced key to a real Stripe price id", () => {
    const unconfigured = all.filter((ref) => {
      if (ENV_DRIVEN_KEYS.has(ref.key)) return false;
      return !(STRIPE_PRICES.get(ref.key) ?? "").startsWith("price_");
    });
    // An entry left blank or holding a product id instead of a price id
    // fails at Stripe, not at our 400, which is harder to notice.
    expect(unconfigured.map(describeRef)).toEqual([]);
  });
});
