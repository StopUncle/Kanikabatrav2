"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, FastForward } from "lucide-react";
import type {
  DialogLine,
  DialogTone,
  Character,
} from "@/lib/simulator/types";

/**
 * Splits a dialog line into sentence-length chunks at terminator punctuation
 * (`.`, `!`, `?`, `…`) followed by whitespace. Em-dashes are deliberately
 * NOT split points, they're mid-sentence beats, not sentence ends.
 *
 * Long DialogLines render as multiple sequential chunks so the reader gets
 * rhythm: read chunk, beat, next chunk, instead of forcing through a
 * paragraph in one go.
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
 * Chunked typewriter. Tracks the REVEALED PREFIX LENGTH of each chunk
 * (not the partial string). The renderer uses this to slice the chunk's
 * full text into visible + transparent halves, which keeps every chunk
 * occupying its full layout space from mount and eliminates the upward
 * push the player saw whenever a new chunk appeared.
 *
 * Note: deliberately does NOT honor prefers-reduced-motion. The
 * typewriter is text reveal, not motion, and the immersive pacing is
 * core to the simulator's experience.
 */
function useChunkedTypewriter(text: string) {
  const chunks = useMemo(() => splitIntoChunks(text), [text]);
  const [revealedLengths, setRevealedLengths] = useState<number[]>(() =>
    new Array(chunks.length).fill(0),
  );
  const [done, setDone] = useState(false);
  const cancelledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function baseRate(chunkLen: number): number {
    if (chunkLen <= 40) return 28;
    if (chunkLen <= 100) return 22;
    return 18;
  }

  useEffect(() => {
    cancelledRef.current = false;
    setRevealedLengths(new Array(chunks.length).fill(0));
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

      setRevealedLengths((prev) => {
        const next = prev.slice();
        while (next.length < chunks.length) next.push(0);
        next[chunkIdx] = charIdx;
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
  }, [chunks]);

  function skip() {
    if (done) return;
    cancelledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealedLengths(chunks.map((c) => c.length));
    setDone(true);
  }

  return { chunks, revealedLengths, done, skip };
}

/**
 * Resolve a line's effective tone. Explicit `tone` wins; otherwise infer
 * from speakerId. Used for renderer styling and label resolution.
 */
function effectiveTone(line: DialogLine): DialogTone {
  if (line.tone) return line.tone;
  if (line.speakerId == null || line.speakerId === "inner-voice") {
    return "scene";
  }
  return "dialogue";
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

/**
 * Post-typewriter dwell window. After the typewriter finishes, this many
 * milliseconds pass before a tap-anywhere can advance the dialog. The
 * window exists because the player's mental model is "tap to skip the
 * typewriter"; their reflexive second tap (often within 100-200ms of the
 * first) used to land as an advance, blowing through the next line
 * before they'd finished reading. The dwell turns the second tap into
 * a deliberate gesture rather than a reflex.
 *
 * Explicit Continue button clicks bypass the dwell entirely.
 */
const POST_TYPEWRITER_DWELL_MS = 320;

export default function DialogBox({
  line,
  character,
  isLastLine,
  onAdvance,
  onSkipScene,
}: Props) {
  const { chunks, revealedLengths, done, skip } = useChunkedTypewriter(
    line.text,
  );
  const [tapAdvanceReady, setTapAdvanceReady] = useState(false);

  // Dwell timer: as soon as the typewriter completes, hold tap-advance
  // back for a beat. Reset when the line re-mounts.
  useEffect(() => {
    if (!done) {
      setTapAdvanceReady(false);
      return;
    }
    const timer = setTimeout(
      () => setTapAdvanceReady(true),
      POST_TYPEWRITER_DWELL_MS,
    );
    return () => clearTimeout(timer);
  }, [done]);

  // Background-tap path. Gated by the dwell so a reflex second tap can't
  // accidentally advance.
  function handleTap() {
    if (!done) {
      skip();
      return;
    }
    if (!tapAdvanceReady) return;
    onAdvance();
  }

  // Explicit button click bypasses the dwell — the user pressed a button
  // on purpose. Same skip-or-advance branch.
  function handleButtonClick() {
    if (!done) {
      skip();
    } else {
      onAdvance();
    }
  }

  const handleTapRef = useRef(handleTap);
  useEffect(() => {
    handleTapRef.current = handleTap;
  });
  useEffect(() => {
    const onTap = () => handleTapRef.current();
    window.addEventListener("simulator:tap", onTap);
    return () => window.removeEventListener("simulator:tap", onTap);
  }, []);

  const tone = effectiveTone(line);
  const isInner = tone === "scene";
  const isTactical = tone === "tactical";
  const speakerLabel = isInner
    ? "Inner voice"
    : isTactical
      ? "Observation"
      : (character?.name ?? line.speakerId);

  // Per-tone visuals. The two big shifts:
  //   - tactical lines get a desaturated rail + smaller text + non-italic,
  //     reading as "this is a pattern read, settle in," visually distinct
  //     from both inner-voice scene beats and spoken dialogue
  //   - scene/inner gets the existing italic gray-violet
  //   - dialogue gets the existing off-white
  const labelColor = isInner
    ? "text-text-gray/70"
    : isTactical
      ? "text-accent-gold/55"
      : "text-accent-gold";
  const bodyColor = isInner
    ? "text-text-gray"
    : isTactical
      ? "text-text-light/85"
      : "text-white/95";
  const bodyStyle = isInner ? "italic" : "";
  const railColor = isInner
    ? "bg-text-gray/30"
    : isTactical
      ? "bg-accent-gold/35"
      : "bg-accent-gold/70";
  const railShadow = isTactical
    ? ""
    : "shadow-[0_0_8px_rgba(212,175,55,0.4)]";
  const bodyTextSize = isTactical
    ? "text-[15px] sm:text-base"
    : "text-[17px] sm:text-lg";

  // Index of the chunk currently being typed. Used to position the
  // blinking cursor at the reveal frontier. -1 when nothing's typing yet.
  const activeChunkIdx = (() => {
    for (let i = 0; i < chunks.length; i++) {
      const len = revealedLengths[i] ?? 0;
      if (len > 0 && len < chunks[i].length) return i;
    }
    return -1;
  })();

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
        {/* Persistent speaker rail. Tone-coded so a glance at the rail
            tells you what register you're in before you start reading. */}
        <span
          aria-hidden
          className={`absolute left-0 top-1 bottom-1 w-[4px] rounded-full ${railColor} ${railShadow}`}
        />

        {speakerLabel && (
          <p
            className={`text-xs uppercase tracking-[0.3em] mb-2.5 font-light ${labelColor}`}
          >
            {speakerLabel}
          </p>
        )}

        {/* Chunks render as a stack of paragraphs. Every chunk mounts
            with its FULL text, with the unrevealed suffix wrapped in a
            text-transparent span so it occupies layout space without
            being visible. As the typewriter advances `revealedLengths[i]`,
            characters move from "transparent" to "visible" within the
            same paragraph — no DOM additions, no layout shift. The
            paragraph fades from opacity 0 to 1 the moment its first
            character is revealed, preserving the chat-stream rhythm
            without the upward push the prior implementation produced. */}
        <div className="space-y-5" data-dialog-version="chunked-v3">
          {chunks.map((chunk, i) => {
            const len = revealedLengths[i] ?? 0;
            const visibleText = chunk.slice(0, len);
            const hiddenText = chunk.slice(len);
            const isActive = !done && i === activeChunkIdx;
            const hasAppeared = len > 0;
            return (
              <m.p
                key={`${line.text}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: hasAppeared ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className={`font-light leading-[1.65] ${bodyTextSize} ${bodyColor} ${bodyStyle}`}
              >
                {visibleText}
                {hiddenText && (
                  <span aria-hidden className="text-transparent">
                    {hiddenText}
                  </span>
                )}
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

      {/* Affordance row. The continue button transitions from muted (during
          typewriter and during dwell) to gold (when tap-advance is ready),
          giving the player a clear "now you can move" signal. */}
      <div className="mt-7 flex items-center gap-5 flex-wrap pl-5">
        <button
          onClick={handleButtonClick}
          className={`inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase font-light transition-colors duration-300 focus-visible:outline-none ${
            done && tapAdvanceReady
              ? "text-accent-gold hover:text-accent-gold/80"
              : done
                ? "text-text-gray/80 hover:text-text-light"
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
