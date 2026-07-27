"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * One ring to replace the three hand-rolled ones (RankChip, the You page,
 * RingStrip). Draws itself in on mount, then transitions on any later change.
 *
 * The arc animates `stroke-dashoffset`, which is not a composited property.
 * There is no transform equivalent for "draw an arc", and one small SVG path
 * is cheap enough that this is the right trade. Everything else in the juice
 * layer stays on transform and opacity.
 */

export interface ProgressRingProps {
  /** 0 to 1. Clamped, so callers can pass raw ratios. */
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  /** Animate the arc in on mount. Default true. */
  draw?: boolean;
  /** Hold before drawing, for staggering. Default 0. */
  delayMs?: number;
  durationMs?: number;
  /**
   * Accessible name. Omit for a ring that only decorates a value already
   * written in text next to it, and it will be hidden from screen readers.
   */
  label?: string;
  /** Centred content, e.g. an emblem or a count. */
  children?: React.ReactNode;
  className?: string;
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function ProgressRing({
  value,
  size = 44,
  strokeWidth = 3,
  color = "var(--app-gold)",
  trackColor = "rgba(212,175,55,0.15)",
  draw = true,
  delayMs = 0,
  durationMs = 900,
  label,
  children,
  className = "",
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  const finalOffset = circumference * (1 - clamped);

  // Server and first client render both emit the settled arc, so the ring is
  // correct with JavaScript disabled and there is no hydration mismatch.
  const [offset, setOffset] = useState(finalOffset);
  const [transition, setTransition] = useState(false);
  const hasDrawn = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Later value changes just glide to the new position.
    if (hasDrawn.current) {
      setTransition(!reducedMotion);
      setOffset(finalOffset);
      return;
    }
    hasDrawn.current = true;

    if (!draw || reducedMotion) {
      setOffset(finalOffset);
      return;
    }

    // Snap to empty with no transition, then release on a later frame so the
    // browser has actually painted the start state and animates the change.
    setTransition(false);
    setOffset(circumference);

    let outer = 0;
    let inner = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const release = () => {
      timer = null;
      outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(() => {
          setTransition(true);
          setOffset(finalOffset);
        });
      });
    };

    if (delayMs > 0) timer = setTimeout(release, delayMs);
    else release();

    return () => {
      if (timer !== null) clearTimeout(timer);
      if (outer) window.cancelAnimationFrame(outer);
      if (inner) window.cancelAnimationFrame(inner);
    };
  }, [finalOffset, circumference, draw, delayMs, reducedMotion]);

  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="-rotate-90"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={
            transition
              ? {
                  transition: `stroke-dashoffset ${durationMs}ms cubic-bezier(0.22, 0.9, 0.3, 1)`,
                }
              : undefined
          }
        />
      </svg>
      {children != null && (
        <span className="absolute inset-0 flex items-center justify-center">
          {children}
        </span>
      )}
    </span>
  );
}
