"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { haptic, type HapticPattern } from "@/lib/haptics";
import EmberBurst from "./EmberBurst";
import { useAppOverlay } from "./use-app-overlay";

/**
 * The one big moment.
 *
 * Everything else in the app is restrained so that this can land. The shell
 * dims, the burst fires, the number counts up, Kanika says one line, and only
 * then does a way out appear. It never dismisses itself: the member closes it
 * when they are finished looking.
 *
 * Choreography is borrowed from `components/rings/RingUpCeremony.tsx`, which
 * cannot be reused directly because it portals to `document.body` (escaping
 * the app-shell tokens) and hardcodes the legacy palette.
 */

const BEAT = {
  veil: 0,
  card: 250,
  burst: 600,
  headline: 700,
  subline: 1100,
  voice: 1400,
  action: 1700,
} as const;

export interface CeremonyAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface CeremonyProps {
  open: boolean;
  onDismiss: () => void;
  /** Hold before the veil starts, e.g. to let a results list settle first. */
  delayMs?: number;
  /** Default true. */
  burst?: boolean;
  eyebrow?: string;
  /** A node, so it can be a counting number. */
  headline: React.ReactNode;
  subline?: string;
  /** Kanika's one line. Set in the display face, italic. */
  voice?: string;
  action: CeremonyAction;
  secondary?: CeremonyAction;
  /** A stat row, an emblem, anything that belongs between headline and voice. */
  children?: React.ReactNode;
  /** Fired with the burst. Pass null for silence. Default "moment". */
  haptic?: HapticPattern | null;
  /** A full-bleed layer between the veil and the card, e.g. a live canvas. */
  backdrop?: React.ReactNode;
}

function ActionButton({
  action,
  onDismiss,
  primary,
  innerRef,
}: {
  action: CeremonyAction;
  onDismiss: () => void;
  primary: boolean;
  innerRef?: React.Ref<HTMLAnchorElement & HTMLButtonElement>;
}) {
  const className = primary
    ? "block w-full rounded-full bg-[var(--app-gold)] px-6 py-3.5 text-center text-app-body font-semibold uppercase tracking-app-wide text-[var(--app-on-gold)] transition-transform active:scale-[0.97]"
    : "block w-full px-6 py-2.5 text-center text-app-caption uppercase tracking-app-wide text-[var(--app-muted)] transition-colors active:text-[var(--app-text)]";

  const handle = () => {
    action.onClick?.();
    if (!action.href) onDismiss();
  };

  if (action.href) {
    return (
      <Link
        href={action.href}
        ref={innerRef}
        className={className}
        onClick={handle}
      >
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" ref={innerRef} className={className} onClick={handle}>
      {action.label}
    </button>
  );
}

export default function Ceremony({
  open,
  onDismiss,
  delayMs = 0,
  burst = true,
  eyebrow,
  headline,
  subline,
  voice,
  action,
  secondary,
  children,
  haptic: hapticPattern = "moment",
  backdrop,
}: CeremonyProps) {
  const host = useAppOverlay();
  const reducedMotion = useReducedMotion();
  const [burstOn, setBurstOn] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const primaryRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  // Reduced motion collapses every beat to zero: the whole card arrives at once.
  const at = useCallback(
    (beat: number) => (reducedMotion ? 0 : delayMs + beat),
    [reducedMotion, delayMs],
  );

  // Fire the burst and the haptic together, on the same beat.
  useEffect(() => {
    if (!open) {
      setBurstOn(false);
      return;
    }
    if (reducedMotion || !burst) {
      if (hapticPattern) haptic(hapticPattern);
      return;
    }
    const timer = setTimeout(() => {
      setBurstOn(true);
      if (hapticPattern) haptic(hapticPattern);
    }, delayMs + BEAT.burst);
    return () => clearTimeout(timer);
  }, [open, reducedMotion, burst, delayMs, hapticPattern]);

  // Move focus to the way out once it exists, so the moment is reachable by
  // keyboard and announced by a screen reader.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(
      () => primaryRef.current?.focus(),
      at(BEAT.action) + 60,
    );
    return () => clearTimeout(timer);
  }, [open, at]);

  // Escape closes; Tab stays inside.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onDismiss]);

  // Hold the page still underneath, restoring whatever was there before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !host) return null;

  const rise = (beat: number) => ({
    animationDelay: `${at(beat)}ms`,
  });

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={typeof eyebrow === "string" ? eyebrow : "Result"}
      className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-7"
    >
      {/* Opaque, never a backdrop blur: blur is the reliable way to drop
          frames on a mid-range phone, and this sits over a moving canvas.
          Opaque rather than a high-alpha wash because on a dark screen even
          six percent leakage leaves the page behind legible, and the moment
          has to be the only thing there. The vignette is barely a gradient:
          it just lifts the middle so the burst sits in a pool of light. */}
      <span
        aria-hidden
        className="app-veil-in absolute inset-0"
        style={{
          animationDelay: `${at(BEAT.veil)}ms`,
          background:
            "radial-gradient(125% 90% at 50% 44%, #100d0b 0%, #070605 55%, #040303 100%)",
        }}
      />

      {backdrop != null && (
        <span
          aria-hidden
          className="app-veil-in absolute inset-0"
          style={{ animationDelay: `${at(BEAT.veil)}ms`, animationDuration: "1.1s" }}
        >
          {backdrop}
        </span>
      )}

      {burst && (
        <EmberBurst active={burstOn} onDone={() => setBurstOn(false)} />
      )}

      <div
        className="app-pop-in relative flex w-full max-w-[330px] flex-col items-center text-center"
        style={{ animationDelay: `${at(BEAT.card)}ms` }}
      >
        {eyebrow && (
          <p
            className="app-rise mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]"
            style={rise(BEAT.headline)}
          >
            {eyebrow}
          </p>
        )}

        <div
          className="app-rise text-[44px] font-light leading-none text-[var(--app-text)]"
          style={{
            ...rise(BEAT.headline),
            fontFamily: "var(--font-display)",
          }}
        >
          {headline}
        </div>

        {subline && (
          <p
            className="app-rise mt-3 text-app-body leading-relaxed text-[var(--app-muted)]"
            style={rise(BEAT.subline)}
          >
            {subline}
          </p>
        )}

        {children != null && (
          <div className="app-rise mt-6 w-full" style={rise(BEAT.subline)}>
            {children}
          </div>
        )}

        {voice && (
          <p
            className="app-rise mt-6 text-app-lead italic leading-relaxed text-[var(--app-rose)]"
            style={{ ...rise(BEAT.voice), fontFamily: "var(--font-display)" }}
          >
            {voice}
          </p>
        )}

        <div
          className="app-rise mt-8 w-full pb-[max(4px,env(safe-area-inset-bottom))]"
          style={rise(BEAT.action)}
        >
          <ActionButton
            action={action}
            onDismiss={onDismiss}
            primary
            innerRef={primaryRef}
          />
          {secondary && (
            <div className="mt-2">
              <ActionButton
                action={secondary}
                onDismiss={onDismiss}
                primary={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    host,
  );
}
