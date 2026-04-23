"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has `prefers-reduced-motion: reduce`
 * set at the OS/browser level. Components can branch on this to skip
 * looping animations, full-screen flashes, shakes, and easing curves
 * that cause vestibular discomfort.
 *
 * SSR returns `false` on first render and resolves on mount — components
 * should still gate animations with this even if they're initially
 * animating, so the second frame quiets down.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
