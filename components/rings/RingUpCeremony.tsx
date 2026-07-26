"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import { ringByLevel } from "@/lib/standing/config";
import { tracksOpeningAt, TRACK_LABELS } from "@/lib/simulator/track-gates";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import RingEmblem from "./RingEmblem";

/**
 * The ring-up ceremony: a full-screen moment fired when a completion
 * crosses a Standing threshold (the `ringUp` payload from
 * /api/simulator/complete). Sequence: black veil, the emblem holding
 * the old ring, an ignition burst as the new ring lights, then the
 * rank name. Player dismisses when ready, same rule as the
 * ending screen (no auto-advance).
 *
 * Mounts on top of the ending screen after a delay so the XP count-up
 * finishes before the veil drops. Reduced motion collapses the whole
 * sequence into a static card.
 */

export type RingUpPayload = {
  fromLevel: number;
  toLevel: number;
  ringName: string;
};

type Props = {
  ringUp: RingUpPayload | null;
  onDismiss: () => void;
  /** Wait before the veil drops, letting the ending screen land first. */
  delayMs?: number;
};

export default function RingUpCeremony({
  ringUp,
  onDismiss,
  delayMs = 3400,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ignited, setIgnited] = useState(false);
  // Portal to document.body, same trick as SimulatorRunner: the member
  // layout (and the initiation page) wrap content in `relative z-10`,
  // which traps an in-tree fixed overlay under the portaled runner no
  // matter how high its own z-index is. Null until mount for SSR.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!ringUp) {
      setVisible(false);
      setIgnited(false);
      return;
    }
    const show = setTimeout(() => setVisible(true), reduceMotion ? 0 : delayMs);
    return () => clearTimeout(show);
  }, [ringUp, delayMs, reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    if (reduceMotion) {
      setIgnited(true);
      return;
    }
    const t = setTimeout(() => setIgnited(true), 1100);
    return () => clearTimeout(t);
  }, [visible, reduceMotion]);

  if (!ringUp || !portalReady) return null;
  const ring = ringByLevel(ringUp.toLevel);
  // Doors that open at this ring (plan §3.2): named in the ceremony so
  // the advancement is a key, not just a title.
  const opened = tracksOpeningAt(ringUp.toLevel).map((t) => TRACK_LABELS[t]);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <m.div
          key="ring-up"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center px-6 text-center"
          style={{ background: "rgba(5,5,17,0.97)" }}
        >
          <div className="relative flex items-center justify-center">
            {ignited && !reduceMotion && (
              <m.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.6, 2.0] }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute pointer-events-none w-72 h-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.12) 50%, transparent 80%)",
                }}
              />
            )}
            <m.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: ignited && !reduceMotion ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.2 }}
            >
              <RingEmblem
                level={ignited ? ringUp.toLevel : ringUp.fromLevel}
                size={180}
              />
            </m.div>
          </div>

          <m.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 1.5 }}
            className="mt-8 text-text-gray uppercase tracking-[0.4em] text-[10px]"
          >
            You have advanced
          </m.p>

          <m.h2
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 1.7 }}
            className="mt-3 text-3xl md:text-4xl font-extralight uppercase tracking-[0.25em] text-warm-gold"
            style={{ textShadow: "0 0 24px rgba(212,175,55,0.35)" }}
          >
            {ring.name}
          </m.h2>

          {opened.length > 0 && (
            <m.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 2.2 }}
              className="mt-5 text-warm-gold/80 text-xs uppercase tracking-[0.25em]"
            >
              {ring.name} opens: {opened.join(" · ")}
            </m.p>
          )}

          <m.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 2.4 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <span className="block h-px w-12 bg-warm-gold/40" />
            <p className="text-text-gray text-sm">
              Every rank is earned.
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="px-8 py-3 rounded-full border border-warm-gold/40 text-warm-gold uppercase tracking-[0.3em] text-xs hover:bg-warm-gold/10 transition-colors"
            >
              Continue
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
