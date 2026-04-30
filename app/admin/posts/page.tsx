"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Plus,
  Pin,
  PinOff,
  Lock,
  Unlock,
  ChevronUp,
  Send,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface FeedPost {
  id: string;
  title: string;
  content: string;
  type: string;
  isPinned: boolean;
  isLocked: boolean;
  likeCount: number;
  commentCount: number;
  voiceNoteUrl?: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    role: string;
  } | null;
}

type TypeFilter = "ALL" | "ANNOUNCEMENT" | "DISCUSSION_PROMPT" | "VOICE_NOTE" | "AUTOMATED";

const POST_TYPES = ["ANNOUNCEMENT", "DISCUSSION_PROMPT"] as const;

export default function PostsPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [flash, setFlash] = useState<
    | { kind: "success" | "error"; message: string }
    | null
  >(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "ANNOUNCEMENT" as string,
    isPinned: false,
  });

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/feed");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setSubmitting(true);
    setFlash(null);
    try {
      const res = await fetch("/api/consilium/feed/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setFlash({
          kind: "success",
          message: `Post created (id ${data.post?.id?.slice(0, 8) ?? "?"}). Showing on the feed now.`,
        });
        setFormData({ title: "", content: "", type: "ANNOUNCEMENT", isPinned: false });
        setShowForm(false);
        fetchPosts();
      } else {
        const err = await res.json().catch(() => ({}));
        setFlash({
          kind: "error",
          message: `${res.status} · ${err.error ?? "Create failed"}${err.detail ? ` (${err.detail})` : ""}`,
        });
      }
    } catch (err) {
      setFlash({
        kind: "error",
        message: `Network error: ${err instanceof Error ? err.message : "unknown"}`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function togglePin(post: FeedPost) {
    await fetch(`/api/consilium/feed/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPinned: !post.isPinned }),
    });
    fetchPosts();
  }

  async function toggleLock(post: FeedPost) {
    await fetch(`/api/consilium/feed/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLocked: !post.isLocked }),
    });
    fetchPosts();
  }

  async function deletePost(post: FeedPost) {
    const confirmed = window.confirm(
      `Delete "${post.title}"?\n\nThis removes the post, all comments, and all likes. Can't be undone.`,
    );
    if (!confirmed) return;
    const res = await fetch(`/api/consilium/feed/${post.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
  }

  async function refreshWelcome() {
    const confirmed = window.confirm(
      "Refresh the pinned welcome post to the latest house-rules version?\n\nKeeps the same post id, comments and likes carry over.",
    );
    if (!confirmed) return;
    setFlash(null);
    const res = await fetch("/api/admin/refresh-welcome", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setFlash({
        kind: "success",
        message: `Welcome post ${data.action ?? "updated"} (id ${data.post?.id?.slice(0, 8) ?? "?"}). Hard-refresh the feed to see it.`,
      });
      fetchPosts();
    } else {
      const err = await res.json().catch(() => ({}));
      setFlash({
        kind: "error",
        message: `${res.status} · ${err.error ?? "Refresh failed"}`,
      });
    }
  }

  async function bulkDelete(ids: string[], label: string) {
    const confirmed = window.confirm(
      `Delete ${ids.length} ${label}?\n\nRemoves posts + all comments + all likes. Can't be undone.`,
    );
    if (!confirmed) return;
    await Promise.all(
      ids.map((id) =>
        fetch(`/api/consilium/feed/${id}`, { method: "DELETE" }),
      ),
    );
    const deleted = new Set(ids);
    setPosts((prev) => prev.filter((p) => !deleted.has(p.id)));
  }

  const visiblePosts =
    typeFilter === "ALL"
      ? posts
      : posts.filter((p) => p.type === typeFilter);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Posts
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshWelcome}
            title="Refresh pinned welcome post to latest house-rules version"
            className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide text-text-gray border border-white/10 rounded hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200"
          >
            <RefreshCw size={14} />
            Refresh Welcome
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
          >
            {showForm ? <ChevronUp size={16} /> : <Plus size={16} />}
            {showForm ? "Close" : "Create Post"}
          </button>
        </div>
      </div>

      {flash && (
        <div
          className={`mb-6 px-4 py-3 rounded border text-sm font-light ${
            flash.kind === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {flash.message}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-lg p-6 mb-8 space-y-4"
        >
          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
              placeholder="Post title..."
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors resize-none"
              rows={8}
              placeholder="Post content..."
              maxLength={10000}
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="bg-white/[0.03] border border-white/10 rounded px-4 py-2.5 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
              >
                {POST_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-deep-black">
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 mt-5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/[0.03] accent-accent-gold"
              />
              <span className="text-text-gray text-sm font-light">Pin post</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || !formData.title.trim() || !formData.content.trim()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Publish Post
          </button>
        </form>
      )}

      {!loading && posts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-text-gray text-xs uppercase tracking-wider">
            Filter
          </span>
          {(["ALL", "ANNOUNCEMENT", "DISCUSSION_PROMPT", "VOICE_NOTE", "AUTOMATED"] as const).map(
            (t) => {
              const count =
                t === "ALL"
                  ? posts.length
                  : posts.filter((p) => p.type === t).length;
              const active = typeFilter === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    active
                      ? "bg-accent-gold/15 border-accent-gold/50 text-accent-gold"
                      : "border-white/10 text-text-gray hover:border-accent-gold/30 hover:text-accent-gold"
                  }`}
                >
                  {t.replace("_", " ")} {count > 0 ? `(${count})` : ""}
                </button>
              );
            },
          )}
          {typeFilter !== "ALL" && visiblePosts.length > 0 && (
            <button
              type="button"
              onClick={() =>
                bulkDelete(
                  visiblePosts.map((p) => p.id),
                  `${typeFilter.replace("_", " ").toLowerCase()}s`,
                )
              }
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={12} />
              Delete all {visiblePosts.length} {typeFilter.replace("_", " ").toLowerCase()}
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">No posts match this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visiblePosts.map((post) => (
            <div key={post.id} className="glass-card rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {post.isPinned && (
                      <Pin size={14} className="text-accent-gold" />
                    )}
                    {post.isLocked && (
                      <Lock size={14} className="text-red-400" />
                    )}
                    <span className="text-xs uppercase tracking-wider text-accent-sapphire/70">
                      {post.type.replace("_", " ")}
                    </span>
                  </div>
                  <a
                    href={`/consilium/feed/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light font-light text-lg hover:text-accent-gold transition-colors"
                  >
                    {post.title}
                  </a>
                  <p className="text-text-gray/60 text-xs mt-1">
                    {post.author?.name || "System"} &middot;{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-text-gray text-xs">
                  <span>{post.likeCount} likes</span>
                  <span>{post.commentCount} comments</span>
                </div>
              </div>

              <p className="text-text-light/80 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                {post.content}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => togglePin(post)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-wide text-text-gray border border-white/10 rounded hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200"
                >
                  {post.isPinned ? <PinOff size={12} /> : <Pin size={12} />}
                  {post.isPinned ? "Unpin" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleLock(post)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-wide text-text-gray border border-white/10 rounded hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200"
                >
                  {post.isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                  {post.isLocked ? "Unlock" : "Lock"}
                </button>
                <button
                  type="button"
                  onClick={() => deletePost(post)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-wide text-red-400/80 border border-red-500/20 rounded hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-200"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
