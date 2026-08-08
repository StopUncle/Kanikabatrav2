import {
  DEFAULT_EMAIL_PREFERENCES,
  EMAIL_PREFERENCE_COPY,
  EMAIL_PREFERENCE_KEYS,
  EMAIL_PREFERENCE_ORDER,
  isEmailPreferenceKey,
  isOptedIn,
  mergeEmailPreferences,
  normalizeEmailPreferences,
} from "@/lib/email-preferences";

/**
 * The re-subscribe bug, pinned.
 *
 * The dashboard's settings modal knew four of the five preference keys,
 * read the stored object, and wrote it back wholesale. `questionAnswered`
 * was therefore DELETED from the row on every save. And because every gate
 * in this codebase reads an absent key as opted-IN (a strict `=== false`
 * check, so a newly added preference defaults on rather than off), the
 * deletion silently put people back on a list they had left.
 *
 * Nothing failed. No error, no log, no bounce. The only visible symptom
 * was a member receiving mail they had switched off, months later, blamed
 * on the send rather than on a save they made in a different tab.
 *
 * These tests hold the three properties that make that impossible now:
 * one key list, an absent key reads as opted-in, and every write is a
 * merge that returns all five keys.
 */

describe("the canonical key list", () => {
  it("has copy and an order entry for every key, and no orphans", () => {
    for (const key of EMAIL_PREFERENCE_KEYS) {
      expect(EMAIL_PREFERENCE_COPY[key]).toBeDefined();
      expect(EMAIL_PREFERENCE_COPY[key].title.length).toBeGreaterThan(0);
      expect(EMAIL_PREFERENCE_ORDER).toContain(key);
    }
    expect(EMAIL_PREFERENCE_ORDER).toHaveLength(EMAIL_PREFERENCE_KEYS.length);
    expect(Object.keys(EMAIL_PREFERENCE_COPY).sort()).toEqual(
      [...EMAIL_PREFERENCE_KEYS].sort(),
    );
  });

  it("defaults every key to opted in", () => {
    for (const key of EMAIL_PREFERENCE_KEYS) {
      expect(DEFAULT_EMAIL_PREFERENCES[key]).toBe(true);
    }
  });

  it("still contains questionAnswered", () => {
    // The key the modal dropped. Named explicitly so deleting it from the
    // list is a deliberate act with a failing test attached.
    expect(EMAIL_PREFERENCE_KEYS).toContain("questionAnswered");
  });

  it("recognises its own keys and rejects anything else", () => {
    expect(isEmailPreferenceKey("marketing")).toBe(true);
    expect(isEmailPreferenceKey("questionAnswered")).toBe(true);
    expect(isEmailPreferenceKey("nonsense")).toBe(false);
    expect(isEmailPreferenceKey("")).toBe(false);
    expect(isEmailPreferenceKey(null)).toBe(false);
    expect(isEmailPreferenceKey(undefined)).toBe(false);
    expect(isEmailPreferenceKey(0)).toBe(false);
  });
});

describe("isOptedIn: absent means opted in", () => {
  it("treats only an explicit false as opted out", () => {
    expect(isOptedIn({ marketing: false }, "marketing")).toBe(false);
    expect(isOptedIn({ marketing: true }, "marketing")).toBe(true);
  });

  it("treats an absent key, null and undefined as opted in", () => {
    // This is the convention every live gate already uses. It is asserted
    // here so adopting the shared module cannot quietly invert it and
    // unsubscribe the entire list at once.
    expect(isOptedIn({}, "marketing")).toBe(true);
    expect(isOptedIn(null, "marketing")).toBe(true);
    expect(isOptedIn(undefined, "marketing")).toBe(true);
    expect(isOptedIn({ marketing: null }, "marketing")).toBe(true);
    expect(isOptedIn({ other: false }, "marketing")).toBe(true);
  });

  it("reads a column that holds JSON as a string", () => {
    // The column is Json? and has historically held all three shapes.
    expect(isOptedIn('{"marketing":false}', "marketing")).toBe(false);
    expect(isOptedIn('{"marketing":true}', "marketing")).toBe(true);
  });

  it("does not throw on malformed JSON, and defaults to opted in", () => {
    expect(isOptedIn("{not json", "marketing")).toBe(true);
  });
});

describe("normalizeEmailPreferences", () => {
  it("fills in every missing key", () => {
    const out = normalizeEmailPreferences({ marketing: false });
    expect(out.marketing).toBe(false);
    expect(Object.keys(out).sort()).toEqual([...EMAIL_PREFERENCE_KEYS].sort());
    expect(out.questionAnswered).toBe(true);
  });

  it("drops unknown keys", () => {
    const out = normalizeEmailPreferences({ marketing: true, spam: true });
    expect(out).not.toHaveProperty("spam");
  });

  it("survives null, a string, and junk", () => {
    expect(normalizeEmailPreferences(null)).toEqual(DEFAULT_EMAIL_PREFERENCES);
    expect(normalizeEmailPreferences("{}")).toEqual(DEFAULT_EMAIL_PREFERENCES);
    expect(normalizeEmailPreferences(42)).toEqual(DEFAULT_EMAIL_PREFERENCES);
    expect(normalizeEmailPreferences([])).toEqual(DEFAULT_EMAIL_PREFERENCES);
  });
});

describe("mergeEmailPreferences: the actual fix", () => {
  it("does not resurrect a key the caller left out", () => {
    // THE BUG. A client that knows four keys saves; the fifth must keep
    // the value the user chose, not revert to the opted-in default.
    const stored = { marketing: true, questionAnswered: false };
    const fromAFourKeyClient = {
      marketing: true,
      productUpdates: true,
      sessionReminders: true,
      weeklyDigest: true,
    };
    const merged = mergeEmailPreferences(stored, fromAFourKeyClient);
    expect(merged.questionAnswered).toBe(false);
  });

  it("keeps every other switch when only one is sent", () => {
    const stored = {
      marketing: false,
      productUpdates: false,
      sessionReminders: false,
      weeklyDigest: false,
      questionAnswered: false,
    };
    const merged = mergeEmailPreferences(stored, { marketing: true });
    expect(merged).toEqual({
      marketing: true,
      productUpdates: false,
      sessionReminders: false,
      weeklyDigest: false,
      questionAnswered: false,
    });
  });

  it("always returns all five keys, so absence stops happening", () => {
    const merged = mergeEmailPreferences({}, { marketing: false });
    expect(Object.keys(merged).sort()).toEqual(
      [...EMAIL_PREFERENCE_KEYS].sort(),
    );
  });

  it("ignores unknown keys instead of persisting them", () => {
    const merged = mergeEmailPreferences({}, { evil: true, marketing: false });
    expect(merged).not.toHaveProperty("evil");
    expect(merged.marketing).toBe(false);
  });

  it("ignores non-boolean values rather than coercing them", () => {
    // "false" is truthy. A client sending strings must not flip a switch
    // to the opposite of what the string says.
    const merged = mergeEmailPreferences(
      { marketing: true },
      { marketing: "false" },
    );
    expect(merged.marketing).toBe(true);
  });

  it("merges over a stored value held as a JSON string", () => {
    const merged = mergeEmailPreferences('{"questionAnswered":false}', {
      marketing: false,
    });
    expect(merged.questionAnswered).toBe(false);
    expect(merged.marketing).toBe(false);
  });

  it("is idempotent", () => {
    const once = mergeEmailPreferences({}, { marketing: false });
    const twice = mergeEmailPreferences(once, { marketing: false });
    expect(twice).toEqual(once);
  });
});
