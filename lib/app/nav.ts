/**
 * Every surface in the app, and where it lives. One list, one decision each.
 *
 * Before this, placement was spread across two hardcoded arrays that did not
 * know about each other: TABS in TabBar and SECTIONS in MoreSheet. Fourteen
 * routes appeared in neither, reachable only by typing the URL or stumbling
 * through an in-page link. Nothing was wrong with any single one of those
 * choices; the problem was that no file held the whole shape, so nobody could
 * see it, and things ended up wherever they were added.
 *
 * The old skin already does this properly (`lib/consilium/nav.ts`). This is
 * the same idea carried into the app.
 *
 * Rules:
 * - Adding a surface means adding a row here. If it has no row it does not
 *   exist as far as navigation is concerned.
 * - `unlisted` is a legitimate answer, but it has to be argued for in `note`.
 *   "Reachable only from inside the runner" is a decision. Forgetting is not.
 * - Icons live in the components, not here. This file owns structure; TabBar
 *   draws its own SVGs and MoreSheet uses lucide, and neither needs the other
 *   to agree about it.
 */

import { PACT_LAUNCHED } from "@/lib/pact/presets";

export type Placement =
  /** Bottom tab bar. Five slots, no more. */
  | "tab"
  /** A card on Home's explore rails. One scroll away, zero taps deep. */
  | "home"
  /** The More sheet, one tap deeper. */
  | "more"
  /** Reached from inside a parent surface, on purpose. */
  | "nested"
  /** Deliberately unreachable from navigation (runners, dev, one-shots). */
  | "unlisted";

/** The explore sections on Home, in render order. */
export const HOME_SECTION_ORDER = [
  "Test yourself",
  "Train",
  "From Kanika",
  "Your standing",
] as const;

export type HomeSection = (typeof HOME_SECTION_ORDER)[number];

export type Maturity = "app-native" | "ported" | "stub" | "dev";

export interface AppSurface {
  href: string;
  label: string;
  placement: Placement;
  /** Which group in the More sheet. Only meaningful when placement is "more". */
  section?: "You" | "Library" | "Account";
  /**
   * A card on Home's explore rails. Surfaces placed "home" live here and
   * nowhere else; nested surfaces (the Train toys) can carry it as well,
   * appearing both inside their parent and on Home.
   */
  home?: { section: HomeSection; hook: string };
  /** The surface this hangs off. Only meaningful when placement is "nested". */
  parent?: string;
  /** Why it lives where it lives. Required, including for "unlisted". */
  note: string;
  maturity: Maturity;
  /**
   * Extra paths that should light this entry up. The games live under
   * /app/play but are launched from Train, so Train stays lit inside them.
   *
   * Every nested child needs listing here, not just the ones sharing a URL
   * prefix. A surface that matches no tab leaves the whole bar unlit, which
   * is worse than lighting the wrong one: the member is somewhere real with
   * nothing telling them where.
   */
  also?: string[];
  /** Renders an unread count (the Kanika thread). */
  badged?: boolean;
  /**
   * The paid rung this surface needs. "pact" is the training tier (any
   * paid account passes); "member" is the Consilium, Kanika's rooms.
   * This flag and the page's own trainingGate()/memberGate() call travel
   * as a pair: the chrome reads it to lock the entry before the tap, the
   * page still gates the render for deep links. Setting one without the
   * other means either an unlabelled wall or an unenforced lock.
   */
  requires?: "pact" | "member";
  /**
   * A tab root redirects here, so this is where the tab actually lands and
   * the shell treats it as a root: no back control. Without this, back on
   * the pact week pointed at the door, the door redirected a signed member
   * straight back to the week, and the button did nothing at all.
   */
  tabLanding?: boolean;
}

