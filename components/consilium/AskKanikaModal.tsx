"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronUp, Mic, Film } from "lucide-react";

type AnswerPost = {
  id: string;
  title: string;
  type: "VOICE_NOTE" | "VIDEO" | "AUTOMATED" | "ANNOUNCEMENT" | "DISCUSSION_PROMPT";
  voiceNoteUrl: string | null;
  videoUrl: string | null;
};

type MyQuestion = {
  id: string;
  content: string;
  status: "PENDING" | "ANSWERING" | "ANSWERED" | "REJECTED" | "HIDDEN";
  answeredAt: string | null;
  createdAt: string;
  answerPost: AnswerPost | null;
};

type CooldownState = {
  allowed: boolean;
  nextAvailableAt?: string;
  remainingToday: number;
  dailyCap: number;
};

type QueueItem = {
  id: string;
  content: string;
  upvoteCount: number;
  createdAt: string;
  hasUpvoted: boolean;
  isMine: boolean;
  author: string | null;
};

interface Props {
  /** When true, the modal is mounted and visible. */
  open: boolean;
  /** Called when the user closes the modal (X / backdrop / escape).
   *  Parent should refetch /me state on close so the pill reflects
   *  any submission or vote that just happened. */
  onClose: () => void;
}

/**
 * The Ask Kanika modal. Single tall scrollable view that stacks three
 * sections so members can do everything in one trip:
 *
 *   1. KANIKA ANSWERED — only renders if member has an unread answer.
 *      Front-loaded because it's the dopamine moment.
 *   2. ASK — submit form, or cooldown message + countdown if used today.
 *   3. TOP VOTED — pending queue, upvote-able.
 *
 * All three pieces share a single fetch on open so the modal feels
 * instant. We don't poll while open — a single load is enough for a
 * ~30s session.
 */
