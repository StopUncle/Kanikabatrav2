"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Aside, Head, Label } from "./TierOne";

/**
 * Tier two: framer-motion, which the app already pays for.
 *
 * The line between this tier and the last one is not "fancier". It is that
 * these four effects cannot be expressed in CSS at all, because each one
 * needs to know something CSS has no access to: where an element used to be,
 * how fast a finger was moving, or a value that only exists at runtime.
 *
 * The shared element transition is the one that matters. It is the single
 * largest difference between an app that feels native and a website in a
 * phone-shaped box, and the app currently has none.
 */

const SCENARIOS = [
  {
    id: "unsent",
    title: "The Unsent Text",
    track: "After Him",
    lede: "She has not replied in four days. The draft is written. Sending it is the whole test.",
    tactic: "Silence as narrative vacuum",
  },
  {
    id: "apology",
    title: "The Apology That Was Not One",
    track: "Toxic Narc",
    lede: "Every clause takes it back. You are being asked to accept the shape of an apology and call it one.",
    tactic: "DARVO",
  },
];

const LEDGER = [
  { label: "Gaslighting", value: 0.82 },
  { label: "Guilt levers", value: 0.71 },
  { label: "Triangulation", value: 0.58 },
  { label: "Moving goalposts", value: 0.34 },
  { label: "Future faking", value: 0.29 },
];

export default function TierTwo() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [run, setRun] = useState(0);

  const open = SCENARIOS.find((s) => s.id === openId) ?? null;

  return (
    <section>
      <Head
        tier="Tier two"
        title="Already paid for"
        note="framer-motion, 0kb of new dependency. Each of these needs a fact CSS cannot see: a previous position, a gesture velocity, or a number that only exists at runtime."
        onReplay={() => setRun((n) => n + 1)}
      />

      {/* 1. Shared element */}
      <Label>Shared element, the one that reads as native</Label>
      <LayoutGroup>
        <div className="flex flex-col gap-2">
          {SCENARIOS.map((s) => (
            <motion.button
              key={s.id}
              layoutId={`card-${s.id}`}
              type="button"
              onClick={() => setOpenId(s.id)}
              style={{ borderRadius: 18 }}
              className="flex w-full items-center justify-between border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-left"
            >
              <span className="min-w-0">
                <motion.span
                  layoutId={`title-${s.id}`}
                  className="block truncate text-app-lead"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </motion.span>
                <motion.span
                  layoutId={`track-${s.id}`}
                  className="mt-0.5 block text-app-caption text-[var(--app-dim)]"
                >
                  {s.track}
                </motion.span>
              </span>
              <span className="shrink-0 pl-3 text-app-caption tracking-app-wide text-[var(--app-gold)]">
                OPEN
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-5"
              initial={{ backgroundColor: "rgba(6,5,4,0)" }}
              animate={{ backgroundColor: "rgba(6,5,4,0.82)" }}
              exit={{ backgroundColor: "rgba(6,5,4,0)" }}
              onClick={() => setOpenId(null)}
            >
              <motion.div
                layoutId={`card-${open.id}`}
                style={{ borderRadius: 24 }}
                className="w-full max-w-[340px] border border-[var(--app-line)] bg-[var(--app-card-2)] p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.span
                  layoutId={`track-${open.id}`}
                  className="block text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]"
                >
                  {open.track}
                </motion.span>
                <motion.span
                  layoutId={`title-${open.id}`}
                  className="mt-2 block text-app-display leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {open.title}
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  className="mt-3 text-app-caption leading-relaxed text-[var(--app-muted)]"
                >
                  {open.lede}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-app-micro uppercase tracking-app-label text-[var(--app-dim)]"
                >
                  Runs: {open.tactic}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <Aside>
        The title does not cross-fade, it travels. The card the finger landed
        on is the card that arrives, which is the entire illusion. Tap the
        backdrop and it goes home the way it came.
      </Aside>

      {/* 2. Spring counter */}
      <Label>A number with weight</Label>
      <div key={`xp-${run}`} className="rounded-[20px] border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-6">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Run banked
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <SpringCount to={1240} />
          <span className="text-app-caption tracking-app-wide text-[var(--app-dim)]">
            XP
          </span>
        </div>
        <div className="mt-4 flex gap-5">
          <Stat label="Choices" to={11} delay={0.25} />
          <Stat label="Optimal" to={8} delay={0.35} />
          <Stat label="Streak" to={5} delay={0.45} />
        </div>
      </div>
      <Aside>
        Spring, not duration. A linear count-up arrives on a schedule and
        feels like a progress bar; a spring overshoots by a hair and settles,
        which is what makes it feel like the number landed.
      </Aside>

      {/* 3. SVG draw-on */}
      <Label>The ledger, drawing itself</Label>
      <div key={`ledger-${run}`} className="rounded-[20px] border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-5">
        {LEDGER.map((row, i) => (
          <div key={row.label} className="mb-3.5 last:mb-0">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-app-caption text-[var(--app-text)]">
                {row.label}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="text-app-micro tracking-app-label text-[var(--app-dim)]"
              >
                {Math.round(row.value * 100)}%
              </motion.span>
            </div>
            <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="h-[4px] w-full">
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="var(--app-line)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.line
                x1="0"
                y1="1"
                x2={row.value * 100}
                y2="1"
                stroke={row.value < 0.6 ? "var(--app-rose)" : "var(--app-gold)"}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: 0.1 + i * 0.12,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </svg>
          </div>
        ))}
      </div>
      <Aside>
        `pathLength` is a normalised stroke, so one transition draws any line
        regardless of its real length. Rose under 60% carries the verdict
        without a word of copy.
      </Aside>

      {/* 4. Gesture sheet */}
      <Label>A sheet that knows how fast you flicked it</Label>
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="w-full rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-app-lead"
      >
        Open the sheet
      </button>
      <AnimatePresence>
        {sheetOpen && <DragSheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
      <Aside>
        Dismissal is decided on velocity first, distance second. Drag it
        halfway and let go slowly and it returns; flick it an inch and it
        goes. That asymmetry is what separates a sheet from a div.
      </Aside>
    </section>
  );
}

function SpringCount({ to }: { to: number }) {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(value, to, {
      type: "spring",
      stiffness: 55,
      damping: 16,
      restDelta: 0.5,
    });
    return () => controls.stop();
  }, [to, value]);

  return (
    <motion.span
      className="text-[44px] leading-none tabular-nums"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {text}
    </motion.span>
  );
}

function Stat({
  label,
  to,
  delay,
}: {
  label: string;
  to: number;
  delay: number;
}) {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => String(Math.round(v)));

  useEffect(() => {
    const controls = animate(value, to, {
      type: "spring",
      stiffness: 90,
      damping: 14,
      delay,
      restDelta: 0.5,
    });
    return () => controls.stop();
  }, [to, delay, value]);

  return (
    <span className="block">
      <motion.span
        className="block text-app-title tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text}
      </motion.span>
      <span className="mt-0.5 block text-app-micro uppercase tracking-app-label text-[var(--app-dim)]">
        {label}
      </span>
    </span>
  );
}

