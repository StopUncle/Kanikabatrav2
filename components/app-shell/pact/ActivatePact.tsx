"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";

/**
 * The activation screen: signed, clock not yet running. One button, one
 * consequence. The challenge preview above it (rendered by the server
 * page) shows what week one asks, so pressing Activate is informed
 * consent rather than a mystery box.
 */
export default function ActivatePact({
  challengeTitle,
}: {
  challengeTitle: string | null;
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "working" | "error">("idle");

  async function activate() {
    if (state === "working") return;
    haptic("select");
    setState("working");
    try {
      const res = await fetch("/api/pact/activate", { method: "POST" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Could not start the week");
      }
      // Server state changed; re-render the page into the live week.
      router.refresh();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-8">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
        The clock is yours to start
      </p>
      <h2
        className="mt-1 text-app-title leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {challengeTitle
          ? `Week one: ${challengeTitle}`
          : "Week one is waiting."}
      </h2>
      <p className="mt-2 text-app-body leading-relaxed text-[var(--app-muted)]">
        The pact is signed. Nothing counts against you yet. The moment you
        activate, seven days start, and the record starts keeping them.
        Start when you mean it.
      </p>
      <button
        type="button"
        onClick={activate}
        disabled={state === "working"}
        className="relative mt-6 w-full overflow-hidden rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-60"
      >
        {state === "working" ? "Starting the clock…" : "Activate week one"}
      </button>
      {state === "error" && (
        <p role="alert" className="mt-3 text-center text-app-caption text-red-400">
          Could not start the week. Try again.
        </p>
      )}
    </div>
  );
}
