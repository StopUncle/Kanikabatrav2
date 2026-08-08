"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronUp, Mic, Film, MessageSquare, ArrowUpRight } from "lucide-react";
import { Card, SectionHeader } from "@/components/app-shell/ui";
import { useShellRoutes } from "@/lib/shell-routes";
import { haptic } from "@/lib/haptics";

/**
 * Ask Kanika, app-native.
 *
 * The old skin renders this as a portaled modal launched from a pill above
 * the consilium feed: one tall scroll holding three stacked sections, in
 * the marketing palette (warm-gold, text-light, 10px letterspaced
 * headings). This is the same feature and the same endpoints wearing the
 * app's own surface: Card, SectionHeader, the --app-* palette and the app
 * type scale, laid out as a page rather than something that appears over
 * one.
 *
 * The data arrives from the server on first paint. The modal fetched on
 * open and showed a spinner, which is the right trade for something that
 * opens in front of you and the wrong one for a page you navigated to.
 */

type AnswerPost = {
  id: string;
  title: string;
  type: string;
  voiceNoteUrl: string | null;
  videoUrl: string | null;
};

export type MyQuestionView = {
  id: string;
  content: string;
  status: string;
  answeredAt: string | null;
  createdAt: string;
  answerPost: AnswerPost | null;
};

export type QueueView = {
  id: string;
  content: string;
  upvoteCount: number;
  createdAt: string;
  hasUpvoted: boolean;
  isMine: boolean;
  author: string | null;
};

export type CooldownView = {
  allowed: boolean;
  nextAvailableAt?: string | null;
  remainingToday: number;
  dailyCap: number;
};

interface Props {
  initialCooldown: CooldownView;
  initialMine: MyQuestionView[];
  initialQueue: QueueView[];
  maxLength: number;
  isAdmin: boolean;
}

const MIN_LENGTH = 10;
const UNREAD_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

