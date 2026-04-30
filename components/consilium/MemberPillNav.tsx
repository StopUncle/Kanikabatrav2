"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scroll,
  Film,
  Trophy,
  Award,
  AudioLines,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import AskKanikaPill from "./AskKanikaPill";

/**
 * Member-area secondary nav. Sits at the top of <main> in the
 * consilium/(member) layout, the equivalent of "below the header"
 * for a space that doesn't have the marketing Header rendered.
 *
 * Surfaces the highest-engagement destinations as a horizontally-
 * scrollable pill row. The sidebar already lists every member
 * destination; this strip is a one-tap shortcut to the things
 * members actually return to (feed → simulator → leaderboard →
 * badges) plus a Blog escape hatch back to public content.
 *
 * Design intent:
 *   - Sticky: stays visible on scroll so a player deep in a
 *     scenario page or trophy case can jump anywhere in one tap.
 *   - Horizontal scroll on mobile: 7 items don't fit in 360px;
 *     swipe is the right pattern, not stack.
 *   - Quiet: muted gold borders, only the active pill lights up.
 *     Should feel like quick navigation, not a second sales row.
 */

type PillItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** When provided, used as a prefix match for the active state, useful
   *  for nested routes like simulator/[scenarioId] still highlighting
   *  the Simulator pill. */
  matchPrefix?: string;
  /** Optional key the parent uses to attach a live count badge to this
   *  pill. Currently only "feed" is wired (online count), kept generic
   *  so we can light up Forum/Chat with "N unread" later without
   *  another API surface. */
  countKey?: "feed";
};

// Classroom pill removed 2026-04-30: zero enrollments per the
// multimillion-roadmap audit (research/multimillion-roadmap/01-current-state-audit.md
// section 3). Empty surfaces erode the premium feel of the live ones; the
// route still exists for revival but is hidden from member nav until the
// certification curriculum (Phase 3-4) gives it real content.
const PILLS: PillItem[] = [
  { href: "/consilium/feed", label: "Feed", icon: Scroll, matchPrefix: "/consilium/feed", countKey: "feed" },
  { href: "/consilium/simulator", label: "Simulator", icon: Film, matchPrefix: "/consilium/simulator" },
  {
    href: "/consilium/simulator/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  { href: "/consilium/badges", label: "Badges", icon: Award, matchPrefix: "/consilium/badges" },
  { href: "/consilium/voice-notes", label: "Voice Notes", icon: AudioLines, matchPrefix: "/consilium/voice-notes" },
  { href: "/blog", label: "Blog", icon: Newspaper, matchPrefix: "/blog" },
];

interface Props {
  /** Members active in the last 5 minutes. Surfaced as a pulsing dot +
   *  count next to the Feed pill so members see "people are here right
   *  now" at-a-glance. Critical against the 4% lifetime-comment-rate
   *  problem, empty rooms read as a dead product. */
  readonly onlineCount?: number;
}

export default function MemberPillNav({ onlineCount }: Props) {
  const pathname = usePathname();

  // Determine the active pill. Leaderboard is a special case, it's nested
  // under /consilium/simulator/leaderboard, but should NOT light up the
  // Simulator pill. So we check leaderboard FIRST (exact) before the
  // simulator prefix match wins.
  const activeHref = (() => {
    if (pathname === "/consilium/simulator/leaderboard")
      return "/consilium/simulator/leaderboard";
    for (const pill of PILLS) {
      if (pill.href === "/consilium/simulator/leaderboard") continue;
      if (pathname === pill.href) return pill.href;
      if (pill.matchPrefix && pathname.startsWith(pill.matchPrefix))
        return pill.href;
    }
    return null;
  })();

  return (
    <nav
      aria-label="Member quick nav"
      // Visually docks directly under the InnerCircleSidebar mobile bar
      // (which uses bg-deep-black/95 + border-b border-accent-gold/10).
      // We match its background opacity so the two strips read as one
      // continuous panel, no seam, no double-border. Border-b stays
      // because nothing sits below this on the page edge.
      className="sticky top-14 lg:top-0 z-30 bg-deep-black/95 backdrop-blur-md border-b border-accent-gold/10"
    >
      {/* Edge-fade scroll container.
          The relative wrapper hosts two pseudo-fades, left + right —
          that mask the scroll-out edges so cut-off pills read as
          "swipe for more" instead of broken layout. Fades are pure
          CSS gradients matching the nav background, no JS, no
          repaint. They sit above the scroll content (z-10) but below
          the pills via pointer-events-none so swipes pass through. */}
      <div className="relative">
        {/* Left fade, appears once content has scrolled past the
            first pill. Cheap heuristic: always render, opacity is
            negligible at scrollLeft 0 because the first pill is
            butted against the edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-r from-deep-black to-transparent lg:hidden"
        />
        {/* Right fade, masks the cut-off final pill so 'LEADERBO'
            doesn't look like a layout bug. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-deep-black to-transparent lg:hidden"
        />

        <div
          className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto snap-x snap-proximity scroll-px-4 sm:scroll-px-6 px-4 sm:px-6 lg:px-8 py-2.5 lg:py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center"
        >
          {/* Ask Kanika sits FIRST in the pill row, it's the highest-
              return interaction we can put on the feed (daily engagement
              loop) and we want it visible before the swipe happens on
              mobile, even at 360px. */}
          <AskKanikaPill />
          {PILLS.map((pill, index) => {
            const isActive = activeHref === pill.href;
            const Icon = pill.icon;
            const showOnlinePip =
              pill.countKey === "feed" &&
              typeof onlineCount === "number" &&
              onlineCount >= 1;
            return (
              <Link
                key={pill.href}
                href={pill.href}
                // First/last pills get extra side margin equal to
                // the fade width so swipe-to-end doesn't hide them
                // under the fade overlay. Tailwind's lg:!mr-0 etc
                // resets these on desktop where there's no fade.
                className={`group shrink-0 snap-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ${
                  index === 0 ? "ml-1 lg:ml-0" : ""
                } ${
                  index === PILLS.length - 1 ? "mr-3 lg:mr-0" : ""
                } ${
                  isActive
                    ? "border-warm-gold/60 bg-warm-gold/10 text-warm-gold shadow-[0_0_16px_-6px_rgba(212,175,55,0.4)]"
                    : "border-warm-gold/15 text-text-gray/75 hover:border-warm-gold/40 hover:text-warm-gold hover:bg-warm-gold/5 active:bg-warm-gold/10"
                }`}
              >
                <Icon
                  size={13}
                  strokeWidth={1.6}
                  className={`shrink-0 transition-colors ${isActive ? "text-warm-gold" : "text-text-gray/60 group-hover:text-warm-gold"}`}
                />
                <span className="whitespace-nowrap leading-none">{pill.label}</span>
                {showOnlinePip && (
                  <span
                    className="ml-0.5 inline-flex items-center gap-1 pl-2 border-l border-warm-gold/15"
                    aria-label={`${onlineCount} online`}
                  >
                    <span className="relative inline-flex w-1.5 h-1.5">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping"
                      />
                      <span
                        aria-hidden
                        className="relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                      />
                    </span>
                    <span className="tabular-nums text-[10px] tracking-wider text-emerald-300/90 leading-none">
                      {onlineCount}
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
