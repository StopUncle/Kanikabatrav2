"use client";

import { useEffect, useRef } from "react";

/**
 * Draws a stored signature back, dried. Read-only twin of SignatureCanvas:
 * same 0..1 stroke space, no interaction, used on the record and the break
 * screen so the member faces their own name.
 */
export default function SignatureView({
  strokes,
  broken = false,
  className = "",
}: {
  strokes: number[][][];
  /** A broken pact's signature renders faded, not erased. */
  broken?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = broken ? "rgba(86, 20, 31, 0.55)" : "#8c1f2f";
    ctx.lineWidth = Math.max(1.8, w * 0.008);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokes) {
      if (!Array.isArray(stroke) || stroke.length === 0) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0] * w, stroke[0][1] * h);
      for (let i = 1; i < stroke.length; i++) {
        const [px, py] = stroke[i - 1];
        const [x, y] = stroke[i];
        ctx.quadraticCurveTo(
          px * w,
          py * h,
          ((px + x) / 2) * w,
          ((py + y) / 2) * h,
        );
      }
      const last = stroke[stroke.length - 1];
      ctx.lineTo(last[0] * w, last[1] * h);
      ctx.stroke();
    }
  }, [strokes, broken]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-[90px] w-full ${className}`}
      aria-hidden
    />
  );
}
