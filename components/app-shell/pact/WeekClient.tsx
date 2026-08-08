"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { haptic } from "@/lib/haptics";
import { presetLabel } from "@/lib/pact/presets";
import WeekOutcome from "./WeekOutcome";

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
  /** The shared note's own post on the feed, when it has one. */
  feedPostId: string | null;
  sharedAnonymously: boolean;
  /** 1-10 on the CHALLENGE, not the member. Null until they rate it. */
  difficulty: number | null;
  /** They owned the miss rather than letting the week lapse. */
  claimed: boolean;
  missReason: string | null;
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
    readingLabel: string | null;
    readingWhy: string | null;
    voiceNoteUrl: string | null;
  } | null;
  entry: WeekEntryView;
}) {
  const [status, setStatus] = useState(entry.status);
  const [journal, setJournal] = useState(entry.journalBody ?? "");
  const [publicNote, setPublicNote] = useState(entry.publicBody ?? "");
  const [share, setShare] = useState(entry.shared);
  const [anonymous, setAnonymous] = useState(entry.sharedAnonymously);
  const [feedPostId, setFeedPostId] = useState(entry.feedPostId);
  const [saved, setSaved] = useState(!!entry.journalBody);
  // A written week rests in its saved view; the composer is something you
  // step back into on purpose, not the default state of the page.
  const [editing, setEditing] = useState(!entry.journalBody);
  const [crisisCard, setCrisisCard] = useState<string | null>(null);
  const [busy, setBusy] = useState<"keep" | "save" | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Clock starts on mount: seeding Date.now() into the SSR HTML made the
  // server's countdown string race the client's across hour boundaries.
  const [now, setNow] = useState<number | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const msLeft = now === null ? null : new Date(endsAtIso).getTime() - now;
  const remaining = useMemo(() => {
    if (msLeft === null) return " ";
    if (msLeft <= 0) return "The week is closing";
    const days = Math.floor(msLeft / 86_400_000);
    const hours = Math.floor((msLeft % 86_400_000) / 3_600_000);
    if (days > 0) return `${days}d ${hours}h left in this week`;
    return `${hours}h left in this week`;
  }, [msLeft]);
  // The last day of an open week is the one place the information itself
  // gets a pulse. Kept weeks have nothing left to be pressed about.
  const closing =
    status === "open" && msLeft !== null && msLeft > 0 && msLeft < 86_400_000;
  // Past the deadline the entry route refuses writes (409): the composer
  // seals rather than offering a save that can only fail. Scarred weeks
  // are closed by definition, whatever the clock says.
  const composerLocked =
    status === "scarred" || (msLeft !== null && msLeft <= 0);

  // Keeping, undoing a keep, owning a miss and rating the week all moved
  // to WeekOutcome, which owns that whole decision and its states. This
  // component keeps the challenge, the clock and the journal.

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
          anonymous,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        flagged?: boolean;
        card?: string;
        feedPostId?: string | null;
      };
      if (!res.ok) {
        setError(data.error || "That did not save. Try again.");
      } else if (data.flagged && data.card) {
        setCrisisCard(data.card);
        setSaved(true);
        setEditing(false);
        // The server suppressed the share and deleted any posted note;
        // mirror that here so the saved view never claims a note is on
        // the feed, or links a post that no longer exists.
        setShare(false);
        setFeedPostId(null);
      } else {
        setSaved(true);
        setEditing(false);
        setJustSaved(true);
        setFeedPostId(data.feedPostId ?? null);
        window.setTimeout(() => setJustSaved(false), 2600);
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

      {/* The ritual order: her voice opens the week, the reading arms it,
          the challenge closes it. Both rows vanish cleanly when unset. */}
      {challenge?.voiceNoteUrl && (
        <div className="mt-4 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5">
          <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
            Kanika, on this week
          </p>
          <audio
            controls
            preload="none"
            src={challenge.voiceNoteUrl}
            className="mt-2 w-full"
          />
        </div>
      )}

      {challenge?.readingLabel && (
        <Link
          href="/app/book"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5"
        >
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-[18px] w-[18px] shrink-0 fill-none stroke-[var(--app-gold)] [stroke-width:1.6]"
            aria-hidden
          >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
          </svg>
          <span>
            <span className="block text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
              This week&apos;s reading
            </span>
            <span className="mt-0.5 block text-[13.5px] text-[var(--app-text)]">
              {challenge.readingLabel}
            </span>
            {challenge.readingWhy && (
              <span
                className="mt-1 block text-[12.5px] italic leading-snug text-[var(--app-muted)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {challenge.readingWhy}
              </span>
            )}
          </span>
        </Link>
      )}

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

        <WeekOutcome
          entry={{
            status: entry.status,
            difficulty: entry.difficulty,
            claimed: entry.claimed,
            missReason: entry.missReason,
          }}
          weekEndsAtIso={endsAtIso}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      <p className="mt-8 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        The week, written down · private
      </p>
      {challenge?.journalPrompt && (
        <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-muted)]">
          {challenge.journalPrompt}
        </p>
      )}

      {!editing && saved ? (
        /* The saved view. The entry rests here between edits so the page
           reads as a record, not a form waiting to be filled again. */
        <div className="mt-3 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--app-gold-soft)] ${
                justSaved ? "pact-mark-in" : ""
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] fill-none stroke-[var(--app-gold)] [stroke-width:2]"
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  pathLength={1}
                  className={justSaved ? "pact-draw" : undefined}
                  style={justSaved ? { animationDelay: "120ms" } : undefined}
                />
              </svg>
            </span>
            <p
              className={`text-[12.5px] uppercase tracking-[0.16em] text-[var(--app-gold)] ${
                justSaved ? "app-rise" : ""
              }`}
              style={justSaved ? { animationDelay: "300ms" } : undefined}
              role="status"
            >
              Week {weekNumber} updated. It is on the record.
            </p>
          </div>
          <p className="mt-3.5 whitespace-pre-line text-[14px] leading-relaxed text-[var(--app-text)]">
            {journal}
          </p>
          {share && publicNote.trim() && (
            feedPostId ? (
              <Link
                href={`/app/feed/${feedPostId}`}
                className="mt-3 block text-app-micro uppercase tracking-app-label text-[var(--app-gold)]"
              >
                Your note is on the feed · see it
              </Link>
            ) : (
              <p className="mt-3 text-app-micro uppercase tracking-app-label text-[var(--app-dim)]">
                Your note is on the feed
              </p>
            )
          )}
          {!composerLocked && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-4 w-full rounded-full border border-[var(--app-line)] px-5 py-3 text-[12.5px] uppercase tracking-[0.16em] text-[var(--app-muted)] transition-transform active:scale-[0.97]"
            >
              Edit the entry
            </button>
          )}
        </div>
      ) : composerLocked ? (
        /* The week has closed; the entry route would 409 any save. A
           sealed line beats a live-looking form that can only fail. */
        <div className="mt-3 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-4">
          <p className="text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            This week has closed. What was written stands; the next week
            gets its own page.
          </p>
        </div>
      ) : (
        <>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            rows={6}
            maxLength={8000}
            placeholder="Nobody reads this. That is what makes it worth writing."
            className="mt-2 w-full resize-none rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-[14px] leading-relaxed text-[var(--app-text)] outline-none placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)]"
          />

          {/* Available from the first write: making a first-time writer
              save, reopen Edit, and save again to share a line was three
              steps for one thought. */}
          {!crisisCard && (
            <div className="mt-5 rounded-2xl border border-[var(--app-line-soft)] px-4 py-4">
              <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
                Share a line · optional, public
              </p>
              <p className="mt-1 text-app-micro leading-relaxed text-[var(--app-dim)]">
                A separate note that posts to the feed as its own post. Your
                journal stays private whatever you write here.
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
                Post this note to the feed
              </label>
              {share && (
                <div className="mt-2.5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAnonymous(false)}
                    className={`rounded-full border px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.14em] transition-colors ${
                      !anonymous
                        ? "border-[var(--app-gold-soft)] text-[var(--app-gold)]"
                        : "border-[var(--app-line-soft)] text-[var(--app-dim)]"
                    }`}
                  >
                    Under my name
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnonymous(true)}
                    className={`rounded-full border px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.14em] transition-colors ${
                      anonymous
                        ? "border-[var(--app-gold-soft)] text-[var(--app-gold)]"
                        : "border-[var(--app-line-soft)] text-[var(--app-dim)]"
                    }`}
                  >
                    Anonymous
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={save}
            disabled={busy === "save" || !journal.trim()}
            className="mt-4 w-full rounded-full border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)] transition-transform active:scale-[0.97] disabled:opacity-40"
          >
            {busy === "save" ? "Sealing it" : saved ? "Update the week" : "Save the week"}
          </button>
        </>
      )}

      {crisisCard && (
        <div className="mt-4 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card-2)] px-4 py-4">
          <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-[var(--app-text)]">
            {crisisCard}
          </p>
        </div>
      )}

      {error && (
        <p className="mt-3 text-[12.5px] text-[var(--app-rose)]">{error}</p>
      )}
    </div>
  );
}
