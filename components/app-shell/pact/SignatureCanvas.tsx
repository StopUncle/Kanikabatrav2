"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { haptic } from "@/lib/haptics";
import type { SignatureStrokes } from "@/lib/pact/signature";

/**
 * The signing surface. A canvas the member draws their name onto with a
 * blood-red stroke: wet sheen while a stroke is live, settling darker as it
 * dries. Strokes are captured in 0..1 space so the signature can be drawn
 * back at any size later (the record, the break screen).
 *
 * Drawing is the interaction, so reduced-motion changes nothing here; the
 * hand moves, not the interface.
 */

const WET = "#b3293c";
const DRY = "#8c1f2f";

type Point = [number, number];

function drawStroke(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  w: number,
  h: number,
  color: string,
) {
  if (points.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2.2, w * 0.008);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0][0] * w, points[0][1] * h);
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    // Midpoint smoothing: raw pointer samples read as polylines, and a
    // signature has no straight lines in it.
    ctx.quadraticCurveTo(
      px * w,
      py * h,
      ((px + x) / 2) * w,
      ((py + y) / 2) * h,
    );
  }
  const last = points[points.length - 1];
  ctx.lineTo(last[0] * w, last[1] * h);
  ctx.stroke();
}

export default function SignatureCanvas({
  onChange,
}: {
  onChange: (strokes: SignatureStrokes) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Point[][]>([]);
  const liveRef = useRef<Point[] | null>(null);
  const [hasInk, setHasInk] = useState(false);

  const repaint = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    for (const stroke of strokesRef.current) {
      ctx.shadowColor = "rgba(140, 31, 47, 0.35)";
      ctx.shadowBlur = 4;
      drawStroke(ctx, stroke, w, h, DRY);
    }
    if (liveRef.current) {
      ctx.shadowColor = "rgba(179, 41, 60, 0.6)";
      ctx.shadowBlur = 7;
      drawStroke(ctx, liveRef.current, w, h, WET);
    }
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      repaint();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [repaint]);

  const pointFrom = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return [
      Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    ];
  };

  const commit = () => {
    onChange(strokesRef.current.map((s) => s.map((p) => [...p] as number[])));
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="h-[180px] w-full touch-none rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)]"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          liveRef.current = [pointFrom(e)];
          repaint();
        }}
        onPointerMove={(e) => {
          if (!liveRef.current) return;
          liveRef.current.push(pointFrom(e));
          repaint();
        }}
        onPointerUp={() => {
          if (!liveRef.current) return;
          if (liveRef.current.length > 1) {
            strokesRef.current.push(liveRef.current);
            setHasInk(true);
            haptic("tick");
            commit();
          }
          liveRef.current = null;
          repaint();
        }}
        onPointerCancel={() => {
          liveRef.current = null;
          repaint();
        }}
        aria-label="Sign with your finger"
      />
      {!hasInk && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-app-caption uppercase tracking-app-label text-[var(--app-dim)]">
          Sign here
        </p>
      )}
      {hasInk && (
        <button
          type="button"
          onClick={() => {
            strokesRef.current = [];
            liveRef.current = null;
            setHasInk(false);
            commit();
            repaint();
          }}
          className="absolute right-3 top-3 text-app-micro uppercase tracking-app-label text-[var(--app-dim)]"
        >
          Clear
        </button>
      )}
    </div>
  );
}
