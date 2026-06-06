"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Re-score petition. A petition, not a mandate: it decides who gets
 * re-examined, Kanika still assigns the number. A citation is required,
 * every signature must point at a real event (news, interview, filing).
 * Account-gated; one signature per account. The progress bar gives the
 * "847 / 1,000 to put on the table" appointment energy.
 */
const GOAL = 1000;

export default function PetitionForm({
  slug,
  name,
  isLoggedIn,
  initialCount,
  alreadySigned,
}: {
  slug: string;
  name: string;
  isLoggedIn: boolean;
  initialCount: number;
  alreadySigned: boolean;
}) {
  const [count, setCount] = useState(initialCount);
  const [signed, setSigned] = useState(alreadySigned);
  const [sourceUrl, setSourceUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pct = Math.min(100, Math.round((count / GOAL) * 100));

  async function submit() {
    if (!/^https?:\/\/.+/i.test(sourceUrl.trim())) {
      setError("Add a link to the news, interview, or filing that prompts this.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/board/${slug}/petition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceUrl: sourceUrl.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not record your petition");
      }
      const data = await res.json();
      setCount(data.petitionCount ?? count + 1);
      setSigned(true);
      setOpen(false);
      setSourceUrl("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-5">
      <p className="font-serif text-lg text-text-light">Put {name} on the table</p>
      <p className="mt-1 text-sm text-text-gray">
        Think the read is out of date? Petition for a re-score. New evidence
        only.
      </p>

      <div className="mt-4 mb-1 flex items-baseline justify-between text-xs text-text-gray tabular-nums">
        <span className="text-text-light">{count}</span>
        <span className="text-text-gray/50">{GOAL} to put on the table</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-warm-gold transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {!isLoggedIn ? (
        <Link
          href={`/register?redirect=/board/${slug}`}
          className="mt-4 block rounded-sm border border-warm-gold/30 py-2 text-center text-sm uppercase tracking-[0.15em] text-warm-gold/90 transition-colors hover:bg-warm-gold/10"
        >
          Sign in to petition
        </Link>
      ) : signed ? (
        <p className="mt-4 text-center text-xs uppercase tracking-[0.15em] text-warm-gold/70">
          You signed this petition
        </p>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-sm border border-warm-gold/30 py-2 text-sm uppercase tracking-[0.15em] text-warm-gold/90 transition-colors hover:bg-warm-gold/10"
        >
          Petition for a re-score
        </button>
      ) : (
        <div className="mt-4 space-y-2">
          <input
            type="url"
            inputMode="url"
            placeholder="https://link-to-the-news-or-interview"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text-light outline-none focus:border-warm-gold/40"
          />
          <button
            onClick={submit}
            disabled={submitting}
            className="w-full rounded-sm bg-warm-gold/90 py-2 text-sm font-medium uppercase tracking-[0.15em] text-deep-black transition-colors hover:bg-warm-gold disabled:opacity-50"
          >
            {submitting ? "Signing..." : "Sign with this source"}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-accent-burgundy">{error}</p>}
    </div>
  );
}
