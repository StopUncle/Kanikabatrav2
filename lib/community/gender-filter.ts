import { prisma } from "@/lib/prisma";
import type { Gender, Prisma } from "@prisma/client";

/**
 * Gender-scoped visibility for member-authored content.
 *
 * Inner Circle is split into two groups (male / female). Members can only see
 * messages authored by users of their own gender. Admin/moderator content
 * (Kanika and her team) is visible to everyone — they're the broadcast voice
 * that holds the whole community together.
 *
 * Legacy users with no gender set (rows that pre-date this feature) see all
 * content as a graceful fallback. New applicants are forced to pick male or
 * female on the application form, so this only affects pre-existing accounts.
 */

export type ViewerGender = Gender | null;

/**
 * Look up the viewer's gender once per request.
 * Returns null if the user has no gender set yet — caller treats as legacy
 * see-all.
 */
export async function getViewerGender(
  userId: string | null,
): Promise<ViewerGender> {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true },
  });
  return user?.gender ?? null;
}

/**
 * Build a Prisma `where` clause for content where the `author` relation
 * should be gender-matched. Returns `{}` for legacy null-gender viewers so
 * the query is unfiltered.
 *
 * Use this when filtering FeedComment, ForumPost, ForumReply etc. — anything
 * with a non-nullable `author` relation.
 */
export function authorGenderWhere(
  viewerGender: ViewerGender,
): Prisma.UserWhereInput | undefined {
  if (!viewerGender) return undefined;
  return {
    OR: [
      { gender: viewerGender },
      { role: { in: ["ADMIN", "MODERATOR"] } },
    ],
  };
}

/**
 * Same as `authorGenderWhere` but applied to a model with a NULLABLE author
 * (e.g. FeedPost — cron-automated posts have authorId = null and should be
 * visible to everyone).
 *
 * Returns a Prisma where fragment that you can spread into your existing
 * query, or `{}` if the viewer has no gender set.
 */
export function feedPostGenderWhere(
  viewerGender: ViewerGender,
): Prisma.FeedPostWhereInput {
  if (!viewerGender) return {};
  return {
    OR: [
      { authorId: null },
      { author: { gender: viewerGender } },
      { author: { role: { in: ["ADMIN", "MODERATOR"] } } },
    ],
  };
}
