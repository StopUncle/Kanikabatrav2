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
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    role: string;
  } | null;
}

const POST_TYPES = ["ANNOUNCEMENT", "DISCUSSION_PROMPT"] as const;

export default function PostsPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "ANNOUNCEMENT" as string,
    isPinned: false,
  });

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/consilium/feed");
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
    try {
      const res = await fetch("/api/consilium/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", content: "", type: "ANNOUNCEMENT", isPinned: false });
        setShowForm(false);
        fetchPosts();
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Posts
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
        >
          {showForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Create Post"}
        </button>
      </div>

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-text-gray font-light">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
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
                  <h3 className="text-text-light font-light text-lg">{post.title}</h3>
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
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-wide text-text-gray border border-white/10 rounded hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200">
                  {post.isPinned ? <PinOff size={12} /> : <Pin size={12} />}
                  {post.isPinned ? "Unpin" : "Pin"}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light tracking-wide text-text-gray border border-white/10 rounded hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200">
                  {post.isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                  {post.isLocked ? "Unlock" : "Lock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
