"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { TrackRung, TrackSummary } from "@/lib/simulator/train-data";
import type { Difficulty } from "@/lib/simulator/types";

/**
 * A track's scenarios as terrain, not inventory.
 *
 * Opening a track used to spill every scenario it owns into one flat list.
 * The main track is 32 of them, which is a wall no member reads. They already
 * arrive in chapters though: `level` groups two to four scenarios that belong
 * together. So the trail plots chapters, winding down the screen, and the
 * chapter you tap opens a sheet with everything a decision needs: the name,
 * the difficulty, your stars, your best score, and the door in.
 *
 * The map is choreographed, not decorated:
 *   - nodes cascade in on open, and the one you should play breathes
 *   - open chapters wear their difficulty as an icon: the eye (easy), the
 *     dagger (medium), the flame (hard), the crown (the boss chapter at a
 *     track's end)
 *   - completed chapters carry their stars; full-star chapters glint
 *   - arriving from a clear (?cleared=) plays the victory lap once:
 *     stars slam onto the cleared chapter, the gold path draws itself
 *     forward, and the door it opened pops
 * Every animation is transform/opacity and honors reduced-motion.
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
  bestXp: number;
  difficulty: Difficulty;
}

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

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
      bestXp: list.reduce((sum, r) => sum + r.xpEarned, 0),
      difficulty: list.reduce<Difficulty>(
        (acc, r) =>
          DIFFICULTY_RANK[r.difficulty] > DIFFICULTY_RANK[acc]
            ? r.difficulty
            : acc,
        "beginner",
      ),
    }));
}

/** The chapter's tier on the map: the boss crown outranks its difficulty. */
type Tier = "easy" | "medium" | "hard" | "boss";

function tierOf(chapter: Chapter, index: number, count: number): Tier {
  if (index === count - 1) return "boss";
  if (chapter.difficulty === "advanced") return "hard";
  if (chapter.difficulty === "intermediate") return "medium";
  return "easy";
}

const TIER_LABEL: Record<Tier, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  boss: "Boss",
};

/** Hard runs warm toward the house rose; everything else stays gold. */
const TIER_COLOR: Record<Tier, string> = {
  easy: "var(--app-gold-soft)",
  medium: "var(--app-gold)",
  hard: "var(--app-rose)",
  boss: "var(--app-gold)",
};

/**
 * The level iconography, drawn in the house line style. The eye you watch
 * with, the dagger you parry, the flame you walk through, the crown you
 * take. All stroke-based so they inherit their tier's color.
 */
