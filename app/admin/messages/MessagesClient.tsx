"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Loader2,
  Send,
  ArrowLeft,
  Check,
  CheckCheck,
  Search,
  PenSquare,
  X,
  Inbox,
  ShieldAlert,
} from "lucide-react";
import {
  subscribeToDirectMessages,
  type DirectMessageWireEvent,
} from "@/lib/pusher/client";

type ConversationStatus = "OPEN" | "DONE" | "ARCHIVED";

interface ConversationListItem {
  id: string;
  status: ConversationStatus;
  adminUnread: number;
  lastMessageAt: string;
  member: { id: string; name: string; avatarUrl: string | null };
  lastMessage: { preview: string; fromAdmin: boolean; createdAt: string } | null;
}

interface DM {
  id: string;
  conversationId: string;
  fromAdmin: boolean;
  content: string;
  createdAt: string;
  readAt: string | null;
}

interface ThreadMember {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  isBanned: boolean;
  messagingRestricted: boolean;
  membershipStatus: string | null;
}

interface Thread {
  member: ThreadMember;
  conversation: { id: string; status: ConversationStatus } | null;
  messages: DM[];
}

interface SearchResult {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  membershipStatus: string | null;
  hasConversation: boolean;
}

type TabKey = "needs_reply" | "open" | "done" | "all";

const TABS: { key: TabKey; label: string }[] = [
  { key: "needs_reply", label: "Needs reply" },
  { key: "open", label: "Open" },
  { key: "done", label: "Done" },
  { key: "all", label: "All" },
];

interface Props {
  initialConversations: ConversationListItem[];
  initialTabCounts: Record<TabKey, number>;
  initialMemberId: string | null;
}

