"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Mic,
  BookOpen,
  MessageSquare,
  Users,
  Menu,
  X,
  ArrowLeft,
  Flame,
} from "lucide-react";

interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

interface ChatRoom {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
}

const MAIN_NAV = [
  { href: "/inner-circle/feed", label: "Feed", icon: MessageCircle },
  { href: "/inner-circle/voice-notes", label: "Voice Notes", icon: Mic },
  { href: "/inner-circle/classroom", label: "Classroom", icon: BookOpen },
];

export default function InnerCircleSidebar({
  onlineCount,
}: {
  onlineCount?: number;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    async function fetchNav() {
      try {
        const [catRes, roomRes] = await Promise.all([
          fetch("/api/community/categories"),
          fetch("/api/community/chat/rooms"),
        ]);
        if (catRes.ok) {
          const d = await catRes.json();
          setForumCategories(d.categories || []);
        }
        if (roomRes.ok) {
          const d = await roomRes.json();
          setChatRooms(d.rooms || []);
        }
      } catch {
        // Sidebar nav is non-critical — fail silently
      }
    }
    fetchNav();
  }, []);

  const isActive = (href: string) => {
    if (href === "/inner-circle/feed") return pathname === "/inner-circle/feed";
    return pathname.startsWith(href);
  };

  const navContent = (
    <>
      {/* Brand header */}
      <div className="px-5 py-5 border-b border-accent-gold/10">
        <h1 className="text-sm font-light uppercase tracking-[0.2em] text-accent-gold">
          The Inner Circle
        </h1>
        {onlineCount !== undefined && onlineCount > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-text-gray">
              {onlineCount} online
            </span>
          </div>
        )}
      </div>

      {/* Main sections */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-1">
          <p className="px-2 text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em] mb-2">
            Content
          </p>
        </div>
        {MAIN_NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg text-sm font-light tracking-wide transition-all duration-200 ${
              isActive(href)
                ? "text-accent-gold bg-accent-gold/8 border-l-2 border-accent-gold ml-3"
                : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={17} strokeWidth={1.5} />
            {label}
          </Link>
        ))}

        {/* Forum categories */}
        {forumCategories.length > 0 && (
          <div className="mt-6">
            <div className="px-5 mb-2">
              <p className="text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em]">
                Forum
              </p>
            </div>
            {forumCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/inner-circle/forum/${cat.slug}`}
                className={`flex items-center justify-between mx-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  pathname.includes(`/forum/${cat.slug}`)
                    ? "text-accent-gold bg-accent-gold/8"
                    : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={15} strokeWidth={1.5} />
                  <span className="font-light">{cat.name}</span>
                </div>
                <span className="text-[10px] text-text-gray/40">{cat.postCount}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Chat rooms */}
        {chatRooms.length > 0 && (
          <div className="mt-6">
            <div className="px-5 mb-2">
              <p className="text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em]">
                Chat
              </p>
            </div>
            {chatRooms.map((room) => (
              <Link
                key={room.id}
                href={`/inner-circle/chat/${room.slug}`}
                className={`flex items-center justify-between mx-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  pathname.includes(`/chat/${room.slug}`)
                    ? "text-accent-gold bg-accent-gold/8"
                    : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <Users size={15} strokeWidth={1.5} />
                  <span className="font-light">{room.name}</span>
                </div>
                <span className="text-[10px] text-text-gray/40">{room.memberCount}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-accent-gold/10 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 text-sm font-light text-text-gray hover:text-accent-gold transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Dashboard
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-md border-b border-accent-gold/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame size={14} className="text-accent-gold" />
          <span className="text-xs font-light uppercase tracking-[0.15em] text-accent-gold">
            Inner Circle
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-accent-gold"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-in sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-deep-black border-r border-accent-gold/10 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-deep-black/95 border-r border-accent-gold/10 flex-col shrink-0 sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {navContent}
      </aside>
    </>
  );
}
