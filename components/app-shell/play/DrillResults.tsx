"use client";

import Link from "next/link";
import type { DrillAnswer } from "@/lib/games/speed-drill/use-speed-drill";

/**
 * What sits under the ceremony: the calm half.
 *
 * The score already had its moment, so this screen is for the only thing
 * worth studying afterwards, which is the lines that got through. Misses
 * first, in full, with the tactic named.
 */

export default function DrillResults({
  answers,
  score,
  accuracy,
  maxCombo,
  standing,
  onReplay,
}: {
  answers: DrillAnswer[];
  score: number;
  accuracy: number;
  maxCombo: number;
  standing: number | null;
  onReplay: () => void;
}) {
  const missed = answers.filter((a) => !a.correct);

  return (
    <div className="px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-gold-soft)]">
            Speed drill
          </p>
          <p
            className="mt-1 text-[30px] font-light leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {score}
            <span className="text-[19px] text-[var(--app-dim)]">
              /{answers.length}
            </span>
          </p>
          <p className="mt-1.5 text-[12px] text-[var(--app-dim)]">
            {accuracy}% accuracy · best run of {maxCombo}
            {standing !== null && standing > 0 && ` · +${standing} Standing`}
          </p>
        </div>
        <Link
          href="/app/train"
          aria-label="Back to Train"
          className="mt-1 text-[var(--app-dim)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
      </div>

      {missed.length > 0 ? (
        <>
          {/* Not "what got through": half of these are the opposite error,
              a clean line you called manipulation. Both are misreads. */}
          <p className="mb-2.5 mt-8 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
            The ones you missed
          </p>
          <div className="flex flex-col gap-2.5">
            {missed.map((a, i) => (
              <div
                key={`${a.card.id}-${i}`}
                className="rounded-2xl border border-[rgba(183,110,121,0.22)] bg-[var(--app-card)] p-4"
              >
                <p
                  className="text-[15px] leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {a.card.line}
                </p>
                {/* The truth is colour-coded by what the line actually was,
                    so "Clean" never wears the tactic accent. */}
                <p className="mt-2 text-[11.5px] text-[var(--app-muted)]">
                  <span
                    style={{
                      color: a.card.manipulative
                        ? "var(--app-rose)"
                        : "var(--app-green)",
                    }}
                  >
                    {a.card.manipulative ? a.card.tag : "Clean"}
                  </span>
                  {" · you called it "}
                  {a.picked ? "manipulation" : "clean"}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-[rgba(127,184,144,0.25)] bg-[var(--app-card)] p-5 text-center">
          <p
            className="text-[17px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nothing got through.
          </p>
          <p className="mt-1.5 text-[12.5px] text-[var(--app-muted)]">
            Ten for ten. Come back tomorrow and do it tired.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onReplay}
          className="w-full rounded-full bg-[var(--app-gold)] py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0a0908] transition-transform active:scale-[0.97]"
        >
          Run it again
        </button>
        <Link
          href="/app/train"
          className="w-full py-2.5 text-center text-[12px] uppercase tracking-[0.16em] text-[var(--app-muted)]"
        >
          Back to Train
        </Link>
      </div>
    </div>
  );
}
