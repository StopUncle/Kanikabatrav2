"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Heart, MessageCircle, Pin, Mic } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
      const res = await fetch(`/api/consilium/feed/${post.id}/react`, {
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
    <m.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-accent-gold/25 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
            isAdminAuthor
              ? "bg-accent-gold/10 text-accent-gold"
              : "bg-deep-black/30 text-text-gray"
          }`}
        >
          {post.author?.avatarUrl ? (
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name || "Member avatar"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
              unoptimized={post.author.avatarUrl.startsWith("data:")}
            />
          ) : (
            authorInitial
          )}
        </div>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-medium text-text-light truncate">
            {post.author?.name || "Kanika"}
          </span>
          {isAdminAuthor && (
            <span className="text-[10px] bg-warm-gold/10 text-warm-gold border border-warm-gold/25 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Kanika
            </span>
          )}
          <span className="text-xs text-text-gray/70 shrink-0">{timeAgo}</span>
        </div>
        {post.isPinned && (
          <span className="inline-flex items-center gap-1 text-[10px] text-warm-gold uppercase tracking-wider font-medium bg-warm-gold/10 border border-warm-gold/25 px-2 py-0.5 rounded-full shrink-0">
            <Pin className="w-2.5 h-2.5" />
            Pinned
          </span>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-medium text-text-light mb-2">{post.title}</h3>

      <div className="text-text-gray text-sm leading-relaxed mb-4 feed-markdown">
        {/*
          react-markdown sanitizes by default (no dangerouslySetInnerHTML,
          no raw HTML). remark-gfm adds lists, tables, strikethrough, and
          task lists. Component overrides give each element the right
          dark-luxury styling without re-inventing a parser.
        */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="text-text-light font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-text-light/90 italic">{children}</em>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-accent-gold/80 underline"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>
            ),
            li: ({ children }) => <li className="text-text-gray">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-warm-gold/40 pl-4 italic text-text-gray/90 my-2">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-white/5 text-accent-gold/90 px-1.5 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ),
            h1: ({ children }) => (
              <h1 className="text-text-light text-base font-semibold mt-3 mb-1">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-text-light text-sm font-semibold mt-3 mb-1">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-text-light text-sm font-medium mt-2 mb-1">{children}</h3>
            ),
          }}
        >
          {displayContent}
        </ReactMarkdown>
        {shouldTruncate && (
          <Link
            href={`/consilium/feed/${post.id}`}
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

      <div className="flex items-center gap-2 pt-2 border-t border-warm-gold/10">
        <button
          onClick={handleLike}
          disabled={isToggling}
          aria-label={liked ? "Unlike" : "Like"}
          className="flex items-center gap-1.5 text-sm transition-colors group px-2 py-2 -mx-2 rounded-lg active:bg-accent-gold/10 tap-target"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
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
          href={`/consilium/feed/${post.id}`}
          aria-label="View comments"
          className="flex items-center gap-1.5 text-sm text-text-gray/50 hover:text-accent-gold transition-colors px-2 py-2 -mx-2 rounded-lg active:bg-accent-gold/10 tap-target"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.commentCount}</span>
        </Link>
      </div>
    </m.article>
  );
}
