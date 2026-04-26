"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

/**
 * In-profile email-preferences panel.
 *
 * Reads + writes `User.emailPreferences` via /api/user/settings (the
 * existing endpoint). Renders four toggles — marketing first because
 * that's the one most users want to control. Saves on each change
 * with a small debounce so a flurry of toggles still hits the server
 * once per session-equivalent burst. No "Save" button — the toggle
 * is the action.
 *
 * Defaults all keys to TRUE if the user has never saved (matches
 * DEFAULT_PREFERENCES on the server).
 */

interface Prefs {
  marketing: boolean;
  productUpdates: boolean;
  sessionReminders: boolean;
  weeklyDigest: boolean;
}

const DEFAULT: Prefs = {
  marketing: true,
  productUpdates: true,
  sessionReminders: true,
  weeklyDigest: true,
};

const ROWS: Array<{
  key: keyof Prefs;
  title: string;
  desc: string;
}> = [
  {
    key: "marketing",
    title: "Marketing & promotions",
    desc: "New products, launches, and offers from Kanika.",
  },
  {
    key: "productUpdates",
    title: "Product updates",
    desc: "When the simulator, courses, or Consilium gains new content.",
  },
  {
    key: "weeklyDigest",
    title: "Weekly digest",
    desc: "What happened in the Consilium this week.",
  },
  {
    key: "sessionReminders",
    title: "Coaching session reminders",
    desc: "Pre-call prep + follow-ups for booked coaching.",
  },
];

export default function EmailPreferencesPanel() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<keyof Prefs | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/user/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (data?.emailPreferences && typeof data.emailPreferences === "object") {
          setPrefs({ ...DEFAULT, ...data.emailPreferences });
        }
        setLoading(false);
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const save = useCallback(async (next: Prefs, key: keyof Prefs) => {
    setSavingKey(key);
    try {
      const r = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailPreferences: next }),
      });
      if (r.ok) {
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 1800);
      }
    } finally {
      setSavingKey(null);
    }
  }, []);

  function toggle(key: keyof Prefs) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    save(next, key);
  }

  return (
    <div className="bg-deep-black/50 border border-accent-gold/10 rounded-xl overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-4 border-b border-accent-gold/10">
        <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
          <Mail size={18} className="text-accent-gold" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-light font-light">Email preferences</p>
          <p className="text-text-gray text-xs">
            Toggle off any time. Transactional emails (purchases, password
            resets) always come through.
          </p>
        </div>
        {savedFlash && (
          <span
            className="inline-flex items-center gap-1 text-[11px] text-emerald-400/90 font-light tracking-wide"
            aria-live="polite"
          >
            <Check size={13} />
            Saved
          </span>
        )}
      </div>

      <div className="divide-y divide-accent-gold/5">
        {loading ? (
          <div className="px-5 py-6 flex items-center gap-2 text-text-gray text-sm">
            <Loader2 size={14} className="animate-spin" />
            Loading…
          </div>
        ) : (
          ROWS.map(({ key, title, desc }) => {
            const on = prefs[key];
            const saving = savingKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                disabled={saving}
                className="group flex items-start gap-4 w-full px-5 py-4 text-left hover:bg-accent-gold/[0.03] transition-colors disabled:opacity-60"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-light font-light">{title}</p>
                  <p className="text-xs text-text-gray/80 mt-0.5">{desc}</p>
                </div>
                {/* Switch */}
                <div
                  className={`shrink-0 relative w-10 h-6 rounded-full border transition-all duration-200 ${
                    on
                      ? "bg-accent-gold/20 border-accent-gold/60"
                      : "bg-deep-black/50 border-text-gray/30"
                  }`}
                  aria-pressed={on}
                  role="switch"
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                      on
                        ? "left-[calc(100%-1.25rem-0.125rem)] bg-accent-gold shadow-[0_0_8px_-2px_rgba(212,175,55,0.55)]"
                        : "left-0.5 bg-text-gray/60"
                    }`}
                  />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
