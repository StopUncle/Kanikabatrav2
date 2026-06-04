"use client";

import { useEffect, useRef } from "react";

/**
 * HeroParticles — a quiet field of gold dust drifting up behind the hero.
 * Canvas, so it never touches the DOM tree React hydrates (drawn entirely
 * in an effect, no SSR, no mismatch). Density scales with area and is
 * capped; the loop pauses when the tab is hidden; and under reduced
 * motion it paints a single still frame instead of animating.
 *
 * Deliberately understated: small, sparse, slow. It should read as
 * atmosphere, not confetti.
 */
const GOLD = "212,175,55";

interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  base: number;
  phase: number;
}

export default function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let raf = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const count = Math.min(70, Math.max(18, Math.round((w * h) / 24000)));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.22 + 0.04),
        base: Math.random() * 0.4 + 0.18,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.shadowColor = `rgba(${GOLD},0.5)`;
      ctx.shadowBlur = 6;
      for (const m of motes) {
        const alpha = m.base * (0.55 + 0.45 * Math.sin(t * 0.0013 + m.phase));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},${Math.max(0, alpha).toFixed(3)})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const step = (t: number) => {
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -6) {
          m.y = h + 6;
          m.x = Math.random() * w;
        }
        if (m.x < -6) m.x = w + 6;
        else if (m.x > w + 6) m.x = -6;
      }
      paint(t);
      raf = requestAnimationFrame(step);
    };

    resize();
    seed();

    if (reduce) {
      paint(0);
      return;
    }

    raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      seed();
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(step);
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
