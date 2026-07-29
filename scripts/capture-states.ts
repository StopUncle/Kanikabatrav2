/**
 * Walk every surface as every persona, and put the results on one page.
 *
 * The state gallery. Not a set of hand-drawn empty states, which would drift
 * from the app the moment either changed, but the real screens rendered with
 * real data by real accounts. The fixtures (scripts/fixtures.ts) supply the
 * states; lib/app/nav.ts supplies the list of surfaces; this walks the cross
 * product and builds a contact sheet.
 *
 * Why it matters more than it sounds: until the fixtures existed, every
 * screen here had only been looked at as an active member with full progress.
 * Nobody had seen an empty leaderboard, a Mark with no readings, or a climb
 * with nothing cleared, and with a free tier arriving those become the first
 * thing most people see.
 *
 *   npx tsx scripts/capture-states.ts
 *   npx tsx scripts/capture-states.ts --personas anon,day30
 *   npx tsx scripts/capture-states.ts --surface measure
 *   npx tsx scripts/capture-states.ts --all         # all six personas
 *
 * Needs the dev server up on :3000 and `fixtures.ts up` already run. Writes
 * to .state-capture/ (gitignored); open index.html when it finishes.
 */

import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { APP_SURFACES } from "../lib/app/nav";

const BASE = "http://localhost:3000";
const OUT = ".state-capture";
const PASSWORD = "fixture-1234";
const VIEWPORT = { width: 390, height: 812 };

/** Empty, typical and full. The three that differ most, unless --all. */
const DEFAULT_PERSONAS = ["anon", "day30", "power"];
const ALL_PERSONAS = ["anon", "day1", "day30", "dormant", "lapsed", "power"];

interface Shot {
  persona: string;
  href: string;
  label: string;
  file: string;
  status: number | null;
  /** Rendered text length: a surface that renders almost nothing is a finding. */
  textLength: number;
  note: string;
}

function arg(name: string): string | null {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? (process.argv[i + 1] ?? null) : null;
}

/**
 * Log in, patiently.
 *
 * The dev server compiles each route on first request, so an early pass over
 * 28 surfaces leaves it starved: a login that normally takes 200ms was
 * measured at 147 seconds mid-run. Generous timeouts and one retry, and a
 * failure here returns false rather than throwing, so one bad persona cannot
 * cost the whole run its contact sheet.
 */
async function loginAs(page: Page, persona: string): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await page.request.post(`${BASE}/api/auth/login`, {
        data: { email: `${persona}@fixture.local`, password: PASSWORD },
        timeout: 180_000,
      });
      if (res.ok()) return true;
    } catch {
      /* fall through to the retry */
    }
  }
  return false;
}

async function capture(browser: Browser, persona: string, surfaces: typeof APP_SURFACES) {
  // A fresh context per persona so cookies never leak between them, which
  // would silently make every shot after the first one a lie.
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  if (!(await loginAs(page, persona))) {
    console.log(`  ${persona}: login failed, is fixtures.ts up?`);
    await context.close();
    return [];
  }

  const shots: Shot[] = [];
  for (const surface of surfaces) {
    const file = `${persona}__${surface.href.replace(/[^a-z0-9]+/gi, "-")}.png`;
    let status: number | null = null;
    let textLength = 0;
    let note = "";
    try {
      const res = await page.goto(BASE + surface.href, {
        waitUntil: "domcontentloaded",
        timeout: 90_000,
      });
      status = res?.status() ?? null;
      // Let the shell settle: fonts, the tab bar, any first paint animation.
      await page.waitForTimeout(900);
      textLength = (await page.evaluate(() => document.body.innerText)).trim().length;
      if (page.url() !== BASE + surface.href) note = `redirected to ${page.url().replace(BASE, "")}`;
      await page.screenshot({ path: path.join(OUT, file) });
    } catch (err) {
      note = String(err).split("\n")[0].slice(0, 90);
    }
    shots.push({ persona, href: surface.href, label: surface.label, file, status, textLength, note });
    process.stdout.write(".");
  }

  await context.close();
  return shots;
}

