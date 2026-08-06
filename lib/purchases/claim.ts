import { prisma } from "@/lib/prisma";

/**
 * Attach guest Purchase rows to the account that owns their email.
 *
 * Guest checkout writes Purchase with userId null; ownership lookups
 * (lib/book/ownership.ts) match on customerEmail, so access already
 * works. What stays broken without this is the linkage itself: the
 * account's purchase history, coaching sessions, and every analytics
 * join see nothing. Day one of the app launch: 18 books sold, 1 row
 * carried a userId.
 *
 * Called fire-and-forget at register and login. Idempotent (only rows
 * with userId null match) and grants nothing new: registering with an
 * email already unlocks everything that email bought.
 */
export async function claimGuestPurchases(
  userId: string,
  email: string,
): Promise<void> {
  try {
    await prisma.purchase.updateMany({
      where: {
        customerEmail: { equals: email, mode: "insensitive" },
        userId: null,
      },
      data: { userId },
    });
  } catch {
    /* linkage is a data-quality repair, never worth failing auth over */
  }
}
