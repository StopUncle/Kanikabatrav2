"use client";

import { AXIS_KEYS, AXIS_LABELS, type InstinctAxis } from "@/lib/tells/types";

export interface ScoreMap {
  read: number;
  spot: number;
  reply: number;
  refuse: number;
  calibrate: number;
  hold: number;
}

/**
 * Six-axis instinct hexagon, the score visualization on member surfaces.
 *
 * Axes are placed clockwise starting from straight up. Ratings are
 * normalised against a fixed range (800-2200) so the hex grows visibly
 * as the user improves without ever flat-lining at the edge.
 *
 * Pure SVG, no chart library. Looks crisp on retina, animates via
 * default browser SVG transition behaviour. Minimal axes, the
 * typography does the work.
 */
export default function InstinctsHex({
  score,
  size = 320,
  showLabels = true,
}: {
  score: ScoreMap;
  size?: number;
  showLabels?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const labelRadius = size * 0.46;

  const min = 800;
  const max = 2200;

  function norm(value: number): number {
    const clamped = Math.max(min, Math.min(max, value));
    return (clamped - min) / (max - min);
  }

  function axisValue(axis: InstinctAxis): number {
    switch (axis) {
      case "READ":
        return score.read;
      case "SPOT":
        return score.spot;
      case "REPLY":
        return score.reply;
      case "REFUSE":
        return score.refuse;
      case "CALIBRATE":
        return score.calibrate;
      case "HOLD":
        return score.hold;
    }
  }

  // Coordinates of each axis tip at full-rating.
  function axisTip(i: number, r: number) {
    const angle = (Math.PI * 2 * i) / AXIS_KEYS.length - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  }

  const polygon = AXIS_KEYS.map((axis, i) => {
    const tip = axisTip(i, radius * norm(axisValue(axis)));
    return `${tip.x.toFixed(1)},${tip.y.toFixed(1)}`;
  }).join(" ");

  // Three concentric ring guides.
  const ringRatios = [0.33, 0.66, 1];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Your instinct hexagon"
      className="overflow-visible"
    >
      {/* Background rings */}
      {ringRatios.map((ratio) => (
        <polygon
          key={ratio}
          points={AXIS_KEYS.map((_, i) => {
            const tip = axisTip(i, radius * ratio);
            return `${tip.x.toFixed(1)},${tip.y.toFixed(1)}`;
          }).join(" ")}
          fill="none"
          stroke="rgb(120 120 130 / 0.15)"
          strokeWidth={1}
        />
      ))}

      {/* Spokes */}
      {AXIS_KEYS.map((_, i) => {
        const tip = axisTip(i, radius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={tip.x}
            y2={tip.y}
            stroke="rgb(120 120 130 / 0.12)"
            strokeWidth={1}
          />
        );
      })}

      {/* Filled hex */}
      <polygon
        points={polygon}
        fill="rgb(183 110 121 / 0.18)"
        stroke="rgb(183 110 121 / 0.85)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        style={{ transition: "all 700ms cubic-bezier(0.2, 0.7, 0.2, 1)" }}
      />

      {/* Axis vertices */}
      {AXIS_KEYS.map((axis, i) => {
        const tip = axisTip(i, radius * norm(axisValue(axis)));
        return (
          <circle
            key={`v-${axis}`}
            cx={tip.x}
            cy={tip.y}
            r={3}
            fill="rgb(183 110 121)"
            style={{ transition: "all 700ms cubic-bezier(0.2, 0.7, 0.2, 1)" }}
          />
        );
      })}

      {/* Labels */}
      {showLabels &&
        AXIS_KEYS.map((axis, i) => {
          const lt = axisTip(i, labelRadius);
          const value = axisValue(axis);
          return (
            <g key={`lbl-${axis}`}>
              <text
                x={lt.x}
                y={lt.y - 4}
                textAnchor="middle"
                className="fill-text-light"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                {AXIS_LABELS[axis]}
              </text>
              <text
                x={lt.x}
                y={lt.y + 9}
                textAnchor="middle"
                className="fill-accent-gold"
                style={{ fontSize: 13, fontWeight: 300 }}
              >
                {value}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
