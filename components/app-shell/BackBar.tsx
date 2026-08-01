"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { backTargetFor } from "@/lib/app/nav";

/**
 * The global back control. One rule for the whole shell instead of each
 * page hand-rolling its own arrow (only one ever did): a slim sticky row
 * above the content, gone on the tab roots where the bar is the
 * navigation, targeting "up" in the surface map rather than browser
 * history so a deep link or refresh still goes somewhere sensible.
 *
 * Solid background rather than blur: a backdrop-filter over a scrolling
 * list is one of the most expensive paints a phone can be asked for.
 */
export default function BackBar() {
  const pathname = usePathname();
  const target = backTargetFor(pathname);
  if (!target) return null;

  return (
    <div className="sticky top-0 z-30 bg-[var(--app-black)] px-2 pb-0.5 pt-1.5">
      <Link
        href={target}
        aria-label="Back"
        className="inline-flex items-center gap-0.5 rounded-full px-2.5 py-1.5 text-app-caption uppercase tracking-app-wide text-[var(--app-dim)] transition-colors active:bg-[var(--app-card-2)] active:text-[var(--app-text)]"
      >
        <ChevronLeft size={15} strokeWidth={2} aria-hidden />
        Back
      </Link>
    </div>
  );
}
