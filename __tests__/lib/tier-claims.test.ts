import fs from "fs";
import path from "path";
import { APP_SURFACES } from "@/lib/app/nav";
import { PACT_OPENS, CONSILIUM_ROOMS } from "@/lib/upgrade/benefits";

/**
 * What we SELL has to match what the code LETS PEOPLE IN TO.
 *
 * The audit that produced this file found the two halves had drifted apart
 * in both directions and nothing could see it, because the enforcement
 * lives in TypeScript predicates and the promise lives in prose. An email
 * told people the book was free for members (it is $9.99), the homepage
 * labelled the Lab "Members only" when the Pact opens it, two blog posts
 * quoted a price off by 3.2x, and the join page sold a Classroom and a
 * council that have redirected to the feed since 2026-07-02.
 *
 * None of that was a bug in the usual sense. Every line was true when it
 * was written. So these tests pin the CLAIMS, in the places most likely to
 * outlive the thing they describe.
 */

const ROOT = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/**
 * Rooms that no longer open. Their pages redirect to the feed, so naming
 * one in a benefit list sells a door that goes nowhere.
 *
 * Removing a name from this list is a decision that the room is back.
 */
const DORMANT = ["classroom", "forum", "the council", "live chat"];

/** Surfaces we sell, and the rung each one actually needs. */
const SOLD_AS: Record<string, "pact" | "member"> = {
  "/app/lab": "pact",
  "/app/receipts": "pact",
  "/app/measure": "pact",
  "/app/program": "pact",
  "/app/feed": "member",
  // Ask Kanika landed in the app 2026-08-08. Direct access to Kanika is
  // the one thing in the product that cannot scale, so it is the one thing
  // most worth pinning to the member rung.
  "/app/ask": "member",
  "/app/kanika": "member",
  "/app/voice-notes": "member",
  "/app/videos": "member",
};

