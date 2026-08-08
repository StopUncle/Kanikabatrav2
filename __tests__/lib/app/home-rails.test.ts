import fs from "fs";
import path from "path";
import {
  APP_SURFACES,
  HOME_SECTIONS,
  surfaceLocked,
  type ViewerTier,
} from "@/lib/app/nav";

/**
 * Home is the catalogue now, so its rails carry rules.
 *
 * The load-bearing one is NO RAIL IS ENTIRELY LOCKED. Showing gated
 * features is how a free account learns the product exists, and the lock
 * pill naming the price is right. But a whole section a viewer cannot open
 * is not a catalogue, it is a wall, and ChapterTrail already recorded what
 * that reads as: "sixteen padlocks reads as a wall of things withheld; one
 * padlock and a trail running off into faint marks reads as ground you
 * have not covered yet."
 *
 * The resolution the design settled on: a locked CARD is a full card, a
 * locked SECTION is a mistake. These tests hold that at every tier, which
 * a human cannot check by eye because it means viewing Home as four
 * different people.
 */

const TIERS: ViewerTier[] = ["anon", "free", "pact", "member"];

describe("no rail is a wall", () => {
  it.each(TIERS)("%s can open something in every Home section", (tier) => {
    for (const section of HOME_SECTIONS) {
      const open = section.items.filter((s) => !surfaceLocked(s, tier));
      expect({
        tier,
        section: section.title,
        openCards: open.length,
      }).toEqual({
        tier,
        section: section.title,
        openCards: expect.any(Number),
      });
      expect(open.length).toBeGreaterThan(0);
    }
  });

  it("never runs more than two locked cards together in a rail", () => {
    // Three in a row is a wall wherever it sits. Order the section so the
    // ground comes before the ambition.
    for (const tier of TIERS) {
      for (const section of HOME_SECTIONS) {
        let run = 0;
        for (const s of section.items) {
          run = surfaceLocked(s, tier) ? run + 1 : 0;
          expect({
            tier,
            section: section.title,
            longestLockedRun: run,
          }).toEqual({
            tier,
            section: section.title,
            longestLockedRun: expect.any(Number),
          });
          expect(run).toBeLessThanOrEqual(2);
        }
      }
    }
  });
});

describe("the hero tier stays scarce", () => {
  const heroes = APP_SURFACES.filter((s) => s.home?.tier === "hero");

  it("allows at most one hero per section", () => {
    for (const section of HOME_SECTIONS) {
      const n = section.items.filter((s) => s.home?.tier === "hero").length;
      expect({ section: section.title, heroes: n }).toEqual({
        section: section.title,
        heroes: expect.any(Number),
      });
      expect(n).toBeLessThanOrEqual(1);
    }
  });

  it("allows at most three across the whole page", () => {
    // Home also renders two heroes outside the rails, the Pact block and
    // Latest from Kanika, so the rails' own budget is small. Past three the
    // tier stops meaning "this one matters".
    expect(heroes.length).toBeLessThanOrEqual(3);
  });
});

describe("every Home card can actually be drawn", () => {
  // An unmapped href renders a blank tile and no error. Silent, and it
  // happens the moment somebody adds a surface without touching the maps.
  const source = fs.readFileSync(
    path.join(process.cwd(), "components/app-shell/home/HomeExplore.tsx"),
    "utf8",
  );
  const homeSurfaces = APP_SURFACES.filter((s) => s.home);

  it.each(homeSurfaces.map((s) => [s.href] as const))(
    "%s has an icon",
    (href) => {
      expect(source).toContain(`"${href}":`);
    },
  );

  it("gives every Home card a hook to render", () => {
    for (const s of homeSurfaces) {
      expect(s.home!.hook.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("the two tab-only surfaces reached Home", () => {
  it("shows the Feed and the Mark as cards, not just bar icons", () => {
    // A tab is an icon in a bar. Neither taught anyone what it was, and
    // the Feed is the single best desire card the app owns.
    const hrefs = APP_SURFACES.filter((s) => s.home).map((s) => s.href);
    expect(hrefs).toContain("/app/feed");
    expect(hrefs).toContain("/app/measure");
  });

  it("does not give them a duplicate row in the More sheet", () => {
    // Safe because HOME_SECTIONS reads home.section regardless of
    // placement while moreSectionFor returns null for a tab. If that ever
    // changes, these two appear twice in the app's index.
    const feed = APP_SURFACES.find((s) => s.href === "/app/feed");
    const mark = APP_SURFACES.find((s) => s.href === "/app/measure");
    expect(feed?.placement).toBe("tab");
    expect(mark?.placement).toBe("tab");
  });
});

describe("HomeExplore stays a server component", () => {
  it("has no client directive", () => {
    // Home is the most-visited page in the app. A client boundary here
    // ships sixteen cards' worth of interactivity for an entrance
    // animation that CSS does for free.
    const source = fs.readFileSync(
      path.join(process.cwd(), "components/app-shell/home/HomeExplore.tsx"),
      "utf8",
    );
    expect(source.slice(0, 200)).not.toContain("use client");
  });
});
