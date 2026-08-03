"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "./SignatureCanvas";
import {
  PACT_GOAL_MAX_CHARS,
  PACT_GOAL_SLOTS,
  presetLabel,
  type PactPresetKey,
} from "@/lib/pact/presets";
import type { SignatureStrokes } from "@/lib/pact/signature";
import { haptic } from "@/lib/haptics";
import { capture } from "@/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

/**
 * The signing, three beats on one dark screen: the oath, ticked line by
 * line; the three goals, written in the member's own words; the hand.
 *
 * The oath is checkboxes rather than prose because a read oath is skimmed
 * and a ticked one is chosen. The goals come before the signature because
 * the pact is signed AGAINST them: they render on the record beside the
 * signature and are set-once, like it.
 *
 * Commitment comes before payment on purpose: by the time Stripe appears,
 * the member has ticked the oath, written the goals, and signed. For the
 * paid path both goals and strokes are stashed in sessionStorage and
 * attached from the sealed page (the Pact row only exists once the webhook
 * lands); the entitled path creates the pact directly with both.
 */

export const SIGNATURE_STASH_KEY = "pact-signature-v1";

const OATH_LINES = [
  "One challenge a week. I will attempt it, not admire it.",
  "I will write the week down honestly, even the ugly ones.",
  "What I mark kept, I kept. The record only means something if I do not lie to it.",
  "If I break this pact, the break stays on the record. I am fine being seen.",
];

export default function SignCeremony({
  preset,
  cycle,
  entitled,
}: {
  preset: PactPresetKey;
  cycle: "weekly" | "annual";
  entitled: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = useState<"oath" | "goals" | "sign">("oath");
  const [ticked, setTicked] = useState<boolean[]>(OATH_LINES.map(() => false));
  const [goals, setGoals] = useState<string[]>(PACT_GOAL_SLOTS.map(() => ""));
  const [strokes, setStrokes] = useState<SignatureStrokes>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allTicked = ticked.every(Boolean);
  const allGoals = goals.every((g) => g.trim().length > 0);

  async function seal() {
    if (strokes.length === 0 || busy) return;
    setBusy(true);
    setError(null);
    haptic("moment");
    const trimmedGoals = goals.map((g) => g.trim());
    try {
      if (entitled) {
        const res = await fetch("/api/pact/sign", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            preset,
            signatureData: strokes,
            goals: trimmedGoals,
          }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setError(data.error || "That did not go through. Try again.");
          setBusy(false);
          return;
        }
        router.push("/app/pact/sealed");
        return;
      }

      // Paid path: stash the hand and the goals, then hand over to Stripe.
      try {
        window.sessionStorage.setItem(
          SIGNATURE_STASH_KEY,
          JSON.stringify({ signatureData: strokes, goals: trimmedGoals }),
        );
      } catch {
        // Storage full or blocked: the pact still signs, just without the
        // drawn signature and goals attached. The record shows the seal.
      }
      capture(ANALYTICS_EVENTS.CHECKOUT_STARTED, {
        product_key: cycle === "annual" ? "PACT_ANNUAL" : "PACT_WEEKLY",
        pact_preset: preset,
      });
      const res = await fetch("/api/pact/subscription/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ billingCycle: cycle, preset }),
      });
      const data = (await res.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || "That did not go through. Try again.");
        setBusy(false);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError("That did not go through. Try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col px-6 pb-10 pt-14">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
        The Blood Pact · {presetLabel(preset)}
      </p>

      {step === "oath" && (
        <>
          <h1
            className="mt-2 text-app-hero font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tick each line you mean.
          </h1>
          <div className="mt-6 flex flex-col gap-3">
            {OATH_LINES.map((line, i) => (
              <label
                key={line}
                className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3.5 text-[14px] leading-relaxed transition-colors ${
                  ticked[i]
                    ? "border-[var(--pact-blood)] bg-[var(--app-card)]"
                    : "border-[var(--app-line-soft)]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={ticked[i]}
                  onChange={(e) => {
                    const next = [...ticked];
                    next[i] = e.target.checked;
                    setTicked(next);
                    if (e.target.checked) haptic("tick");
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--pact-blood)]"
                />
                <span>{line}</span>
              </label>
            ))}
          </div>
          <p className="mt-4 text-app-caption leading-relaxed text-[var(--app-dim)]">
            Challenges are self-reported. Nobody checks. That is the point:
            these boxes and the signature at the end are the only enforcement
            this pact has.
          </p>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => {
                haptic("select");
                setStep("goals");
              }}
              disabled={!allTicked}
              className="w-full rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
            >
              All four are true. Continue
            </button>
            <button
              type="button"
              onClick={() => router.push("/app/pact")}
              className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
            >
              Not yet
            </button>
          </div>
        </>
      )}

      {step === "goals" && (
        <>
          <h1
            className="mt-2 text-app-hero font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What are you signing for?
          </h1>
          <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
            Three goals, in your own words. They go on the record beside your
            signature and they do not change after you sign. Vague goals
            cannot be kept or broken, so write ones that can.
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {PACT_GOAL_SLOTS.map((slot, i) => (
              <div key={slot.key}>
                <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
                  {slot.label}
                </p>
                <p className="mt-0.5 text-app-caption text-[var(--app-muted)]">
                  {slot.frame}
                </p>
                <textarea
                  value={goals[i]}
                  onChange={(e) => {
                    const next = [...goals];
                    next[i] = e.target.value;
                    setGoals(next);
                  }}
                  rows={2}
                  maxLength={PACT_GOAL_MAX_CHARS}
                  placeholder={`e.g. ${slot.suggestion[preset]}`}
                  className="mt-1.5 w-full resize-none rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3 text-[14px] leading-relaxed text-[var(--app-text)] outline-none placeholder:text-[var(--app-dim)] focus:border-[var(--pact-blood)]"
                />
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => {
                haptic("select");
                setStep("sign");
              }}
              disabled={!allGoals}
              className="w-full rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
            >
              These are my goals. Show me where to sign
            </button>
            <button
              type="button"
              onClick={() => setStep("oath")}
              className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
            >
              Back to the oath
            </button>
          </div>
        </>
      )}

      {step === "sign" && (
        <>
          <h1
            className="mt-2 text-app-hero font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sign it in your own hand.
          </h1>
          <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
            Not your typed name. Your hand, your mark, under your three
            goals. This is what the record opens with.
          </p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {goals.map((g, i) => (
              <li
                key={PACT_GOAL_SLOTS[i].key}
                className="flex gap-2.5 text-[13px] leading-snug text-[var(--app-muted)]"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--pact-blood)]" />
                <span>{g.trim()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <SignatureCanvas onChange={setStrokes} />
          </div>
          {error && (
            <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">{error}</p>
          )}
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={seal}
              disabled={strokes.length === 0 || busy}
              className="w-full rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
            >
              {busy
                ? "One moment"
                : entitled
                  ? "Seal the pact"
                  : "Seal it and pay"}
            </button>
            <button
              type="button"
              onClick={() => setStep("goals")}
              className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
            >
              Back to the goals
            </button>
          </div>
        </>
      )}
    </div>
  );
}