function DragSheet({ onClose }: { onClose: () => void }) {
  const sheet = useRef<HTMLDivElement | null>(null);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // Velocity wins. A slow drag past halfway is someone reading the sheet
    // while they hold it; a fast flick of an inch is someone dismissing it.
    const flicked = info.velocity.y > 520;
    const dragged = info.offset.y > 150;
    if (flicked || dragged) onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ backgroundColor: "rgba(6,5,4,0)" }}
      animate={{ backgroundColor: "rgba(6,5,4,0.78)" }}
      exit={{ backgroundColor: "rgba(6,5,4,0)" }}
      onClick={onClose}
    >
      <motion.div
        ref={sheet}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.02, bottom: 0.7 }}
        onDragEnd={onDragEnd}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="w-full max-w-[420px] rounded-t-[26px] border-x border-t border-[var(--app-line)] bg-[var(--app-card-2)] px-6 pb-10 pt-3"
      >
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-[var(--app-line-soft)]" />
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          Before you send it
        </p>
        <p
          className="mt-2 text-app-display leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What are you hoping happens?
        </p>
        <p className="mt-3 text-app-caption leading-relaxed text-[var(--app-muted)]">
          Rubber-banding is asymmetric on purpose. Downward gives, upward
          barely moves, so the sheet has a floor you can feel.
        </p>
      </motion.div>
    </motion.div>
  );
}
