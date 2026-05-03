"use client";

import { useEffect, useState } from "react";

type Category =
  | "questionAnswered"
  | "voiceNote"
  | "forumReply"
  | "mention"
  | "broadcast"
  | "dailyTell";

const CATEGORIES: Array<{
  id: Category;
  label: string;
  blurb: string;
}> = [
  {
    id: "dailyTell",
    label: "Daily Tell reminder",
    blurb:
      "A push at the time you choose so you don't break your streak. Sixty seconds, one read.",
  },
  {
    id: "questionAnswered",
    label: "Your question gets answered",
    blurb: "When Kanika records a voice note or video for a question you asked.",
  },
  {
    id: "voiceNote",
    label: "New voice notes",
    blurb: "A new voice note drops in the feed.",
  },
  {
    id: "forumReply",
    label: "Forum replies",
    blurb: "Someone replies to your forum thread.",
  },
  {
    id: "mention",
    label: "Mentions",
    blurb: "Someone @-mentions you in a comment or post.",
  },
  {
    id: "broadcast",
    label: "Broadcast announcements",
    blurb: "Big-deal announcements from Kanika. Off by default — opt in if you want them.",
  },
];

/** Hour options for the Daily Tell time picker. Curated to common
 *  habit-anchor moments, not a full 24-row dropdown. */
const HOUR_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 6, label: "6:00 am" },
  { value: 7, label: "7:00 am" },
  { value: 8, label: "8:00 am" },
  { value: 9, label: "9:00 am" },
  { value: 12, label: "12:00 pm" },
  { value: 17, label: "5:00 pm" },
  { value: 19, label: "7:00 pm" },
  { value: 21, label: "9:00 pm" },
];

/**
 * Client component for the Notifications card in /consilium/profile.
 *
 * Lazy-loads the current preferences on mount, then PATCHes a single
 * category at a time as the member toggles. No global save button —
 * each toggle is its own optimistic round-trip, which matches the
 * settings-app-on-iOS feel the rest of the member surface is going
 * for. On error, the toggle reverts and a small inline warning shows.
 *
 * Renders an explanatory note when the browser doesn't support push
 * (Notification API missing, or VAPID env not configured) so members
 * understand why the toggles still exist but won't fire — the row is
 * still useful for shaping their stored preferences if/when they
 * later install the PWA on a supported device.
 */
export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState<Record<Category, boolean> | null>(null);
  const [dailyTellHour, setDailyTellHour] = useState<number>(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<Category | "dailyTellHour" | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ok =
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window &&
        Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
      setSupported(ok);
    }

    let cancelled = false;
    fetch("/api/push/preferences")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.preferences) {
          setPrefs(data.preferences as Record<Category, boolean>);
        }
        if (typeof data?.dailyTellHour === "number") {
          setDailyTellHour(data.dailyTellHour);
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Couldn't load preferences. Refresh to try again.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggle(cat: Category, next: boolean) {
    if (!prefs) return;
    setSaving(cat);
    setError(null);
    const previous = prefs[cat];
    setPrefs({ ...prefs, [cat]: next });
    try {
      const res = await fetch("/api/push/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: { [cat]: next } }),
      });
      if (!res.ok) {
        setPrefs({ ...prefs, [cat]: previous });
        setError("Couldn't save that. Try again.");
      }
    } catch {
      setPrefs({ ...prefs, [cat]: previous });
      setError("Network hiccup. Try again.");
    } finally {
      setSaving(null);
    }
  }

  async function changeHour(next: number) {
    const previous = dailyTellHour;
    setSaving("dailyTellHour");
    setError(null);
    setDailyTellHour(next);
    try {
      const res = await fetch("/api/push/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyTellHour: next }),
      });
      if (!res.ok) {
        setDailyTellHour(previous);
        setError("Couldn't save the time. Try again.");
      }
    } catch {
      setDailyTellHour(previous);
      setError("Network hiccup. Try again.");
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-6 sm:p-8">
        <p className="text-text-gray/70 text-sm font-light">Loading…</p>
      </div>
    );
  }

  if (!prefs) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-6 sm:p-8">
        <p className="text-text-gray/70 text-sm font-light">
          {error ?? "Couldn't load preferences."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-6 sm:p-8 space-y-4">
      {!supported && (
        <p className="text-xs text-text-gray/60 leading-relaxed pb-3 border-b border-warm-gold/10">
          Push notifications aren&apos;t enabled in this browser.
          Toggles below still save your preferences for the next time
          you open the Consilium on a device that supports them, for
          example installing the home-screen app on iPhone or Android.
        </p>
      )}

      {CATEGORIES.map((c) => (
        <div key={c.id} className="py-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-light font-light">{c.label}</p>
              <p className="text-xs text-text-gray/60 mt-1 leading-relaxed">
                {c.blurb}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[c.id]}
              aria-label={c.label}
              disabled={saving === c.id}
              onClick={() => toggle(c.id, !prefs[c.id])}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                prefs[c.id] ? "bg-warm-gold" : "bg-warm-gold/15"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-deep-black transition-transform ${
                  prefs[c.id] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Daily Tell sub-row: time picker, only visible when toggle is on. */}
          {c.id === "dailyTell" && prefs.dailyTell && (
            <div className="mt-3 ml-0 pl-0 flex items-center gap-3">
              <label
                htmlFor="dailyTellHour"
                className="text-xs text-text-gray/60"
              >
                Send at
              </label>
              <select
                id="dailyTellHour"
                value={dailyTellHour}
                onChange={(e) => changeHour(Number.parseInt(e.target.value, 10))}
                disabled={saving === "dailyTellHour"}
                className="bg-deep-black/40 border border-warm-gold/20 rounded px-2 py-1 text-sm text-text-light disabled:opacity-50 focus:outline-none focus:border-warm-gold/50"
              >
                {HOUR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="text-xs text-text-gray/50">your local time</span>
            </div>
          )}
        </div>
      ))}

      {error && (
        <p className="text-xs text-burgundy/80 pt-3 border-t border-warm-gold/10">
          {error}
        </p>
      )}
    </div>
  );
}
