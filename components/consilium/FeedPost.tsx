"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Pin,
  Mic,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessagesSquare,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VoiceNotePlayer from "./VoiceNotePlayer";
import VideoPlayer from "./VideoPlayer";
import MemberBadge from "./MemberBadge";

interface FeedPostAuthor {
  id: string;
  name: string | null;
  role: string;
  /** 1..12, rank badge used in place of a photo avatar. */
  tier: number;
}

export interface FeedPostData {
  id: string;
  title: string;
  content: string;
  type: string;
  voiceNoteUrl: string | null;
  videoUrl: string | null;
  videoPosterUrl: string | null;
  videoDurationSeconds: number | null;
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
  isNew?: boolean;
}

/**
 * Pinned posts sort to the top of the feed and push everything else down.
 * They start COLLAPSED by default, a single header row with title + tap-
 * to-expand affordance so the feed reclaims the space immediately. The
 * member can expand any pinned post with one tap; that choice persists
 * per-post in localStorage, keyed on post id + createdAt. Re-posting or
 * re-pinning produces a new key, which means a freshly-pinned post lands
 * collapsed for everyone (including members who'd previously expanded a
 * different pinned post). Non-pinned posts never collapse.
 */
const PINNED_EXPAND_STORAGE_PREFIX = "feed-pinned-expanded:";

function pinnedExpandKey(post: { id: string; createdAt: string }): string {
  return `${PINNED_EXPAND_STORAGE_PREFIX}${post.id}:${post.createdAt}`;
}

