import { prisma } from "@/lib/prisma";
import { isOptedIn } from "@/lib/email-preferences";
import type { EmailPreferenceKey } from "@/lib/email-preferences";

/**
 * May we send this marketing email to this address?
 *
 * The queue processor re-checks preferences at send time, so anything
 * enqueued is covered. Direct sends were not: the mini-quiz result and the
 * starter pack fire straight from their API routes, so an address that
 * unsubscribed last month and filled the form in again today got mailed
 * anyway. The unsubscribe worked, the send simply never asked.
 *
 * Checks both stores because a recipient may exist in either or neither:
 * `User.emailPreferences` for people with accounts, `Subscriber.tags` for
 * the ones who only ever gave an email address. Absent from both means
 * never opted out, which is a send.
 *
 * Fails OPEN on a database error. A transient DB blip should not silently
 * swallow a result email someone is waiting for; the opposite bias would
 * turn an outage into a stream of "where is my quiz result" tickets.
 */
export async function canSendMarketingTo(
  email: string,
  type: EmailPreferenceKey = "marketing",
): Promise<boolean> {
  const address = email.toLowerCase().trim();
  if (!address) return false;

  try {
    const [user, subscriber] = await Promise.all([
      prisma.user.findUnique({
        where: { email: address },
        select: { emailPreferences: true, isBanned: true },
      }),
      prisma.subscriber.findFirst({
        where: { email: address },
        select: { tags: true },
      }),
    ]);

    if (user?.isBanned) return false;
    if (user && !isOptedIn(user.emailPreferences, type)) return false;
    if (subscriber?.tags.includes(`unsubscribed:${type}`)) return false;

    return true;
  } catch {
    return true;
  }
}
