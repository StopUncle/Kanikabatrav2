"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Mail } from "lucide-react";

/**
 * Messages pill in the member nav — the member end of Kanika's 1-on-1 line.
 *
 * Deliberately quiet: it stays HIDDEN entirely until Kanika has opened a
 * thread, because members can't start one. Once a thread exists the pill
 * appears, and an unread message from Kanika lights it green with a count.
 * Polls on a slow cadence; one tiny query per minute and a half.
 */
export default function MessagesPill() {
  const pathname = usePathname();
  const [hasConversation, setHasConversation] = useState(false);
  const [unread, setUnread] = useState(0);

  const isActive = pathname.startsWith("/consilium/messages");

  const fetchState = useCallback(async () => {
    try {
      const r = await fetch("/api/consilium/messages/unread", {
        cache: "no-store",
      });
      if (!r.ok) return;
      const body = await r.json();
      setHasConversation(Boolean(body.hasConversation));
      setUnread(body.unread ?? 0);
    } catch {
      /* silent — pill keeps its last state */
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, 90_000);
    return () => clearInterval(id);
  }, [fetchState]);

  // Re-check when landing on the messages page (reading clears the unread).
  useEffect(() => {
    if (isActive) fetchState();
  }, [isActive, fetchState]);

  // Hidden until Kanika opens a thread — never show a channel members can't
  // start (unless they're already viewing it).
  if (!hasConversation && !isActive) return null;

  const answered = unread > 0;

  return (
    <Link
      href="/consilium/messages"
      aria-label={
        answered ? `Messages, ${unread} unread from Kanika` : "Messages"
      }
      className={`group shrink-0 snap-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ${
        answered
          ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300 shadow-[0_0_16px_-6px_rgba(52,211,153,0.5)]"
          : isActive
            ? "border-warm-gold/60 bg-warm-gold/10 text-warm-gold shadow-[0_0_16px_-6px_rgba(212,175,55,0.4)]"
            : "border-warm-gold/15 text-text-gray/75 hover:border-warm-gold/40 hover:text-warm-gold hover:bg-warm-gold/5"
      }`}
    >
      <Mail
        size={13}
        strokeWidth={1.6}
        className={`shrink-0 ${answered ? "text-emerald-300" : isActive ? "text-warm-gold" : "text-text-gray/60 group-hover:text-warm-gold"}`}
      />
      <span className="whitespace-nowrap leading-none">Messages</span>
      {answered && (
        <span
          className="ml-0.5 inline-flex items-center pl-2 border-l border-emerald-400/25"
          aria-hidden
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
            <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="ml-1.5 tabular-nums text-[10px] tracking-wider text-emerald-300/90 leading-none">
            {unread}
          </span>
        </span>
      )}
    </Link>
  );
}
