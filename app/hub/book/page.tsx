import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";
import { bookPurchaseWhere } from "@/lib/book/ownership";
import MemberBookClient from "@/app/consilium/(member)/book/MemberBookClient";

export const metadata = {
  title: "The Book | Consilium",
  description:
    "The Sociopathic Dating Bible at the Consilium member price, $9.99, with the addendum chapters.",
};

/**
 * The Book inside the app shell. Same data assembly and client as the
 * old /consilium/book page (member-price checkout, download re-access,
 * case-insensitive purchase lookup); the shell provides the app chrome.
 */
export default async function AppBookPage() {
  const userId = await requireServerAuth("/app/book");

  // Tier-aware on purpose, never a wall: the book must stay buyable for
  // free and pact accounts (book sales are the primary revenue goal), so
  // the tier only decides which price is shown. The checkout route
  // re-verifies membership before pricing, so a spoofed view cannot
  // change what is charged.
  const [user, access] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    }),
    getAccess(userId),
  ]);
  if (!user?.email) return null;

  // bookPurchaseWhere, not a bare type filter: subscription and Ask rows
  // also carry type "BOOK", and matching them showed subscribers a dead
  // owned-state instead of the buy button.
  const existingBook = await prisma.purchase.findFirst({
    where: bookPurchaseWhere(user.email),
    orderBy: { createdAt: "desc" },
    select: {
      downloadToken: true,
      expiresAt: true,
    },
  });

  const downloadExpired =
    existingBook?.expiresAt && existingBook.expiresAt < new Date();

  return (
    <div className="pb-8 pt-2">
      <MemberBookClient
        ownsBook={!!existingBook}
        downloadToken={existingBook?.downloadToken ?? null}
        downloadExpired={!!downloadExpired}
        memberEmail={user.email}
        isMember={access.isMember}
      />
    </div>
  );
}
