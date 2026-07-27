"use client";

import { useState } from "react";

/**
 * Round two.
 *
 * The first five were all the same silhouette in different paint: a full
 * width row, four times down the page. Changing the colour of a list does
 * not stop it being a list.
 *
 * These four change the LAYOUT instead. Different tiles are different
 * sizes, which is what actually creates hierarchy: if everything is the
 * same size, nothing is important, and a screen where nothing is
 * important reads as a menu rather than a place.
 *
 * Luxury here means restraint, not decoration. Hairline rules, deep
 * near-black, one display serif carrying the weight, gold used about
 * four times per screen and never as a fill. Still no bitmaps: CSS and
 * inline SVG only.
 */

interface Game {
  key: string;
  name: string;
  line: string;
  short: string;
  meta: string;
  accent: string;
  numeral: string;
  fragment: string;
  duration: string;
}

const G: Record<string, Game> = {
  drill: {
    key: "drill",
    name: "Speed Drill",
    line: "Ten lines, sixty seconds. Manipulation, or clean?",
    short: "Ten lines. Sixty seconds.",
    meta: "7/10 best",
    accent: "#d4af37",
    numeral: "60",
    fragment: "Ten lines. Sixty seconds.",
    duration: "60s",
  },
  tell: {
    key: "tell",
    name: "Daily Tell",
    line: "One moment. Spot what is really being done to you.",
    short: "One moment, once a day.",
    meta: "1 day streak",
    accent: "#b76e79",
    numeral: "01",
    fragment: "“I only get like this because I care.”",
    duration: "Daily",
  },
  scenario: {
    key: "scenario",
    name: "Scenarios",
    line: "Read a person across a whole scene.",
    short: "He texts at 11pm. Again.",
    meta: "139 open",
    accent: "#7fb890",
    numeral: "12",
    fragment: "He texts at 11pm. Again.",
    duration: "10 min",
  },
  lab: {
    key: "lab",
    name: "The Lab",
    line: "Freeform. Say anything, see what it costs you.",
    short: "No script. No safety net.",
    meta: "4 drills",
    accent: "#8aa0c8",
    numeral: "∞",
    fragment: "No script. No safety net.",
    duration: "Open",
  },
  adventures: {
    key: "adventures",
    name: "Adventures",
    line: "A story across several nights.",
    short: "A story across several nights.",
    meta: "3 arcs",
    accent: "#c98f6a",
    numeral: "06",
    fragment: "Six chapters. One person.",
    duration: "Chapters",
  },
  receipts: {
    key: "receipts",
    name: "Receipts",
    line: "Paste what they sent. See what it was.",
    short: "Paste what they sent.",
    meta: "Free tool",
    accent: "#9d8ec0",
    numeral: "01",
    fragment: "Paste what they sent.",
    duration: "2 min",
  },
};

