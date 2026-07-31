"use client";

import { useEffect, useState } from "react";
import { MEMBERSHIP } from "@/lib/constants";
import { capture } from "@/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

/**
 * The wall, as a bottom sheet in the app skin.
 *
 * One sheet, three entry points. Each passes its trigger so the funnel can
 * tell which moment actually converts, and so the opening line can name the
 * specific thing that continues rather than a generic pitch.
 *
 * The rule the copy follows: name what CONTINUES, never what is withheld.
 * "Chapter 2 is written" is an invitation; "you cannot access chapter 2" is
 * a refusal, and a refusal at the exact moment someone is enjoying
 * themselves is the fastest way to end the session. Nothing here claims an
 * outcome either. Skills, never results.
 */

export type UpgradeTrigger =
  /** They finished the last free chapter. The primary trigger. */
  | "chapter-end"
  /** Standing hit the free ceiling and stopped moving. */
  | "standing-frozen"
  /** The Mark named that a blind spot exists. */
  | "mark-verdict"
  /** A locked tab or More row was tapped, or a member-only URL was opened. */
  | "locked-nav";

type Props = {
  open: boolean;
  onClose: () => void;
  trigger: UpgradeTrigger;
  /**
   * The next chapter's title, when the trigger knows it. Naming it is the
   * whole point of the chapter-end wall, so the generic line is a fallback
   * rather than the default.
   */
  nextChapterTitle?: string | null;
  /** The locked surface's label, when the trigger is locked-nav. */
  surfaceLabel?: string | null;
};

function headlineFor(
  trigger: UpgradeTrigger,
  next?: string | null,
  surface?: string | null,
): string {
  if (trigger === "chapter-end") {
    return next ? `${next} is already written.` : "The next chapter is already written.";
  }
  if (trigger === "standing-frozen") return "Your standing stops here.";
  if (trigger === "locked-nav") {
    return surface ? `${surface} is open inside.` : "That room is open inside.";
  }
  return "The read goes further than this.";
}

function sublineFor(trigger: UpgradeTrigger): string {
  if (trigger === "chapter-end") {
    return "You have finished the part everyone gets. The climb keeps going from here.";
  }
  if (trigger === "standing-frozen") {
    return "Analyst is as far as the free tier counts. The ranks above it keep moving.";
  }
  if (trigger === "locked-nav") {
    return "Everything on this bar unlocks with one membership. Pick up where the free tier stops.";
  }
  return "The verdict names that a blind spot is there. Inside, it is named and drilled.";
}

/** What continues. Never a list of what is missing. */
const CONTINUES = [
  "Every chapter of every track, not just the first.",
  "The Room: say it in your own words, and find out what that costs you.",
  "The 12 Week Transformation, included.",
  "Kanika: the voice notes, the answers, the feed.",
];

export default function UpgradeSheet({
  open,
  onClose,
  trigger,
  nextChapterTitle,
  surfaceLabel,
}: Props) {
  const [cycle, setCycle] = useState<"annual" | "monthly">("annual");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Report the wall once per opening, with the trigger that caused it. This
  // is the number the free tier is judged on: which moment converts.
  useEffect(() => {
    if (!open) return;
    capture(ANALYTICS_EVENTS.WALL_SHOWN, { trigger });
  }, [open, trigger]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function start() {
    setBusy(true);
    setError(null);
    capture(ANALYTICS_EVENTS.UPGRADE_STARTED, { trigger, billing_cycle: cycle });
    try {
      const res = await fetch("/api/consilium/subscription/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ billingCycle: cycle }),
      });
      const data = (await res.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.checkoutUrl) {
        // Stay on the sheet and say so. Bouncing someone out of the app at
        // the moment they tried to pay is worse than the error itself.
        setError(data.error || "That did not go through. Try again in a moment.");
        setBusy(false);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError("That did not go through. Try again in a moment.");
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Join the Consilium"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[88dvh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl border-t border-[var(--app-line)] bg-[var(--app-card-2)] pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
        <div className="sticky top-0 flex items-center justify-center bg-[var(--app-card-2)] px-5 pb-2 pt-4">
          <span className="h-1 w-10 rounded-full bg-[var(--app-dim)] opacity-50" />
        </div>

        <div className="px-5 pt-3">
          <p className="text-[10.5px] uppercase tracking-[0.26em] text-[var(--app-gold)]">
            The Consilium
          </p>
          <h2
            className="mt-2 text-[24px] leading-[1.15]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {headlineFor(trigger, nextChapterTitle, surfaceLabel)}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            {sublineFor(trigger)}
          </p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {CONTINUES.map((line) => (
              <li key={line} className="flex gap-2.5 text-[13px] leading-snug">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--app-gold)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          {/* Annual first and pre-selected, monthly beneath it. */}
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setCycle("annual")}
              aria-pressed={cycle === "annual"}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left ${
                cycle === "annual"
                  ? "border-[var(--app-gold)] bg-[var(--app-card)]"
                  : "border-[var(--app-line-soft)]"
              }`}
            >
              <span>
                <span className="block text-[14px]">{MEMBERSHIP.annual}</span>
                <span className="mt-0.5 block text-[11.5px] text-[var(--app-dim)]">
                  {MEMBERSHIP.annualPerMonthDisplay} a month, {MEMBERSHIP.monthsFreeOnAnnual} months free
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--app-gold)]">
                Best
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCycle("monthly")}
              aria-pressed={cycle === "monthly"}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left ${
                cycle === "monthly"
                  ? "border-[var(--app-gold)] bg-[var(--app-card)]"
                  : "border-[var(--app-line-soft)]"
              }`}
            >
              <span className="text-[14px]">{MEMBERSHIP.monthly}</span>
              <span className="text-[11.5px] text-[var(--app-dim)]">Cancel anytime</span>
            </button>
          </div>

          {error && (
            <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">{error}</p>
          )}

          <button
            type="button"
            onClick={start}
            disabled={busy}
            className="mt-5 w-full rounded-full bg-[var(--app-gold)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-black disabled:opacity-60"
          >
            {busy ? "One moment" : "Continue the climb"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
