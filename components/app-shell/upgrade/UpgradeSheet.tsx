"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PACT_LAUNCHED, PACT_PRICING } from "@/lib/pact/presets";
import { capture } from "@/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

/**
 * The wall, as a bottom sheet in the app skin.
 *
 * One sheet, several entry points. Each passes its trigger so the funnel can
 * tell which moment actually converts, and so the opening line can name the
 * specific thing that continues rather than a generic pitch.
 *
 * The rule the copy follows: name what CONTINUES, never what is withheld.
 * "Chapter 2 is written" is an invitation; "you cannot access chapter 2" is
 * a refusal, and a refusal at the exact moment someone is enjoying
 * themselves is the fastest way to end the session. Nothing here claims an
 * outcome either. Skills, never results.
 *
 * Since the Blood Pact became the app's paid tier, this sheet does not run
 * checkout. The Pact is signed, not bought: preset, oath, signature, then
 * payment, and that ceremony lives at /app/pact. The sheet's job is to name
 * the moment and hand the member to the door. Billing-cycle choice and the
 * dunning path live on the door page with the rest of the flow.
 */

export type UpgradeTrigger =
  /** They finished the last free chapter. The primary trigger. */
  | "chapter-end"
  /** Standing hit the free ceiling and stopped moving. */
  | "standing-frozen"
  /** A locked tab or More row was tapped, or a member-only URL was opened. */
  | "locked-nav"
  /** The standing membership card on Today, opened by choice, not a wall. */
  | "today-card"
  /** The Gauntlet chip on a scenario intro, tapped by a free account. */
  | "gauntlet";
// A "mark-verdict" trigger was written and never fired: the Measure is
// fully walled for free accounts, so no honest moment exists. Its home,
// if one ever ships, is a free Baseline reveal.

/**
 * Which rung of the ladder this wall sells. The Pact buys TRAINING (the
 * catalog, the Lab, the Mark, the program); the Consilium buys everything
 * the Pact does plus Kanika herself. A wall in front of a training surface
 * offers the Pact; a wall in front of one of Kanika's rooms offers the
 * membership, whoever is looking at it. The two must never promise each
 * other's goods: a Kanika promise on the Pact door is exactly the
 * arbitrage that would hollow out the $29 base.
 */
export type UpgradeOffer = "pact" | "consilium";

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
  /** Which rung to sell. Defaults to the Pact while it is launched. */
  offer?: UpgradeOffer;
};

function headlineFor(
  offer: UpgradeOffer,
  trigger: UpgradeTrigger,
  next?: string | null,
  surface?: string | null,
): string {
  if (trigger === "chapter-end") {
    return next ? `${next} is already written.` : "The next chapter is already written.";
  }
  if (trigger === "standing-frozen") return "Your standing stops here.";
  if (trigger === "today-card") {
    // Offer-aware: a pact subscriber reaches this from a card that says
    // "Kanika's rooms are open", and the headline must not answer with
    // the pact pitch they already bought.
    return offer === "consilium"
      ? "The whole of it, including Kanika."
      : "The whole thing is already built.";
  }
  if (trigger === "gauntlet") return "The Gauntlet plays for keeps.";
  if (offer === "consilium") {
    return surface ? `${surface} is Kanika's room.` : "That room is Kanika's.";
  }
  return surface ? `${surface} is open inside.` : "That room is open inside.";
}

function sublineFor(offer: UpgradeOffer, trigger: UpgradeTrigger): string {
  if (trigger === "chapter-end") {
    return "You have finished the part everyone gets. The climb keeps going from here.";
  }
  if (trigger === "standing-frozen") {
    return "Analyst is as far as the free tier counts. The ranks above it keep moving.";
  }
  if (trigger === "today-card") {
    return offer === "pact"
      ? "Every track, the Lab, the Mark, the whole climb. The Pact opens all of it."
      : "Every track, the Lab, Kanika's room, the Mark. Membership opens all of it.";
  }
  if (trigger === "gauntlet") {
    return offer === "pact"
      ? "You write your own moves. No options, no reads, a clock running, and bonus pay for holding your nerve. Pact only."
      : "You write your own moves. No options, no reads, a clock running, and bonus pay for holding your nerve. Members only.";
  }
  return offer === "pact"
    ? "Everything on this bar unlocks when you sign. Pick up where the free tier stops."
    : "Her rooms open with the membership, and the Pact comes included.";
}

/** What continues. Never a list of what is missing. */
function continuesFor(offer: UpgradeOffer): string[] {
  if (offer === "pact" && PACT_LAUNCHED) {
    return [
      "One challenge a week, on your track, and a record that never forgets.",
      "Every chapter of every track, not just the first.",
      "The Room: say it in your own words, and find out what that costs you.",
      "The Mark: your reads, measured, and a record that holds you to them.",
    ];
  }
  return [
    "The feed: her posts, drops, and prompts, every morning.",
    "Ask Kanika: one question a day, answered by voice or video.",
    "Voice notes and videos, for members only.",
    "The book at $9.99 instead of $24.99.",
    ...(PACT_LAUNCHED ? ["And the Blood Pact, included."] : []),
  ];
}

export default function UpgradeSheet({
  open,
  onClose,
  trigger,
  nextChapterTitle,
  surfaceLabel,
  offer: offerProp,
}: Props) {
  const router = useRouter();
  // While the Pact is dark there is only one product to sell, whatever the
  // caller asked for.
  const offer: UpgradeOffer = PACT_LAUNCHED
    ? (offerProp ?? "pact")
    : "consilium";

  // Report the wall once per opening, with the trigger that caused it. This
  // is the number the free tier is judged on: which moment converts.
  useEffect(() => {
    if (!open) return;
    capture(ANALYTICS_EVENTS.WALL_SHOWN, { trigger, offer });
  }, [open, trigger, offer]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function goToDoor() {
    // Each rung has its own door: the Pact's ceremony page, or the
    // Consilium's one-click join.
    const path = offer === "pact" ? "/app/pact" : "/consilium/apply";
    capture(ANALYTICS_EVENTS.UPGRADE_STARTED, {
      trigger,
      path: offer === "pact" ? "pact-door" : "consilium-apply",
    });
    onClose();
    router.push(path);
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={offer === "pact" ? "The Blood Pact" : "The Consilium"}
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
            {offer === "pact" ? "The Blood Pact" : "The Consilium"}
          </p>
          <h2
            className="mt-2 text-[24px] leading-[1.15]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {headlineFor(offer, trigger, nextChapterTitle, surfaceLabel)}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            {sublineFor(offer, trigger)}
          </p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {continuesFor(offer).map((line) => (
              <li key={line} className="flex gap-2.5 text-[13px] leading-snug">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--app-gold)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[12.5px] text-[var(--app-dim)]">
            {offer === "pact"
              ? `${PACT_PRICING.weeklyDisplay}, or ${PACT_PRICING.annualDisplay}. Signed, not subscribed: it starts with your name.`
              : "$29 a month. Cancel any time."}
          </p>

          <button
            type="button"
            onClick={goToDoor}
            className="mt-5 w-full rounded-full bg-[var(--app-gold)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-black"
          >
            {offer === "pact" ? "See the Pact" : "Join the Consilium"}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/app/upgrade");
            }}
            className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-gold-soft)]"
          >
            Compare both plans
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-1 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