function TierIcon({
  tier,
  size = 15,
  color,
}: {
  tier: Tier;
  size?: number;
  color?: string;
}) {
  const stroke = color ?? TIER_COLOR[tier];
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (tier === "easy") {
    return (
      <svg {...common}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  }
  if (tier === "medium") {
    return (
      <svg {...common}>
        <path d="M12 2.5v13" />
        <path d="M8.5 6.5 12 2.5l3.5 4" />
        <path d="M7 15.5h10" />
        <path d="M12 15.5V21" />
        <path d="M10 21h4" />
      </svg>
    );
  }
  if (tier === "hard") {
    return (
      <svg {...common}>
        <path d="M12 2.5c1 3-3.5 4.5-3.5 8a3.5 3.5 0 0 0 7 0c0-1.2-.5-2.2-1-3 2.5 1 4 3.2 4 6a6.5 6.5 0 0 1-13 0c0-5.5 4.5-7.5 6.5-11Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3.5 8.5 7 12l5-6.5L17 12l3.5-3.5V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V8.5Z" />
    </svg>
  );
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

function Star({ filled, size = 8 }: { filled: boolean; size?: number }) {
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
  tier,
  index,
  isCurrent,
  isNextLocked,
  breathe,
}: {
  chapter: Chapter;
  tier: Tier;
  index: number;
  isCurrent: boolean;
  /** The one closed door in front of the member. The rest are just distance. */
  isNextLocked: boolean;
  breathe: boolean;
}) {
  const gold = "var(--app-gold)";
  const base =
    "relative flex h-[34px] w-[34px] items-center justify-center rounded-full";

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
          style={{ opacity: 0.65 }}
        >
          <span
            className="h-[11px] w-[11px] rounded-full border"
            style={{
              borderColor: "rgba(236,231,222,0.16)",
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

  const tierColor = TIER_COLOR[tier];
  return (
    <m.span
      className={base}
      style={{
        border: `${isCurrent || tier === "boss" ? 2 : 1}px solid ${
          isCurrent ? gold : tier === "boss" ? gold : "var(--app-line)"
        }`,
        background: "var(--app-black)",
      }}
      animate={isCurrent && breathe ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* The beacon. Two layers: a tight halo and a wide soft glow, both
          breathing with the node. Every casual game marks "play me" the
          same way for a reason: a pulse reads before any label does. */}
      {isCurrent && breathe && (
        <>
          <m.span
            aria-hidden
            className="absolute -inset-2 rounded-full"
            style={{ background: "rgba(212,175,55,0.22)" }}
            animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.span
            aria-hidden
            className="absolute -inset-5 rounded-full blur-md"
            style={{ background: "rgba(212,175,55,0.18)" }}
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.85, 1.12, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <TierIcon tier={tier} color={isCurrent ? gold : tierColor} />
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
      {rung.done && (
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-app-micro tabular-nums text-[var(--app-dim)]">
            {rung.xpEarned} XP
          </span>
          <RungStars stars={rung.stars} />
        </span>
      )}
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

/**
 * The level sheet. Tapping a node opens this instead of navigating: the
 * name, the tier, your stars and best score, the scenarios inside, and
 * one gold door in. Locked chapters open it too, and say what opens them.
 */
function ChapterSheet({
  chapter,
  tier,
  index,
  named,
  isMember,
  onClose,
}: {
  chapter: Chapter;
  tier: Tier;
  index: number;
  named: { title: string; blurb: string } | undefined;
  isMember: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // The door in: the run you left open, else the first fresh scenario,
  // else replay the chapter from the top.
  const playRung = chapter.locked
    ? null
    : (chapter.rungs.find((r) => r.inProgress && !r.locked) ??
      chapter.rungs.find((r) => !r.done && !r.locked) ??
      chapter.rungs.find((r) => !r.locked) ??
      null);

  const filled = chapter.done
    ? Math.max(
        1,
        Math.round((3 * chapter.starsEarned) / Math.max(1, chapter.starsMax)),
      )
    : 0;

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Chapter ${index + 1}`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />
      <m.div
        className="relative w-full max-w-md rounded-t-3xl border border-b-0 border-[var(--app-line-soft)] bg-[var(--app-card)] px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-5 sm:rounded-3xl sm:border-b"
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      >
        <span
          aria-hidden
          className="mx-auto mb-4 block h-1 w-9 rounded-full bg-[var(--app-line)] sm:hidden"
        />

        <div className="flex items-start gap-3.5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor:
                tier === "hard" ? "rgba(183,110,121,0.5)" : "var(--app-gold-soft)",
              background: "var(--app-black)",
            }}
          >
            <TierIcon tier={tier} size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold-soft)]">
              Chapter {index + 1} ·{" "}
              <span
                style={{
                  color:
                    tier === "hard" ? "var(--app-rose)" : "var(--app-gold-soft)",
                }}
              >
                {TIER_LABEL[tier]}
              </span>
              {chapter.locked && (
                <span className="text-[var(--app-dim)]"> · Locked</span>
              )}
            </p>
            <p
              className="mt-0.5 text-app-lead leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {named?.title ?? chapter.rungs[0]?.title}
            </p>
          </div>
        </div>

        <p className="mt-2.5 text-app-caption leading-relaxed text-[var(--app-muted)]">
          {named?.blurb || chapter.rungs[0]?.tagline}
        </p>

        {/* The record: stars and best score, only once there is one. */}
        {chapter.done && (
          <div className="mt-3.5 flex items-center gap-3 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-black)] px-3.5 py-2.5">
            <span className="flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <Star key={i} filled={i < filled} size={13} />
              ))}
            </span>
            <span className="text-app-caption text-[var(--app-muted)]">
              {chapter.starsEarned} of {chapter.starsMax}★
            </span>
            <span className="ml-auto text-app-caption tabular-nums text-[var(--app-gold-soft)]">
              Best {chapter.bestXp} XP
            </span>
          </div>
        )}

        {chapter.locked ? (
          <p className="mt-3.5 text-app-caption text-[var(--app-dim)]">
            Clear the chapter before this one and the door opens.
          </p>
        ) : (
          <div className="mt-2 flex flex-col">
            {chapter.rungs.map((r) => (
              <RungRow key={r.scenarioId} rung={r} isMember={isMember} />
            ))}
          </div>
        )}

        {playRung && (
          <Link
            href={`/app/train/${playRung.scenarioId}`}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--app-gold)] py-3.5 text-app-caption font-medium uppercase tracking-app-wide text-[#0a0908] active:scale-[0.98]"
          >
            {playRung.inProgress
              ? "Resume"
              : chapter.done
                ? "Replay chapter"
                : "Play"}
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        )}
      </m.div>
    </m.div>
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

  const [openIdx, setOpenIdx] = useState<number | null>(null);
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

  const sheet = openIdx !== null ? chapters[openIdx] : null;

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
            const tier = tierOf(c, i, chapters.length);
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
                onClick={() => setOpenIdx(i)}
                style={{ gridColumn: col + 1, gridRow: row + 1 }}
                className="flex h-full w-full items-center justify-center"
                aria-label={`Chapter ${i + 1}, ${TIER_LABEL[tier]}, ${done} of ${c.rungs.length} done`}
                aria-haspopup="dialog"
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
                whileTap={reducedMotion ? undefined : { scale: 0.85 }}
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
                    tier={tier}
                    index={i}
                    isCurrent={i === current}
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

      <AnimatePresence>
        {sheet && openIdx !== null && (
          <ChapterSheet
            key={`sheet-${openIdx}`}
            chapter={sheet}
            tier={tierOf(sheet, openIdx, chapters.length)}
            index={openIdx}
            named={track.levelTitles[sheet.level]}
            isMember={isMember}
            onClose={() => setOpenIdx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
