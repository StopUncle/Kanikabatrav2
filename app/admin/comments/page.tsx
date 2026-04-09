"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Check, X, EyeOff, Clock, CheckCircle, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  status: string;
  createdAt: string;
  post: {
    id: string;
    title: string;
  };
  author: {
    id: string;
    email: string;
    name: string | null;
    displayName: string | null;
  };
}

type FilterTab = "PENDING_REVIEW" | "APPROVED" | "ALL";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("PENDING_REVIEW");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchComments = useCallback(async (status: FilterTab) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments?status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(activeTab);
  }, [activeTab, fetchComments]);

  async function handleAction(id: string, action: "approve" | "reject" | "hide") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchComments(activeTab);
      }
    } catch (err) {
      console.error(`Failed to ${action} comment:`, err);
    } finally {
      setActionLoading(null);
    }
  }

  const tabs: { value: FilterTab; label: string; icon: typeof Clock }[] = [
    { value: "PENDING_REVIEW", label: "Pending", icon: Clock },
    { value: "APPROVED", label: "Approved", icon: CheckCircle },
    { value: "ALL", label: "All", icon: MessageSquare },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-8">
        Comment Moderation
      </h1>

      <div className="flex gap-2 mb-8">
        {tabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide rounded transition-all duration-200 ${
              activeTab === value
                ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                : "text-text-gray border border-white/10 hover:text-text-light hover:border-white/20"
            }`}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : comments.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">No comments to review.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="glass-card rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-accent-gold/80 text-xs uppercase tracking-wider mb-1">
                    On: {comment.post.title}
                  </p>
                  <p className="text-text-light text-sm font-light">
                    {comment.author.displayName || comment.author.name || comment.author.email}
                  </p>
                  <p className="text-text-gray/60 text-xs mt-0.5">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
                    comment.status === "PENDING_REVIEW"
                      ? "bg-amber-500/10 text-amber-400"
                      : comment.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : comment.status === "HIDDEN"
                          ? "bg-zinc-500/10 text-zinc-400"
                          : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {comment.status.replace("_", " ")}
                </span>
              </div>

              <div className="bg-white/[0.02] rounded-md p-4 mb-4">
                <p className="text-text-light/90 text-sm font-light leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {comment.status === "PENDING_REVIEW" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(comment.id, "approve")}
                    disabled={actionLoading === comment.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    {actionLoading === comment.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(comment.id, "reject")}
                    disabled={actionLoading === comment.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <X size={14} />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(comment.id, "hide")}
                    disabled={actionLoading === comment.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-zinc-500/10 text-zinc-400 border border-zinc-500/30 rounded hover:bg-zinc-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <EyeOff size={14} />
                    Hide
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
