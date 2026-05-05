"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Loader2,
  Upload,
  Video as VideoIcon,
  FileVideo,
  CheckCircle,
  XCircle,
  Plus,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import AnswerQuestionPicker from "@/components/admin/AnswerQuestionPicker";

interface VideoPost {
  id: string;
  title: string;
  content: string;
  type: string;
  videoUrl: string | null;
  videoPosterUrl: string | null;
  videoDurationSeconds: number | null;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    role: string;
  } | null;
}

const ACCEPTED = "video/*,.mp4,.mov,.m4v,.webm";
const MAX_BYTES = 500 * 1024 * 1024;

function isValidVideo(f: File): boolean {
  const validExts = ["mp4", "mov", "m4v", "webm"];
  const ext = f.name.split(".").pop()?.toLowerCase() || "";
  if (ext && validExts.includes(ext)) return true;
  const mime = (f.type || "").toLowerCase();
  if (mime.startsWith("video/")) return true;
  return false;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

/**
 * Probe a local File for its duration. Returns null if the browser can't
 * read metadata for whatever reason (corrupt header, unsupported codec) —
 * we just leave the duration field null in that case rather than blocking
 * the upload.
 */
function probeDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.muted = true;
    v.src = url;
    const cleanup = () => {
      URL.revokeObjectURL(url);
    };
    v.onloadedmetadata = () => {
      const d = v.duration;
      cleanup();
      resolve(isFinite(d) && d > 0 ? Math.round(d) : null);
    };
    v.onerror = () => {
      cleanup();
      resolve(null);
    };
  });
}

