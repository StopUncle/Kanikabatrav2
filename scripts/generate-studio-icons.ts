/**
 * Renders the Studio app icons from an inline SVG.
 *
 * Studio installs as its own home-screen app beside the member Consilium
 * icon, so it must not reuse /public/icons/*: two identical icons on one
 * phone is the whole problem. The mark is a gold speech bubble on deep
 * burgundy, readable at 40px, and deliberately unlike the member logo.
 *
 * One-off. Run with `npx tsx scripts/generate-studio-icons.ts` and commit
 * the PNGs; nothing at build or request time depends on this file.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "icons");

/** Full-bleed square. iOS rounds it, Android crops the maskable variant. */
function svg(size: number, inset: number): string {
  const s = size;
  // Bubble geometry derived from the safe area so the maskable variant
  // shrinks the mark rather than cropping it.
  const pad = s * inset;
  const w = s - pad * 2;
  const bw = w * 0.82;
  const bh = bw * 0.72;
  const bx = (s - bw) / 2;
  const by = (s - bh) / 2 - bh * 0.06;
  const r = bh * 0.28;
  const stroke = Math.max(2, s * 0.035);
  // Tail: a small triangle hanging off the lower-left, the detail that
  // makes it read as "messages" instead of "rounded rectangle".
  const tx = bx + bw * 0.26;
  const ty = by + bh;
  const tail = `${tx},${ty} ${tx + bw * 0.16},${ty} ${tx + bw * 0.02},${ty + bh * 0.26}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a1426"/>
      <stop offset="100%" stop-color="#0a0908"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${s}" fill="url(#bg)"/>
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${r}" ry="${r}"
        fill="none" stroke="#d4af37" stroke-width="${stroke}"/>
  <polygon points="${tail}" fill="#d4af37"/>
</svg>`;
}

async function render(name: string, size: number, inset: number) {
  const buf = Buffer.from(svg(size, inset));
  await sharp(buf).png().toFile(path.join(OUT_DIR, name));
  console.log(`  ${name} (${size}x${size})`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("Rendering Studio icons:");
  // "any" purpose: full bleed, minimal inset.
  await render("studio-192.png", 192, 0.14);
  await render("studio-512.png", 512, 0.14);
  // Maskable: Android crops to a circle, so keep the mark inside ~80%.
  await render("studio-maskable-512.png", 512, 0.22);
  // iOS home screen.
  await render("studio-apple-touch.png", 180, 0.14);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