export default function MessagesClient({
  initialConversations,
  initialTabCounts,
  initialMemberId,
}: Props) {
  const [tab, setTab] = useState<TabKey>("needs_reply");
  const [conversations, setConversations] =
    useState<ConversationListItem[]>(initialConversations);
  const [tabCounts, setTabCounts] =
    useState<Record<TabKey, number>>(initialTabCounts);
  const [loadingList, setLoadingList] = useState(false);

  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const [composing, setComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const loadList = useCallback(async (which: TabKey) => {
    setLoadingList(true);
    try {
      const r = await fetch(`/api/admin/messages?filter=${which}`, {
        cache: "no-store",
      });
      if (!r.ok) return;
      const body = await r.json();
      setConversations(body.conversations);
      setTabCounts(body.tabCounts);
    } finally {
      setLoadingList(false);
    }
  }, []);

  function switchTab(next: TabKey) {
    setTab(next);
    loadList(next);
  }

  const openThread = useCallback(async (memberId: string) => {
    setActiveMemberId(memberId);
    setComposing(false);
    setLoadingThread(true);
    setThread(null);
    try {
      const r = await fetch(`/api/admin/messages/${memberId}`, {
        cache: "no-store",
      });
      if (!r.ok) return;
      const body: Thread = await r.json();
      setThread(body);
      // Locally clear this conversation's unread + the needs-reply badge.
      setConversations((prev) =>
        prev.map((c) =>
          c.member.id === memberId ? { ...c, adminUnread: 0 } : c,
        ),
      );
    } finally {
      setLoadingThread(false);
    }
  }, []);

  // Deep-link from the "Message privately" comment button.
  useEffect(() => {
    if (initialMemberId) openThread(initialMemberId);
  }, [initialMemberId, openThread]);

  // Slow poll keeps the inbox list fresh without hammering the API. Paused
  // while the member-search composer is open so results aren't disrupted.
  useEffect(() => {
    if (composing) return;
    const id = setInterval(() => loadList(tab), 30_000);
    return () => clearInterval(id);
  }, [tab, composing, loadList]);

  // Realtime: subscribe to the open thread's channel. Incoming messages
  // (member replies, or the echo of Kanika's own send) append if new.
  useEffect(() => {
    const conversationId = thread?.conversation?.id;
    if (!conversationId) return;
    const sub = subscribeToDirectMessages(
      conversationId,
      ({ message }: { message: DirectMessageWireEvent }) => {
        setThread((prev) => {
          if (!prev || prev.conversation?.id !== message.conversationId) {
            return prev;
          }
          if (prev.messages.some((m) => m.id === message.id)) return prev;
          return { ...prev, messages: [...prev.messages, message] };
        });
      },
    );
    return () => sub?.unsubscribe();
  }, [thread?.conversation?.id]);

  // Keep the thread pinned to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length]);

  async function send() {
    const content = draft.trim();
    if (!content || !activeMemberId || sending) return;
    setSending(true);
    try {
      const r = await fetch(`/api/admin/messages/${activeMemberId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        alert(body.error || "Could not send. Try again.");
        return;
      }
      const body: { message: DM; conversationId: string } = await r.json();
      setDraft("");
      setThread((prev) => {
        if (!prev) return prev;
        if (prev.messages.some((m) => m.id === body.message.id)) return prev;
        return {
          ...prev,
          conversation: prev.conversation ?? {
            id: body.conversationId,
            status: "OPEN",
          },
          messages: [...prev.messages, body.message],
        };
      });
      // Reflect the new last-message in the list (and create the row if this
      // was a first-ever message to this member).
      setConversations((prev) => {
        const existing = prev.find((c) => c.member.id === activeMemberId);
        const preview = content.slice(0, 140);
        if (existing) {
          return [
            {
              ...existing,
              status: "OPEN",
              lastMessageAt: body.message.createdAt,
              lastMessage: {
                preview,
                fromAdmin: true,
                createdAt: body.message.createdAt,
              },
            },
            ...prev.filter((c) => c.member.id !== activeMemberId),
          ];
        }
        if (!thread) return prev;
        return [
          {
            id: body.conversationId,
            status: "OPEN",
            adminUnread: 0,
            lastMessageAt: body.message.createdAt,
            member: {
              id: thread.member.id,
              name: thread.member.name,
              avatarUrl: thread.member.avatarUrl,
            },
            lastMessage: { preview, fromAdmin: true, createdAt: body.message.createdAt },
          },
          ...prev,
        ];
      });
    } finally {
      setSending(false);
    }
  }

  async function setStatus(status: ConversationStatus) {
    if (!activeMemberId || !thread?.conversation) return;
    const r = await fetch(`/api/admin/messages/${activeMemberId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!r.ok) return;
    setThread((prev) =>
      prev && prev.conversation
        ? { ...prev, conversation: { ...prev.conversation, status } }
        : prev,
    );
    setConversations((prev) =>
      prev.map((c) =>
        c.member.id === activeMemberId ? { ...c, status } : c,
      ),
    );
  }

  // Member search for the "New message" composer.
  useEffect(() => {
    if (!composing) return;
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const handle = setTimeout(async () => {
      try {
        const r = await fetch(
          `/api/admin/messages/search?q=${encodeURIComponent(q)}`,
          { cache: "no-store" },
        );
        if (!r.ok) return;
        const body = await r.json();
        setSearchResults(body.members);
      } finally {
        setSearching(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [searchQuery, composing]);

  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-1">
            Messages
          </h1>
          <p className="text-text-gray/70 text-sm">
            Your private, one-to-one line to members. You start the thread; they
            reply. Nothing here is public.
          </p>
        </div>
        <button
          onClick={() => {
            setComposing(true);
            setActiveMemberId(null);
            setThread(null);
            setSearchQuery("");
            setSearchResults([]);
          }}
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-warm-gold/10 hover:bg-warm-gold/20 text-warm-gold text-[11px] tracking-wider uppercase font-medium border border-warm-gold/30 transition"
        >
          <PenSquare size={14} strokeWidth={1.6} />
          New message
        </button>
      </div>

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[420px]">
        {/* LEFT: conversation list (or the new-message search) */}
        <div
          className={`${
            activeMemberId || composing ? "hidden lg:flex" : "flex"
          } flex-col w-full lg:w-80 shrink-0 rounded-xl border border-warm-gold/15 bg-deep-black/40 overflow-hidden`}
        >
          <div className="flex gap-1 px-2 pt-2 border-b border-warm-gold/10 overflow-x-auto">
            {TABS.map((t) => {
              const active = tab === t.key;
              const count = tabCounts[t.key] ?? 0;
              return (
                <button
                  key={t.key}
                  onClick={() => switchTab(t.key)}
                  className={`shrink-0 px-3 py-2 text-[10px] tracking-[0.18em] uppercase border-b-2 transition ${
                    active
                      ? "border-warm-gold text-warm-gold"
                      : "border-transparent text-text-gray/60 hover:text-warm-gold/80"
                  }`}
                >
                  {t.label}
                  {t.key === "needs_reply" && count > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-warm-gold/20 text-warm-gold text-[9px] tabular-nums">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingList ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin text-warm-gold" size={22} />
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 text-text-gray/50">
                <Inbox size={28} strokeWidth={1.3} className="mb-3" />
                <p className="text-sm">
                  {tab === "needs_reply"
                    ? "Nobody's waiting on a reply. You're all caught up."
                    : "No conversations here yet."}
                </p>
              </div>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openThread(c.member.id)}
                  className={`w-full text-left px-4 py-3 border-b border-warm-gold/5 transition hover:bg-warm-gold/[0.04] ${
                    activeMemberId === c.member.id ? "bg-warm-gold/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={c.member.name} url={c.member.avatarUrl} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`truncate text-sm ${
                            c.adminUnread > 0
                              ? "text-text-light font-medium"
                              : "text-text-gray"
                          }`}
                        >
                          {c.member.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-text-gray/50 tabular-nums">
                          {relativeTime(c.lastMessageAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span
                          className={`truncate text-xs ${
                            c.adminUnread > 0
                              ? "text-text-gray"
                              : "text-text-gray/50"
                          }`}
                        >
                          {c.lastMessage
                            ? `${c.lastMessage.fromAdmin ? "You: " : ""}${c.lastMessage.preview}`
                            : "No messages yet"}
                        </span>
                        {c.adminUnread > 0 && (
                          <span className="shrink-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-warm-gold text-deep-black text-[10px] font-semibold tabular-nums">
                            {c.adminUnread}
                          </span>
                        )}
                        {c.adminUnread === 0 && c.status === "DONE" && (
                          <span className="shrink-0 text-[9px] tracking-wider uppercase text-emerald-400/60">
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: thread, or composer, or empty state */}
        <div
          className={`${
            activeMemberId || composing ? "flex" : "hidden lg:flex"
          } flex-col flex-1 rounded-xl border border-warm-gold/15 bg-deep-black/40 overflow-hidden`}
        >
          {composing ? (
            <NewMessagePanel
              query={searchQuery}
              setQuery={setSearchQuery}
              results={searchResults}
              searching={searching}
              onPick={(memberId) => {
                setComposing(false);
                openThread(memberId);
              }}
              onClose={() => setComposing(false)}
            />
          ) : !activeMemberId ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-8 text-text-gray/40">
              <Inbox size={36} strokeWidth={1.2} className="mb-4" />
              <p className="text-sm max-w-xs">
                Select a conversation, or start a new one. This is where every
                private thread with a member lives.
              </p>
            </div>
          ) : loadingThread || !thread ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="animate-spin text-warm-gold" size={24} />
            </div>
          ) : (
            <ThreadPanel
              thread={thread}
              draft={draft}
              setDraft={setDraft}
              sending={sending}
              onSend={send}
              onBack={() => {
                setActiveMemberId(null);
                setThread(null);
              }}
              onStatus={setStatus}
              messagesEndRef={messagesEndRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ThreadPanel({
  thread,
  draft,
  setDraft,
  sending,
  onSend,
  onBack,
  onStatus,
  messagesEndRef,
}: {
  thread: Thread;
  draft: string;
  setDraft: (v: string) => void;
  sending: boolean;
  onSend: () => void;
  onBack: () => void;
  onStatus: (s: ConversationStatus) => void;
  messagesEndRef: React.Ref<HTMLDivElement>;
}) {
  const { member, conversation, messages } = thread;
  const restricted = member.isBanned || member.messagingRestricted;

  return (
    <>
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-warm-gold/10">
        <button
          onClick={onBack}
          className="lg:hidden p-1 -ml-1 text-text-gray hover:text-text-light"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <Avatar name={member.name} url={member.avatarUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm text-text-light">
              {member.name}
            </span>
            {member.membershipStatus && member.membershipStatus !== "ACTIVE" && (
              <span className="shrink-0 text-[9px] tracking-wider uppercase text-text-gray/50 border border-text-gray/20 rounded px-1 py-0.5">
                {member.membershipStatus}
              </span>
            )}
          </div>
          {member.email && (
            <span className="block truncate text-[11px] text-text-gray/50">
              {member.email}
            </span>
          )}
        </div>
        {conversation && (
          <div className="shrink-0 flex items-center gap-1.5">
            {conversation.status === "DONE" ? (
              <button
                onClick={() => onStatus("OPEN")}
                className="px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase text-text-gray/70 border border-text-gray/20 hover:text-warm-gold hover:border-warm-gold/30 transition"
              >
                Reopen
              </button>
            ) : (
              <button
                onClick={() => onStatus("DONE")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase text-emerald-300 border border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/20 transition"
              >
                <Check size={12} />
                Mark done
              </button>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-text-gray/40 px-6">
            <p className="text-sm">
              No messages yet. Write the first one below — it opens a private
              thread {member.name} can reply to.
            </p>
          </div>
        ) : (
          messages.map((m) => <Bubble key={m.id} message={m} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-warm-gold/10 p-3">
        {restricted && (
          <div className="flex items-center gap-2 mb-2 text-[11px] text-rose-300/80">
            <ShieldAlert size={13} />
            {member.isBanned
              ? "This member is banned. They can read but not reply."
              : "This member is messaging-restricted. They can read but not reply."}
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onSend();
              }
            }}
            rows={1}
            placeholder={`Message ${member.name}...`}
            className="flex-1 resize-none max-h-40 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-text-light text-sm font-light focus:border-warm-gold/40 focus:outline-none transition-colors"
          />
          <button
            onClick={onSend}
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
        <p className="mt-1.5 text-[10px] text-text-gray/40">
          {/* Cmd/Ctrl+Enter to send */}
          Press &#8984;/Ctrl + Enter to send
        </p>
      </div>
    </>
  );
}

function Bubble({ message }: { message: DM }) {
  const mine = message.fromAdmin;
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${
          mine
            ? "bg-warm-gold/15 border border-warm-gold/25 text-text-light rounded-br-sm"
            : "bg-white/[0.04] border border-white/10 text-text-light rounded-bl-sm"
        }`}
      >
        <p className="text-sm font-light whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </p>
        <div
          className={`mt-1 flex items-center gap-1 text-[10px] ${
            mine ? "text-warm-gold/50 justify-end" : "text-text-gray/40"
          }`}
        >
          <span className="tabular-nums">{clockTime(message.createdAt)}</span>
          {mine &&
            (message.readAt ? (
              <CheckCheck size={12} className="text-emerald-400/70" />
            ) : (
              <Check size={12} />
            ))}
        </div>
      </div>
    </div>
  );
}

function NewMessagePanel({
  query,
  setQuery,
  results,
  searching,
  onPick,
  onClose,
}: {
  query: string;
  setQuery: (v: string) => void;
  results: SearchResult[];
  searching: boolean;
  onPick: (memberId: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-warm-gold/10">
        <span className="text-sm uppercase tracking-[0.15em] text-text-light">
          New message
        </span>
        <button
          onClick={onClose}
          className="p-1 text-text-gray hover:text-text-light"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-gray/40"
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members by name or email..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-text-light text-sm font-light focus:border-warm-gold/40 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {searching ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-warm-gold" size={20} />
          </div>
        ) : query.trim().length < 2 ? (
          <p className="text-center text-xs text-text-gray/40 py-10 px-6">
            Type a name or email to find a member.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-xs text-text-gray/40 py-10 px-6">
            No members match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          results.map((m) => (
            <button
              key={m.id}
              onClick={() => onPick(m.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-warm-gold/[0.05] transition flex items-center gap-3"
            >
              <Avatar name={m.name} url={m.avatarUrl} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm text-text-light">
                    {m.name}
                  </span>
                  {m.hasConversation && (
                    <span className="shrink-0 text-[9px] tracking-wider uppercase text-warm-gold/60">
                      Existing
                    </span>
                  )}
                </div>
                {m.email && (
                  <span className="block truncate text-[11px] text-text-gray/50">
                    {m.email}
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) {
    return (
      // Small fixed-size avatar from an external R2 URL; next/image would need
      // per-host remotePatterns config for no LCP benefit at 36px.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full shrink-0 bg-warm-gold/15 border border-warm-gold/25 flex items-center justify-center text-warm-gold text-sm">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/** Short relative time for the list ("2m", "3h", "4d", else date). */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "now";
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Clock time for a message bubble. */
function clockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
