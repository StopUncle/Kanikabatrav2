"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Check, Loader2, AlertCircle } from "lucide-react";
import {
  DEFAULT_EMAIL_PREFERENCES,
  EMAIL_PREFERENCE_COPY,
  EMAIL_PREFERENCE_ORDER,
  normalizeEmailPreferences,
  type EmailPreferenceKey,
  type EmailPreferences,
} from "@/lib/email-preferences";

/**
 * In-profile email preferences, marketing skin.
 *
 * Sends only the key that changed. The endpoint merges, so a stale tab can
 * no longer clobber a toggle it does not know about, and two tabs racing
 * each other lose at most the switch they were themselves flipping.
 *
 * Failures are shown and the switch snaps back. It used to fail silently:
 * the toggle stayed where you put it while the server kept the old value,
 * which is the worst possible outcome for an unsubscribe control because
 * the user believes they have opted out and the emails keep arriving.
 */
export default function EmailPreferencesPanel({
  highlight = false,
}: {
  /** Arrived from an unsubscribe link. Draws attention to the panel. */
  highlight?: boolean;
}) {
  const [prefs, setPrefs] = useState<EmailPreferences>(
    DEFAULT_EMAIL_PREFERENCES,
  );
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<EmailPreferenceKey | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/user/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (data?.emailPreferences) {
          setPrefs(normalizeEmailPreferences(data.emailPreferences));
        }
        setLoading(false);
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  // Bring the switches into view when the visit came from an email link.
  // The server cannot do this: a URL fragment is never sent to it, which
  // is why the link carries ?section=emails and the scroll happens here.
  useEffect(() => {
    if (!highlight || loading) return;
    root.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlight, loading]);

  const save = useCallback(
    async (key: EmailPreferenceKey, value: boolean, previous: boolean) => {
      setSavingKey(key);
      setError(null);
      try {
        const r = await fetch("/api/user/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailPreferences: { [key]: value } }),
        });
        if (!r.ok) throw new Error("save failed");
        const data = await r.json();
        // Settle on what the server stored rather than the optimistic guess.
        if (data?.emailPreferences) {
          setPrefs(normalizeEmailPreferences(data.emailPreferences));
        }
        setSavedFlash(true);
        if (flashTimer.current) clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setSavedFlash(false), 1800);
      } catch {
        setPrefs((p) => ({ ...p, [key]: previous }));
        setError("That didn't save. Check your connection and try again.");
      } finally {
        setSavingKey(null);
      }
    },
    [],
  );

  function toggle(key: EmailPreferenceKey) {
    const previous = prefs[key];
    setPrefs((p) => ({ ...p, [key]: !previous }));
    save(key, !previous, previous);
  }

  return (
    <div
      ref={root}
      id="email-preferences"
      className={`bg-deep-black/50 border rounded-xl overflow-hidden transition-colors duration-500 ${
        highlight
          ? "border-accent-gold/50 shadow-[0_0_28px_-10px_rgba(212,175,55,0.5)]"
          : "border-accent-gold/10"
      }`}
    >
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

      {error && (
        <div
          className="flex items-start gap-2 px-5 py-3 bg-red-950/30 border-b border-red-500/20 text-red-300 text-xs"
          role="alert"
        >
          <AlertCircle size={14} className="mt-px shrink-0" />
          {error}
        </div>
      )}

      <div className="divide-y divide-accent-gold/5">
        {loading ? (
          <div className="px-5 py-6 flex items-center gap-2 text-text-gray text-sm">
            <Loader2 size={14} className="animate-spin" />
            Loading…
          </div>
        ) : (
          EMAIL_PREFERENCE_ORDER.map((key) => {
            const { title, description } = EMAIL_PREFERENCE_COPY[key];
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
                  <p className="text-xs text-text-gray/80 mt-0.5">
                    {description}
                  </p>
                </div>
                {/* Switch. role="switch" requires aria-checked (not
                    aria-pressed). The outer <button> owns the click; this
                    inner div is purely presentation. */}
                <div
                  className={`shrink-0 relative w-10 h-6 rounded-full border transition-all duration-200 ${
                    on
                      ? "bg-accent-gold/20 border-accent-gold/60"
                      : "bg-deep-black/50 border-text-gray/30"
                  }`}
                  role="switch"
                  aria-checked={on}
                  aria-label={`${title}: ${on ? "on" : "off"}`}
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
