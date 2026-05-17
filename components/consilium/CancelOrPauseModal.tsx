"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Pause, Calendar } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Called after a successful pause. Parent uses the returned date
   *  to flip its local UI state without refetching. */
  onPaused: (pausedUntil: string) => void;
  /** Called after a successful cancel. Parent flips to "auto-renewal off". */
  onCancelled: () => void;
}

type PauseOption = {
  days: 30 | 60 | 90;
  label: string;
  blurb: string;
};

const PAUSE_OPTIONS: PauseOption[] = [
  {
    days: 30,
    label: "30 days",
    blurb: "A short reset. Your seat stays open.",
  },
  {
    days: 60,
    label: "60 days",
    blurb: "Two months back. Pick up where you left off.",
  },
  {
    days: 90,
    label: "90 days",
    blurb: "A full quarter. We will be here when you return.",
  },
];

/**
 * The retention save-modal. Replaces the old browser confirm() on cancel.
 *
 * Architecture choice: pause is offered FIRST and prominently. Cancel is
 * available but understated. This is the entire point of the modal — the
 * default action a member takes here is the option that keeps the
 * relationship alive.
 *
 * The cancel link at the bottom is deliberately small, not hostile. We do
 * not want to make cancelling hard; we want to make pausing visible.
 */
export default function CancelOrPauseModal({
  open,
  onClose,
  onPaused,
  onCancelled,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [busyDays, setBusyDays] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setBusyDays(null);
      setCancelling(false);
    }
  }, [open]);

  async function handlePause(days: 30 | 60 | 90) {
    setBusyDays(days);
    setError(null);
    try {
      const res = await fetch("/api/consilium/subscription/pause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not pause membership");
      onPaused(data.pausedUntil);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not pause membership");
    } finally {
      setBusyDays(null);
    }
  }

  async function handleCancel() {
    setCancelling(true);
    setError(null);
    try {
      const res = await fetch("/api/consilium/subscription/cancel", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not cancel auto-renewal");
      onCancelled();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel auto-renewal");
    } finally {
      setCancelling(false);
    }
  }

  if (!mounted || !open) return null;

  const anyBusy = busyDays !== null || cancelling;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-deep-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-pause-title"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-deep-black border border-accent-gold/20 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          disabled={anyBusy}
          className="absolute top-3 right-3 p-1.5 text-text-gray/60 hover:text-text-light transition-colors disabled:opacity-40"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-1">
            <Pause size={14} className="text-accent-gold" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-[0.2em] text-accent-gold/80">
              Pause, do not leave
            </span>
          </div>
          <h2
            id="cancel-pause-title"
            className="text-xl sm:text-2xl font-light text-text-light tracking-wide mb-2"
          >
            Life gets busy.
          </h2>
          <p className="text-sm text-text-gray leading-relaxed mb-6">
            Pause your billing. Your seat in The Consilium stays open. Pick the
            length that fits the season you are in.
          </p>

          <div className="space-y-2 mb-5">
            {PAUSE_OPTIONS.map((opt) => {
              const isBusy = busyDays === opt.days;
              return (
                <button
                  key={opt.days}
                  onClick={() => handlePause(opt.days)}
                  disabled={anyBusy}
                  className="w-full text-left p-4 bg-deep-black/60 border border-accent-gold/15 hover:border-accent-gold/40 hover:bg-accent-gold/5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Calendar
                        size={16}
                        className="text-accent-gold/70 group-hover:text-accent-gold transition-colors"
                        strokeWidth={1.5}
                      />
                      <div>
                        <div className="text-base text-text-light font-light">
                          Pause for {opt.label}
                        </div>
                        <div className="text-xs text-text-gray/70 mt-0.5">
                          {opt.blurb}
                        </div>
                      </div>
                    </div>
                    {isBusy && (
                      <Loader2 size={16} className="animate-spin text-accent-gold" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-xs text-red-400 mb-4 text-center">{error}</p>
          )}

          <div className="pt-4 border-t border-accent-gold/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              onClick={onClose}
              disabled={anyBusy}
              className="text-sm text-text-light/80 hover:text-text-light transition-colors disabled:opacity-50"
            >
              Never mind, keep it
            </button>
            <button
              onClick={handleCancel}
              disabled={anyBusy}
              className="text-xs text-text-gray/60 hover:text-text-gray underline underline-offset-4 transition-colors disabled:opacity-50"
            >
              {cancelling ? "Cancelling auto-renewal…" : "Cancel auto-renewal anyway"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
