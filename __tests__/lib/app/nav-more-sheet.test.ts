/**
 * The More sheet is the app's index: the only screen that lists every
 * surface the tab bar does not carry. That makes it the place a new
 * surface silently disappears from, which is exactly what happened to the
 * Pact journal, a real page with a real route and zero inbound links for
 * weeks because nothing rendered "nested" placements.
 *
 * These tests fail when a surface is added without deciding where it can
 * be reached from, so the decision has to be made rather than forgotten.
 */

import {
  APP_SURFACES,
  MORE_SECTIONS,
  MORE_SECTION_ORDER,
  moreSectionFor,
  type AppSurface,
} from "@/lib/app/nav";

const listedNonTab = APP_SURFACES.filter(
  (s) => s.placement !== "tab" && s.placement !== "unlisted",
);

const inSheet = new Set(
  MORE_SECTIONS.flatMap((g) => g.items).map((i) => i.href),
);

describe("the More sheet indexes the whole app", () => {
  it("lists every surface that is neither a tab nor deliberately unlisted", () => {
    const missing = listedNonTab
      .filter((s) => !inSheet.has(s.href))
      .map((s) => s.href);

    // A surface here has a route, a label, and no way to reach it: either
    // give it a section, or argue for "unlisted" in its note.
    expect(missing).toEqual([]);
  });

  it("gives every listed non-tab surface a resolvable section", () => {
    const unsectioned = listedNonTab
      .filter((s) => moreSectionFor(s) === null)
      .map((s) => s.href);

    expect(unsectioned).toEqual([]);
  });

  it("never lists a tab or an unlisted route in the sheet", () => {
    const wrong = APP_SURFACES.filter(
      (s) =>
        (s.placement === "tab" || s.placement === "unlisted") &&
        inSheet.has(s.href),
    ).map((s) => s.href);

    // The bar already carries the tabs. A duplicate row is a second place
    // to tap for the same thing and a second thing to keep in sync.
    expect(wrong).toEqual([]);
  });

  it("shows each surface exactly once", () => {
    const hrefs = MORE_SECTIONS.flatMap((g) => g.items).map((i) => i.href);
    expect(hrefs.length).toBe(new Set(hrefs).size);
  });

  it("renders its groups in the declared order, and none empty", () => {
    const titles = MORE_SECTIONS.map((g) => g.title);
    expect(titles).toEqual(
      MORE_SECTION_ORDER.filter((t) => titles.includes(t)),
    );
    for (const g of MORE_SECTIONS) expect(g.items.length).toBeGreaterThan(0);
  });

  it("inherits a Home card's section rather than letting the two disagree", () => {
    const carded = listedNonTab.filter(
      (s): s is AppSurface & { home: NonNullable<AppSurface["home"]> } =>
        !!s.home && !s.section,
    );
    // Not a formality: Home and the sheet are two indexes of one app, and
    // a surface filed under different names in each is how a member ends
    // up believing there are two different features.
    expect(carded.length).toBeGreaterThan(0);
    for (const s of carded) {
      expect(moreSectionFor(s)).toBe(s.home.section);
    }
  });
});
