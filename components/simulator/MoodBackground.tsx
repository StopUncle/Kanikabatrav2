"use client";

import { useMemo } from "react";
import { m } from "framer-motion";
import type { MoodType } from "@/lib/simulator/types";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Mood-keyed particle motion. Peaceful scenes drift slowly; danger
 * scenes move faster and further with chaotic easing; cold scenes
 * add lateral drift. Previously every mood shared one config, which
 * flattened the visual language into gradient-only differentiation.
 */
type MoodParticleConfig = {
  yRange: [number, number];
  xRange: [number, number];
  durationBase: number;
  durationSpread: number;
  ease: "easeInOut" | "easeIn" | "easeOut" | "linear";
};
const PARTICLE_CONFIGS: Record<string, MoodParticleConfig> = {
  peaceful: { yRange: [0, -30], xRange: [0, 0], durationBase: 9, durationSpread: 3, ease: "easeInOut" },
  party: { yRange: [0, -55], xRange: [-6, 6], durationBase: 5, durationSpread: 2, ease: "easeInOut" },
  danger: { yRange: [0, -90], xRange: [-4, 4], durationBase: 4, durationSpread: 2, ease: "easeIn" },
  romantic: { yRange: [0, -35], xRange: [-3, 3], durationBase: 8, durationSpread: 3, ease: "easeInOut" },
  tense: { yRange: [0, -60], xRange: [-2, 2], durationBase: 5, durationSpread: 2, ease: "easeIn" },
  cold: { yRange: [0, -45], xRange: [-14, 14], durationBase: 7, durationSpread: 2, ease: "linear" },
  mysterious: { yRange: [0, -50], xRange: [-8, 8], durationBase: 8, durationSpread: 3, ease: "easeInOut" },
  professional: { yRange: [0, -30], xRange: [0, 0], durationBase: 10, durationSpread: 2, ease: "linear" },
  neutral: { yRange: [0, -40], xRange: [0, 0], durationBase: 7, durationSpread: 3, ease: "easeInOut" },
};

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
  const particleCfg = PARTICLE_CONFIGS[mood || "neutral"] || PARTICLE_CONFIGS.neutral;
  const reduceMotion = useReducedMotion();

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
      {!reduceMotion &&
        particles.map((p, i) => (
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
              y: [particleCfg.yRange[0], (particleCfg.yRange[0] + particleCfg.yRange[1]) / 2, particleCfg.yRange[1]],
              x: [particleCfg.xRange[0], particleCfg.xRange[1], particleCfg.xRange[0]],
            }}
            transition={{
              duration: particleCfg.durationBase + (i % 4) * (particleCfg.durationSpread / 4),
              delay: p.delay,
              repeat: Infinity,
              ease: particleCfg.ease,
            }}
          />
        ))}
    </div>
  );
}