function html(shots: Shot[], personas: string[]): string {
  const bySurface = new Map<string, Shot[]>();
  for (const s of shots) {
    if (!bySurface.has(s.href)) bySurface.set(s.href, []);
    bySurface.get(s.href)!.push(s);
  }

  const rows = Array.from(bySurface.entries())
    .map(([href, group]) => {
      const label = group[0].label;
      const cells = personas
        .map((p) => {
          const shot = group.find((g) => g.persona === p);
          if (!shot) return `<td class="miss">—</td>`;
          const thin = shot.textLength < 400;
          const flag = shot.note
            ? `<span class="note">${shot.note}</span>`
            : thin
              ? `<span class="thin">renders ${shot.textLength} chars</span>`
              : "";
          return `<td>
            <img src="${shot.file}" loading="lazy" alt="${p} ${label}">
            <div class="meta">${shot.status ?? "err"} ${flag}</div>
          </td>`;
        })
        .join("");
      return `<tr><th><b>${label}</b><code>${href}</code></th>${cells}</tr>`;
    })
    .join("\n");

  return `<!doctype html><meta charset="utf-8">
<title>State capture</title>
<style>
  body { background:#0a0908; color:#ece7de; font:14px/1.5 ui-sans-serif,system-ui; margin:0; padding:24px; }
  h1 { font-weight:300; font-size:26px; margin:0 0 4px; }
  p.sub { color:#9a938a; margin:0 0 24px; }
  table { border-collapse:collapse; }
  th { text-align:left; vertical-align:top; padding:12px 16px 12px 0; width:210px; font-weight:400; }
  th code { display:block; color:#67615a; font-size:11px; margin-top:2px; }
  td { padding:0 10px 26px 0; vertical-align:top; }
  img { width:230px; border:1px solid rgba(212,175,55,0.15); border-radius:10px; display:block; background:#000; }
  .meta { color:#67615a; font-size:11px; margin-top:5px; }
  .thin { color:#d4af37; }
  .note { color:#b76e79; }
  .miss { color:#67615a; }
  thead th { color:#d4af37; text-transform:uppercase; letter-spacing:.16em; font-size:11px; }
</style>
<h1>State capture</h1>
<p class="sub">${bySurface.size} surfaces × ${personas.length} personas, ${VIEWPORT.width}×${VIEWPORT.height}. Gold means the page rendered almost nothing; rose means it errored or redirected.</p>
<table>
  <thead><tr><th></th>${personas.map((p) => `<th>${p}</th>`).join("")}</tr></thead>
  <tbody>${rows}</tbody>
</table>`;
}

async function main() {
  const personas = process.argv.includes("--all")
    ? ALL_PERSONAS
    : (arg("personas")?.split(",") ?? DEFAULT_PERSONAS);

  const only = arg("surface");
  const surfaces = APP_SURFACES.filter(
    (s) =>
      !s.href.includes("[") && // dynamic routes need an id; not generically visitable
      s.maturity !== "dev" &&
      (!only || s.href.includes(only)),
  );

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  console.log(`${surfaces.length} surfaces × ${personas.length} personas`);
  const browser = await chromium.launch();
  const all: Shot[] = [];
  for (const persona of personas) {
    process.stdout.write(`  ${persona.padEnd(8)}`);
    all.push(...(await capture(browser, persona, surfaces)));
    process.stdout.write("\n");
  }
  await browser.close();

  fs.writeFileSync(path.join(OUT, "index.html"), html(all, personas));

  const thin = all.filter((s) => !s.note && s.textLength < 400);
  const broken = all.filter((s) => s.note);
  console.log(`\n${all.length} shots -> ${OUT}/index.html`);
  if (broken.length) {
    console.log(`\n${broken.length} errored or redirected:`);
    for (const s of broken) console.log(`  ${s.persona.padEnd(8)} ${s.href.padEnd(26)} ${s.note}`);
  }
  if (thin.length) {
    console.log(`\n${thin.length} rendered almost nothing (under 400 chars):`);
    for (const s of thin) console.log(`  ${s.persona.padEnd(8)} ${s.href.padEnd(26)} ${s.textLength} chars`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
