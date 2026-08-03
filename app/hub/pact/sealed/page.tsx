import SealedCeremony from "@/components/app-shell/pact/SealedCeremony";

export const metadata = {
  title: "Sealed | Consilium",
};

/**
 * Stripe's success redirect and the entitled path's landing. Deliberately
 * no server-side pact check: right after checkout the webhook may still be
 * in flight, and refusing to celebrate over a race would be the wrong
 * trade. The ceremony plays; the client attaches the stashed signature
 * with retries.
 */
export default function PactSealedPage() {
  return <SealedCeremony />;
}
