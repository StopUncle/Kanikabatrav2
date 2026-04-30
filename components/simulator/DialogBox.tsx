"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, FastForward } from "lucide-react";
import type { DialogLine, Character } from "@/lib/simulator/types";

/**
 * Splits a dialog line into sentence-length chunks at terminator punctuation
 * (`.`, `!`, `?`, `…`) followed by whitespace. Em-dashes are deliberately
 * NOT split points, they're mid-sentence beats, not sentence ends.
 *
 * This is the central anti-fatigue move: long DialogLines (the catalogue
 * has lines up to 518 chars) render as multiple sequential chunks instead
 * of one wall of text. The reader gets rhythm, read chunk, beat, next
 * chunk, instead of forcing through a paragraph.
 *
 * Run-of-terminators ("..." or "?!") are preserved as a single terminal
 * so we don't fragment ellipses. Trailing fragments without terminal
 * punctuation are kept as their own chunk.
 */
function splitIntoChunks(text: string): string[] {
  const out: string[] = [];
  const re = /[.!?…]+\s+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const end = m.index + m[0].length;
    const chunk = text.slice(last, end).trim();
    if (chunk) out.push(chunk);
    last = end;
  }
  const tail = text.slice(last).trim();
  if (tail) out.push(tail);
  return out.length ? out : [text];
}

/** Punctuation-aware delay for the just-typed character. */
function delayAfter(char: string, baseRate: number): number {
  if (char === "." || char === "!" || char === "?") return 180;
  if (char === "…") return 220;
  if (char === ",") return 60;
  if (char === ";" || char === ":") return 90;
  if (char === "—") return 100;
  return baseRate;
}

/**
 * Chunked typewriter, types each chunk character-by-character, pauses
 * briefly between chunks (the "beat"), respects punctuation pauses
 * within a chunk. `revealed` is an array of progressively-typed strings,
 * one per chunk. `revealed[i]` is the prefix of `chunks[i]` shown so far.
 *
 * Note: this deliberately does NOT honor prefers-reduced-motion. The
 * typewriter is text reveal, not motion, and the immersive pacing is
 * core to the simulator's experience. Other reduced-motion respects
 * (SceneShake, ImmersionOverlay, particle motion) remain in place.
 */
