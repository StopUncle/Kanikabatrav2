"use client";

import { useState } from "react";
import UpgradeSheet from "./UpgradeSheet";

/**
 * The one place on Today that pitches the membership by invitation
 * rather than by wall. Free accounts only; the caller gates it.
 */
export default function MembershipTodayCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rounded-[18px] border border-[var(--app-gold)]/30 bg-[var(--app-gold)]/[0.05] px-[18px] py-4 text-left transition-transform active:scale-[0.985]"
      >
        <span className="block text-app-tiny uppercase tracking-app-label text-[var(--app-gold)]">
          The membership
        </span>
        <span
          className="mt-1.5 block text-app-title leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The whole thing is already built.
        </span>
        <span className="mt-1.5 block text-app-caption leading-relaxed text-[var(--app-muted)]">
          Every track, the Lab, Kanika&apos;s room, the Mark. See what
          continues.
        </span>
      </button>
      <UpgradeSheet
        open={open}
        trigger="today-card"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
