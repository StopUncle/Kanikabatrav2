"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { PenLine } from "lucide-react";
import type { Choice } from "@/lib/simulator/types";

type Props = {
  scenarioId: string;
  sceneId: string;
  choices: Choice[];
  /** Called with the resolved authored choice when the player confirms. */
  onResolve: (choice: Choice) => void;
};

type Phase =
  | { kind: "collapsed" }
  | { kind: "input" }
  | { kind: "judging" }
  | { kind: "read"; choice: Choice | null; read: string };

const MAX_CHARS = 300;

/**
 * "Type your own move" affordance under the authored choice cards.
 *
 * The typed move goes to the freeform judge, which maps it onto one of
 * the scene's authored choices and returns a Kanika-voice read. The
 * player sees the read, then confirms; confirmation calls onResolve
 * with a real Choice so the engine path is identical to a card tap.
 *
 * Keyed per scene by the parent, so an in-flight judge from a previous
 * scene can never apply a stale choice: the component unmounts and the
 * confirm button disappears with it.
 */
export default function FreeformMove({
  scenarioId,
  sceneId,
  choices,
  onResolve,
}: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: "collapsed" });
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (phase.kind === "input") textareaRef.current?.focus();
  }, [phase.kind]);

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
        setPhase({ kind: "input" });
        return;
      }
      const choice = data.matched
        ? (choices.find((c) => c.id === data.choiceId) ?? null)
        : null;
      setPhase({ kind: "read", choice, read: data.read });
    } catch {
      if (!mountedRef.current) return;
      setError("Connection dropped. Try again or tap a choice.");
      setPhase({ kind: "input" });
    }
  }, [text, scenarioId, sceneId, choices]);

  if (phase.kind === "collapsed") {
    return (
      <div className="max-w-4xl mx-auto w-full px-4 mt-3 flex justify-center">
        <button
          onClick={() => setPhase({ kind: "input" })}
          className="inline-flex items-center gap-2 text-text-gray/70 hover:text-accent-gold text-xs uppercase tracking-[0.25em] font-light transition-colors py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded"
        >
          <PenLine size={12} strokeWidth={1.5} aria-hidden />
          Or type your own move
        </button>
      </div>
    );
  }

  if (phase.kind === "read") {
    return (
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto w-full px-4 mt-4"
      >
        <div className="relative pl-5 mb-4">
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-accent-gold/60"
          />
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-1.5 font-light">
            The read
          </p>
          <p className="text-white/85 font-light leading-relaxed text-sm sm:text-base">
            {phase.read}
          </p>
        </div>
        {phase.choice ? (
          <button
            onClick={() => onResolve(phase.choice as Choice)}
            className="w-full p-4 rounded-xl border border-accent-gold/40 bg-deep-black/70 text-white font-light hover:border-accent-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Make the move
          </button>
        ) : (
          <button
            onClick={() => setPhase({ kind: "input" })}
            className="w-full p-3 rounded-xl border border-white/15 bg-deep-black/70 text-text-gray font-light hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Try again
          </button>
        )}
      </m.div>
    );
  }

  const judging = phase.kind === "judging";

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto w-full px-4 mt-4"
    >
      <div
        className={`rounded-xl border bg-deep-black/70 backdrop-blur-sm p-3 transition-colors ${
          judging ? "border-accent-gold/60" : "border-accent-gold/25 focus-within:border-accent-gold/70"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!judging) void submit();
            }
          }}
          disabled={judging}
          rows={2}
          placeholder="What do you say or do?"
          className="w-full bg-transparent text-white font-light text-sm sm:text-base placeholder:text-text-gray/40 resize-none focus:outline-none disabled:opacity-60"
          aria-label="Type your own move"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-text-gray/40 text-[10px] tracking-wider">
            {text.length}/{MAX_CHARS}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setError(null);
                setPhase({ kind: "collapsed" });
              }}
              disabled={judging}
              className="text-text-gray/60 hover:text-white text-xs font-light transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => void submit()}
              disabled={judging || text.trim().length < 2}
              className="text-accent-gold text-xs uppercase tracking-[0.2em] font-light hover:text-white transition-colors disabled:opacity-40 py-1.5 px-3 border border-accent-gold/40 rounded-lg hover:border-accent-gold"
            >
              {judging ? "Reading..." : "Read my move"}
            </button>
          </div>
        </div>
      </div>
      {judging && (
        <p className="text-accent-gold/60 text-xs font-light mt-2 text-center animate-pulse">
          Kanika is reading your move
        </p>
      )}
      {error && (
        <p className="text-red-400/80 text-xs font-light mt-2 text-center">
          {error}
        </p>
      )}
    </m.div>
  );
}
