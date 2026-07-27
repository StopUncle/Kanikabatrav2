"use client";

import { useState } from "react";
import { Heart, Reply, Flag, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AppCommentForm from "./AppCommentForm";
import type { CommentData } from "@/components/consilium/FeedComment";

/**
 * One comment (plus its replies) in the app skin. Same API contract as
 * the old FeedComment: optimistic like, one level of replies, report
 * with a confirm that flips to a muted "Reported" state.
 */
export default function AppComment({
  comment,
  postId,
  onCommentPosted,
  depth = 0,
}: {
  comment: CommentData;
  postId: string;
  onCommentPosted: () => void;
  depth?: number;
}) {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [showReply, setShowReply] = useState(false);
  const [reportState, setReportState] = useState<"idle" | "sending" | "done">(
    "idle",
  );

  const isKanika = comment.author.role === "ADMIN";
  const name = comment.author.name || "Member";
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  const handleLike = async () => {
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    try {
      const res = await fetch(
        `/api/consilium/feed/${postId}/comments/${comment.id}/react`,
        { method: "POST" },
      );
      if (!res.ok) {
        setLiked(prevLiked);
        setLikeCount(prevCount);
      }
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleReplyPosted = () => {
    setShowReply(false);
    onCommentPosted();
  };

  const handleReport = async () => {
    if (reportState !== "idle") return;
    if (!window.confirm("Report this comment for Kanika to review?")) return;
    setReportState("sending");
    try {
      const res = await fetch(
        `/api/consilium/feed/${postId}/comments/${comment.id}/report`,
        { method: "POST" },
      );
      setReportState(res.ok ? "done" : "idle");
    } catch {
      setReportState("idle");
    }
  };

  return (
    <div
      className={depth > 0 ? "border-l border-[var(--app-line-soft)] pl-3" : ""}
    >
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            aria-hidden
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] ${
              isKanika
                ? "border border-[var(--app-line)] bg-[rgba(212,175,55,0.12)] text-[var(--app-gold)]"
                : "border border-[var(--app-line-soft)] bg-[var(--app-card)] text-[var(--app-muted)]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name.charAt(0).toUpperCase()}
          </span>
          <span
            className={`text-[13px] font-medium ${
              isKanika ? "text-[var(--app-gold)]" : ""
            }`}
          >
            {name}
          </span>
          {comment.status === "PENDING_REVIEW" && (
            <span className="rounded-full bg-[rgba(212,175,55,0.1)] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--app-gold-soft)]">
              Awaiting approval
            </span>
          )}
          <span className="text-[11px] text-[var(--app-dim)]">{timeAgo}</span>
        </div>

        <p className="ml-9 whitespace-pre-wrap text-[13.5px] leading-relaxed text-[var(--app-muted)]">
          {comment.content}
        </p>

        <div className="ml-9 mt-0.5 flex items-center gap-1">
          <button
            type="button"
            onClick={handleLike}
            aria-label={liked ? "Unlike comment" : "Like comment"}
            className="-ml-2 flex items-center gap-1 rounded-lg px-2 py-2 text-[12px]"
          >
            <Heart
              className={`h-4 w-4 ${
                liked
                  ? "fill-[var(--app-gold)] text-[var(--app-gold)]"
                  : "text-[var(--app-dim)]"
              }`}
            />
            {likeCount > 0 && (
              <span
                className={
                  liked ? "text-[var(--app-gold)]" : "text-[var(--app-dim)]"
                }
              >
                {likeCount}
              </span>
            )}
          </button>

          {depth === 0 && (
            <button
              type="button"
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-[12px] text-[var(--app-dim)]"
            >
              <Reply className="h-4 w-4" />
              Reply
            </button>
          )}

          {!isKanika && (
            <button
              type="button"
              onClick={handleReport}
              disabled={reportState !== "idle"}
              aria-label="Report this comment"
              className={`flex items-center gap-1 rounded-lg px-2 py-2 text-[12px] disabled:cursor-default ${
                reportState === "done"
                  ? "text-[var(--app-gold-soft)]"
                  : "text-[var(--app-dim)]"
              }`}
            >
              {reportState === "done" ? (
                <>
                  <Check className="h-4 w-4" />
                  Reported
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4" />
                  {reportState === "sending" ? "…" : "Report"}
                </>
              )}
            </button>
          )}
        </div>

        {showReply && (
          <div className="ml-9 mt-2">
            <AppCommentForm
              postId={postId}
              parentId={comment.id}
              onCommentPosted={handleReplyPosted}
              placeholder="Write a reply..."
              compact
            />
          </div>
        )}
      </div>

      {comment.children.length > 0 && (
        <div className="ml-4">
          {comment.children.map((child) => (
            <AppComment
              key={child.id}
              comment={child}
              postId={postId}
              onCommentPosted={onCommentPosted}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
