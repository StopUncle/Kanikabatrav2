"use client";

import { useState } from "react";

/**
 * Four ways to stop the games menu blending into one list, on one URL,
 * so they can be judged against each other rather than one at a time.
 *
 * The brief was "PNG images to break them up". These are the cheaper
 * options tried first, because bitmap art costs load time on a shell
 * that already renders server-side, and generated illustration tends to
 * look like every other app. Everything here is CSS and inline SVG: no
 * bytes over the wire, nothing to commission, nothing to redraw when a
 * game changes.
 */

interface Game {
  key: string;
  name: string;
  line: string;
  meta: string;
  /** Accent, used for icon, rule and progress. */
  accent: string;
  /** The numeral or glyph a typographic cover leads with. */
  numeral: string;
  /** Opening fragment, for the cover option. */
  fragment: string;
}

const GAMES: Game[] = [
  {
    key: "drill",
    name: "Speed Drill",
    line: "Ten lines, sixty seconds. Manipulation, or clean?",
    meta: "7/10 best · 70% accuracy",
    accent: "#d4af37",
    numeral: "60",
    fragment: "Ten lines. Sixty seconds.",
  },
  {
    key: "tell",
    name: "Daily Tell",
    line: "One moment. Spot what is really being done to you.",
    meta: "1d streak",
    accent: "#b76e79",
    numeral: "01",
    fragment: "One moment, once a day.",
  },
  {
    key: "scenario",
    name: "Scenarios",
    line: "Read a person across a whole scene.",
    meta: "2 run · 139 open",
    accent: "#7fb890",
    numeral: "12",
    fragment: "He texts at 11pm. Again.",
  },
  {
    key: "lab",
    name: "The Lab",
    line: "Freeform. Say anything, see what it costs you.",
    meta: "4 drills",
    accent: "#8aa0c8",
    numeral: "∞",
    fragment: "No script. No safety net.",
  },
];

function Icon({ k, color }: { k: string; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (k === "drill")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...common}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9 2h6" />
      </svg>
    );
  if (k === "tell")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...common}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  if (k === "scenario")
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" {...common}>
        <rect x="3" y="5" width="18" height="13" rx="2.5" />
        <path d="M7 10h7M7 14h5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...common}>
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

/** What it looks like today: one card, one border, four times over. */
function Baseline({ g }: { g: Game }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-[15px]">
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.08)] p-[9px]">
        <Icon k={g.key} color="#d4af37" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium">{g.name}</span>
        <span className="mt-0.5 block truncate text-xs text-[var(--app-dim)]">
          {g.line}
        </span>
      </span>
      <span className="shrink-0 text-xs tracking-[0.1em] text-[var(--app-gold)]">
        PLAY →
      </span>
    </div>
  );
}

/** A: one accent per game, carried through icon, tint and rule. */
function AccentOnly({ g }: { g: Game }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-[var(--app-card)] px-4 py-[15px]"
      style={{ borderColor: `${g.accent}33` }}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: g.accent }}
      />
      <div className="flex items-center gap-3.5 pl-1.5">
        <span
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl p-[9px]"
          style={{ background: `${g.accent}14` }}
        >
          <Icon k={g.key} color={g.accent} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-medium">{g.name}</span>
          <span className="mt-0.5 block truncate text-xs text-[var(--app-dim)]">
            {g.line}
          </span>
        </span>
        <span
          className="shrink-0 text-xs tracking-[0.1em]"
          style={{ color: g.accent }}
        >
          PLAY →
        </span>
      </div>
    </div>
  );
}

/** B: a different silhouette per game, readable before the words are. */
function Silhouette({ g }: { g: Game }) {
  if (g.key === "drill")
    return (
      <div
        className="flex items-center gap-4 rounded-2xl border bg-[var(--app-card)] px-4 py-4"
        style={{ borderColor: `${g.accent}33` }}
      >
        <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
          <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={`${g.accent}22`}
              strokeWidth="3"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={g.accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20 * 0.7} ${2 * Math.PI * 20}`}
            />
          </svg>
          <span
            className="text-[15px] font-light"
            style={{ fontFamily: "var(--font-display)", color: g.accent }}
          >
            60
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">{g.name}</span>
          <span className="mt-0.5 block text-xs text-[var(--app-dim)]">
            {g.meta}
          </span>
        </span>
      </div>
    );

  if (g.key === "tell")
    return (
      <div
        className="rounded-2xl border bg-[var(--app-card)] p-3"
        style={{ borderColor: `${g.accent}33` }}
      >
        <div
          className="rounded-xl px-3.5 py-3"
          style={{ background: `${g.accent}10` }}
        >
          <p className="text-[12.5px] italic leading-snug text-[var(--app-text)]">
            &ldquo;I only get like this because I care so much.&rdquo;
          </p>
        </div>
        <div className="mt-2.5 flex items-center justify-between px-1">
          <span className="text-[14.5px] font-medium">{g.name}</span>
          <span
            className="text-xs tracking-[0.1em]"
            style={{ color: g.accent }}
          >
            READ IT →
          </span>
        </div>
      </div>
    );

  if (g.key === "scenario")
    return (
      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${g.accent}33`,
          background: `linear-gradient(155deg, ${g.accent}1f, var(--app-card) 62%)`,
        }}
      >
        <div className="absolute right-3 top-3 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-5 rounded-full"
              style={{ background: i === 0 ? g.accent : `${g.accent}33` }}
            />
          ))}
        </div>
        <div className="px-4 pb-4 pt-9">
          <p
            className="text-[17px] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {g.fragment}
          </p>
          <p className="mt-1.5 text-xs text-[var(--app-dim)]">
            {g.name} · {g.meta}
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="rounded-2xl border-2 border-dashed bg-transparent px-4 py-[18px]"
      style={{ borderColor: `${g.accent}44` }}
    >
      <div className="flex items-center gap-3.5">
        <span className="h-[30px] w-[30px] shrink-0">
          <Icon k={g.key} color={g.accent} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-medium">{g.name}</span>
          <span className="mt-0.5 block text-xs text-[var(--app-dim)]">
            {g.line}
          </span>
        </span>
      </div>
    </div>
  );
}

