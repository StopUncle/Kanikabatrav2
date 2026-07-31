"use client";

import { useState } from "react";
import Link from "next/link";
import UpgradeSheet, { type UpgradeTrigger } from "./UpgradeSheet";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

/**
 * The wall as a whole route, for when someone lands on something they do
 * not have rather than bumping into it mid-flow.
 *
 * The sheet used to open over a black void: the gated page returned nothing
 * behind it, so dismissing the pitch left an empty screen. Now the room
 * itself renders, named and honest about what it is, and the sheet sits on
 * top. Dismissing the sheet reveals the room instead of yanking the person
 * somewhere else, and the room's own button brings the pitch back.
 */
export default function UpgradeWall({
  trigger,
  nextChapterTitle,
  surfaceLabel,
  returnHref = "/app/train",
}: {
  trigger: UpgradeTrigger;
  nextChapterTitle?: string | null;
  surfaceLabel?: string | null;
  returnHref?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <PageShell>
        <PageHeader
          title={surfaceLabel ?? "Members"}
          lede="This room is part of the membership."
        />
        <EmptyState
          line={
            surfaceLabel
              ? `${surfaceLabel} opens with the membership.`
              : "This room opens with the membership."
          }
          hint="Everything you have done on the free tier carries over."
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-full bg-[var(--app-gold)] px-5 py-3.5 text-app-body uppercase tracking-app-wide text-[var(--app-on-gold)]"
        >
          See what continues
        </button>
        <Link
          href={returnHref}
          className="mt-2 block w-full py-3 text-center text-app-caption text-[var(--app-dim)]"
        >
          {returnHref === "/app" ? "Back to Today" : "Back"}
        </Link>
      </PageShell>
      <UpgradeSheet
        open={open}
        trigger={trigger}
        nextChapterTitle={nextChapterTitle}
        surfaceLabel={surfaceLabel}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
