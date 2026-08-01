"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
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
 * The map is choreographed, not decorated:
 *   - nodes cascade in on open, and the one you should play breathes
 *   - completed chapters carry their stars; full-star chapters glint
 *   - arriving from a clear (?cleared=) plays the victory lap once:
 *     stars slam onto the cleared chapter, the gold path draws itself
 *     forward, and the door it opened pops
 * Every animation is transform/opacity and honors reduced-motion.
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
  starsEarned: number;
  starsMax: number;
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
      starsEarned: list.reduce((sum, r) => sum + r.stars, 0),
      starsMax: list.length * 3,
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

const STAR_PATH =
  "M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.5L12 16.7 6.1 19.9l1.3-6.5L2.5 8.9l6.6-.7z";

function Star({
  filled,
  size = 8,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        d={STAR_PATH}
        fill={filled ? "var(--app-gold)" : "none"}
        stroke={filled ? "var(--app-gold)" : "rgba(236,231,222,0.22)"}
        strokeWidth={filled ? 0 : 2}
      />
    </svg>
  );
}

/**
 * A done chapter's star row. Three stars, filled to the chapter's share.
 * When `slam` is set they arrive one at a time, oversized, with a burst
 * ring: the victory-lap moment.
 */
function ChapterStars({
  chapter,
  slam,
  animate,
}: {
  chapter: Chapter;
  slam: boolean;
  animate: boolean;
}) {
  const filled = Math.max(
    1,
    Math.round((3 * chapter.starsEarned) / Math.max(1, chapter.starsMax)),
  );
  return (
    <span className="pointer-events-none absolute -bottom-2.5 left-1/2 flex -translate-x-1/2 gap-[2px]">
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="relative"
          initial={slam && animate ? { scale: 2.6, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: slam ? 0.35 + i * 0.16 : 0,
            type: "spring",
            stiffness: 500,
            damping: 22,
          }}
        >
          <Star filled={i < filled} />
          {slam && animate && i < filled && (
            <m.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[var(--app-gold)]"
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ delay: 0.35 + i * 0.16, duration: 0.55 }}
            />
          )}
        </m.span>
      ))}
    </span>
  );
}

function Marker({
  chapter,
  index,
  isCurrent,
  isSelected,
  isNextLocked,
  breathe,
}: {
  chapter: Chapter;
  index: number;
  isCurrent: boolean;
  isSelected: boolean;
  /** The one closed door in front of the member. The rest are just distance. */
  isNextLocked: boolean;
  breathe: boolean;
}) {
  const gold = "var(--app-gold)";
  const base =
    "relative flex h-[34px] w-[34px] items-center justify-center rounded-full text-app-caption tabular-nums";

  if (chapter.done) {
    const fullStars = chapter.starsEarned >= chapter.starsMax;
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
        {/* Full-star chapters glint now and then: a quiet flex, and a
            visible difference from merely-finished ground. */}
        {fullStars && breathe && (
          <m.span
            aria-hidden
            className="absolute -right-1 -top-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.1, 0], opacity: [0, 1, 0], rotate: 18 }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 5.5 + (index % 3) * 1.7,
            }}
          >
            <Star filled size={9} />
          </m.span>
        )}
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
    <m.span
      className={base}
      style={{
        border: `${isCurrent ? 2 : 1}px solid ${
          isCurrent ? gold : "var(--app-line)"
        }`,
        background: "var(--app-black)",
        color: isCurrent ? gold : "var(--app-dim)",
        boxShadow: isSelected ? "0 0 0 4px rgba(212,175,55,0.12)" : undefined,
      }}
      animate={
        isCurrent && breathe ? { scale: [1, 1.07, 1] } : { scale: 1 }
      }
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* The beacon. Every casual game marks "play me" the same way for a
          reason: a slow pulse reads before any label does. */}
      {isCurrent && breathe && (
        <m.span
          aria-hidden
          className="absolute -inset-2 rounded-full"
          style={{ background: "rgba(212,175,55,0.14)" }}
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
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
    </m.span>
  );
}

