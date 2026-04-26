"use client";

import { useState, useCallback } from "react";
import { Eye, ChevronUp, Mic, Film, Check, X, Pause, MessageSquare } from "lucide-react";

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
        Member-submitted questions. Sorted by upvotes — top of the list is what the
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
                              {ident.displayName} ({ident.email}) — was anonymous
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
                          {q.answerPost.type === "VIDEO" ? <Film size={11} /> : <Mic size={11} />}
                          {q.answerPost.title.slice(0, 40)}
                        </a>
                      )}
                    </div>

                    {/* Actions row */}
                    {q.status !== "ANSWERED" && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {q.status === "PENDING" && (
                          <button
                            onClick={() => setStatus(q.id, "ANSWERING")}
                            disabled={busy === q.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-[11px] tracking-wider uppercase font-medium border border-amber-400/30 transition"
                          >
                            <Pause size={12} />
                            Mark answering
                          </button>
                        )}
                        {q.status === "ANSWERING" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/10 text-amber-300 text-[11px] tracking-wider uppercase font-medium border border-amber-400/30">
                            <MessageSquare size={12} />
                            In progress — link an answering voice/video to mark done
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
                    {q.status === "REJECTED" && (
                      <div className="mt-3 text-[11px] text-rose-300/70">
                        Rejected{q.rejectionReason ? ` — ${q.rejectionReason}` : ""}
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
