"use client";

import { useState } from "react";
import Link from "next/link";
import UpgradeSheet, { type UpgradeOffer } from "./UpgradeSheet";
import type { ViewerTier } from "@/lib/app/nav";
import { PACT_PRICING } from "@/lib/pact/presets";
import { MEMBERSHIP } from "@/lib/constants";

/**
 * The one place on Today that pitches the next rung by invitation rather
 * than by wall. The caller gates it to non-consilium viewers; WHICH rung
 * it pitches depends on where the viewer stands. A free account is sold
 * the Pact (training); a pact subscriber is sold the Consilium (Kanika).
 *
 * The price is on the card, not one tap deeper: hiding it behind the
 * sheet read as evasive, and a visitor who will not pay $29 is not made
 * more likely to by discovering the number later. The compare link is a
 * sibling of the card, not a child, because the card is a button and a
 * link cannot legally nest inside it.
 */
export default function MembershipTodayCard({
  viewerTier,
}: {
  viewerTier: ViewerTier;
}) {
  const [open, setOpen] = useState(false);
  const offer: UpgradeOffer = viewerTier === "pact" ? "consilium" : "pact";
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rounded-[18px] border border-[var(--app-gold)]/30 bg-[var(--app-gold)]/[0.05] px-[18px] py-4 text-left transition-transform active:scale-[0.985]"
      >
        <span className="block text-app-tiny uppercase tracking-app-label text-[var(--app-gold)]">
          {offer === "pact" ? "The Blood Pact" : "The Consilium"}
        </span>
        <span
          className="mt-1.5 block text-app-title leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {offer === "pact"
            ? "The whole thing is already built."
            : "Kanika's rooms are open."}
        </span>
        <span className="mt-1.5 block text-app-caption leading-relaxed text-[var(--app-muted)]">
          {offer === "pact"
            ? "Every track, the Lab, the Mark, the whole climb. See what continues."
            : "The feed, Ask Kanika, voice notes, videos, the book at member price. See what is inside."}
        </span>
        <span className="mt-2 block text-[12.5px] text-[var(--app-dim)]">
          {offer === "pact"
            ? `${PACT_PRICING.weeklyDisplay}, or ${PACT_PRICING.annualDisplay}.`
            : `${MEMBERSHIP.priceDisplay} a month, or ${MEMBERSHIP.annualDisplay} a year.`}
        </span>
      </button>
      <Link
        href="/app/upgrade"
        className="mt-2 block w-full py-1.5 text-center text-[12px] text-[var(--app-gold-soft)]"
      >
        Compare both plans
      </Link>
      <UpgradeSheet
        open={open}
        trigger="today-card"
        offer={offer}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
