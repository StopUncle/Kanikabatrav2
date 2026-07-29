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
// form; it is a tier decision too, just a finer one.
const GATE = /\b(memberGate|canAccessMemberOnly|canPlay)\b/;

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

    // A gated page listed as free is a contradiction: one of the two is stale.
    if (gated && route in FREE) {
      throw new Error(
        `/app${route} gates on membership but is listed as FREE here. ` +
          `Remove it from FREE or remove the gate.`,
      );
    }
  });

  it("keeps the member surfaces gated", () => {
    // The set A9 closed. Named explicitly so that removing a gate fails here
    // rather than only failing in production.
    const mustGate = [
      "/feed",
      "/feed/[postId]",
      "/kanika",
      "/videos",
      "/voice-notes",
      "/lab",
      "/receipts",
      "/program",
      "/previews",
      "/previews/[slug]",
      "/measure",
      "/measure/baseline",
      "/train/[scenarioId]",
      // The second door into the same catalog scenarios. Gating only the
      // standalone runner leaves the arc walking a free account through the
      // member chapters.
      "/adventures/[slug]/run",
    ];

    for (const route of mustGate) {
      expect(routes).toContain(route);
      expect(GATE.test(sourceFor(route))).toBe(true);
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