/** C: a typographic cover. The numeral is the image. */
function TypographicCover({ g }: { g: Game }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: `${g.accent}33`,
        background: `radial-gradient(120% 100% at 85% 0%, ${g.accent}26, transparent 60%), var(--app-card)`,
      }}
    >
      <span
        className="pointer-events-none absolute -right-1 -top-7 select-none leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 108,
          color: g.accent,
          opacity: 0.16,
        }}
      >
        {g.numeral}
      </span>
      <div className="relative px-4 py-[18px]">
        <p
          className="text-[10px] uppercase tracking-[0.24em]"
          style={{ color: g.accent }}
        >
          {g.name}
        </p>
        <p
          className="mt-1.5 text-[18px] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {g.fragment}
        </p>
        <p className="mt-1.5 text-xs text-[var(--app-dim)]">{g.meta}</p>
      </div>
    </div>
  );
}

/** D: accent plus silhouette, which is the one worth shipping. */
function Recommended({ g }: { g: Game }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-[var(--app-card)]"
      style={{ borderColor: `${g.accent}30` }}
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${g.accent}, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-3.5 px-4 py-[16px]">
        <span
          className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] p-[11px]"
          style={{
            background: `${g.accent}12`,
            boxShadow: `inset 0 0 0 1px ${g.accent}24`,
          }}
        >
          <Icon k={g.key} color={g.accent} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="text-[15px] font-medium">{g.name}</span>
            <span
              className="text-[10px] uppercase tracking-[0.18em]"
              style={{ color: `${g.accent}cc` }}
            >
              {g.key === "drill"
                ? "60s"
                : g.key === "tell"
                  ? "daily"
                  : g.key === "scenario"
                    ? "scene"
                    : "open"}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-xs text-[var(--app-dim)]">
            {g.line}
          </span>
        </span>
        <span
          className="shrink-0 text-xs tracking-[0.1em]"
          style={{ color: g.accent }}
        >
          →
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const OPTIONS = [
  {
    id: "baseline",
    label: "Now",
    blurb:
      "What ships today. One card, one gold, four times over. Nothing tells you these are different kinds of thing.",
    render: (g: Game) => <Baseline g={g} />,
  },
  {
    id: "accent",
    label: "A · Colour",
    blurb:
      "One accent per game, carried through icon, tint, rule and CTA. Cheapest change here, and it does most of the work. Stays entirely inside the existing palette.",
    render: (g: Game) => <AccentOnly g={g} />,
  },
  {
    id: "silhouette",
    label: "B · Shape",
    blurb:
      "A different card shape per game: a timer ring, a quoted artefact, a scene card, an open frame. You know which is which before reading a word. Most distinctive, most work to maintain.",
    render: (g: Game) => <Silhouette g={g} />,
  },
  {
    id: "cover",
    label: "C · Type",
    blurb:
      "The numeral is the image. Weightless, impossible to mistake for stock art, and scales to any new game without commissioning anything. Risks feeling samey across many cards.",
    render: (g: Game) => <TypographicCover g={g} />,
  },
  {
    id: "recommended",
    label: "D · A+B",
    blurb:
      "Accent plus a small shape signal and a duration tag. Reads as one family with four members, which is the actual goal: different, but obviously the same app.",
    render: (g: Game) => <Recommended g={g} />,
  },
];

export default function GamesGallery() {
  const [only, setOnly] = useState<string | null>(null);
  const shown = only ? OPTIONS.filter((o) => o.id === only) : OPTIONS;

  return (
    <div className="px-5 pb-8 pt-6">
      <h1
        className="text-[26px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Telling the games apart
      </h1>
      <p className="mb-4 mt-1 text-[13px] leading-relaxed text-[var(--app-muted)]">
        Five treatments of the same four games. No images: everything here is
        CSS and inline SVG, so it costs nothing to load and nothing to redraw
        when a game changes.
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
        <section key={o.id} className="mb-9">
          <div className="mb-3">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-[var(--app-gold)]">
              {o.label}
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--app-dim)]">
              {o.blurb}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {GAMES.map((g) => (
              <div key={g.key}>{o.render(g)}</div>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-2 border-t border-[var(--app-line-soft)] pt-5 text-[12px] leading-relaxed text-[var(--app-dim)]">
        The same argument applies to the More sheet: it reads as one list
        because every row weighs the same. Grouping it into named sections
        with accent-coloured icons fixes that faster than art would.
      </p>
    </div>
  );
}
