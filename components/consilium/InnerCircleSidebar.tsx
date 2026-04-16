"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scroll,
  AudioLines,
  Library,
  MessagesSquare,
  Hash,
  Menu,
  X,
  ArrowLeft,
  Home,
  UserCircle2,
  Award,
} from "lucide-react";
import ConsiliumSeal from "@/components/ConsiliumSeal";
import MemberBadge, { getBadge } from "@/components/consilium/MemberBadge";

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
  { href: "/consilium/feed", label: "Feed", icon: Scroll },
  { href: "/consilium/voice-notes", label: "Voice Notes", icon: AudioLines },
  { href: "/consilium/classroom", label: "Classroom", icon: Library },
  { href: "/consilium/badges", label: "Badges", icon: Award },
];

export default function InnerCircleSidebar({
  onlineCount,
  currentTier,
  displayName,
}: {
  onlineCount?: number;
  currentTier?: number;
  displayName?: string;
}) {
  const badge = currentTier ? getBadge(currentTier) : null;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  // Swipe-to-close gesture state. We track the initial touch point
  // and only close if the user swipes LEFT by at least 50px — smaller
  // movements (or a vertical scroll) don't dismiss the panel.
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Horizontal swipe left > 50px, and more horizontal than vertical
    if (dx < -50 && Math.abs(dx) > dy) {
      setMobileOpen(false);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

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
    if (href === "/consilium/feed") return pathname === "/consilium/feed";
    return pathname.startsWith(href);
  };

  const navContent = (
    <>
      {/* Brand header — Consilium seal + wordmark */}
      <div className="px-5 py-5 border-b border-accent-gold/10">
        <div className="flex items-center gap-3">
          <ConsiliumSeal size="sm" />
          <div>
            <p className="text-[10px] font-light uppercase tracking-[0.3em] text-text-gray/60 leading-none">
              The
            </p>
            <h1 className="text-base font-extralight uppercase tracking-[0.25em] text-accent-gold leading-tight mt-0.5">
              Consilium
            </h1>
          </div>
        </div>
        {onlineCount !== undefined && onlineCount > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-text-gray">
              {onlineCount} online
            </span>
          </div>
        )}
      </div>

      {/* Identity block — member's current rank. Clickable tile that
          routes to the full profile page. Rendered only when we have
          a tier (server layout passes it down via props). */}
      {badge && (
        <Link
          href="/consilium/profile"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 mx-3 mt-3 mb-1 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
            pathname === "/consilium/profile"
              ? "border-warm-gold/60 bg-warm-gold/5"
              : "border-warm-gold/15 hover:border-warm-gold/40 hover:bg-warm-gold/5"
          }`}
        >
          <MemberBadge tier={badge.tier} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60 truncate">
              {displayName || "Counselor"}
            </p>
            <p className="text-sm font-light tracking-[0.12em] uppercase text-warm-gold truncate">
              {badge.name}
            </p>
          </div>
          <span className="text-[9px] uppercase tracking-[0.18em] text-text-gray/50 shrink-0">
            {badge.numeral}
          </span>
        </Link>
      )}

      {/* Main sections */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-1">
          <p className="px-2 text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em] mb-2">
            Chambers
          </p>
        </div>
        {MAIN_NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 mx-3 px-3 py-3 lg:py-2.5 min-h-[44px] lg:min-h-0 rounded-lg text-sm font-light tracking-wide transition-all duration-200 active:bg-accent-gold/15 ${
              isActive(href)
                ? "text-accent-gold bg-accent-gold/8 border-l-2 border-accent-gold ml-3"
                : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={16} strokeWidth={1.25} />
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
                href={`/consilium/forum/${cat.slug}`}
                className={`flex items-center justify-between mx-3 px-3 py-3 lg:py-2 min-h-[44px] lg:min-h-0 rounded-lg text-sm transition-all duration-200 active:bg-accent-gold/15 ${
                  pathname.includes(`/forum/${cat.slug}`)
                    ? "text-accent-gold bg-accent-gold/8"
                    : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <MessagesSquare size={14} strokeWidth={1.25} />
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
                href={`/consilium/chat/${room.slug}`}
                className={`flex items-center justify-between mx-3 px-3 py-3 lg:py-2 min-h-[44px] lg:min-h-0 rounded-lg text-sm transition-all duration-200 active:bg-accent-gold/15 ${
                  pathname.includes(`/chat/${room.slug}`)
                    ? "text-accent-gold bg-accent-gold/8"
                    : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <Hash size={14} strokeWidth={1.25} />
                  <span className="font-light">{room.name}</span>
                </div>
                <span className="text-[10px] text-text-gray/40">{room.memberCount}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Footer — back-out links. The Header's mobile hamburger is
          hidden inside the Consilium area, so members need a route
          back to the main site from the sidebar itself. */}
      <div className="px-5 py-4 border-t border-accent-gold/10 space-y-2.5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 text-sm font-light text-text-gray hover:text-accent-gold transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <ArrowLeft size={14} strokeWidth={1.25} />
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2.5 text-sm font-light text-text-gray hover:text-accent-gold transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <UserCircle2 size={14} strokeWidth={1.25} />
          Profile
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-light text-text-gray hover:text-accent-gold transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <Home size={14} strokeWidth={1.25} />
          Main Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar — the ONLY nav toggle on member pages on
          mobile (the main Header's hamburger is hidden inside the
          Consilium area, so there's no longer a double-hamburger). */}
      <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-md border-b border-accent-gold/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ConsiliumSeal size="sm" />
          <span className="text-xs font-light uppercase tracking-[0.25em] text-accent-gold">
            The Consilium
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 -m-1 text-accent-gold tap-target"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-in sidebar. Swipe left to close (Material/iOS
          navigation-drawer convention), and pt-safe so the top doesn't
          disappear behind the iOS notch. */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`lg:hidden fixed top-0 left-0 z-50 w-72 h-full bg-deep-black border-r border-accent-gold/10 flex flex-col transform transition-transform duration-300 ease-out pt-safe pb-safe ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
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
