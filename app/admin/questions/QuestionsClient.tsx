"use client";

import { useState, useCallback } from "react";
import { Eye, ChevronUp, Mic, Film, Check, X, Pause, MessageSquare, Reply, Send, Loader2 } from "lucide-react";

type Question = {
  id: string;
  content: string;
  isAnonymous: boolean;
  status: "PENDING" | "ANSWERING" | "ANSWERED" | "REJECTED" | "HIDDEN";
  upvoteCount: number;
  createdAt: string;
  answeredAt: string | null;
  rejectionReason: string | null;
  userId: string;
  answerPost: { id: string; title: string; type: string } | null;
};

type Identity = {
  userId: string;
  displayName: string;
  email: string;
  wasAnonymous: boolean;
};

type Tab = "PENDING" | "ANSWERING" | "ANSWERED" | "REJECTED";

interface Props {
  initialQuestions: Question[];
  initialTabCounts: Record<string, number>;
}

export default function QuestionsClient({ initialQuestions, initialTabCounts }: Props) {
  const [tab, setTab] = useState<Tab>("PENDING");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [tabCounts, setTabCounts] = useState(initialTabCounts);
  const [revealed, setRevealed] = useState<Record<string, Identity>>({});
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  // Inline text-reply composer state. Only one composer is open at a
  // time, keyed by questionId.
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyTitle, setReplyTitle] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState<string | null>(null);
  // Orphan-post recovery: when feed-post POST succeeds but the question
  // PATCH fails, we keep the post id around so a retry only re-runs the
  // link step (rather than duplicating the FeedPost). Keyed by question.
  const [orphanPostByQ, setOrphanPostByQ] = useState<Record<string, string>>({});

  const switchTab = useCallback(async (next: Tab) => {
    setTab(next);
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/questions?status=${next}`);
      const body = await r.json();
      setQuestions(body.questions ?? []);
      setTabCounts(body.tabCounts ?? {});
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    const r = await fetch(`/api/admin/questions?status=${tab}`);
    const body = await r.json();
    setQuestions(body.questions ?? []);
    setTabCounts(body.tabCounts ?? {});
  }, [tab]);

  const reveal = useCallback(async (id: string) => {
    setBusy(id);
    try {
      const r = await fetch(`/api/admin/questions/${id}/reveal`, { method: "POST" });
      if (!r.ok) return;
      const body = (await r.json()) as Identity;
      setRevealed((prev) => ({ ...prev, [id]: body }));
    } finally {
      setBusy(null);
    }
  }, []);

  const openReply = useCallback((q: Question) => {
    // Pre-fill title with a short question stub so the feed entry reads
    // as "Q: ..." in scroll without Kanika needing to think about it.
    // She can blow it away if she wants something else.
    const stub = q.content.length > 80 ? q.content.slice(0, 80).trimEnd() + "…" : q.content;
    setReplyingId(q.id);
    setReplyTitle(`Q: ${stub}`);
    // Body pre-fills with the question quoted, blank line, ready for
    // her answer. Members reading the feed see the question they're
    // looking at the answer to without us needing to fetch it.
    setReplyBody(`"${q.content}"\n\n`);
    setReplyError(null);
  }, []);

  const cancelReply = useCallback(() => {
    setReplyingId(null);
    setReplyTitle("");
    setReplyBody("");
    setReplyError(null);
  }, []);

  // Two-step publish: create the FeedPost (ANNOUNCEMENT), then link it
  // to the question. If step 2 fails, keep the post id so a retry
  // doesn't duplicate the post in the feed.
  const submitReply = useCallback(
    async (questionId: string) => {
      if (busy === questionId) return;
      const trimmedTitle = replyTitle.trim();
      const trimmedBody = replyBody.trim();
      if (trimmedTitle.length === 0 || trimmedBody.length === 0) {
        setReplyError("Title and answer are both required.");
        return;
      }
      setBusy(questionId);
      setReplyError(null);

      // Step 1, create the FeedPost (skip if we already have an orphan
      // from a previous attempt that only failed at step 2).
      let answerPostId = orphanPostByQ[questionId] ?? null;
      if (!answerPostId) {
        try {
          const res = await fetch("/api/consilium/feed/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: trimmedTitle,
              content: trimmedBody,
              type: "ANNOUNCEMENT",
            }),
          });
          if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            setReplyError(errBody.error ?? "Failed to publish the post.");
            setBusy(null);
            return;
          }
          const body = await res.json();
          answerPostId = body.post?.id ?? body.id ?? null;
          if (!answerPostId) {
            setReplyError("Post created but no id returned. Refresh and try again.");
            setBusy(null);
            return;
          }
        } catch {
          setReplyError("Couldn't reach the server. Try again.");
          setBusy(null);
          return;
        }
      }

      // Step 2, link as the answer to this question.
      try {
        const res = await fetch(`/api/admin/questions/${questionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answerPostId }),
        });
        if (!res.ok) {
          // Keep the post id so the retry doesn't duplicate the post.
          setOrphanPostByQ((prev) => ({ ...prev, [questionId]: answerPostId! }));
          const errBody = await res.json().catch(() => ({}));
          setReplyError(
            errBody.error
              ? `Posted, but couldn't link as answer: ${errBody.error}. Retry to link.`
              : "Posted, but couldn't link as answer. Retry to link.",
          );
          setBusy(null);
          return;
        }
      } catch {
        setOrphanPostByQ((prev) => ({ ...prev, [questionId]: answerPostId! }));
        setReplyError("Posted, but couldn't link as answer. Retry to link.");
        setBusy(null);
        return;
      }

      // Success, clear orphan, close composer, refresh queue (the question
      // moves to the ANSWERED tab).
      setOrphanPostByQ((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      setReplyingId(null);
      setReplyTitle("");
      setReplyBody("");
      setReplyError(null);
      setBusy(null);
      await refresh();
    },
    [busy, replyTitle, replyBody, orphanPostByQ, refresh],
  );

  const setStatus = useCallback(
    async (id: string, status: Tab | "HIDDEN", reason?: string) => {
      setBusy(id);
      try {
        const r = await fetch(`/api/admin/questions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            rejectionReason: reason,
          }),
        });
        if (r.ok) await refresh();
      } finally {
        setBusy(null);
      }
    },
    [refresh],
  );

  return (
    <div className="text-text-light">
      <h1 className="text-2xl font-light tracking-wider uppercase mb-1">Ask Kanika</h1>
      <p className="text-text-gray/70 text-sm mb-6">
        Member-submitted questions. Sorted by upvotes, top of the list is what the
        community wants to hear most.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-warm-gold/15 overflow-x-auto">
        {(["PENDING", "ANSWERING", "ANSWERED", "REJECTED"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase border-b-2 transition ${
              tab === t
                ? "border-warm-gold text-warm-gold"
                : "border-transparent text-text-gray/60 hover:text-warm-gold/80"
            }`}
          >
            {t} ({tabCounts[t] ?? 0})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-text-gray/60 text-sm py-8 text-center">Loading…</p>
      ) : questions.length === 0 ? (
        <p className="text-text-gray/60 text-sm py-8 text-center italic">
          No questions in this tab yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => {
            const ident = revealed[q.id];
            return (
              <li
                key={q.id}
                className="rounded-xl border border-warm-gold/20 bg-deep-black/50 p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Vote count column */}
                  <div className="shrink-0 flex flex-col items-center min-w-[42px] py-1.5 rounded-md bg-warm-gold/5">
                    <ChevronUp size={14} strokeWidth={2.2} className="text-warm-gold/80" />
                    <span className="text-warm-gold text-sm font-semibold tabular-nums leading-tight">
                      {q.upvoteCount}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-text-light text-[14px] leading-relaxed">
                      {q.content}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-gray/55">
                      <span>
                        {new Date(q.createdAt).toLocaleString()}
                      </span>
                      {q.isAnonymous ? (
                        <span className="inline-flex items-center gap-2">
                          {ident ? (
                            <span className="text-amber-300/80">
                              {ident.displayName} ({ident.email}), was anonymous
                            </span>
                          ) : (
                            <>
                              <span>Anonymous</span>
                              <button
                                onClick={() => reveal(q.id)}
                                disabled={busy === q.id}
                                className="inline-flex items-center gap-1 text-text-gray/55 hover:text-warm-gold"
                              >
                                <Eye size={11} />
                                Show identity
                              </button>
                            </>
                          )}
                        </span>
                      ) : (
                        <span>
                          {ident ? `${ident.displayName} (${ident.email})` : "Attributed"}
                          {!ident && (
                            <button
                              onClick={() => reveal(q.id)}
                              disabled={busy === q.id}
                              className="ml-2 inline-flex items-center gap-1 text-text-gray/55 hover:text-warm-gold"
                            >
                              <Eye size={11} />
                              Show
                            </button>
                          )}
                        </span>
                      )}
                      {q.answerPost && (
                        <a
                          href={`/consilium/feed#post-${q.answerPost.id}`}
                          className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200"
                        >
                          {q.answerPost.type === "VIDEO" ? (
                            <Film size={11} />
                          ) : q.answerPost.type === "VOICE_NOTE" ? (
                            <Mic size={11} />
                          ) : (
                            <MessageSquare size={11} />
                          )}
                          {q.answerPost.title.slice(0, 40)}
                        </a>
                      )}
                    </div>

                    {/* Actions row */}
                    {q.status !== "ANSWERED" && replyingId !== q.id && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => openReply(q)}
                          disabled={busy === q.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 text-[11px] tracking-wider uppercase font-medium border border-emerald-400/30 transition"
                        >
                          <Reply size={12} />
                          Reply with text
                        </button>
                        {q.status === "PENDING" && (
                          <button
                            onClick={() => setStatus(q.id, "ANSWERING")}
                            disabled={busy === q.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-[11px] tracking-wider uppercase font-medium border border-amber-400/30 transition"
                            title="Reserve for a voice note or video answer"
                          >
                            <Pause size={12} />
                            Mark answering
                          </button>
                        )}
                        {q.status === "ANSWERING" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/10 text-amber-300 text-[11px] tracking-wider uppercase font-medium border border-amber-400/30">
                            <MessageSquare size={12} />
                            Awaiting voice/video answer
                          </span>
                        )}
                        {q.status !== "REJECTED" && (
                          <button
                            onClick={() => {
                              const reason = prompt("Reason (optional)", q.rejectionReason ?? "") ?? undefined;
                              setStatus(q.id, "REJECTED", reason);
                            }}
                            disabled={busy === q.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] tracking-wider uppercase font-medium border border-rose-500/30 transition"
                          >
                            <X size={12} />
                            Reject
                          </button>
                        )}
                      </div>
                    )}

                    {/* Inline reply composer — opens above the actions row. */}
                    {replyingId === q.id && (
                      <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/[0.04] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-emerald-300/90 text-[10px] font-semibold tracking-[0.25em] uppercase">
                            Reply with text
                          </p>
                          <button
                            type="button"
                            onClick={cancelReply}
                            disabled={busy === q.id}
                            className="text-text-gray/60 hover:text-warm-gold text-[11px] underline"
                          >
                            Cancel
                          </button>
                        </div>
                        <input
                          type="text"
                          value={replyTitle}
                          onChange={(e) => setReplyTitle(e.target.value.slice(0, 200))}
                          disabled={busy === q.id}
                          placeholder="Title for the feed post"
                          className="w-full rounded-md border border-warm-gold/20 bg-deep-black/60 px-3 py-2 text-text-light text-[13px] focus:outline-none focus:border-warm-gold/50"
                          maxLength={200}
                        />
                        <textarea
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value.slice(0, 10_000))}
                          disabled={busy === q.id}
                          placeholder="Your answer…"
                          rows={6}
                          className="w-full rounded-md border border-warm-gold/20 bg-deep-black/60 px-3 py-2 text-text-light text-[13px] leading-relaxed focus:outline-none focus:border-warm-gold/50 resize-y"
                        />
                        {replyError && (
                          <p className="text-[12px] text-rose-300/90">{replyError}</p>
                        )}
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-text-gray/50 text-[11px]">
                            Plain text. Line breaks render. Posts to feed, links as the answer, asker is emailed and pushed.
                          </span>
                          <button
                            type="button"
                            onClick={() => submitReply(q.id)}
                            disabled={
                              busy === q.id ||
                              replyTitle.trim().length === 0 ||
                              replyBody.trim().length === 0
                            }
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-300 text-[11px] tracking-[0.18em] uppercase font-semibold border border-emerald-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {busy === q.id ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                Publishing…
                              </>
                            ) : orphanPostByQ[q.id] ? (
                              <>
                                <Send size={12} />
                                Retry link
                              </>
                            ) : (
                              <>
                                <Send size={12} />
                                Reply &amp; publish
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    {q.status === "REJECTED" && (
                      <div className="mt-3 text-[11px] text-rose-300/70">
                        Rejected{q.rejectionReason ? `, ${q.rejectionReason}` : ""}
                        <button
                          onClick={() => setStatus(q.id, "PENDING")}
                          disabled={busy === q.id}
                          className="ml-3 inline-flex items-center gap-1 text-text-gray/60 hover:text-warm-gold"
                        >
                          <Check size={11} />
                          Restore to pending
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
