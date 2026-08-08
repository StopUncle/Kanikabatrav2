import {
  APP_SURFACES,
  HOME_SECTION_ORDER,
  MORE_SECTION_ORDER,
} from "@/lib/app/nav";

/**
 * The two rules lib/app/nav.ts states in prose and nothing enforced.
 *
 * THE SUBSET RULE is the dangerous one. `moreSectionFor()` falls back to a
 * surface's `home.section`, so a Home section name that is not ALSO a
 * MoreSection resolves to nothing, the surface silently drops out of the
 * More sheet, and nav-more-sheet.test.ts fails somewhere else entirely with
 * an error that does not mention section names. A restructure of this file
 * proposed exactly that mistake (Home sections "Keep going" and "The room",
 * neither in MORE_SECTION_ORDER) and only a read of moreSectionFor caught
 * it. The names are one vocabulary; only the ORDER may differ.
 *
 * THE ARGUMENT RULE: the file's header says `unlisted` "has to be argued
 * for in `note`", because a surface nobody can navigate to is either a
 * decision or an accident and the two look identical six months later.
 */

describe("the section vocabulary is shared", () => {
  it("every Home section is also a More section", () => {
    for (const s of HOME_SECTION_ORDER) {
      expect(MORE_SECTION_ORDER).toContain(s);
    }
  });

  it("lets the two disagree about order, which is the point", () => {
    // Home is a shop window and leads with what converts; More is an index
    // and leads with what someone came looking for. Identical ordering
    // would mean one of them is wrong for its job.
    const shared = HOME_SECTION_ORDER.filter((s) =>
      (MORE_SECTION_ORDER as readonly string[]).includes(s),
    );
    expect(shared.length).toBeGreaterThan(1);
  });

  it("resolves every surface to a section that actually exists", () => {
    for (const s of APP_SURFACES) {
      if (s.placement === "tab" || s.placement === "unlisted") continue;
      const name = s.home?.section ?? s.section;
      expect(name).toBeDefined();
      expect(MORE_SECTION_ORDER).toContain(name);
    }
  });
});

describe("every unlisted surface argues for itself", () => {
  const unlisted = APP_SURFACES.filter((s) => s.placement === "unlisted");

  it("has some", () => {
    expect(unlisted.length).toBeGreaterThan(0);
  });

  it.each(unlisted.map((s) => [s.href, s.note] as const))(
    "%s states why it is unreachable",
    (_href, note) => {
      expect(note.trim().length).toBeGreaterThan(0);
    },
  );
});

describe("the menu stayed trimmed", () => {
  const listed = APP_SURFACES.filter(
    (s) => s.placement !== "tab" && s.placement !== "unlisted",
  );

  it("holds no more rows than a person can scan", () => {
    // It reached 27, which is where things started getting lost in it.
    // This is a ratchet, not a target: if a row is genuinely earned, raise
    // the number deliberately and say why here.
    expect(listed.length).toBeLessThanOrEqual(24);
  });

  it("keeps one door per idea for the daily tell", () => {
    // /app/instincts/today and /app/play/tell were the same feature under
    // two names in two different sections. The one on Home is the door.
    const hrefs = listed.map((s) => s.href);
    expect(hrefs).toContain("/app/play/tell");
    expect(hrefs).not.toContain("/app/instincts/today");
  });

  it("no longer lists the two recorded orphans", () => {
    const hrefs = listed.map((s) => s.href);
    expect(hrefs).not.toContain("/app/train/achievements");
    expect(hrefs).not.toContain("/app/previews");
  });
});

describe("`also` prefixes point at routes that exist", () => {
  it("does not claim /app/instincts, which is not a page", () => {
    // It was in Train's `also` for months. Typing it 404s, so the tab it
    // was meant to light never lit for a route nobody could reach.
    const all = APP_SURFACES.flatMap((s) => s.also ?? []);
    expect(all).not.toContain("/app/instincts");
  });

  it("only lists prefixes that some surface actually starts with", () => {
    const hrefs = APP_SURFACES.map((s) => s.href);
    for (const s of APP_SURFACES) {
      for (const prefix of s.also ?? []) {
        const matches = hrefs.some((h) => h === prefix || h.startsWith(prefix));
        expect({ prefix, matches }).toEqual({ prefix, matches: true });
      }
    }
  });
});
