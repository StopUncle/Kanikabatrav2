"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import AppComment from "./AppComment";
import AppCommentForm from "./AppCommentForm";
import type { CommentData } from "@/components/consilium/FeedComment";

/**
 * The comment thread under a post, app skin. Fetches the same
 * GET /comments tree the old section used.
 */
export default function AppCommentSection({
  postId,
  isLocked,
}: {
  postId: string;
  isLocked: boolean;
}) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/consilium/feed/${postId}/comments`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load comments");
        return;
      }

      setComments(data.comments);
      setError("");
    } catch {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      {!isLocked ? (
        <div className="mb-5">
          <AppCommentForm postId={postId} onCommentPosted={fetchComments} />
        </div>
      ) : (
        <p className="mb-5 text-app-caption text-[var(--app-dim)]">
          Comments are locked on this post.
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--app-dim)]" />
        </div>
      )}

      {error && (
        <p className="py-4 text-app-caption text-[var(--app-rose)]">{error}</p>
      )}

      {!loading && !error && comments.length === 0 && (
        <div className="py-8 text-center">
          <MessageCircle className="mx-auto mb-2 h-7 w-7 text-[var(--app-dim)] opacity-60" />
          <p className="text-app-caption text-[var(--app-dim)]">
            No comments yet. Be the first.
          </p>
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="divide-y divide-[var(--app-line-soft)]">
          {comments.map((comment) => (
            <AppComment
              key={comment.id}
              comment={comment}
              postId={postId}
              onCommentPosted={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
