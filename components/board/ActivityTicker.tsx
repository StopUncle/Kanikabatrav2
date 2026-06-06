"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ActivityItem } from "@/lib/board/types";
import { relativeTime } from "@/lib/board/format";

/**
 * The live layer. Polls /api/board/activity every ~20s for real events
 * (votes, petitions, debuts, re-score reveals) and live counters. The
 * biggest single liveness lever, and every signal is genuine, no
 * fabricated numbers. First paint is server-rendered; this just keeps it
 * fresh and lets the counters tick.
 */

interface Stats {
  figureCount: number;
  voteCount: number;
  petitionCount: number;
}

interface FeedItem extends Omit<ActivityItem, "createdAt"> {
  createdAt: string;
}

function describe(item: FeedItem): string {
  const who = item.actorHandle ? `@${item.actorHandle}` : "Someone";
  const fig = item.figureName ?? "a figure";
  switch (item.type) {
    case "VOTE":
      return `${who} scored ${fig}`;
    case "PETITION":
      return `${who} petitioned to re-score ${fig}`;
    case "DEBUT":
      return `${fig} debuted on the board`;
    case "RESCORE_REVEALED":
      return `New score revealed for ${fig}`;
    default:
      return `${fig}`;
  }
}

export default function ActivityTicker({
  initialActivity,
  initialStats,
}: {
  initialActivity: FeedItem[];
  initialStats: Stats;
}) {
  const [activity, setActivity] = useState<FeedItem[]>(initialActivity);
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch("/api/board/activity", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        if (Array.isArray(data.activity)) setActivity(data.activity);
        if (data.stats) setStats(data.stats);
      } catch {
        // Network blip: keep showing the last good state.
      }
    };
    const id = setInterval(tick, 20_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="rounded-sm border border-white/[0.07] bg-white/[0.015]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm-gold/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm-gold" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/70">
            On the board now
          </span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.15em] text-text-gray/60 tabular-nums">
          <span>{stats.figureCount} ranked</span>
          <span>{stats.voteCount} votes</span>
          <span>{stats.petitionCount} petitions</span>
        </div>
      </div>

      <ul className="divide-y divide-white/[0.04]">
        {activity.length === 0 && (
          <li className="px-4 py-3 text-xs text-text-gray/50">
            No activity yet. Be the first to score someone.
          </li>
        )}
        {activity.slice(0, 6).map((item) => {
          const body = (
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="truncate text-xs text-text-light/90">
                {describe(item)}
              </span>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-text-gray/40">
                {relativeTime(item.createdAt)}
              </span>
            </div>
          );
          return (
            <li key={item.id} className="animate-fade-in">
              {item.figureSlug ? (
                <Link
                  href={`/board/${item.figureSlug}`}
                  className="block transition-colors hover:bg-white/[0.02]"
                >
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
