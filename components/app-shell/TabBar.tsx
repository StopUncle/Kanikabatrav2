"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MoreSheet from "./MoreSheet";

/**
 * The app shell's bottom tab bar. Four destinations plus More: Today is the
 * action screen, Feed is Kanika's room, Train is every way to practise, and
 * Kanika is the private line (badged when she has replied). Everything else
 * lives one tap deeper in the More sheet.
 */

const TABS = [
  {
    href: "/app",
    label: "Today",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    href: "/app/feed",
    label: "Feed",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 5h16v11H8l-4 4z" />
      </svg>
    ),
  },
  {
    href: "/app/train",
    label: "Train",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
      </svg>
    ),
  },
  {
    href: "/app/kanika",
    label: "Kanika",
    badged: true,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
        <path d="M3.5 6.5l8.5 6 8.5-6" />
      </svg>
    ),
  },
];

export default function TabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const onKanika = pathname.startsWith("/app/kanika");

  // Same slow cadence as the old member pill: one tiny query a minute and a
  // half, plus a re-check whenever the thread is opened (reading clears it).
  const fetchUnread = useCallback(async () => {
    try {
      const r = await fetch("/api/consilium/messages/unread", {
        cache: "no-store",
      });
      if (!r.ok) return;
      const body = await r.json();
      setUnread(body.unread ?? 0);
    } catch {
      /* silent: the badge keeps its last state */
    }
  }, []);

  useEffect(() => {
    fetchUnread();
    const id = setInterval(fetchUnread, 90_000);
    return () => clearInterval(id);
  }, [fetchUnread]);

  useEffect(() => {
    if (onKanika) fetchUnread();
  }, [onKanika, fetchUnread]);

  const isMoreRoute =
    pathname.startsWith("/app/path") ||
    pathname.startsWith("/app/you") ||
    pathname.startsWith("/app/ranks") ||
    pathname.startsWith("/app/quizzes");

  // The Arrival is a full-screen moment: one door, one button, no navigation.
  if (pathname === "/app/welcome") return null;

  return (
    <>
      {/* Fixed to the viewport on a phone; pinned inside the framed column on
          desktop, where the app no longer owns the whole window. */}
      <nav
        aria-label="App navigation"
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[var(--app-line-soft)] bg-[rgba(10,9,8,0.92)] backdrop-blur-md lg:absolute lg:left-0 lg:translate-x-0"
      >
        <div className="flex items-center justify-around px-1 pb-[max(14px,env(safe-area-inset-bottom))] pt-2.5">
          {TABS.map((tab) => {
            const active =
              tab.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(tab.href);
            const showBadge = tab.badged && unread > 0;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                aria-label={showBadge ? `${tab.label}, ${unread} unread` : tab.label}
                className={`flex w-[58px] flex-col items-center gap-1.5 text-[10px] tracking-[0.06em] transition-colors ${
                  active ? "text-[var(--app-gold)]" : "text-[var(--app-dim)]"
                }`}
              >
                <span className="relative h-[21px] w-[21px] [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]">
                  {tab.icon}
                  {showBadge && (
                    <span
                      aria-hidden
                      className="absolute -right-1.5 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[var(--app-green)] px-1 text-[9px] font-semibold tabular-nums text-[#0a0908]"
                    >
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </span>
                {tab.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={moreOpen}
            className={`flex w-[58px] flex-col items-center gap-1.5 text-[10px] tracking-[0.06em] transition-colors ${
              moreOpen || isMoreRoute
                ? "text-[var(--app-gold)]"
                : "text-[var(--app-dim)]"
            }`}
          >
            <span className="h-[21px] w-[21px] [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]">
              <svg viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="1.4" />
                <circle cx="12" cy="12" r="1.4" />
                <circle cx="19" cy="12" r="1.4" />
              </svg>
            </span>
            More
          </button>
        </div>
      </nav>

      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
