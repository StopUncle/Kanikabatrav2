"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PACT_PRESETS, PACT_PRICING, type PactPresetKey } from "@/lib/pact/presets";
import { haptic } from "@/lib/haptics";
import { capture } from "@/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

/**
 * The door. Everything before the oath: what the Pact is, which track, and
 * which billing shape. The CTA carries both choices into /app/pact/sign as
 * query params so the ceremony page owns nothing but the ceremony.
 *
 * Entitled accounts (active Consilium; the Pact is included in their
 * membership) see no pricing at all: their door is the track choice and
 * the signing.
 */
export default function PactDoor({
  entitled,
  isMember,
  rejoining,
  checkoutOpen,
}: {
  entitled: boolean;
  /** Consilium member (entitlement via membership) vs a pact subscriber
   *  whose billing period is still live after breaking a pact. The line
   *  under the tracks must not tell the second group they have a
   *  membership they never bought. */
  isMember: boolean;
  /** They broke a pact before. Changes the voice, not the flow. */
  rejoining: boolean;
  /** Stripe has the two Pact prices, so the ceremony can end in a payment. */
  checkoutOpen: boolean;
}) {
  const router = useRouter();
  const [preset, setPreset] = useState<PactPresetKey | null>(null);
  const [cycle, setCycle] = useState<"weekly" | "annual">("weekly");

  // Top of the paid funnel. Once per mount, and carrying the shape of the
  // door the viewer actually saw: a rejoining member and a first-timer
  // read different copy, and a closed checkout is a different offer.
  const reportedView = useRef(false);
  useEffect(() => {
    if (reportedView.current) return;
    reportedView.current = true;
    capture(ANALYTICS_EVENTS.PACT_DOOR_VIEWED, {
      entitled,
      is_member: isMember,
      rejoining,
      checkout_open: checkoutOpen,
    });
  }, [entitled, isMember, rejoining, checkoutOpen]);

  // The first track tap only. Changing your mind is not new intent, and
  // counting it would inflate the step against the door above it.
  const reportedPick = useRef(false);
  const pickTrack = (key: PactPresetKey) => {
    setPreset(key);
    haptic("tick");
    if (!reportedPick.current) {
      reportedPick.current = true;
      capture(ANALYTICS_EVENTS.PACT_TRACK_PICKED, { pact_preset: key });
    }
  };

  const proceed = () => {
    if (!preset) return;
    haptic("select");
    const params = new URLSearchParams({ preset, cycle });
    router.push(`/app/pact/sign?${params.toString()}`);
  };

  return (
    <div>
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
        {rejoining ? "The pact, again" : "The Blood Pact"}
      </p>
      <h1
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {rejoining
          ? "The record remembers. Sign anyway."
          : "All the benefits of psychopathy, and none of the liabilities."}
      </h1>
      {!rejoining && (
        <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-[var(--app-gold)]">
          For those committed to ruthless transformation.
        </p>
      )}
      <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
        One challenge a week, on the track you choose. A private journal. A
        record that never forgets, kept weeks and broken ones alike. You sign
        it in your own hand, and the signature is a promise to be honest with
        it.
      </p>

      <p className="mt-6 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        Choose your track
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {PACT_PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => pickTrack(p.key)}
            aria-pressed={preset === p.key}
            className={`rounded-2xl border px-4 py-3.5 text-left transition-colors ${
              preset === p.key
                ? "border-[var(--pact-blood)] bg-[var(--app-card)]"
                : "border-[var(--app-line-soft)]"
            }`}
          >
            <span className="block text-[14px]">{p.label}</span>
            <span className="mt-0.5 block text-[12px] leading-snug text-[var(--app-muted)]">
              {p.line}
            </span>
          </button>
        ))}
      </div>

      {!entitled && (
        <>
          <p className="mt-6 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
            The terms
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setCycle("weekly")}
              aria-pressed={cycle === "weekly"}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left ${
                cycle === "weekly"
                  ? "border-[var(--pact-blood)] bg-[var(--app-card)]"
                  : "border-[var(--app-line-soft)]"
              }`}
            >
              <span className="text-[14px]">{PACT_PRICING.weeklyDisplay}</span>
              <span className="text-[11.5px] text-[var(--app-dim)]">
                Week by week
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCycle("annual")}
              aria-pressed={cycle === "annual"}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left ${
                cycle === "annual"
                  ? "border-[var(--pact-blood)] bg-[var(--app-card)]"
                  : "border-[var(--app-line-soft)]"
              }`}
            >
              <span>
                <span className="block text-[14px]">{PACT_PRICING.annualDisplay}</span>
                <span className="mt-0.5 block text-[11.5px] text-[var(--app-dim)]">
                  {PACT_PRICING.annualSaveLine}
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--app-gold)]">
                The commitment
              </span>
            </button>
          </div>
        </>
      )}

      {entitled && (
        <p className="mt-6 text-app-caption leading-relaxed text-[var(--app-dim)]">
          {isMember
            ? "Your membership already covers the Pact. All that is missing is the signature."
            : "Your subscription already covers the Pact. All that is missing is the signature."}
        </p>
      )}

      {/* The CTA needs a track before it can go anywhere, and until 2026-08-05
          it just sat there disabled at 40% of a filled burgundy pill: still
          the biggest, reddest thing on the screen, so it read as the button
          you press rather than as one that is waiting for you. The first tap
          on the app's only paid product did nothing and said nothing.
          Now the waiting state is drawn as an outline, and the reason sits
          under it where it is read before the tap rather than after. */}
      <button
        type="button"
        onClick={proceed}
        disabled={!preset || !checkoutOpen}
        aria-describedby={
          !checkoutOpen ? "pact-cta-closed" : preset ? undefined : "pact-cta-hint"
        }
        className={`relative mt-6 w-full overflow-hidden rounded-full px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] transition-transform ${
          preset && checkoutOpen
            ? "bg-[var(--pact-blood)] text-[var(--app-text)] active:scale-[0.97]"
            : "border border-[var(--app-line)] bg-transparent text-[var(--app-dim)]"
        }`}
      >
        {preset && checkoutOpen && (
          <span
            aria-hidden
            className="pact-shimmer pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 42%, rgba(255, 235, 220, 0.16) 50%, transparent 58%)",
            }}
          />
        )}
        {rejoining ? "Sign a new pact" : "Make the blood pact"}
      </button>

      {/* Closed beats broken. Until the two Stripe prices exist the ceremony
          ends in a 503, and it ends there AFTER the oath and the signature.
          Say it at the door instead. */}
      {!checkoutOpen ? (
        <p
          id="pact-cta-closed"
          className="mt-2.5 text-center text-app-caption leading-relaxed text-[var(--app-dim)]"
        >
          The Pact opens shortly. Nothing to do yet.
        </p>
      ) : (
        !preset && (
          <p
            id="pact-cta-hint"
            className="mt-2.5 text-center text-app-caption text-[var(--app-dim)]"
          >
            Pick one of the three tracks above first.
          </p>
        )
      )}

      <p className="mt-4 text-app-micro leading-relaxed text-[var(--app-dim)]">
        The Pact is a self-improvement practice, not medical care, and no
        substitute for it. If you are working with a doctor or therapist,
        keep working with them.
      </p>
    </div>
  );
}
