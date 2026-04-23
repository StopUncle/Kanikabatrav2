"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, SkipForward, FastForward } from "lucide-react";
import type { DialogLine, Character } from "@/lib/simulator/types";

/**
 * Typewriter with length-aware pacing. Short pithy lines reveal close to
 * reading speed; long interior-voice beats slow slightly so the player
 * isn't sitting waiting on the cursor. Respects prefers-reduced-motion
 * by revealing the whole line instantly.
 */
function useTypewriter(text: string) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Per-line speed: faster on long lines so the reveal rate stays close
  // to comfortable reading speed regardless of length.
  const speedMs = text.length <= 60 ? 28 : text.length <= 140 ? 22 : 16;

  useEffect(() => {
    // prefers-reduced-motion: skip the reveal entirely, mount as "done".
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealed(text);
      setDone(true);
      return;
    }

    setRevealed("");
    setDone(false);
    let i = 0;
    function tick() {
      i += 1;
      setRevealed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        return;
      }
      timerRef.current = setTimeout(tick, speedMs);
    }
    timerRef.current = setTimeout(tick, speedMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speedMs]);

  function skip() {
    if (done) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealed(text);
    setDone(true);
  }

  return { revealed, done, skip };
}

type Props = {
  line: DialogLine;
  character?: Character;
  isLastLine: boolean;
  onAdvance: () => void;
  /**
   * Optional skip-scene callback. When present, a small "Skip scene"
   * button appears alongside Continue — jumps past every remaining
   * dialog line in the current scene straight to the choices.
   * Intended for replayers who don't want to re-read dialog they've
   * already seen.
   */
  onSkipScene?: () => void;
};

export default function DialogBox({
  line,
  character,
  isLastLine,
  onAdvance,
  onSkipScene,
}: Props) {
  const { revealed, done, skip } = useTypewriter(line.text);

  function handleClick() {
    if (!done) {
      skip();
    } else {
      onAdvance();
    }
  }

  // Tap-anywhere-to-advance.
  // SimulatorRunner dispatches a "simulator:tap" event whenever the
  // player clicks on the game background (not on a button/link, not
  // while choices are showing). We handle it identically to the
  // Continue/Skip button: if the typewriter is mid-way, finish the
  // line; otherwise advance. The ref pattern keeps the listener
  // attached to the latest `handleClick` closure without re-binding
  // the window listener on every render.
  const handleClickRef = useRef(handleClick);
  useEffect(() => {
    handleClickRef.current = handleClick;
  });
  useEffect(() => {
    const onTap = () => handleClickRef.current();
    window.addEventListener("simulator:tap", onTap);
    return () => window.removeEventListener("simulator:tap", onTap);
  }, []);

  const speakerLabel = line.speakerId
    ? (character?.name ?? line.speakerId)
    : null;

  return (
    <m.div
      key={line.text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto px-6"
    >
      {speakerLabel && (
        <p className="text-accent-gold text-xs uppercase tracking-[0.35em] mb-3 font-light">
          {speakerLabel}
        </p>
      )}
      <p
        className={`text-white font-light leading-relaxed text-lg sm:text-xl ${
          line.speakerId == null ? "italic text-text-gray" : ""
        }`}
      >
        {revealed}
        <m.span
          animate={done ? { opacity: [0, 1, 0] } : { opacity: 1 }}
          transition={
            done
              ? { duration: 1, repeat: Infinity }
              : { duration: 0 }
          }
          className="inline-block w-[2px] h-5 bg-accent-gold ml-1 translate-y-0.5"
          style={{ verticalAlign: "middle" }}
        />
      </p>
      <div className="mt-8 flex items-center gap-6 flex-wrap">
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-text-gray/70 hover:text-accent-gold text-xs uppercase tracking-[0.3em] transition-colors focus-visible:outline-none focus-visible:text-accent-gold"
        >
          {done ? (
            <>
              {isLastLine ? "Decide" : "Continue"}
              <ArrowRight size={14} strokeWidth={1.5} />
            </>
          ) : (
            <>
              Skip
              <SkipForward size={14} strokeWidth={1.5} />
            </>
          )}
        </button>
        {onSkipScene && (
          <button
            onClick={onSkipScene}
            className="inline-flex items-center gap-1.5 text-text-gray/40 hover:text-text-gray/80 text-[10px] uppercase tracking-[0.3em] transition-colors focus-visible:outline-none focus-visible:text-text-gray/80"
            title="Skip past all remaining dialog in this scene"
          >
            <FastForward size={11} strokeWidth={1.5} />
            Skip scene
          </button>
        )}
      </div>
    </m.div>
  );
}
