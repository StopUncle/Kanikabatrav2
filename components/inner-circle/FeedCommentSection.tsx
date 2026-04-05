"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import FeedComment, { type CommentData } from "./FeedComment";
import FeedCommentForm from "./FeedCommentForm";

interface FeedCommentSectionProps {
  postId: string;
  isLocked: boolean;
}

export default function FeedCommentSection({ postId, isLocked }: FeedCommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/inner-circle/feed/${postId}/comments`);
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
      {!isLocked && (
        <div className="mb-6">
          <FeedCommentForm postId={postId} onCommentPosted={fetchComments} />
        </div>
      )}

      {isLocked && (
        <p className="text-sm text-text-gray mb-6">Comments are locked on this post.</p>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-text-gray animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 py-4">{error}</p>
      )}

      {!loading && !error && comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="w-8 h-8 text-text-gray/50 mx-auto mb-2" />
          <p className="text-sm text-text-gray">No comments yet. Be the first.</p>
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-1 divide-y divide-accent-gold/10">
          {comments.map((comment) => (
            <FeedComment
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
