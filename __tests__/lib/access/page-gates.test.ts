import fs from "fs";
import path from "path";

/**
 * Every page under /app must state its tier.
 *
 * Until the free tier, `app/hub/layout.tsx` was a member-only gate and every
 * page beneath it inherited that for free. Opening the shell to free accounts
 * removed the inheritance, and the pages fetch their own data through Prisma
 * rather than through the API routes that were gated separately, so a page
 * with no decision now renders member content to a free account. That is not
 * hypothetical: it was true of 34 of 35 pages, /app/feed included, and it is
 * invisible in review because the diff that causes it is the one that adds a
 * page, not the one that removes the gate.
 *
 * So the decision is made here, once, in a list. A new page fails this test
 * until someone writes it down. Adding a line is the whole cost; the point is
 * that the line has to be added deliberately.
 *
 * Routes NOT listed here and NOT calling a gate fail. There is no default.
 */

const HUB = path.join(process.cwd(), "app", "hub");

/**
 * Free by decision. Each of these is reachable without a membership because
 * it is either the free tier's own surface or a shell that gates its contents
 * further in.
 */
const FREE: Record<string, string> = {
  "/": "The room. The free tier's home; the tiles beyond it gate themselves.",
  "/welcome": "First run, before anyone has bought anything.",
  "/you": "Your own account. A free account still has one.",
  "/profile": "Same: your own record, not Kanika's material.",
  "/path": "The map of the program. Seeing the shape is the pitch.",
  "/ranks": "Leaderboards. A free account earns Standing and appears on them.",
  "/quizzes": "The quiz funnel is a front door, not a member surface.",
  "/train": "Train's own room. Individual chapters gate in [scenarioId].",
  "/train/climb": "The climb view of the same catalog; entry is gated per run.",
  "/play": "The arcade room. Games are the free tier's retention loop.",
  "/play/drill": "Speed Drill: free.",
  "/play/tell": "Daily Tell: free.",
  "/pact": "The Pact's door IS the sell. Signed members are redirected to /pact/week, which gates.",
  "/pact/sign": "The oath and the signature come BEFORE payment by design; the seal action is what charges.",
  "/pact/sealed": "Stripe's return URL. Gating it would wall the ceremony over a webhook race.",
  "/pact/record": "The member's own history, readable after a lapse or a break by contract (keep/entry routes: 'readable but not writable'). The winback email lands here; readPact runs entitlement-passive.",
  "/pact/journal": "The member's own words, same read-after-lapse contract as the record.",
  "/pact/break": "Sealing the record is a right that survives a lapse; the API needs only a pact to break.",
  "/upgrade": "The plans page. Showing both rungs and their prices IS the pitch; a member sees their own plan named.",
};

/**
 * Exempt by prefix.
 *
 * `/app/dev/*` is a set of local build harnesses (component galleries, juice
 * demos, the state map). They are not product surfaces, nothing links to them
 * from the app, and they are added and thrown away constantly by whoever is
 * working on the shell. Making each one file a tier decision would turn this
 * test into a tax on a lane it is not protecting, and a test people resent is
 * a test people delete.
 *
 * They still sit behind the shell's auth, so this exempts them from stating a
 * TIER, not from requiring a login.
 */
const EXEMPT_PREFIXES = ["/dev/"];

function exempt(route: string): boolean {
  return EXEMPT_PREFIXES.some((p) => route.startsWith(p));
}

/**
 * Open, but not yet decided. These need a product call rather than a fix, and
 * they are listed so that "still open" is a recorded state rather than an
 * oversight. Moving one out of here is a decision, not a cleanup.
 */
const UNDECIDED: Record<string, string> = {
  "/adventures": "Arc catalog. Visible like /train/browse; the runs gate per chapter now.",
  "/adventures/[slug]": "Arc detail, same call as the index.",
  "/adventures/[slug]/complete": "Recap of an arc you finished, so the chapters were paid for.",
  "/instincts/today": "Tells may be the free retention loop or a member surface.",
  "/instincts/history": "Follows whatever /instincts/today is decided to be.",
  "/instincts/score": "Follows whatever /instincts/today is decided to be.",
  "/train/browse": "Catalog visibility is arguably the pitch; the runs gate anyway.",
  "/train/achievements": "Follows the catalog decision.",
  "/book": "Members price differently rather than being gated; needs the money lane.",
};

