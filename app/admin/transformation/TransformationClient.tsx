"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import VideoUrlField from "@/components/admin/VideoUrlField";

/**
 * The 12 Weeks, admin side.
 *
 * Two jobs only: put video on a lesson, and open a week. Copy lives in
 * lib/program/curriculum.ts and changes by editing that file and
 * re-seeding, so there is no editor here to keep in sync and no second
 * source of truth to drift.
 */

interface Lesson {
  id: string;
  orderIndex: number;
  title: string;
  videoUrl: string | null;
}

interface Week {
  weekNumber: number;
  title: string;
  lede: string;
  challenge: string;
  readingLabel: string | null;
  isPublished: boolean;
  completions: number;
  lessons: Lesson[];
  filmed: number;
  lessonCount: number;
}

interface Runway {
  leadingWeek: number;
  publishedThrough: number;
  weeksAhead: number;
  lowRunway: boolean;
  totalWeeks: number;
}

export default function TransformationClient() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [runway, setRunway] = useState<Runway | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/transformation");
    if (!res.ok) {
      setError("Could not load the program.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setWeeks(data.weeks);
    setRunway(data.runway);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function patch(body: unknown, key: string) {
    setBusy(key);
    setError(null);
    try {
      const res = await fetch("/api/admin/transformation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "That did not save.");
        return;
      }
      await load();
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-gold" size={28} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light mb-2">
        The 12 Weeks
      </h1>
      <p className="text-sm font-light text-text-gray mb-6">
        Upload the videos, then open the week. Members are counted from their
        own join date, so opening a week reaches everyone who has reached it.
      </p>

      {runway && (
        <div
          className={`mb-6 rounded-lg border p-5 ${
            runway.lowRunway
              ? "border-amber-500/40 bg-amber-500/[0.06]"
              : "border-accent-gold/20 bg-accent-gold/[0.04]"
          }`}
        >
          <div className="flex items-start gap-3">
            {runway.lowRunway && (
              <AlertTriangle
                size={18}
                className="mt-0.5 shrink-0 text-amber-400"
              />
            )}
            <div>
              <p className="text-text-light text-lg font-light">
                {runway.publishedThrough === 0
                  ? "Nothing is open yet."
                  : runway.weeksAhead < 0
                    ? `Someone is already past week ${runway.publishedThrough}.`
                    : `${runway.weeksAhead} ${runway.weeksAhead === 1 ? "week" : "weeks"} of runway.`}
              </p>
              <p className="mt-1 text-sm font-light text-text-gray">
                Open through week {runway.publishedThrough} of{" "}
                {runway.totalWeeks}. Furthest member is on week{" "}
                {runway.leadingWeek || "none yet"}.
                {runway.lowRunway &&
                  " Film ahead: a member reaching a week that is not there is the one failure this program cannot absorb."}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {weeks.map((w) => {
          const expanded = open === w.weekNumber;
          return (
            <div
              key={w.weekNumber}
              className="glass-card overflow-hidden rounded-lg"
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : w.weekNumber)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="w-8 shrink-0 text-sm font-light text-text-gray">
                  {w.weekNumber}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-text-light font-light">
                    {w.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-gray">
                    {w.filmed}/{w.lessonCount} filmed
                    {w.completions > 0 && ` · ${w.completions} done it`}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] ${
                    w.isPublished
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-white/[0.06] text-text-gray"
                  }`}
                >
                  {w.isPublished ? "Open" : "Draft"}
                </span>
              </button>

              {expanded && (
                <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                  {w.readingLabel && (
                    <p className="mb-4 text-xs text-text-gray">
                      Reading: {w.readingLabel}
                    </p>
                  )}

                  <div className="flex flex-col gap-4">
                    {w.lessons.map((l) => (
                      <div key={l.id}>
                        <p className="mb-1.5 text-sm font-light text-text-light">
                          {l.orderIndex + 1}. {l.title}
                        </p>
                        <VideoUrlField
                          value={l.videoUrl || ""}
                          onChange={(url) =>
                            void patch(
                              { action: "video", lessonId: l.id, videoUrl: url },
                              l.id,
                            )
                          }
                          compact
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={busy === `w${w.weekNumber}`}
                    onClick={() =>
                      void patch(
                        {
                          action: "publish",
                          weekNumber: w.weekNumber,
                          isPublished: !w.isPublished,
                        },
                        `w${w.weekNumber}`,
                      )
                    }
                    className={`mt-5 w-full rounded-full px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors disabled:opacity-50 ${
                      w.isPublished
                        ? "border border-white/15 text-text-gray hover:text-text-light"
                        : "bg-accent-gold text-deep-black hover:bg-accent-gold/90"
                    }`}
                  >
                    {busy === `w${w.weekNumber}`
                      ? "Saving"
                      : w.isPublished
                        ? "Close this week"
                        : "Open this week"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
