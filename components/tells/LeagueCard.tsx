"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface RosterEntry {
  rank: number;
  label: string;
  score: number;
  answered: number;
  isMe: boolean;
}

interface LeagueMembership {
  weekKey: string;
  tierName: string;
  tierOrder: number;
  eloMin: number;
  eloMax: number;
  startElo: number;
  weeklyScore: number;
  weeklyAnswered: number;
  myRank: number;
  totalInBracket: number;
  promoteCount: number;
  demoteCount: number;
  promoteCutoffScore: number;
  demoteCutoffScore: number;
  roster: RosterEntry[];
}

/**
 * Member-facing weekly league card. Renders on the today's-Tell page
 * below the player. Three states:
 *   1. loading — placeholder skeleton
 *   2. unassigned — user hasn't answered yet this week, render the
 *      "answer today's Tell to enter this week's bracket" prompt
 *   3. live — full bracket card with rank, top 8, cutoffs
 */
export default function LeagueCard() {
  const [data, setData] = useState<LeagueMembership | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leagues/me")
      .then(async (res) => (res.ok ? await res.json() : null))
      .then(
        (body: { membership: LeagueMembership | null } | null) => {
          if (cancelled) return;
          setData(body?.membership ?? null);
          setLoaded(true);
        },
      )
      .catch(() => {
        if (cancelled) return;
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded) {
    return (
      <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 animate-pulse">
        <div className="h-3 w-32 bg-gray-800 mb-4 rounded" />
        <div className="h-8 w-48 bg-gray-800 mb-3 rounded" />
        <div className="h-3 w-24 bg-gray-800 rounded" />
      </div>
    );
  }

  if (!data) {
    return <UnassignedCard />;
  }

  return <LiveCard data={data} />;
}

function UnassignedCard() {
  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5">
      <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-3">
        This week&rsquo;s bracket
      </p>
      <p className="text-text-light text-sm font-light leading-relaxed mb-2">
        Answer today&rsquo;s Tell to lock in your bracket for the week.
      </p>
      <p className="text-text-gray text-xs leading-relaxed">
        Brackets reset Sunday 23:59 UTC. Top 20% promote, bottom 20%
        drop a tier.
      </p>
    </div>
  );
}

function LiveCard({ data }: { data: LeagueMembership }) {
  const pointsToPromote = Math.max(
    0,
    data.promoteCutoffScore - data.weeklyScore + 1,
  );
  const inDangerOfDemotion =
    data.demoteCount > 0 &&
    data.myRank > data.totalInBracket - data.demoteCount;
  const willPromote = data.myRank > 0 && data.myRank <= data.promoteCount;

  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 space-y-5">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-2">
          {data.tierName}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl text-accent-gold font-extralight">
            {data.myRank > 0 ? `#${data.myRank}` : "—"}
          </span>
          <span className="text-text-gray text-sm">
            of {data.totalInBracket}
          </span>
          <StatusPill
            willPromote={willPromote}
            inDanger={inDangerOfDemotion}
          />
        </div>
        <p className="text-text-gray text-xs mt-2 leading-relaxed">
          {data.weeklyAnswered === 1
            ? "1 answer this week"
            : `${data.weeklyAnswered} answers this week`}
          {" · "}
          {data.weeklyScore >= 0 ? "+" : ""}
          {data.weeklyScore} rating
        </p>
      </div>

      {/* Roster */}
      <div className="space-y-1">
        {data.roster.map((row) => (
          <RosterRow key={`${row.rank}-${row.label}`} row={row} />
        ))}
        {data.totalInBracket > data.roster.length && (
          <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.3em] pt-2">
            +{data.totalInBracket - data.roster.length} more
          </p>
        )}
      </div>

      {/* Footer hint */}
      <p className="text-text-gray text-xs leading-relaxed border-t border-gray-800 pt-4">
        {willPromote
          ? `You're in the promotion zone. Hold the line until Sunday.`
          : pointsToPromote > 0
            ? `${pointsToPromote} more rating points this week to enter the promotion zone.`
            : `Solve a Tell to start moving.`}
      </p>
    </div>
  );
}

function StatusPill({
  willPromote,
  inDanger,
}: {
  willPromote: boolean;
  inDanger: boolean;
}) {
  if (willPromote) {
    return (
      <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-1">
        <ChevronUp size={12} />
        Promoting
      </span>
    );
  }
  if (inDanger) {
    return (
      <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-accent-burgundy flex items-center gap-1">
        <ChevronDown size={12} />
        At risk
      </span>
    );
  }
  return (
    <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-text-gray/60 flex items-center gap-1">
      <Minus size={12} />
      Holding
    </span>
  );
}

function RosterRow({ row }: { row: RosterEntry }) {
  return (
    <div
      className={`flex items-baseline gap-3 px-2 py-1.5 rounded ${
        row.isMe ? "bg-accent-gold/10 border border-accent-gold/30" : ""
      }`}
    >
      <span className="text-text-gray text-xs w-6 tabular-nums">
        {row.rank}
      </span>
      <span
        className={`flex-1 text-sm truncate ${
          row.isMe ? "text-accent-gold" : "text-text-light"
        }`}
      >
        {row.label}
      </span>
      <span
        className={`text-xs tabular-nums ${
          row.score > 0
            ? "text-emerald-400/80"
            : row.score < 0
              ? "text-accent-burgundy/80"
              : "text-text-gray"
        }`}
      >
        {row.score > 0 ? "+" : ""}
        {row.score}
      </span>
    </div>
  );
}
