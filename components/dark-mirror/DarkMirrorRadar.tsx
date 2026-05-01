"use client";

import { m } from "framer-motion";
import type { QuizScores } from "@/lib/quiz-data";
import type { PersonalityType } from "@/lib/quiz-data";

/**
 * Animated SVG hex radar for the Mini Dark Mirror result page.
 *
 * Design notes:
 *   - Pure SVG, no chart library, keeps the bundle clean and gives
 *     us full control over the animation timing.
 *   - 6 axes arranged at hex points, label rotated/positioned
 *     readably at each vertex.
 *   - Concentric grid rings at 25/50/75/100% so the magnitude is
 *     visible even on the secondary axes.
 *   - The score polygon draws in over ~1.2s with a stagger so the
 *     dominant axis vertex pulses last, the screenshot moment.
 *   - Color: warm-gold polygon fill at low alpha, gold stroke,
 *     dominant vertex marked with a brighter pulse.
 */

interface Props {
  scores: QuizScores;
  dominantType: PersonalityType;
  secondaryType: PersonalityType;
  /** Edge length on desktop. Mobile uses ~70% of this via responsive
   *  CSS sizing on the wrapper. */
  size?: number;
}

const AXIS_ORDER: PersonalityType[] = [
  "psychopathic",
  "sociopathic",
  "narcissistic",
  "borderline",
  "histrionic",
  "neurotypical",
];

const AXIS_LABELS: Record<PersonalityType, string> = {
  psychopathic: "Predator",
  sociopathic: "Wildcard",
  narcissistic: "Emperor",
  borderline: "Storm",
  histrionic: "Siren",
  neurotypical: "Balanced",
};

/** Compute the (x, y) of a vertex at angle (radians) and radius. */
function point(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export default function DarkMirrorRadar({
  scores,
  dominantType,
  secondaryType,
  size = 420,
}: Props) {
  // Layout. Padding is generous to keep the labels inside the SVG.
  const padding = 64;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = (size - padding * 2) / 2;

  // 6 vertices spaced evenly around the circle, starting at the top.
  // -PI/2 puts vertex 0 at the top.
  const angles = AXIS_ORDER.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 6);

  // Concentric grid rings (25, 50, 75, 100 %).
  const ringRatios = [0.25, 0.5, 0.75, 1];

  // Score polygon vertices (mapped 0-100 → 0-maxR).
  const scoreVerts = AXIS_ORDER.map((axis, i) => {
    const r = (scores[axis] / 100) * maxR;
    return point(cx, cy, r, angles[i]);
  });

  // Outer hex vertices for the grid.
  const outerVerts = angles.map((a) => point(cx, cy, maxR, a));

  // Build the polygon path string.
  const scorePath =
    "M " +
    scoreVerts.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" L ") +
    " Z";

  return (
    <div className="relative inline-block w-full max-w-[420px] mx-auto">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Six-axis personality radar"
      >
        <defs>
          {/* Soft radial backdrop behind the hex */}
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.10)" />
            <stop offset="60%" stopColor="rgba(212,175,55,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Score polygon fill */}
          <radialGradient id="scoreFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.18)" />
          </radialGradient>
        </defs>

        {/* Backdrop */}
        <circle cx={cx} cy={cy} r={maxR + 12} fill="url(#radarBg)" />

        {/* Concentric rings */}
        {ringRatios.map((ratio) => {
          const verts = angles.map((a) => point(cx, cy, maxR * ratio, a));
          const path =
            "M " +
            verts.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" L ") +
            " Z";
          return (
            <path
              key={ratio}
              d={path}
              fill="none"
              stroke="rgba(212,175,55,0.13)"
              strokeWidth={1}
            />
          );
        })}

        {/* Spokes from center to each outer vertex */}
        {outerVerts.map((v, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={v.x}
            y2={v.y}
            stroke="rgba(212,175,55,0.10)"
            strokeWidth={1}
          />
        ))}

        {/* Score polygon, the wow */}
        <m.path
          d={scorePath}
          fill="url(#scoreFill)"
          stroke="rgba(212,175,55,0.85)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Score vertex markers */}
        {AXIS_ORDER.map((axis, i) => {
          const isDominant = axis === dominantType;
          const isSecondary = axis === secondaryType;
          const r = isDominant ? 6 : isSecondary ? 4.5 : 3;
          const fill = isDominant
            ? "#f3d98a"
            : isSecondary
              ? "rgba(212,175,55,0.85)"
              : "rgba(212,175,55,0.55)";
          return (
            <m.circle
              key={`${axis}-marker`}
              cx={scoreVerts[i].x}
              cy={scoreVerts[i].y}
              r={r}
              fill={fill}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7 + i * 0.06,
                duration: 0.4,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Dominant vertex pulse ring */}
        <m.circle
          cx={scoreVerts[AXIS_ORDER.indexOf(dominantType)].x}
          cy={scoreVerts[AXIS_ORDER.indexOf(dominantType)].y}
          r={6}
          fill="none"
          stroke="rgba(243,217,138,0.6)"
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.7, 0], scale: [1, 2.4, 2.8] }}
          transition={{
            delay: 1.4,
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeOut",
          }}
        />

        {/* Axis labels at outer vertices */}
        {outerVerts.map((v, i) => {
          const axis = AXIS_ORDER[i];
          const isDominant = axis === dominantType;
          const isSecondary = axis === secondaryType;
          const labelOffsetX = (v.x - cx) * 0.18;
          const labelOffsetY = (v.y - cy) * 0.18;
          return (
            <m.g
              key={`${axis}-label`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
            >
              <text
                x={v.x + labelOffsetX}
                y={v.y + labelOffsetY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isDominant ? 14 : 12}
                fontWeight={isDominant ? 600 : 400}
                fill={
                  isDominant
                    ? "#f3d98a"
                    : isSecondary
                      ? "rgba(212,175,55,0.9)"
                      : "rgba(214,207,196,0.75)"
                }
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {AXIS_LABELS[axis]}
              </text>
              <text
                x={v.x + labelOffsetX}
                y={v.y + labelOffsetY + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={500}
                fill={
                  isDominant
                    ? "#f3d98a"
                    : isSecondary
                      ? "rgba(212,175,55,0.85)"
                      : "rgba(214,207,196,0.55)"
                }
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {scores[axis]}%
              </text>
            </m.g>
          );
        })}
      </svg>
    </div>
  );
}
