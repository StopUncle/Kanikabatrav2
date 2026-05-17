import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

/**
 * Live social-proof stats for the public landing pages (/consilium,
 * /quiz/results). Cached for 5 minutes so the queries fire at most
 * 12x/hour even under heavy landing-page traffic. Real-time-enough that
 * the numbers feel alive; cheap enough that DB load stays flat.
 *
 * Numbers are tuned to be visible but not boastful. We surface what is
 * actually true right now, no inflation.
 *
 * Returns a stable shape even when DB is empty so the consumer never
 * has to null-check fields.
 */
export type CommunityStats = {
  /** Currently ACTIVE Consilium members. The headline number. */
  activeMembers: number;
  /** Members who activated within the last 7 days. The momentum number. */
  joinedThisWeek: number;
  /** Voice notes posted by Kanika in the last 30 days. The "still
   *  active" signal that addresses the "is this dead?" objection. */
  voiceNotesThisMonth: number;
};

async function fetchCommunityStats(): Promise<CommunityStats> {
  const now = Date.now();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const [activeMembers, joinedThisWeek, voiceNotesThisMonth] = await Promise.all([
    prisma.communityMembership.count({
      where: { status: "ACTIVE" },
    }),
    prisma.communityMembership.count({
      where: {
        status: "ACTIVE",
        activatedAt: { gte: weekAgo },
      },
    }),
    prisma.feedPost.count({
      where: {
        type: "VOICE_NOTE",
        createdAt: { gte: monthAgo },
      },
    }),
  ]);

  return { activeMembers, joinedThisWeek, voiceNotesThisMonth };
}

/**
 * Cached community stats. 5-minute revalidate keeps the marketing
 * surface fast while letting numbers update naturally as members join
 * and content posts.
 */
export const getCommunityStats = unstable_cache(
  fetchCommunityStats,
  ["community-stats-v1"],
  { revalidate: 300, tags: ["community-stats"] },
);
