/**
 * The first sixty seconds, as a filmstrip.
 *
 * Every screen in the arrival path exists and has been looked at on its own.
 * Nobody has watched them in order, as one person, in one sitting, which is
 * the only way they will ever actually be experienced. A surge is coming and
 * this is the sequence it lands on.
 *
 * Each step records what the member sees, how long they waited for it, and
 * whether the thing they were meant to tap could be found at all. A step
 * that cannot find its target does not stop the run: a broken doorway on
 * step three is exactly what this is for, and the steps after it still say
 * something useful.
 *
 *   npx tsx scripts/first-sixty.ts
 *   npx tsx scripts/first-sixty.ts --persona day1
 *
 * Needs the dev server on :3000 and `fixtures.ts up`. Writes to
 * .first-sixty/ (gitignored); open index.html.
 */

import fs from "node:fs";
import path from "node:path";
import { chromium, type Page } from "playwright";

const BASE = "http://localhost:3000";
const OUT = ".first-sixty";
const PASSWORD = "fixture-1234";
const VIEWPORT = { width: 390, height: 812 };

interface Step {
  /** What the member is doing, in their terms rather than ours. */
  title: string;
  /** Why this step is in the path at all. */
  why: string;
  run: (page: Page) => Promise<void>;
}

/** Click the first thing matching any of these, and say which one worked. */
async function tapAny(page: Page, labels: (string | RegExp)[]): Promise<string> {
  for (const label of labels) {
    const target = page.getByText(label).first();
    if (await target.isVisible().catch(() => false)) {
      await target.click({ timeout: 5000 });
      return String(label);
    }
  }
  throw new Error(`nothing to tap: ${labels.map(String).join(" / ")}`);
}

const STEPS: Step[] = [
  {
    title: "Lands in the app",
    why: "The first screen. Everything downstream is decided by whether this reads as somewhere worth being.",
    run: async (page) => {
      await page.goto(`${BASE}/app`, { waitUntil: "domcontentloaded" });
    },
  },
  {
    title: "Reads the first week",
    why: "The Day-0 checklist is the only thing telling a new member what to do first.",
    run: async (page) => {
      await page.waitForTimeout(1200);
    },
  },
  {
    title: "Opens the Arrival",
    why: "The welcome. Shown once, and the only place the product explains itself.",
    run: async (page) => {
      await page.goto(`${BASE}/app/welcome`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);
    },
  },
  {
    title: "Begins the Baseline Read",
    why: "The before-picture. The single strongest retention device, and it happens in the first minute or not at all.",
    run: async (page) => {
      await page.goto(`${BASE}/app/measure/baseline`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2000);
    },
  },
  {
    title: "Answers the first item",
    why: "The first real interaction. If this is confusing, nothing else gets a chance.",
    run: async (page) => {
      await tapAny(page, [/^A\b/, /^1\b/, /Begin/i, /Start/i]);
      await page.waitForTimeout(1500);
    },
  },
  {
    title: "Goes to Train",
    why: "The room every way to practise opens off.",
    run: async (page) => {
      await page.goto(`${BASE}/app/train`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);
    },
  },
  {
    title: "Opens the Simulator",
    why: "The deepest thing in the product, and the one that is hers rather than generic.",
    run: async (page) => {
      await page.goto(`${BASE}/app/train/climb`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2000);
    },
  },
];

function arg(name: string): string | null {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? (process.argv[i + 1] ?? null) : null;
}

async function main() {
  const persona = arg("persona") ?? "anon";
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const login = await page.request.post(`${BASE}/api/auth/login`, {
    data: { email: `${persona}@fixture.local`, password: PASSWORD },
    timeout: 120_000,
  });
  if (!login.ok()) {
    console.log(`login failed for ${persona}. Run: npx tsx scripts/fixtures.ts up`);
    await browser.close();
    return;
  }

  const results: { step: Step; file: string; ms: number; note: string; chars: number }[] = [];
  const journeyStart = Date.now();

  for (let i = 0; i < STEPS.length; i++) {
    const step = STEPS[i];
    const started = Date.now();
    let note = "";
    try {
      await step.run(page);
    } catch (err) {
      note = String(err).split("\n")[0].replace("Error: ", "").slice(0, 90);
    }
    const file = `${String(i + 1).padStart(2, "0")}-${step.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
    await page.screenshot({ path: path.join(OUT, file) });
    const chars = (await page.evaluate(() => document.body.innerText)).trim().length;
    results.push({ step, file, ms: Date.now() - started, note, chars });
    console.log(`  ${String(i + 1).padStart(2)}. ${step.title.padEnd(28)} ${String(Date.now() - started).padStart(5)}ms ${note}`);
  }

  const total = Date.now() - journeyStart;
  await browser.close();

  const cards = results
    .map(
      (r, i) => `<figure>
  <img src="${r.file}" alt="${r.step.title}">
  <figcaption>
    <b>${i + 1}. ${r.step.title}</b>
    <span class="ms">${(r.ms / 1000).toFixed(1)}s</span>
    <p>${r.step.why}</p>
    ${r.note ? `<p class="note">${r.note}</p>` : ""}
    ${!r.note && r.chars < 400 ? `<p class="thin">renders ${r.chars} characters</p>` : ""}
  </figcaption>
</figure>`,
    )
    .join("\n");

  fs.writeFileSync(
    path.join(OUT, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>The first sixty seconds</title>
<style>
 body{background:#0a0908;color:#ece7de;font:14px/1.55 ui-sans-serif,system-ui;margin:0;padding:26px}
 h1{font-weight:300;font-size:26px;margin:0 0 4px}
 p.sub{color:#9a938a;margin:0 0 26px}
 .strip{display:flex;gap:18px;overflow-x:auto;padding-bottom:14px}
 figure{margin:0;flex:0 0 250px}
 img{width:250px;border:1px solid rgba(212,175,55,.15);border-radius:12px;display:block;background:#000}
 figcaption{padding-top:9px}
 figcaption b{display:block;font-weight:500}
 .ms{color:#d4af37;font-size:12px}
 figcaption p{color:#67615a;font-size:12px;margin:5px 0 0}
 .note{color:#b76e79!important}
 .thin{color:#d4af37!important}
</style>
<h1>The first sixty seconds</h1>
<p class="sub">As <b>${persona}</b>, in order, at ${VIEWPORT.width}&times;${VIEWPORT.height}. ${(total / 1000).toFixed(1)}s end to end.</p>
<div class="strip">${cards}</div>`,
  );

  const broken = results.filter((r) => r.note);
  console.log(`\n${(total / 1000).toFixed(1)}s end to end -> ${OUT}/index.html`);
  if (broken.length) {
    console.log(`\n${broken.length} step(s) could not complete:`);
    for (const b of broken) console.log(`  ${b.step.title}: ${b.note}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