export default function VideosPage() {
  const [posts, setPosts] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [answersQuestionId, setAnswersQuestionId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/feed");
      if (res.ok) {
        const data = await res.json();
        const videos = (data.posts || []).filter(
          (p: VideoPost) => p.type === "VIDEO",
        );
        setPosts(videos);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Deep-link from /admin/questions: ?answers=<questionId> opens the
  // form pre-bound to a specific question so the AnswerQuestionPicker
  // already has it selected. Reads window.location once on mount to
  // avoid a Suspense boundary from useSearchParams.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URLSearchParams(window.location.search).get("answers");
    if (id) {
      setAnswersQuestionId(id);
      setShowForm(true);
    }
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    void acceptFile(dropped);
  }

  async function acceptFile(f: File | undefined) {
    if (!f) return;
    if (!isValidVideo(f)) {
      setUploadStatus("error");
      setStatusMessage(
        "That file doesn't look like video. Supported: MP4, MOV, M4V, WEBM.",
      );
      return;
    }
    if (f.size > MAX_BYTES) {
      setUploadStatus("error");
      setStatusMessage(
        `File too large (max ${MAX_BYTES / (1024 * 1024)}MB). Encode it down before uploading.`,
      );
      return;
    }
    setFile(f);
    setUploadStatus("idle");
    const d = await probeDuration(f);
    setDuration(d);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !file) return;

    setSubmitting(true);
    setUploadStatus("idle");
    setStatusMessage("");
    setProgress(0);

    try {
      // 1. Ask the server for a presigned PUT URL. The video bytes
      //    never pass through Railway's edge proxy, previously the
      //    proxy 502'd on ~170 MB uploads before Next.js saw them.
      const presignRes = await fetch("/api/consilium/feed/video/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          size: file.size,
          type: file.type,
        }),
      });
      if (!presignRes.ok) {
        const body = await presignRes.json().catch(() => null);
        throw new Error(
          body?.error || `Could not prepare upload (${presignRes.status})`,
        );
      }
      const { uploadUrl, publicUrl, key, contentType } = (await presignRes.json()) as {
        uploadUrl: string;
        publicUrl: string;
        key: string;
        contentType: string;
      };

      // 2. PUT the bytes direct to R2. XHR (not fetch) so we can
      //    display real upload progress; fetch does not expose
      //    request progress events in any browser.
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", contentType);
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload to storage failed (${xhr.status})`));
        };
        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(file);
      });

      // 3. Server-side HEAD-check confirming the object landed before
      //    we create the feed post pointing at it.
      const verifyRes = await fetch("/api/consilium/feed/video/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!verifyRes.ok) {
        const body = await verifyRes.json().catch(() => null);
        throw new Error(
          body?.error || `Could not verify upload (${verifyRes.status})`,
        );
      }

      const postRes = await fetch("/api/consilium/feed/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: description.trim() || title.trim(),
          type: "VIDEO",
          videoUrl: publicUrl,
          videoDurationSeconds: duration,
        }),
      });

      if (!postRes.ok) {
        throw new Error("Failed to create feed post");
      }

      // If this video answers a member question, link it. PATCH sets
      // status=ANSWERED and fires the asker email. Non-fatal on failure.
      if (answersQuestionId) {
        try {
          const post = await postRes.json();
          await fetch(`/api/admin/questions/${answersQuestionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answerPostId: post.post?.id ?? post.id }),
          });
        } catch {
          // Logged via /api/admin/questions; UI continues.
        }
      }

      setUploadStatus("success");
      setStatusMessage(
        answersQuestionId
          ? "Video published, asker has been notified"
          : "Video published to feed",
      );
      setTitle("");
      setDescription("");
      setFile(null);
      setDuration(null);
      setAnswersQuestionId(null);
      setShowForm(false);
      fetchVideos();
    } catch (err) {
      setUploadStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
      setProgress(null);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Videos
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setUploadStatus("idle");
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
        >
          {showForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Upload Video"}
        </button>
      </div>

      {uploadStatus !== "idle" && (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm font-light animate-fade-in ${
            uploadStatus === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {uploadStatus === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <XCircle size={16} />
          )}
          {statusMessage}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
              placeholder="Video title..."
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="Optional description shown above the video..."
              maxLength={2000}
            />
          </div>

          <AnswerQuestionPicker
            value={answersQuestionId}
            onChange={setAnswersQuestionId}
            disabled={submitting}
          />

          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Video File
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? "border-accent-gold/50 bg-accent-gold/5"
                  : file
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-white/10 hover:border-accent-gold/30 hover:bg-white/[0.02]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED}
                onChange={(e) => acceptFile(e.target.files?.[0])}
                className="hidden"
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileVideo size={24} className="text-emerald-400" />
                  <div className="text-left">
                    <p className="text-text-light text-sm font-light">{file.name}</p>
                    <p className="text-text-gray text-xs">
                      {formatFileSize(file.size)}
                      {duration && ` · ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setDuration(null);
                    }}
                    className="text-text-gray hover:text-red-400 transition-colors ml-2"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto text-text-gray/50 mb-3" />
                  <p className="text-text-gray text-sm font-light mb-1">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-text-gray/50 text-xs">
                    MP4, MOV, M4V, WEBM &middot; Max 500MB
                  </p>
                  <p className="text-text-gray/40 text-[10px] mt-2">
                    Tip: encode 1080p H.264 mp4 at ~4–6 Mbps for smooth playback on mobile.
                  </p>
                </div>
              )}
            </div>
          </div>

          {progress !== null && (
            <div>
              <div className="flex items-center justify-between text-xs text-text-gray mb-1.5">
                <span>Uploading…</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-accent-gold/70 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !title.trim() || !file}
            className="flex items-center gap-2 px-6 py-3 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {submitting ? "Uploading..." : "Publish Video"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <VideoIcon size={32} className="mx-auto text-text-gray/30 mb-3" />
          <p className="text-text-gray font-light">No videos yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="glass-card rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <VideoIcon size={18} className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-text-light font-light text-lg">{post.title}</h3>
                    <p className="text-text-gray/60 text-xs">
                      {post.author?.name || "System"} &middot;{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                      {post.videoDurationSeconds &&
                        ` · ${Math.floor(post.videoDurationSeconds / 60)}:${(post.videoDurationSeconds % 60).toString().padStart(2, "0")}`}
                    </p>
                  </div>
                </div>
              </div>

              {post.content && post.content !== post.title && (
                <p className="text-text-light/80 text-sm font-light leading-relaxed mb-4">
                  {post.content}
                </p>
              )}

              {post.videoUrl && (
                <div className="flex items-start gap-3">
                  <video
                    controls
                    preload="metadata"
                    poster={post.videoPosterUrl ?? undefined}
                    className="flex-1 w-full rounded bg-deep-black aspect-video"
                  >
                    <source src={post.videoUrl} />
                  </video>
                  <a
                    href={post.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-gray hover:text-accent-gold transition-colors mt-1"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
