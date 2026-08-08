"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";
import {
  DEFAULT_EMAIL_PREFERENCES,
  EMAIL_PREFERENCE_COPY,
  EMAIL_PREFERENCE_ORDER,
  normalizeEmailPreferences,
  type EmailPreferenceKey,
  type EmailPreferences as Prefs,
} from "@/lib/email-preferences";

/**
 * Email preferences in the app skin.
 *
 * The app had no email control of any kind: the profile carried push
 * categories only, so the one thing people actually want to switch off
 * lived exclusively on a marketing page most members never open. This is
 * the same endpoint and the same five keys as the other two surfaces,
 * wearing the app's palette.
 *
 * `highlight` is set when someone arrived from the unsubscribe link in an
 * email, which is the whole point of the deep link: land on the switch,
 * see it move, leave.
 */
export default function EmailPreferences({
  highlight = false,
}: {
  highlight?: boolean;
}) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_EMAIL_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<EmailPreferenceKey | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flash = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      if (flash.current) clearTimeout(flash.current);
    };
  }, []);

  // Scroll the switches into view when the visit came from an email. The
  // server cannot do this: a URL fragment is never sent to it, which is
  // why the link carries ?section=emails and the scrolling happens here.
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
        if (data?.emailPreferences) {
          setPrefs(normalizeEmailPreferences(data.emailPreferences));
        }
        setSaved(true);
        if (flash.current) clearTimeout(flash.current);
        flash.current = setTimeout(() => setSaved(false), 1800);
      } catch {
        // Snap back. A switch that stays where you put it while the server
        // disagrees is worse than no switch, because the emails keep coming
        // and the page says they should not.
        setPrefs((p) => ({ ...p, [key]: previous }));
        setError("That didn't save. Try again in a moment.");
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
      className={`rounded-[18px] border bg-[var(--app-card)] p-[18px] transition-colors duration-500 ${
        highlight
          ? "border-[var(--app-gold)] shadow-[0_0_30px_-12px_var(--app-gold)]"
          : "border-[var(--app-line)]"
      }`}
    >
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          What lands in your inbox
        </p>
        {saved && (
          <span
            className="inline-flex items-center gap-1 text-app-eyebrow text-[var(--app-green)]"
            aria-live="polite"
          >
            <Check size={12} />
            Saved
          </span>
        )}
      </div>
      <p className="mb-3 text-app-caption leading-relaxed text-[var(--app-muted)]">
        Switch off anything you do not want. Receipts, password resets and
        anything about money still reach you.
      </p>

      {error && (
        <div
          className="mb-3 flex items-start gap-2 rounded-[12px] border border-red-500/25 bg-red-950/25 px-3 py-2 text-app-caption text-red-300"
          role="alert"
        >
          <AlertCircle size={13} className="mt-px shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-3 text-app-caption text-[var(--app-dim)]">
          <Loader2 size={13} className="animate-spin" />
          Loading…
        </div>
      ) : (
        <div className="divide-y divide-[var(--app-line-soft)]">
          {EMAIL_PREFERENCE_ORDER.map((key) => {
            const { title, description } = EMAIL_PREFERENCE_COPY[key];
            const on = prefs[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                disabled={savingKey === key}
                className="flex w-full items-start gap-4 py-3 text-left transition-opacity disabled:opacity-60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-app-body text-[var(--app-text)]">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-app-caption leading-relaxed text-[var(--app-muted)]">
                    {description}
                  </span>
                </span>
                <span
                  role="switch"
                  aria-checked={on}
                  aria-label={`${title}: ${on ? "on" : "off"}`}
                  className={`relative mt-0.5 h-6 w-10 shrink-0 rounded-full border transition-colors duration-200 ${
                    on
                      ? "border-[var(--app-gold-soft)] bg-[var(--app-gold)]/20"
                      : "border-[var(--app-line)] bg-[var(--app-card-2)]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-all duration-200 ${
                      on
                        ? "left-[calc(100%-1.25rem-0.125rem)] bg-[var(--app-gold)]"
                        : "left-0.5 bg-[var(--app-dim)]"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
