import {
  BOT_PERSONAS,
  getActivePersonas,
  getPersonaBySlug,
} from "@/lib/bots/personas";

describe("BOT_PERSONAS", () => {
  it("has exactly 20 personas", () => {
    expect(BOT_PERSONAS).toHaveLength(20);
  });

  it("every persona has a unique slug", () => {
    const slugs = BOT_PERSONAS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(20);
  });

  it("every slug is lowercase ascii", () => {
    for (const p of BOT_PERSONAS) {
      expect(p.slug).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("at least 5 personas have brokenEnglish set", () => {
    const broken = BOT_PERSONAS.filter((p) => p.brokenEnglish !== false);
    expect(broken.length).toBeGreaterThanOrEqual(5);
  });

  it("getActivePersonas filters inactive ones", () => {
    expect(getActivePersonas().every((p) => p.active)).toBe(true);
  });

  it("getPersonaBySlug returns the right one", () => {
    expect(getPersonaBySlug("damon")?.displayName).toBe("Damon");
    expect(getPersonaBySlug("nope")).toBeUndefined();
  });
});
