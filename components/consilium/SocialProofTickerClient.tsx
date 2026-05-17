"use client";

import { useEffect, useState } from "react";

interface Stats {
  activeMembers: number;
  joinedThisWeek: number;
  voiceNotesThisMonth: number;
}

interface Props {
  className?: string;
}

/**
 * Client-side variant of SocialProofTicker. Use this on pages that are
 * already client-rendered (e.g. /quiz/results), where the server
 * component cannot be dropped in directly.
 *
 * Fetches /api/community/stats which shares the same 5-min cached
 * helper as the server ticker, so DB load is identical. Renders nothing
 * until data arrives so we never flash placeholder zeros that would
 * undercut the "live" framing.
 */
export default function SocialProofTickerClient({ className = "" }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/community/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Stats | null) => {
        if (!cancelled && data) setStats(data);
      })
      .catch(() => {
        // Silent fail. The ticker is decoration; never block the page on it.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  const lines: string[] = [];
  if (stats.activeMembers > 0) {
    lines.push(
      `${stats.activeMembers} active member${stats.activeMembers === 1 ? "" : "s"}`,
    );
  }
  if (stats.joinedThisWeek > 0) {
    lines.push(`${stats.joinedThisWeek} joined this week`);
  }
  if (stats.voiceNotesThisMonth > 0) {
    lines.push(
      `${stats.voiceNotesThisMonth} voice note${stats.voiceNotesThisMonth === 1 ? "" : "s"} this month`,
    );
  }

  if (lines.length === 0) return null;

  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-text-gray/80 ${className}`}
      aria-label="Community activity"
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      {lines.map((line, i) => (
        <span key={line} className="tabular-nums">
          {line}
          {i < lines.length - 1 && (
            <span className="ml-3 text-warm-gold/40">·</span>
          )}
        </span>
      ))}
    </p>
  );
}
