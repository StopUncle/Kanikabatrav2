"use client";

import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import type { DialogLine, Character } from "@/lib/simulator/types";

interface Props {
  open: boolean;
  /** Lines the player has already passed. Newest last (chronological). */
  lines: DialogLine[];
  characterById: Record<string, Character>;
  onClose: () => void;
}

/**
 * Read-only scrollback panel for dialog the player has already advanced
 * past. Solves the "I tapped twice and lost my place" problem without
 * touching scenario state — the panel reads from a snapshot of seen
 * lines and never mutates the runner.
 *
 * Layered above the runner at z-[80] (below the stuck-recovery overlay
 * at z-[80] as well, but they're never both open). Pointer events on
 * the panel itself stop propagation so they don't reach the runner's
 * tap-anywhere-to-advance handler.
 */
export default function DialogTranscript({
  open,
  lines,
  characterById,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] bg-deep-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onPointerUp={(e) => {
            // Tap on the dim backdrop dismisses; tap inside the card is
            // caught by the inner stopPropagation and does nothing.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <m.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            onPointerUp={(e) => e.stopPropagation()}
            className="max-w-xl w-full max-h-[70vh] bg-deep-black/95 border border-accent-gold/30 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
                Transcript
              </p>
              <button
                onClick={onClose}
                aria-label="Close transcript"
                className="text-text-gray hover:text-accent-gold transition-colors p-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lines.length === 0 ? (
                <p className="text-text-gray/70 text-sm font-light italic text-center py-8">
                  Nothing to read back yet.
                </p>
              ) : (
                lines.map((line, i) => (
                  <TranscriptLine
                    key={i}
                    line={line}
                    characterById={characterById}
                  />
                ))
              )}
            </div>
            <div className="px-5 py-3 border-t border-gray-800 bg-deep-black/60">
              <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.3em] text-center">
                Read only · this does not change your run
              </p>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function TranscriptLine({
  line,
  characterById,
}: {
  line: DialogLine;
  characterById: Record<string, Character>;
}) {
  const explicit = line.tone;
  const isInner =
    explicit === "scene" ||
    (!explicit && (line.speakerId == null || line.speakerId === "inner-voice"));
  const isTactical = explicit === "tactical";
  const speaker = isInner
    ? "Inner voice"
    : isTactical
      ? "Observation"
      : line.speakerId
        ? (characterById[line.speakerId]?.name ?? line.speakerId)
        : "—";

  const labelColor = isInner
    ? "text-text-gray/60"
    : isTactical
      ? "text-accent-gold/55"
      : "text-accent-gold/70";
  const bodyClass = isInner
    ? "italic text-text-gray"
    : isTactical
      ? "text-text-light/80 text-[13px]"
      : "text-white/85";

  return (
    <div className="space-y-1">
      <p className={`text-[10px] uppercase tracking-[0.3em] ${labelColor}`}>
        {speaker}
      </p>
      <p className={`text-sm leading-relaxed font-light ${bodyClass}`}>
        {line.text}
      </p>
    </div>
  );
}
