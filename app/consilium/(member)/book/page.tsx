import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import MemberBookClient from "./MemberBookClient";

export const metadata = {
  title: "The Book — The Consilium | Kanika Batra",
  description:
    "The Sociopathic Dating Bible at the Consilium member price — $9.99, with the addendum chapters.",
};

/**
 * Member-only book landing. Where Consilium members either:
 *   - Claim the $9.99 member price on the Sociopathic Dating Bible, or
 *   - Re-access their existing download links (for members who already
 *     bought the standalone book OR received the old bundle before the
 *     bundling change).
 *
 * This page is the ONLY place the $9.99 offer is exposed publicly. The
 * /book public page and the homepage stay at $24.99 so the standalone
 * price signal isn't diluted to non-members.
 *
 * The server-side checkout at /api/stripe/checkout verifies membership
 * and swaps BOOK → BOOK_MEMBER regardless of where the button is
 * clicked, so non-members can never hit this endpoint's $9.99 price.
 */
export default async function MemberBookPage() {
  const userId = await requireServerAuth("/consilium/book");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  if (!user?.email) {
    // Shouldn't happen — requireServerAuth would have redirected. Narrow for TS.
    return null;
  }

  // Find the most recent non-refunded BOOK purchase for this member's
  // email. Covers three audiences:
  //   1. Members who got the old bundled book (paypalOrderId: IC-BOOK-…)
  //   2. Members who bought standalone BOOK before joining
  //   3. Members who buy via this page at $9.99 today
  //
  // Case-insensitive email match — Purchase rows store the email as it
  // was entered at Stripe checkout (often mixed case like
  // "Kanika@Kanikarose.com") while User rows normalise to lowercase on
  // register. Without `mode: "insensitive"` a gift-claim user whose
  // purchase was under a different-cased email would see "you don't
  // own this yet" and be charged for a book they already bought.
  const existingBook = await prisma.purchase.findFirst({
    where: {
      customerEmail: { equals: user.email, mode: "insensitive" },
      type: "BOOK",
      status: "COMPLETED",
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      downloadToken: true,
      expiresAt: true,
      amount: true,
      createdAt: true,
    },
  });

  const ownsBook = !!existingBook;
  const downloadExpired =
    existingBook?.expiresAt && existingBook.expiresAt < new Date();

  return (
    <MemberBookClient
      ownsBook={ownsBook}
      downloadToken={existingBook?.downloadToken ?? null}
      downloadExpired={!!downloadExpired}
      memberEmail={user.email}
    />
  );
}