export default function AskKanikaModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<CooldownState | null>(null);
  const [myQuestions, setMyQuestions] = useState<MyQuestion[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const dialogRef = useRef<HTMLDivElement>(null);

  // Single fetch on open. /me + /list run in parallel.
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    Promise.all([
      fetch("/api/consilium/questions/me").then((r) => r.json()),
      fetch("/api/consilium/questions").then((r) => r.json()),
    ])
      .then(([me, list]) => {
        setCooldown(me.cooldown ?? null);
        setMyQuestions(me.questions ?? []);
        setQueue(list.questions ?? []);
      })
      .catch(() => {
        // Soft-fail. The modal still opens; sections that have no data
        // render their empty states.
      })
      .finally(() => setLoading(false));
  }, [open]);

  // Live "now" tick for the countdown. 1s is fine; this doesn't render
  // expensive children.
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [open]);

  // Reset transient form state when modal closes.
  useEffect(() => {
    if (!open) {
      setContent("");
      setIsAnonymous(false);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [open]);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const r = await fetch("/api/consilium/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), isAnonymous }),
      });
      const body = await r.json();
      if (!r.ok) {
        setSubmitError(body.error ?? "Something went wrong");
      } else {
        setSubmitSuccess(true);
        setContent("");
        setIsAnonymous(false);
        if (body.cooldown) setCooldown(body.cooldown);
      }
    } catch {
      setSubmitError("Couldn't reach the server");
    } finally {
      setSubmitting(false);
    }
  }, [content, isAnonymous, submitting]);

  const toggleVote = useCallback(async (questionId: string) => {
    // Optimistic flip — reverted on failure.
    setQueue((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              hasUpvoted: !q.hasUpvoted,
              upvoteCount: q.hasUpvoted ? q.upvoteCount - 1 : q.upvoteCount + 1,
            }
          : q,
      ),
    );
    try {
      const r = await fetch(`/api/consilium/questions/${questionId}/upvote`, {
        method: "POST",
      });
      if (!r.ok) throw new Error("vote failed");
      const body = (await r.json()) as { upvoted: boolean; upvoteCount: number };
      setQueue((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, hasUpvoted: body.upvoted, upvoteCount: body.upvoteCount }
            : q,
        ),
      );
    } catch {
      // Revert on failure.
      setQueue((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                hasUpvoted: !q.hasUpvoted,
                upvoteCount: q.hasUpvoted ? q.upvoteCount - 1 : q.upvoteCount + 1,
              }
            : q,
        ),
      );
    }
  }, []);

  // Mount guard: createPortal needs document, which doesn't exist on the
  // server. Render nothing until the component is hydrated client-side.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
  const unreadAnswered = myQuestions.filter(
    (q) => q.status === "ANSWERED" && q.answeredAt && new Date(q.answeredAt).getTime() > fourteenDaysAgo,
  );

  const cooldownMs =
    cooldown?.nextAvailableAt
      ? Math.max(0, new Date(cooldown.nextAvailableAt).getTime() - now)
      : 0;
  const remainingChars = 500 - content.trim().length;

  return createPortal(
    <div
      // Portaled to document.body so we escape any ancestor with `transform`
      // / `backdrop-blur` / `will-change`, which would otherwise become the
      // containing block for `position: fixed` and clip the modal to the
      // feed column. Without this, the header gets cropped above the
      // viewport on the consilium feed page.
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-deep-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Kanika"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-warm-gold/25 bg-deep-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-warm-gold/15 bg-deep-black/95 backdrop-blur">
          <div>
            <h2 className="text-warm-gold text-xs font-semibold tracking-[0.3em] uppercase">
              Ask Kanika
            </h2>
            <p className="text-text-gray/70 text-[11px] mt-0.5">
              Kanika reads every question. The best ones become voice notes and video answers.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-text-gray/60 hover:text-warm-gold hover:bg-warm-gold/10 transition"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-7">
          {/* SECTION 1 — Answered notification (only if relevant) */}
          {unreadAnswered.length > 0 && (
            <section>
              <h3 className="text-emerald-300/90 text-[10px] font-semibold tracking-[0.25em] uppercase mb-3">
                Kanika answered you
              </h3>
              <div className="space-y-2">
                {unreadAnswered.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-3.5"
                  >
                    <p className="text-text-gray/80 text-[12px] mb-2 italic line-clamp-2">
                      &ldquo;{q.content}&rdquo;
                    </p>
                    {q.answerPost && (
                      <a
                        href={`/consilium/feed#post-${q.answerPost.id}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-[12px] font-medium tracking-wider uppercase"
                      >
                        {q.answerPost.type === "VIDEO" ? (
                          <Film size={13} />
                        ) : (
                          <Mic size={13} />
                        )}
                        Watch the answer
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2 — Ask form / cooldown */}
          <section>
            <h3 className="text-warm-gold/80 text-[10px] font-semibold tracking-[0.25em] uppercase mb-3">
              Your Question
            </h3>

            {submitSuccess ? (
              <div className="rounded-lg border border-warm-gold/30 bg-warm-gold/5 p-4 text-center">
                <p className="text-warm-gold text-sm font-medium mb-1">Question received.</p>
                <p className="text-text-gray/70 text-[12px]">
                  Watch for your answer in upcoming voice notes or videos.
                </p>
              </div>
            ) : cooldown && !cooldown.allowed ? (
              <div className="rounded-lg border border-warm-gold/15 bg-warm-gold/[0.03] p-4 text-center">
                <p className="text-text-gray/80 text-sm mb-1">
                  You&rsquo;ve used today&rsquo;s question.
                </p>
                <p className="text-warm-gold/90 text-[12px] tracking-wider tabular-nums">
                  Next slot opens in {formatCountdown(cooldownMs)}
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, 500))}
                  placeholder="Ask anything. The best questions become voice notes."
                  rows={4}
                  disabled={submitting || loading}
                  className="w-full rounded-lg border border-warm-gold/20 bg-deep-black/60 px-3 py-2.5 text-text-light text-sm placeholder:text-text-gray/40 focus:outline-none focus:border-warm-gold/50 resize-none"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <label className="flex items-center gap-2 text-text-gray/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      disabled={submitting}
                      className="accent-warm-gold"
                    />
                    Submit anonymously
                  </label>
                  <span
                    className={`tabular-nums ${remainingChars < 50 ? "text-amber-400/80" : "text-text-gray/50"}`}
                  >
                    {500 - remainingChars}/500
                  </span>
                </div>
                {submitError && (
                  <p className="mt-2 text-[12px] text-rose-400/90">{submitError}</p>
                )}
                <button
                  onClick={submit}
                  disabled={
                    submitting ||
                    loading ||
                    content.trim().length < 10 ||
                    content.trim().length > 500
                  }
                  className="mt-3 w-full rounded-lg bg-warm-gold/90 hover:bg-warm-gold text-deep-black font-semibold text-[12px] tracking-[0.2em] uppercase py-2.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Submit question"}
                </button>
              </div>
            )}
          </section>

          {/* SECTION 3 — Top voted queue */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-warm-gold/80 text-[10px] font-semibold tracking-[0.25em] uppercase">
                Top Questions This Week
              </h3>
              <span className="text-text-gray/50 text-[10px]">
                Tap ⬆ to upvote questions you want answered
              </span>
            </div>
            {loading ? (
              <p className="text-text-gray/50 text-[12px]">Loading…</p>
            ) : queue.length === 0 ? (
              <p className="text-text-gray/60 text-[12px] italic">
                No questions in the queue yet. Be the first to ask.
              </p>
            ) : (
              <ul className="space-y-2">
                {queue.map((q) => (
                  <li
                    key={q.id}
                    className="flex items-start gap-3 rounded-lg border border-warm-gold/10 hover:border-warm-gold/25 p-3 transition"
                  >
                    <button
                      onClick={() => toggleVote(q.id)}
                      disabled={q.isMine}
                      aria-label={q.hasUpvoted ? "Remove upvote" : "Upvote"}
                      className={`shrink-0 flex flex-col items-center justify-center min-w-[36px] py-1.5 rounded-md transition ${
                        q.hasUpvoted
                          ? "bg-warm-gold/15 text-warm-gold"
                          : "bg-warm-gold/5 text-text-gray/60 hover:bg-warm-gold/10 hover:text-warm-gold"
                      } ${q.isMine ? "cursor-not-allowed opacity-50" : ""}`}
                      title={q.isMine ? "You can't upvote your own question" : ""}
                    >
                      <ChevronUp size={14} strokeWidth={2.2} />
                      <span className="text-[11px] font-semibold tabular-nums leading-none mt-0.5">
                        {q.upvoteCount}
                      </span>
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-light text-[13px] leading-relaxed">
                        {q.content}
                      </p>
                      <p className="mt-1 text-text-gray/50 text-[10px] tracking-wider uppercase">
                        {q.author ?? "Anonymous"}
                        {q.isMine && " · yours"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "any moment";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