export default function FeedPost({ post, isDetail = false, isNew = false }: FeedPostProps) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isToggling, setIsToggling] = useState(false);

  // Collapsed state for pinned posts only. Detail pages ignore the toggle
  // entirely, if a member navigated into the post directly, they want
  // to see it.
  //
  // Hydration: SSR doesn't have access to localStorage so we render the
  // default-collapsed state on the server; on mount we re-read storage
  // and expand if the member previously expanded *this specific* post.
  // The match between SSR and the first client render is intentional —
  // most members will see the collapsed shape immediately, no flash.
  const canCollapse = post.isPinned && !isDetail;
  const [isCollapsed, setIsCollapsed] = useState(canCollapse);
  useEffect(() => {
    if (!canCollapse) return;
    try {
      // "1" means the member explicitly expanded this post; treat as
      // expanded on subsequent loads.
      const stored = localStorage.getItem(pinnedExpandKey(post));
      if (stored === "1") setIsCollapsed(false);
    } catch {
      // localStorage unavailable (private mode, quota, etc.), leave
      // collapsed and allow in-session expand only.
    }
  }, [canCollapse, post]);

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (!canCollapse) return;
    try {
      // Store "expanded"; collapse is the default and needs no key.
      if (!next) localStorage.setItem(pinnedExpandKey(post), "1");
      else localStorage.removeItem(pinnedExpandKey(post));
    } catch {
      /* non-fatal */
    }
  };

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

  // System / cron-generated posts come through with author === null but
  // render as "Kanika" in the UI (see below). The default tier of 12
  // (Queen) makes the badge match Kanika's rank for those rows.
  const authorTier = post.author?.tier ?? 12;
  const shouldTruncate = !isDetail && post.content.length > 500;
  const displayContent = shouldTruncate ? post.content.slice(0, 500) : post.content;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  // Per-post viewer pulse, a soft "N viewing" indicator that's
  // deterministic per post + half-hour bucket so refresh doesn't
  // jiggle, but shifts naturally as the day moves on. Scaled by
  // popularity (likes) and decayed by post age. Caps at 22 to stay
  // believable for a young community.
  const viewing = (() => {
    const bucket = Math.floor(Date.now() / (30 * 60 * 1000));
    let h = 5381;
    const seed = `${post.id}:${bucket}`;
    for (let i = 0; i < seed.length; i++) {
      h = ((h << 5) + h + seed.charCodeAt(i)) | 0;
    }
    const base = 2 + (Math.abs(h) % 6);
    const popularityBoost = Math.min(8, Math.floor(post.likeCount / 3));
    const ageMs = Date.now() - new Date(post.createdAt).getTime();
    const dayOld = ageMs / (24 * 60 * 60 * 1000);
    const decay = Math.max(0.4, 1 - dayOld * 0.04);
    return Math.min(22, Math.max(1, Math.round((base + popularityBoost) * decay)));
  })();

  return (
    <m.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-accent-gold/25 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap">
        {/* Rank badge IS the avatar, the member's tenure is their identity. */}
        <div className="shrink-0">
          <MemberBadge tier={authorTier} size="xs" />
        </div>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-medium text-text-light truncate">
            {post.author?.name || "Kanika"}
          </span>
          <span className="text-xs text-text-gray/70 shrink-0">{timeAgo}</span>
          {post.type === "AUTOMATED" && (
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[10px] text-accent-gold/80 uppercase tracking-[0.18em] font-medium border border-accent-gold/20 bg-accent-gold/[0.04] px-1.5 py-0.5 rounded-full shrink-0"
              aria-label="Daily insight"
            >
              <Sparkles className="w-2.5 h-2.5" />
              Insight
            </span>
          )}
          {post.type === "DISCUSSION_PROMPT" && (
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[10px] text-purple-300/85 uppercase tracking-[0.18em] font-medium border border-purple-300/25 bg-purple-300/[0.05] px-1.5 py-0.5 rounded-full shrink-0"
              aria-label="Discussion prompt"
            >
              <MessagesSquare className="w-2.5 h-2.5" />
              Discussion
            </span>
          )}
          <span
            className="hidden sm:inline-flex items-center gap-1 text-[10px] text-text-gray/55 shrink-0"
            aria-label={`${viewing} members viewing`}
            title={`${viewing} members viewing`}
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tabular-nums">{viewing} viewing</span>
          </span>
        </div>
        {post.isPinned && (
          canCollapse ? (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? "Expand pinned post" : "Collapse pinned post"}
              className="inline-flex items-center gap-1 text-[10px] text-warm-gold uppercase tracking-wider font-medium bg-warm-gold/10 border border-warm-gold/25 hover:bg-warm-gold/15 hover:border-warm-gold/40 transition-colors px-2 py-0.5 rounded-full shrink-0 tap-target"
            >
              <Pin className="w-2.5 h-2.5" />
              Pinned
              {isCollapsed ? (
                <ChevronDown className="w-3 h-3 -mr-0.5" />
              ) : (
                <ChevronUp className="w-3 h-3 -mr-0.5" />
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-warm-gold uppercase tracking-wider font-medium bg-warm-gold/10 border border-warm-gold/25 px-2 py-0.5 rounded-full shrink-0">
              <Pin className="w-2.5 h-2.5" />
              Pinned
            </span>
          )
        )}
        {isNew && !isDetail && (
          <span
            className="inline-flex items-center gap-1 text-[10px] text-emerald-300 uppercase tracking-[0.18em] font-medium bg-emerald-500/10 border border-emerald-400/30 px-2 py-0.5 rounded-full shrink-0"
            aria-label="New since your last visit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New
          </span>
        )}
      </div>

      {isCollapsed ? (
        // Collapsed pinned post: title only, clickable to expand. The full
        // detail page remains reachable via the member tapping the title
        // row's expand button (the Pinned chip above); here the title
        // itself is a plain span so expanding in-place doesn't race with
        // navigation.
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-expanded={false}
          className="block w-full text-left -mb-1 group"
        >
          <h3 className="text-base sm:text-lg font-medium text-text-light/80 group-hover:text-accent-gold transition-colors truncate">
            {post.title}
          </h3>
          <span className="text-[11px] text-text-gray/60 font-light">
            Tap to expand
          </span>
        </button>
      ) : isDetail ? (
        <h3 className="text-base sm:text-lg font-medium text-text-light mb-2">
          {post.title}
        </h3>
      ) : (
        <Link
          href={`/consilium/feed/${post.id}`}
          className="block mb-2 hover:text-accent-gold transition-colors"
        >
          <h3 className="text-base sm:text-lg font-medium text-text-light hover:text-accent-gold transition-colors">
            {post.title}
          </h3>
        </Link>
      )}

      {!isCollapsed && (
      <div className="text-text-gray text-sm leading-relaxed mb-4 feed-markdown max-w-[65ch]">
        {/*
          react-markdown sanitizes by default (no dangerouslySetInnerHTML,
          no raw HTML). Remark-gfm adds lists, tables, strikethrough, and
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
      )}

      {!isCollapsed && post.type === "VOICE_NOTE" && post.voiceNoteUrl && (
        <div className="mb-4">
          <VoiceNotePlayer src={post.voiceNoteUrl} />
        </div>
      )}

      {!isCollapsed && post.type === "VIDEO" && post.videoUrl && (
        <div className="mb-4">
          <VideoPlayer
            src={post.videoUrl}
            poster={post.videoPosterUrl}
            durationSeconds={post.videoDurationSeconds}
          />
        </div>
      )}

      {!isCollapsed && post.type === "ANNOUNCEMENT" && !post.isPinned && (
        <div className="flex items-center gap-1.5 text-accent-gold/50 text-xs mb-4">
          <Mic className="w-3 h-3" />
          <span className="uppercase tracking-wider">Announcement</span>
        </div>
      )}

      {!isCollapsed && (
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
          {likeCount > 0 && (
            <span className={liked ? "text-accent-gold" : "text-text-gray/50"}>
              {likeCount}
            </span>
          )}
        </button>

        <Link
          href={`/consilium/feed/${post.id}`}
          aria-label="View comments"
          className="flex items-center gap-1.5 text-sm text-text-gray/50 hover:text-accent-gold transition-colors px-2 py-2 -mx-2 rounded-lg active:bg-accent-gold/10 tap-target"
        >
          <MessageCircle className="w-5 h-5" />
          {post.commentCount > 0 && <span>{post.commentCount}</span>}
        </Link>
      </div>
      )}
    </m.article>
  );
}
