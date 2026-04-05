"use client";

import { useState } from "react";
import { Heart, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import FeedCommentForm from "./FeedCommentForm";

interface CommentAuthor {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  role: string;
}

export interface CommentData {
  id: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  author: CommentAuthor;
  children: CommentData[];
}

interface FeedCommentProps {
  comment: CommentData;
  postId: string;
  onCommentPosted: () => void;
  depth?: number;
}

export default function FeedComment({
  comment,
  postId,
  onCommentPosted,
  depth = 0,
}: FeedCommentProps) {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [showReply, setShowReply] = useState(false);

  const authorInitial = comment.author.name?.charAt(0)?.toUpperCase() || "?";
  const isAdminAuthor = comment.author.role === "ADMIN";
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  const handleLike = async () => {
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      const res = await fetch(`/api/inner-circle/feed/${postId}/comments/${comment.id}/react`, {
        method: "POST",
      });
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

  return (
    <div className={depth > 0 ? "pl-4 border-l border-accent-gold/10" : ""}>
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
              isAdminAuthor
                ? "bg-accent-gold/20 text-accent-gold"
                : "bg-deep-black/30 text-text-gray"
            }`}
          >
            {comment.author.avatarUrl ? (
              <img
                src={comment.author.avatarUrl}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              authorInitial
            )}
          </div>
          <span className="text-sm font-medium text-text-light">
            {comment.author.name || "Member"}
          </span>
          {isAdminAuthor && (
            <span className="text-[10px] bg-accent-gold/20 text-accent-gold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Kanika
            </span>
          )}
          <span className="text-xs text-text-gray">{timeAgo}</span>
        </div>

        <p className="text-sm text-text-light leading-relaxed ml-8 whitespace-pre-wrap">
          {comment.content}
        </p>

        <div className="flex items-center gap-3 ml-8 mt-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-xs transition-colors group"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                liked
                  ? "fill-accent-gold text-accent-gold"
                  : "text-text-gray group-hover:text-accent-gold"
              }`}
            />
            {likeCount > 0 && (
              <span className={liked ? "text-accent-gold" : "text-text-gray"}>
                {likeCount}
              </span>
            )}
          </button>

          {depth === 0 && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-text-gray hover:text-accent-gold transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              Reply
            </button>
          )}
        </div>

        {showReply && (
          <div className="ml-8 mt-3">
            <FeedCommentForm
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
            <FeedComment
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
