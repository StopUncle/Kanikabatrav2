"use client";

import { useState } from "react";
import Link from "next/link";
import type { TrackRung, TrackSummary } from "@/lib/simulator/train-data";

/**
 * A track's scenarios as terrain, not inventory.
 *
 * Opening a track used to spill every scenario it owns into one flat list.
 * The main track is 32 of them, which is a wall no member reads. They already
 * arrive in chapters though: `level` groups two to four scenarios that belong
 * together. So the trail plots chapters, winding down the screen, and the
 * chapter you tap opens underneath it. Sixteen chapters take six rows where
 * thirty-two rows used to go, and the shape carries what a list could not:
 * ground behind you in gold, ground ahead in grey, and you somewhere on it.
 *
 * The chapters come named. Every track has shipped written level titles and
 * blurbs since the old catalog, they were just never carried into the app.
 * A scenario's own tagline stands in if a level was never given one.
 */

const COLS = 3;
const ROW = 64;
const HALF = ROW / 2;
/** How far a turn bulges past its column, in the path's percent-wide x space. */
const BULGE = 14;

const colX = (col: number) => ((col + 0.5) / COLS) * 100;

interface Chapter {
  level: number;
  rungs: TrackRung[];
  done: boolean;
  locked: boolean;
  hasNew: boolean;
  inProgress: boolean;
}

function toChapters(rungs: TrackRung[]): Chapter[] {
  const byLevel = new Map<number, TrackRung[]>();
  for (const r of rungs) {
    const list = byLevel.get(r.level);
    if (list) list.push(r);
    else byLevel.set(r.level, [r]);
  }
  return Array.from(byLevel.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([level, list]) => ({
      level,
      rungs: list,
      done: list.every((r) => r.done),
      locked: list.every((r) => r.locked),
      hasNew: list.some((r) => r.isNew),
      inProgress: list.some((r) => r.inProgress),
    }));
}

/** Serpentine: even rows run left to right, odd rows run back. */
function place(i: number) {
  const row = Math.floor(i / COLS);
  const c = i % COLS;
  return { row, col: row % 2 === 0 ? c : COLS - 1 - c };
}

/**
 * The line through chapters `from` to `to`. Turns are drawn as cubics that
 * bulge past the column they turn on, which reads as a bend in a path rather
 * than a folded wire.
 */
function trailPath(from: number, to: number): string {
  if (to <= from) return "";
  const start = place(from);
  const parts = [`M ${colX(start.col)},${start.row * ROW + HALF}`];

  for (let i = from + 1; i <= to; i++) {
    const prev = place(i - 1);
    const cur = place(i);
    const y = cur.row * ROW + HALF;

    if (cur.row === prev.row) {
      parts.push(`L ${colX(cur.col)},${y}`);
      continue;
    }
    // Row change. The serpentine turns on a single column, so the curve
    // leaves and lands at the same x.
    const x = colX(prev.col);
    const out = x + (prev.col === COLS - 1 ? BULGE : -BULGE);
    parts.push(`C ${out},${prev.row * ROW + HALF} ${out},${y} ${x},${y}`);
  }
  return parts.join(" ");
}