export const APP_SURFACES: AppSurface[] = [
  /* ---------------------------------------------------------------- tabs */
  {
    href: "/app",
    label: "Home",
    placement: "tab",
    note: "Was 'Today'. Two zones now: the action screen on top (what to do now), the explore rails below (what exists). The shop window the app never had.",
    maturity: "app-native",
  },
  {
    href: "/app/feed",
    requires: "member",
    label: "Feed",
    placement: "tab",
    note: "Kanika's room. The only surface where she speaks to everyone at once.",
    maturity: "app-native",
  },
  {
    href: "/app/train",
    label: "Train",
    placement: "tab",
    note: "Every way to practise, one room. Absorbed the old Arcade.",
    maturity: "app-native",
    also: [
      "/app/play",
      "/app/adventures",
      "/app/lab",
      "/app/receipts",
      "/app/instincts",
    ],
  },

  {
    href: "/app/measure",
    requires: "pact",
    label: "Mark",
    placement: "tab",
    note: "Took the slot Kanika vacated. The product's claim is measured progress, so the surface that carries the proof belongs on the bar rather than three taps down, where it sat until 2026-07-28.",
    maturity: "app-native",
  },

  {
    href: "/app/pact",
    label: "Pact",
    placement: "tab",
    note: "The hero. The fifth slot was held empty until something earned it; the Blood Pact is the app's one paid product, so its door lives on the bar for everyone. Not memberOnly on purpose: the door page IS the sell, and the week/record surfaces behind it gate themselves.",
    maturity: "app-native",
    also: ["/app/pact/week", "/app/pact/record", "/app/pact/journal"],
  },
  {
    href: "/app/pact/week",
    requires: "pact",
    label: "This week",
    placement: "nested",
    parent: "/app/pact",
    tabLanding: true,
    note: "The live week: challenge, keep, journal. The door redirects an active pact here, so for a signed member the tab lands on this and it behaves as the tab root.",
    maturity: "app-native",
  },
  {
    href: "/app/pact/record",
    requires: "pact",
    label: "The record",
    placement: "nested",
    parent: "/app/pact/week",
    note: "Kept weeks and scars, plus past pacts. Also the evidence screen the break flow shows before it lets you break. Up is the week, not the door: the door redirects signed members, and only signed members get here.",
    maturity: "app-native",
  },
  {
    href: "/app/pact/journal",
    requires: "pact",
    label: "Pact journal",
    placement: "nested",
    parent: "/app/pact/week",
    note: "Past private entries. Private by definition; the wall only ever sees the separate share box. Up is the week for the same reason as the record. Linked from the record page.",
    maturity: "app-native",
  },
  {
    href: "/app/pact/sign",
    label: "The signing",
    placement: "unlisted",
    note: "The ceremony: oath, signature, payment. Reached from the door only; full screen, no tab bar.",
    maturity: "app-native",
  },
  {
    href: "/app/pact/sealed",
    label: "Sealed",
    placement: "unlisted",
    note: "Checkout return + the seal ceremony. Reached from Stripe's success redirect or the free-entitlement sign call, never from navigation.",
    maturity: "app-native",
  },
  {
    href: "/app/pact/break",
    label: "Breaking the pact",
    placement: "unlisted",
    note: "The cancel interstitial. Reached from the record only, on purpose: breaking starts by looking at what breaks.",
    maturity: "app-native",
  },

  /* ------------------------------------------------------ the Home rails */
  {
    href: "/app/program",
    requires: "pact",
    label: "The Twelve",
    placement: "home",
    home: {
      section: "Your standing",
      hook: "The 12 week transformation.",
    },
    note: "Becomes a paid upsell course rather than a membership benefit. AI layer live: the Read, Thresholds, journal. On Home twice when a week is live: the actionable card in zone 1 and this rail card; the rail card is the always-there front door.",
    maturity: "app-native",
  },
  {
    href: "/app/program/intake",
    label: "The Twelve: intake",
    placement: "nested",
    note: "Four questions, then the Read. Reached from /app/program only; redirects out once enrolled.",
    maturity: "app-native",
  },
  {
    href: "/app/path",
    label: "The Path",
    placement: "home",
    home: {
      section: "Your standing",
      hook: "The curriculum, chapter by chapter.",
    },
    note: "OVERLAPS with /app/you and /app/program: three surfaces all answering 'where am I up to'. Needs collapsing.",
    maturity: "app-native",
  },
  {
    href: "/app/you",
    label: "Your progress",
    placement: "home",
    home: {
      section: "Your standing",
      hook: "Rank, streaks, badges, your Mark.",
    },
    note: "Rank, standing, streaks, badges, and the Mark panel.",
    maturity: "app-native",
  },
  {
    href: "/app/ranks",
    label: "Leaderboards",
    placement: "home",
    home: {
      section: "Your standing",
      hook: "Where you sit against the room.",
    },
    note: "Standing and Simulator XP behind one toggle.",
    maturity: "app-native",
  },
  {
    href: "/app/quizzes",
    label: "Quizzes",
    placement: "home",
    home: {
      section: "Test yourself",
      hook: "Calibrated instruments, not magazine filler. Find out where you actually sit.",
    },
    note: "The instrument suite, plus the member's latest result. The only card in its Home section on purpose: it renders full width, because the quizzes are the most shareable thing the app owns.",
    maturity: "app-native",
  },
  {
    href: "/app/book",
    label: "The book",
    placement: "home",
    home: {
      section: "From Kanika",
      hook: "The Sociopathic Dating Bible, member price.",
    },
    note: "Member price and re-download.",
    maturity: "ported",
  },
  {
    href: "/app/videos",
    requires: "member",
    label: "Videos",
    placement: "home",
    home: {
      section: "From Kanika",
      hook: "Kanika on camera.",
    },
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/voice-notes",
    requires: "member",
    label: "Voice notes",
    placement: "home",
    home: {
      section: "From Kanika",
      hook: "Her voice, members only.",
    },
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/kanika",
    requires: "member",
    label: "Kanika",
    placement: "more",
    section: "You",
    badged: true,
    note: "Off the bar as of 2026-07-28. The channel is dying and the tier that replaces it is a separate premium product, so it no longer earns a permanent slot. Still reachable, because members with a live thread should not lose it, and the unread count moved to the More button.",
    maturity: "app-native",
  },
  {
    href: "/app/upgrade",
    label: "Plans and pricing",
    placement: "more",
    section: "Account",
    note: "The whole ladder on one page: the Pact, the Consilium, what each opens, what each costs. Deliberately ungated; a member seeing their own plan laid out is reassurance, not a pitch.",
    maturity: "app-native",
  },
  {
    href: "/app/profile",
    label: "Profile and settings",
    placement: "more",
    section: "Account",
    note: "Identity, the seat, notification preferences.",
    maturity: "ported",
  },

  /* ------------------------------------- reachable only from inside a page */
  {
    href: "/app/train/climb",
    label: "The Simulator",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "Live scenarios, scored. The climb.",
    },
    note: "The Simulator's own menu. Opened from the hero tile in Train, and from the Train rail on Home.",
    maturity: "app-native",
  },
  {
    href: "/app/train/achievements",
    label: "Achievements",
    placement: "nested",
    parent: "/app/you",
    note: "ORPHAN: nothing links here. Hardcoded golds, old skin.",
    maturity: "ported",
  },
  {
    href: "/app/play/drill",
    label: "Speed Drill",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "Ten reads against the clock.",
    },
    note: "Owns the whole screen; the tab bar hides itself here.",
    maturity: "app-native",
  },
  {
    href: "/app/play/tell",
    label: "Daily Tell",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "One tell a day. Keep the streak.",
    },
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/adventures",
    label: "Adventures",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "Multi-chapter arcs.",
    },
    note: "Multi-chapter arcs.",
    maturity: "ported",
  },
  {
    href: "/app/lab",
    requires: "pact",
    label: "The Lab",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "Freeform sparring with the AI.",
    },
    note: "Freeform sparring, one session a day.",
    maturity: "ported",
  },
  {
    href: "/app/receipts",
    requires: "pact",
    label: "Receipts",
    placement: "nested",
    parent: "/app/train",
    home: {
      section: "Train",
      hook: "Paste a message. Get the read.",
    },
    note: "The live-situation tool, and the one most likely to be wanted at 11pm when nobody is thinking about Train. The Home rail card exists for exactly that member.",
    maturity: "ported",
  },
  {
    href: "/app/measure/baseline",
    requires: "pact",
    label: "The Baseline Read",
    placement: "nested",
    parent: "/app/measure",
    note: "Full screen, taken once then monthly.",
    maturity: "app-native",
  },
  {
    href: "/app/instincts/today",
    label: "Today's Tell",
    placement: "nested",
    parent: "/app/train",
    note: "Overlaps with /app/play/tell: two routes, one idea.",
    maturity: "ported",
  },
  {
    href: "/app/instincts/score",
    label: "Your Instinct Hex",
    placement: "nested",
    parent: "/app/instincts/today",
    note: "",
    maturity: "ported",
  },
  {
    href: "/app/instincts/history",
    label: "Tell history",
    placement: "nested",
    parent: "/app/instincts/score",
    note: "",
    maturity: "ported",
  },
  {
    href: "/app/previews",
    requires: "member",
    label: "Previews",
    placement: "nested",
    parent: "/app/feed",
    note: "ORPHAN: member-early blog posts that nothing links to.",
    maturity: "ported",
  },

  /* ------------------------------------------------------------ unlisted */
  {
    href: "/app/welcome",
    label: "Arrival",
    placement: "unlisted",
    note: "Shown once, on the way in. Navigation would be wrong here.",
    maturity: "app-native",
  },
  {
    href: "/app/train/[scenarioId]",
    label: "Scenario runner",
    placement: "unlisted",
    note: "Full-screen run. Entered from the climb, never from a menu.",
    maturity: "ported",
  },
  {
    href: "/app/feed/[postId]",
    requires: "member",
    label: "Post thread",
    placement: "unlisted",
    note: "Entered from the feed.",
    maturity: "app-native",
  },
  {
    href: "/app/adventures/[slug]",
    label: "Adventure chapters",
    placement: "unlisted",
    note: "Entered from the adventure index.",
    maturity: "ported",
  },
  {
    href: "/app/previews/[slug]",
    requires: "member",
    label: "Preview post",
    placement: "unlisted",
    note: "Entered from previews.",
    maturity: "ported",
  },
  {
    href: "/app/dev/games",
    label: "Dev: game layouts",
    placement: "unlisted",
    note: "Dev harness. Never reachable in production.",
    maturity: "dev",
  },
  {
    href: "/app/dev/juice",
    label: "Dev: juice primitives",
    placement: "unlisted",
    note: "Dev harness.",
    maturity: "dev",
  },
  {
    href: "/app/dev/map",
    label: "Dev: surface map",
    placement: "unlisted",
    note: "This file, rendered. Dev harness.",
    maturity: "dev",
  },
  {
    href: "/app/dev/motion",
    label: "Dev: motion lab",
    placement: "unlisted",
    note: "Three tiers of animation ordered by cost, not by looks. Dev harness.",
    maturity: "dev",
  },
  {
    href: "/app/dev/ui",
    label: "Dev: primitives",
    placement: "unlisted",
    note: "The shared card, header, empty state, row and skeleton, side by side. Dev harness.",
    maturity: "dev",
  },
];

