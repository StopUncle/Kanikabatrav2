import Link from "next/link";
import type { PublicTell } from "@/lib/tells/types";
import type { TellRunOutcome, TellRevealPayload } from "@/lib/tells/use-tell-run";

/**
 * After the answer: the verdict, every choice annotated, and Kanika's read.
 *
 * What is deliberately absent, and must stay absent: the Elo delta and any
 * link to the six-axis score. docs/THE-MARK-PLAN.md governs here. The skill
 * measure is never a number or a chart shown to a member, only sentences
 * about specific things. The rating engine keeps running underneath; it just
 * does not speak. The legacy /consilium reveal still prints "+12 rating" and
 * links to the hex, which is exactly what this replaces.
 *
 * Standing is fine to show: that is the showing-up currency, not skill.
 */

export default function TellReveal({
  tell,
  reveal,
  outcome,
  pickedId,
}: {
  tell: PublicTell;
  reveal: TellRevealPayload | null;
  outcome: TellRunOutcome | null;
  pickedId: string | null;
}) {
  const correct = outcome?.correct ?? false;
  const choices = reveal?.choices ?? [];

  return (
    <div className="mt-7">
      <div
        className="rounded-2xl border p-4"
        style={{
          borderColor: correct
            ? "rgba(127,184,144,0.3)"
            : "rgba(183,110,121,0.3)",
          background: correct
            ? "rgba(127,184,144,0.06)"
            : "rgba(183,110,121,0.06)",
        }}
      >
        <p
          className="text-[19px]"
          style={{
            fontFamily: "var(--font-display)",
            color: correct ? "var(--app-green)" : "var(--app-rose)",
          }}
        >
          {correct ? "You saw it." : "It got past you."}
        </p>
        {outcome?.isReplay ? (
          <p className="mt-1 text-[12px] text-[var(--app-dim)]">
            You have already answered this one. Nothing counted again.
          </p>
        ) : (
          <p className="mt-1 text-[12px] text-[var(--app-dim)]">
            {outcome?.standing?.amount
              ? `+${outcome.standing.amount} Standing`
              : "Recorded."}
            {outcome?.countedStreak && outcome.streak
              ? ` · ${outcome.streak.currentDays} day streak`
              : ""}
          </p>
        )}
      </div>

      {/* Every option, annotated. The wrong ones are the lesson: each `why`
          says what made it look right. */}
      {choices.length > 0 && (
        <div className="mt-5 flex flex-col gap-2.5">
          {choices.map((c) => {
            const picked = c.id === pickedId;
            const tone = c.isCorrect
              ? "var(--app-green)"
              : picked
                ? "var(--app-rose)"
                : "var(--app-dim)";
            return (
              <div
                key={c.id}
                className="rounded-2xl border p-3.5"
                style={{
                  borderColor: c.isCorrect
                    ? "rgba(127,184,144,0.28)"
                    : picked
                      ? "rgba(183,110,121,0.28)"
                      : "var(--app-line-soft)",
                  background: "var(--app-card)",
                  opacity: c.isCorrect || picked ? 1 : 0.72,
                }}
              >
                <p className="flex items-start gap-2 text-[14px] leading-snug">
                  <span className="shrink-0" style={{ color: tone }}>
                    {c.isCorrect ? "✓" : picked ? "✕" : "·"}
                  </span>
                  <span>{c.text}</span>
                </p>
                {c.why && (
                  <p className="mt-1.5 pl-5 text-[12px] leading-relaxed text-[var(--app-muted)]">
                    {c.why}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {reveal?.reveal && (
        <div className="mt-6 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-4">
          <p className="mb-2 text-[10.5px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
            Kanika&apos;s read
          </p>
          <p
            className="text-[15px] leading-relaxed text-[var(--app-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {reveal.reveal}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-2.5 pb-4">
        <Link
          href="/app/train"
          className="w-full rounded-full bg-[var(--app-gold)] py-3.5 text-center text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0a0908] transition-transform active:scale-[0.97]"
        >
          Back to Train
        </Link>
        <Link
          href={`/app/instincts/history`}
          className="w-full py-2.5 text-center text-[12px] uppercase tracking-[0.16em] text-[var(--app-muted)]"
        >
          Every Tell you have answered
        </Link>
      </div>

      <p className="pb-2 text-center text-[10.5px] text-[var(--app-dim)]">
        Tell {tell.number}
      </p>
    </div>
  );
}
