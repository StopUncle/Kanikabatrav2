"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * The one big moment: gold embers lifting off a ring shockwave.
 *
 * Canvas rather than DOM nodes. Thirty-odd individually transformed elements
 * is thirty-odd compositor layers on a mid-range Android; a canvas is one.
 * The shockwave is stroked inside the same animation loop for the same reason.
 *
 * Deliberately not confetti. Embers rise and cool from gold to rose, which
 * belongs to the brand in a way falling coloured paper never would.
 */

const GOLD = { r: 212, g: 175, b: 55 };
const ROSE = { r: 183, g: 110, b: 121 };

/** Hard stop, whatever the particles are doing. */
const MAX_RUN_MS = 1600;
const SHOCKWAVE_MS = 700;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  ttl: number;
  radius: number;
}

export interface EmberBurstProps {
  active: boolean;
  /** Particle count before the low-memory halving. Default 34. */
  count?: number;
  /** Canvas edge in CSS pixels. Default 280. */
  size?: number;
  onDone?: () => void;
  className?: string;
}

function lerpChannel(from: number, to: number, t: number): number {
  return Math.round(from + (to - from) * t);
}

export default function EmberBurst({
  active,
  count = 34,
  size = 280,
  onDone,
  className = "",
}: EmberBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Kept in a ref so a re-render mid-burst cannot restart or orphan the loop.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Capping DPR at 2 keeps the pixel budget sane on 3x phones, where the
    // extra density buys nothing for soft glowing dots.
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.scale(dpr, dpr);

    // `deviceMemory` is Chromium-only; absent means "assume it is fine".
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const total = memory !== undefined && memory <= 4 ? Math.round(count / 2) : count;

    const cx = size / 2;
    const cy = size / 2;
    const start = performance.now();

    const particles: Particle[] = Array.from({ length: total }, () => {
      const angle = Math.random() * Math.PI * 2;
      // Biased sideways and up: a flat disc of sparks reads as an explosion,
      // a tall one reads as heat.
      const speed = 40 + Math.random() * 110;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.75 - 30,
        born: Math.random() * 90,
        ttl: 700 + Math.random() * 700,
        radius: 1 + Math.random() * 1.5,
      };
    });

    let frame = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      ctx.clearRect(0, 0, size, size);
      onDoneRef.current?.();
    };

    const draw = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = "lighter";

      // Shockwave: one expanding hairline, gone before the embers are.
      if (elapsed < SHOCKWAVE_MS) {
        const t = elapsed / SHOCKWAVE_MS;
        const eased = 1 - Math.pow(1 - t, 3);
        ctx.beginPath();
        ctx.arc(cx, cy, 8 + eased * (size * 0.42), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,175,55,${(1 - t) * 0.45})`;
        ctx.lineWidth = 1.5 * (1 - t) + 0.4;
        ctx.stroke();
      }

      let alive = false;
      for (const p of particles) {
        const age = elapsed - p.born;
        if (age < 0) {
          alive = true;
          continue;
        }
        if (age > p.ttl) continue;
        alive = true;

        const t = age / p.ttl;
        const seconds = age / 1000;
        // Buoyancy, not gravity: embers lift and drift as they cool.
        const x = p.x + p.vx * seconds;
        const y = p.y + p.vy * seconds - 26 * seconds * seconds * 10;

        const fade = 1 - t * t;
        ctx.beginPath();
        ctx.arc(x, y, p.radius * (1 - t * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lerpChannel(GOLD.r, ROSE.r, t)},${lerpChannel(
          GOLD.g,
          ROSE.g,
          t,
        )},${lerpChannel(GOLD.b, ROSE.b, t)},${fade})`;
        ctx.fill();
      }

      if (!alive || elapsed > MAX_RUN_MS) {
        finish();
        return;
      }
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      finished = true;
    };
  }, [active, reducedMotion, size, count]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
