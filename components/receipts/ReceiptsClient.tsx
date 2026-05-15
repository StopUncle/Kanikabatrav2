"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Trash2, Check, ImagePlus, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

interface ReceiptItem {
  id: string;
  label: string | null;
  response: string;
  createdAt: string;
}

interface Quota {
  used: number;
  cap: number;
  remaining: number;
}

interface Props {
  initialItems: ReceiptItem[];
  initialQuota: Quota;
}

// Mirrors lib/receipts/anthropic.ts. Keep in sync.
const MAX_IMAGES = 2;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

type StagedImage = {
  /** Stable id for React keys + remove. Generated client-side. */
  id: string;
  base64: string;
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  /** ObjectURL for thumbnail preview, revoked on unmount/remove. */
  previewUrl: string;
  /** File name when available (drag-drop / picker); blank for paste. */
  name: string;
};

/**
 * Read a File as a base64-encoded string (no `data:` URL prefix).
 * Used to ship images in a JSON request body. Rejects on non-image
 * MIME or oversize files; returns null on validation failure so the
 * caller can surface a single combined error.
 */
async function fileToStagedImage(file: File): Promise<StagedImage | string> {
  if (!ACCEPTED_MIME.has(file.type)) {
    return "Only JPEG, PNG, WebP, or GIF screenshots.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Each screenshot must be under 4MB. Try a JPEG export.";
  }
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    base64,
    mediaType: file.type as StagedImage["mediaType"],
    previewUrl: URL.createObjectURL(file),
    name: file.name || "",
  };
}