function useChunkedTypewriter(text: string) {
  const chunks = splitIntoChunks(text);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const cancelledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Per-chunk base rate. Short chunks tick at human-comfortable pace;
  // longer chunks tick faster so reveal time stays bounded. Capped so
  // even a 200-char "chunk" doesn't slap on screen, we still want to
  // see the type-on, just at scanning speed.
  function baseRate(chunkLen: number): number {
    if (chunkLen <= 40) return 28;
    if (chunkLen <= 100) return 22;
    return 18;
  }

  useEffect(() => {
    cancelledRef.current = false;
    setRevealed([]);
    setDone(false);

    let chunkIdx = 0;
    let charIdx = 0;

    function step() {
      if (cancelledRef.current) return;
      if (chunkIdx >= chunks.length) {
        setDone(true);
        return;
      }
      const chunk = chunks[chunkIdx];
      charIdx += 1;

      setRevealed((prev) => {
        const next = prev.slice();
        while (next.length <= chunkIdx) next.push("");
        next[chunkIdx] = chunk.slice(0, charIdx);
        return next;
      });

      if (charIdx >= chunk.length) {
        chunkIdx += 1;
        charIdx = 0;
        if (chunkIdx < chunks.length) {
          // Inter-chunk beat. ~280ms gives the eye time to land on the
          // period and feel the sentence end before the next one starts.
          timerRef.current = setTimeout(step, 280);
        } else {
          setDone(true);
        }
        return;
      }

      const justTyped = chunk[charIdx - 1];
      timerRef.current = setTimeout(
        step,
        delayAfter(justTyped, baseRate(chunk.length)),
      );
    }

    timerRef.current = setTimeout(step, 60);
    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  function skip() {
    if (done) return;
    cancelledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealed(chunks);
    setDone(true);
  }

  return { chunks, revealed, done, skip };
}

type Props = {
  line: DialogLine;
  character?: Character;
  isLastLine: boolean;
  onAdvance: () => void;
  /**
   * Optional skip-scene callback. When present, a small "Skip scene"
   * button appears alongside Continue, jumps past every remaining
   * dialog line in the current scene straight to the choices.
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
  const { chunks, revealed, done, skip } = useChunkedTypewriter(line.text);

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as unknown as { __dialogV2?: boolean }).__dialogV2) {
      (window as unknown as { __dialogV2?: boolean }).__dialogV2 = true;
      // eslint-disable-next-line no-console
      console.log("[DialogBox] chunked-v2 active, chunks per line:", chunks.length);
    }
  }, [chunks.length]);

  function handleClick() {
    if (!done) {
      skip();
    } else {
      onAdvance();
    }
  }

  const handleClickRef = useRef(handleClick);
  useEffect(() => {
    handleClickRef.current = handleClick;
  });
  useEffect(() => {
    const onTap = () => handleClickRef.current();
    window.addEventListener("simulator:tap", onTap);
    return () => window.removeEventListener("simulator:tap", onTap);
  }, []);

  const isInnerVoice = line.speakerId == null || line.speakerId === "inner-voice";
  const speakerLabel = isInnerVoice
    ? "Inner voice"
    : (character?.name ?? line.speakerId);

  // Color tokens per voice type. Inner voice gets a desaturated
  // gray-violet so it visually separates from spoken dialog without
  // being noisy. Spoken keeps off-white for read-comfort.
  const bodyColor = isInnerVoice ? "text-text-gray" : "text-white/95";
  const bodyStyle = isInnerVoice ? "italic" : "";
  const railColor = isInnerVoice ? "bg-text-gray/30" : "bg-accent-gold/70";

  // Last chunk index that has any text in it, used for the cursor
  // placement so the blink lives at the actual reveal frontier.
  const activeChunkIdx = Math.max(
    0,
    revealed.findLastIndex((c) => c.length > 0),
  );

  return (
    <m.div
      key={line.text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35 }}
      className="max-w-xl mx-auto px-6"
    >
      <div className="relative pl-5">
        {/* Persistent speaker rail. 3px gold (or gray for inner voice)
            on the left edge of the dialog block, your eye locks onto
            "who's speaking" without re-reading the label every line. */}
        <span
          aria-hidden
          className={`absolute left-0 top-1 bottom-1 w-[4px] rounded-full ${railColor} shadow-[0_0_8px_rgba(212,175,55,0.4)]`}
        />

        {speakerLabel && (
          <p
            className={`text-xs uppercase tracking-[0.3em] mb-2.5 font-light ${
              isInnerVoice ? "text-text-gray/70" : "text-accent-gold"
            }`}
          >
            {speakerLabel}
          </p>
        )}

        {/* Chunks render as a stack of paragraphs. Each chunk fades in
            briefly when the typewriter starts populating it, gives a
            chat-stream rhythm even though we're inside a single dialog
            line semantically. The blinking cursor lives only on the
            currently-typing chunk. */}
        <div className="space-y-5" data-dialog-version="chunked-v2">
          {chunks.map((chunk, i) => {
            const visible = revealed[i] ?? "";
            const isActive = !done && i === activeChunkIdx;
            const isPending = visible.length === 0 && !done;
            if (isPending) return null;
            return (
              <m.p
                key={`${line.text}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`font-light leading-[1.65] text-[17px] sm:text-lg ${bodyColor} ${bodyStyle}`}
              >
                {visible}
                {isActive && (
                  <m.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="inline-block w-[2px] h-4 bg-accent-gold ml-1 translate-y-[1px]"
                    style={{ verticalAlign: "middle" }}
                  />
                )}
              </m.p>
            );
          })}
        </div>
      </div>

      {/* Affordance row. The continue button is more visible now —
          larger, gold-tinted on hover, with a clear arrow. The "Skip"
          mid-typing variant is muted because skipping is the secondary
          path; reading is the primary one. */}
      <div className="mt-7 flex items-center gap-5 flex-wrap pl-5">
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase font-light transition-colors focus-visible:outline-none ${
            done
              ? "text-accent-gold hover:text-accent-gold/80"
              : "text-text-gray/60 hover:text-text-gray"
          }`}
        >
          {done ? (
            <>
              {isLastLine ? "Decide" : "Continue"}
              <ArrowRight size={14} strokeWidth={1.6} />
            </>
          ) : (
            <>
              Skip
              <ArrowRight size={12} strokeWidth={1.5} />
            </>
          )}
        </button>
        {onSkipScene && (
          <button
            onClick={onSkipScene}
            className="inline-flex items-center gap-1.5 text-text-gray/40 hover:text-text-gray/70 text-[10px] uppercase tracking-[0.3em] transition-colors focus-visible:outline-none"
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