function RungStars({ stars }: { stars: number }) {
  return (
    <span className="flex shrink-0 gap-[2px]">
      {[0, 1, 2].map((i) => (
        <Star key={i} filled={i < stars} size={9} />
      ))}
    </span>
  );
}

function RungRow({ rung, isMember }: { rung: TrackRung; isMember: boolean }) {
  const chipMembers = !isMember && rung.memberOnly;
  const mark = rung.done ? "✓" : rung.inProgress ? "◆" : "○";
  const markColor = rung.done
    ? "var(--app-green)"
    : rung.inProgress
      ? "var(--app-gold)"
      : "var(--app-dim)";

  if (rung.locked) {
    return (
      <span className="flex items-center gap-3 px-1 py-2.5 opacity-45">
        <span className="w-4 shrink-0 text-center text-app-tiny">🔒</span>
        <span className="min-w-0 flex-1 truncate text-app-body">
          {rung.title}
        </span>
        <span className="shrink-0 text-app-micro uppercase tracking-app-wide text-[var(--app-dim)]">
          Locked
        </span>
      </span>
    );
  }

  return (
    <Link
      href={`/app/train/${rung.scenarioId}`}
      className={`flex items-center gap-3 rounded-xl px-1 py-2.5 transition-colors active:bg-[var(--app-card-2)] ${
        rung.done ? "opacity-70" : ""
      }`}
    >
      <span
        className="w-4 shrink-0 text-center text-app-tiny"
        style={{ color: markColor }}
      >
        {mark}
      </span>
      <span className="min-w-0 flex-1 truncate text-app-body">
        {rung.title}
      </span>
      {/* The ladder inside the checkmark: a 1-star clear is an invitation,
          not a trophy. Done rows show what the run was worth. */}
      {rung.done && <RungStars stars={rung.stars} />}
      {rung.inProgress && (
        <span className="shrink-0 text-app-micro uppercase tracking-app-wide text-[var(--app-gold)]">
          Resume
        </span>
      )}
      {!rung.inProgress && chipMembers && (
        <span className="shrink-0 rounded-full border border-[var(--app-gold-soft)] px-1.5 py-0.5 text-app-micro uppercase tracking-app-wide text-[var(--app-gold-soft)]">
          Members
        </span>
      )}
      {!rung.inProgress && !chipMembers && rung.isNew && (
        <span className="shrink-0 text-app-micro uppercase tracking-app-wide text-[var(--app-rose)]">
          New
        </span>
      )}
    </Link>
  );
}

type LapPhase = "idle" | "pop" | "draw" | "unlock" | "done";

