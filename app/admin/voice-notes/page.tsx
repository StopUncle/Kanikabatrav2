"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Loader2,
  Upload,
  Mic,
  FileAudio,
  CheckCircle,
  XCircle,
  Plus,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import VoiceRecorder from "@/components/admin/VoiceRecorder";
import AnswerQuestionPicker from "@/components/admin/AnswerQuestionPicker";

interface VoiceNotePost {
  id: string;
  title: string;
  content: string;
  type: string;
  voiceNoteUrl: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    role: string;
  } | null;
}

export default function VoiceNotesPage() {
  const [posts, setPosts] = useState<VoiceNotePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [answersQuestionId, setAnswersQuestionId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const micInputRef = useRef<HTMLInputElement>(null);

  // Combined extension + wildcard so iOS Safari Files/Voice Memos picker
  // lets you select .m4a files (which it sometimes filters out with an
  // extension-only accept attr), and Android/desktop still see explicit exts.
  const ACCEPTED_TYPES = "audio/*,.mp3,.m4a,.mp4,.wav,.ogg,.webm,.aac,.caf";

  const fetchVoiceNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/feed");
      if (res.ok) {
        const data = await res.json();
        const voiceNotes = (data.posts || []).filter(
          (p: VoiceNotePost) => p.type === "VOICE_NOTE",
        );
        setPosts(voiceNotes);
      }
    } catch (err) {
      console.error("Failed to fetch voice notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVoiceNotes();
  }, [fetchVoiceNotes]);

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
    if (dropped && isValidAudio(dropped)) {
      setFile(dropped);
    } else if (dropped) {
      setUploadStatus("error");
      setStatusMessage(
        "That file doesn't look like audio. Supported: MP3, M4A, MP4, WAV, OGG, WEBM, AAC, CAF.",
      );
    }
  }

  // Accept anything whose extension OR MIME type looks like audio. IPhone
  // Voice Memos shared via the Files app occasionally arrive with empty
  // extension but a correct audio/* MIME, and the reverse also happens.
  function isValidAudio(f: File): boolean {
    const validExts = ["mp3", "m4a", "mp4", "wav", "ogg", "webm", "aac", "caf"];
    const ext = f.name.split(".").pop()?.toLowerCase() || "";
    if (ext && validExts.includes(ext)) return true;
    const mime = (f.type || "").toLowerCase();
    if (mime.startsWith("audio/")) return true;
    // iOS occasionally reports recordings as video/mp4 (AAC-in-MP4).
    if (mime === "video/mp4") return true;
    return false;
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !file) return;

    setSubmitting(true);
    setUploadStatus("idle");
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("audio", file);

      const uploadRes = await fetch("/api/consilium/voice-notes/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const { url } = await uploadRes.json();

      const postRes = await fetch("/api/consilium/feed/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: description.trim() || title.trim(),
          type: "VOICE_NOTE",
          voiceNoteUrl: url,
        }),
      });

      if (!postRes.ok) {
        throw new Error("Failed to create feed post");
      }

      // If this voice note answers a member question, link it. The PATCH
      // sets MemberQuestion.status=ANSWERED and fires the asker email.
      // Failure here is non-fatal, the voice note is already published.
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
          ? "Voice note published, asker has been notified"
          : "Voice note published to feed",
      );
      setTitle("");
      setDescription("");
      setFile(null);
      setAnswersQuestionId(null);
      setShowForm(false);
      fetchVoiceNotes();
    } catch (err) {
      setUploadStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Voice Notes
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setUploadStatus("idle");
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
        >
          {showForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Upload Voice Note"}
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
              placeholder="Voice note title..."
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
              placeholder="Optional description..."
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
              Record Voice Note
            </label>
            <VoiceRecorder
              onRecorded={(f) => setFile(f)}
              disabled={submitting}
            />
            <button
              type="button"
              onClick={() => micInputRef.current?.click()}
              className="mt-2 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.02] border border-white/10 rounded text-sm text-text-gray hover:border-accent-gold/30 hover:text-accent-gold transition-all sm:hidden"
            >
              <Mic size={14} />
              Record with iPhone mic
            </button>
            <input
              ref={micInputRef}
              type="file"
              accept="audio/*"
              // `capture` tells iOS/Android Safari to open the mic directly
              // instead of the Files picker. Desktop browsers ignore it and
              // fall back to a normal file dialog.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore, `capture` is valid HTML but TS types lag
              capture="user"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && isValidAudio(f)) {
                  setFile(f);
                  setUploadStatus("idle");
                } else if (f) {
                  setUploadStatus("error");
                  setStatusMessage(
                    "That recording didn't come through as audio. Try again or use Voice Memos → Share → Save to Files → Upload File.",
                  );
                }
              }}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-text-gray/40 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Upload File
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
                accept={ACCEPTED_TYPES}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f && isValidAudio(f)) {
                    setFile(f);
                    setUploadStatus("idle");
                  } else if (f) {
                    setUploadStatus("error");
                    setStatusMessage(
                      "That file doesn't look like audio. Try an MP3, M4A, WAV, OGG, WEBM, AAC, or CAF file.",
                    );
                  }
                }}
                className="hidden"
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileAudio size={24} className="text-emerald-400" />
                  <div className="text-left">
                    <p className="text-text-light text-sm font-light">{file.name}</p>
                    <p className="text-text-gray text-xs">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
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
                    MP3, M4A, MP4, WAV, OGG, WEBM, AAC, CAF &middot; Max 50MB
                  </p>
                  <p className="text-text-gray/40 text-[10px] mt-2">
                    iPhone: record with Voice Memos → Share → Save to Files → pick it here.
                  </p>
                </div>
              )}
            </div>
          </div>

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
            {submitting ? "Uploading..." : "Publish Voice Note"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <Mic size={32} className="mx-auto text-text-gray/30 mb-3" />
          <p className="text-text-gray font-light">No voice notes yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="glass-card rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <Mic size={18} className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-text-light font-light text-lg">{post.title}</h3>
                    <p className="text-text-gray/60 text-xs">
                      {post.author?.name || "System"} &middot;{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {post.content && post.content !== post.title && (
                <p className="text-text-light/80 text-sm font-light leading-relaxed mb-4">
                  {post.content}
                </p>
              )}

              {post.voiceNoteUrl && (
                <div className="flex items-center gap-3">
                  <audio
                    controls
                    preload="metadata"
                    className="flex-1 h-10 [&::-webkit-media-controls-panel]:bg-white/[0.03]"
                  >
                    <source src={post.voiceNoteUrl} />
                  </audio>
                  <a
                    href={post.voiceNoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-gray hover:text-accent-gold transition-colors"
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
