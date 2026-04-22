"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * Demo · WEB.
 *
 * You are a gold light, radiant, unguarded. A dark presence sits far
 * off. One by one, fine red threads extend from the presence toward
 * you. Each arrives from a different angle. Each touches. Each dims
 * you by a degree. By the end, the web is complete — you are
 * surrounded, eclipsed, and being pulled in.
 *
 * No dialogue, no tactic names, no scene labels. The story is told
 * entirely in line, light, and time.
 *
 * Implementation:
 *   - Threads are SVG Bezier curves whose stroke-dasharray animates
 *     from 0 to full length — creates the "drawing in" motion.
 *   - The gold orb dims slightly each time a thread touches it,
 *     using a CSS variable tied to the number of revealed threads.
 *   - A final contraction pulls gold toward the dark presence.
 */

// Thread endpoints — each is (startXPercent, startYPercent) from the
// dark presence to the gold orb. The starting points are near each
// other (the presence), the ends all converge on the gold orb.
//
// These are the POINTS the bezier curves draw between. Each thread
// uses a randomised mid-control-point so the arc is distinct.
type Thread = {
  start: [number, number];
  end: [number, number];
  /** Control point for the bezier — gives each thread its own bend. */
  control: [number, number];
};

// Gold orb lives at ~(35%, 55%). Dark presence lives at ~(82%, 22%).
const GOLD_POS: [number, number] = [35, 55];
const DARK_POS: [number, number] = [82, 22];

// Six threads, each curving in from a slightly different starting
// point around the dark presence, hitting the gold orb from a
// different angle. Control points chosen so they bow inward toward
// the center — the web "gathers" the gold into it.
const THREADS: Thread[] = [
  {
    start: [80, 20],
    end: [37, 52],
    control: [72, 28],
  },
  {
    start: [84, 26],
    end: [38, 58],
    control: [80, 52],
  },
  {
    start: [78, 18],
    end: [32, 55],
    control: [54, 20],
  },
  {
    start: [86, 22],
    end: [35, 50],
    control: [64, 60],
  },
  {
    start: [82, 24],
    end: [33, 60],
    control: [84, 62],
  },
  {
    start: [82, 20],
    end: [39, 56],
    control: [48, 42],
  },
];

type Phase =
  | "prelude"
  | "t1"
  | "t2"
  | "t3"
  | "t4"
  | "t5"
  | "t6"
  | "pulse"
  | "pull"
  | "reset";

const PHASE_ORDER: Phase[] = [
  "prelude",
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "pulse",
  "pull",
  "reset",
];

const PHASE_MS: Record<Phase, number> = {
  prelude: 1400, // calm — just the gold
  t1: 900,
  t2: 850,
  t3: 800,
  t4: 750,
  t5: 700,
  t6: 650,
  pulse: 1000, // web tightens, pulses red
  pull: 1600, // gold dragged inward
  reset: 500,
};