export default function ReceiptsClient({
  initialItems,
  initialQuota,
}: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [label, setLabel] = useState("");
  const [images, setImages] = useState<StagedImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ReceiptItem[]>(initialItems);
  const [quota, setQuota] = useState<Quota>(initialQuota);
  const [latestId, setLatestId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke any outstanding object URLs when the component unmounts so
  // we don't leak blob: handles across navigations.
  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
    // We intentionally run cleanup only on unmount; per-image revocation
    // happens at remove() time below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addFiles(files: FileList | File[]) {
    setError(null);
    const incoming = Array.from(files);
    if (incoming.length === 0) return;

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`At most ${MAX_IMAGES} screenshots per receipt.`);
      return;
    }

    const accepted: StagedImage[] = [];
    const errors: string[] = [];
    for (const file of incoming.slice(0, remaining)) {
      const result = await fileToStagedImage(file);
      if (typeof result === "string") {
        errors.push(result);
      } else {
        accepted.push(result);
      }
    }
    if (incoming.length > remaining) {
      errors.push(`Only the first ${remaining} kept; max is ${MAX_IMAGES}.`);
    }
    if (errors.length > 0) setError(errors[0]);
    if (accepted.length > 0) setImages((prev) => [...prev, ...accepted]);
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const removed = prev.find((i) => i.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const imageItems = Array.from(e.clipboardData.items).filter(
      (item) => item.kind === "file" && item.type.startsWith("image/"),
    );
    if (imageItems.length === 0) return;
    e.preventDefault();
    const files = imageItems
      .map((item) => item.getAsFile())
      .filter((f): f is File => f !== null);
    if (files.length > 0) void addFiles(files);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void addFiles(e.dataTransfer.files);
    }
  }

  async function submit() {
    setError(null);
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0 && images.length === 0) {
      setError("Paste a message or attach a screenshot.");
      return;
    }
    if (
      trimmedInput.length > 0 &&
      trimmedInput.length < 30 &&
      images.length === 0
    ) {
      setError(
        "Paste the full exchange. Minimum 30 characters when there's no screenshot.",
      );
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: trimmedInput,
          label: label.trim() || undefined,
          images:
            images.length > 0
              ? images.map((i) => ({
                  base64: i.base64,
                  mediaType: i.mediaType,
                }))
              : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Receipts could not produce a read.");
        setSubmitting(false);
        return;
      }
      const r = data.receipt;
      setItems((prev) => [
        {
          id: r.id,
          label: r.label,
          response: r.response,
          createdAt: r.createdAt ?? new Date().toISOString(),
        },
        ...prev.filter((i) => i.id !== r.id),
      ]);
      if (data.quota) setQuota(data.quota);
      setLatestId(r.id);
      setInput("");
      setLabel("");
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      setImages([]);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  async function remove(id: string) {
    const confirmed = window.confirm(
      "Delete this Receipt? It cannot be undone.",
    );
    if (!confirmed) return;
    await fetch(`/api/receipts/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const overCap = quota.remaining === 0;
  const canAddMoreImages = images.length < MAX_IMAGES;

  return (
    <div className="space-y-10">
      {/* Composer. Wrapped in onDrop so anywhere inside it accepts a
          dropped screenshot. */}
      <div
        className={`rounded-lg border bg-deep-black/60 p-6 sm:p-8 space-y-5 transition-colors ${
          dragOver
            ? "border-accent-gold/60 bg-accent-gold/[0.04]"
            : "border-gray-800"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          if (canAddMoreImages) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em]">
            Paste a message exchange
          </p>
          <p
            className={`text-[10px] uppercase tracking-[0.3em] ${
              overCap ? "text-accent-burgundy" : "text-text-gray"
            }`}
          >
            {quota.used} / {quota.cap} this week
          </p>
        </div>

        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Optional label (e.g. ex Tuesday)"
          maxLength={120}
          className="w-full bg-deep-black/40 border border-gray-800 rounded px-4 py-2.5 text-sm text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50"
        />

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={onPaste}
          rows={8}
          placeholder="Paste the message or exchange here. Or drop a screenshot anywhere in this box, or paste one with Cmd/Ctrl+V."
          maxLength={12_000}
          className="w-full bg-deep-black/40 border border-gray-800 rounded px-4 py-3 text-sm text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50 leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
          disabled={submitting}
        />

        {/* Image attachment row: thumbnail strip + add-button. Only
            renders when there's at least one image or when adding is
            still allowed, so the empty composer stays minimal. */}
        {(images.length > 0 || canAddMoreImages) && (
          <div className="flex items-center gap-3 flex-wrap">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-md overflow-hidden border border-gray-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={img.name || "Screenshot"}
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label="Remove screenshot"
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-deep-black/80 text-text-light hover:bg-accent-burgundy flex items-center justify-center transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {canAddMoreImages && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-gray-700 hover:border-accent-gold/60 text-text-gray hover:text-accent-gold text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
                >
                  <ImagePlus size={14} />
                  Add screenshot
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) void addFiles(e.target.files);
                    // Reset so re-picking the same file fires onChange.
                    e.target.value = "";
                  }}
                />
                <span className="text-text-gray/50 text-[10px] uppercase tracking-[0.25em]">
                  up to {MAX_IMAGES} · 4MB each · jpeg/png/webp
                </span>
              </>
            )}
          </div>
        )}

        {error && (
          <p className="text-accent-burgundy text-sm">{error}</p>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-text-gray/60 text-xs">
            Your input is not stored. Only the read is saved.
          </p>
          <button
            onClick={submit}
            disabled={submitting || overCap}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Reading…
              </>
            ) : (
              <>
                <Send size={14} />
                Get the read
              </>
            )}
          </button>
        </div>
      </div>

      {/* Past receipts */}
      <div>
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-5">
          Your receipts
        </h2>
        {items.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-deep-black/40 p-10 text-center">
            <p className="text-text-gray font-light text-sm">
              No receipts yet. Paste something above and Kanika will read it.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((r) => (
                <m.article
                  key={r.id}
                  initial={
                    r.id === latestId ? { opacity: 0, y: 12 } : { opacity: 1 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`rounded-lg border p-5 sm:p-6 ${
                    r.id === latestId
                      ? "border-accent-gold/50 bg-accent-gold/5"
                      : "border-gray-800 bg-deep-black/40"
                  }`}
                >
                  <header className="flex items-baseline justify-between mb-4">
                    <p className="text-text-light text-sm font-light">
                      {r.label || "Untitled"}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-text-gray/60 text-[10px] uppercase tracking-[0.3em]">
                        {new Date(r.createdAt)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                      <CopyButton text={r.response} />
                      <button
                        onClick={() => remove(r.id)}
                        className="text-text-gray/50 hover:text-accent-burgundy"
                        aria-label="Delete receipt"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </header>
                  <ReceiptBody markdown={r.response} />
                </m.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className="text-text-gray/60 hover:text-accent-gold text-[10px] uppercase tracking-[0.3em] flex items-center gap-1"
      aria-label="Copy receipt"
    >
      {copied ? <Check size={12} /> : null}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * Tiny markdown renderer for the 3-section receipts. We only need:
 *   - ## headings
 *   - paragraph text
 * Anything else falls through as plain text. Keeps the bundle lean.
 */
function ReceiptBody({ markdown }: { markdown: string }) {
  const lines = markdown.split(/\r?\n/);
  const blocks: Array<{ kind: "h2" | "p"; text: string }> = [];
  let buffer: string[] = [];

  function flush() {
    if (buffer.length === 0) return;
    blocks.push({ kind: "p", text: buffer.join(" ").trim() });
    buffer = [];
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
    } else if (line.length === 0) {
      flush();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return (
    <div className="space-y-4">
      {blocks.map((b, i) =>
        b.kind === "h2" ? (
          <h3
            key={i}
            className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mt-2"
          >
            {b.text}
          </h3>
        ) : (
          <p
            key={i}
            className="text-text-light text-sm sm:text-base font-light leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {b.text}
          </p>
        ),
      )}
    </div>
  );
}
