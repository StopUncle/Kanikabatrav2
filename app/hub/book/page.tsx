import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
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

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  if (!user?.email) return null;

  const existingBook = await prisma.purchase.findFirst({
    where: {
      customerEmail: { equals: user.email, mode: "insensitive" },
      type: "BOOK",
      status: "COMPLETED",
    },
    orderBy: { createdAt: "desc" },
    select: {
      downloadToken: true,
      expiresAt: true,
    },
  });

  const downloadExpired =
    existingBook?.expiresAt && existingBook.expiresAt < new Date();

  return (
    <div className="pb-28 pt-2">
      <MemberBookClient
        ownsBook={!!existingBook}
        downloadToken={existingBook?.downloadToken ?? null}
        downloadExpired={!!downloadExpired}
        memberEmail={user.email}
      />
    </div>
  );
}
