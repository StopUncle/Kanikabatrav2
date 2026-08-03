"use client";

import { useEffect, useState } from "react";
import Ceremony from "@/components/app-shell/juice/Ceremony";
import { SIGNATURE_STASH_KEY } from "./SignCeremony";

/**
 * The seal. Plays the app's one big ceremony over a dark screen and, in
 * the background, attaches the stashed signature to the pact the webhook
 * created. The attach retries quietly for a while because Stripe's webhook
 * can land seconds after the redirect; if it never lands, the ceremony
 * still plays and the signature is simply absent from the record, which
 * the record can survive.
 */
export default function SealedCeremony() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Let the dark screen exist for a beat before the veil.
    const t = window.setTimeout(() => setOpen(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const raw = (() => {
      try {
        return window.sessionStorage.getItem(SIGNATURE_STASH_KEY);
      } catch {
        return null;
      }
    })();
    if (!raw) return;

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
      }
    };
    send();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--app-void)]">
      <Ceremony
        open={open}
        onDismiss={() => setOpen(false)}
        eyebrow="The Blood Pact"
        headline="It is signed."
        subline="Week one is already running. The first challenge is waiting, and the record has opened with your name on it."
        voice="Most people never sign anything. Watch what that difference does."
        action={{ label: "Begin week one", href: "/app/pact/week" }}
        haptic="moment"
      />
    </div>
  );
}
