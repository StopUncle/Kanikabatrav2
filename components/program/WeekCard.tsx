"use client";

import { useState } from "react";
import type { ProgramWeek } from "@/lib/program/read";
import { fetchWithRefresh } from "@/lib/auth/fetch-with-refresh";

/**
 * One week of the transformation: reading, lessons, and the challenge.
 *
 * Open weeks expand. A locked week that is next shows its date, because a
 * lock with a date reads as anticipation and a lock without one reads as a
 * paywall. Weeks beyond that show a title only, so the road is visible
 * without pretending it is available.
 */

function formatUnlock(d: Date): string {
  const days = Math.ceil((d.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  if (days <= 1) return "Opens tomorrow";
  if (days <= 7)
    return `Opens ${d.toLocaleDateString(undefined, { weekday: "long" })}`;
  return `Opens ${d.toLocaleDateString(undefined, { day: "numeric", month: "short" })}`;
}

export default function WeekCard({
  week,
  defaultOpen = false,
}: {
  week: ProgramWeek;
  defaultOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [completed, setCompleted] = useState(week.completed);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locked = week.state !== "open";
  const watched = week.lessons.filter((l) => l.viewed).length;

  async function markDone() {
    if (saving || completed) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetchWithRefresh(
        `/api/program/week/${week.weekNumber}/complete`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      );
      if (!res.ok) throw new Error(String(res.status));
      setCompleted(true);
    } catch {
      setError("That did not save. Try again in a moment.");
    } finally {
      setSaving(false);
    }
  }

  if (week.state === "locked") {
    return (
      <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-3.5 opacity-45">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-dim)]">
          Week {week.weekNumber}
        </p>
        <p className="mt-0.5 text-[14px]">{week.title}</p>
      </div>
    );
  }

  if (week.state === "next") {
    return (
      <div className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
          Week {week.weekNumber} &middot; {formatUnlock(week.unlocksAt)}
        </p>
        <p className="mt-1 text-[15px]">{week.title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--app-dim)]">
          {week.lede}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-3 px-4 py-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
            Week {week.weekNumber}
            {completed ? " · done" : ""}
          </span>
          <span className="mt-0.5 block text-[15px]">{week.title}</span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-[var(--app-dim)]">
            {week.lede}
          </span>
        </span>
        <span
          className={`shrink-0 pt-1 text-xs ${completed ? "text-[var(--app-green)]" : "text-[var(--app-gold)]"}`}
        >
          {completed ? "✓" : expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-[var(--app-line-soft)] px-4 pb-4 pt-3.5">
          {week.readingLabel && (
            <a
              href="/app/book"
              className="mb-4 block rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card-2)] px-3.5 py-3"
            >
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
                Read first
              </span>
              <span className="mt-1 block text-[13.5px] text-[var(--app-text)]">
                {week.readingLabel}
              </span>
              {week.readingWhy && (
                <span className="mt-1 block text-[12px] leading-relaxed text-[var(--app-dim)]">
                  {week.readingWhy}
                </span>
              )}
            </a>
          )}

          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--app-dim)]">
            Lessons {watched > 0 ? `· ${watched}/${week.lessons.length}` : ""}
          </p>
          <ol className="mb-4 flex flex-col gap-1.5">
            {week.lessons.map((l, i) => (
              <li
                key={l.id}
                className="flex items-start gap-2.5 text-[13.5px] leading-snug"
              >
                <span className="mt-[3px] w-4 shrink-0 text-[11px] text-[var(--app-dim)]">
                  {l.viewed ? "✓" : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={l.videoUrl ? "" : "text-[var(--app-muted)]"}
                  >
                    {l.title}
                  </span>
                  {!l.videoUrl && (
                    <span className="ml-1.5 text-[11px] text-[var(--app-dim)]">
                      (filming)
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border border-[var(--app-gold)]/25 bg-[var(--app-gold)]/[0.05] px-3.5 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold)]">
              This week&apos;s challenge
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--app-text)]">
              {week.challenge}
            </p>
          </div>

          {!locked && (
            <button
              type="button"
              onClick={markDone}
              disabled={completed || saving}
              className={`mt-3.5 w-full rounded-full px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] transition-colors ${
                completed
                  ? "border border-[var(--app-line-soft)] text-[var(--app-green)]"
                  : "bg-[var(--app-gold)] text-[var(--app-bg)] active:opacity-85"
              } disabled:opacity-60`}
            >
              {completed
                ? "Challenge done"
                : saving
                  ? "Saving"
                  : "I did the challenge"}
            </button>
          )}

          {error && (
            <p className="mt-2 text-center text-[12px] text-[var(--app-red)]">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
