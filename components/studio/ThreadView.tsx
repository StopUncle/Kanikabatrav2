"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string | null;
  fromAdmin: boolean;
  voiceNoteUrl?: string | null;
  createdAt: string;
}

/**
 * A private thread with one member, and a box to reply in.
 *
 * Reads and writes through /api/admin/messages/[memberId], which Studio
 * shares with the admin inbox rather than duplicating: it is already
 * PIN-gated, and its GET is what stamps the thread read and drops
 * adminUnread to zero, which is also what clears this member from the
 * badge count.
 */
export default function ThreadView({
  memberId,
  memberName,
}: {
  memberId: string;
  memberName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/messages/${memberId}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        setError("Could not load this conversation.");
        return;
      }
      const data = (await res.json()) as { messages: Message[] };
      setMessages(data.messages ?? []);
    } catch {
      setError("Connection problem.");
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  async function send() {
    const content = text.trim();
    if (!content || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/messages/${memberId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Could not send.");
        return;
      }
      setText("");
      await load();
    } catch {
      setError("Connection problem.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70dvh] flex-col">
      <div className="flex-1 space-y-2.5 pb-4">
        {loading && (
          <p className="text-[14px] font-light text-[#7a6f60]">Loading…</p>
        )}
        {!loading && messages.length === 0 && (
          <p className="text-[14px] font-light text-[#7a6f60]">
            No messages yet.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
              m.fromAdmin
                ? "ml-auto bg-[#722139] text-[#f5f0ed]"
                : "border border-[#d4af37]/15 bg-[#141110] text-[#f5f0ed]"
            }`}
          >
            {m.voiceNoteUrl && (
              /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <audio controls src={m.voiceNoteUrl} className="mb-2 w-full" />
            )}
            {m.content && (
              <p className="text-[15px] font-light leading-relaxed">
                {m.content}
              </p>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {error && <p className="mb-2 text-sm text-[#e0796f]">{error}</p>}

      <div className="sticky bottom-0 flex gap-2 bg-[#0a0908] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder={`Reply to ${memberName}`}
          className="flex-1 resize-none rounded-2xl border border-[#d4af37]/20 bg-[#141110] px-4 py-3 text-[15px] font-light text-[#f5f0ed] placeholder:text-[#7a6f60] focus:border-[#d4af37]/50 focus:outline-none"
        />
        <button
          onClick={send}
          disabled={busy || !text.trim()}
          className="shrink-0 rounded-full bg-[#d4af37] px-5 text-sm font-medium text-[#0a0908] disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
