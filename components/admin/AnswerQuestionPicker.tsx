"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

type PickableQuestion = {
  id: string;
  content: string;
  isAnonymous: boolean;
  upvoteCount: number;
  status: "PENDING" | "ANSWERING" | "ANSWERED" | "REJECTED" | "HIDDEN";
};

interface Props {
  /** Currently selected questionId (controlled). Null = "doesn't answer a question". */
  value: string | null;
  onChange: (questionId: string | null) => void;
  disabled?: boolean;
}

/**
 * Inline picker that appears on the voice-note + video uploader forms.
 *
 * Lists PENDING + ANSWERING questions sorted by upvote count, so the
 * highest-demand question is at the top. Selecting a question links
 * the soon-to-be-created FeedPost as the answer when the parent calls
 * PATCH /api/admin/questions/[id] post-publish.
 *
 * Optional. Kanika can publish a voice note that doesn't answer any
 * specific question (general content). In that case `value` stays null
 * and no PATCH is fired.
 */
export default function AnswerQuestionPicker({ value, onChange, disabled }: Props) {
  const [questions, setQuestions] = useState<PickableQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/admin/questions?status=PENDING").then((r) => r.json()),
      fetch("/api/admin/questions?status=ANSWERING").then((r) => r.json()),
    ])
      .then(([pending, answering]) => {
        if (cancelled) return;
        const merged = [
          ...(pending.questions ?? []),
          ...(answering.questions ?? []),
        ].sort((a: PickableQuestion, b: PickableQuestion) => b.upvoteCount - a.upvoteCount);
        setQuestions(merged);
      })
      .catch(() => setQuestions([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = value ? questions.find((q) => q.id === value) : null;

  return (
    <div className="rounded-lg border border-warm-gold/15 bg-deep-black/40 p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-warm-gold/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
          Answers a question? (optional)
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            disabled={disabled}
            className="text-text-gray/60 hover:text-warm-gold text-[11px] underline"
          >
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-text-gray/50 text-[12px]">Loading…</p>
      ) : questions.length === 0 ? (
        <p className="text-text-gray/60 text-[12px] italic">
          No open questions in the queue.
        </p>
      ) : (
        <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => onChange(q.id === value ? null : q.id)}
              disabled={disabled}
              className={`w-full text-left flex items-start gap-2.5 rounded-md p-2 transition border ${
                q.id === value
                  ? "border-warm-gold/60 bg-warm-gold/10"
                  : "border-transparent hover:border-warm-gold/25 hover:bg-warm-gold/5"
              }`}
            >
              <span className="shrink-0 inline-flex flex-col items-center min-w-[32px] py-1 rounded bg-warm-gold/10 text-warm-gold/90">
                <ChevronUp size={12} strokeWidth={2.2} />
                <span className="text-[10px] font-semibold tabular-nums leading-none">
                  {q.upvoteCount}
                </span>
              </span>
              <span className="flex-1 text-text-light text-[12px] leading-snug">
                {q.content}
                {q.status === "ANSWERING" && (
                  <span className="ml-2 text-amber-300/80 text-[10px] tracking-wider uppercase">
                    [in progress]
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
      {selected && (
        <p className="mt-2 text-emerald-300/90 text-[11px]">
          ✓ Will link this post as the answer to the selected question.
        </p>
      )}
    </div>
  );
}
