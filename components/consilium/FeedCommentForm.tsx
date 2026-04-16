"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface FeedCommentFormProps {
  postId: string;
  parentId?: string;
  onCommentPosted: () => void;
  placeholder?: string;
  compact?: boolean;
}

export default function FeedCommentForm({
  postId,
  parentId,
  onCommentPosted,
  placeholder = "Share your thoughts...",
  compact = false,
}: FeedCommentFormProps) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "pending" | "error">("idle");
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
          className="mobile-input flex-1 bg-deep-black/50 border border-accent-gold/20 rounded-xl px-3 py-2.5 text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 resize-none transition-all"
        />
        <button
          type="submit"
          disabled={!content.trim() || status === "submitting"}
          aria-label="Post comment"
          className="self-end p-3 rounded-full bg-accent-gold text-deep-black font-medium hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tap-target"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {status === "pending" && (
        <p className="text-xs text-accent-gold mt-2">
          Comment submitted for review
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-400 mt-2">{errorMessage}</p>
      )}
    </form>
  );
}
