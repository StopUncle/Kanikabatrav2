"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowLeft,
  Home,
  UserCircle2,
  Heart,
  MessageCircle,
  Sparkles,
  Flame,
  UserPlus,
  LogOut,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import ConsiliumSeal from "@/components/ConsiliumSeal";
import MemberBadge, { getBadge } from "@/components/consilium/MemberBadge";
import type { ActivityItem, ActivityKind } from "@/lib/community/activity";
import { NAV_SECTIONS, activeNavHref } from "@/lib/consilium/nav";

// Nav structure lives in lib/consilium/nav.ts (shared with MemberPillNav).
// Forum, Chat and Classroom stay out per the 2026-04-30 multimillion-
// roadmap audit; their routes redirect to the feed until revival.
const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

const ACTIVITY_ICON: Record<ActivityKind, LucideIcon> = {
  comment: MessageCircle,
  like: Heart,
  joined: UserPlus,
  simulator: Sparkles,
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.max(1, Math.round(diff / 60000));
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  return `${d}d`;
}

interface SidebarProps {
  onlineCount?: number;
  currentTier?: number;
  displayName?: string;
  totalXp?: number;
  completedRuns?: number;
  daysToNext?: number | null;
  dailyStreak?: number;
  streakAtRisk?: boolean;
  recentActivity?: ActivityItem[];
}

export default function InnerCircleSidebar({
  // Online count is no longer rendered in the sidebar (2026-05-24). The
  // prop is kept on the interface so the parent layout's existing call
  // site doesn't need to change; underscored here to satisfy ESLint's
  // no-unused-vars without removing the contract.
  onlineCount: _onlineCount,
  currentTier,
  displayName,
  totalXp = 0,
  completedRuns = 0,
  daysToNext = null,
  dailyStreak = 0,
  streakAtRisk = false,
  recentActivity = [],
}: SidebarProps) {
  const badge = currentTier ? getBadge(currentTier) : null;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Swipe-to-close gesture state. We track the initial touch point
  // and only close if the user swipes LEFT by at least 50px, smaller
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

  const activeHref = activeNavHref(pathname, ALL_NAV_ITEMS);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      setLoggingOut(false);
    }
  }

  const navContent = (
    <>
      {/* Brand header. Consilium seal + wordmark + live online dot */}
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
        {/* Online count removed from the sidebar header on user request
            (2026-05-24). The same signal is still rendered on the
            feed-pill in MemberPillNav (dot + count next to the Feed
            link). Single visible counter avoids fighting with itself
            when the two numbers briefly diverge between renders. */}
      </div>

      {/* Identity tile, rank badge + handle + 3 live stats. Stats give
          the card motion every page load instead of feeling static. */}
      {badge && (
        <Link
          href="/consilium/profile"
          onClick={() => setMobileOpen(false)}
          className={`block mx-3 mt-3 mb-1 px-3 py-3 rounded-xl border transition-all duration-200 ${
            pathname === "/consilium/profile"
              ? "border-warm-gold/60 bg-warm-gold/5"
              : "border-warm-gold/15 hover:border-warm-gold/40 hover:bg-warm-gold/5"
          }`}
        >
          <div className="flex items-center gap-3">
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
          </div>
          {dailyStreak > 0 && (
            <div
              className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg border py-1.5 ${
                streakAtRisk
                  ? "border-amber-400/40 bg-amber-400/10"
                  : "border-warm-gold/15 bg-warm-gold/[0.04]"
              }`}
            >
              <Flame
                size={12}
                strokeWidth={1.6}
                className={streakAtRisk ? "text-amber-400" : "text-warm-gold"}
              />
              <span
                className={`text-xs tabular-nums tracking-wide ${
                  streakAtRisk ? "text-amber-200" : "text-text-light"
                }`}
              >
                {dailyStreak} day streak{streakAtRisk ? " · play today" : ""}
              </span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-warm-gold/10">
            <div className="text-center">
              <p className="text-sm font-light tabular-nums text-text-light">
                {totalXp.toLocaleString()}
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-text-gray/55 mt-0.5">
                XP
              </p>
            </div>
            <div className="text-center border-l border-warm-gold/10">
              <p className="text-sm font-light tabular-nums text-text-light">
                {completedRuns}
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-text-gray/55 mt-0.5">
                Runs
              </p>
            </div>
            <div className="text-center border-l border-warm-gold/10">
              <p className="text-sm font-light tabular-nums text-text-light">
                {daysToNext === null ? "—" : `${daysToNext}d`}
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-text-gray/55 mt-0.5">
                {daysToNext === null ? "Max" : "Next"}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Main sections */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-4 last:mb-0">
            <div className="px-3 mb-1">
              <p className="px-2 text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em] mb-2">
                {section.title}
              </p>
            </div>
            {section.items.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 mx-3 px-3 py-3 lg:py-2.5 min-h-[44px] lg:min-h-0 rounded-lg text-sm font-light tracking-wide transition-all duration-200 active:bg-accent-gold/15 ${
                  activeHref === href
                    ? "text-accent-gold bg-accent-gold/8 border-l-2 border-accent-gold ml-3"
                    : "text-text-gray hover:text-text-light hover:bg-white/[0.03]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} strokeWidth={1.25} />
                {label}
              </Link>
            ))}
          </div>
        ))}

        {/* Live in the Council, recent activity strip. Real signals
            (comments, likes, new members, simulator wins) merged with
            deterministic time-of-day mocks if real activity is thin.
            Solves the "is anyone else here" problem on first sight. */}
        {recentActivity.length > 0 && (
          <div className="mt-6">
            <div className="px-5 mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold text-text-gray/50 uppercase tracking-[0.15em]">
                Live in the Council
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <ul className="px-3 space-y-1.5">
              {recentActivity.map((item) => {
                const Icon = ACTIVITY_ICON[item.kind];
                return (
                  <li
                    key={item.id}
                    className="flex items-start gap-2.5 px-2 py-1.5 rounded-md"
                  >
                    <span className="shrink-0 mt-0.5 text-text-gray/55">
                      <Icon size={11} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] leading-snug text-text-gray/90">
                        <span className="text-text-light font-light">
                          {item.who}
                        </span>{" "}
                        <span className="text-text-gray/70">{item.what}</span>
                      </p>
                      <p className="text-[9px] text-text-gray/45 mt-0.5 tabular-nums">
                        {timeAgo(item.at)} ago
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* Footer, back-out links + logout. Members no longer have the
          public Header chrome to log out from, so logout has to live
          here now. */}
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
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2.5 text-sm font-light text-text-gray hover:text-red-400 transition-colors disabled:opacity-50"
        >
          {loggingOut ? (
            <Loader2 size={14} strokeWidth={1.25} className="animate-spin" />
          ) : (
            <LogOut size={14} strokeWidth={1.25} />
          )}
          Log out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar, sits at the top of the viewport now that
          the public marketing Header is gone from member pages. */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-md border-b border-accent-gold/10 px-4 py-2.5 flex items-center justify-between pt-safe">
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

      {/* Mobile slide-in sidebar */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`lg:hidden fixed top-0 left-0 z-50 w-72 h-full bg-deep-black border-r border-accent-gold/10 flex flex-col transform transition-transform duration-300 ease-out pt-safe pb-safe ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar, full-height now that the public header is
          gone. Sticky from top:0. */}
      <aside className="hidden lg:flex w-64 h-screen bg-deep-black/95 border-r border-accent-gold/10 flex-col shrink-0 sticky top-0">
        {navContent}
      </aside>
    </>
  );
}
