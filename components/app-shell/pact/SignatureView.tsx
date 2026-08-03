"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Draws a stored signature back. Read-only twin of SignatureCanvas: same
 * 0..1 stroke space, no interaction, used on the record, the seal, and
 * the break screen so the member faces their own name.
 *
 * With `animate`, the strokes replay in real time: wet blood while the
 * hand moves, drying to the dried tone once it stops. The replay budget
 * is fixed and split across strokes by path length, so a long flourish
 * and a short initial both finish together-ish and nothing drags.
 */

const WET = [179, 41, 60] as const;
const DRY = [140, 31, 47] as const;
const WET_CSS = `rgb(${WET[0]}, ${WET[1]}, ${WET[2]})`;
const DRAW_MS = 1400;
const DRY_MS = 700;

function lerpColor(a: readonly number[], b: readonly number[], t: number) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function strokeLength(stroke: number[][]) {
  let len = 0;
  for (let i = 1; i < stroke.length; i++) {
    len += Math.hypot(
      stroke[i][0] - stroke[i - 1][0],
      stroke[i][1] - stroke[i - 1][1],
    );
  }
  return len;
}

/** Draw strokes up to a length budget (in 0..1 space). Infinity = all. */
function draw(
  ctx: CanvasRenderingContext2D,
  strokes: number[][][],
  w: number,
  h: number,
  color: string,
  budget: number,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.8, w * 0.008);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  let remaining = budget;
  for (const stroke of strokes) {
    if (!Array.isArray(stroke) || stroke.length === 0 || remaining <= 0) break;
    const len = strokeLength(stroke);
    ctx.beginPath();
    ctx.moveTo(stroke[0][0] * w, stroke[0][1] * h);
    if (len <= remaining) {
      for (let i = 1; i < stroke.length; i++) {
        const [px, py] = stroke[i - 1];
        const [x, y] = stroke[i];
        ctx.quadraticCurveTo(px * w, py * h, ((px + x) / 2) * w, ((py + y) / 2) * h);
      }
      const last = stroke[stroke.length - 1];
      ctx.lineTo(last[0] * w, last[1] * h);
      remaining -= len;
    } else {
      let spent = 0;
      for (let i = 1; i < stroke.length; i++) {
        const seg = Math.hypot(
          stroke[i][0] - stroke[i - 1][0],
          stroke[i][1] - stroke[i - 1][1],
        );
        if (spent + seg <= remaining) {
          ctx.lineTo(stroke[i][0] * w, stroke[i][1] * h);
          spent += seg;
        } else {
          const t = seg > 0 ? (remaining - spent) / seg : 0;
          ctx.lineTo(
            (stroke[i - 1][0] + (stroke[i][0] - stroke[i - 1][0]) * t) * w,
            (stroke[i - 1][1] + (stroke[i][1] - stroke[i - 1][1]) * t) * h,
          );
          break;
        }
      }
      remaining = 0;
    }
    ctx.stroke();
  }
}

export default function SignatureView({
  strokes,
  broken = false,
  animate = false,
  delayMs = 0,
  className = "",
}: {
  strokes: number[][][];
  /** A broken pact's signature renders faded, not erased. */
  broken?: boolean;
  /** Replay the strokes wet, then dry. Ignored for broken signatures. */
  animate?: boolean;
  /** Hold before the replay starts, e.g. to match a ceremony beat. */
  delayMs?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const w = canvas.width;
    const h = canvas.height;

    const finalColor = broken ? "rgba(86, 20, 31, 0.55)" : "#8c1f2f";
    const total = strokes.reduce(
      (sum, s) => sum + (Array.isArray(s) ? strokeLength(s) : 0),
      0,
    );

    if (!animate || broken || reducedMotion || total <= 0) {
      draw(ctx, strokes, w, h, finalColor, Infinity);
      return;
    }

    let raf = 0;
    let start = 0;
    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      if (t <= DRAW_MS) {
        const eased = 1 - Math.pow(1 - t / DRAW_MS, 2);
        draw(ctx, strokes, w, h, WET_CSS, total * eased);
        raf = window.requestAnimationFrame(frame);
      } else if (t <= DRAW_MS + DRY_MS) {
        const dry = (t - DRAW_MS) / DRY_MS;
        draw(ctx, strokes, w, h, lerpColor(WET, DRY, dry), Infinity);
        raf = window.requestAnimationFrame(frame);
      } else {
        draw(ctx, strokes, w, h, finalColor, Infinity);
      }
    };
    const timer = window.setTimeout(() => {
      raf = window.requestAnimationFrame(frame);
    }, delayMs);
    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(raf);
    };
  }, [strokes, broken, animate, reducedMotion, delayMs]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-[90px] w-full ${className}`}
      aria-hidden
    />
  );
}
