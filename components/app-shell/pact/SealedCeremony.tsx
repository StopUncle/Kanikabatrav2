"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Ceremony from "@/components/app-shell/juice/Ceremony";
import BloodVeil from "./BloodVeil";
import SignatureView from "./SignatureView";
import type { SignatureStrokes } from "@/lib/pact/signature";
import { SIGNATURE_STASH_KEY } from "./SignCeremony";

/**
 * The seal: the app's heaviest moment, three layers deep. The blood veil
 * drifts behind everything, the headline arrives letter by letter, and the
 * member's own signature replays itself wet inside the card. In the
 * background the stashed signature and goals attach to the pact the
 * webhook created; the attach retries quietly because Stripe's webhook can
 * land seconds after the redirect. If it never lands, the ceremony still
 * plays and the signature is simply absent from the record, which the
 * record can survive.
 */

const HEADLINE = "It is signed.";

function StaggeredHeadline() {
  return (
    <span aria-label={HEADLINE}>
      {HEADLINE.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="app-rise inline-block"
          style={{ animationDelay: `${850 + i * 45}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function readStash(): { raw: string | null; strokes: SignatureStrokes | null } {
  try {
    const raw = window.sessionStorage.getItem(SIGNATURE_STASH_KEY);
    if (!raw) return { raw: null, strokes: null };
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return { raw, strokes: parsed as SignatureStrokes };
    }
    const bag = parsed as { signatureData?: unknown };
    return {
      raw,
      strokes: Array.isArray(bag.signatureData)
        ? (bag.signatureData as SignatureStrokes)
        : null,
    };
  } catch {
    return { raw: null, strokes: null };
  }
}

export default function SealedCeremony() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Read the stash once, during first render, BEFORE the attach loop can
  // remove it: the strokes feed the replay even after the attach succeeds.
  const [stash] = useState(readStash);

  useEffect(() => {
    // Let the dark screen exist for a beat before the veil.
    const t = window.setTimeout(() => setOpen(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!stash.raw) return;
    const raw = stash.raw;

    let cancelled = false;
    let attempt = 0;
    const send = async () => {
      attempt += 1;
      try {
        // The stash is { signatureData, goals }; an older stash was the
        // bare strokes array. Send whichever shape we find.
        const parsed = JSON.parse(raw) as unknown;
        const payload = Array.isArray(parsed)
          ? { signatureData: parsed }
          : (parsed as Record<string, unknown>);
        const res = await fetch("/api/pact/signature", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          try {
            window.sessionStorage.removeItem(SIGNATURE_STASH_KEY);
          } catch {
            /* fine */
          }
          return;
        }
      } catch {
        /* retry below */
      }
      if (!cancelled && attempt < 6) {
        window.setTimeout(send, attempt * 2000);
        return;
      }
      // Out of attempts: drop the stash. Left behind, it would attach
      // THIS pact's signature and goals to whatever pact is open the
      // next time this tab session sees the sealed screen.
      if (!cancelled) {
        try {
          window.sessionStorage.removeItem(SIGNATURE_STASH_KEY);
        } catch {
          /* fine */
        }
      }
    };
    send();
    return () => {
      cancelled = true;
    };
  }, [stash.raw]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--app-void)]">
      <Ceremony
        open={open}
        // A dismissal (Escape, backdrop tap) used to just close the
        // overlay, leaving a bare void with no tab bar on a full-screen
        // route. Every exit from the seal leads to the week.
        onDismiss={() => router.push("/app/pact/week")}
        backdrop={<BloodVeil />}
        eyebrow="The Blood Pact"
        headline={<StaggeredHeadline />}
        // Activation-honest: the clock does not run until they press
        // Activate on the week screen, and the old copy promised a week
        // that the very next screen said had not started.
        subline="The record has opened with your name on it. The clock starts when you do."
        voice="Most people never sign anything. Watch what that difference does."
        action={{ label: "Open week one", href: "/app/pact/week" }}
        haptic="moment"
      >
        {stash.strokes && stash.strokes.length > 0 && (
          <SignatureView
            strokes={stash.strokes}
            animate
            delayMs={1000}
            className="h-[72px]"
          />
        )}
      </Ceremony>
    </div>
  );
}