function Marker({
  chapter,
  index,
  isCurrent,
  isSelected,
  isNextLocked,
}: {
  chapter: Chapter;
  index: number;
  isCurrent: boolean;
  isSelected: boolean;
  /** The one closed door in front of the member. The rest are just distance. */
  isNextLocked: boolean;
}) {
  const gold = "var(--app-gold)";
  const base =
    "relative flex h-[34px] w-[34px] items-center justify-center rounded-full text-[12px] tabular-nums transition-transform active:scale-95";

  if (chapter.done) {
    return (
      <span className={base} style={{ background: gold, color: "#0a0908" }}>
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="#0a0908"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  if (chapter.locked) {
    // Only the next door gets a padlock. Sixteen padlocks reads as a wall of
    // things withheld; one padlock and a trail running off into faint marks
    // reads as ground you have not covered yet.
    if (!isNextLocked) {
      return (
        <span
          className="flex h-[34px] w-[34px] items-center justify-center"
          style={{ opacity: isSelected ? 1 : 0.65 }}
        >
          <span
            className="h-[11px] w-[11px] rounded-full border"
            style={{
              borderColor: isSelected
                ? "var(--app-gold-soft)"
                : "rgba(236,231,222,0.16)",
              background: "var(--app-black)",
            }}
          />
        </span>
      );
    }
    return (
      <span
        className={`${base} border`}
        style={{
          borderColor: "var(--app-line-soft)",
          background: "var(--app-black)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
          <rect
            x="5"
            y="11"
            width="14"
            height="9"
            rx="2"
            fill="none"
            stroke="var(--app-dim)"
            strokeWidth="1.8"
          />
          <path
            d="M8 11V7.5a4 4 0 0 1 8 0V11"
            fill="none"
            stroke="var(--app-dim)"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={base}
      style={{
        border: `${isCurrent ? 2 : 1}px solid ${
          isCurrent ? gold : "var(--app-line)"
        }`,
        background: "var(--app-black)",
        color: isCurrent ? gold : "var(--app-dim)",
        boxShadow: isSelected ? "0 0 0 4px rgba(212,175,55,0.12)" : undefined,
      }}
    >
      {index + 1}
      {chapter.hasNew && (
        <span
          className="absolute -right-0.5 -top-0.5 h-[7px] w-[7px] rounded-full"
          style={{
            background: "var(--app-rose)",
            outline: "2px solid var(--app-black)",
          }}
        />
      )}
    </span>
  );
}

function RungRow({ rung }: { rung: TrackRung }) {
  const mark = rung.done ? "✓" : rung.inProgress ? "◆" : "○";
  const markColor = rung.done
    ? "var(--app-green)"
    : rung.inProgress
      ? "var(--app-gold)"
      : "var(--app-dim)";

  if (rung.locked) {
    return (
      <span className="flex items-center gap-3 px-1 py-2.5 opacity-45">
        <span className="w-4 shrink-0 text-center text-[10px]">🔒</span>
        <span className="min-w-0 flex-1 truncate text-[13.5px]">
          {rung.title}
        </span>
        <span className="shrink-0 text-[9.5px] uppercase tracking-[0.18em] text-[var(--app-dim)]">
          Locked
        </span>
      </span>
    );
  }

  return (
    <Link
      href={`/app/train/${rung.scenarioId}`}
      className={`flex items-center gap-3 rounded-xl px-1 py-2.5 transition-colors active:bg-[var(--app-card-2)] ${
        rung.done ? "opacity-55" : ""
      }`}
    >
      <span
        className="w-4 shrink-0 text-center text-[10px]"
        style={{ color: markColor }}
      >
        {mark}
      </span>
      <span className="min-w-0 flex-1 truncate text-[13.5px]">
        {rung.title}
      </span>
      {rung.inProgress && (
        <span className="shrink-0 text-[9.5px] uppercase tracking-[0.18em] text-[var(--app-gold)]">
          Resume
        </span>
      )}
      {!rung.inProgress && rung.isNew && (
        <span className="shrink-0 text-[9.5px] uppercase tracking-[0.18em] text-[var(--app-rose)]">
          New
        </span>
      )}
    </Link>
  );
}

export default function ChapterTrail({ track }: { track: TrackSummary }) {
  const chapters = toChapters(track.rungs);

  // Where the member actually is: the chapter they left open, else the first
  // one still standing. Everything done means the end of the road, so the last
  // chapter holds the pin.
  const started = chapters.findIndex((c) => c.inProgress);
  const standing = chapters.findIndex((c) => !c.done && !c.locked);
  const current =
    started >= 0 ? started : standing >= 0 ? standing : chapters.length - 1;

  const [selected, setSelected] = useState(current);

  if (chapters.length === 0) {
    return (
      <p className="py-2 text-[12px] text-[var(--app-dim)]">
        Nothing in this track yet.
      </p>
    );
  }

  const nextLocked = chapters.findIndex((c) => c.locked);
  const rows = Math.ceil(chapters.length / COLS);
  const height = rows * ROW;
  let lastDone = -1;
  chapters.forEach((c, i) => {
    if (c.done) lastDone = i;
  });

  const chapter = chapters[selected];
  const named = track.levelTitles[chapter.level];

  return (
    <div className="py-1">
      <div className="relative" style={{ height }}>
        {/* Percent-wide x, pixel y. Non-scaling strokes keep the line an even
            weight once the viewBox is stretched to the column width. */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
        >
          <path
            d={trailPath(0, chapters.length - 1)}
            fill="none"
            stroke="var(--app-line-soft)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {lastDone > 0 && (
            <path
              d={trailPath(0, lastDone)}
              fill="none"
              stroke="rgba(212,175,55,0.55)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        <div
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridAutoRows: `${ROW}px`,
            placeItems: "center",
          }}
        >
          {chapters.map((c, i) => {
            const { row, col } = place(i);
            const done = c.rungs.filter((r) => r.done).length;
            return (
              <button
                key={c.level}
                type="button"
                onClick={() => setSelected(i)}
                style={{ gridColumn: col + 1, gridRow: row + 1 }}
                className="flex h-full w-full items-center justify-center"
                aria-label={`Chapter ${i + 1}, ${done} of ${c.rungs.length} done`}
                aria-pressed={selected === i}
              >
                <Marker
                  chapter={c}
                  index={i}
                  isCurrent={i === current}
                  isSelected={i === selected}
                  isNextLocked={i === nextLocked}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-1 border-t border-[var(--app-line-soft)] pt-3">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--app-gold-soft)]">
          Chapter {selected + 1}
          {selected === current && chapters.length > 1 && (
            <span className="text-[var(--app-dim)]"> · you are here</span>
          )}
        </p>
        <p
          className="mt-1 text-[16px] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {named?.title ?? chapter.rungs[0]?.title}
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--app-muted)]">
          {named?.blurb || chapter.rungs[0]?.tagline}
        </p>
        <div className="mt-1.5 flex flex-col">
          {chapter.rungs.map((r) => (
            <RungRow key={r.scenarioId} rung={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
