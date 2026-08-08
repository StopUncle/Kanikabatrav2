import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";

/**
 * Who else is in here.
 *
 * Home shows the whole product now, including the parts a free account
 * cannot open. The missing half of that is other people: a catalogue with
 * nobody in it is a brochure.
 *
 * THREE RULES, and the first one is not negotiable.
 *
 * 1. NEVER `getLeaderboard`. It merges forty invented people into the real
 *    rows (`MOCK_LEADERBOARD`, lib/simulator/leaderboard.ts:104-145,
 *    "VioletAxis", "Initiate #084"). Fabricated members on the front page
 *    of a product we charge for is not a bug, it is a lie, and it is
 *    invisible at the call site. A test pins this file's imports.
 *
 * 2. Only NAMED people get a face. `memberSafeName` returns `displayName`
 *    or the literal string "Member", so an unfiltered list reads
 *    "Member, Member, Member" and looks like an empty room rather than a
 *    full one. Filtering on `displayName: { not: null }` means everybody
 *    is COUNTED and only the named are SHOWN, which is both honest and
 *    better looking.
 *
 * 3. Bots and admins are excluded exactly as the Standing board excludes
 *    them (leaderboard.ts:333-336). Kanika is not a peer, and a training
 *    bot is not a person in the room.
 *
 * Neither read depends on the viewer, so the whole thing is cached for
 * five minutes and leaves the per-request path. `standing` carries no
 * index (only `isBot` and `lastSeenAt` do), so the ordering is a scan;
 * on a table this size that is cheap, and the cache makes it once per
 * five minutes rather than once per visitor.
 */

/** How recently someone must have been seen to count as "here". */
const ACTIVE_WINDOW_DAYS = 7;
const FACES = 8;
const CACHE_SECONDS = 300;

export interface RoomFace {
  id: string;
  name: string;
  standing: number;
  ringLevel: number;
}

export interface RoomState {
  /** People seen in the last week. Everyone, named or not. */
  trainingThisWeek: number;
  /** The named few, highest standing first. */
  faces: RoomFace[];
}

const EXCLUDE_NON_PEOPLE = {
  isBot: false,
  role: { not: "ADMIN" as const },
};

async function readRoom(): Promise<RoomState> {
  const since = new Date(
    Date.now() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  );

  const [trainingThisWeek, rows] = await Promise.all([
    prisma.user.count({
      where: { ...EXCLUDE_NON_PEOPLE, lastSeenAt: { gte: since } },
    }),
    prisma.user.findMany({
      where: {
        ...EXCLUDE_NON_PEOPLE,
        // See rule 2. Counted either way; shown only with a name.
        displayName: { not: null },
        standing: { gt: 0 },
      },
      orderBy: { standing: "desc" },
      take: FACES,
      select: {
        id: true,
        name: true,
        displayName: true,
        role: true,
        standing: true,
        ringLevel: true,
      },
    }),
  ]);

  return {
    trainingThisWeek,
    faces: rows.map((u) => ({
      id: u.id,
      // Through the masker even though displayName is guaranteed here:
      // the rule about never emitting a real name should hold at every
      // exit, not only where it happens to be load-bearing today.
      name: memberSafeName(u),
      standing: u.standing,
      ringLevel: u.ringLevel,
    })),
  };
}

/** The room, cached. Viewer-independent by construction. */
export const getRoomState = unstable_cache(readRoom, ["app-home-room"], {
  revalidate: CACHE_SECONDS,
  tags: ["app-home-room"],
});
