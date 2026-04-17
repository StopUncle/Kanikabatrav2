"use client";

import { useMemo } from "react";
import { m } from "framer-motion";
import type { MoodType } from "@/lib/simulator/types";

const GRADIENTS: Record<string, string> = {
  peaceful:
    "radial-gradient(ellipse at 40% 30%, rgba(212,175,55,0.1), transparent 65%), radial-gradient(ellipse at 70% 80%, rgba(60,50,60,0.35), transparent 60%)",
  party:
    "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(114,33,57,0.3), transparent 55%)",
  danger:
    "radial-gradient(ellipse at 50% 25%, rgba(180,30,60,0.2), transparent 65%), radial-gradient(ellipse at 70% 80%, rgba(40,10,20,0.8), transparent 60%)",
  romantic:
    "radial-gradient(ellipse at 40% 40%, rgba(212,100,130,0.12), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(100,40,60,0.3), transparent 55%)",
  tense:
    "radial-gradient(ellipse at 40% 40%, rgba(200,100,60,0.1), transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(30,20,30,0.7), transparent 60%)",
  cold:
    "radial-gradient(ellipse at 40% 40%, rgba(120,170,220,0.08), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(20,30,50,0.7), transparent 60%)",
  mysterious:
    "radial-gradient(ellipse at 50% 40%, rgba(100,70,160,0.08), transparent 65%), radial-gradient(ellipse at 70% 80%, rgba(20,10,30,0.8), transparent 60%)",
  professional:
    "radial-gradient(ellipse at 40% 30%, rgba(200,200,210,0.06), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(40,45,55,0.5), transparent 60%)",
  neutral:
    "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07), transparent 70%)",
};

/**
 * Ambient mood backdrop. Mood-driven gradient + drifting gold particles.
 * Deterministic particle positions so SSR/CSR render identically (no
 * hydration mismatch when we eventually move this behind a server component).
 */
export default function MoodBackground({ mood }: { mood?: MoodType }) {
  const gradient = GRADIENTS[mood || "neutral"] || GRADIENTS.neutral;

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        delay: (i % 8) * 0.4,
        size: 1 + (i % 3) * 0.6,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: gradient }}
      />
      {particles.map((p, i) => (
        <m.span
          key={i}
          className="absolute rounded-full bg-accent-gold/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: 6 + (i % 4),
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
