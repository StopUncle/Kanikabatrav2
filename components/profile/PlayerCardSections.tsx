"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * The public player card's animated sections. Marketing-site palette on
 * purpose: /u/[handle] renders outside the app shell, so the app's
 * --app-* tokens do not exist here.
 *
 * Everything arrives serialized from the server page; nothing here
 * fetches. The card is a flex: it shows what the member has built,
 * never what still gets past them (blind spots stay private to the
 * member's own Mark page).
 */

export interface PlayerStats {
  ringName: string | null;
  memberSince: string;
  simulatorXp: number;
  starsEarned: number;
  scenariosCleared: number;
  gauntletClears: number;
  badges: number;
  streakDays: number;
}

export interface PublicMark {
  pct: number;
  band: string;
  tacticsTested: number;
  tacticsTotal: number;
  operatorsTested: number;
  operatorsTotal: number;
  sharpestAgainst: string[];
}

export interface TrackProgress {
  label: string;
  completed: number;
  total: number;
}

function useCountUp(target: number, enabled: boolean): number {
  const [value, setValue] = useState(enabled ? 0 : target);
  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    const started = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled]);
  return value;
}

function StatTile({
  label,
  value,
  accent,
  index,
  animate,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
  index: number;
  animate: boolean;
}) {
  const numeric = typeof value === "number";
  const counted = useCountUp(numeric ? (value as number) : 0, animate && numeric);
  return (
    <m.div
      className="rounded-xl border border-gray-800 bg-deep-black/60 px-4 py-4 text-center"
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.45 }}
    >
      <p
        className={`text-2xl font-extralight tabular-nums ${
          accent ? "text-accent-gold" : "text-text-light"
        }`}
      >
        {numeric ? counted.toLocaleString() : value}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-text-gray/70">
        {label}
      </p>
    </m.div>
  );
}

export function StatTiles({ stats }: { stats: PlayerStats }) {
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion;
  const tiles: { label: string; value: number | string; accent?: boolean }[] = [
    { label: "Simulator XP", value: stats.simulatorXp, accent: true },
    { label: "Stars", value: stats.starsEarned },
    { label: "Scenarios cleared", value: stats.scenariosCleared },
    { label: "Gauntlet clears", value: stats.gauntletClears },
    { label: "Badges", value: stats.badges },
    { label: "Day streak", value: stats.streakDays },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tiles.map((t, i) => (
        <StatTile
          key={t.label}
          label={t.label}
          value={t.value}
          accent={t.accent}
          index={i}
          animate={animate}
        />
      ))}
    </div>
  );
}

function bandColor(pct: number): string {
  if (pct < 60) return "#b76e79";
  if (pct < 80) return "rgba(212,175,55,0.75)";
  return "#d4af37";
}

export function PublicMarkPanel({ mark }: { mark: PublicMark }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 sm:p-6">
      <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
        The Mark
      </p>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-extralight tabular-nums text-text-light">
          {mark.pct}
          <span className="text-xl text-text-gray">%</span>
        </span>
        <span
          className="text-sm uppercase tracking-[0.3em]"
          style={{ color: bandColor(mark.pct) }}
        >
          {mark.band}
        </span>
      </div>
      <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <m.div
          className="h-full rounded-full"
          style={{ background: bandColor(mark.pct) }}
          initial={reducedMotion ? false : { width: 0 }}
          animate={{ width: `${Math.max(3, mark.pct)}%` }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <p className="mt-3 text-xs text-text-gray">
        Catch rate under live manipulation · tested across {mark.tacticsTested}{" "}
        of {mark.tacticsTotal} tactics, {mark.operatorsTested} of{" "}
        {mark.operatorsTotal} operator types
      </p>
      {mark.sharpestAgainst.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-text-gray/70">
            Sharpest against
          </span>
          {mark.sharpestAgainst.map((label) => (
            <span
              key={label}
              className="rounded-full border border-accent-gold/40 bg-accent-gold/[0.07] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent-gold"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrackBars({ tracks }: { tracks: TrackProgress[] }) {
  const reducedMotion = useReducedMotion();
  if (tracks.length === 0) return null;
  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 sm:p-6">
      <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
        The climb
      </p>
      <div className="flex flex-col gap-4">
        {tracks.map((t, i) => {
          const pct = t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;
          return (
            <div key={t.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="text-sm font-light text-text-light">{t.label}</p>
                <p className="text-xs tabular-nums text-text-gray">
                  {t.completed} / {t.total}
                </p>
              </div>
              <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <m.div
                  className="h-full rounded-full bg-accent-gold"
                  initial={reducedMotion ? false : { width: 0 }}
                  animate={{ width: `${Math.max(2, pct)}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
