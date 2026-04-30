"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * Demo · MASK.
 *
 * A single Venetian mask animates: breath, blink, crack, split open.
 * Behind the first mask, a second appears, harder, more predatory.
 * It too splits. The third is feral.
 *
 * The metaphor: people wear masks. You see the first, trust it, act
 * on it. Underneath is another, and another. The Consilium teaches
 * you to read the layers before they split themselves.
 *
 * Zero dialogue, zero tactic text, zero scene labels. The whole story
 * is in the face.
 *
 * Implementation:
 *   - Each "layer" is an absolutely-positioned mask SVG. They stack
 *     on top of each other at the same position with different
 *     z-indices.
 *   - The top layer splits via two half-mask SVGs that rotate outward
 *     on the X axis (3D door-open) while fading.
 *   - The layer below is revealed by the split. It then blinks and
 *     begins its own split.
 *   - After the third layer reveals, everything assembles back
 *     into the first mask and the loop restarts.
 */

type Beat =
  | "idle" // first mask breathes, blinks
  | "crack" // crack appears on first mask
  | "split-1" // first mask splits open
  | "reveal-2" // second mask (darker) visible
  | "crack-2" // crack on second
  | "split-2" // second splits
  | "reveal-3" // third mask (feral, red eyes)
  | "hold" // hold on third
  | "close" // everything snaps back to first mask
  | "reset";

const BEAT_ORDER: Beat[] = [
  "idle",
  "crack",
  "split-1",
  "reveal-2",
  "crack-2",
  "split-2",
  "reveal-3",
  "hold",
  "close",
  "reset",
];

const BEAT_MS: Record<Beat, number> = {
  idle: 2600,
  crack: 1400,
  "split-1": 1000,
  "reveal-2": 1600,
  "crack-2": 1100,
  "split-2": 900,
  "reveal-3": 2200,
  hold: 1300,
  close: 700,
  reset: 400,
};

