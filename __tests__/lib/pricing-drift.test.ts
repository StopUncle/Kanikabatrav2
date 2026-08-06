import fs from "fs";
import path from "path";

/**
 * The membership price spent months as ~55 hardcoded strings, and the last
 * app-side literal ("$29 a month" in the UpgradeSheet) survived the
 * constant's introduction by half a year. This file constrains the shape of
 * the codebase the same way stripe-call-sites.test.ts does: inside the app
 * shell and the consilium funnel, a dollar figure for the membership must
 * come from MEMBERSHIP in lib/constants.ts, never be typed in place.
 *
 * Scope is deliberate. Legal copy (app/terms, app/refund) and MDX posts
 * carry intentional literals and are excluded; this guard covers the
 * surfaces a reprice would actually have to hit on day one.
 */

const GUARDED_ROOTS = [
  "components/app-shell",
  "components/consilium",
  "app/hub",
  "app/consilium",
];
const SOURCE_EXTENSIONS = [".ts", ".tsx"];

/** $29, $290, or their cent forms, as rendered copy. */
const MEMBERSHIP_PRICE = /\$29[09]?(?:\.\d\d)?\b/;

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
 * Comments may talk about the price ("the $29 base") without carrying it to
 * a customer. Only rendered code counts.
 */
function isComment(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("{/*")
  );
}

describe("membership price literals", () => {
  const files = GUARDED_ROOTS.flatMap((root) =>
    collectSourceFiles(path.join(process.cwd(), root)),
  );

  it("actually scanned the guarded surfaces", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it("appear nowhere in the app shell or consilium funnel", () => {
    const offenders: string[] = [];

    for (const file of files) {
      const lines = fs.readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (isComment(line)) return;
        if (MEMBERSHIP_PRICE.test(line)) {
          offenders.push(
            `${path.relative(process.cwd(), file)}:${i + 1}  ${line.trim()}`,
          );
        }
      });
    }

    if (offenders.length > 0) {
      throw new Error(
        "Membership price typed in place instead of read from MEMBERSHIP " +
          "(lib/constants.ts). A reprice will silently miss these:\n" +
          offenders.join("\n"),
      );
    }
  });
});
