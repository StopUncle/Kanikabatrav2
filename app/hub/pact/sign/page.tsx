import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { readPact } from "@/lib/pact/read";
import { isPactPreset } from "@/lib/pact/presets";
import { STRIPE_PRICES } from "@/lib/stripe";
import SignCeremony from "@/components/app-shell/pact/SignCeremony";

export const metadata = {
  title: "Sign the pact | Consilium",
};

/**
 * The signing ceremony, full screen (no tab bar; it is on the
 * FULL_SCREEN_ROUTES list). Choices arrive as query params from the door;
 * anything malformed goes back to the door rather than guessing.
 */
export default async function PactSignPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; cycle?: string }>;
}) {
  const userId = await requireServerAuth("/app/pact/sign");
  const params = await searchParams;

  const preset = params.preset ?? "";
  if (!isPactPreset(preset)) {
    redirect("/app/pact");
  }
  const cycle = params.cycle === "annual" ? "annual" : "weekly";

  const access = await getAccess(userId);
  const read = await readPact(userId, { entitled: access.pactEntitled });
  if (read.pact) {
    redirect("/app/pact/week");
  }

  // A payer whose checkout cannot succeed never enters the ceremony.
  // Until the live Stripe prices are pasted in, the create route 503s;
  // discovering that AFTER the oath, the goals, and a drawn signature is
  // the worst possible place. Entitled members (no checkout) pass.
  const priceId =
    cycle === "annual" ? STRIPE_PRICES.PACT_ANNUAL : STRIPE_PRICES.PACT_WEEKLY;
  if (!access.pactEntitled && !priceId.startsWith("price_")) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-8 text-center">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[var(--pact-blood)]">
          The Blood Pact
        </p>
        <h1
          className="mb-3 text-[28px] font-light leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Not yet.
        </h1>
        <p className="mb-8 max-w-[280px] text-[14px] font-light leading-relaxed text-[var(--app-muted)]">
          The Pact is not open for signing yet. When the door opens, what
          you sign will bind.
        </p>
        <Link
          href="/app"
          className="rounded-full border border-[var(--app-line)] px-7 py-3 text-[12px] uppercase tracking-[0.16em] text-[var(--app-text)]"
        >
          Back to the app
        </Link>
      </div>
    );
  }

  return (
    <SignCeremony preset={preset} cycle={cycle} entitled={access.pactEntitled} />
  );
}
