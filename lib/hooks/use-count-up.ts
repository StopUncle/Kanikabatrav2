"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Numbers that arrive rather than appear.
 *
 * Driven by requestAnimationFrame, not setInterval, so the tick lines up with
 * the browser's paint instead of fighting it. The server (and the first client
 * render) emits the final value, so the markup is correct before any script
 * runs and there is no hydration mismatch. The animation only starts once
 * mounted, and reduced motion skips it entirely.
 */

/** Fast out of the gate, long settle. Reads as "counting up", not "sliding". */
export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export interface CountUpOptions {
  /** Total run time. Default 900ms. */
  durationMs?: number;
  /** Value to count from. Default 0. */
  startAt?: number;
  /** Hold before starting, for staggering a row of tiles. Default 0. */
  delayMs?: number;
  /** Default easeOutExpo. */
  easing?: (t: number) => number;
  /** Set false to snap straight to the target. Default true. */
  enabled?: boolean;
  /** Decimal places to preserve while counting. Default 0. */
  decimals?: number;
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useCountUp(
  target: number,
  options: CountUpOptions = {},
): number {
  const {
    durationMs = 900,
    startAt = 0,
    delayMs = 0,
    easing = easeOutExpo,
    enabled = true,
    decimals = 0,
  } = options;

  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  // Latest-value refs so a re-render mid-flight does not restart the run.
  const easingRef = useRef(easing);
  easingRef.current = easing;

  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const skip = !enabled || reducedMotion || durationMs <= 0;
    if (skip || target === startAt) {
      setValue(target);
      return;
    }

    const round = (n: number) => {
      const factor = Math.pow(10, decimals);
      return Math.round(n * factor) / factor;
    };

    // Paint the start value in the same frame the effect runs, so the final
    // number never flashes before the count begins.
    setValue(round(startAt));

    const span = target - startAt;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      setValue(round(startAt + span * easingRef.current(t)));
      if (t < 1) {
        frameRef.current = window.requestAnimationFrame(step);
      } else {
        frameRef.current = null;
        setValue(target);
      }
    };

    const begin = () => {
      timeoutRef.current = null;
      frameRef.current = window.requestAnimationFrame(step);
    };

    if (delayMs > 0) {
      timeoutRef.current = setTimeout(begin, delayMs);
    } else {
      begin();
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [target, startAt, durationMs, delayMs, enabled, reducedMotion, decimals]);

  return value;
}
