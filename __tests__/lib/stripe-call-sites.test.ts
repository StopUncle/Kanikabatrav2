import fs from "fs";
import path from "path";

/**
 * Repo-wide guard on how Checkout Sessions get built.
 *
 * The `consent_collection` outage was fixed once and stayed broken, because
 * it existed twice. `lib/stripe.ts` was patched; `app/api/donate/create-session`
 * builds its session by hand and kept the parameter, so donations went on
 * returning 500 in production after the "fix" shipped. A live smoke test found
 * it; no unit test could have, because the tests around the shared factory
 * cannot see a call site that bypasses the factory.
 *
 * So this file does not test behaviour. It reads the source and constrains the
 * shape of the codebase itself: every hand-built session is a place the next
 * account-restricted parameter can hide, so a new one has to be declared here
 * before it can ship.
 */

const SOURCE_ROOTS = ["app", "lib", "components", "scripts"];
const SOURCE_EXTENSIONS = [".ts", ".tsx"];

/**
 * Files permitted to call `stripe.checkout.sessions.create` directly.
 *
 * Adding to this list is a real decision, not a formality. A hand-built
 * session does not inherit the parameter allowlist enforced in
 * stripe-session.test.ts, so it must be covered by its own test.
 */
const KNOWN_SESSION_BUILDERS = [
  "lib/stripe.ts",
  "app/api/donate/create-session/route.ts",
];

/**
 * Stripe parameters this account cannot use, with the damage each one did.
 *
 * These are not style preferences. Each fails at `sessions.create` with a 400,
 * which means the customer sees a dead buy button and the failure never
 * reaches a payment attempt Stripe can show you.
 */
const FORBIDDEN_PARAMS: Array<{ param: string; why: string }> = [
  {
    param: "consent_collection",
    why: "Stripe refuses `promotions` for this account's country. Took every one-time checkout down (1f6924d) and then donations separately.",
  },
];

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(full, acc);
    } else if (SOURCE_EXTENSIONS.includes(path.extname(entry.name))) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Strip comments so a line explaining why a parameter is banned does not
 * read as the parameter being used. Crude on purpose: it can truncate a
 * string containing "//", which is harmless here because that can only hide
 * a match, and every match this file cares about is a bare object key.
 */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const REPO_ROOT = path.resolve(__dirname, "../..");

const sourceFiles = SOURCE_ROOTS.flatMap((root) =>
  collectSourceFiles(path.join(REPO_ROOT, root)),
).map((absolute) => ({
  relative: path.relative(REPO_ROOT, absolute).split(path.sep).join("/"),
  code: stripComments(fs.readFileSync(absolute, "utf8")),
}));

describe("Stripe call sites", () => {
  it("finds source files to scan", () => {
    // A silently empty scan would make every test below pass for the wrong
    // reason, which is the failure mode this whole file exists to prevent.
    expect(sourceFiles.length).toBeGreaterThan(100);
  });

  it.each(FORBIDDEN_PARAMS)(
    "never passes $param to Stripe anywhere in the repo",
    ({ param, why }) => {
      const offenders = sourceFiles
        .filter(({ code }) => new RegExp(`\\b${param}\\s*:`).test(code))
        .map(({ relative }) => relative);

      expect(offenders).toEqual([]);
      // Keep the reason attached to the assertion so a future failure explains
      // itself without a git archaeology session.
      expect(why).toBeTruthy();
    },
  );

  it("builds checkout sessions only in files that are individually tested", () => {
    const builders = sourceFiles
      .filter(({ code }) => code.includes("checkout.sessions.create"))
      .map(({ relative }) => relative)
      .sort();

    expect(builders).toEqual([...KNOWN_SESSION_BUILDERS].sort());
  });

  it("routes every product checkout through the shared factory", () => {
    // The factory is the only place the parameter allowlist is enforced, so
    // anything selling a product should reach Stripe through it. The donation
    // route is the one exception, and it is named here rather than tolerated
    // silently.
    const handBuilt = sourceFiles
      .filter(({ code }) => code.includes("checkout.sessions.create"))
      .map(({ relative }) => relative)
      .filter((file) => file !== "lib/stripe.ts");

    expect(handBuilt).toEqual(["app/api/donate/create-session/route.ts"]);
  });
});