function pageRoutes(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Route groups contribute no path segment.
      const segment = /^\(.*\)$/.test(entry.name) ? "" : `/${entry.name}`;
      out.push(...pageRoutes(full, prefix + segment));
    } else if (entry.name === "page.tsx") {
      out.push(prefix === "" ? "/" : prefix);
    }
  }
  return out;
}

function sourceFor(route: string): string {
  const rel = route === "/" ? "" : route;
  return fs.readFileSync(path.join(HUB, rel, "page.tsx"), "utf8");
}

// A page states its tier by calling one of these. canPlay is the per-scenario
// form; it is a tier decision too, just a finer one. trainingGate admits any
// paid rung (pact or consilium); memberGate is consilium-only.
const GATE = /\b(memberGate|trainingGate|canAccessMemberOnly|canTrain|canPlay)\b/;

// The subset that renders a WALL. A free page may read canTrain to branch
// its content (Home shades cards by tier); only these two make it "gated"
// for the FREE-list contradiction check.
const WALL = /\b(memberGate|trainingGate)\b/;

const routes = pageRoutes(HUB);

describe("every /app page states its tier", () => {
  it("finds the hub pages at all", () => {
    // Guards against the walk silently returning nothing after a move, which
    // would make every assertion below vacuously pass.
    expect(routes.length).toBeGreaterThan(20);
    expect(routes).toContain("/feed");
  });

  it.each(routes)("%s", (route) => {
    if (exempt(route)) return;

    const gated = GATE.test(sourceFor(route));
    const listed = route in FREE || route in UNDECIDED;

    if (!gated && !listed) {
      throw new Error(
        `/app${route === "/" ? "" : route} has no membership decision.\n` +
          `Either call memberGate(userId) above the queries, or add the route ` +
          `to FREE (with the reason it is free) or UNDECIDED (with what the ` +
          `open question is) in this file.`,
      );
    }

    // A walled page listed as free is a contradiction: one of the two is
    // stale. Branching on canTrain does not count; walls do.
    if (WALL.test(sourceFor(route)) && route in FREE) {
      throw new Error(
        `/app${route} gates on membership but is listed as FREE here. ` +
          `Remove it from FREE or remove the gate.`,
      );
    }
  });

  it("keeps Kanika's rooms consilium-only", () => {
    // The ladder's top rung. These pages must call memberGate, never
    // trainingGate: a pact subscriber holding any of them is the arbitrage
    // that would hollow out the $29 membership. Moving a route between the
    // two lists below is a pricing decision, not a cleanup.
    const mustGateConsilium = [
      "/feed",
      "/feed/[postId]",
      "/kanika",
      "/videos",
      "/voice-notes",
      "/previews",
      "/previews/[slug]",
    ];

    for (const route of mustGateConsilium) {
      expect(routes).toContain(route);
      const src = sourceFor(route);
      expect(/\bmemberGate\b/.test(src)).toBe(true);
      expect(/\btrainingGate\b/.test(src)).toBe(false);
    }
  });

  it("keeps the training surfaces gated on the paid rungs", () => {
    // What the Pact buys. These call trainingGate (or the per-scenario
    // canPlay), so a pact subscriber passes and a free account walls.
    // /pact/record and /pact/journal moved to FREE 2026-08-06: the
    // member's own history stays readable after a lapse (the read is
    // entitlement-passive; writing still gates in the API routes).
    const mustGateTraining = [
      "/lab",
      "/receipts",
      "/program",
      "/measure",
      "/measure/baseline",
      "/pact/week",
    ];
    for (const route of mustGateTraining) {
      expect(routes).toContain(route);
      const src = sourceFor(route);
      expect(/\b(trainingGate|canTrain)\b/.test(src)).toBe(true);
      expect(/\bmemberGate\b/.test(src)).toBe(false);
    }

    // Per-scenario form: the runner and the arc runner decide with canPlay,
    // which admits any paid rung. Gating only the standalone runner leaves
    // the arc walking a free account through the paid chapters.
    for (const route of ["/train/[scenarioId]", "/adventures/[slug]/run"]) {
      expect(routes).toContain(route);
      expect(/\bcanPlay\b/.test(sourceFor(route))).toBe(true);
    }
  });

  it("lists no route that no longer exists", () => {
    // Otherwise a page can be deleted, its entry left behind, and a later page
    // at the same path inherits a decision nobody made for it.
    for (const route of [...Object.keys(FREE), ...Object.keys(UNDECIDED)]) {
      expect(routes).toContain(route);
    }
  });
});