export default function WebPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const p = PHASE_ORDER[phaseIdx];
    const t = window.setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % PHASE_ORDER.length);
    }, PHASE_MS[p]);
    return () => window.clearTimeout(t);
  }, [phaseIdx, inView]);

  const phase = PHASE_ORDER[phaseIdx];
  const idx = PHASE_ORDER.indexOf(phase);

  // How many threads are revealed? Counts the "tN" phases passed.
  const threadsShown = (() => {
    if (phase === "prelude") return 0;
    if (phase === "reset") return 0;
    // From t1..t6, each next phase adds a thread.
    const tPhases: Phase[] = ["t1", "t2", "t3", "t4", "t5", "t6"];
    const at = tPhases.indexOf(phase);
    if (at >= 0) return at + 1;
    return 6; // pulse/pull — all shown
  })();

  // Gold orb dims as more threads connect. 6 threads → almost gone.
  const goldDim = Math.max(0.3, 1 - threadsShown * 0.12);

  // During "pull", gold position animates toward dark.
  const goldX = phase === "pull" ? DARK_POS[0] : GOLD_POS[0];
  const goldY = phase === "pull" ? DARK_POS[1] : GOLD_POS[1];

  // During "pulse", threads flicker red.
  const threadPulse = phase === "pulse";

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto"
      aria-label="Demo · Web"
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-warm-gold/20 bg-gradient-to-br from-[#090614] via-[#050309] to-[#090614]">
        {/* Ambient backdrop — cold void feel. Very subtle radial from
            the dark presence and the gold, so the eye reads the space
            as "two forces in a field". */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 82% 22%, rgba(80,10,30,0.45), transparent 35%), radial-gradient(circle at 35% 55%, rgba(212,175,55,0.22), transparent 38%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* SVG overlay — renders all threads + the dark presence. */}
        <svg
          className="absolute inset-0 w-full h-full"
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="thread" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(220,40,60,0.95)" />
              <stop offset="80%" stopColor="rgba(240,80,100,0.6)" />
              <stop offset="100%" stopColor="rgba(240,80,100,0)" />
            </linearGradient>
            <linearGradient id="thread-hot" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,70,90,1)" />
              <stop offset="60%" stopColor="rgba(255,100,120,0.9)" />
              <stop offset="100%" stopColor="rgba(255,100,120,0.5)" />
            </linearGradient>
          </defs>

          {/* Threads — each draws in when its phase activates. Uses
              pathLength animation for the "line being pulled in from
              infinity" feel. */}
          {THREADS.map((thread, i) => {
            const shown = threadsShown > i;
            if (!shown) return null;
            const d = `M ${thread.start[0]} ${thread.start[1]} Q ${thread.control[0]} ${thread.control[1]} ${thread.end[0]} ${thread.end[1]}`;
            return (
              <m.path
                key={i}
                d={d}
                fill="none"
                stroke={threadPulse ? "url(#thread-hot)" : "url(#thread)"}
                strokeWidth={threadPulse ? 0.55 : 0.4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: threadPulse ? [0.9, 1, 0.9] : 0.9,
                }}
                transition={{
                  pathLength: { duration: 0.6, ease: "easeOut" },
                  opacity: {
                    duration: 0.4,
                    repeat: threadPulse ? Infinity : 0,
                    ease: "easeInOut",
                  },
                }}
              />
            );
          })}

          {/* Dark presence — a tight knot at the origin of the threads.
              Pulses in rhythm with the reveal — like a heart. */}
          <m.circle
            cx={DARK_POS[0]}
            cy={DARK_POS[1]}
            r={2.4}
            fill="rgba(180,20,40,1)"
            animate={{
              r: [2.2, 3.2, 2.2],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Outer halo */}
          <circle
            cx={DARK_POS[0]}
            cy={DARK_POS[1]}
            r={5}
            fill="none"
            stroke="rgba(220,40,60,0.28)"
            strokeWidth={0.3}
          />
          <circle
            cx={DARK_POS[0]}
            cy={DARK_POS[1]}
            r={8}
            fill="none"
            stroke="rgba(220,40,60,0.15)"
            strokeWidth={0.25}
          />
        </svg>

        {/* Gold orb — "you". Animated via framer so position + dim
            transition smoothly, including the final pull into the
            dark presence. */}
        <m.div
          className="absolute"
          initial={{ left: `${GOLD_POS[0]}%`, top: `${GOLD_POS[1]}%` }}
          animate={{
            left: `${goldX}%`,
            top: `${goldY}%`,
            opacity: goldDim,
          }}
          transition={{
            left: { duration: phase === "pull" ? 1.4 : 0.6, ease: "easeIn" },
            top: { duration: phase === "pull" ? 1.4 : 0.6, ease: "easeIn" },
            opacity: { duration: 0.4 },
          }}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <m.div
            className="relative w-5 h-5 rounded-full bg-warm-gold"
            animate={{
              scale: [1, 1.12, 1],
              boxShadow: [
                "0 0 24px rgba(212,175,55,0.9), 0 0 48px rgba(212,175,55,0.45)",
                "0 0 32px rgba(212,175,55,1), 0 0 70px rgba(212,175,55,0.65)",
                "0 0 24px rgba(212,175,55,0.9), 0 0 48px rgba(212,175,55,0.45)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div
            className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-90 scale-[4]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent 70%)",
            }}
          />
        </m.div>

        {/* Corner labels. */}
        <div className="absolute top-3 left-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          10:32 PM
        </div>
        <div className="absolute top-3 right-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          Scene 01
        </div>

        {/* Verdict — brief, on pull. One word. */}
        <AnimatePresence>
          {phase === "pull" && (
            <m.p
              key={`verdict-${idx}`}
              initial={{ opacity: 0, letterSpacing: "0.25em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-0 bottom-[14%] text-center text-warm-gold text-xs sm:text-sm uppercase font-light z-10"
              style={{ textShadow: "0 0 16px rgba(220,40,60,0.6)" }}
            >
              Caught
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
