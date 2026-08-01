"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithRefresh } from "@/lib/auth/fetch-with-refresh";
import { SkeletonText } from "@/components/app-shell/ui";

/**
 * The week's whole AI surface: the Threshold, then the journal, then her
 * reply. One component because it is one arc of state per week:
 *
 *   doors not fetched -> doors shown -> crossed -> entry written -> replied
 *
 * The doors generate on first fetch (a few seconds, once per week), so the
 * wait state matters: it is the member watching their week being written
 * for them, and it says so.
 */

interface ThresholdData {
  gauntlet: boolean;
  standardText: string;
  deeperText: string | null;
  depth: string | null;
  crossedAt: string | null;
}

interface EntryData {
  body: string;
  reply: string | null;
  replyDueAt: string;
  flagged: boolean;
}

export default function ThresholdJournal({
  weekNumber,
  initialEntry,
}: {
  weekNumber: number;
  initialEntry: EntryData | null;
}) {
  const [threshold, setThreshold] = useState<ThresholdData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [crossing, setCrossing] = useState(false);
  const [entry, setEntry] = useState<EntryData | null>(initialEntry);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await fetchWithRefresh(
        `/api/program/threshold?week=${weekNumber}`,
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? String(res.status));
      }
      setThreshold(await res.json());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load the week");
    }
  }, [weekNumber]);

  useEffect(() => {
    // A replied or written week needs no door fetch; everything to show is
    // already here.
    if (!initialEntry) load();
  }, [initialEntry, load]);

  async function cross(depth: string) {
    if (crossing || !threshold) return;
    setCrossing(true);
    try {
      const res = await fetchWithRefresh("/api/program/threshold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekNumber, depth }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setThreshold({ ...threshold, depth, crossedAt: new Date().toISOString() });
    } catch {
      setLoadError("That did not take. Try again.");
    } finally {
      setCrossing(false);
    }
  }

  async function submitEntry() {
    if (saving || draft.trim().length < 20) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetchWithRefresh("/api/program/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekNumber, body: draft }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? String(res.status));
      setEntry({
        body: draft,
        reply: body.reply ?? null,
        replyDueAt: body.replyDueAt ?? new Date().toISOString(),
        flagged: body.flagged === true,
      });
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "That did not save. Try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------- entry written ------------------------- */
  if (entry) {
    return (
      <div className="mt-3 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
          Your entry
        </p>
        <p className="mt-2 whitespace-pre-wrap text-app-body leading-relaxed text-[var(--app-muted)]">
          {entry.body}
        </p>
        <div className="mt-4 border-t border-[var(--app-line-soft)] pt-3.5">
          {entry.reply ? (
            <>
              <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
                Her reply
              </p>
              <p className="mt-2 whitespace-pre-wrap text-app-body leading-relaxed text-[var(--app-text)]">
                {entry.reply}
              </p>
            </>
          ) : (
            <p className="text-app-caption text-[var(--app-dim)]">
              She has your entry. Her reply lands within the hour; you will
              get a notification.
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ---------------------------- loading ----------------------------- */
  if (!threshold) {
    return (
      <div className="mt-3 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
        {loadError ? (
          <>
            <p className="text-app-body text-[var(--app-muted)]">{loadError}</p>
            <button
              type="button"
              onClick={load}
              className="mt-2 text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold)]"
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
              She is writing your week
            </p>
            <SkeletonText lines={3} className="mt-3" />
          </>
        )}
      </div>
    );
  }

  /* ------------------------- doors uncrossed ------------------------ */
  if (!threshold.crossedAt) {
    return (
      <div className="mt-3 rounded-2xl border border-[var(--app-gold-soft)] bg-[var(--app-card)] px-4 py-4">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
          {threshold.gauntlet ? "The Gauntlet" : "The Threshold"}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-app-body leading-relaxed text-[var(--app-text)]">
          {threshold.standardText}
        </p>

        {threshold.gauntlet ? (
          <button
            type="button"
            onClick={() => cross("gauntlet")}
            disabled={crossing}
            className="mt-4 w-full rounded-full bg-[var(--app-gold)] px-4 py-2.5 text-app-caption uppercase tracking-app-wide text-[#0a0908] disabled:opacity-60"
          >
            {crossing ? "…" : "I'm doing this"}
          </button>
        ) : (
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={() => cross("standard")}
              disabled={crossing}
              className="w-full rounded-full bg-[var(--app-gold)] px-4 py-2.5 text-app-caption uppercase tracking-app-wide text-[#0a0908] disabled:opacity-60"
            >
              I&apos;m continuing
            </button>
            {threshold.deeperText && (
              <button
                type="button"
                onClick={() => cross("deeper")}
                disabled={crossing}
                className="w-full rounded-2xl border border-[var(--app-gold-soft)] px-4 py-3 text-left disabled:opacity-60"
              >
                <span className="block text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold-soft)]">
                  Further
                </span>
                <span className="mt-1 block text-app-caption leading-relaxed text-[var(--app-muted)]">
                  {threshold.deeperText}
                </span>
              </button>
            )}
          </div>
        )}
        <p className="mt-3 text-center text-app-tiny text-[var(--app-dim)]">
          Crossing is a decision, not a formality. Not this week is also an
          answer; the week simply waits.
        </p>
      </div>
    );
  }

  /* ------------------- crossed, entry not written ------------------- */
  const chosen =
    threshold.depth === "deeper" && threshold.deeperText
      ? threshold.deeperText
      : threshold.standardText;

  return (
    <div className="mt-3 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
        Your week
      </p>
      <p className="mt-2 whitespace-pre-wrap text-app-body leading-relaxed text-[var(--app-text)]">
        {chosen}
      </p>

      <div className="mt-4 border-t border-[var(--app-line-soft)] pt-3.5">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
          The journal
        </p>
        <p className="mt-1 text-app-caption text-[var(--app-dim)]">
          Written once, after the work. What happened, and what it cost.
        </p>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          placeholder="What actually happened."
          className="mt-3 w-full resize-none rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card-2)] px-3.5 py-3 text-app-body leading-relaxed text-[var(--app-text)] placeholder:text-[var(--app-dim)] focus:border-[var(--app-gold-soft)] focus:outline-none"
        />
        <button
          type="button"
          onClick={submitEntry}
          disabled={saving || draft.trim().length < 20}
          className="mt-3 w-full rounded-full bg-[var(--app-gold)] px-4 py-2.5 text-app-caption uppercase tracking-app-wide text-[#0a0908] disabled:opacity-40"
        >
          {saving ? "Saving" : "This is what happened"}
        </button>
        {saveError && (
          <p className="mt-2 text-center text-app-caption text-[var(--app-rose)]">
            {saveError}
          </p>
        )}
      </div>
    </div>
  );
}
