import { redirect } from "next/navigation";

export const metadata = {
  title: "Support — Kanika Batra",
  description: "Support Kanika's work by grabbing the book.",
};

// The previous /donate page ran a live PayPal flow. The app moved to
// Stripe-only in April 2026 and donations aren't in the Stripe product
// catalogue, so any charge captured here would have bypassed the
// canonical payment pipeline (no Purchase row, no email sequence, no
// campaign eligibility). Until a Stripe-native donation flow is built,
// redirect to /book — her primary CTA and the cleanest way to support
// the work.
export default function DonatePage() {
  redirect("/book");
}
