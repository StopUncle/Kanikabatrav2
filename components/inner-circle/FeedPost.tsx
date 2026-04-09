"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Pin, Mic } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import VoiceNotePlayer from "./VoiceNotePlayer";

interface FeedPostAuthor {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  role: string;
}

export interface FeedPostData {
  id: string;
  title: string;
  content: string;
  type: string;
  voiceNoteUrl: string | null;
  isPinned: boolean;
  isLocked: boolean;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  author: FeedPostAuthor | null;
}

interface FeedPostProps {
  post: FeedPostData;
  isDetail?: boolean;
}

export default function FeedPost({ post, isDetail = false }: FeedPostProps) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isToggling, setIsToggling] = useState(false);

  const handleLike = async () => {
    if (isToggling) return;
    setIsToggling(true);

    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      const res = await fetch(`/api/inner-circle/feed/${post.id}/react`, {
        method: "POST",
      });

      if (!res.ok) {
        setLiked(prevLiked);
        setLikeCount(prevCount);
      }
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setIsToggling(false);
    }
  };

  const authorInitial = post.author?.name?.charAt(0)?.toUpperCase() || "K";
  const isAdminAuthor = post.author?.role === "ADMIN";
  const shouldTruncate = !isDetail && post.content.length > 500;
  const displayContent = shouldTruncate ? post.content.slice(0, 500) : post.content;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl p-6 hover:border-accent-gold/25 transition-all duration-300"
    >
      {post.isPinned && (
        <div className="flex items-center gap-1.5 text-accent-gold text-xs mb-3">
          <Pin className="w-3 h-3" />
          <span className="uppercase tracking-wider font-medium bg-accent-gold/10 border border-accent-gold/20 px-2 py-0.5 rounded-full">Pinned</span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
            isAdminAuthor
              ? "bg-accent-gold/10 text-accent-gold"
              : "bg-deep-black/30 text-text-gray"
          }`}
        >
          {post.author?.avatarUrl ? (
            <img
              src={post.author.avatarUrl}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            authorInitial
          )}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-text-light truncate">
            {post.author?.name || "Kanika"}
          </span>
          {isAdminAuthor && (
            <span className="text-[10px] bg-accent-gold/10 text-accent-gold border border-accent-gold/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Kanika
            </span>
          )}
          <span className="text-xs text-text-gray/70 shrink-0">{timeAgo}</span>
        </div>
      </div>

      <h3 className="text-lg font-medium text-text-light mb-2">{post.title}</h3>

      <div className="text-text-gray text-sm leading-relaxed mb-4">
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: displayContent
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\*\*(.*?)\*\*/g, "<strong class=\"text-text-light\">$1</strong>")
          }}
        />
        {shouldTruncate && (
          <Link
            href={`/inner-circle/feed/${post.id}`}
            className="text-accent-gold hover:text-accent-gold/80 ml-1 inline-block"
          >
            Read more
          </Link>
        )}
      </div>

      {post.type === "VOICE_NOTE" && post.voiceNoteUrl && (
        <div className="mb-4">
          <VoiceNotePlayer src={post.voiceNoteUrl} />
        </div>
      )}

      {post.type === "ANNOUNCEMENT" && !post.isPinned && (
        <div className="flex items-center gap-1.5 text-accent-gold/50 text-xs mb-4">
          <Mic className="w-3 h-3" />
          <span className="uppercase tracking-wider">Announcement</span>
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-accent-gold/10">
        <button
          onClick={handleLike}
          disabled={isToggling}
          className="flex items-center gap-1.5 text-sm transition-colors group"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked
                ? "fill-accent-gold text-accent-gold"
                : "text-text-gray/50 group-hover:text-accent-gold"
            }`}
          />
          <span className={liked ? "text-accent-gold" : "text-text-gray/50"}>
            {likeCount}
          </span>
        </button>

        <Link
          href={`/inner-circle/feed/${post.id}`}
          className="flex items-center gap-1.5 text-sm text-text-gray/50 hover:text-accent-gold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentCount}</span>
        </Link>
      </div>
    </motion.article>
  );
}
