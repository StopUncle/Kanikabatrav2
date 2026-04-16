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
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = ".mp3,.m4a,.wav,.ogg,.webm";

  const fetchVoiceNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/inner-circle/feed");
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

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && isValidAudio(dropped)) {
      setFile(dropped);
    }
  }

  function isValidAudio(f: File): boolean {
    const validExts = ["mp3", "m4a", "wav", "ogg", "webm"];
    const ext = f.name.split(".").pop()?.toLowerCase() || "";
    return validExts.includes(ext);
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

      const uploadRes = await fetch("/api/inner-circle/voice-notes/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const { url } = await uploadRes.json();

      const postRes = await fetch("/api/inner-circle/feed", {
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

      setUploadStatus("success");
      setStatusMessage("Voice note published to feed");
      setTitle("");
      setDescription("");
      setFile(null);
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
      <div className="flex items-center justify-between mb-8">
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

          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Record Voice Note
            </label>
            <VoiceRecorder
              onRecorded={(f) => setFile(f)}
              disabled={submitting}
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
                  if (f && isValidAudio(f)) setFile(f);
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
                    MP3, M4A, WAV, OGG, WEBM &middot; Max 50MB
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
