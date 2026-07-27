"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Pin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessagesSquare,
} from "lucide-react";
import VoiceNotePlayer from "@/components/consilium/VoiceNotePlayer";
import VideoPlayer from "@/components/consilium/VideoPlayer";
import FeedPollCard from "@/components/consilium/FeedPollCard";
import type { FeedPostData } from "@/components/consilium/FeedPost";

/**
 * A feed post in the app skin. Same behaviour as the old card (optimistic
 * like, pinned posts collapse with per-post persistence, polls, voice and
 * video embeds); only the clothes changed. Kanika's own posts read richer
 * than the cron-generated insight/discussion cards.
 *
 * With `detail` the card renders as the top of its own page: full
 * content, no self-links, no pinned collapse.
 */

const PINNED_EXPAND_STORAGE_PREFIX = "feed-pinned-expanded:";

function pinnedExpandKey(post: { id: string; createdAt: string }): string {
  return `${PINNED_EXPAND_STORAGE_PREFIX}${post.id}:${post.createdAt}`;
}

export default function AppFeedPost({
  post,
  isNew = false,
  detail = false,
}: {
  post: FeedPostData;
  isNew?: boolean;
  detail?: boolean;
}) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isToggling, setIsToggling] = useState(false);

  const canCollapse = post.isPinned && !detail;
  const [isCollapsed, setIsCollapsed] = useState(canCollapse);
  useEffect(() => {
    if (!canCollapse) return;
    try {
      if (localStorage.getItem(pinnedExpandKey(post)) === "1") {
        setIsCollapsed(false);
      }
    } catch {
      /* private mode: stay collapsed, in-session expand still works */
    }
  }, [canCollapse, post]);

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    try {
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

  const isKanika = !post.author || post.author.role === "ADMIN";
  const isSystemCard =
    post.type === "AUTOMATED" || post.type === "DISCUSSION_PROMPT";
  const shouldTruncate = !detail && post.content.length > 500;
  const displayContent = shouldTruncate
    ? post.content.slice(0, 500)
    : post.content;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <article
      className={`rounded-2xl border px-4 py-4 ${
        isKanika && !isSystemCard
          ? "border-[var(--app-line)] bg-[linear-gradient(150deg,rgba(212,175,55,0.05),rgba(212,175,55,0.01))]"
          : "border-[var(--app-line-soft)] bg-[var(--app-card)]"
      }`}
    >
      {/* Header row */}
      <div className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span
          className={`text-[13.5px] font-medium ${
            isKanika ? "text-[var(--app-gold)]" : ""
          }`}
        >
          {post.author?.name || "Kanika"}
        </span>
        <span className="text-[11px] text-[var(--app-dim)]">{timeAgo}</span>
        {post.type === "AUTOMATED" && (
          <Chip icon={<Sparkles className="h-2.5 w-2.5" />}>Insight</Chip>
        )}
        {post.type === "DISCUSSION_PROMPT" && (
          <Chip icon={<MessagesSquare className="h-2.5 w-2.5" />}>
            Discussion
          </Chip>
        )}
        {isNew && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(127,184,144,0.12)] px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[var(--app-green)]">
            New
          </span>
        )}
        {canCollapse && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!isCollapsed}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-[var(--app-line)] bg-[rgba(212,175,55,0.08)] px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[var(--app-gold)]"
          >
            <Pin className="h-2.5 w-2.5" />
            Pinned
            {isCollapsed ? (
              <ChevronDown className="-mr-0.5 h-3 w-3" />
            ) : (
              <ChevronUp className="-mr-0.5 h-3 w-3" />
            )}
          </button>
        )}
        {post.isPinned && !canCollapse && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-[var(--app-line)] bg-[rgba(212,175,55,0.08)] px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[var(--app-gold)]">
            <Pin className="h-2.5 w-2.5" />
            Pinned
          </span>
        )}
      </div>

      {/* Title */}
      {isCollapsed ? (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-expanded={false}
          className="block w-full text-left"
        >
          <span
            className="block truncate text-[16px] text-[var(--app-muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </span>
          <span className="text-[11px] text-[var(--app-dim)]">
            Tap to expand
          </span>
        </button>
      ) : detail ? (
        <h1
          className="mb-2 block text-[20px] leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h1>
      ) : (
        <Link href={`/app/feed/${post.id}`} className="mb-2 block">
          <span
            className="block text-[18px] leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </span>
        </Link>
      )}

      {/* Body */}
      {!isCollapsed && (
        <>
          <div className="text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 whitespace-pre-wrap last:mb-0">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[var(--app-text)]">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-[var(--app-text)]">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--app-gold)] underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 list-decimal space-y-1 pl-5">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-2 border-l-2 border-[var(--app-gold-soft)] pl-4 italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[var(--app-gold)]">
                    {children}
                  </code>
                ),
                h1: ({ children }) => (
                  <h1 className="mb-1 mt-3 text-[15px] font-semibold text-[var(--app-text)]">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-1 mt-3 text-sm font-semibold text-[var(--app-text)]">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-1 mt-2 text-sm font-medium text-[var(--app-text)]">
                    {children}
                  </h3>
                ),
              }}
            >
              {displayContent}
            </ReactMarkdown>
            {shouldTruncate && (
              <Link
                href={`/app/feed/${post.id}`}
                className="text-[var(--app-gold)]"
              >
                Read more
              </Link>
            )}
          </div>

          {post.poll && (
            <div className="mt-3">
              <FeedPollCard postId={post.id} poll={post.poll} />
            </div>
          )}

          {post.type === "VOICE_NOTE" && post.voiceNoteUrl && (
            <div className="mt-3">
              <VoiceNotePlayer src={post.voiceNoteUrl} />
            </div>
          )}

          {post.type === "VIDEO" && post.videoUrl && (
            <div className="mt-3">
              <VideoPlayer
                src={post.videoUrl}
                poster={post.videoPosterUrl}
                durationSeconds={post.videoDurationSeconds}
              />
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center gap-1 border-t border-[var(--app-line-soft)] pt-2">
            <button
              type="button"
              onClick={handleLike}
              disabled={isToggling}
              aria-label={liked ? "Unlike" : "Like"}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px]"
            >
              <Heart
                className={`h-[18px] w-[18px] ${
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
            {detail ? (
              <span className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] text-[var(--app-dim)]">
                <MessageCircle className="h-[18px] w-[18px]" />
                {post.commentCount > 0 && <span>{post.commentCount}</span>}
              </span>
            ) : (
              <Link
                href={`/app/feed/${post.id}`}
                aria-label="View comments"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] text-[var(--app-dim)]"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
                {post.commentCount > 0 && <span>{post.commentCount}</span>}
              </Link>
            )}
          </div>
        </>
      )}
    </article>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--app-line-soft)] px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[var(--app-gold-soft)]">
      {icon}
      {children}
    </span>
  );
}
