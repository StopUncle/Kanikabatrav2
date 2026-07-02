import {
  Scroll,
  Film,
  Compass,
  Gamepad2,
  FlaskConical,
  Target,
  Trophy,
  BookOpen,
  Video,
  AudioLines,
  Clock,
  Receipt,
  Award,
  Eye,
  UserCircle2,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for member-area navigation. Both
 * InnerCircleSidebar (full map, sectioned) and MemberPillNav (daily-loop
 * shortcuts) render from here, so the two navs can never drift apart
 * again. Adding a member surface = add it to exactly one section below;
 * promote it into PILL_ITEMS only if it belongs in the daily loop.
 *
 * Forum, Chat and Classroom stay out per the 2026-04-30 multimillion-
 * roadmap audit (empty rooms erode the premium feel); their routes now
 * redirect to the feed until they earn a revival.
 */

export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
  /** Prefix used for the active state, so nested routes (for example
   *  simulator/[scenarioId]) still light up their parent item. Items
   *  without one match on exact pathname only. When two items' prefixes
   *  overlap (Simulator vs Leaderboard), the longest match wins. */
  readonly matchPrefix?: string;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}

const FEED: NavItem = {
  href: "/consilium/feed",
  label: "Feed",
  icon: Scroll,
  matchPrefix: "/consilium/feed",
};
const SIMULATOR: NavItem = {
  href: "/consilium/simulator",
  label: "Simulator",
  icon: Film,
  matchPrefix: "/consilium/simulator",
};
const ADVENTURES: NavItem = {
  href: "/consilium/adventures",
  label: "Adventures",
  icon: Compass,
  matchPrefix: "/consilium/adventures",
};
const GAMES: NavItem = {
  href: "/consilium/games",
  label: "Games",
  icon: Gamepad2,
  matchPrefix: "/consilium/games",
};
const LAB: NavItem = {
  href: "/consilium/lab",
  label: "The Lab",
  icon: FlaskConical,
  matchPrefix: "/consilium/lab",
};
const INSTINCTS: NavItem = {
  href: "/consilium/instincts/today",
  label: "Instincts",
  icon: Target,
  matchPrefix: "/consilium/instincts",
};
const LEADERBOARD: NavItem = {
  href: "/consilium/simulator/leaderboard",
  label: "Leaderboard",
  icon: Trophy,
  matchPrefix: "/consilium/simulator/leaderboard",
};
const BOOK: NavItem = {
  href: "/consilium/book",
  label: "The Book",
  icon: BookOpen,
  matchPrefix: "/consilium/book",
};
const VIDEOS: NavItem = {
  href: "/consilium/videos",
  label: "Videos",
  icon: Video,
  matchPrefix: "/consilium/videos",
};
const VOICE_NOTES: NavItem = {
  href: "/consilium/voice-notes",
  label: "Voice Notes",
  icon: AudioLines,
  matchPrefix: "/consilium/voice-notes",
};
const PREVIEWS: NavItem = {
  href: "/consilium/previews",
  label: "Previews",
  icon: Clock,
  matchPrefix: "/consilium/previews",
};
const RECEIPTS: NavItem = {
  href: "/consilium/receipts",
  label: "Receipts",
  icon: Receipt,
  matchPrefix: "/consilium/receipts",
};
const BADGES: NavItem = {
  href: "/consilium/badges",
  label: "Badges",
  icon: Award,
  matchPrefix: "/consilium/badges",
};
const DARK_MIRROR: NavItem = {
  href: "/consilium/quiz",
  label: "Dark Mirror",
  icon: Eye,
  matchPrefix: "/consilium/quiz",
};
const PROFILE: NavItem = {
  href: "/consilium/profile",
  label: "Profile",
  icon: UserCircle2,
  matchPrefix: "/consilium/profile",
};
const BLOG: NavItem = {
  href: "/blog",
  label: "Blog",
  icon: Newspaper,
  matchPrefix: "/blog",
};

export const NAV_SECTIONS: readonly NavSection[] = [
  {
    title: "Daily",
    items: [FEED, SIMULATOR, ADVENTURES, GAMES, LAB, INSTINCTS, LEADERBOARD],
  },
  {
    title: "Library",
    items: [BOOK, VIDEOS, VOICE_NOTES, PREVIEWS, RECEIPTS],
  },
  {
    title: "You",
    items: [BADGES, DARK_MIRROR, PROFILE],
  },
];

/** Daily-loop shortcuts for the top pill strip, highest-return surfaces
 *  only, plus the Blog escape hatch back to public content. */
export const PILL_ITEMS: readonly NavItem[] = [
  FEED,
  SIMULATOR,
  GAMES,
  LAB,
  RECEIPTS,
  LEADERBOARD,
  BLOG,
];

/**
 * Resolve which nav item is active for a pathname. Exact match wins,
 * then the longest matchPrefix, so /consilium/simulator/leaderboard
 * lights up Leaderboard rather than Simulator.
 */
export function activeNavHref(
  pathname: string,
  items: readonly NavItem[],
): string | null {
  let best: NavItem | null = null;
  for (const item of items) {
    if (pathname === item.href) return item.href;
    if (item.matchPrefix && pathname.startsWith(item.matchPrefix)) {
      if (!best || item.matchPrefix.length > (best.matchPrefix?.length ?? 0)) {
        best = item;
      }
    }
  }
  return best?.href ?? null;
}
