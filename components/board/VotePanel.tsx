"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Account-gated crowd-score control. A logged-in member drags the slider
 * and submits their /100 read; the aggregate updates optimistically and
 * is reconciled with the server's weighted result. An anonymous visitor
 * sees the signup wall instead, this vote is the reason to make an
 * account, which is the whole funnel.
 */
export default function VotePanel({
  slug,
  isLoggedIn,
  initialVote,
  initialAverage,
  initialCount,
  official,
}: {
  slug: string;
  isLoggedIn: boolean;
  initialVote: number | null;
  initialAverage: number | null;
  initialCount: number;
  official: number;
}) {
  const [value, setValue] = useState<number>(initialVote ?? official);
  const [average, setAverage] = useState<number | null>(initialAverage);
  const [count, setCount] = useState<number>(initialCount);
  const [saved, setSaved] = useState<boolean>(initialVote != null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="rounded-sm border border-warm-gold/20 bg-white/[0.02] p-5 text-center">
        <p className="mb-1 font-serif text-lg text-text-light">
          What&rsquo;s your read?
        </p>
        <p className="mb-4 text-sm text-text-gray">
          Cast your own score and see how the room compares to Kanika.
        </p>
        <Link
          href={`/register?redirect=/board/${slug}`}
          className="inline-block rounded-sm bg-warm-gold/90 px-5 py-2 text-sm font-medium uppercase tracking-[0.15em] text-deep-black transition-colors hover:bg-warm-gold"
        >
          Create a free account
        </Link>
        <p className="mt-3 text-[11px] text-text-gray/50">
          Free. Lets you score every figure and sign re-score petitions.
        </p>
      </div>
    );
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    // Optimistic: reflect the vote immediately.
    const wasSaved = saved;
    setSaved(true);
    try {
      const res = await fetch(`/api/board/${slug}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ composite: value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save your score");
      }
      const data = await res.json();
      if (data.crowd) {
        setAverage(data.crowd.average);
        setCount(data.crowd.count);
      }
    } catch (e) {
      setSaved(wasSaved);
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const gap = average != null ? value - average : null;

  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="font-serif text-lg text-text-light">Your read</p>
        <span className="font-serif text-3xl text-warm-gold tabular-nums">
          {value}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
          setSaved(false);
        }}
        className="w-full accent-warm-gold"
        aria-label="Your score out of 100"
      />
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.2em] text-text-gray/40">
        <span>Negligible</span>
        <span>High</span>
      </div>

      <button
        onClick={submit}
        disabled={submitting || saved}
        className="mt-4 w-full rounded-sm bg-warm-gold/90 py-2 text-sm font-medium uppercase tracking-[0.15em] text-deep-black transition-colors hover:bg-warm-gold disabled:cursor-default disabled:opacity-50"
      >
        {submitting ? "Saving..." : saved ? "Score cast" : "Cast your score"}
      </button>

      {error && <p className="mt-2 text-xs text-accent-burgundy">{error}</p>}

      {average != null && (
        <p className="mt-4 text-center text-xs text-text-gray">
          The room says <span className="text-text-light">{average}</span> across{" "}
          {count} {count === 1 ? "vote" : "votes"}.
          {gap != null && gap !== 0 && (
            <>
              {" "}
              You&rsquo;re {Math.abs(gap)} {gap > 0 ? "above" : "below"} them.
            </>
          )}
        </p>
      )}
    </div>
  );
}
