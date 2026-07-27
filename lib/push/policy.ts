import { prisma } from "@/lib/prisma";
import type { PushCategory } from "./index";

/**
 * How often we are allowed to interrupt someone.
 *
 * Every category and every cron routes through one gate, because a cap
 * that each caller has to remember is not a cap. The failure mode this
 * prevents is the ordinary one: three or four features each shipping a
 * reasonable-sounding notification, and the member muting all of them.
 *
 * Direct messages are exempt. A one-to-one from Kanika is the highest
 * signal a member can receive and it is never automated, so it should
 * never be silenced by a week of automated pings.
 */

/** Automated pushes allowed per user per rolling 7 days. */
export const WEEKLY_PUSH_CAP = 5;

/** Categories the cap does not apply to. */
const CAP_EXEMPT: ReadonlySet<PushCategory> = new Set<PushCategory>([
  "directMessage",
]);

const ROLLING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export function isCapExempt(category: PushCategory): boolean {
  return CAP_EXEMPT.has(category);
}

/** Automated pushes delivered to this user in the last 7 days. */
export async function pushesInLastWeek(userId: string): Promise<number> {
  return prisma.pushSend.count({
    where: {
      userId,
      sentAt: { gte: new Date(Date.now() - ROLLING_WINDOW_MS) },
      category: { notIn: Array.from(CAP_EXEMPT) },
    },
  });
}

/**
 * Whether this send is allowed through. Fails OPEN: if the count query
 * errors we let the notification go rather than silently swallowing a
 * streak save or a reply from Kanika. Over-sending once beats a broken
 * database quietly disabling every notification in the product.
 */
export async function withinPushCap(
  userId: string,
  category: PushCategory,
): Promise<boolean> {
  if (isCapExempt(category)) return true;
  try {
    return (await pushesInLastWeek(userId)) < WEEKLY_PUSH_CAP;
  } catch {
    return true;
  }
}

/** Record a delivered push. Best-effort: never fails the send. */
export async function logPushSend(
  userId: string,
  category: PushCategory,
): Promise<void> {
  if (isCapExempt(category)) return;
  await prisma.pushSend.create({ data: { userId, category } }).catch(() => {
    /* non-fatal: the notification already went out */
  });
}

/** Drop log rows past the window. Called from the weekly digest cron. */
export async function prunePushSendLog(olderThanDays = 30): Promise<number> {
  try {
    const { count } = await prisma.pushSend.deleteMany({
      where: {
        sentAt: {
          lt: new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000),
        },
      },
    });
    return count;
  } catch {
    return 0;
  }
}
