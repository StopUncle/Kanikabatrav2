import { safeRedirect, readSafeRedirect } from "@/lib/auth/safe-redirect";

/**
 * All three login doors hand their ?redirect= / ?returnTo= param to
 * router.push, which performs a hard navigation for an absolute URL. An
 * unvalidated value therefore turned the real sign-in page on the real
 * domain into a launcher for someone else's.
 */
describe("safeRedirect", () => {
  const BACKSLASH = String.fromCharCode(92);

  describe("refuses anything that can leave the origin", () => {
    const hostile = [
      "https://evil.example/kanika",
      "http://evil.example",
      "//evil.example",
      `/${BACKSLASH}evil.example`,
      `/${BACKSLASH}${BACKSLASH}evil.example`,
      "javascript:alert(1)",
      "app/pact",
      "",
    ];

    it.each(hostile)("refuses %j", (value) => {
      expect(safeRedirect(value)).toBeNull();
    });

    it("refuses a smuggled control character", () => {
      expect(safeRedirect(`/app${String.fromCharCode(10)}x`)).toBeNull();
    });

    it("refuses null and undefined", () => {
      expect(safeRedirect(null)).toBeNull();
      expect(safeRedirect(undefined)).toBeNull();
    });
  });

  describe("allows same-origin paths", () => {
    const legit = [
      "/app",
      "/app/pact/week",
      "/consilium/feed",
      "/quiz/results/abc123?x=1",
      "/app/feed#top",
    ];

    it.each(legit)("allows %s", (value) => {
      expect(safeRedirect(value)).toBe(value);
    });
  });
});

describe("readSafeRedirect", () => {
  it("prefers returnTo when both are present and safe", () => {
    const params = new URLSearchParams({
      returnTo: "/app/pact",
      redirect: "/app/feed",
    });

    expect(readSafeRedirect(params)).toBe("/app/pact");
  });

  it("falls through to redirect when returnTo is hostile", () => {
    const params = new URLSearchParams({
      returnTo: "https://evil.example",
      redirect: "/app/feed",
    });

    expect(readSafeRedirect(params)).toBe("/app/feed");
  });

  it("returns null when neither is usable", () => {
    const params = new URLSearchParams({ returnTo: "//evil.example" });

    expect(readSafeRedirect(params)).toBeNull();
  });
});