export default function MaskPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beatIdx, setBeatIdx] = useState(0);
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
    const beat = BEAT_ORDER[beatIdx];
    const t = window.setTimeout(() => {
      setBeatIdx((i) => (i + 1) % BEAT_ORDER.length);
    }, BEAT_MS[beat]);
    return () => window.clearTimeout(t);
  }, [beatIdx, inView]);

  const beat = BEAT_ORDER[beatIdx];
  const at = (b: Beat) => BEAT_ORDER.indexOf(beat) >= BEAT_ORDER.indexOf(b);
  const past = (b: Beat) => BEAT_ORDER.indexOf(beat) > BEAT_ORDER.indexOf(b);

  // First-mask states:
  //   idle → whole
  //   crack → whole with crack visible
  //   split-1 → halves rotating outward
  //   reveal-2+ → gone (rotated off, opacity 0)
  const firstSplit = at("split-1") && !past("reveal-2");
  const firstHidden = at("reveal-2");

  // Second mask revealed from "reveal-2" through "split-2".
  const secondVisible = at("reveal-2") && !past("reveal-3");
  const secondSplit = at("split-2") && !past("reveal-3");

  // Third mask, final, feral.
  const thirdVisible = at("reveal-3") && !past("close");

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto"
      aria-label="Demo · Mask"
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-warm-gold/20 bg-gradient-to-br from-[#0b0812] via-[#060409] to-[#0b0812]">
        {/* Atmospheric backdrop, single soft purple light source.
            Slowly drifts. The whole scene is "lit" by this one light. */}
        <m.div
          aria-hidden
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 40%, rgba(150,80,220,0.35), transparent 55%), radial-gradient(ellipse at 30% 90%, rgba(30,10,60,0.6), transparent 55%)",
              "radial-gradient(ellipse at 50% 40%, rgba(180,70,200,0.42), transparent 55%), radial-gradient(ellipse at 30% 90%, rgba(40,10,70,0.6), transparent 55%)",
              "radial-gradient(ellipse at 50% 40%, rgba(150,80,220,0.35), transparent 55%), radial-gradient(ellipse at 30% 90%, rgba(30,10,60,0.6), transparent 55%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Film grain. Same subtle noise pattern for tactile feel. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.15]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.7  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Perspective frame, centers the masks, enables 3D transforms. */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <div className="relative w-[60%] max-w-[380px] aspect-[2/1]">
            {/* THIRD MASK, the feral one. Rendered lowest in the stack
                so it's behind the others until they split away. */}
            <AnimatePresence>
              {thirdVisible && (
                <m.div
                  key="third"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <MaskLayer
                    variant="third"
                    blink={beat === "reveal-3"}
                  />
                </m.div>
              )}
            </AnimatePresence>

            {/* SECOND MASK, darker, more angular, burgundy stroke. */}
            {secondVisible && !secondSplit && (
              <div className="absolute inset-0 flex items-center justify-center">
                <MaskLayer variant="second" blink={beat === "reveal-2"} />
              </div>
            )}
            {/* Second mask split, left and right halves rotate out. */}
            {secondSplit && (
              <MaskSplitAnim variant="second" />
            )}

            {/* FIRST MASK, the gold one. Idle breathing + eye shift.
                Crack appears. Then splits open. */}
            {!firstHidden && !firstSplit && (
              <div className="absolute inset-0 flex items-center justify-center">
                <MaskLayer
                  variant="first"
                  blink={beat === "idle" || beat === "close"}
                  showCrack={beat === "crack"}
                />
              </div>
            )}
            {firstSplit && <MaskSplitAnim variant="first" />}
          </div>
        </div>

        {/* Corner labels, tiny, mostly for parity with other demos. */}
        <div className="absolute top-3 left-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          10:32 PM
        </div>
        <div className="absolute top-3 right-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          Scene 01
        </div>

        {/* A single line of text reveals briefly on hold. Two words. */}
        <AnimatePresence>
          {beat === "hold" && (
            <m.p
              key="verdict"
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-0 bottom-[14%] text-center text-warm-gold text-xs sm:text-sm uppercase font-light z-10"
              style={{ textShadow: "0 0 14px rgba(212,175,55,0.5)" }}
            >
              Which face?
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * A full mask SVG in one of three variants. Colours, angularity, and
 * detail shift across variants, the story is "underneath this polite
 * face is something harder, and underneath that, something animal."
 */
function MaskLayer({
  variant,
  blink,
  showCrack,
}: {
  variant: "first" | "second" | "third";
  blink?: boolean;
  showCrack?: boolean;
}) {
  const palette = {
    first: {
      fill: "url(#mask-first-fill)",
      stroke: "url(#mask-first-stroke)",
      strokeW: 1.4,
      eyeFill: "rgba(0,0,0,0.96)",
      glint: "rgba(200,170,255,0.9)",
    },
    second: {
      fill: "url(#mask-second-fill)",
      stroke: "url(#mask-second-stroke)",
      strokeW: 1.6,
      eyeFill: "rgba(0,0,0,0.97)",
      glint: "rgba(255,180,160,0.8)",
    },
    third: {
      fill: "url(#mask-third-fill)",
      stroke: "url(#mask-third-stroke)",
      strokeW: 1.8,
      eyeFill: "rgba(10,0,0,1)",
      glint: "rgba(255,60,60,1)",
    },
  }[variant];

  return (
    <m.svg
      width="280"
      height="150"
      viewBox="0 0 200 110"
      aria-hidden
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        filter:
          "drop-shadow(0 12px 28px rgba(0,0,0,0.65)) drop-shadow(0 0 24px rgba(212,175,55,0.15))",
      }}
    >
      <defs>
        {/* First variant, gold lacquer, warm. */}
        <linearGradient id="mask-first-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(44,32,60,0.98)" />
          <stop offset="55%" stopColor="rgba(18,12,26,0.99)" />
          <stop offset="100%" stopColor="rgba(5,3,10,1)" />
        </linearGradient>
        <linearGradient id="mask-first-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(243,217,138,1)" />
          <stop offset="50%" stopColor="rgba(212,175,55,1)" />
          <stop offset="100%" stopColor="rgba(156,122,31,0.9)" />
        </linearGradient>

        {/* Second variant, darker metal, burgundy edge. */}
        <linearGradient id="mask-second-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(30,10,18,0.98)" />
          <stop offset="55%" stopColor="rgba(14,4,8,0.99)" />
          <stop offset="100%" stopColor="rgba(4,1,3,1)" />
        </linearGradient>
        <linearGradient id="mask-second-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180,70,90,1)" />
          <stop offset="50%" stopColor="rgba(140,40,60,1)" />
          <stop offset="100%" stopColor="rgba(90,20,40,0.9)" />
        </linearGradient>

        {/* Third variant, feral, raw. Black fill + red edge. */}
        <linearGradient id="mask-third-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(20,2,4,0.99)" />
          <stop offset="55%" stopColor="rgba(8,0,2,0.99)" />
          <stop offset="100%" stopColor="rgba(2,0,0,1)" />
        </linearGradient>
        <linearGradient id="mask-third-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(240,50,60,1)" />
          <stop offset="50%" stopColor="rgba(200,20,40,1)" />
          <stop offset="100%" stopColor="rgba(120,10,20,1)" />
        </linearGradient>
      </defs>

      {/* Main mask shape. Same silhouette across variants for the
          "peel underneath" illusion. Only fill/stroke change. */}
      <path
        d="
          M 22 58
          C 22 30, 58 15, 100 15
          C 142 15, 178 30, 178 58
          C 178 76, 160 96, 140 96
          C 128 96, 118 88, 110 80
          C 106 77, 94 77, 90 80
          C 82 88, 72 96, 60 96
          C 40 96, 22 76, 22 58
          Z
        "
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth={palette.strokeW}
      />

      {/* Brow flourishes, make it read as a carved mask. */}
      <path
        d="M 38 44 Q 64 26, 92 40"
        fill="none"
        stroke={palette.stroke}
        strokeWidth="1"
        opacity={variant === "third" ? 0.9 : 0.6}
      />
      <path
        d="M 108 40 Q 136 26, 162 44"
        fill="none"
        stroke={palette.stroke}
        strokeWidth="1"
        opacity={variant === "third" ? 0.9 : 0.6}
      />

      {/* Crack, only shown on first mask's "crack" beat. A jagged
          gold line that animates its draw. */}
      {showCrack && (
        <m.path
          d="M 138 30 L 140 44 L 132 56 L 138 72 L 126 88"
          fill="none"
          stroke="rgba(243,217,138,1)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1, 0.7] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 4px rgba(243,217,138,0.8))" }}
        />
      )}

      {/* Eyes, animated blink. ScaleY collapses briefly. */}
      <m.g
        animate={blink ? { scaleY: [1, 0.1, 1] } : undefined}
        transition={{
          duration: 0.35,
          repeat: blink ? Infinity : 0,
          repeatDelay: 2.2,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "100px 54px" }}
      >
        <ellipse
          cx="64"
          cy="54"
          rx="15"
          ry="7.5"
          fill={palette.eyeFill}
          transform="rotate(-6 64 54)"
        />
        <ellipse
          cx="136"
          cy="54"
          rx="15"
          ry="7.5"
          fill={palette.eyeFill}
          transform="rotate(6 136 54)"
        />
        <circle cx="68" cy="52" r="1.3" fill={palette.glint} />
        <circle cx="140" cy="52" r="1.3" fill={palette.glint} />
      </m.g>
    </m.svg>
  );
}

