"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PACT_PRESETS, PACT_PRICING, type PactPresetKey } from "@/lib/pact/presets";
import { haptic } from "@/lib/haptics";

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
  rejoining,
}: {
  entitled: boolean;
  /** They broke a pact before. Changes the voice, not the flow. */
  rejoining: boolean;
}) {
  const router = useRouter();
  const [preset, setPreset] = useState<PactPresetKey | null>(null);
  const [cycle, setCycle] = useState<"weekly" | "annual">("weekly");

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
            onClick={() => {
              setPreset(p.key);
              haptic("tick");
            }}
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
          Your membership already covers the Pact. All that is missing is the
          signature.
        </p>
      )}

      <button
        type="button"
        onClick={proceed}
        disabled={!preset}
        className="relative mt-6 w-full overflow-hidden rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
      >
        {preset && (
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

      <p className="mt-4 text-app-micro leading-relaxed text-[var(--app-dim)]">
        The Pact is a self-improvement practice, not medical care, and no
        substitute for it. If you are working with a doctor or therapist,
        keep working with them.
      </p>
    </div>
  );
}