/** The bottom bar, in order. Five slots including More; four are routes. */
export const TAB_SURFACES = APP_SURFACES.filter(
  (s) =>
    s.placement === "tab" && (PACT_LAUNCHED || !s.href.startsWith("/app/pact")),
);

/**
 * The viewer's rung, as the chrome sees it. Mirrors AccessTier in
 * lib/access/tier.ts but is declared here so client components never
 * import the server-side access module.
 */
export type ViewerTier = "anon" | "free" | "pact" | "member";

const TIER_RANK: Record<ViewerTier, number> = {
  anon: 0,
  free: 0,
  pact: 1,
  member: 2,
};
const REQUIRE_RANK: Record<NonNullable<AppSurface["requires"]>, number> = {
  pact: 1,
  member: 2,
};

/** Whether this surface's entry should render locked for this viewer. */
export function surfaceLocked(s: AppSurface, viewer: ViewerTier): boolean {
  if (!s.requires) return false;
  return TIER_RANK[viewer] < REQUIRE_RANK[s.requires];
}

/**
 * Which rung the wall behind a locked entry sells. A "pact" surface sells
 * the Pact; a "member" surface sells the Consilium, whoever is looking.
 */
export function offerForSurface(s: AppSurface): "pact" | "consilium" {
  return s.requires === "member" ? "consilium" : "pact";
}

