"use client";

/**
 * Daily Check-In card. Sits at the top of /consilium/simulator.
 *
 * Two states:
 *   - Empty (today, no answer yet): "Where are you today?" + 9 chips.
 *   - Answered: shows the recommendation + a one-line reason + Start CTA.
 *     Small "Change my answer" link reopens the picker.
 *
 * The picker is optimistic: the chip flips to "Recommended" immediately,
 * then POSTs in the background. If the POST fails, we silently revert and
 * leave a console error. Network flakiness shouldn't block the user from
 * acting on a recommendation; the next visit will re-prompt.
 */

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import {
  SITUATIONS,
  getSituation,
  type SituationKey,
} from "@/lib/checkin/situations";
import { TRACK_META } from "@/lib/simulator/scenarios";
import type { ScenarioTrack } from "@/lib/simulator/types";

interface Props {
  /** User gender, drives the reason copy for gender-aware buckets. */
  gender: "MALE" | "FEMALE" | null;
  /** Today's check-in if it exists. */
  initial: {
    situation: SituationKey;
    recommendedTrack: string;
  } | null;
}

export default function DailyCheckInCard({ gender, initial }: Props) {
  const [current, setCurrent] = useState<{
    situation: SituationKey;
    recommendedTrack: string;
  } | null>(initial);
  const [picking, setPicking] = useState(initial === null);
  const [pending, startTransition] = useTransition();

  function pick(key: SituationKey) {
    const before = current;
    const situation = getSituation(key);
    if (!situation) return;
    const optimisticTrack = situation.trackFor(gender) ?? "";
    setCurrent({ situation: key, recommendedTrack: optimisticTrack });
    setPicking(false);

    startTransition(() => {
      void fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: key }),
      })
        .then(async (r) => {
          if (!r.ok) throw new Error(`status ${r.status}`);
          const data = (await r.json()) as {
            situation: SituationKey;
            recommendedTrack: string;
          };
          setCurrent({
            situation: data.situation,
            recommendedTrack: data.recommendedTrack,
          });
        })
        .catch(() => {
          // Revert silently; user can re-pick.
          setCurrent(before);
          setPicking(true);
        });
    });
  }

  // ---- Answered state -------------------------------------------------------
  if (current && !picking) {
    const situation = getSituation(current.situation);
    const trackSlug = current.recommendedTrack as ScenarioTrack | "";
    const trackMeta = trackSlug ? TRACK_META[trackSlug as ScenarioTrack] : null;
    const reason = situation ? situation.reasonFor(gender) : "";
    const isExploring =
      current.situation === "exploring" || current.recommendedTrack === "";

    return (
      <section
        aria-label="Today's check-in"
        className="mb-8 p-5 sm:p-6 rounded-2xl border border-warm-gold/25 bg-gradient-to-br from-warm-gold/[0.06] via-deep-black/40 to-deep-black/40"
      >
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-warm-gold/15 border border-warm-gold/40 items-center justify-center">
            <Sparkles size={16} className="text-warm-gold" strokeWidth={1.6} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-2">
              {isExploring ? "Today" : "Today's pick"}
            </p>

            {isExploring ? (
              <>
                <p className="text-white text-lg sm:text-xl font-light tracking-wide mb-1.5">
                  Just exploring.
                </p>
                <p className="text-text-gray/70 text-sm font-light leading-relaxed">
                  {reason}
                </p>
              </>
            ) : (
              <>
                <p className="text-white text-xl sm:text-2xl font-light tracking-wide mb-2">
                  {trackMeta?.label ?? "Recommendation"}
                </p>
                <p className="text-text-gray/80 text-sm font-light leading-relaxed mb-4">
                  {reason}
                </p>
                {trackMeta && (
                  <Link
                    href={trackMeta.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm-gold text-deep-black text-sm font-medium tracking-[0.2em] uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_6px_20px_-4px_rgba(212,175,55,0.5)]"
                  >
                    Start
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                )}
              </>
            )}

            <button
              onClick={() => setPicking(true)}
              disabled={pending}
              className="mt-4 inline-flex items-center gap-1.5 text-text-gray/60 hover:text-warm-gold text-[10px] uppercase tracking-[0.25em] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={10} strokeWidth={1.8} />
              Change my answer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ---- Empty / picking state ------------------------------------------------
  return (
    <section
      aria-label="Daily check-in"
      className="mb-8 p-5 sm:p-6 rounded-2xl border border-warm-gold/20 bg-deep-black/40"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-warm-gold/10 border border-warm-gold/30 items-center justify-center">
          <Sparkles size={16} className="text-warm-gold" strokeWidth={1.6} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-2">
            Today
          </p>
          <p className="text-white text-xl sm:text-2xl font-light tracking-wide mb-1">
            Where are you today?
          </p>
          <p className="text-text-gray/70 text-sm font-light leading-relaxed">
            One sentence. We will point you at the track that matches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SITUATIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => pick(s.key)}
            disabled={pending}
            className="text-left px-4 py-3 rounded-lg border border-warm-gold/15 bg-white/[0.02] text-text-light text-sm font-light tracking-wide hover:border-warm-gold/40 hover:bg-warm-gold/[0.04] active:bg-warm-gold/10 transition-all disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
