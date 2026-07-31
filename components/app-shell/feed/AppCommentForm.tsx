"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * Comment composer in the app skin. Same API contract as the old
 * FeedCommentForm (POST /comments, PENDING_REVIEW notice on moderated
 * posts); only the clothes changed.
 */
export default function AppCommentForm({
  postId,
  parentId,
  onCommentPosted,
  placeholder = "Say something...",
  compact = false,
}: {
  postId: string;
  parentId?: string;
  onCommentPosted: () => void;
  placeholder?: string;
  compact?: boolean;
}) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "pending" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`/api/consilium/feed/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed, parentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to post comment");
        setStatus("error");
        return;
      }

      setContent("");

      if (data.comment?.status === "PENDING_REVIEW") {
        setStatus("pending");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("idle");
      }

      onCommentPosted();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={compact ? 1 : 2}
          maxLength={2000}
          enterKeyHint="send"
          autoCapitalize="sentences"
          autoComplete="off"
          className="mobile-input flex-1 resize-none rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3.5 py-2.5 text-app-body text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:border-[var(--app-line)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!content.trim() || status === "submitting"}
          aria-label="Post comment"
          className="tap-target self-end rounded-full bg-[var(--app-gold)] p-3 text-[var(--app-black)] disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {status === "pending" && (
        <p className="mt-2 text-app-eyebrow text-[var(--app-gold)]">
          Submitted. Kanika reviews it before it shows.
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-app-eyebrow text-[var(--app-rose)]">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
