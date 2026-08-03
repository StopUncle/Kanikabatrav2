"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignatureView from "./SignatureView";
import type { SignatureStrokes } from "@/lib/pact/signature";
import { haptic } from "@/lib/haptics";

/**
 * The break, made slow on purpose. The screen shows exactly what will be
 * marked broken, in the member's own handwriting where there is one, and
 * requires the word typed. The mirror of the signature: you signed your
 * way in, you write your way out.
 */
export default function BreakClient({
  pactNumber,
  kept,
  scars,
  weekNumber,
  signature,
  goals,
}: {
  pactNumber: number;
  kept: number;
  scars: number;
  weekNumber: number;
  signature: SignatureStrokes | null;
  goals: string[];
}) {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function breakPact() {
    if (word.trim().toLowerCase() !== "break" || busy) return;
    setBusy(true);
    setError(null);
    haptic("fail");
    try {
      const res = await fetch("/api/pact/break", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ confirm: "break" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "That did not go through.");
        setBusy(false);
        return;
      }
      router.push("/app/pact/record");
      router.refresh();
    } catch {
      setError("That did not go through.");
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
        Breaking pact {pactNumber}
      </p>
      <h1
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Look at it first.
      </h1>
      <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
        {kept} {kept === 1 ? "week" : "weeks"} kept, {scars}{" "}
        {scars === 1 ? "scar" : "scars"}, {weekNumber}{" "}
        {weekNumber === 1 ? "week" : "weeks"} in. Breaking it ends the
        billing and seals this record as broken, permanently. The record
        stays visible. A new pact can be signed, but it will always stand
        beside this one.
      </p>

      {goals.length > 0 && (
        <ul className="mt-5 flex flex-col gap-1.5">
          {goals.map((g) => (
            <li
              key={g}
              className="flex gap-2.5 text-[13.5px] leading-snug text-[var(--app-muted)]"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--pact-blood)]" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      )}

      {signature && (
        <div className="mt-5 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-2">
          <SignatureView strokes={signature} />
          <p className="pb-2 text-center text-app-micro uppercase tracking-app-label text-[var(--app-dim)]">
            You signed this, against those
          </p>
        </div>
      )}

      <p className="mt-8 text-app-caption text-[var(--app-muted)]">
        Type <span className="uppercase tracking-[0.2em] text-[var(--pact-blood)]">break</span> to break it.
      </p>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        autoComplete="off"
        autoCapitalize="none"
        className="mt-2 w-full rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-[15px] tracking-[0.2em] outline-none focus:border-[var(--pact-blood)]"
      />

      {error && (
        <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">{error}</p>
      )}

      <button
        type="button"
        onClick={breakPact}
        disabled={word.trim().toLowerCase() !== "break" || busy}
        className="mt-5 w-full rounded-full border border-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--pact-blood)] transition-transform active:scale-[0.97] disabled:opacity-40"
      >
        {busy ? "One moment" : "Break the pact"}
      </button>
      <button
        type="button"
        onClick={() => router.push("/app/pact/week")}
        className="mt-2 w-full py-3 text-[12.5px] text-[var(--app-dim)]"
      >
        Keep it instead
      </button>
    </div>
  );
}
