"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, XCircle } from "lucide-react";

interface VideoUrlFieldProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  /**
   * When true, renders inline (label + input + button on one row). When
   * false, the upload button stacks below the input. The classroom lesson
   * form uses inline; longer forms can use stacked.
   */
  compact?: boolean;
}

const ACCEPTED = "video/*,.mp4,.mov,.m4v,.webm";
const MAX_BYTES = 500 * 1024 * 1024;

function isValidVideo(f: File): boolean {
  const validExts = ["mp4", "mov", "m4v", "webm"];
  const ext = f.name.split(".").pop()?.toLowerCase() || "";
  if (ext && validExts.includes(ext)) return true;
  return (f.type || "").toLowerCase().startsWith("video/");
}

/**
 * Combined text input + R2 upload button for any field that needs to hold
 * a video URL. Used by the classroom lesson form so admins can either
 * paste a YouTube link or upload an mp4 directly.
 *
 * Reuses /api/consilium/feed/video/upload — that route is admin-gated
 * and the R2 key prefix doesn't gate behavior anywhere downstream, so a
 * single upload path serves both feed and classroom.
 */
export default function VideoUrlField({
  value,
  onChange,
  placeholder = "YouTube URL or video path...",
  compact = false,
}: VideoUrlFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(f: File) {
    setError(null);

    if (!isValidVideo(f)) {
      setError("Not a video file. MP4 / MOV / M4V / WEBM only.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(
        `File too large (max ${MAX_BYTES / (1024 * 1024)}MB). Encode it down before uploading.`,
      );
      return;
    }

    setUploading(true);
    setProgress(0);
    try {
      const fd = new FormData();
      fd.append("video", f);

      const url: string = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/consilium/feed/video/upload");
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText).url);
            } catch (err) {
              reject(err);
            }
          } else {
            try {
              reject(
                new Error(
                  JSON.parse(xhr.responseText).error ||
                    `Upload failed (${xhr.status})`,
                ),
              );
            } catch {
              reject(new Error(`Upload failed (${xhr.status})`));
            }
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(fd);
      });

      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  return (
    <div className={compact ? "flex items-stretch gap-1.5" : "space-y-1.5"}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-text-light text-xs font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="px-3 py-2 text-xs font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 shrink-0"
        aria-label="Upload video file"
      >
        {uploading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            {progress !== null ? `${progress}%` : "…"}
          </>
        ) : (
          <>
            <Upload size={12} />
            Upload
          </>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          // Reset so picking the same filename twice still fires onChange.
          e.target.value = "";
        }}
      />
      {error && (
        <div className="absolute mt-9 inline-flex items-center gap-1 text-[10px] text-red-400">
          <XCircle size={10} />
          {error}
        </div>
      )}
    </div>
  );
}
