"use client";

/**
 * AchievementToast — mid-scenario / end-of-run unlock notifications.
 *
 * Takes a list of achievement slugs that just unlocked and displays them
 * one-at-a-time in the top-right corner. Queue-safe (multi-unlock runs
 * don't overlap), reduced-motion aware (no slides, instant swap),
 * and compact — one hex medallion + a short name + rarity pill.
 *
 * The shelf on /consilium/profile is the permanent record. This is the
 * ephemeral "you just earned it" moment, nothing more.
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  Award,
  Crown,
  Eye,
  Flame,
  Shield,
  Sparkles,
  Star,
  Skull,
} from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import {
  getAchievementMeta,
  type AchievementMeta,
  type AchievementRarity,
} from "@/lib/simulator/achievements";
import type { SimulatorBadgeDef } from "@/lib/simulator/badges";

type RarityPalette = {
  light: string;
  mid: string;
  dark: string;
  rim: string;
  glow: string;
  /** Small uppercase label shown in the toast rarity pill. */
  label: string;
  /** Pill text color — ensures it's legible on the toast's dark bg. */
  pill: string;
};

const RARITY_COLORS: Record<AchievementRarity, RarityPalette> = {
  bronze:   { light: "#c79670", mid: "#8B5A3C", dark: "#4a2e1d", rim: "#722139", glow: "rgba(139,90,60,0.55)", label: "Bronze",   pill: "#d4af37" },
  silver:   { light: "#d4d6e0", mid: "#8d8f9e", dark: "#3e4049", rim: "#2a2b33", glow: "rgba(141,143,158,0.5)", label: "Silver",   pill: "#d4d6e0" },
  gold:     { light: "#e8c877", mid: "#a27a1d", dark: "#5a4310", rim: "#4d2818", glow: "rgba(162,122,29,0.6)",  label: "Gold",     pill: "#e8c877" },
  obsidian: { light: "#4a3f55", mid: "#1e1825", dark: "#05030a", rim: "#5a2238", glow: "rgba(90,34,56,0.7)",    label: "Obsidian", pill: "#e6c8f0" },
};

function iconFor(name: SimulatorBadgeDef["icon"], color: string) {
  const props = { size: 22, strokeWidth: 1.5, color } as const;
  switch (name) {
    case "shield":   return <Shield {...props} />;
    case "crown":    return <Crown {...props} />;
    case "eye":      return <Eye {...props} />;
    case "sparkles": return <Sparkles {...props} />;
    case "flame":    return <Flame {...props} />;
    case "skull":    return <Skull {...props} />;
    case "award":    return <Award {...props} />;
    case "star":
    default:         return <Star {...props} />;
  }
}

type AchievementToastProps = {
  /**
   * Slugs of newly-earned achievements from the current run. Component
   * resolves them to AchievementMeta internally. Passing the same list
   * twice in a row will replay the toasts; parent should feed new
   * references only for actually-new unlocks.
   */
  unlocks: string[];
  /** Ms each toast stays on screen. Default 3800. */
  durationMs?: number;
};

export default function AchievementToast({
  unlocks,
  durationMs = 3800,
}: AchievementToastProps) {
  const reduceMotion = useReducedMotion();

  // Resolve once per unlocks-list identity. We dedupe so the same slug
  // doesn't double-pop if the parent rerenders with a stable array.
  const queue = useMemo<AchievementMeta[]>(() => {
    const seen = new Set<string>();
    const out: AchievementMeta[] = [];
    for (const slug of unlocks) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push(getAchievementMeta(slug));
    }
    return out;
  }, [unlocks]);

  const [index, setIndex] = useState(0);

  // Reset index when the queue itself changes.
  useEffect(() => {
    setIndex(0);
  }, [queue]);

  // Auto-advance.
  useEffect(() => {
    if (index >= queue.length) return;
    const t = window.setTimeout(
      () => setIndex((i) => i + 1),
      durationMs,
    );
    return () => window.clearTimeout(t);
  }, [index, queue.length, durationMs]);

  const current = queue[index];
  if (!current) return null;

  const palette = RARITY_COLORS[current.rarity];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed top-6 right-6 z-[100] flex flex-col items-end gap-3"
    >
      <AnimatePresence mode="wait">
        <m.div
          key={current.slug}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: 40, scale: 0.9 }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, x: 0, scale: 1 }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: 20, scale: 0.95 }
          }
          transition={{
            duration: reduceMotion ? 0.12 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-auto flex max-w-[320px] items-center gap-3 rounded-xl border border-accent-burgundy/40 bg-deep-black/95 p-3 pr-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)] backdrop-blur-sm"
        >
          <div className="relative shrink-0">
            <svg viewBox="0 0 100 115" width={52} height={60} aria-hidden>
              <defs>
                <linearGradient id={`toast-${current.slug}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.light} />
                  <stop offset="55%" stopColor={palette.mid} />
                  <stop offset="100%" stopColor={palette.dark} />
                </linearGradient>
              </defs>
              <polygon
                points="50,2 96,28 96,86 50,112 4,86 4,28"
                fill={`url(#toast-${current.slug})`}
                stroke={palette.rim}
                strokeWidth="1.5"
              />
              <polygon
                points="50,10 88,32 88,84 50,105 12,84 12,32"
                fill="none"
                stroke={palette.rim}
                strokeWidth="0.7"
                opacity="0.6"
              />
              <foreignObject x="32" y="40" width="36" height="36">
                <div
                  style={{ width: 36, height: 36 }}
                  className="flex items-center justify-center"
                >
                  {iconFor(current.icon, palette.light)}
                </div>
              </foreignObject>
            </svg>
            {/* Rarity glow behind */}
            {!reduceMotion && (
              <div
                className="pointer-events-none absolute inset-0 -z-10 blur-xl"
                style={{ background: palette.glow }}
                aria-hidden
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="text-[9px] uppercase tracking-[0.3em] mb-0.5"
              style={{ color: palette.pill }}
            >
              Achievement · {palette.label}
            </p>
            <p className="text-sm font-light text-text-light leading-tight">
              {current.name}
            </p>
            <p className="mt-1 text-[11px] text-text-gray/70 leading-snug line-clamp-2">
              {current.description}
            </p>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
