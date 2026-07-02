"use client";

import { useState } from "react";
import { Check, BarChart3 } from "lucide-react";
import type { FormattedPoll } from "@/lib/community/poll-format";

/**
 * One-tap poll on a feed post. The participation floor: a member who
 * would never type a comment can still cast a stance and see how the
 * council splits.
 *
 * Percentages are hidden until the viewer votes (no anchoring, and the
 * reveal is the reward for participating). After voting, rows stay
 * tappable to change the vote; the optimistic update reconciles with
 * the server response and reverts on failure.
 */
interface Props {
  postId: string;
  poll: FormattedPoll;
}

export default function FeedPollCard({ postId, poll }: Props) {
  const [counts, setCounts] = useState(poll.counts);
  const [viewerVote, setViewerVote] = useState(poll.viewerVote);
  const [pending, setPending] = useState(false);

  const totalVotes = counts.reduce((a, b) => a + b, 0);
  const hasVoted = viewerVote !== null;

  const vote = async (optionIndex: number) => {
    if (pending || optionIndex === viewerVote) return;
    setPending(true);

    const prevCounts = counts;
    const prevVote = viewerVote;
    const next = [...counts];
    if (prevVote !== null) next[prevVote] = Math.max(0, next[prevVote] - 1);
    next[optionIndex] += 1;
    setCounts(next);
    setViewerVote(optionIndex);

    try {
      const res = await fetch(`/api/consilium/feed/${postId}/poll-vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionIndex }),
      });
      if (!res.ok) throw new Error(`vote failed (${res.status})`);
      const data = (await res.json()) as { counts: number[]; viewerVote: number };
      setCounts(data.counts);
      setViewerVote(data.viewerVote);
    } catch {
      setCounts(prevCounts);
      setViewerVote(prevVote);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-warm-gold/15 bg-warm-gold/[0.03] p-4">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={13} strokeWidth={1.6} className="text-warm-gold/80" />
        <p className="text-[11px] uppercase tracking-[0.18em] text-warm-gold/85">
          {poll.question}
        </p>
      </div>

      <div className="space-y-1.5">
        {poll.options.map((option, i) => {
          const isMine = viewerVote === i;
          const pct =
            hasVoted && totalVotes > 0
              ? Math.round((counts[i] / totalVotes) * 100)
              : 0;
          return (
            <button
              key={i}
              onClick={() => vote(i)}
              disabled={pending}
              className={`relative w-full overflow-hidden rounded-lg border px-3 py-2.5 text-left text-sm font-light transition-colors disabled:opacity-70 ${
                isMine
                  ? "border-warm-gold/50 text-warm-gold"
                  : "border-warm-gold/15 text-text-gray hover:border-warm-gold/35 hover:text-text-light"
              }`}
            >
              {hasVoted && (
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 transition-[width] duration-500 ease-out ${
                    isMine ? "bg-warm-gold/15" : "bg-white/[0.05]"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span className="flex-1 min-w-0 truncate">{option}</span>
                {isMine && <Check size={13} strokeWidth={2} className="shrink-0" />}
                {hasVoted && (
                  <span className="shrink-0 text-[11px] tabular-nums text-text-gray/70">
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2.5 text-[10px] uppercase tracking-[0.15em] text-text-gray/50">
        {hasVoted
          ? `${totalVotes} vote${totalVotes === 1 ? "" : "s"} · tap to change yours`
          : "Tap your answer to see the council's split"}
      </p>
    </div>
  );
}
