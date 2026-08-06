/**
 * The book-buyer welcome drip is enqueued once per buyer by the Stripe
 * webhook and then runs unattended for a week. Nobody re-reads these
 * emails before they send, so the contract lives here: the cadence, the
 * links, and the claims. The app-intro step (added 2026-08-06 on the
 * podcast wave) is the one under most churn, and two of its properties
 * are explicit calls from Sam: the UTM tag that attributes the funnel,
 * and NO Ask Kanika mention.
 */

import { buildBookBuyerSequence } from "@/lib/email-sequences";

function entriesFor(name = "Casey") {
  return buildBookBuyerSequence("buyer@example.com", name, "token-123");
}

/**
 * Days between two scheduled sends, to the nearest hour. Anchoring on the
 * sequence's own first step keeps this immune to test-runner clock drift,
 * and the hour rounding absorbs the DST shift addDays' setDate arithmetic
 * can introduce.
 */
function daysBetween(from: Date, to: Date): number {
  const hours = Math.round((to.getTime() - from.getTime()) / (60 * 60 * 1000));
  return hours / 24;
}

describe("buildBookBuyerSequence", () => {
  it("enqueues four steps of the same sequence for the buyer", () => {
    const entries = entriesFor();

    expect(entries).toHaveLength(4);
    expect(new Set(entries.map((e) => e.sequence))).toEqual(
      new Set(["book-buyer-welcome"]),
    );
    expect(new Set(entries.map((e) => e.step))).toEqual(new Set([1, 2, 3, 4]));
    for (const e of entries) {
      expect(e.recipientEmail).toBe("buyer@example.com");
    }
  });

  it("holds the cadence: welcome now, app day 1, trial day 3, reminder day 7", () => {
    const byStep = new Map(entriesFor().map((e) => [e.step, e]));
    const welcome = byStep.get(1)!.scheduledAt;

    expect(daysBetween(welcome, byStep.get(4)!.scheduledAt)).toBe(1);
    expect(daysBetween(welcome, byStep.get(2)!.scheduledAt)).toBe(3);
    expect(daysBetween(welcome, byStep.get(3)!.scheduledAt)).toBe(7);
    // And the welcome itself goes out immediately.
    expect(Math.abs(welcome.getTime() - Date.now())).toBeLessThan(60_000);
  });

  describe("the app-intro step", () => {
    const appIntro = () => entriesFor().find((e) => e.step === 4)!;

    it("links to the app with the ladder campaign's UTM tags", () => {
      const html = appIntro().htmlBody;

      expect(html).toContain("/app?utm_source=email");
      expect(html).toContain("utm_medium=email");
      expect(html).toContain("utm_campaign=book-buyer-ladder");
    });

    it("sells both rungs at their real prices", () => {
      const html = appIntro().htmlBody;

      expect(html).toContain("The Blood Pact");
      expect(html).toContain("$4.99 a week");
      expect(html).toContain("The Consilium");
      expect(html).toContain("$29 a month");
    });

    it("never mentions Ask Kanika", () => {
      // Sam's call, 2026-08-06: the email must not promise Ask Kanika.
      expect(appIntro().htmlBody).not.toMatch(/ask kanika/i);
      expect(appIntro().subject).not.toMatch(/ask kanika/i);
    });
  });

  it("carries the trial token into both trial emails", () => {
    const byStep = new Map(entriesFor().map((e) => [e.step, e]));

    expect(byStep.get(2)!.htmlBody).toContain("token-123");
    expect(byStep.get(3)!.htmlBody).toContain("token-123");
  });

  it("escapes a buyer name that carries markup", () => {
    const entries = entriesFor('<script>alert("x")</script>');

    for (const e of entries) {
      expect(e.htmlBody).not.toContain("<script>");
    }
  });
});
