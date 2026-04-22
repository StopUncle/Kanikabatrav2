"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, SkipForward } from "lucide-react";
import type { DialogLine, Character } from "@/lib/simulator/types";

function useTypewriter(text: string, speedMs = 22) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
};

export default function DialogBox({
  line,
  character,
  isLastLine,
  onAdvance,
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
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-[2px] h-5 bg-accent-gold ml-1 translate-y-0.5"
          style={{ verticalAlign: "middle" }}
        />
      </p>
      <button
        onClick={handleClick}
        className="mt-8 inline-flex items-center gap-2 text-text-gray/70 hover:text-accent-gold text-xs uppercase tracking-[0.3em] transition-colors"
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
    </m.div>
  );
}