/** The lock pill's one-word label for a gated surface. */
export function requiresLabel(s: AppSurface): string {
  return s.requires === "member" ? "Members" : "Pact";
}

/**
 * Home's explore rails, grouped and ordered. A surface appears here by
 * carrying a `home` field, whatever its placement: "home" surfaces live only
 * here, nested ones (the Train toys) appear both here and in their parent.
 */
export const HOME_SECTIONS: {
  title: HomeSection;
  items: AppSurface[];
}[] = HOME_SECTION_ORDER.map((title) => ({
  title,
  items: APP_SURFACES.filter((s) => s.home?.section === title),
})).filter((group) => group.items.length > 0);

/**
 * Paths that light the Home tab. A member browsing a surface they opened
 * from a Home rail is still, as far as the bar is concerned, at home.
 */
export const HOME_ACTIVE_PREFIXES = APP_SURFACES.filter(
  (s) => s.placement === "home",
).map((s) => s.href);

/** The More sheet, grouped, in section order. */
export const MORE_SECTIONS: {
  title: NonNullable<AppSurface["section"]>;
  items: AppSurface[];
}[] = (["You", "Library", "Account"] as const)
  .map((title) => ({
    title,
    items: APP_SURFACES.filter(
      (s) => s.placement === "more" && s.section === title,
    ),
  }))
  .filter((group) => group.items.length > 0);

