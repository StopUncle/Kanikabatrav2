"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Send, MessageCircle } from "lucide-react";
import {
  subscribeToDirectMessages,
  type DirectMessageWireEvent,
} from "@/lib/pusher/client";
import VoiceNotePlayer from "@/components/consilium/VoiceNotePlayer";

interface DM {
  id: string;
  conversationId: string;
  fromAdmin: boolean;
  content: string;
  voiceNoteUrl: string | null;
  createdAt: string;
  readAt: string | null;
}

export default function MemberMessagesClient() {
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DM[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/consilium/messages", { cache: "no-store" });
      if (!r.ok) return;
      const body: {
        conversation: { id: string; status: string } | null;
        messages: DM[];
      } = await r.json();
      setConversationId(body.conversation?.id ?? null);
      setMessages(body.messages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Realtime: append Kanika's incoming messages (and the echo of our own).
  useEffect(() => {
    if (!conversationId) return;
    const sub = subscribeToDirectMessages(
      conversationId,
      ({ message }: { message: DirectMessageWireEvent }) => {
        setMessages((prev) =>
          prev.some((m) => m.id === message.id) ? prev : [...prev, message],
        );
      },
    );
    return () => sub?.unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send() {
    const content = draft.trim();
    if (!content || sending || !conversationId) return;
    setSending(true);
    setError(null);
    try {
      const r = await fetch("/api/consilium/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        setError(body.error || "Could not send. Try again.");
        return;
      }
      const body: { message: DM } = await r.json();
      setDraft("");
      setMessages((prev) =>
        prev.some((m) => m.id === body.message.id)
          ? prev
          : [...prev, body.message],
      );
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-warm-gold" size={26} />
      </div>
    );
  }

  // No thread yet — members can't start one, so this is a quiet placeholder.
  if (!conversationId) {
    return (
      <div className="max-w-2xl mx-auto">
        <Header />
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-warm-gold/15 bg-deep-black/40">
          <div className="w-14 h-14 rounded-full bg-warm-gold/10 border border-warm-gold/25 flex items-center justify-center mb-4">
            <MessageCircle size={24} className="text-warm-gold/70" />
          </div>
          <p className="text-text-light text-sm mb-1">No messages yet</p>
          <p className="text-text-gray/60 text-sm max-w-xs">
            If Kanika reaches out to you directly, her message will appear here,
            just between the two of you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Header />
      <div className="rounded-2xl border border-warm-gold/15 bg-deep-black/40 overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[420px]">
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
          <div ref={endRef} />
        </div>

        <div className="shrink-0 border-t border-warm-gold/10 p-3">
          {error && (
            <p className="mb-2 text-[11px] text-rose-300/80">{error}</p>
          )}
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Reply to Kanika..."
              className="flex-1 resize-none max-h-40 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-text-light text-sm font-light focus:border-warm-gold/40 focus:outline-none transition-colors"
            />
            <button
              onClick={send}
              disabled={sending || !draft.trim()}
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-warm-gold/15 hover:bg-warm-gold/25 text-warm-gold border border-warm-gold/30 transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send"
            >
              {sending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="mb-5">
      <h1 className="text-xl font-light uppercase tracking-[0.18em] text-text-light mb-1">
        Messages
      </h1>
      <p className="text-text-gray/60 text-sm">
        A private line between you and Kanika. Nobody else can see this.
      </p>
    </div>
  );
}

function Bubble({ message }: { message: DM }) {
  // On the member side, "mine" is a member message (fromAdmin === false).
  const mine = !message.fromAdmin;
  const isVoice = !!message.voiceNoteUrl;
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isVoice
            ? "w-[min(20rem,85%)]"
            : `max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                mine
                  ? "bg-white/[0.04] border border-white/10 text-text-light rounded-br-sm"
                  : "bg-warm-gold/15 border border-warm-gold/25 text-text-light rounded-bl-sm"
              }`
        }
      >
        {!mine && (
          <span className="block text-[10px] uppercase tracking-wider text-warm-gold/70 mb-1">
            Kanika
          </span>
        )}
        {isVoice ? (
          <VoiceNotePlayer src={message.voiceNoteUrl as string} />
        ) : (
          <p className="text-sm font-light whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
        )}
        <div
          className={`mt-1 text-[10px] tabular-nums ${
            mine ? "text-text-gray/40 text-right" : "text-warm-gold/50"
          }`}
        >
          {clockTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}

function clockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
