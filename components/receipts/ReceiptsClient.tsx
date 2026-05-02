"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Trash2, Check } from "lucide-react";
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

export default function ReceiptsClient({
  initialItems,
  initialQuota,
}: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [label, setLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ReceiptItem[]>(initialItems);
  const [quota, setQuota] = useState<Quota>(initialQuota);
  const [latestId, setLatestId] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (input.trim().length < 30) {
      setError("Paste the full message. Minimum 30 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          label: label.trim() || undefined,
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

  return (
    <div className="space-y-10">
      {/* Composer */}
      <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-6 sm:p-8 space-y-5">
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
          rows={8}
          placeholder="Paste the message or exchange here. Quote both sides if it is a back-and-forth. The fuller the input, the cleaner the read."
          maxLength={12_000}
          className="w-full bg-deep-black/40 border border-gray-800 rounded px-4 py-3 text-sm text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50 leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
          disabled={submitting}
        />

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
