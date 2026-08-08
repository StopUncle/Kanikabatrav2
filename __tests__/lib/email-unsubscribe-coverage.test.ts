import fs from "fs";
import path from "path";

/**
 * Repo-wide guard on unsubscribe coverage.
 *
 * The audit that produced this file found four marketing emails shipping
 * with no opt-out at all, and one of them, the highest-volume cold send in
 * the product, contained the sentence "You can unsubscribe at the bottom
 * of any of them" above a footer that had no link in it. Nothing caught
 * that, because no test can see an email nobody thought to test.
 *
 * So this file does not test behaviour. It reads the source and constrains
 * the shape of the codebase: a sender named here as marketing must render
 * a footer and pass unsubscribe headers, and adding a new marketing sender
 * means declaring it here first.
 *
 * Why it matters beyond the law: an unsubscribe people cannot find does
 * not reduce unsubscribes, it produces spam complaints, and complaints
 * cost the sending reputation of the whole domain, including the receipts
 * and the password resets.
 */

const EMAIL_SOURCE = path.join(process.cwd(), "lib", "email.ts");

/**
 * Senders in `lib/email.ts` that are marketing or lifecycle, and therefore
 * must carry an opt-out.
 *
 * Transactional senders are deliberately absent: a receipt, a password
 * reset, a book delivery or a coaching intake must reach the recipient
 * whatever they have switched off, and giving those an unsubscribe link
 * would be a bug in the other direction.
 */
const MUST_HAVE_OPT_OUT = [
  "sendQuizResults",
  "sendWeeklyDigest",
  "sendFreeWelcome",
  "sendMembershipEndingSoon",
  "sendConsiliumGiftInvite",
  "sendConsiliumBonusMonth",
  "sendQuestionAnswered",
  "sendMiniDarkMirrorResult",
  "sendStarterPack",
];

/** Extract the source of one `export const <name> = async (...) => {...}`. */
function senderBody(source: string, name: string): string {
  const start = source.indexOf(`export const ${name} =`);
  if (start === -1) {
    throw new Error(
      `${name} no longer exists in lib/email.ts. If it was renamed or removed, update MUST_HAVE_OPT_OUT.`,
    );
  }
  // Runs to the next top-level export, which is where the next sender
  // begins. Good enough to scope the assertions and cheap to compute.
  const next = source.indexOf("\nexport const ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

describe("every marketing email carries an opt-out", () => {
  const source = fs.readFileSync(EMAIL_SOURCE, "utf8");

  it.each(MUST_HAVE_OPT_OUT)("%s renders an unsubscribe footer", (name) => {
    const body = senderBody(source, name);
    const rendersFooter =
      /marketingFooterByEmailHtml|marketingFooterHtml|marketingEmailExtras/.test(
        body,
      ) && /\$\{(footerHtml|\w*[Ff]ooterHtml|marketingFooter)/.test(body);
    expect(rendersFooter).toBe(true);
  });

  it.each(MUST_HAVE_OPT_OUT)(
    "%s passes List-Unsubscribe headers to sendEmail",
    (name) => {
      const body = senderBody(source, name);
      // Either the bundled helper or the headers helper, and the result
      // actually handed to sendEmail. Gmail and Yahoo bulk-sender rules
      // want the header, not just the body link.
      const buildsHeaders =
        /marketingEmailExtras|marketingUnsubscribeHeaders/.test(body);
      const passesHeaders = /headers[,:]/.test(body);
      expect(buildsHeaders && passesHeaders).toBe(true);
    },
  );

  it("no sender promises an unsubscribe link without rendering one", () => {
    // The exact failure that shipped: copy describing an opt-out the
    // template never drew.
    for (const name of MUST_HAVE_OPT_OUT) {
      const body = senderBody(source, name);
      if (/unsubscribe at the bottom|link at the bottom/i.test(body)) {
        expect(
          /marketingFooterByEmailHtml|marketingFooterHtml|marketingEmailExtras/.test(
            body,
          ),
        ).toBe(true);
      }
    }
  });
});

describe("the drip sequences", () => {
  it("routes every marketing step through the shared footer helper", () => {
    const sequences = fs.readFileSync(
      path.join(process.cwd(), "lib", "email-sequences.ts"),
      "utf8",
    );
    // Every builder that declares itself marketing must also be wrapped.
    const marketingMetaCount = (sequences.match(/MARKETING_META/g) ?? [])
      .length;
    const footerCount = (sequences.match(/withMarketingFooter/g) ?? []).length;
    expect(marketingMetaCount).toBeGreaterThan(0);
    expect(footerCount).toBeGreaterThan(0);
  });

  it("classifies the pact welcome explicitly rather than by omission", () => {
    const sequences = fs.readFileSync(
      path.join(process.cwd(), "lib", "email-sequences.ts"),
      "utf8",
    );
    // It is transactional, a confirmation of something just paid for, and
    // must reach someone who opted out of marketing. The point is that the
    // classification is stated: an absent isMarketing reads as an
    // oversight and skips the preflight silently.
    const start = sequences.indexOf("export function buildPactWelcomeEntry");
    expect(start).toBeGreaterThan(-1);
    const next = sequences.indexOf("\nfunction ", start);
    const body = sequences.slice(start, next === -1 ? undefined : next);
    expect(body).toContain("isMarketing: false");
  });
});

describe("the footer itself", () => {
  const footer = fs.readFileSync(
    path.join(process.cwd(), "lib", "email-footer.ts"),
    "utf8",
  );

  it("sets the unsubscribe link at body-copy size, not fine print", () => {
    // It was 12px grey. A control people cannot find produces complaints
    // rather than fewer unsubscribes.
    const linkLine = footer
      .split("\n")
      .find((l) => l.includes(">Unsubscribe<"));
    expect(linkLine).toBeDefined();
    const size = linkLine?.match(/font-size:\s*(\d+)px/)?.[1];
    expect(Number(size)).toBeGreaterThanOrEqual(14);
  });

  it("points the manage link at the cohort router, not a fixed shell", () => {
    // A hardcoded shell path in a footer outlives the choice: these links
    // sit in inboxes for a year.
    expect(footer).toContain("/preferences");
  });

  it("sends both RFC 8058 headers together", () => {
    expect(footer).toContain("List-Unsubscribe");
    expect(footer).toContain("List-Unsubscribe-Post");
    expect(footer).toContain("List-Unsubscribe=One-Click");
  });
});
