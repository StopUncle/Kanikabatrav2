"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import FeedPost, { type FeedPostData } from "./FeedPost";

interface FeedListProps {
  initialPosts: FeedPostData[];
  initialNextCursor: string | null;
}

/**
 * Client-side wrapper around the feed post list. The server-rendered page
 * provides the initial 20 posts + a cursor; this component appends further
 * pages fetched from `/api/consilium/feed/posts?cursor=<ISO>` when the
 * user clicks "Load more".
 */
export default function FeedList({
  initialPosts,
  initialNextCursor,
}: FeedListProps) {
  const [posts, setPosts] = useState<FeedPostData[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}

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
