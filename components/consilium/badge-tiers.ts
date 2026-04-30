/**
 * Badge tier data + tenure math for the Consilium's 12-tier system.
 *
 * Pure TS, no React, no "use client" directive. Safe to import from
 * server components, client components, scripts, and tests alike.
 * The visual MemberBadge component is a separate client module that
 * imports from here.
 */

export type MetalKey =
  | "bronze"
  | "polished-bronze"
  | "copper"
  | "pale-silver"
  | "silver"
  | "polished-silver"
  | "silver-gold"
  | "light-gold"
  | "warm-gold"
  | "deep-gold"
  | "rose-gold"
  | "queen";

export interface BadgeTier {
  tier: number; // 1..12
  name: string;
  numeral: string;
  monthLabel: string;
  tagline: string;
  metal: MetalKey;
}

export interface MetalGradient {
  dark: string;
  mid: string;
  light: string;
  halo: string;
}

export const METALS: Record<MetalKey, MetalGradient> = {
  bronze: { dark: "#6b4018", mid: "#a0682f", light: "#c99561", halo: "#c99561" },
  "polished-bronze": {
    dark: "#7a4e1f",
    mid: "#b3793a",
    light: "#dba974",
    halo: "#dba974",
  },
  copper: { dark: "#6b2f12", mid: "#b8632e", light: "#e09068", halo: "#e09068" },
  "pale-silver": {
    dark: "#606060",
    mid: "#a8a8a8",
    light: "#dcdcdc",
    halo: "#c0c0c0",
  },
  silver: { dark: "#555555", mid: "#b8b8b8", light: "#f0f0f0", halo: "#d8d8d8" },
  "polished-silver": {
    dark: "#4a4a4a",
    mid: "#c6c6c6",
    light: "#ffffff",
    halo: "#e8e8e8",
  },
  "silver-gold": {
    dark: "#7a6a3e",
    mid: "#c9b77a",
    light: "#ead89f",
    halo: "#d4bc7a",
  },
  "light-gold": {
    dark: "#9c7a1f",
    mid: "#d4af37",
    light: "#f3d98a",
    halo: "#e8c96a",
  },
  "warm-gold": {
    dark: "#8a6b1b",
    mid: "#d4af37",
    light: "#f5dc87",
    halo: "#d4af37",
  },
  "deep-gold": {
    dark: "#6d4f0f",
    mid: "#b8912d",
    light: "#e6c672",
    halo: "#b8912d",
  },
  "rose-gold": {
    dark: "#7d3a44",
    mid: "#b76e79",
    light: "#e8bcc3",
    halo: "#b76e79",
  },
  queen: { dark: "#7a4e00", mid: "#d4af37", light: "#fff4b0", halo: "#ffd966" },
};

export const BADGE_TIERS: BadgeTier[] = [
  {
    tier: 1,
    name: "Initiate",
    numeral: "I",
    monthLabel: "Month 1",
    tagline: "You've stepped through the gate.",
    metal: "bronze",
  },
  {
    tier: 2,
    name: "Scribe",
    numeral: "II",
    monthLabel: "Month 2",
    tagline: "You record what you learn.",
    metal: "polished-bronze",
  },
  {
    tier: 3,
    name: "Apprentice",
    numeral: "III",
    monthLabel: "Month 3",
    tagline: "The patterns start showing themselves.",
    metal: "copper",
  },
  {
    tier: 4,
    name: "Advocate",
    numeral: "IV",
    monthLabel: "Month 4",
    tagline: "You speak when it matters.",
    metal: "pale-silver",
  },
  {
    tier: 5,
    name: "Strategist",
    numeral: "V",
    monthLabel: "Month 5",
    tagline: "You think three moves ahead.",
    metal: "silver",
  },
  {
    tier: 6,
    name: "Sentinel",
    numeral: "VI",
    monthLabel: "Month 6",
    tagline: "Half a year. You see the manipulators coming.",
    metal: "polished-silver",
  },
  {
    tier: 7,
    name: "Counselor",
    numeral: "VII",
    monthLabel: "Month 7",
    tagline: "Members turn to you for the cold read.",
    metal: "silver-gold",
  },
  {
    tier: 8,
    name: "Magistrate",
    numeral: "VIII",
    monthLabel: "Month 8",
    tagline: "Your judgment is trusted.",
    metal: "light-gold",
  },
  {
    tier: 9,
    name: "Consul",
    numeral: "IX",
    monthLabel: "Month 9",
    tagline: "You lead by example, not permission.",
    metal: "warm-gold",
  },
  {
    tier: 10,
    name: "Patrician",
    numeral: "X",
    monthLabel: "Month 10",
    tagline: "You belong at the top table.",
    metal: "deep-gold",
  },
  {
    tier: 11,
    name: "Sovereign",
    numeral: "XI",
    monthLabel: "Month 11",
    tagline: "You rule your own frame. No one dictates terms.",
    metal: "rose-gold",
  },
  {
    tier: 12,
    name: "Queen",
    numeral: "XII",
    monthLabel: "Year 1",
    tagline: "One full year. You've earned the throne.",
    metal: "queen",
  },
];

/**
 * Map elapsed months since activation to a badge tier.
 *
 *   0   months  -> tier 1  (Initiate, day 1)
 *   1   month   -> tier 2  (Scribe)
 *   11  months  -> tier 12 (Queen)
 *   12+ months  -> tier 12 (stays Queen, no further ranks exist)
 */
export function tierFromMonths(months: number): number {
  return Math.min(Math.max(Math.floor(months) + 1, 1), 12);
}

/**
 * Elapsed whole months from an activation date up to now.
 * Uses 30-day blocks, good enough for tier gating.
 */
export function monthsSince(date: Date | null | undefined): number {
  if (!date) return 0;
  const ms = Date.now() - date.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24 * 30)));
}

/**
 * Days remaining before the member advances to the next tier. Returns
 * null when already at the top rank (tier 12).
 */
export function daysToNextTier(date: Date | null | undefined): number | null {
  if (!date) return null;
  const ms = Date.now() - date.getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  const currentMonth = Math.floor(days / 30);
  if (currentMonth >= 11) return null; // already Queen
  const daysIntoMonth = days - currentMonth * 30;
  return Math.max(1, Math.ceil(30 - daysIntoMonth));
}

export function getBadge(tier: number): BadgeTier {
  const clamped = Math.min(Math.max(tier, 1), 12);
  return BADGE_TIERS[clamped - 1];
}

/**
 * Tier for a given member. Admins always show as Queen (tier 12), the
 * tenure math doesn't apply to Kanika. For everyone else, tier is
 * derived from CommunityMembership.activatedAt.
 *
 * Pass the member's role and the activation date. Both may be null
 * (anonymous / applied-but-not-activated accounts), we default to
 * tier 1 (Initiate) in that case.
 */
export function tierForMember(input: {
  role?: string | null;
  activatedAt?: Date | null;
}): number {
  if (input.role === "ADMIN") return 12;
  return tierFromMonths(monthsSince(input.activatedAt ?? null));
}
