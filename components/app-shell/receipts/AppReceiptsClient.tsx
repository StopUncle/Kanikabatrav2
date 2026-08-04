"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Trash2, Check, ImagePlus, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

/**
 * Receipts in the app skin. Same API contract and composer logic as the
 * consilium ReceiptsClient; only the clothes changed. The old skin keeps
 * its own component, so the two surfaces can drift apart on purpose.
 */

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
  id: string;
  base64: string;
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  previewUrl: string;
  name: string;
};

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

export default function AppReceiptsClient({ initialItems, initialQuota }: Props) {
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

  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
    // Cleanup only on unmount; per-image revocation happens in remove().
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
    <div className="flex flex-col gap-8">
      {/* Composer. Wrapped in onDrop so anywhere inside accepts a
          dropped screenshot. */}
      <div
        className={`flex flex-col gap-3.5 rounded-2xl border p-4 transition-colors ${
          dragOver
            ? "border-[var(--app-gold)] bg-[rgba(212,175,55,0.04)]"
            : "border-[var(--app-gold-soft)] bg-[var(--app-card)]"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          if (canAddMoreImages) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-80">
            Paste the exchange
          </p>
          <p
            className={`text-app-tiny uppercase tracking-app-wide ${
              overCap ? "text-[var(--app-rose)]" : "text-[var(--app-dim)]"
            }`}
          >
            {quota.used}/{quota.cap} this week
          </p>
        </div>

        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Optional label (e.g. ex Tuesday)"
          maxLength={120}
          className="w-full rounded-xl border border-[var(--app-line)] bg-[var(--app-black)] px-3.5 py-2.5 text-app-body text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)] focus:outline-none"
        />

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={onPaste}
          rows={6}
          placeholder="Paste the message or exchange here, or attach a screenshot below."
          maxLength={12_000}
          className="w-full rounded-xl border border-[var(--app-line)] bg-[var(--app-black)] px-3.5 py-3 text-app-body leading-relaxed text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)] focus:outline-none"
          disabled={submitting}
        />

        {(images.length > 0 || canAddMoreImages) && (
          <div className="flex flex-wrap items-center gap-2.5">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-xl border border-[var(--app-line)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={img.name || "Screenshot"}
                  className="h-16 w-16 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label="Remove screenshot"
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(10,9,8,0.85)] text-[var(--app-text)]"
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
                  className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-[var(--app-line)] px-3 py-2 text-app-tiny uppercase tracking-app-wide text-[var(--app-muted)] transition-colors active:border-[var(--app-gold-soft)] active:text-[var(--app-gold)] disabled:opacity-50"
                >
                  <ImagePlus size={13} />
                  Screenshot
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
                <span className="text-app-micro uppercase tracking-app-wide text-[var(--app-dim)]">
                  up to {MAX_IMAGES}, 4MB each
                </span>
              </>
            )}
          </div>
        )}

        {error && (
          <p className="text-app-caption text-[var(--app-rose)]">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={submitting || overCap}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--app-gold)] py-3.5 text-app-caption font-semibold uppercase tracking-app-wide text-[var(--app-on-gold)] transition-transform active:scale-[0.97] disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Reading
            </>
          ) : (
            <>
              <Send size={14} />
              Get the read
            </>
          )}
        </button>

        <p className="text-center text-app-micro text-[var(--app-dim)]">
          Your input is not stored. Only the read is saved.
        </p>
      </div>

      {/* Past receipts */}
      <div>
        <h2 className="mb-3 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
          Your receipts
        </h2>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-6 text-center">
            <p className="text-app-body text-[var(--app-muted)]">
              No receipts yet. Paste something above and Kanika will read it.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
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
                  className={`rounded-2xl border p-4 ${
                    r.id === latestId
                      ? "border-[var(--app-gold-soft)] bg-[rgba(212,175,55,0.05)]"
                      : "border-[var(--app-line-soft)] bg-[var(--app-card)]"
                  }`}
                >
                  <header className="mb-3 flex items-baseline justify-between gap-3">
                    <p className="min-w-0 truncate text-app-body text-[var(--app-text)]">
                      {r.label || "Untitled"}
                    </p>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-app-micro uppercase tracking-app-wide text-[var(--app-dim)]">
                        {new Date(r.createdAt).toISOString().slice(0, 10)}
                      </span>
                      <CopyButton text={r.response} />
                      <button
                        onClick={() => remove(r.id)}
                        className="text-[var(--app-dim)] active:text-[var(--app-rose)]"
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
      className="flex items-center gap-1 text-app-micro uppercase tracking-app-wide text-[var(--app-dim)] active:text-[var(--app-gold)]"
      aria-label="Copy receipt"
    >
      {copied ? <Check size={12} /> : null}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * Tiny markdown renderer for the 3-section receipts: ## headings and
 * paragraphs. Anything else falls through as plain text.
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
    <div className="flex flex-col gap-3">
      {blocks.map((b, i) =>
        b.kind === "h2" ? (
          <h3
            key={i}
            className="mt-1 text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70"
          >
            {b.text}
          </h3>
        ) : (
          <p
            key={i}
            className="text-app-body leading-relaxed text-[var(--app-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {b.text}
          </p>
        ),
      )}
    </div>
  );
}
