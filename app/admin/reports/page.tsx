"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Flag, Check, EyeOff, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Report {
  id: string;
  reason: string | null;
  createdAt: string;
  resolvedAt: string | null;
  reporter: { id: string; email: string; label: string };
  comment: {
    id: string;
    content: string;
    status: string;
    createdAt: string;
    postId: string;
    author: { id: string; email: string; label: string };
  };
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "resolved" | "all">("open");
  const [acting, setActing] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  async function handleAction(
    reportId: string,
    action: "dismiss" | "hide-comment",
  ) {
    setActing(reportId);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) fetchReports();
    } catch (err) {
      console.error("Action failed:", err);
    } finally {
      setActing(null);
    }
  }

  // Group reports by comment so a comment with 3 reports reads as
  // one entry with count=3, not three separate rows.
  const byComment = new Map<string, Report[]>();
  for (const r of reports) {
    const existing = byComment.get(r.comment.id) ?? [];
    existing.push(r);
    byComment.set(r.comment.id, existing);
  }
  const grouped = Array.from(byComment.values());

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light flex items-center gap-3">
          <Flag size={20} strokeWidth={1.5} className="text-warm-gold" />
          Reports
        </h1>
        <div className="flex gap-1 bg-white/[0.03] border border-white/10 rounded-lg p-1">
          {(["open", "resolved", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded transition-colors ${
                filter === f
                  ? "bg-warm-gold/20 text-warm-gold"
                  : "text-text-gray hover:text-text-light"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-warm-gold" size={32} />
        </div>
      ) : grouped.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">
            {filter === "open"
              ? "No open reports. All caught up."
              : filter === "resolved"
                ? "Nothing resolved yet."
                : "No reports on record."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map((group) => {
            const first = group[0];
            const count = group.length;
            const isHidden = first.comment.status === "HIDDEN";
            return (
              <div
                key={first.comment.id}
                className={`glass-card rounded-lg p-5 ${
                  isHidden ? "opacity-60" : ""
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 text-warm-gold bg-warm-gold/10 px-2 py-0.5 rounded-full">
                      <Flag size={10} />
                      {count} {count === 1 ? "report" : "reports"}
                    </span>
                    {isHidden && (
                      <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                        <EyeOff size={10} /> Hidden
                      </span>
                    )}
                    <span className="text-text-gray/60">
                      on comment by{" "}
                      <span className="text-text-light">
                        {first.comment.author.label}
                      </span>
                    </span>
                  </div>
                  <Link
                    href={`/consilium/feed/${first.comment.postId}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-text-gray hover:text-warm-gold transition-colors"
                  >
                    View in feed <ExternalLink size={11} />
                  </Link>
                </div>

                {/* Comment content */}
                <div className="rounded-lg bg-deep-black/40 border border-white/5 p-4 mb-3">
                  <p className="text-sm text-text-light whitespace-pre-wrap">
                    {first.comment.content}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-text-gray/50 mt-2">
                    Posted{" "}
                    {formatDistanceToNow(new Date(first.comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                {/* Individual reports (reason + reporter) */}
                <ul className="space-y-1.5 mb-3 text-xs text-text-gray">
                  {group.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-start gap-2 pl-3 border-l border-warm-gold/20"
                    >
                      <span className="text-warm-gold/70">
                        {r.reporter.label}
                      </span>
                      <span className="text-text-gray/40">
                        {formatDistanceToNow(new Date(r.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      {r.reason && (
                        <span className="text-text-gray flex-1">
                         , {r.reason}
                        </span>
                      )}
                      {r.resolvedAt && (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px]">
                          <Check size={10} /> Resolved
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Actions, only on open groups */}
                {filter !== "resolved" && !first.resolvedAt && !isHidden && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleAction(first.id, "hide-comment")}
                      disabled={acting === first.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase text-red-400 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                      <EyeOff size={12} />
                      Hide comment
                    </button>
                    <button
                      onClick={() => handleAction(first.id, "dismiss")}
                      disabled={acting === first.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase text-text-gray hover:text-text-light bg-white/[0.03] border border-white/10 rounded hover:bg-white/[0.05] transition-colors disabled:opacity-50"
                    >
                      <Check size={12} />
                      Dismiss
                    </button>
                    {acting === first.id && (
                      <Loader2
                        size={14}
                        className="animate-spin text-warm-gold ml-2"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
