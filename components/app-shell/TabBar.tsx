"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MoreSheet from "./MoreSheet";
import UpgradeSheet from "./upgrade/UpgradeSheet";
import {
  TAB_SURFACES,
  MORE_ACTIVE_PREFIXES,
  FULL_SCREEN_ROUTES,
  isTabActive,
  surfaceLocked,
  offerForSurface,
  type AppSurface,
  type ViewerTier,
} from "@/lib/app/nav";

/**
 * The app shell's bottom tab bar. Four destinations plus More: Home is the
 * front page (action zone plus explore rails), Feed is Kanika's room, Train
 * is every way to practise, Mark is the reading. More holds only account
 * surfaces now that Home carries discovery.
 */

/**
 * Icons live here, not in the nav config: TabBar draws SVGs and MoreSheet
 * uses lucide, and neither should have to agree with the other about it.
 * The config owns what exists and where; this owns how it looks.
 */
const ICONS: Record<string, React.ReactNode> = {
  "/app": (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  "/app/feed": (
    <svg viewBox="0 0 24 24">
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  ),
  "/app/train": (
    <svg viewBox="0 0 24 24">
      <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
    </svg>
  ),
  // A line that goes up, and the reading it is taken against. The Mark is
  // the only tab whose subject is a number that can fall.
  "/app/measure": (
    <svg viewBox="0 0 24 24">
      <path d="M4 19h16" />
      <path d="M5 15.5l4.5-4.5 3.5 3.5L19 8" />
      <circle cx="19" cy="8" r="1.6" />
    </svg>
  ),
  // A drop, mid-fall. The pact is signed in it.
  "/app/pact": (
    <svg viewBox="0 0 24 24">
      <path d="M12 3.5c3.2 4.1 6 7.3 6 10.5a6 6 0 01-12 0c0-3.2 2.8-6.4 6-10.5z" />
    </svg>
  ),
};

export default function TabBar({ viewerTier }: { viewerTier: ViewerTier }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  // The locked surface whose pitch is currently up. Tapping a locked entry
  // opens the sheet in place rather than navigating: the server would only
  // send back a wall over an empty room, a round trip later.
  const [lockedSurface, setLockedSurface] = useState<AppSurface | null>(null);

  const isLocked = useCallback(
    (s: AppSurface) => surfaceLocked(s, viewerTier),
    [viewerTier],
  );

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

  // Derived from the config, so a surface moving between the bar and the
  // sheet cannot leave a stale highlight behind. The hardcoded version was
  // missing five routes the sheet actually links to.
  const isMoreRoute = MORE_ACTIVE_PREFIXES.some((p) => pathname.startsWith(p));

  // Screens that own the whole display: the Arrival is one door and one
  // button, and a drill under a running clock cannot afford a nav bar in
  // thumb range of the answer buttons.
  if (FULL_SCREEN_ROUTES.includes(pathname)) return null;

  return (
    <>
      {/* The last row of the shell's flex column, not a fixed overlay. The
          content above scrolls; this does not move, because there is
          nothing for it to move relative to. Solid rather than blurred:
          a backdrop-filter over a scrolling list is one of the most
          expensive things a phone can be asked to paint, and nothing is
          passing underneath it any more. */}
      <nav
        aria-label="App navigation"
        className="relative z-40 w-full shrink-0 border-t border-[var(--app-line-soft)] bg-[var(--app-black)]"
      >
        <div className="flex items-center justify-around px-1 pb-[max(14px,env(safe-area-inset-bottom))] pt-2.5">
          {TAB_SURFACES.map((tab) => {
            const active = isTabActive(tab, pathname);
            const locked = isLocked(tab);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={
                  locked
                    ? (e) => {
                        e.preventDefault();
                        setLockedSurface(tab);
                      }
                    : undefined
                }
                aria-current={active ? "page" : undefined}
                aria-label={
                  locked
                    ? `${tab.label}, ${tab.requires === "member" ? "members" : "Pact"} only`
                    : tab.label
                }
                className={`flex w-[62px] flex-col items-center gap-1.5 text-[11.5px] tracking-[0.06em] transition-colors ${
                  active ? "text-[var(--app-gold)]" : "text-[var(--app-dim)]"
                } ${locked ? "opacity-60" : ""}`}
              >
                <span className="relative h-[21px] w-[21px] [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]">
                  {ICONS[tab.href]}
                  {/* The lock sits where the unread badge would: visible
                      before the tap, so the wall never arrives unannounced. */}
                  {locked && (
                    <span
                      aria-hidden
                      className="absolute -right-1 -top-0.5 block h-[10px] w-[10px]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-full w-full fill-none stroke-[var(--app-gold-soft)] [stroke-width:2.5]"
                      >
                        <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
                        <path d="M8 10.5V8a4 4 0 018 0v2.5" />
                      </svg>
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
            aria-label={unread > 0 ? `More, ${unread} unread from Kanika` : "More"}
            className={`flex w-[62px] flex-col items-center gap-1.5 text-[11.5px] tracking-[0.06em] transition-colors ${
              moreOpen || isMoreRoute
                ? "text-[var(--app-gold)]"
                : "text-[var(--app-dim)]"
            }`}
          >
            <span className="relative h-[21px] w-[21px] [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]">
              <svg viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="1.4" />
                <circle cx="12" cy="12" r="1.4" />
                <circle cx="19" cy="12" r="1.4" />
              </svg>
              {/* Kanika left the bar but her unread count did not leave the
                  app. Without this, a reply would arrive and nothing on
                  screen would say so. */}
              {unread > 0 && (
                <span
                  aria-hidden
                  className="absolute -right-1.5 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[var(--app-green)] px-1 text-app-micro font-semibold tabular-nums text-[var(--app-on-gold)]"
                >
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </span>
            More
          </button>
        </div>
      </nav>

      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        viewerTier={viewerTier}
        onLockedTap={setLockedSurface}
      />
      <UpgradeSheet
        open={lockedSurface !== null}
        trigger="locked-nav"
        surfaceLabel={lockedSurface?.label}
        offer={lockedSurface ? offerForSurface(lockedSurface) : undefined}
        onClose={() => setLockedSurface(null)}
      />
    </>
  );
}
