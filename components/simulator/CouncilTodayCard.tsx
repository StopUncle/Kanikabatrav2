"use client";

/**
 * "The Council today" is shown on the ending screen only when the scenario
 * just completed IS today's shared Daily Mission. Everyone plays the same
 * mission each day; this is the compare moment that makes it social:
 * how many played, and how the outcomes split.
 *
 * Self-contained: fetches /api/simulator/mission-today after mount and
 * renders nothing unless (a) the response matches this scenario and
 * (b) at least 3 members played (a bar chart of one reads as a dead
 * room, which is worse than no chart). Fails silent on any error (the
 * public /try demo hits 401 here; that's expected and invisible).
 */
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Users } from "lucide-react";

interface CouncilStats {
  scenarioId: string;
  dateKey: string;
  playedToday: number;
  outcomes: { good: number; neutral: number; bad: number };
}

const MIN_PLAYERS = 3;

const SEGMENTS = [
  { key: "good", label: "Clean exit", bar: "bg-emerald-400/70", text: "text-emerald-300" },
  { key: "neutral", label: "Survived", bar: "bg-warm-gold/60", text: "text-warm-gold/90" },
  { key: "bad", label: "Burned", bar: "bg-red-400/60", text: "text-red-300/90" },
] as const;

export default function CouncilTodayCard({ scenarioId }: { scenarioId: string }) {
  const [stats, setStats] = useState<CouncilStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/simulator/mission-today")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CouncilStats | null) => {
        if (!cancelled && data && data.scenarioId === scenarioId) {
          setStats(data);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [scenarioId]);

  if (!stats || stats.playedToday < MIN_PLAYERS) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.4 }}
      className="mb-10 mx-auto max-w-sm rounded-xl border border-accent-gold/20 bg-deep-black/60 px-5 py-4 text-left"
    >
      <div className="flex items-center gap-2 mb-3">
        <Users size={13} strokeWidth={1.6} className="text-accent-gold/80" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/80">
          The Council today
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-text-gray/60 tabular-nums">
          {stats.playedToday} played
        </span>
      </div>
      <div className="space-y-2">
        {SEGMENTS.map(({ key, label, bar, text }) => {
          const count = stats.outcomes[key];
          const pct = Math.round((count / stats.playedToday) * 100);
          return (
            <div key={key} className="flex items-center gap-2.5">
              <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-text-gray/70">
                {label}
              </span>
              <span className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <m.span
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 2.7, ease: "easeOut" }}
                  className={`block h-full rounded-full ${bar}`}
                />
              </span>
              <span className={`w-9 shrink-0 text-right text-[11px] tabular-nums ${text}`}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </m.div>
  );
}
