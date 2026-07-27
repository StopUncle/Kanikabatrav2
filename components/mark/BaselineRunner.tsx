"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PublicBaselineItem } from "@/lib/mark/baseline-items";
import type { BaselineRevealItem } from "@/lib/mark/baseline";
import BaselineArtifact from "./BaselineArtifact";

/**
 * The Baseline Read: twelve rooms, one per screen, no feedback until the
 * end. Deliberately silent while it runs. Telling someone they were
 * right on item three changes how they read item four, and this sitting
 * exists to be compared against the same sitting a month later.
 *
 * Grading happens on the server, so nothing here knows the answers.
 */

type Answer = { itemId: string; choiceId: string | null; answerMs: number };

type Result = {
  headline: string;
  subline: string;
  correctCount: number;
  itemCount: number;
  reveal: BaselineRevealItem[];
};

const ADVANCE_MS = 240;

export default function BaselineRunner({
  items,
}: {
  items: PublicBaselineItem[];
}) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const answers = useRef<Answer[]>([]);
  const shownAt = useRef<number>(Date.now());

  const submit = useCallback(
    async (collected: Answer[]) => {
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/measure/baseline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: collected }),
        });
        if (!res.ok) {
          setError(
            res.status === 429
              ? "You have read this recently. The next one opens in a few weeks."
              : "That did not save. Try once more.",
          );
          return;
        }
        setResult(await res.json());
      } catch {
        setError("That did not save. Try once more.");
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  function choose(choiceId: string) {
    if (picked || submitting) return;
    setPicked(choiceId);
    const item = items[index];
    answers.current = [
      ...answers.current.filter((a) => a.itemId !== item.id),
      {
        itemId: item.id,
        choiceId,
        answerMs: Math.max(0, Date.now() - shownAt.current),
      },
    ];

    window.setTimeout(() => {
      setPicked(null);
      if (index + 1 < items.length) {
        shownAt.current = Date.now();
        setIndex(index + 1);
      } else {
        void submit(answers.current);
      }
    }, ADVANCE_MS);
  }

  if (result) {
    return <Reveal result={result} onDone={() => router.push("/app")} />;
  }

  if (!started) {
    return (
      <Intro
        count={items.length}
        onStart={() => {
          shownAt.current = Date.now();
          setStarted(true);
        }}
        onSkip={() => router.push("/app")}
      />
    );
  }

  const item = items[index];

  return (
    <div className="flex min-h-full flex-col px-5 pb-10 pt-6">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--app-gold-soft)]">
          The Baseline Read
        </p>
        <p className="text-[11px] tabular-nums text-[var(--app-dim)]">
          {index + 1} / {items.length}
        </p>
      </div>
      <div className="mb-6 h-[2px] overflow-hidden rounded-full bg-[rgba(212,175,55,0.14)]">
        <div
          className="h-full rounded-full bg-[var(--app-gold)] transition-all duration-300"
          style={{ width: `${((index + 1) / items.length) * 100}%` }}
        />
      </div>

      {submitting ? (
        <p className="mt-16 text-center text-[14px] text-[var(--app-muted)]">
          Reading it back.
        </p>
      ) : (
        <>
          <BaselineArtifact artifact={item.artifact} />

          <p className="mb-4 mt-6 text-[16px] font-light leading-relaxed text-[var(--app-text)]">
            {item.question}
          </p>

          <div className="flex flex-col gap-2.5">
            {item.choices.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => choose(c.id)}
                className={`rounded-2xl border px-4 py-3.5 text-left text-[14.5px] leading-relaxed transition-colors ${
                  picked === c.id
                    ? "border-[var(--app-gold)] bg-[rgba(212,175,55,0.1)] text-[var(--app-gold)]"
                    : "border-[var(--app-line-soft)] bg-[var(--app-card)] text-[var(--app-muted)] active:bg-[var(--app-card-2)]"
                }`}
              >
                {c.text}
              </button>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-4">
          <p className="text-[13.5px] text-[var(--app-muted)]">{error}</p>
          <button
            type="button"
            onClick={() => void submit(answers.current)}
            className="mt-3 text-[13px] font-medium text-[var(--app-gold)]"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function Intro({
  count,
  onStart,
  onSkip,
}: {
  count: number;
  onStart: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col px-6 pb-10 pt-14">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--app-gold-soft)]">
        The Baseline Read
      </p>
      <h1
        className="mt-3 text-[30px] font-light leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        How much of a mark are you?
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--app-muted)]">
        {count} rooms. In each one somebody is running something on you.
        Say what it is.
      </p>
      <p className="mt-3.5 text-[15px] leading-relaxed text-[var(--app-muted)]">
        I am not going to tell you how you did until the end. Knowing
        changes how you read the next one, and I want the honest version.
        Five minutes, and do it in one sitting.
      </p>
      <p className="mt-3.5 text-[13.5px] leading-relaxed text-[var(--app-dim)]">
        Nobody sees this but you. It is a training record, not a diagnosis
        and not a prediction about your life.
      </p>

      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-full bg-[var(--app-gold)] py-[16px] text-[15px] font-semibold text-[#17130a]"
        >
          Start
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="mt-4 w-full text-[13px] text-[var(--app-dim)]"
        >
          Not now
        </button>
      </div>
    </div>
  );
}

function Reveal({ result, onDone }: { result: Result; onDone: () => void }) {
  const misses = result.reveal.filter((r) => !r.correct);

  return (
    <div className="px-5 pb-10 pt-8">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--app-gold-soft)]">
        Your before picture
      </p>
      <h1
        className="mt-3 text-[27px] font-light leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {result.headline}
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--app-muted)]">
        {result.subline}
      </p>

      <div className="mt-7 flex flex-col gap-3">
        {misses.map((m) => (
          <div
            key={m.itemId}
            className="rounded-[18px] border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-rose)]">
              {m.tacticLabel}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--app-text)]">
              {m.tacticDefinition}
            </p>
            <div className="mt-3.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--app-dim)]">
                The read
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--app-text)]">
                {m.correctChoiceText}
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--app-muted)]">
                {m.correctWhy}
              </p>
            </div>
            {m.yourChoiceText && (
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--app-dim)]">
                  You said
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--app-dim)]">
                  {m.yourChoiceText}
                </p>
                {m.yourWhy && (
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--app-dim)]">
                    {m.yourWhy}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-8 w-full rounded-full bg-[var(--app-gold)] py-[15px] text-[15px] font-semibold text-[#17130a]"
      >
        Take me in
      </button>
      <p className="mt-4 text-center text-[12px] leading-relaxed text-[var(--app-dim)]">
        These land in The Mark on your You tab. They fill in as you train.
      </p>
    </div>
  );
}
