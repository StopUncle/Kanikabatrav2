"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * CountUp — animates a metric from zero to its final value the first time
 * it scrolls into view.
 *
 * Takes the already-formatted marketing string ("670K+", "37M+", "5.9M+",
 * "1.59%") and animates only the numeric part, preserving whatever suffix
 * the copy uses. That way the constants stay the single source of truth
 * and nobody has to hand-feed raw integers.
 *
 * SSR renders the final value (good for no-JS and crawlers); the count is
 * a pure progressive enhancement and is skipped entirely under reduced
 * motion.
 */
interface CountUpProps {
  /** A formatted value such as "670K+", "37M+", "238K", or "1.59%". */
  value: string;
  className?: string;
  durationMs?: number;
}

export default function CountUp({
  value,
  className,
  durationMs = 1400,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  const match = value.match(/^([\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".")
    ? match[1].split(".")[1].length
    : 0;

  useEffect(() => {
    if (reduce || Number.isNaN(target) || !inView || started.current) return;
    started.current = true;

    let raf = 0;
    let startTime = 0;
    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        setDisplay((target * eased).toFixed(decimals) + suffix);
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, suffix, decimals, durationMs, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
