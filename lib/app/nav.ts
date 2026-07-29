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

export type Placement =
  /** Bottom tab bar. Five slots, no more. */
  | "tab"
  /** The More sheet, one tap deeper. */
  | "more"
  /** Reached from inside a parent surface, on purpose. */
  | "nested"
  /** Deliberately unreachable from navigation (runners, dev, one-shots). */
  | "unlisted";

export type Maturity = "app-native" | "ported" | "stub" | "dev";

export interface AppSurface {
  href: string;
  label: string;
  placement: Placement;
  /** Which group in the More sheet. Only meaningful when placement is "more". */
  section?: "You" | "Library" | "Account";
  /** The surface this hangs off. Only meaningful when placement is "nested". */
  parent?: string;
  /** Why it lives where it lives. Required, including for "unlisted". */
  note: string;
  maturity: Maturity;
  /**
   * Extra paths that should light this entry up. The games live under
   * /app/play but are launched from Train, so Train stays lit inside them.
   */
  also?: string[];
  /** Renders an unread count (the Kanika thread). */
  badged?: boolean;
  /**
   * Requires a live membership. This flag and the page's own memberGate()
   * call travel as a pair: the chrome reads it to lock the entry before the
   * tap, the page still gates the render for deep links. Setting one without
   * the other means either an unlabelled wall or an unenforced lock.
   */
  memberOnly?: boolean;
}

export const APP_SURFACES: AppSurface[] = [
  /* ---------------------------------------------------------------- tabs */
  {
    href: "/app",
    label: "Home",
    placement: "tab",
    note: "The action screen. What to do now, not what exists.",
    maturity: "app-native",
  },
  {
    href: "/app/feed",
    memberOnly: true,
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
    also: ["/app/play"],
  },

  {
    href: "/app/measure",
    memberOnly: true,
    label: "Mark",
    placement: "tab",
    note: "Took the slot Kanika vacated. The product's claim is measured progress, so the surface that carries the proof belongs on the bar rather than three taps down, where it sat until 2026-07-28.",
    maturity: "app-native",
  },

  /* ------------------------------------------------------- the More sheet */
  {
    href: "/app/program",
    memberOnly: true,
    label: "The Twelve",
    placement: "more",
    section: "You",
    note: "Becomes a paid upsell course rather than a membership benefit. AI layer live: the Read, Thresholds, journal.",
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
    placement: "more",
    section: "You",
    note: "OVERLAPS with /app/you and /app/program: three surfaces all answering 'where am I up to'. Needs collapsing.",
    maturity: "app-native",
  },
  {
    href: "/app/you",
    label: "Your progress",
    placement: "more",
    section: "You",
    note: "Rank, standing, streaks, badges, and the Mark panel.",
    maturity: "app-native",
  },
  {
    href: "/app/ranks",
    label: "Leaderboards",
    placement: "more",
    section: "You",
    note: "Standing and Simulator XP behind one toggle.",
    maturity: "app-native",
  },
  {
    href: "/app/quizzes",
    label: "Quizzes",
    placement: "more",
    section: "You",
    note: "The instrument suite, plus the member's latest result.",
    maturity: "app-native",
  },
  {
    href: "/app/book",
    label: "The book",
    placement: "more",
    section: "Library",
    note: "Member price and re-download.",
    maturity: "ported",
  },
  {
    href: "/app/videos",
    memberOnly: true,
    label: "Videos",
    placement: "more",
    section: "Library",
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/voice-notes",
    memberOnly: true,
    label: "Voice notes",
    placement: "more",
    section: "Library",
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/kanika",
    memberOnly: true,
    label: "Kanika",
    placement: "more",
    section: "You",
    badged: true,
    note: "Off the bar as of 2026-07-28. The channel is dying and the tier that replaces it is a separate premium product, so it no longer earns a permanent slot. Still reachable, because members with a live thread should not lose it, and the unread count moved to the More button.",
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
    note: "The Simulator's own menu. Opened from the hero tile in Train.",
    maturity: "app-native",
  },
  {
    href: "/app/train/browse",
    label: "Browse every scenario",
    placement: "nested",
    parent: "/app/train/climb",
    note: "The reference index behind the climb. Still the old skin, 835 lines.",
    maturity: "ported",
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
    note: "Owns the whole screen; the tab bar hides itself here.",
    maturity: "app-native",
  },
  {
    href: "/app/play/tell",
    label: "Daily Tell",
    placement: "nested",
    parent: "/app/train",
    note: "",
    maturity: "app-native",
  },
  {
    href: "/app/adventures",
    label: "Adventures",
    placement: "nested",
    parent: "/app/train",
    note: "Multi-chapter arcs.",
    maturity: "ported",
  },
  {
    href: "/app/lab",
    memberOnly: true,
    label: "The Lab",
    placement: "nested",
    parent: "/app/train",
    note: "Freeform sparring, one session a day.",
    maturity: "ported",
  },
  {
    href: "/app/receipts",
    memberOnly: true,
    label: "Receipts",
    placement: "nested",
    parent: "/app/train",
    note: "The live-situation tool, and the one most likely to be wanted at 11pm when nobody is thinking about Train.",
    maturity: "ported",
  },
  {
    href: "/app/measure/baseline",
    memberOnly: true,
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
    memberOnly: true,
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
    memberOnly: true,
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
    memberOnly: true,
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
    href: "/app/dev/ui",
    label: "Dev: primitives",
    placement: "unlisted",
    note: "The shared card, header, empty state, row and skeleton, side by side. Dev harness.",
    maturity: "dev",
  },
];

/** The bottom bar, in order. Five slots including More; four are routes. */
export const TAB_SURFACES = APP_SURFACES.filter((s) => s.placement === "tab");

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
export const FULL_SCREEN_ROUTES = ["/app/welcome", "/app/play/drill"];

export function isTabActive(surface: AppSurface, pathname: string): boolean {
  if (surface.href === "/app") return pathname === "/app";
  if (pathname.startsWith(surface.href)) return true;
  return (surface.also ?? []).some((p) => pathname.startsWith(p));
}
