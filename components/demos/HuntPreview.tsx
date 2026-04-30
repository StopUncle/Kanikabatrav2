"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * Demo · HUNT.
 *
 * A predator-approach animation told through two orbs on a dark field.
 *
 *   Gold orb (you)   , centered, radiant, idle pulse.
 *   Red orb (hunter) , enters from top-left, moves along a probe-and-
 *                       retreat path toward the gold, leaves a fading
 *                       trail. Speed varies: bursts of motion, pauses
 *                       to "watch", sudden re-engagement.
 *
 * The story is entirely in the movement, no dialog, no labels, no
 * tactic cards. A cold visitor reads it in under 5 seconds: something
 * is stalking you. It gets closer. It gets here. It captures. One
 * short verdict word surfaces briefly at the very end.
 *
 * Implementation notes:
 *   - The hunter's path is a fixed series of waypoints, each a
 *     (x%, y%, holdMs) tuple. Framer Motion animates between them
 *     with `times` so each segment has its own speed.
 *   - The trail is a client-side ring buffer of recent positions
 *     sampled on rAF; oldest positions fade out via the stroke's
 *     dash-array offset.
 *   - At the final waypoint, a capture flash fires: red tendrils
 *     burst outward, gold dims, verdict word flashes.
 *   - Loop resets with a brief dark flash.
 */

// Waypoints as [xPercent, yPercent]. The path: enter top-left, probe
// right, retreat, circle under the target, pounce. The final waypoint
// sits at the target position.
const PATH: [number, number][] = [
  [-10, 18], // entry, off canvas top-left
  [22, 28], // probe right
  [18, 42], // watch
  [32, 50], // edge closer
  [14, 58], // retreat
  [26, 38], // re-approach
  [42, 46], // close
  [38, 54], // circle under
  [48, 50], // within reach
  [50, 50], // CAPTURE (target position)
];

// Per-segment duration in seconds. Keeps the path feeling uneven —
// fast approaches, sudden holds. Total cycle ≈ 10s.
const SEGMENT_DURATION = [0.9, 0.8, 0.6, 0.9, 0.7, 1.0, 0.8, 0.9, 0.7, 0.5];

// Total animation duration (capture + verdict + reset).
const CYCLE_MS = 13000;

type Point = { x: number; y: number };

