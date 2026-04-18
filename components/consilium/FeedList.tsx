"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import FeedPost, { type FeedPostData } from "./FeedPost";

interface FeedListProps {
  initialPosts: FeedPostData[];
  initialNextCursor: string | null;
}

const LAST_SEEN_KEY = "consilium:feedLastSeenAt";

/**
 * Read the last-seen timestamp from localStorage synchronously during the
 * first render so "NEW" badges are decided *before* we bump the timestamp.
 * SSR falls through to 0 (no highlights on server render — the client
 * effect re-decides after hydration).
 */
function readLastSeen(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(LAST_SEEN_KEY);
    if (!raw) return 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

/**
 * Client-side wrapper around the feed post list. The server-rendered page
 * provides the initial 20 posts + a cursor; this component appends further
 * pages fetched from `/api/consilium/feed/posts?cursor=<ISO>` when the
 * user clicks "Load more".
 *
 * Also paints a subtle "NEW" badge on posts created after the viewer's
 * previous visit (stored in localStorage — no schema migration needed,
 * per-device state is fine for a "what's new since last time" hint).
 */
export default function FeedList({
  initialPosts,
  initialNextCursor,
}: FeedListProps) {
  const [posts, setPosts] = useState<FeedPostData[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Freeze the "last seen" threshold at mount so every visible post is
  // compared against the *previous* visit, not the rolling value we're
  // about to write. Without this, stamping the new timestamp in the same
  // render would instantly kill every highlight.
  const lastSeenRef = useRef<number>(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    lastSeenRef.current = readLastSeen();
    setHydrated(true);

    // Stamp the newest post timestamp back so the next visit measures
    // from here. Covers pinned-first ordering by taking max, not first.
    if (initialPosts.length > 0) {
      const newest = initialPosts.reduce((max, p) => {
        const t = new Date(p.createdAt).getTime();
        return t > max ? t : max;
      }, 0);
      if (newest > 0) {
        try {
          window.localStorage.setItem(LAST_SEEN_KEY, String(newest));
        } catch {
          /* quota / private mode — fall through, feature is decorative */
        }
      }
    }
  }, [initialPosts]);

  const loadMore = async () => {
    if (!cursor || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/consilium/feed/posts?cursor=${encodeURIComponent(cursor)}`,
      );
      if (!res.ok) {
        throw new Error(`Failed to load (${res.status})`);
      }
      const data = (await res.json()) as {
        posts: FeedPostData[];
        nextCursor: string | null;
      };
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const createdAtMs = new Date(post.createdAt).getTime();
        const isNew =
          hydrated &&
          lastSeenRef.current > 0 &&
          createdAtMs > lastSeenRef.current;
        return <FeedPost key={post.id} post={post} isNew={isNew} />;
      })}

      {cursor && (
        <div className="flex flex-col items-center gap-2 pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 rounded-full text-sm text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Loading…
              </>
            ) : (
              "Load more"
            )}
          </button>
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
