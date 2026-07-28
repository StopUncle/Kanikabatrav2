"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PublicTell } from "@/lib/tells/types";
import { TRACK_LABELS } from "@/lib/tells/types";
import { useTellRun } from "@/lib/tells/use-tell-run";
import { haptic } from "@/lib/haptics";
import Ceremony from "@/components/app-shell/juice/Ceremony";
import TellArtifact from "./TellArtifact";
import TellReveal from "./TellReveal";

/**
 * The Daily Tell in the app shell.
 *
 * Keeps its tab bar, unlike the drill: the reveal is a long scroll and there
 * is no clock, so there is nothing to protect the member from.
 *
 * Everyday juice only. The full ceremony fires for a streak milestone or a
 * rank-up and nothing else, because the drill already owns the daily moment
 * and two ceremonies a day is one too many.
 */

const MILESTONE_DAYS = new Set([7, 30, 100]);

export default function TellScreen({ tell }: { tell: PublicTell }) {
  const router = useRouter();
  const run = useTellRun(tell);
  const [ceremony, setCeremony] = useState<"rank" | "streak" | null>(null);
  const [checked, setChecked] = useState(false);

  const rangUp = run.outcome?.standing?.rangUp ?? null;
  const streakDays = run.outcome?.streak?.currentDays ?? 0;
  const milestone =
    Boolean(run.outcome?.countedStreak) && MILESTONE_DAYS.has(streakDays);

  useEffect(() => {
    if (run.phase !== "revealed" || checked) return;
    setChecked(true);
    // A rank is the bigger event, so it wins if somehow both land at once.
    if (rangUp) setCeremony("rank");
    else if (milestone) setCeremony("streak");
  }, [run.phase, checked, rangUp, milestone]);

  useEffect(() => {
    if (run.phase !== "revealed" || !run.outcome) return;
    haptic(run.outcome.correct ? "success" : "fail");
  }, [run.phase, run.outcome]);

  return (
    <div className="px-5 pb-8 pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-gold-soft)]">
            Daily tell
          </p>
          <h1
            className="mt-1 text-[26px] font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TRACK_LABELS[tell.track] ?? "Read the moment"}
          </h1>
        </div>
        <Link
          href="/app/train"
          aria-label="Back to Train"
          className="mt-1 text-[var(--app-dim)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
      </div>

      <div className="mt-6">
        <TellArtifact artifact={tell.artifact} />
      </div>

      <p
        className="mt-7 text-[18px] leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {tell.question}
      </p>

      {run.phase === "restoring" ? (
        <p className="mt-5 text-[12.5px] text-[var(--app-dim)]">Loading...</p>
      ) : run.phase === "asking" ? (
        <>
          <div className="mt-4 flex flex-col gap-2.5">
            {tell.choices.map((c) => (
              <button
                key={c.id}
                type="button"
                disabled={run.submitting}
                onClick={() => {
                  haptic("select");
                  run.pick(c.id);
                }}
                className={`rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4 text-left text-[14px] leading-snug transition-transform active:scale-[0.985] disabled:opacity-60 ${
                  run.pickedId === c.id ? "border-[var(--app-gold)]" : ""
                }`}
              >
                {c.text}
              </button>
            ))}
          </div>
          {run.error && (
            <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">
              {run.error}
            </p>
          )}
        </>
      ) : (
        <TellReveal
          tell={tell}
          reveal={run.reveal}
          outcome={run.outcome}
          pickedId={run.pickedId}
        />
      )}

      <Ceremony
        open={ceremony === "rank"}
        onDismiss={() => setCeremony(null)}
        eyebrow="You moved inward"
        headline={rangUp?.ringName ?? ""}
        subline="A new rank. Standing carried you here."
        voice="Most people never get past the door."
        action={{
          label: "See what opened",
          onClick: () => router.push("/app/you"),
        }}
        secondary={{ label: "Later" }}
      />

      <Ceremony
        open={ceremony === "streak"}
        onDismiss={() => setCeremony(null)}
        eyebrow="Unbroken"
        headline={`${streakDays} days`}
        subline="You have not missed once."
        voice="Consistency is the only thing that separates the people who change from the people who read about changing."
        action={{ label: "Good" }}
      />
    </div>
  );
}
