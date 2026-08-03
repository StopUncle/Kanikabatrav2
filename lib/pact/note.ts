/**
 * Shared pact notes on the feed. A shared note is a real FeedPost of type
 * PACT_NOTE, authored by the member (their name, their post), with the
 * anonymity choice carried in the post's metadata. This file is the one
 * place that reads that metadata, so the serializers and the renderers
 * agree on what a pact note is.
 *
 * Client-safe on purpose: no prisma import, both server serializers and
 * client cards use it.
 */

export interface PactNoteMeta {
  weekNumber: number;
  anonymous: boolean;
}

/** Parse FeedPost.metadata into a pact-note shape, or null when it is not one. */
export function pactNoteMeta(metadata: unknown): PactNoteMeta | null {
  if (!metadata || typeof metadata !== "object") return null;
  const m = metadata as Record<string, unknown>;
  if (m.pactNote !== true) return null;
  const weekNumber = typeof m.weekNumber === "number" ? m.weekNumber : 0;
  return { weekNumber, anonymous: m.anonymous === true };
}

/**
 * The author object an anonymous note serializes as. The real authorId
 * stays on the row (accountability, moderation, the gender filter); this
 * is only what leaves the server. Non-null so no renderer falls back to
 * its "Kanika" default.
 */
export const ANONYMOUS_AUTHOR = {
  id: "anonymous",
  name: "Anonymous",
  role: "MEMBER",
  tier: 1,
} as const;

/**
 * Apply the anonymity choice at serialization time. Every place that
 * formats a FeedPost author must pass through here, or an anonymous
 * note leaks its name.
 */
export function maskPactAuthor<
  A extends { id: string; name: string | null; role: string; tier: number },
>(metadata: unknown, author: A | null): A | typeof ANONYMOUS_AUTHOR | null {
  const meta = pactNoteMeta(metadata);
  if (meta?.anonymous) return ANONYMOUS_AUTHOR;
  return author;
}

/**
 * One accent per week, cycling with the challenge cycle. Muted jewel
 * tones that sit inside the dark-luxury palette instead of fighting it.
 */
const WEEK_COLORS = [
  "#d4af37", // gold
  "#b3293c", // blood
  "#8b6fc4", // violet
  "#3f9e6e", // emerald
  "#c07a4a", // copper
  "#5b8bc9", // steel
  "#c96a8d", // rose
  "#8aa06b", // sage
  "#3f9e9e", // teal
  "#a05a9e", // plum
  "#d19a3a", // amber
  "#7d8ba1", // slate
] as const;

export function pactWeekColor(weekNumber: number): string {
  const index = weekNumber > 0 ? (weekNumber - 1) % WEEK_COLORS.length : 0;
  return WEEK_COLORS[index];
}
