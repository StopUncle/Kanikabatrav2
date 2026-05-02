import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import InstinctsHex from "@/components/tells/InstinctsHex";
import { getInstinctScore, getTellStreak } from "@/lib/tells/db";
import { AXIS_KEYS, AXIS_LABELS } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Instinct Hex | Train Your Instincts",
  description: "Your six-axis instinct rating across all tracks.",
};

const AXIS_BLURBS: Record<string, string> = {
  READ: "Naming what someone is doing while they are doing it.",
  SPOT: "Catching the move in flight, before it lands.",
  REPLY: "Knowing the structurally clean response under pressure.",
  REFUSE: "Saying no without explaining yourself out of the no.",
  CALIBRATE: "Reading status, room, and signal across difference.",
  HOLD: "Not reacting. The most expensive instinct, the slowest to learn.",
};

function tier(rating: number): { label: string; color: string } {
  if (rating < 1100) return { label: "Untrained", color: "text-text-gray" };
  if (rating < 1300) return { label: "Aware", color: "text-text-light" };
  if (rating < 1500) return { label: "Practiced", color: "text-accent-gold" };
  if (rating < 1700) return { label: "Sharp", color: "text-accent-gold" };
  if (rating < 1900) return { label: "Expert", color: "text-emerald-400" };
  return { label: "Native", color: "text-emerald-400" };
}

export default async function ConsiliumInstinctsScorePage() {
  const userId = await requireServerAuth("/consilium/instincts/score");

  const [score, streak] = await Promise.all([
    getInstinctScore(userId),
    getTellStreak(userId),
  ]);

  const ratings: Record<string, number> = {
    READ: score.read,
    SPOT: score.spot,
    REPLY: score.reply,
    REFUSE: score.refuse,
    CALIBRATE: score.calibrate,
    HOLD: score.hold,
  };

  const overall = Math.round(
    AXIS_KEYS.reduce((sum, a) => sum + ratings[a], 0) / AXIS_KEYS.length,
  );

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/consilium/instincts/today"
          className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold transition-colors text-sm mb-8"
        >
          <ArrowLeft size={14} /> Today
        </Link>

        <header className="mb-10">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
            Your Hex
          </p>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase text-text-light mb-2">
            Six instincts, one rating
          </h1>
          <p className="text-text-gray text-sm sm:text-base font-light max-w-2xl">
            Each Tell adjusts the axes it trains. The hex grows the way a
            body grows in a gym, slowly, only with reps.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <div className="flex justify-center">
            <InstinctsHex score={score} size={400} showLabels={true} />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-3">
                Composite
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl text-text-light font-extralight">
                  {overall}
                </span>
                <span className={`text-sm uppercase tracking-[0.3em] ${tier(overall).color}`}>
                  {tier(overall).label}
                </span>
              </div>
              <p className="text-text-gray text-xs mt-3 leading-relaxed">
                {streak?.currentDays ?? 0} day streak &middot;{" "}
                {score.totalAnswered} answers logged
              </p>
            </div>

            <div className="space-y-3">
              {AXIS_KEYS.map((axis) => {
                const v = ratings[axis];
                const t = tier(v);
                return (
                  <div
                    key={axis}
                    className="rounded-lg border border-gray-800 bg-deep-black/40 p-4"
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-text-light text-sm uppercase tracking-[0.3em]">
                        {AXIS_LABELS[axis]}
                      </p>
                      <p className="flex items-baseline gap-3">
                        <span className="text-accent-gold text-lg font-extralight">
                          {v}
                        </span>
                        <span className={`text-[10px] uppercase tracking-[0.3em] ${t.color}`}>
                          {t.label}
                        </span>
                      </p>
                    </div>
                    <p className="text-text-gray text-xs leading-relaxed">
                      {AXIS_BLURBS[axis]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-text-gray/60 text-xs mt-12 max-w-2xl">
          Pattern recognition training. Not medical, legal, or diagnostic
          advice. Composite is the average of the six axes. Rating uses Elo
          per axis, K=24 for the first thirty answers, K=16 thereafter.
        </p>
      </div>
    </div>
  );
}
