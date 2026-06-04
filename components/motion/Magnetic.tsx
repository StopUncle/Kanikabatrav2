"use client";

import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode, PointerEvent } from "react";

/**
 * Magnetic — a wrapper that lets its child drift a few pixels toward the
 * cursor on hover, then springs home on leave. Reserved for the primary
 * CTAs so the two flagship buttons feel alive without turning the page
 * into a fidget toy.
 *
 * Mouse-only by design: touch pointers and reduced-motion users get a
 * plain, static wrapper. The child must be inline-block / inline-flex for
 * the transform to take.
 */
interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset to follow. Default 0.35. */
  strength?: number;
}

export default function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