export default function ChapterTrail({
  track,
  isMember = true,
  celebrateScenarioId = null,
}: {
  track: TrackSummary;
  isMember?: boolean;
  /**
   * Set when the member just cleared this scenario and was routed back
   * through the map. Plays the victory lap once: star slam on the
   * chapter, the gold path drawing forward, the next door popping.
   */
  celebrateScenarioId?: string | null;
}) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const chapters = useMemo(() => toChapters(track.rungs), [track.rungs]);

  // The chapter whose clear we are celebrating, -1 when none.
  const lapIdx = useMemo(
    () =>
      celebrateScenarioId
        ? chapters.findIndex((c) =>
            c.rungs.some((r) => r.scenarioId === celebrateScenarioId && r.done),
          )
        : -1,
    [chapters, celebrateScenarioId],
  );

  // Where the member actually is: the chapter they left open, else the first
  // one still standing. Everything done means the end of the road, so the last
  // chapter holds the pin.
  const started = chapters.findIndex((c) => c.inProgress);
  const standing = chapters.findIndex((c) => !c.done && !c.locked);
  const current =
    started >= 0 ? started : standing >= 0 ? standing : chapters.length - 1;

  const [selected, setSelected] = useState(lapIdx >= 0 ? lapIdx : current);
  const [lap, setLap] = useState<LapPhase>(lapIdx >= 0 ? "idle" : "done");
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // The victory-lap timeline. Runs once per arrival; the query param is
  // stripped immediately so a refresh replays nothing.
  useEffect(() => {
    if (lapIdx < 0) return;
    router.replace(window.location.pathname, { scroll: false });
    if (reducedMotion) {
      setLap("done");
      return;
    }
    const timers = [
      setTimeout(() => setLap("pop"), 300),
      setTimeout(() => setLap("draw"), 1400),
      setTimeout(() => setLap("unlock"), 2300),
      setTimeout(() => setLap("done"), 3100),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lapIdx, reducedMotion]);

  // Bring the member's position into view. The map can run sixteen rows
  // deep; opening it at the top puts them on ground they covered weeks ago.
  useEffect(() => {
    const target = nodeRefs.current[lapIdx >= 0 ? lapIdx : current];
    if (!target) return;
    const id = setTimeout(() => {
      target.scrollIntoView({
        block: "center",
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }, 80);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chapters.length === 0) {
    return (
      <p className="py-2 text-app-caption text-[var(--app-dim)]">
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

  // The gold ground. During a lap that finished a chapter, the segment
  // into it is carved out of the static path and drawn animated instead.
  const lapDrawsPath =
    lapIdx > 0 && chapters[lapIdx]?.done && lapIdx === lastDone;
  const staticGoldTo = lapDrawsPath ? lapIdx - 1 : lastDone;
  const celebrating = lapIdx >= 0 && lap !== "done";

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
          {staticGoldTo > 0 && (
            <path
              d={trailPath(0, staticGoldTo)}
              fill="none"
              stroke="var(--app-gold-soft)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {/* The ground you just took, drawing itself under your feet. */}
          {lapDrawsPath && (
            <m.path
              d={trailPath(lapIdx - 1, lapIdx)}
              fill="none"
              stroke="var(--app-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                lap === "draw" || lap === "unlock" || lap === "done"
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
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
            const isLapNode = i === lapIdx;
            const isUnlockNode =
              celebrating && lapIdx >= 0 && i === lapIdx + 1 && !c.locked;
            return (
              <m.button
                key={c.level}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setSelected(i)}
                style={{ gridColumn: col + 1, gridRow: row + 1 }}
                className="flex h-full w-full items-center justify-center"
                aria-label={`Chapter ${i + 1}, ${done} of ${c.rungs.length} done`}
                aria-pressed={selected === i}
                initial={
                  reducedMotion ? false : { opacity: 0, scale: 0.5, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.05 + i * 0.045,
                  type: "spring",
                  stiffness: 380,
                  damping: 26,
                }}
                whileTap={
                  reducedMotion ? undefined : { scale: 0.85 }
                }
              >
                <m.span
                  className="relative"
                  animate={
                    isLapNode && (lap === "pop" || lap === "draw")
                      ? { scale: [1, 1.35, 1] }
                      : isUnlockNode && lap === "unlock"
                        ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -4, 3, 0] }
                        : { scale: 1 }
                  }
                  transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Marker
                    chapter={c}
                    index={i}
                    isCurrent={i === current}
                    isSelected={selected === i}
                    isNextLocked={i === nextLocked}
                    breathe={!reducedMotion}
                  />
                  {c.done && (
                    <ChapterStars
                      chapter={c}
                      slam={isLapNode}
                      animate={!reducedMotion}
                    />
                  )}
                </m.span>
              </m.button>
            );
          })}
        </div>
      </div>

      <div className="mt-1 border-t border-[var(--app-line-soft)] pt-3">
        <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Chapter {selected + 1}
          {selected === current && chapters.length > 1 && (
            <span className="text-[var(--app-dim)]"> · you are here</span>
          )}
        </p>
        <p
          className="mt-1 text-app-lead leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {named?.title ?? chapter.rungs[0]?.title}
        </p>
        <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
          {named?.blurb || chapter.rungs[0]?.tagline}
        </p>
        <div className="mt-1.5 flex flex-col">
          {chapter.rungs.map((r) => (
            <RungRow key={r.scenarioId} rung={r} isMember={isMember} />
          ))}
        </div>
      </div>
    </div>
  );
}
