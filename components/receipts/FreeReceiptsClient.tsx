"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, ImagePlus, X, Check, ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import Link from "next/link";
import ReceiptBody from "./ReceiptBody";

// Mirrors lib/receipts/anthropic.ts. Keep in sync.
const MAX_IMAGES = 2;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    base64: btoa(binary),
    mediaType: file.type as StagedImage["mediaType"],
    previewUrl: URL.createObjectURL(file),
    name: file.name || "",
  };
}

type Phase = "compose" | "read";

export default function FreeReceiptsClient() {
  const [input, setInput] = useState("");
  const [images, setImages] = useState<StagedImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("compose");
  const [read, setRead] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  // True once the anon free read is spent: the email gate is required to
  // unlock the share card and any further reads.
  const [gated, setGated] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addFiles(files: FileList | File[]) {
    setError(null);
    const incoming = Array.from(files);
    if (incoming.length === 0) return;
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`At most ${MAX_IMAGES} screenshots.`);
      return;
    }
    const accepted: StagedImage[] = [];
    for (const file of incoming.slice(0, remaining)) {
      const result = await fileToStagedImage(file);
      if (typeof result === "string") setError(result);
      else accepted.push(result);
    }
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
    if (e.dataTransfer.files?.length) void addFiles(e.dataTransfer.files);
  }

  function validateInput(): string | null {
    const trimmed = input.trim();
    if (trimmed.length === 0 && images.length === 0) {
      return "Paste a message or attach a screenshot.";
    }
    if (trimmed.length > 0 && trimmed.length < 30 && images.length === 0) {
      return "Paste the full exchange. Minimum 30 characters with no screenshot.";
    }
    return null;
  }

  /** Send the read request. With an email it unlocks the share card and
   *  more reads; without, it is the free first read. */
  async function runRead(withEmail: boolean) {
    setError(null);
    const v = validateInput();
    if (v) {
      setError(v);
      return;
    }
    if (withEmail && !EMAIL_RE.test(email.trim())) {
      setError("That email does not look right.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/receipts/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          email: withEmail ? email.trim() : undefined,
          images:
            images.length > 0
              ? images.map((i) => ({ base64: i.base64, mediaType: i.mediaType }))
              : undefined,
        }),
      });
      const data = await res.json();

      if (res.ok && data.gated) {
        // The free read is spent. Show the email gate.
        setGated(true);
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Could not produce a read. Try again.");
        setSubmitting(false);
        return;
      }
      setRead(data.read);
      setShareId(data.shareId ?? null);
      setPhase("read");
      setSubmitting(false);
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  function shareLink(): string {
    if (!shareId) return "";
    return `${window.location.origin}/receipts/r/${shareId}`;
  }

  function copyShare() {
    const link = shareLink();
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function reset() {
    images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setImages([]);
    setInput("");
    setEmail("");
    setRead(null);
    setShareId(null);
    setGated(false);
    setPhase("compose");
    setError(null);
  }

  const canAddMoreImages = images.length < MAX_IMAGES;

  return (
    <div className="space-y-8">
      {phase === "compose" && (
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
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em]">
            Paste a message exchange
          </p>

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

          {(images.length > 0 || canAddMoreImages) && (
            <div className="flex items-center gap-3 flex-wrap">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative rounded-md overflow-hidden border border-gray-800"
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
                      e.target.value = "";
                    }}
                  />
                </>
              )}
            </div>
          )}

          {error && <p className="text-accent-burgundy text-sm">{error}</p>}

          {!gated ? (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-text-gray/60 text-xs">
                Your input is not stored. Only the read is saved.
              </p>
              <button
                onClick={() => runRead(false)}
                disabled={submitting}
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
          ) : (
            <div className="space-y-3 border-t border-gray-800 pt-5">
              <p className="text-text-light text-sm font-light">
                That was your free read. Drop your email for the read on this
                one, the share card, and more reads.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 min-w-[220px] bg-deep-black/40 border border-gray-800 rounded px-4 py-2.5 text-sm text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50"
                />
                <button
                  onClick={() => runRead(true)}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      Unlock the read
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
              <p className="text-text-gray/50 text-[11px]">
                No spam. The patterns most people miss, in your inbox.
              </p>
            </div>
          )}
        </div>
      )}

      {phase === "read" && read && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-lg border border-accent-gold/40 bg-accent-gold/5 p-6 sm:p-8 space-y-6"
        >
          <ReceiptBody markdown={read} />

          <div className="flex items-center gap-3 flex-wrap border-t border-gray-800 pt-5">
            {shareId && (
              <button
                onClick={copyShare}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all"
              >
                {copied ? <Check size={14} /> : null}
                {copied ? "Link copied" : "Copy share link"}
              </button>
            )}
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-700 text-text-gray hover:text-accent-gold hover:border-accent-gold/60 text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Read another
            </button>
          </div>
        </m.div>
      )}

      <div className="rounded-lg border border-gray-800 bg-deep-black/40 p-6 text-center">
        <p className="text-text-gray text-sm font-light mb-3">
          Want unlimited reads, the deeper version, and the room where the
          patterns get named every day?
        </p>
        <Link
          href="/consilium/apply"
          className="inline-flex items-center gap-2 text-accent-gold text-xs uppercase tracking-[0.3em] hover:text-accent-gold/80 transition-colors"
        >
          Join Consilium
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