/**
 * Paths that should light the More button. Derived, so a surface moving
 * between the bar and the sheet cannot leave a stale highlight behind, which
 * is exactly what happened before: five routes the sheet linked to were
 * missing from the hardcoded highlight list.
 */
export const MORE_ACTIVE_PREFIXES = APP_SURFACES.filter(
  (s) => s.placement === "more",
).map((s) => s.href);

/** Screens that own the whole display and hide the tab bar. */
export const FULL_SCREEN_ROUTES = [
  "/app/welcome",
  "/app/play/drill",
  "/app/pact/sign",
  "/app/pact/sealed",
];

export function isTabActive(surface: AppSurface, pathname: string): boolean {
  if (surface.href === "/app") {
    return (
      pathname === "/app" ||
      HOME_ACTIVE_PREFIXES.some((p) => pathname.startsWith(p))
    );
  }
  if (pathname.startsWith(surface.href)) return true;
  return (surface.also ?? []).some((p) => pathname.startsWith(p));
}

/**
 * Where the global back control should lead from a given path, or null
 * to hide it. Derived from the surface map rather than browser history:
 * a deep link or a refresh has no useful history, and "up" in the app's
 * own structure is the promise a back button should keep.
 *
 * Hidden on the tab roots (the bar IS the navigation there) and on
 * full-screen ceremonies that own the whole display.
 */
export function backTargetFor(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/app";
  if (TAB_SURFACES.some((t) => t.href === path)) return null;
  if (FULL_SCREEN_ROUTES.includes(path)) return null;
  if (APP_SURFACES.some((s) => s.href === path && s.tabLanding)) return null;

  let best: AppSurface | null = null;
  for (const s of APP_SURFACES) {
    if (path === s.href || path.startsWith(`${s.href}/`)) {
      if (!best || s.href.length > best.href.length) best = s;
    }
  }
  if (!best) return path.startsWith("/app/") ? "/app" : null;
  // Deeper than the surface itself (a scenario under /app/train, a post
  // under the feed): up is the surface.
  if (best.href !== path) return best.href;
  if (best.parent) return best.parent;
  // More-sheet and unlisted surfaces hang off home.
  return "/app";
}