function Glyph({ k, c, w = "100%" }: { k: string; c: string; w?: string }) {
  const p = {
    fill: "none",
    stroke: c,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const s = { width: w, height: w };
  if (k === "drill")
    return (
      <svg viewBox="0 0 24 24" style={s} {...p}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9 2h6" />
      </svg>
    );
  if (k === "tell")
    return (
      <svg viewBox="0 0 24 24" style={s} {...p}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  if (k === "scenario")
    return (
      <svg viewBox="0 0 24 24" style={s} {...p}>
        <rect x="3" y="5" width="18" height="13" rx="2.5" />
        <path d="M7 10h7M7 14h5" />
      </svg>
    );
  if (k === "adventures")
    return (
      <svg viewBox="0 0 24 24" style={s} {...p}>
        <path d="M4 5.5v13c2.6-1.4 5.4-1.4 8 0 2.6-1.4 5.4-1.4 8 0v-13c-2.6-1.4-5.4-1.4-8 0-2.6-1.4-5.4-1.4-8 0z" />
        <path d="M12 5.5v13" />
      </svg>
    );
  if (k === "receipts")
    return (
      <svg viewBox="0 0 24 24" style={s} {...p}>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
        <path d="M9.5 8h5M9.5 12h5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" style={s} {...p}>
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

const serif = { fontFamily: "var(--font-display)" } as const;

/* ================================================================== E */
/** Bento. One hero, two halves, one wide strip. Nothing is the same size. */
function Bento() {
  const hero = G.scenario;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* hero, full width, tall */}
      <div
        className="relative col-span-2 overflow-hidden rounded-[20px] border border-[var(--app-line-soft)]"
        style={{
          minHeight: 168,
          background: `radial-gradient(115% 90% at 82% 6%, ${hero.accent}1f, transparent 58%), linear-gradient(168deg, #1b1815, #0d0b0a 76%)`,
        }}
      >
        <div className="flex h-full flex-col justify-between p-[18px]">
          <div className="flex items-start justify-between">
            <span
              className="text-[9.5px] uppercase tracking-[0.3em]"
              style={{ color: hero.accent }}
            >
              {hero.name}
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.2em] text-[var(--app-dim)]">
              {hero.meta}
            </span>
          </div>
          <div>
            <p className="text-[25px] leading-[1.15]" style={serif}>
              {hero.fragment}
            </p>
            <p className="mt-2 text-[12px] text-[var(--app-muted)]">
              {hero.line}
            </p>
          </div>
        </div>
      </div>

      {/* The squares slide.
          Two squares fit the screen exactly, so a rail of two would have
          nowhere to go: the gesture only reads as a gesture when the next
          tile is already half visible. So the row is sized to show two and
          a sliver, it bleeds to both edges (-mx-5 px-5), and it snaps so a
          flick always lands square rather than halfway. */}
      <div className="col-span-2 -mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[G.drill, G.tell, G.adventures, G.receipts].map((g) => (
          <div
            key={g.key}
            className="relative shrink-0 snap-start overflow-hidden rounded-[20px] border border-[var(--app-line-soft)] bg-[var(--app-card)] p-[16px]"
            // Square, and sized so two sit in the column with the third
            // breaking the edge. 40px is the two gutters plus the peek.
            style={{
              width: "calc((100% - 40px) / 2)",
              aspectRatio: "1 / 1",
              minWidth: 132,
            }}
          >
            <span
              className="absolute right-[14px] top-[14px]"
              style={{ width: 18, height: 18 }}
            >
              <Glyph k={g.key} c={g.accent} />
            </span>
            <div className="flex h-full flex-col justify-end">
              <p
                className="text-[30px] leading-none"
                style={{ ...serif, color: g.accent, opacity: 0.9 }}
              >
                {g.numeral}
              </p>
              <p className="mt-2 text-[13.5px] font-medium leading-tight">
                {g.name}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--app-dim)]">
                {g.duration}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* wide strip */}
      <div className="col-span-2 flex items-center gap-3.5 rounded-[20px] border border-dashed border-[rgba(138,160,200,0.28)] px-[18px] py-[15px]">
        <span style={{ width: 20, height: 20 }} className="shrink-0">
          <Glyph k="lab" c={G.lab.accent} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-medium">{G.lab.name}</span>
          <span className="mt-0.5 block truncate text-[11.5px] text-[var(--app-dim)]">
            {G.lab.short}
          </span>
        </span>
        <span
          className="shrink-0 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: G.lab.accent }}
        >
          Open
        </span>
      </div>
    </div>
  );
}

