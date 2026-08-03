"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import type { FeedPostData } from "@/components/consilium/FeedPost";
import AppFeedPost from "./AppFeedPost";

/**
 * The feed list in the app skin. Same contract as the old FeedList: server
 * page hands over the first 20 posts + a cursor, "Load more" appends pages
 * from /api/consilium/feed/posts, and posts newer than the previous visit
 * carry a NEW badge (localStorage, per-device, decorative).
 */

const LAST_SEEN_KEY = "consilium:feedLastSeenAt";

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

export default function AppFeedList({
  initialPosts,
  initialNextCursor,
}: {
  initialPosts: FeedPostData[];
  initialNextCursor: string | null;
}) {
  const [posts, setPosts] = useState<FeedPostData[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastSeenRef = useRef<number>(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    lastSeenRef.current = readLastSeen();
    setHydrated(true);
    if (initialPosts.length > 0) {
      const newest = initialPosts.reduce((max, p) => {
        const t = new Date(p.createdAt).getTime();
        return t > max ? t : max;
      }, 0);
      if (newest > 0) {
        try {
          window.localStorage.setItem(LAST_SEEN_KEY, String(newest));
        } catch {
          /* decorative feature: ignore quota / private mode */
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
        `/api/consilium/feed/posts?cursor=${encodeURIComponent(cursor)}&pact=1`,
      );
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data = (await res.json()) as {
        posts: FeedPostData[];
        nextCursor: string | null;
      };
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more posts",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => {
        const createdAtMs = new Date(post.createdAt).getTime();
        const isNew =
          hydrated &&
          lastSeenRef.current > 0 &&
          createdAtMs > lastSeenRef.current;
        return <AppFeedPost key={post.id} post={post} isNew={isNew} />;
      })}

      {cursor && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-2 rounded-full border border-[var(--app-line-soft)] px-6 py-2.5 text-xs tracking-[0.08em] text-[var(--app-muted)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading
              </>
            ) : (
              "Load more"
            )}
          </button>
          {error && <p className="text-xs text-[var(--app-rose)]">{error}</p>}
        </div>
      )}
    </div>
  );
}
