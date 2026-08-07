import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { getWaitingCount } from "@/lib/studio/inbox";

/**
 * Tell Kanika something is waiting, and carry the new inbox count with it.
 *
 * The count is the point. Studio's badge has two halves: the page syncs it
 * while open, and this push is the only thing that can move it while the
 * app is CLOSED, because nothing on the page is running then. So the
 * number is recomputed here rather than passed in by the caller, which
 * keeps it true even when two questions land in the same minute.
 *
 * The recipient is looked up from the database, NOT via getAdminUserId():
 * that reads the admin_session cookie, and every caller here is serving a
 * MEMBER's request, which carries no such cookie. Resolving it that way
 * would return null on every real call and the push would never fire.
 * The query matches getAdminUserId's own identity rule (first ADMIN by
 * creation) so this addresses the same account the subscription binds to
 * when she allows notifications inside Studio.
 *
 * Never throws and never awaited by a request that matters: a member
 * asking a question must not fail because a notification did.
 */
export async function notifyStudio(params: {
  title: string;
  body: string;
  url: string;
}): Promise<void> {
  try {
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "asc" },
      select: { id: true },
    });
    if (!admin) return;
    const adminId = admin.id;

    const waiting = await getWaitingCount();

    await sendPushToUser(adminId, "studioInbox", {
      title: params.title,
      body: params.body,
      url: params.url,
      // One tag, so five questions overnight collapse to one lock-screen
      // entry rather than five. The badge still counts all of them.
      tag: "studio-inbox",
      appBadge: waiting,
    });
  } catch (err) {
    logger.error("[studio/notify] failed", err as Error);
  }
}
