import { prisma } from "@/lib/prisma";
import { mergeEmailPreferences } from "@/lib/email-preferences";
import type { UnsubscribePayload } from "@/lib/unsubscribe-token";

/**
 * Apply (or reverse) an unsubscribe from a verified token.
 *
 * Three callers used to hand-roll this: the /unsubscribe page, the RFC
 * 8058 one-click endpoint, and nothing else, which is exactly the number
 * needed for the two to disagree. Both spread `{...existing, [type]:
 * false}` over whatever shape the column happened to hold, so a row
 * storing a JSON string rather than an object silently gained a key on an
 * object built from nothing.
 *
 * `optIn: true` reverses the unsubscribe. That is what powers the undo on
 * the success page: one-click unsubscribe is one click, which means it is
 * also one MISCLICK, and the person who did not mean it currently has no
 * way back that does not involve making an account.
 */
export async function applyUnsubscribe(
  payload: UnsubscribePayload,
  optIn = false,
): Promise<{ matchedUser: boolean }> {
  const user = payload.userId
    ? await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, emailPreferences: true },
      })
    : await prisma.user.findUnique({
        where: { email: payload.email! },
        select: { id: true, emailPreferences: true },
      });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailPreferences: mergeEmailPreferences(user.emailPreferences, {
          [payload.type]: optIn,
        }),
      },
    });
  }

  // Subscriber rows carry the opt-out as a tag, for recipients with no
  // account. Pull the tag on re-subscribe, and guard the push so a
  // repeated unsubscribe does not grow the array without bound.
  if (payload.email) {
    const tag = `unsubscribed:${payload.type}`;
    const subscribers = await prisma.subscriber.findMany({
      where: { email: payload.email },
      select: { id: true, tags: true },
    });
    for (const sub of subscribers) {
      const has = sub.tags.includes(tag);
      if (optIn && has) {
        await prisma.subscriber.update({
          where: { id: sub.id },
          data: { tags: sub.tags.filter((t) => t !== tag) },
        });
      } else if (!optIn && !has) {
        await prisma.subscriber.update({
          where: { id: sub.id },
          data: { tags: { push: tag } },
        });
      }
    }
  }

  return { matchedUser: Boolean(user) };
}
