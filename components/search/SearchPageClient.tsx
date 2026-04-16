"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Loader2, Search as SearchIcon, BookOpen, MessageCircle, FileText } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";

interface CourseHit {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
}

interface FeedHit {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  createdAt: string;
}

interface BlogHit {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface SearchResponse {
  query: string;
  totalHits: number;
  results: {
    courses: CourseHit[];
    feedPosts: FeedHit[];
    blogPosts: BlogHit[];
  };
  viewer: { isActiveMember: boolean };
}

export default function SearchPageClient() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the query so each keystroke doesn't hammer the API.
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(handle);
  }, [query]);

  const runSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Search failed");
      }
      const json = (await res.json()) as SearchResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery, runSearch]);

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-10">
          <p className="text-accent-gold text-xs uppercase tracking-[0.3em] mb-2">Search</p>
          <h1 className="text-4xl font-extralight tracking-wider uppercase gradient-text-gold">
            Find what you need
          </h1>
          <div className="w-16 h-px bg-accent-gold/40 mx-auto mt-4" />
        </div>

        <div className="relative mb-10">
          <SearchIcon
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-text-gray/60 pointer-events-none"
          />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blog, courses, feed…"
            className="w-full bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-full pl-14 pr-14 py-4 text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all"
          />
          {loading && (
            <Loader2
              size={16}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-accent-gold animate-spin"
            />
          )}
        </div>

        {error && (
          <p className="text-red-400 text-center text-sm mb-6">{error}</p>
        )}

        {debouncedQuery && !loading && data && data.totalHits === 0 && (
          <p className="text-text-gray/70 text-center py-10">
            No results for &ldquo;{debouncedQuery}&rdquo;. Try a different term.
          </p>
        )}

        {data && data.totalHits > 0 && (
          <div className="space-y-10">
            {data.results.blogPosts.length > 0 && (
              <ResultSection
                icon={FileText}
                title="Blog posts"
                count={data.results.blogPosts.length}
              >
                {data.results.blogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-4 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all"
                  >
                    <p className="text-xs text-accent-gold/70 uppercase tracking-wider mb-1">
                      {post.category}
                    </p>
                    <p className="text-text-light font-medium text-sm mb-1">
                      {post.title}
                    </p>
                    <p className="text-text-gray text-xs line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </ResultSection>
            )}

            {data.results.courses.length > 0 && (
              <ResultSection
                icon={BookOpen}
                title="Courses"
                count={data.results.courses.length}
              >
                {data.results.courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/consilium/classroom/${course.slug}`}
                    className="block p-4 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all"
                  >
                    <p className="text-text-light font-medium text-sm mb-1">
                      {course.title}
                    </p>
                    {course.excerpt && (
                      <p className="text-text-gray text-xs line-clamp-2">
                        {course.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </ResultSection>
            )}

            {data.results.feedPosts.length > 0 && (
              <ResultSection
                icon={MessageCircle}
                title="Consilium feed"
                count={data.results.feedPosts.length}
              >
                {data.results.feedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/consilium/feed/${post.id}`}
                    className="block p-4 bg-deep-black/50 border border-accent-gold/10 rounded-xl hover:border-accent-gold/30 transition-all"
                  >
                    <p className="text-text-light font-medium text-sm mb-1">
                      {post.title}
                    </p>
                    <p className="text-text-gray text-xs line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </ResultSection>
            )}

            {!data.viewer.isActiveMember && (
              <p className="text-text-gray/50 text-xs text-center italic">
                Consilium feed results are only shown to active members.
              </p>
            )}
          </div>
        )}

        {!debouncedQuery && (
          <div className="text-center text-text-gray/50 text-sm py-10">
            Search across the blog, courses, and (if you&apos;re a member) the Consilium feed.
          </div>
        )}
      </main>
    </div>
  );
}

function ResultSection({
  icon: Icon,
  title,
  count,
  children,
}: {
  icon: typeof BookOpen;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={14} className="text-accent-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] text-accent-gold">
          {title}
          <span className="text-text-gray/50 ml-2">({count})</span>
        </h2>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