export default function AskKanikaClient({
  initialCooldown,
  initialMine,
  initialQueue,
  maxLength,
  isAdmin,
}: Props) {
  const router = useRouter();
  const routes = useShellRoutes();

  const [cooldown, setCooldown] = useState(initialCooldown);
  const [mine, setMine] = useState(initialMine);
  const [queue, setQueue] = useState(initialQueue);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSent, setJustSent] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Only ticks while a countdown is actually on screen. The modal ran this
  // interval the whole time it was open; a page can be left open for hours.
  const locked = !cooldown.allowed && Boolean(cooldown.nextAvailableAt);
  useEffect(() => {
    if (!locked) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [locked]);

  const submit = useCallback(async () => {
    const trimmed = content.trim();
    if (submitting || trimmed.length < MIN_LENGTH) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/consilium/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed, isAnonymous }),
      });
      const body = await r.json();
      if (!r.ok) {
        setError(body.error ?? "Something went wrong.");
        if (body.nextAvailableAt) {
          setCooldown((c) => ({
            ...c,
            allowed: false,
            nextAvailableAt: body.nextAvailableAt,
            remainingToday: 0,
          }));
        }
        return;
      }
      haptic("success");
      setJustSent(true);
      setContent("");
      setIsAnonymous(false);
      if (body.cooldown) setCooldown(body.cooldown);
      // Pull the queue and history back down so the new question appears
      // where it will actually live rather than in a local guess.
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  }, [content, isAnonymous, submitting, router]);

  const toggleVote = useCallback(async (id: string) => {
    let reverted = false;
    const flip = (q: QueueView) => ({
      ...q,
      hasUpvoted: !q.hasUpvoted,
      upvoteCount: q.hasUpvoted ? q.upvoteCount - 1 : q.upvoteCount + 1,
    });
    setQueue((prev) => prev.map((q) => (q.id === id ? flip(q) : q)));
    try {
      const r = await fetch(`/api/consilium/questions/${id}/upvote`, {
        method: "POST",
      });
      if (!r.ok) throw new Error("vote failed");
      const body = (await r.json()) as { upvoted: boolean; upvoteCount: number };
      // The route reconciles concurrent double-taps and returns the
      // authoritative count, so take its word over the optimistic one.
      setQueue((prev) =>
        prev.map((q) =>
          q.id === id
            ? { ...q, hasUpvoted: body.upvoted, upvoteCount: body.upvoteCount }
            : q,
        ),
      );
    } catch {
      reverted = true;
      setQueue((prev) => prev.map((q) => (q.id === id ? flip(q) : q)));
    }
    if (!reverted) haptic("tick");
  }, []);

  const answered = mine.filter(
    (q) =>
      q.status === "ANSWERED" &&
      q.answeredAt &&
      Date.now() - new Date(q.answeredAt).getTime() < UNREAD_WINDOW_MS,
  );
  const pendingMine = mine.filter(
    (q) => q.status === "PENDING" || q.status === "ANSWERING",
  );

  const trimmedLength = content.trim().length;
  const tooShort = trimmedLength > 0 && trimmedLength < MIN_LENGTH;
  const msLeft = cooldown.nextAvailableAt
    ? Math.max(0, new Date(cooldown.nextAvailableAt).getTime() - now)
    : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Answered first. It is the reason to come back, so it does not sit
          below a composer and a queue waiting to be scrolled to. */}
      {answered.length > 0 && (
        <section>
          <SectionHeader eyebrow="She answered you" tone="gold" />
          <div className="mt-2 flex flex-col gap-2">
            {answered.map((q) => (
              <Card
                key={q.id}
                tone="gold"
                className="border-[var(--app-green)]/35"
              >
                <p className="text-app-caption italic leading-relaxed text-[var(--app-muted)]">
                  &ldquo;{q.content}&rdquo;
                </p>
                {q.answerPost && (
                  <Link
                    href={routes.feedPost(q.answerPost.id)}
                    className="mt-3 inline-flex items-center gap-2 text-app-tiny uppercase tracking-app-label text-[var(--app-green)]"
                  >
                    {q.answerPost.type === "VIDEO" ? (
                      <>
                        <Film size={13} />
                        Watch the answer
                      </>
                    ) : q.answerPost.type === "VOICE_NOTE" ? (
                      <>
                        <Mic size={13} />
                        Listen to the answer
                      </>
                    ) : (
                      <>
                        <MessageSquare size={13} />
                        Read the answer
                      </>
                    )}
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* The composer, or the wait. */}
      <section>
        <SectionHeader
          eyebrow="Your question"
          action={
            cooldown.dailyCap > 1 && cooldown.allowed ? (
              <span className="text-app-tiny tabular-nums text-[var(--app-dim)]">
                {cooldown.remainingToday} left today
              </span>
            ) : undefined
          }
        />

        <div className="mt-2">
          {justSent ? (
            <Card tone="gold">
              <p className="text-app-body text-[var(--app-gold)]">
                It is in front of her.
              </p>
              <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
                Answers arrive as voice notes and videos. You will get an
                email and a notification when yours lands.
              </p>
              <button
                type="button"
                onClick={() => setJustSent(false)}
                className="mt-3 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)]"
              >
                Ask another
              </button>
            </Card>
          ) : locked ? (
            <Card tone="quiet">
              <p className="text-app-body text-[var(--app-text)]">
                {cooldown.dailyCap === 1
                  ? "You have used today's question."
                  : "You have used all of today's questions."}
              </p>
              <p className="mt-1 text-app-caption tabular-nums text-[var(--app-gold-soft)]">
                Next one opens in {formatCountdown(msLeft)}
              </p>
              <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-muted)]">
                One a day is the whole point. It is the difference between a
                question and a stream of them.
              </p>
            </Card>
          ) : (
            <Card>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
                placeholder="Ask her anything. The best ones become voice notes."
                rows={4}
                disabled={submitting}
                aria-label="Your question"
                className="w-full resize-none bg-transparent text-app-body leading-relaxed text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:outline-none"
              />

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--app-line-soft)] pt-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAnonymous}
                  onClick={() => setIsAnonymous((v) => !v)}
                  disabled={submitting}
                  className="flex items-center gap-2 text-app-caption text-[var(--app-muted)]"
                >
                  <span
                    className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${
                      isAnonymous
                        ? "border-[var(--app-gold-soft)] bg-[var(--app-gold)]/20"
                        : "border-[var(--app-line)] bg-[var(--app-card-2)]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                        isAnonymous
                          ? "left-[calc(100%-1rem-0.125rem)] bg-[var(--app-gold)]"
                          : "left-0.5 bg-[var(--app-dim)]"
                      }`}
                    />
                  </span>
                  Ask anonymously
                </button>
                <span
                  className={`text-app-tiny tabular-nums ${
                    maxLength - trimmedLength < 50
                      ? "text-amber-400/80"
                      : "text-[var(--app-dim)]"
                  }`}
                >
                  {trimmedLength}/{maxLength}
                </span>
              </div>

              {isAnonymous && (
                <p className="mt-2 text-app-tiny leading-relaxed text-[var(--app-dim)]">
                  Your name is hidden from other members and from the answer.
                  Kanika can still see who asked.
                </p>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-2 text-app-caption text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={submitting || trimmedLength < MIN_LENGTH}
                className="mt-3 w-full rounded-full bg-[var(--app-gold)] py-3 text-app-tiny uppercase tracking-app-label text-[var(--app-on-gold)] transition-opacity disabled:opacity-40"
              >
                {submitting ? "Sending…" : "Send it to Kanika"}
              </button>
              {tooShort && (
                <p className="mt-2 text-center text-app-tiny text-[var(--app-dim)]">
                  A few more words. {MIN_LENGTH} characters minimum.
                </p>
              )}
            </Card>
          )}
        </div>
      </section>

      {/* Their own open questions. The modal never showed these, so a
          member who asked yesterday had no way to see it was still in the
          queue and no reason to believe it had gone anywhere. */}
      {pendingMine.length > 0 && (
        <section>
          <SectionHeader eyebrow="Waiting on her" />
          <div className="mt-2 flex flex-col gap-2">
            {pendingMine.map((q) => (
              <Card key={q.id} tone="quiet" pad="tight">
                <p className="text-app-caption leading-relaxed text-[var(--app-muted)]">
                  {q.content}
                </p>
                <p className="mt-1.5 text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
                  {q.status === "ANSWERING" ? "She is on it" : "In the queue"}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* The queue. */}
      <section>
        <SectionHeader
          eyebrow="What everyone is asking"
          action={
            isAdmin ? (
              <a
                href="/admin/questions"
                className="inline-flex items-center gap-1 text-app-tiny uppercase tracking-app-label text-[var(--app-green)]"
              >
                Manage
                <ArrowUpRight size={11} />
              </a>
            ) : undefined
          }
        />
        <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
          Upvote the ones you want answered. The top of this list is what she
          records next.
        </p>

        {queue.length === 0 ? (
          <Card tone="quiet" className="mt-2">
            <p className="text-app-caption text-[var(--app-dim)]">
              Nothing in the queue. Yours would be first.
            </p>
          </Card>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {queue.map((q) => (
              <li key={q.id}>
                <Card pad="tight">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleVote(q.id)}
                      disabled={q.isMine}
                      aria-label={
                        q.isMine
                          ? "You cannot upvote your own question"
                          : q.hasUpvoted
                            ? "Remove upvote"
                            : "Upvote this question"
                      }
                      aria-pressed={q.hasUpvoted}
                      className={`flex min-w-[38px] shrink-0 flex-col items-center rounded-xl border py-1.5 transition-colors ${
                        q.hasUpvoted
                          ? "border-[var(--app-gold-soft)] bg-[var(--app-gold)]/15 text-[var(--app-gold)]"
                          : "border-[var(--app-line)] text-[var(--app-muted)]"
                      } ${q.isMine ? "opacity-40" : ""}`}
                    >
                      <ChevronUp size={14} strokeWidth={2.2} />
                      <span className="mt-0.5 text-app-tiny font-semibold tabular-nums leading-none">
                        {q.upvoteCount}
                      </span>
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-app-body leading-relaxed text-[var(--app-text)]">
                        {q.content}
                      </p>
                      <p className="mt-1 text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
                        {q.author ?? "Anonymous"}
                        {q.isMine && " · yours"}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "any moment";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
