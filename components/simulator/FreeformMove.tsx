"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import type { Choice } from "@/lib/simulator/types";
import ChoiceCards from "./ChoiceCards";

type Props = {
  scenarioId: string;
  sceneId: string;
  choices: Choice[];
  /** Plays a resolved authored choice (freeform-mapped or tapped card). */
  onResolve: (choice: Choice) => void;
};

type Phase =
  | { kind: "compose" }
  | { kind: "judging" }
  | { kind: "read"; choice: Choice | null; read: string };

const MAX_CHARS = 300;

/**
 * The move composer. Writing your own move is the hero input; the
 * authored choices are demoted to an optional "see the options" reveal
 * for players who want the scaffold. Both paths resolve to a real
 * authored Choice and flow through the same engine path (onResolve),
 * so XP, streaks, replays, and server validation are identical.
 *
 * Keyed per scene by the parent, so an in-flight judge from a previous
 * scene unmounts with its confirm button and can never apply a stale
 * choice to the wrong scene.
 */
export default function FreeformMove({
  scenarioId,
  sceneId,
  choices,
  onResolve,
}: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: "compose" });
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const submit = useCallback(async () => {
    const move = text.trim();
    if (move.length < 2) return;
    setError(null);
    setPhase({ kind: "judging" });
    try {
      const res = await fetch("/api/simulator/freeform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId, sceneId, text: move }),
      });
      const data = await res.json();
      if (!mountedRef.current) return;
      if (!res.ok) {
        setError(data.error ?? "Could not read your move. Try again.");
        setPhase({ kind: "compose" });
        return;
      }
      const choice = data.matched
        ? (choices.find((c) => c.id === data.choiceId) ?? null)
        : null;
      setPhase({ kind: "read", choice, read: data.read });
    } catch {
      if (!mountedRef.current) return;
      setError("Connection dropped. Try again, or see the options.");
      setPhase({ kind: "compose" });
    }
  }, [text, scenarioId, sceneId, choices]);

  // The read: Kanika's voice on what the move just did.
  if (phase.kind === "read") {
    return (
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto w-full px-4"
      >
        <div className="relative pl-5 mb-5">
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-accent-gold"
          />
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-2 font-light">
            The read
          </p>
          <p className="text-white/90 font-light leading-relaxed text-base sm:text-lg">
            {phase.read}
          </p>
        </div>
        {phase.choice ? (
          <button
            onClick={() => onResolve(phase.choice as Choice)}
            className="group w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-accent-gold/50 bg-accent-gold/[0.06] text-white font-light tracking-wide hover:border-accent-gold hover:bg-accent-gold/[0.1] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Make the move
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        ) : (
          <button
            onClick={() => {
              setText("");
              setPhase({ kind: "compose" });
            }}
            className="w-full p-3.5 rounded-xl border border-white/15 bg-deep-black/70 text-text-gray font-light hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Rewrite your move
          </button>
        )}
      </m.div>
    );
  }

  const judging = phase.kind === "judging";

  return (
    <div className="max-w-xl mx-auto w-full px-4">
      {/* Hero input: writing your own move is the headline interaction. */}
      <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-2 font-light text-center">
        Your move
      </p>
      <div
        className={`rounded-2xl border bg-deep-black/70 transition-colors ${
          judging
            ? "border-accent-gold/70"
            : "border-accent-gold/30 focus-within:border-accent-gold/70"
        }`}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!judging) void submit();
            }
          }}
          disabled={judging}
          rows={3}
          placeholder="What do you say or do? Type it the way you would mean it."
          className="w-full bg-transparent text-white font-light text-base sm:text-lg leading-relaxed placeholder:text-text-gray/40 resize-none focus:outline-none disabled:opacity-60 px-4 pt-4 pb-2"
          aria-label="Write your own move"
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-text-gray/40 text-[10px] tracking-wider tabular-nums">
            {text.length}/{MAX_CHARS}
          </span>
          <button
            onClick={() => void submit()}
            disabled={judging || text.trim().length < 2}
            className="group inline-flex items-center gap-2 text-deep-black bg-accent-gold hover:bg-accent-gold/90 text-xs uppercase tracking-[0.2em] font-medium rounded-lg px-4 py-2.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {judging ? "Reading..." : "Make your move"}
            {!judging && (
              <ArrowRight
                size={13}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
          </button>
        </div>
      </div>

      {judging && (
        <p className="text-accent-gold/60 text-xs font-light mt-3 text-center animate-pulse">
          Kanika is reading your move
        </p>
      )}
      {error && (
        <p className="text-red-400/80 text-xs font-light mt-3 text-center">
          {error}
        </p>
      )}

      {/* The authored options, demoted to an opt-in scaffold. Confident
          players never open it; a stuck player taps once to see the
          shape of the available moves and can play one directly. */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowOptions((v) => !v)}
          className="inline-flex items-center gap-1.5 text-text-gray/55 hover:text-accent-gold/90 text-[11px] uppercase tracking-[0.25em] font-light transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded"
          aria-expanded={showOptions}
        >
          <LayoutGrid size={11} strokeWidth={1.5} aria-hidden />
          {showOptions ? "Hide the options" : "Stuck? See the options"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {showOptions && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <ChoiceCards
                key={`cards-${sceneId}`}
                choices={choices}
                onPick={onResolve}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
