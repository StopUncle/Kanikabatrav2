"use client";

import { useState } from "react";
import UpgradeSheet, { type UpgradeOffer } from "./UpgradeSheet";
import type { ViewerTier } from "@/lib/app/nav";

/**
 * The one place on Today that pitches the next rung by invitation rather
 * than by wall. The caller gates it to non-consilium viewers; WHICH rung
 * it pitches depends on where the viewer stands. A free account is sold
 * the Pact (training); a pact subscriber is sold the Consilium (Kanika).
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
      </button>
      <UpgradeSheet
        open={open}
        trigger="today-card"
        offer={offer}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
