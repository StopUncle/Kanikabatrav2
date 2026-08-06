import type { Prisma } from "@prisma/client";

/**
 * Which Purchase rows actually deliver the book.
 *
 * `type: "BOOK"` is overloaded: for webhook-idempotency reasons the
 * Consilium subscription, Pact subscription, and Ask-pack branches all
 * write their Purchase rows with type "BOOK" and a `productVariant`
 * naming the real product. Any lookup that treats `type: "BOOK"` as
 * "owns the book" therefore matches every subscriber, which had two
 * costs: the book pages showed subscribers a dead owned-state instead
 * of the buy button (lost sales), and the resend-download endpoints
 * would mint a real download token onto a subscription row and email
 * the full book to someone who never bought it (free books).
 *
 * A real book row is variant `null` (standalone BOOK, old IC-BOOK
 * bundles), a Payhip-era edition (PREMIUM, KDP; verified against prod
 * 2026-08-05: 140 of those rows hold live download tokens for books
 * that were genuinely bought), or one of the two book-and-membership
 * bundles. Inclusion rather than exclusion on purpose: a future
 * productVariant must opt IN to granting the book, never grant it by
 * being forgotten here.
 */
const BOOK_DELIVERING_VARIANTS = [
  "PREMIUM",
  "KDP",
  "BOOK_CONSILIUM_1MO",
  "BOOK_CONSILIUM_3MO",
  // Every coaching package includes the book. The webhook's COACHING
  // branch writes a zero-amount BOOK row with this variant alongside
  // the coaching Purchase.
  "COACHING",
] as const;

export const REAL_BOOK_VARIANT_FILTER: Prisma.PurchaseWhereInput = {
  OR: [
    { productVariant: null },
    { productVariant: { in: [...BOOK_DELIVERING_VARIANTS] } },
  ],
};

/** The canonical "this email owns the book" where-clause. */
export function bookPurchaseWhere(email: string): Prisma.PurchaseWhereInput {
  return {
    customerEmail: { equals: email, mode: "insensitive" },
    type: "BOOK",
    status: "COMPLETED",
    ...REAL_BOOK_VARIANT_FILTER,
  };
}
