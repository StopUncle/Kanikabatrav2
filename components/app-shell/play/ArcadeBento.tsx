import Link from "next/link";
import type { BentoData, BentoSquare } from "@/lib/games/bento";

/**
 * The Arcade, laid out as a bento: one hero, a grid of squares, one strip.
 *
 * The squares used to be a horizontal snap rail. A rail hides half the
 * games behind a gesture nobody is told about, and on a menu that costs
 * more than the space it saves, so they stack into the grid instead and
 * every game is on screen at once.
 *
 * The hero still spans both columns. Sizes differ on purpose: when every
 * tile is the same size nothing is important, and a screen where nothing
 * is important reads as a menu rather than a place.
 */

const ACCENT: Record<string, string> = {
  "speed-drill": "var(--game-drill)",
  "daily-tell": "var(--game-tell)",
  adventures: "var(--game-adventures)",
  receipts: "var(--game-receipts)",
};

function Glyph({ k, color }: { k: string; color: string }) {
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (k === "speed-drill")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...p}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9 2h6" />
      </svg>
    );
  if (k === "daily-tell")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...p}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  if (k === "adventures")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...p}>
        <path d="M4 5.5v13c2.6-1.4 5.4-1.4 8 0 2.6-1.4 5.4-1.4 8 0v-13c-2.6-1.4-5.4-1.4-8 0-2.6-1.4-5.4-1.4-8 0z" />
        <path d="M12 5.5v13" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...p}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9.5 8h5M9.5 12h5" />
    </svg>
  );
}

function Square({ g }: { g: BentoSquare }) {
  const accent = ACCENT[g.key];
  return (
    <Link
      href={g.href}
      // One grid cell wide, held square by aspect-ratio so the tiles keep
      // their shape as the column width changes.
      className={`relative overflow-hidden rounded-[20px] border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4 transition-opacity active:opacity-80 ${
        g.doneToday ? "opacity-55" : ""
      }`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <span className="absolute right-3.5 top-3.5 h-[18px] w-[18px]">
        <Glyph k={g.key} color={accent} />
      </span>

      {g.popular && (
        <span
          className="absolute left-4 top-4 text-app-micro uppercase tracking-app-label"
          style={{ color: accent }}
        >
          Most played
        </span>
      )}

      <span className="flex h-full flex-col justify-end">
        <span
          className="text-app-hero leading-none"
          style={{
            fontFamily: "var(--font-display)",
            color: accent,
            opacity: 0.9,
          }}
        >
          {g.doneToday ? "✓" : g.numeral}
        </span>
        <span className="mt-2 block text-app-body font-medium leading-tight">
          {g.name}
        </span>
        <span className="mt-0.5 block truncate text-app-eyebrow text-[var(--app-dim)]">
          {g.doneToday ? "Done today" : g.meta}
        </span>
      </span>
    </Link>
  );
}

export default function ArcadeBento({ data }: { data: BentoData }) {
  const { hero, squares, strip } = data;

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* Hero: the Simulator, always. The only tile that can lead with a
          line of real scene text instead of a description. */}
      <Link
        href={hero.href}
        className="relative col-span-2 overflow-hidden rounded-[20px] border border-[var(--app-line-soft)] transition-opacity active:opacity-90"
        style={{
          minHeight: 168,
          background:
            "radial-gradient(115% 90% at 82% 6%, rgba(127,184,144,0.12), transparent 58%), linear-gradient(168deg, #1b1815, #0d0b0a 76%)",
        }}
      >
        <span className="flex h-full flex-col justify-between p-[18px]">
          <span className="flex items-start justify-between gap-3">
            <span
              className="text-app-micro uppercase tracking-app-label"
              style={{ color: "var(--game-scenario)" }}
            >
              {hero.title}
            </span>
            <span className="shrink-0 text-app-micro uppercase tracking-app-label text-[var(--app-dim)]">
              {hero.meta}
            </span>
          </span>
          <span>
            <span
              className="block text-app-display leading-[1.15]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {hero.fragment}
            </span>
            <span className="mt-2 block text-app-caption text-[var(--app-muted)]">
              {hero.blurb}
            </span>
          </span>
        </span>
      </Link>

      {/* The squares, two to a row. Each one is a direct grid child, so
          they fill the row and wrap onto the next by themselves however
          many games there are. */}
      {squares.map((g) => (
        <Square key={g.key} g={g} />
      ))}

      {/* The Lab: open-ended, so it sits under the timed games as a full
          width rectangle rather than taking a square among them. */}
      <Link
        href={strip.href}
        className="col-span-2 flex items-center gap-3.5 rounded-[20px] border border-[var(--app-line-soft)] bg-[var(--app-card)] px-[18px] py-[15px] transition-opacity active:opacity-80"
      >
        <span className="h-5 w-5 shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full"
            fill="none"
            stroke="var(--game-lab)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6" />
            <path d="M7.5 15h9" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-app-body font-medium">{strip.name}</span>
          <span className="mt-0.5 block truncate text-app-eyebrow text-[var(--app-dim)]">
            {strip.line}
          </span>
        </span>
        <span
          className="shrink-0 text-app-tiny uppercase tracking-app-label"
          style={{ color: "var(--game-lab)" }}
        >
          {strip.cta}
        </span>
      </Link>
    </div>
  );
}