export default function HuntPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [cycle, setCycle] = useState(0);

  // Trail, array of recent hunter positions. Sampled via rAF while
  // visible. Older entries fade out.
  const [trail, setTrail] = useState<Point[]>([]);
  const hunterPosRef = useRef<Point>({ x: PATH[0][0], y: PATH[0][1] });

  // Pause when scrolled off.
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

  // rAF loop: sample hunter position into the trail buffer.
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 55) {
        last = now;
        setTrail((prev) => {
          const next = [...prev, { ...hunterPosRef.current }];
          if (next.length > 26) next.shift();
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  // Cycle loop, bump `cycle` every CYCLE_MS to restart animation.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => {
      setCycle((c) => c + 1);
      setTrail([]);
    }, CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [cycle, inView]);

  // Derive total animation duration from the segment array.
  const totalPathDuration = SEGMENT_DURATION.reduce((a, b) => a + b, 0);
  // `times` for Framer: each waypoint's position in the 0–1 timeline.
  const times: number[] = [];
  {
    let accum = 0;
    times.push(0);
    for (let i = 0; i < SEGMENT_DURATION.length; i++) {
      accum += SEGMENT_DURATION[i];
      times.push(accum / totalPathDuration);
    }
  }

  const xKeyframes = [PATH[0][0], ...PATH.map((p) => p[0])];
  const yKeyframes = [PATH[0][1], ...PATH.map((p) => p[1])];

  // Timing for capture + verdict (after the path completes).
  const captureDelay = totalPathDuration; // seconds
  const verdictDelay = captureDelay + 0.4;
  const resetDelay = verdictDelay + 2.0;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto"
      aria-label="Demo · Hunt"
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-warm-gold/20 bg-gradient-to-br from-[#0b0812] via-[#060409] to-[#0b0812]">
        {/* Scanline / grid texture, gives the field a top-down map feel
            without being busy. Low opacity. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(212,175,55,0.4) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Vignette, darken the edges so the centre glows. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Gold orb, the target. Static at centre with an idle breath.
            Dims during the capture beat. */}
        <m.div
          key={`target-${cycle}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 1, 1, 0.35, 0.15],
          }}
          transition={{
            duration: resetDelay,
            times: [0, 0.55, 0.74, 0.82, 0.95],
            ease: "easeInOut",
          }}
        >
          <m.div
            className="relative w-4 h-4 rounded-full bg-warm-gold"
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(212,175,55,0.4)",
                "0 0 30px rgba(212,175,55,1), 0 0 60px rgba(212,175,55,0.6)",
                "0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(212,175,55,0.4)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Outer halo */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-90 scale-[4]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent 70%)",
            }}
          />
        </m.div>

        {/* Trail. SVG polyline of recent hunter positions, fading out
            toward older points. Drawn as a gradient stroke. */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id={`trail-${cycle}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(220,40,60,0)" />
              <stop offset="40%" stopColor="rgba(220,40,60,0.2)" />
              <stop offset="100%" stopColor="rgba(240,60,80,0.85)" />
            </linearGradient>
          </defs>
          {trail.length > 1 && (
            <polyline
              points={trail.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke={`url(#trail-${cycle})`}
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {/* Hunter orb, the predator. Moves along PATH. Uses Framer's
            keyframe animation with custom `times` to control per-
            segment speed. Writes its current position into a ref so
            the rAF loop above can sample for the trail. */}
        <m.div
          key={`hunter-${cycle}`}
          className="absolute"
          initial={{ left: `${PATH[0][0]}%`, top: `${PATH[0][1]}%` }}
          animate={{
            left: xKeyframes.map((x) => `${x}%`),
            top: yKeyframes.map((y) => `${y}%`),
          }}
          transition={{
            duration: totalPathDuration,
            times,
            ease: "easeInOut",
          }}
          onUpdate={(latest) => {
            // Parse "12%" → 12. Motion passes the resolved string.
            const rawLeft = latest.left as string | number;
            const rawTop = latest.top as string | number;
            const xNum = typeof rawLeft === "string"
              ? parseFloat(rawLeft)
              : rawLeft;
            const yNum = typeof rawTop === "string"
              ? parseFloat(rawTop)
              : rawTop;
            if (!Number.isNaN(xNum) && !Number.isNaN(yNum)) {
              hunterPosRef.current = { x: xNum, y: yNum };
            }
          }}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {/* Hunter body, a red dot with a subtle heartbeat pulse.
              Grows larger as it approaches the target (done via a
              separate nested animation). */}
          <m.div
            className="relative w-3 h-3 rounded-full bg-red-500"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 12px rgba(240,50,80,0.7)",
                "0 0 22px rgba(240,50,80,1)",
                "0 0 12px rgba(240,50,80,0.7)",
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div
            className="absolute inset-0 -z-10 rounded-full blur-xl opacity-80 scale-[3]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(240,40,70,0.6), transparent 70%)",
            }}
          />
        </m.div>

        {/* Capture burst, red tendrils fire from the target on the
            capture beat. Eight radial lines draw out and fade. */}
        <m.div
          key={`capture-${cycle}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0, 1, 0],
            scale: [0.6, 0.6, 1.4, 1.6],
          }}
          transition={{
            duration: resetDelay,
            times: [0, captureDelay / resetDelay, (captureDelay + 0.5) / resetDelay, 1],
            ease: "easeOut",
          }}
        >
          <svg
            width="320"
            height="320"
            viewBox="-50 -50 100 100"
            aria-hidden
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 12;
              const r1 = 4;
              const r2 = 40;
              const x1 = Math.cos(angle) * r1;
              const y1 = Math.sin(angle) * r1;
              const x2 = Math.cos(angle) * r2;
              const y2 = Math.sin(angle) * r2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(240,50,80,0.9)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              );
            })}
            <circle
              cx="0"
              cy="0"
              r="5"
              fill="none"
              stroke="rgba(240,60,80,0.8)"
              strokeWidth="1.2"
            />
          </svg>
        </m.div>

        {/* Verdict word, appears for a beat after capture. ONE word.
            That's the only text in this demo. */}
        <AnimatePresence>
          <m.div
            key={`verdict-${cycle}`}
            initial={{ opacity: 0, y: 8, letterSpacing: "0.25em" }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              y: [8, 8, 0, 0, -4],
              letterSpacing: [
                "0.25em",
                "0.25em",
                "0.55em",
                "0.55em",
                "0.65em",
              ],
            }}
            transition={{
              duration: resetDelay,
              times: [
                0,
                verdictDelay / resetDelay,
                (verdictDelay + 0.4) / resetDelay,
                (verdictDelay + 1.6) / resetDelay,
                1,
              ],
            }}
            className="absolute inset-x-0 bottom-[22%] text-center z-10"
          >
            <p
              className="text-warm-gold text-xs sm:text-sm uppercase font-light"
              style={{ textShadow: "0 0 18px rgba(240,50,80,0.6)" }}
            >
              Hoover
            </p>
          </m.div>
        </AnimatePresence>

        {/* Tiny status strip, just a timestamp in the corner, no other
            text anywhere. Keeps the frame readable as a "scene 01" */}
        <div className="absolute top-3 left-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          10:32 PM
        </div>
        <div className="absolute top-3 right-4 text-warm-gold/40 text-[9px] uppercase tracking-[0.35em]">
          Scene 01
        </div>
      </div>
    </div>
  );
}
