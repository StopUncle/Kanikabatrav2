"use client";

import { useState } from "react";

interface ReviewEntry {
  id: string;
  weekNumber: number;
  member: string;
  body: string;
  reply: string | null;
  replyModel: string | null;
  flagged: boolean;
  createdAt: string;
}

/**
 * The review surface: read the exchange, mark it seen. Flagged rows sit on
 * top in red and cannot be missed.
 */
export default function JournalReviewClient({
  flaggedCount,
  unreviewedCount,
  initial,
}: {
  flaggedCount: number;
  unreviewedCount: number;
  initial: ReviewEntry[];
}) {
  const [entries, setEntries] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function markReviewed(id: string) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/program-journal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setEntries((rows) => rows.filter((r) => r.id !== id));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-extralight uppercase tracking-[0.2em] text-[#e5e5e5]">
        The Twelve &middot; Journal
      </h1>
      <p className="mt-2 text-sm text-[#a0a0a0]">
        {flaggedCount > 0 ? (
          <span className="text-red-400">
            {flaggedCount} flagged, needs eyes now.{" "}
          </span>
        ) : null}
        {unreviewedCount} unreviewed exchange{unreviewedCount === 1 ? "" : "s"}.
        Reviewing is reading the pair and asking one question: would she have
        sent that reply?
      </p>

      <div className="mt-8 space-y-5">
        {entries.length === 0 && (
          <p className="rounded-lg border border-[#2a2a2a] px-4 py-8 text-center text-sm text-[#a0a0a0]">
            Queue is clear.
          </p>
        )}
        {entries.map((e) => (
          <div
            key={e.id}
            className={`rounded-lg border px-5 py-4 ${
              e.flagged
                ? "border-red-800 bg-red-950/20"
                : "border-[#2a2a2a] bg-[#111]"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-[#d4af37]">
                Week {e.weekNumber} &middot; {e.member}
                {e.flagged && (
                  <span className="ml-2 text-red-400">FLAGGED</span>
                )}
              </p>
              <p className="text-xs text-[#666]">
                {new Date(e.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#c9c4bb]">
              {e.body}
            </p>
            <div className="mt-4 border-t border-[#2a2a2a] pt-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[#777]">
                Reply {e.replyModel ? `(${e.replyModel})` : "(pending)"}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#e5e5e5]">
                {e.reply ?? "Not generated yet."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => markReviewed(e.id)}
              disabled={busy === e.id}
              className="mt-4 rounded border border-[#d4af37]/40 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-[#d4af37] hover:bg-[#d4af37]/10 disabled:opacity-50"
            >
              {busy === e.id ? "Saving" : "Reviewed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