/* ================================================================== F */
/** Editorial. One feature, then a contents page. No boxes at all. */
function Editorial() {
  const feature = G.drill;
  const rest = [G.tell, G.scenario, G.lab];
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2.5">
        <span
          className="h-[1px] w-6"
          style={{ background: feature.accent }}
        />
        <span
          className="text-[9.5px] uppercase tracking-[0.32em]"
          style={{ color: feature.accent }}
        >
          Today
        </span>
      </div>
      <p className="text-[34px] leading-[1.06]" style={serif}>
        {feature.fragment}
      </p>
      <p className="mt-2.5 max-w-[85%] text-[12.5px] leading-relaxed text-[var(--app-muted)]">
        {feature.line}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#0a0908]"
          style={{ background: feature.accent }}
        >
          Begin
        </button>
        <span className="text-[11px] text-[var(--app-dim)]">
          {feature.meta}
        </span>
      </div>

      <div className="mt-8">
        {rest.map((g, i) => (
          <div
            key={g.key}
            className={`flex items-baseline gap-4 py-[15px] ${
              i === 0 ? "border-t border-[var(--app-line-soft)]" : ""
            } border-b border-[var(--app-line-soft)]`}
          >
            <span
              className="w-5 shrink-0 text-[11px] tabular-nums"
              style={{ color: g.accent }}
            >
              0{i + 2}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px]" style={serif}>
                {g.name}
              </span>
              <span className="mt-0.5 block truncate text-[11.5px] text-[var(--app-dim)]">
                {g.short}
              </span>
            </span>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-[var(--app-dim)]">
              {g.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== G */
/** The rail. A wide today card, then tall portraits you scroll sideways. */
function Rail() {
  const today = G.tell;
  const rail = [G.scenario, G.drill, G.lab];
  return (
    <div>
      <div
        className="relative mb-5 overflow-hidden rounded-[20px] border border-[var(--app-line-soft)]"
        style={{
          background: `radial-gradient(120% 120% at 8% 0%, ${today.accent}24, transparent 55%), var(--app-card)`,
        }}
      >
        <div className="flex items-center gap-4 p-[18px]">
          <span
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full"
            style={{ boxShadow: `inset 0 0 0 1px ${today.accent}44` }}
          >
            <span style={{ width: 20, height: 20 }}>
              <Glyph k={today.key} c={today.accent} />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="text-[9.5px] uppercase tracking-[0.3em]"
              style={{ color: today.accent }}
            >
              Today only
            </p>
            <p className="mt-1 text-[17px] leading-tight" style={serif}>
              {today.name}
            </p>
            <p className="mt-0.5 text-[11.5px] text-[var(--app-dim)]">
              {today.meta}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[9.5px] uppercase tracking-[0.3em] text-[var(--app-dim)]">
          Train
        </span>
        <span className="text-[10px] text-[var(--app-dim)]">Swipe</span>
      </div>
      {/* -mx-5 px-5 lets the rail bleed to both edges of the screen */}
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rail.map((g) => (
          <div
            key={g.key}
            className="relative shrink-0 overflow-hidden rounded-[18px] border border-[var(--app-line-soft)]"
            style={{
              width: 148,
              height: 196,
              background: `linear-gradient(178deg, ${g.accent}1c, #100e0c 62%)`,
            }}
          >
            <span
              className="pointer-events-none absolute -right-2 -top-6 select-none leading-none"
              style={{ ...serif, fontSize: 92, color: g.accent, opacity: 0.14 }}
            >
              {g.numeral}
            </span>
            <div className="flex h-full flex-col justify-end p-[14px]">
              <p className="text-[14.5px] leading-tight" style={serif}>
                {g.name}
              </p>
              <p className="mt-1 text-[10.5px] leading-snug text-[var(--app-dim)]">
                {g.duration} · {g.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== H */
/** Weighted stack. Each card is a different height, heaviest first. */
function Weighted() {
  const order = [G.scenario, G.drill, G.tell, G.lab];
  const heights = [150, 116, 96, 78];
  return (
    <div className="flex flex-col gap-2.5">
      {order.map((g, i) => (
        <div
          key={g.key}
          className="relative overflow-hidden rounded-[18px] border border-[var(--app-line-soft)]"
          style={{
            height: heights[i],
            background:
              i === 0
                ? `radial-gradient(110% 130% at 88% 0%, ${g.accent}22, transparent 60%), linear-gradient(170deg, #1a1714, #0e0c0b 78%)`
                : "var(--app-card)",
          }}
        >
          <span
            className="absolute left-0 top-0 h-full w-[2px]"
            style={{
              background: `linear-gradient(180deg, ${g.accent}, transparent)`,
              opacity: 1 - i * 0.22,
            }}
          />
          <div className="flex h-full flex-col justify-between px-[18px] py-[15px]">
            <div className="flex items-start justify-between">
              <span
                className="uppercase tracking-[0.28em]"
                style={{
                  color: g.accent,
                  fontSize: i === 0 ? 10 : 9,
                }}
              >
                {g.name}
              </span>
              <span style={{ width: i === 0 ? 19 : 15, height: i === 0 ? 19 : 15 }}>
                <Glyph k={g.key} c={g.accent} />
              </span>
            </div>
            <div>
              <p
                style={{ ...serif, fontSize: i === 0 ? 22 : i === 1 ? 17 : 15 }}
                className="leading-tight"
              >
                {i === 0 ? g.fragment : g.short}
              </p>
              {i < 2 && (
                <p className="mt-1.5 text-[11px] text-[var(--app-dim)]">
                  {g.duration} · {g.meta}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const OPTIONS = [
  {
    id: "bento",
    label: "E · Bento",
    blurb:
      "Chosen. One hero, a sliding row of squares, one strip. The squares snap and the third breaks the edge, so it is obvious there is more without a scrollbar saying so. Adding a sixth game costs nothing: the rail simply gets longer, where a fixed grid would need relaying out.",
    render: () => <Bento />,
  },
  {
    id: "editorial",
    label: "F · Editorial",
    blurb:
      "One thing is the page; the rest is a contents list under hairlines. No cards at all. The most restrained and the most confident, and it only works while one game genuinely leads.",
    render: () => <Editorial />,
  },
  {
    id: "rail",
    label: "G · Rail",
    blurb:
      "A wide today card, then tall portraits you swipe. Sideways motion is the fastest way to stop a screen reading as a list, and the tiles bleed off the edge so there is obviously more.",
    render: () => <Rail />,
  },
  {
    id: "weighted",
    label: "H · Weighted",
    blurb:
      "Still a stack, but each card is a different height and the type shrinks down the page. Keeps the simplicity of a list while making it obvious what matters most. The safest of the four.",
    render: () => <Weighted />,
  },
];

export default function GamesGallery() {
  // Opens on the chosen direction rather than the full set.
  const [only, setOnly] = useState<string | null>("bento");
  const shown = only ? OPTIONS.filter((o) => o.id === only) : OPTIONS;

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="text-[26px] font-light" style={serif}>
        Four layouts
      </h1>
      <p className="mb-4 mt-1 text-[13px] leading-relaxed text-[var(--app-muted)]">
        Round two. The last set were all the same row in different paint;
        these change the layout instead. Different tiles are different sizes,
        because if everything is the same size nothing is important.
      </p>

      <div className="mb-7 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setOnly(null)}
          className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] ${
            only === null
              ? "border-[var(--app-gold)] text-[var(--app-gold)]"
              : "border-[var(--app-line-soft)] text-[var(--app-dim)]"
          }`}
        >
          All
        </button>
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setOnly(o.id)}
            className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] ${
              only === o.id
                ? "border-[var(--app-gold)] text-[var(--app-gold)]"
                : "border-[var(--app-line-soft)] text-[var(--app-dim)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {shown.map((o) => (
        <section key={o.id} className="mb-11">
          <div className="mb-4">
            <h2 className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-gold)]">
              {o.label}
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--app-dim)]">
              {o.blurb}
            </p>
          </div>
          {o.render()}
        </section>
      ))}

      <p className="mt-2 border-t border-[var(--app-line-soft)] pt-5 text-[12px] leading-relaxed text-[var(--app-dim)]">
        All four use the same four accents and the same display serif, so
        whichever wins, the Arcade, Train and the More sheet can follow it
        without a second design language.
      </p>
    </div>
  );
}
