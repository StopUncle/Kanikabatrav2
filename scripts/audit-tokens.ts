/**
 * Design-token audit for the app shell.
 *
 * The app has a real palette (the --app-* and --game-* variables defined on
 * [data-app-shell] in globals.css) and no scale at all for type. So colour
 * drifts quietly, and font sizes are invented per component: reading through
 * the shell you find 15px, 13.5px, 12.5px, 11.5px and 9.5px inside a single
 * file, none of them from anywhere.
 *
 * This turns "it feels inconsistent" into a list. It judges nothing on its
 * own: an off-palette colour might be exactly right. What it does is make
 * every one of them a decision somebody made on purpose, which is the whole
 * point of the exercise.
 *
 *   npx tsx scripts/audit-tokens.ts            # summary
 *   npx tsx scripts/audit-tokens.ts --sizes    # every font size, with counts
 *   npx tsx scripts/audit-tokens.ts --colors   # every off-palette colour
 *   npx tsx scripts/audit-tokens.ts --offscale # sizes off the proposed scale
 *   npx tsx scripts/audit-tokens.ts --file <path>
 */

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app/hub", "components/app-shell"];
const CSS = "app/globals.css";

/**
 * A proposed type scale, derived from what the app already does rather than
 * imposed on it. Every step below is one of the sizes already in heaviest
 * use; nothing here is invented.
 *
 * The giveaway that there is no scale today is the half-pixels: 12.5, 13.5,
 * 11.5, 10.5, 14.5, 9.5, 15.5, 16.5. Nobody chooses 13.5px. Those are nudges
 * made to fix one line in one component, and each one is a small permanent
 * exception that the next person copies.
 *
 * Not enforced, and deliberately not auto-fixed: which way 12.5 rounds is a
 * judgement about that specific line. The point is to make each one visible
 * so it gets decided instead of inherited.
 */
const SCALE = [9, 10, 11, 12, 13, 15, 19, 22, 28];

/* ------------------------------------------------------------------ tokens */

function paletteFromCss(): Set<string> {
  const css = fs.readFileSync(CSS, "utf8");
  const block = css.slice(css.indexOf("[data-app-shell]"));
  const body = block.slice(0, block.indexOf("}"));
  const found = new Set<string>();
  for (const m of Array.from(body.matchAll(/#[0-9a-fA-F]{3,8}\b/g))) {
    found.add(m[0].toLowerCase());
  }
  for (const m of Array.from(body.matchAll(/rgba?\([^)]+\)/g))) {
    found.add(m[0].replace(/\s+/g, "").toLowerCase());
  }
  return found;
}

/* ------------------------------------------------------------------- walk */

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

interface Hit {
  file: string;
  line: number;
  value: string;
}

function scan(files: string[]) {
  const palette = paletteFromCss();
  const sizes: Hit[] = [];
  const colors: Hit[] = [];
  const opacityUtils: Hit[] = [];

  for (const file of files) {
    // The dev harnesses exist to show off-palette treatments side by side.
    if (file.includes(`dev${path.sep}`)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const at = { file: file.replace(/\\/g, "/"), line: i + 1 };

      for (const m of Array.from(line.matchAll(/text-\[([0-9.]+)px\]/g))) {
        sizes.push({ ...at, value: `${m[1]}px` });
      }
      for (const m of Array.from(line.matchAll(/#[0-9a-fA-F]{3,8}\b/g))) {
        const hex = m[0].toLowerCase();
        if (!palette.has(hex)) colors.push({ ...at, value: hex });
      }
      for (const m of Array.from(line.matchAll(/rgba?\([^)]+\)/g))) {
        const v = m[0].replace(/\s+/g, "").toLowerCase();
        if (!palette.has(v)) colors.push({ ...at, value: m[0] });
      }
      // The old skin's idiom. Inside the app shell it bypasses the palette.
      for (const m of Array.from(line.matchAll(/\b(?:bg|text|border)-(?:white|black)\/\[?[0-9.]+\]?/g))) {
        opacityUtils.push({ ...at, value: m[0] });
      }
    });
  }
  return { sizes, colors, opacityUtils };
}

/* ----------------------------------------------------------------- report */

function tally(hits: Hit[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const h of hits) counts.set(h.value, (counts.get(h.value) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function byFile(hits: Hit[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const h of hits) counts.set(h.file, (counts.get(h.file) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function main() {
  const args = process.argv.slice(2);
  const only = args.includes("--file") ? args[args.indexOf("--file") + 1] : null;

  let files = ROOTS.flatMap((r) => (fs.existsSync(r) ? walk(r) : []));
  if (only) files = files.filter((f) => f.replace(/\\/g, "/").includes(only));

  const { sizes, colors, opacityUtils } = scan(files);
  const sizeTally = tally(sizes);

  if (args.includes("--sizes")) {
    console.log("font sizes in use, most common first\n");
    for (const [v, n] of sizeTally) console.log(`  ${v.padEnd(9)} ${n}`);
    return;
  }
  if (args.includes("--offscale")) {
    const off = sizes.filter((h) => !SCALE.includes(parseFloat(h.value)));
    console.log(`proposed scale: ${SCALE.map((s) => s + "px").join("  ")}\n`);
    console.log(
      `${off.length} of ${sizes.length} uses are off it (${tally(off).length} distinct sizes)\n`,
    );
    for (const [v, n] of tally(off)) {
      const num = parseFloat(v);
      const nearest = SCALE.reduce((a, b) =>
        Math.abs(b - num) < Math.abs(a - num) ? b : a,
      );
      console.log(`  ${v.padEnd(9)} ${String(n).padStart(3)} uses   nearest ${nearest}px`);
    }
    console.log("\nwhere:\n");
    for (const [f, n] of byFile(off).slice(0, 12)) {
      console.log(`  ${String(n).padStart(3)}  ${f}`);
    }
    return;
  }
  if (args.includes("--colors")) {
    console.log("off-palette colours\n");
    for (const [v, n] of tally(colors)) console.log(`  ${v.padEnd(28)} ${n}`);
    console.log("\nwhere:\n");
    for (const [f, n] of byFile(colors)) console.log(`  ${String(n).padStart(3)}  ${f}`);
    return;
  }

  console.log(`scanned ${files.length} files under ${ROOTS.join(", ")}\n`);

  console.log(`TYPE   ${sizeTally.length} distinct font sizes across ${sizes.length} uses`);
  console.log(`       most used: ${sizeTally.slice(0, 6).map(([v, n]) => `${v}(${n})`).join(" ")}`);
  const oneOffs = sizeTally.filter(([, n]) => n === 1);
  console.log(`       ${oneOffs.length} used exactly once: ${oneOffs.slice(0, 12).map(([v]) => v).join(" ")}`);

  console.log(`\nCOLOUR ${tally(colors).length} distinct off-palette values across ${colors.length} uses`);
  for (const [f, n] of byFile(colors).slice(0, 6)) {
    console.log(`       ${String(n).padStart(3)}  ${f}`);
  }

  console.log(`\nOLD SKIN ${opacityUtils.length} white/black opacity utilities (the pre-app idiom)`);
  for (const [f, n] of byFile(opacityUtils).slice(0, 6)) {
    console.log(`       ${String(n).padStart(3)}  ${f}`);
  }

  console.log(`\n--sizes / --colors for the full lists, --file <path> to narrow.`);
}

main();
