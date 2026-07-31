"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Send, MessageCircle, LifeBuoy, ChevronDown } from "lucide-react";
import {
  subscribeToDirectMessages,
  type DirectMessageWireEvent,
} from "@/lib/pusher/client";
import VoiceNotePlayer from "@/components/consilium/VoiceNotePlayer";

/**
 * The Kanika tab: the private line between a member and Kanika, in the app
 * skin. Same backend as the old /consilium/messages surface (member can open
 * the thread, one unanswered message in flight, Pusher realtime).
 *
 * Two guardrails are permanent furniture here, not decoration: the response
 * expectation strip and the crisis panel behind it. Members write to her when
 * things are bad; the screen has to be honest about what it is.
 */

interface DM {
  id: string;
  conversationId: string;
  fromAdmin: boolean;
  content: string;
  voiceNoteUrl: string | null;
  createdAt: string;
  readAt: string | null;
}

export default function KanikaThread() {
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DM[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null = may send now; an ISO string = on cooldown until then. Cooldown also
  // clears the instant Kanika replies (handled in the realtime handler).
  const [cooldownUntil, setCooldownUntil] = useState<string | null>(null);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nearBottomRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    nearBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  }, []);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/consilium/messages", { cache: "no-store" });
      if (!r.ok) return;
      const body: {
        conversation: { id: string; status: string } | null;
        messages: DM[];
        cooldown: { allowed: boolean; nextAvailableAt: string | null };
      } = await r.json();
      setConversationId(body.conversation?.id ?? null);
      setMessages(body.messages);
      setCooldownUntil(
        body.cooldown.allowed ? null : body.cooldown.nextAvailableAt,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!conversationId) return;
    const sub = subscribeToDirectMessages(
      conversationId,
      ({ message }: { message: DirectMessageWireEvent }) => {
        setMessages((prev) =>
          prev.some((m) => m.id === message.id) ? prev : [...prev, message],
        );
        if (message.fromAdmin) setCooldownUntil(null);
      },
    );
    return () => sub?.unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    nearBottomRef.current = true;
  }, [conversationId]);

  useEffect(() => {
    if (!nearBottomRef.current) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [draft]);

  const onCooldown = cooldownUntil !== null;
  const hasMessages = messages.length > 0;

  async function send() {
    const content = draft.trim();
    if (!content || sending || onCooldown) return;
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
        if (r.status === 429 && body.nextAvailableAt) {
          setCooldownUntil(body.nextAvailableAt);
        }
        setError(body.error || "Could not send. Try again.");
        return;
      }
      const body: { message: DM; conversationId: string } = await r.json();
      setDraft("");
      setConversationId((prev) => prev ?? body.conversationId);
      setMessages((prev) =>
        prev.some((m) => m.id === body.message.id)
          ? prev
          : [...prev, body.message],
      );
      setCooldownUntil(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 px-5 pb-3 pt-6">
        <h1
          className="text-app-hero font-light leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Kanika
        </h1>
        <p className="mt-1 text-app-body text-[var(--app-muted)]">
          A private line. Nobody else sees this.
        </p>
      </header>

      <div className="shrink-0 px-5 pb-3">
        <button
          type="button"
          onClick={() => setCrisisOpen((v) => !v)}
          aria-expanded={crisisOpen}
          className="w-full rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-3 text-left"
        >
          <span className="flex items-start gap-2.5">
            <MessageCircle
              size={14}
              className="mt-0.5 shrink-0 text-[var(--app-gold-soft)]"
            />
            <span className="flex-1 text-xs leading-relaxed text-[var(--app-muted)]">
              Kanika reads everything. Replies take days, sometimes longer. This
              is not an emergency line.
            </span>
            <ChevronDown
              size={14}
              className={`mt-0.5 shrink-0 text-[var(--app-dim)] transition-transform ${
                crisisOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {crisisOpen && (
          <div className="mt-2 rounded-2xl border border-[rgba(183,110,121,0.25)] bg-[rgba(183,110,121,0.08)] px-4 py-3">
            <p className="flex items-center gap-2 text-app-eyebrow uppercase tracking-app-wide text-[var(--app-rose)]">
              <LifeBuoy size={13} />
              If you need help now
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--app-muted)]">
              The Consilium is education, not therapy, and nothing here is
              medical advice. If you are in danger or in crisis, call{" "}
              <a href="tel:131114" className="text-[var(--app-text)] underline">
                Lifeline 13 11 14
              </a>{" "}
              in Australia,{" "}
              <a href="tel:988" className="text-[var(--app-text)] underline">
                988
              </a>{" "}
              in the US, or your local emergency number.
            </p>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto overscroll-contain px-5 py-2"
      >
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2
              className="animate-spin text-[var(--app-gold)]"
              size={22}
            />
          </div>
        ) : hasMessages ? (
          <div className="space-y-2.5 pb-2">
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--app-line)] bg-[rgba(212,175,55,0.08)]">
              <MessageCircle size={22} className="text-[var(--app-gold)]" />
            </span>
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Write to Kanika
            </p>
            <p className="mt-1.5 max-w-[16rem] text-app-body leading-relaxed text-[var(--app-muted)]">
              Ask her something real. One message at a time, so she can answer
              properly.
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-[var(--app-line-soft)] bg-[var(--app-black)] px-4 pb-3 pt-3">
        {error && (
          <p className="mb-2 px-1 text-app-eyebrow text-[var(--app-rose)]">{error}</p>
        )}
        {onCooldown ? (
          <p className="px-1 py-2 text-xs leading-relaxed text-[var(--app-dim)]">
            Your message is with Kanika. You can send another once she replies.
          </p>
        ) : (
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              enterKeyHint="send"
              placeholder={
                hasMessages ? "Reply to Kanika..." : "Write your message..."
              }
              className="max-h-36 flex-1 resize-none rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-2.5 text-base text-[var(--app-text)] outline-none transition-colors placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)]"
            />
            <button
              type="button"
              onClick={send}
              disabled={sending || !draft.trim()}
              aria-label="Send"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--app-gold)] text-[var(--app-on-gold)] transition-opacity disabled:opacity-35"
            >
              {sending ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({ message }: { message: DM }) {
  const mine = !message.fromAdmin;
  const isVoice = !!message.voiceNoteUrl;

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isVoice
            ? "w-[min(19rem,85%)]"
            : `max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                mine
                  ? "rounded-br-md border border-[var(--app-line-soft)] bg-[var(--app-card-2)]"
                  : "rounded-bl-md border border-[var(--app-line)] bg-[rgba(212,175,55,0.12)]"
              }`
        }
      >
        {!mine && (
          <span className="mb-1 block text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
            Kanika
          </span>
        )}
        {isVoice ? (
          <VoiceNotePlayer src={message.voiceNoteUrl as string} />
        ) : (
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message.content}
          </p>
        )}
        <span
          className={`mt-1 block text-app-tiny tabular-nums ${
            mine ? "text-right text-[var(--app-dim)]" : "text-[var(--app-gold-soft)]"
          }`}
        >
          {clockTime(message.createdAt)}
        </span>
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
