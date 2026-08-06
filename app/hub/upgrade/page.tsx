import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { PACT_PRICING, PACT_LAUNCHED } from "@/lib/pact/presets";
import { MEMBERSHIP } from "@/lib/constants";
import {
  PACT_OPENS,
  CONSILIUM_ROOMS,
  TRUST_LINE,
} from "@/lib/upgrade/benefits";
import { PageShell, PageHeader } from "@/components/app-shell/ui";

export const metadata = {
  title: "Plans | Consilium",
  description: "The Blood Pact and the Consilium, side by side.",
};

/**
 * The ladder on one page. Two rungs, their prices, and what each opens,
 * with the viewer's own rung named. Deliberately ungated: a member seeing
 * their plan laid out is reassurance; a free account seeing both is the
 * clearest pitch the app can make. Both rungs render from
 * lib/upgrade/benefits, the same source the UpgradeSheet and the marketing
 * JoinPanel read, so no two surfaces can promise different products.
 */

const CONSILIUM_OPENS = [
  ...(PACT_LAUNCHED ? ["Everything the Pact opens, included."] : []),
  ...CONSILIUM_ROOMS,
];

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((line) => (
        <li key={line} className="flex gap-2.5 text-[13px] leading-snug">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--app-gold)]" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[var(--app-gold-soft)] px-2 py-0.5 text-app-micro uppercase tracking-app-wide text-[var(--app-gold-soft)]">
      {label}
    </span>
  );
}

export default async function PlansPage() {
  const userId = await requireServerAuth("/app/upgrade");
  const access = await getAccess(userId);

  const onPact = access.tier === "pact";
  const onConsilium = access.isMember;

  return (
    <PageShell>
      <PageHeader
        title="Two ways in"
        lede="The Pact buys the training. The Consilium buys everything the Pact does, plus Kanika herself."
      />

      {/* The Blood Pact */}
      {PACT_LAUNCHED && (
        <section
          className="mt-6 rounded-[22px] border border-[var(--pact-blood)]/50 px-[18px] py-5"
          style={{
            background:
              "radial-gradient(120% 140% at 80% 0%, rgba(140,31,47,0.18), transparent 55%), linear-gradient(160deg, #1a1012, #0d0b09 70%)",
          }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-app-tiny uppercase tracking-app-label text-[var(--pact-blood)]">
              The Blood Pact
            </p>
            {(onPact || onConsilium) && (
              <PlanBadge label={onPact ? "Your plan" : "Included"} />
            )}
          </div>
          <h2
            className="mt-1.5 text-app-title leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The training, signed for.
          </h2>
          <p className="mt-2 text-[13px] text-[var(--app-dim)]">
            {PACT_PRICING.weeklyDisplay}, or {PACT_PRICING.annualDisplay} (
            {PACT_PRICING.annualSaveLine}).
          </p>
          <BenefitList items={PACT_OPENS} />
          <Link
            href="/app/pact"
            className="mt-5 block w-full rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-center text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)]"
          >
            {onPact || onConsilium ? "Open the Pact" : "See the Pact"}
          </Link>
        </section>
      )}

      {/* The Consilium */}
      <section className="mt-4 rounded-[22px] border border-[var(--app-gold)]/35 bg-[var(--app-gold)]/[0.05] px-[18px] py-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold)]">
            The Consilium
          </p>
          {onConsilium && <PlanBadge label="Your plan" />}
        </div>
        <h2
          className="mt-1.5 text-app-title leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Everything, including Kanika.
        </h2>
        <p className="mt-2 text-[13px] text-[var(--app-dim)]">
          {MEMBERSHIP.priceDisplay} a month, or {MEMBERSHIP.annualDisplay} a
          year. Cancel any time.
        </p>
        <BenefitList items={CONSILIUM_OPENS} />
        {onConsilium ? (
          <Link
            href="/consilium/feed"
            className="mt-5 block w-full rounded-full bg-[var(--app-gold)] px-5 py-3.5 text-center text-[13px] uppercase tracking-[0.16em] text-black"
          >
            Open the Consilium
          </Link>
        ) : (
          <Link
            href="/consilium/apply"
            className="mt-5 block w-full rounded-full bg-[var(--app-gold)] px-5 py-3.5 text-center text-[13px] uppercase tracking-[0.16em] text-black"
          >
            Join the Consilium
          </Link>
        )}
        {!onConsilium && (
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--app-dim)]">
            {TRUST_LINE}
          </p>
        )}
      </section>

      <p className="mt-5 pb-8 text-center text-app-caption text-[var(--app-dim)]">
        Everything you have done on the free tier carries over, whichever
        rung you take.
      </p>
    </PageShell>
  );
}
