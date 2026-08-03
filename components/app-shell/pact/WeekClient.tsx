"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { haptic } from "@/lib/haptics";
import { presetLabel } from "@/lib/pact/presets";

/**
 * The live week: the challenge, the keep, the journal. One screen because
 * it is one act, repeated weekly. The countdown is pressure by information,
 * not animation: a date that gets closer needs no pulsing to be felt.
 *
 * The journal composer holds the privacy line in its layout: the private
 * box is always there; the public box is a separate, clearly-labelled
 * second field that only appears once something private exists. Nothing
 * ever moves from one box to the other.
 */

export interface WeekEntryView {
  status: "open" | "kept" | "scarred";
  journalBody: string | null;
  publicBody: string | null;
  shared: boolean;
  flagged: boolean;
  aiReply: string | null;
}

export default function WeekClient({
  weekNumber,
  endsAtIso,
  preset,
  challenge,
  entry,
}: {
  weekNumber: number;
  endsAtIso: string;
  preset: string;
  challenge: {
    title: string;
    challenge: string;
    journalPrompt: string;
    intensity: number;
  } | null;
  entry: WeekEntryView;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(entry.status);
  const [journal, setJournal] = useState(entry.journalBody ?? "");
  const [publicNote, setPublicNote] = useState(entry.publicBody ?? "");
  const [share, setShare] = useState(entry.shared);
  const [saved, setSaved] = useState(!!entry.journalBody);
  const [crisisCard, setCrisisCard] = useState<string | null>(null);
  const [busy, setBusy] = useState<"keep" | "save" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [justKept, setJustKept] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const msLeft = new Date(endsAtIso).getTime() - now;
  const remaining = useMemo(() => {
    if (msLeft <= 0) return "The week is closing";
    const days = Math.floor(msLeft / 86_400_000);
    const hours = Math.floor((msLeft % 86_400_000) / 3_600_000);
    if (days > 0) return `${days}d ${hours}h left in this week`;
    return `${hours}h left in this week`;
  }, [msLeft]);
  // The last day of an open week is the one place the information itself
  // gets a pulse. Kept weeks have nothing left to be pressed about.
  const closing = status === "open" && msLeft > 0 && msLeft < 86_400_000;

  async function keep() {
    if (busy) return;
    setBusy("keep");
    setError(null);
    try {
      const res = await fetch("/api/pact/keep", { method: "POST" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "That did not go through.");
      } else {
        setStatus("kept");
        setJustKept(true);
        // The haptic lands with the stamp, not with the network.
        window.setTimeout(() => haptic("success"), 350);
        router.refresh();
      }
    } catch {
      setError("That did not go through.");
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    if (busy || !journal.trim()) return;
    setBusy("save");
    setError(null);
    try {
      const res = await fetch("/api/pact/entry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          journalBody: journal,
          publicBody: publicNote,
          share,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        flagged?: boolean;
        card?: string;
      };
      if (!res.ok) {
        setError(data.error || "That did not save. Try again.");
      } else if (data.flagged && data.card) {
        setCrisisCard(data.card);
        setSaved(true);
      } else {
        setSaved(true);
        setSavedFlash(true);
        window.setTimeout(() => setSavedFlash(false), 2100);
        haptic("tick");
      }
    } catch {
      setError("That did not save. Try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--pact-blood)]">
          Week {weekNumber} · {presetLabel(preset)}
        </p>
        <Link
          href="/app/pact/record"
          className="text-app-micro uppercase tracking-app-label text-[var(--app-dim)]"
        >
          The record
        </Link>
      </div>

      <h1
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {challenge ? challenge.title : "This week is being written."}
      </h1>
      <p
        className={
          closing
            ? "pact-breathe mt-1 text-app-caption text-[var(--pact-blood)]"
            : "mt-1 text-app-caption text-[var(--app-dim)]"
        }
      >
        {remaining}
      </p>

      <div className="mt-5 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
        {challenge ? (
          <p className="text-[14px] leading-relaxed">{challenge.challenge}</p>
        ) : (
          <p className="text-[14px] leading-relaxed text-[var(--app-muted)]">
            Your challenge for this week has not been published yet. The week
            still counts, and the journal below is still yours: write what
            you are working on, and keep the week by doing it.
          </p>
        )}

        {status === "kept" ? (
          <div className="mt-4 flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--app-gold-soft)] ${
                justKept ? "pact-mark-in" : ""
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-[var(--app-gold)] [stroke-width:2]"
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  pathLength={1}
                  className={justKept ? "pact-draw" : undefined}
                  style={justKept ? { animationDelay: "150ms" } : undefined}
                />
              </svg>
            </span>
            <p
              className={`text-[13px] uppercase tracking-[0.16em] text-[var(--app-gold)] ${
                justKept ? "app-rise" : ""
              }`}
              style={justKept ? { animationDelay: "350ms" } : undefined}
            >
              Kept. It is on the record.
            </p>
          </div>
        ) : status === "scarred" ? (
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--pact-blood-dried)]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-[var(--pact-blood)] [stroke-width:2]"
                aria-hidden
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  pathLength={1}
                  className="pact-draw"
                  style={{ animationDelay: "200ms", animationDuration: "0.8s" }}
                />
              </svg>
            </span>
            <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--pact-blood)]">
              This week scarred.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={keep}
            disabled={busy === "keep"}
            className="mt-4 w-full rounded-full bg-[var(--pact-blood)] px-5 py-3 text-[12.5px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-50"
          >
            {busy === "keep" ? "One moment" : "I kept it"}
          </button>
        )}
      </div>

      <p className="mt-8 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        The week, written down · private
      </p>
      {challenge?.journalPrompt && (
        <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
          {challenge.journalPrompt}
        </p>
      )}
      <textarea
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
        rows={6}
        maxLength={8000}
        placeholder="Nobody reads this. That is what makes it worth writing."
        className="mt-2 w-full resize-none rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-[14px] leading-relaxed text-[var(--app-text)] outline-none placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)]"
      />

      {crisisCard ? (
        <div className="mt-4 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card-2)] px-4 py-4">
          <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-[var(--app-text)]">
            {crisisCard}
          </p>
        </div>
      ) : (
        saved && (
          <div className="mt-5 rounded-2xl border border-[var(--app-line-soft)] px-4 py-4">
            <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
              Share a line · optional, public
            </p>
            <p className="mt-1 text-app-micro leading-relaxed text-[var(--app-dim)]">
              A separate note for the wall. Your journal stays private
              whatever you write here.
            </p>
            <textarea
              value={publicNote}
              onChange={(e) => setPublicNote(e.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="What would you tell the others about this week?"
              className="mt-2 w-full resize-none rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3.5 py-3 text-[13.5px] leading-relaxed outline-none placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)]"
            />
            <label className="mt-2 flex items-center gap-2.5 text-[12.5px] text-[var(--app-muted)]">
              <input
                type="checkbox"
                checked={share}
                onChange={(e) => setShare(e.target.checked)}
                className="h-4 w-4 accent-[var(--pact-blood)]"
              />
              Put this note on the wall
            </label>
          </div>
        )
      )}

      {error && (
        <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">{error}</p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={busy === "save" || !journal.trim()}
        className="mt-4 w-full rounded-full border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
      >
        {busy === "save" ? "Sealing it" : saved ? "Update the week" : "Save the week"}
      </button>
      {savedFlash && (
        <p
          className="pact-flash mt-2 text-center text-app-micro uppercase tracking-app-label text-[var(--app-gold)]"
          role="status"
        >
          On the record.
        </p>
      )}
    </div>
  );
}