describe("the nav flag and the page gate travel as a pair", () => {
  // nav.ts:110-118 states this contract in prose. Nothing enforced it, and
  // three surfaces had drifted: two showed a lock on a page that is
  // deliberately open, one walled with no lock shown first.
  const GATE_FOR = { pact: "trainingGate", member: "memberGate" } as const;

  const listed = APP_SURFACES.filter((s) => s.href.startsWith("/app/"));

  it.each(listed.filter((s) => s.requires).map((s) => [s.href, s.requires!] as const))(
    "%s declares requires:%s, so its page calls the matching gate",
    (href, requires) => {
      const file = path.join(
        ROOT,
        "app",
        "hub",
        href.replace(/^\/app\/?/, ""),
        "page.tsx",
      );
      if (!fs.existsSync(file)) return; // redirect-only or dynamic segment
      const source = fs.readFileSync(file, "utf8");
      expect(source).toContain(GATE_FOR[requires]);
    },
  );

  it("no page gates harder than its nav row admits", () => {
    // The unlabelled wall: a member taps a row with no lock on it and hits
    // one anyway. Worse than a lock, because the lock at least explains.
    const offenders: string[] = [];
    for (const s of listed) {
      if (s.requires) continue;
      const file = path.join(
        ROOT,
        "app",
        "hub",
        s.href.replace(/^\/app\/?/, ""),
        "page.tsx",
      );
      if (!fs.existsSync(file)) continue;
      const source = fs.readFileSync(file, "utf8");
      if (/\b(memberGate|trainingGate)\s*\(/.test(source)) {
        offenders.push(`${s.href} gates but declares no \`requires\``);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("keeps the read-after-lapse surfaces unlocked in the chrome", () => {
    // The member's own pact history stays readable after a lapse or a
    // break (2026-08-06). A lock pill on these rows refuses exactly the
    // lapsed member the contract exists to serve.
    for (const href of ["/app/pact/record", "/app/pact/journal"]) {
      const row = APP_SURFACES.find((s) => s.href === href);
      expect(row).toBeDefined();
      expect(row!.requires).toBeUndefined();
    }
  });
});

describe("benefit lines describe things that exist", () => {
  const allBenefits = [...PACT_OPENS, ...CONSILIUM_ROOMS];

  it.each(allBenefits)("%s names no dormant room", (line) => {
    for (const dead of DORMANT) {
      expect(line.toLowerCase()).not.toContain(dead);
    }
  });

  it("calls the Lab by the name the app uses", () => {
    // It was "The Room" in the benefit list and "the Lab" on every other
    // surface, so the buyer could not match the promise to the product.
    const joined = allBenefits.join(" ");
    expect(joined).toContain("The Lab");
    expect(joined).not.toContain("The Room");
  });

  it("does not promise a daily ANSWER from Kanika", () => {
    // The right to ask is daily. The answer goes to the most-voted, which
    // is what the product does and what every feature page says.
    const ask = CONSILIUM_ROOMS.find((l) => l.startsWith("Ask Kanika"));
    expect(ask).toBeDefined();
    expect(ask).toMatch(/most-voted|top-voted/i);
  });

  it("keeps training benefits out of the Consilium-only list", () => {
    // CONSILIUM_ROOMS is what the $29 adds BEYOND the Pact. A training
    // surface listed here reads as member-only and undersells the Pact,
    // which is exactly what happened to the Lab on the homepage.
    const trainingWords = ["the lab", "receipts", "the mark"];
    for (const line of CONSILIUM_ROOMS) {
      for (const w of trainingWords) {
        expect(line.toLowerCase()).not.toContain(w);
      }
    }
  });
});

describe("public copy sells the right tier", () => {
  it("does not label a training surface members-only on the homepage", () => {
    const overview = read("components/consilium/ConsiliumOverview.tsx");
    // Pull each {title, value} pair and check the paid-training ones.
    const lab = overview.slice(overview.indexOf('title: "The Lab"'));
    const labValue = lab.match(/value:\s*"([^"]+)"/)?.[1];
    expect(labValue).not.toBe("Members only");
  });

  it("makes no unsourced competitor price claim", () => {
    // Comments stripped: the fix's own comment quotes the old copy, and
    // keeping that provenance is worth more than a simpler assertion.
    const overview = read("components/consilium/ConsiliumOverview.tsx").replace(
      /\/\/[^\n]*|\/\*[\s\S]*?\*\//g,
      "",
    );
    expect(overview).not.toContain("/mo elsewhere");
  });

  it("sells no dormant room on the join page", () => {
    const apply = read("app/consilium/apply/page.tsx");
    const body = apply.replace(/\/\*[\s\S]*?\*\//g, ""); // drop comments
    for (const dead of DORMANT) {
      expect(body.toLowerCase()).not.toContain(dead);
    }
  });
});

describe("the legal pages cover every recurring charge", () => {
  const terms = read("app/terms/page.tsx");
  const refund = read("app/refund/page.tsx");

  it("states terms for the Pact, not only the Consilium", () => {
    // It billed weekly for months with no terms, no refund policy and no
    // cancellation statement anywhere, which is the gap that turns a
    // cancellation into a chargeback.
    expect(terms).toMatch(/Blood Pact/);
    expect(refund).toMatch(/Blood Pact/);
  });

  it("does not claim digital sales are final while guarantees exist", () => {
    expect(terms).not.toMatch(/all sales are final/i);
  });

  it("names no dormant room", () => {
    const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").toLowerCase();
    for (const dead of ["forum threads", "chat messages"]) {
      expect(strip(terms)).not.toContain(dead);
    }
  });

  it("reads its prices from the constants, never a literal", () => {
    expect(terms).toContain("MEMBERSHIP.");
    expect(refund).toContain("MEMBERSHIP.");
    expect(terms).toContain("PACT_PRICING.");
    expect(refund).toContain("PACT_PRICING.");
  });
});

describe("the sold-surface map matches the gates", () => {
  it.each(Object.entries(SOLD_AS))(
    "%s is gated at the %s rung",
    (href, rung) => {
      const row = APP_SURFACES.find((s) => s.href === href);
      expect(row).toBeDefined();
      expect(row!.requires).toBe(rung);
    },
  );
});