/**
 * Split animation, two half-mask SVGs rotate outward from the center.
 * The first variant uses gold palette, the second uses burgundy.
 * Splits take ~1s, then the pieces fade out.
 */
function MaskSplitAnim({ variant }: { variant: "first" | "second" }) {
  const fill = variant === "first" ? "mask-first-fill" : "mask-second-fill";
  const stroke =
    variant === "first" ? "mask-first-stroke" : "mask-second-stroke";
  const strokeW = variant === "first" ? 1.4 : 1.6;
  const eyeFill =
    variant === "first" ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.97)";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Left half rotates to open leftward */}
      <m.div
        className="absolute"
        initial={{ rotateY: 0, x: 0, opacity: 1 }}
        animate={{ rotateY: -80, x: -60, opacity: [1, 1, 0] }}
        transition={{ duration: 1, ease: [0.45, 0, 0.3, 1] }}
        style={{ transformOrigin: "100% 50%", transformStyle: "preserve-3d" }}
      >
        <svg
          width="280"
          height="150"
          viewBox="0 0 200 110"
          aria-hidden
          style={{
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
          }}
        >
          <defs>
            {/* Redefine the gradients for this isolated SVG. */}
            <linearGradient id={`${fill}-L`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={
                  variant === "first"
                    ? "rgba(44,32,60,0.98)"
                    : "rgba(30,10,18,0.98)"
                }
              />
              <stop offset="100%" stopColor="rgba(5,3,10,1)" />
            </linearGradient>
            <linearGradient id={`${stroke}-L`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={
                  variant === "first"
                    ? "rgba(243,217,138,1)"
                    : "rgba(180,70,90,1)"
                }
              />
              <stop
                offset="100%"
                stopColor={
                  variant === "first"
                    ? "rgba(156,122,31,0.9)"
                    : "rgba(90,20,40,0.9)"
                }
              />
            </linearGradient>
          </defs>
          <clipPath id={`clipL-${variant}`}>
            <rect x="0" y="0" width="100" height="110" />
          </clipPath>
          <g clipPath={`url(#clipL-${variant})`}>
            <path
              d="
                M 22 58
                C 22 30, 58 15, 100 15
                C 142 15, 178 30, 178 58
                C 178 76, 160 96, 140 96
                C 128 96, 118 88, 110 80
                C 106 77, 94 77, 90 80
                C 82 88, 72 96, 60 96
                C 40 96, 22 76, 22 58
                Z
              "
              fill={`url(#${fill}-L)`}
              stroke={`url(#${stroke}-L)`}
              strokeWidth={strokeW}
            />
            <ellipse
              cx="64"
              cy="54"
              rx="15"
              ry="7.5"
              fill={eyeFill}
              transform="rotate(-6 64 54)"
            />
          </g>
        </svg>
      </m.div>

      {/* Right half rotates to open rightward */}
      <m.div
        className="absolute"
        initial={{ rotateY: 0, x: 0, opacity: 1 }}
        animate={{ rotateY: 80, x: 60, opacity: [1, 1, 0] }}
        transition={{ duration: 1, ease: [0.45, 0, 0.3, 1] }}
        style={{ transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}
      >
        <svg
          width="280"
          height="150"
          viewBox="0 0 200 110"
          aria-hidden
          style={{
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
          }}
        >
          <defs>
            <linearGradient id={`${fill}-R`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={
                  variant === "first"
                    ? "rgba(44,32,60,0.98)"
                    : "rgba(30,10,18,0.98)"
                }
              />
              <stop offset="100%" stopColor="rgba(5,3,10,1)" />
            </linearGradient>
            <linearGradient id={`${stroke}-R`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={
                  variant === "first"
                    ? "rgba(243,217,138,1)"
                    : "rgba(180,70,90,1)"
                }
              />
              <stop
                offset="100%"
                stopColor={
                  variant === "first"
                    ? "rgba(156,122,31,0.9)"
                    : "rgba(90,20,40,0.9)"
                }
              />
            </linearGradient>
          </defs>
          <clipPath id={`clipR-${variant}`}>
            <rect x="100" y="0" width="100" height="110" />
          </clipPath>
          <g clipPath={`url(#clipR-${variant})`}>
            <path
              d="
                M 22 58
                C 22 30, 58 15, 100 15
                C 142 15, 178 30, 178 58
                C 178 76, 160 96, 140 96
                C 128 96, 118 88, 110 80
                C 106 77, 94 77, 90 80
                C 82 88, 72 96, 60 96
                C 40 96, 22 76, 22 58
                Z
              "
              fill={`url(#${fill}-R)`}
              stroke={`url(#${stroke}-R)`}
              strokeWidth={strokeW}
            />
            <ellipse
              cx="136"
              cy="54"
              rx="15"
              ry="7.5"
              fill={eyeFill}
              transform="rotate(6 136 54)"
            />
          </g>
        </svg>
      </m.div>
    </div>
  );
}
