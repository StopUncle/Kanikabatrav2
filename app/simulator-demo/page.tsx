"use client";

/**
 * Simulator Demo — visual prototype for the Dark Mirror game port.
 *
 * This is a PREVIEW ROUTE, not production. It exists so Kanika can see the
 * visual direction before we commit to porting 26 scenarios. Delete or gate
 * this route (or move to /consilium/simulator) once the direction is locked.
 *
 * What's shown:
 *   - 1 opening scene, 2 branching paths, 2 endings
 *   - Cinematic letterbox + ambient gradient + particles
 *   - Character silhouette with emotion-driven rim light
 *   - Typewriter dialog with speaker-name system
 *   - Tarot-card-style choice buttons with tactic reveal
 *   - Framer Motion scene transitions
 *   - Ending cinematic with outcome title + tactic mastered
 *
 * What's NOT here (comes later, by design):
 *   - Prisma persistence (no save/resume)
 *   - Auth gating (public route during preview)
 *   - Real scenario porting (these 3 scenes are handwritten placeholders)
 *   - Silhouette variety (one stylized female figure — Maris stand-in)
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, SkipForward, Sparkles } from "lucide-react";

// ---------------------------------------------------------------------------
// Scene data (inline for the prototype — production version reads from DB/files)
// ---------------------------------------------------------------------------

type Emotion = "seductive" | "cold" | "neutral" | "curious";
type OutcomeType = "good" | "neutral" | "bad";

type DialogLine = { speaker: string | null; text: string };

type Choice = {
  id: string;
  label: string;
  tactic: string; // shown on hover — "what you're learning"
  nextSceneId: string;
};

type Scene =
  | {
      id: string;
      type: "dialog";
      backgroundMood: "party" | "danger" | "neutral";
      characterEmotion: Emotion | null; // null = no character on screen
      lines: DialogLine[];
      choices: Choice[] | null; // null = auto-advance
      nextSceneId?: string; // only used when choices is null
    }
  | {
      id: string;
      type: "ending";
      outcome: OutcomeType;
      title: string;
      summary: string;
      tacticMastered: string;
    };

const SCENES: Record<string, Scene> = {
  start: {
    id: "start",
    type: "dialog",
    backgroundMood: "party",
    characterEmotion: null,
    lines: [
      {
        speaker: null,
        text: "The party is too loud, and you already know why you're here.",
      },
      {
        speaker: null,
        text: "Maris is by the window. Everyone orbits her. Nobody lands.",
      },
      {
        speaker: null,
        text: "You have a choice. Walk up now and take your shot — or stay back and watch her for a minute.",
      },
    ],
    choices: [
      {
        id: "observe",
        label: "Hang back and watch her work the room",
        tactic: "Pattern recognition before engagement",
        nextSceneId: "path-observe",
      },
      {
        id: "approach",
        label: "Walk straight over and introduce yourself",
        tactic: "Confidence play — but you just made yourself a target",
        nextSceneId: "path-approach",
      },
    ],
  },

  "path-observe": {
    id: "path-observe",
    type: "dialog",
    backgroundMood: "neutral",
    characterEmotion: "cold",
    lines: [
      {
        speaker: null,
        text:
          "You lean against the wall and watch. Five minutes. Ten. The same tilt of the head. The same laugh — perfectly timed.",
      },
      {
        speaker: null,
        text:
          "It isn't charm. It's choreography. And now you can see the cues.",
      },
      {
        speaker: null,
        text:
          "She glances at you once. Calculating. Then back to the crowd. You didn't flinch. That registered.",
      },
    ],
    choices: [
      {
        id: "walk-away",
        label: "Walk away. Let her wonder who you were.",
        tactic: "Non-pursuit — control through absence",
        nextSceneId: "ending-observe",
      },
    ],
  },

  "path-approach": {
    id: "path-approach",
    type: "dialog",
    backgroundMood: "danger",
    characterEmotion: "seductive",
    lines: [
      { speaker: "Maris", text: "Oh — you're brave." },
      { speaker: "You", text: "Thought you looked bored." },
      {
        speaker: "Maris",
        text:
          "I was. Now I'm curious. Careful, though — you just walked onto my stage.",
      },
      {
        speaker: null,
        text:
          "Her smile is warm. Her eyes are doing math. You feel seen, but not the way you wanted.",
      },
    ],
    choices: [
      {
        id: "stay",
        label: "Stay — you can play this",
        tactic: "Doubling down — she's already deciding your role",
        nextSceneId: "ending-approach",
      },
    ],
  },

  "ending-observe": {
    id: "ending-observe",
    type: "ending",
    outcome: "good",
    title: "Pattern Recognition",
    summary:
      "You saw the script before she read it to you. That's the whole game — not beating her at it, but recognizing it exists.",
    tacticMastered: "Observation before engagement",
  },

  "ending-approach": {
    id: "ending-approach",
    type: "ending",
    outcome: "bad",
    title: "The Audition",
    summary:
      "You walked onto her stage, and she started writing your lines before you realized you were being cast. You'll enjoy this. That's the trap.",
    tacticMastered: "What love-bombing looks like from the inside",
  },
};

// ---------------------------------------------------------------------------
// Typewriter hook — reveals text char-by-char; skip() completes instantly
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Background — mood-driven gradient + slow-drifting ambient particles
// ---------------------------------------------------------------------------

function MoodBackground({ mood }: { mood: "party" | "danger" | "neutral" }) {
  const gradient =
    mood === "party"
      ? "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(114,33,57,0.3), transparent 55%)"
      : mood === "danger"
        ? "radial-gradient(ellipse at 50% 20%, rgba(180,30,60,0.18), transparent 65%), radial-gradient(ellipse at 70% 80%, rgba(40,10,20,0.8), transparent 60%)"
        : "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07), transparent 70%)";

  // Deterministic particle positions so SSR and CSR render identically —
  // avoids hydration mismatches when using Math.random() inline.
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        delay: (i % 8) * 0.4,
        size: 1 + (i % 3) * 0.6,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: gradient }}
      />
      {particles.map((p, i) => (
        <m.span
          key={i}
          className="absolute rounded-full bg-accent-gold/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: 6 + (i % 4),
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Letterbox — cinematic top/bottom bars that slide in on mount
// ---------------------------------------------------------------------------

function Letterbox() {
  return (
    <>
      <m.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 0.95] }}
        className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-black z-40 pointer-events-none"
      />
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 0.95] }}
        className="fixed bottom-0 left-0 right-0 h-14 sm:h-16 bg-black z-40 pointer-events-none"
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Character silhouette — one stylized female figure, rim-lit by emotion
// ---------------------------------------------------------------------------

function CharacterSilhouette({ emotion }: { emotion: Emotion | null }) {
  if (!emotion) return null;

  const rimColor =
    emotion === "seductive"
      ? "rgba(212,175,55,0.8)" // warm gold
      : emotion === "cold"
        ? "rgba(120,170,220,0.55)" // cold blue
        : emotion === "curious"
          ? "rgba(220,200,140,0.65)"
          : "rgba(180,180,180,0.4)";

  return (
    <m.div
      key={emotion}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative w-48 h-64 sm:w-64 sm:h-80 mx-auto"
    >
      {/* Rim glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: rimColor }}
      />
      {/* Silhouette SVG — stylized, anonymous, unnervingly still */}
      <svg
        viewBox="0 0 200 280"
        className="relative w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
      >
        <defs>
          <linearGradient id="silhouette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1012" />
            <stop offset="100%" stopColor="#050304" />
          </linearGradient>
          <linearGradient id="rimlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={rimColor} stopOpacity="0" />
            <stop offset="50%" stopColor={rimColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={rimColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Body */}
        <path
          d="M100 40 Q120 40 128 60 Q132 75 128 90 L132 100 Q150 110 152 140 L148 180 Q146 210 140 240 L132 275 L68 275 L60 240 Q54 210 52 180 L48 140 Q50 110 68 100 L72 90 Q68 75 72 60 Q80 40 100 40 Z"
          fill="url(#silhouette)"
        />
        {/* Subtle rim light along one edge */}
        <path
          d="M100 40 Q120 40 128 60 Q132 75 128 90 L132 100 Q150 110 152 140"
          fill="none"
          stroke="url(#rimlight)"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Slight idle breathing */}
      </svg>
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// Dialog box — typewriter reveal + speaker name + skip affordance
// ---------------------------------------------------------------------------

function DialogBox({
  line,
  isLastLine,
  onAdvance,
}: {
  line: DialogLine;
  isLastLine: boolean;
  onAdvance: () => void;
}) {
  const { revealed, done, skip } = useTypewriter(line.text);

  function handleClick() {
    if (!done) {
      skip();
    } else {
      onAdvance();
    }
  }

  return (
    <m.div
      key={line.text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto px-6"
    >
      {line.speaker && (
        <p className="text-accent-gold text-xs uppercase tracking-[0.35em] mb-3 font-light">
          {line.speaker}
        </p>
      )}
      <p
        className={`text-white font-light leading-relaxed text-lg sm:text-xl ${
          line.speaker === null ? "italic text-text-gray" : ""
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

// ---------------------------------------------------------------------------
// Choice cards — tarot-style, hover reveals the tactic you're learning
// ---------------------------------------------------------------------------

function ChoiceCards({
  choices,
  onPick,
}: {
  choices: Choice[];
  onPick: (c: Choice) => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-4xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {choices.map((c, i) => (
        <m.button
          key={c.id}
          onClick={() => onPick(c)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative text-left p-6 rounded-xl border border-accent-gold/25 bg-deep-black/70 backdrop-blur-sm hover:border-accent-gold/70 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.35)] transition-all"
        >
          {/* Subtle gold sheen on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-accent-gold/5 to-transparent" />
          <p className="relative text-white font-light text-base sm:text-lg leading-snug mb-3">
            {c.label}
          </p>
          <p className="relative text-text-gray/60 text-xs italic leading-relaxed border-t border-accent-gold/10 pt-3">
            <Sparkles
              size={10}
              className="inline-block mr-1.5 text-accent-gold/70"
              strokeWidth={1.5}
            />
            {c.tactic}
          </p>
        </m.button>
      ))}
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// Ending screen — scroll-driven reveal of outcome + tactic mastered
// ---------------------------------------------------------------------------

function EndingScreen({
  scene,
  onRestart,
}: {
  scene: Extract<Scene, { type: "ending" }>;
  onRestart: () => void;
}) {
  const outcomeColor =
    scene.outcome === "good"
      ? "text-accent-gold"
      : scene.outcome === "bad"
        ? "text-red-400"
        : "text-text-light";

  const outcomeLabel =
    scene.outcome === "good"
      ? "Mastery"
      : scene.outcome === "bad"
        ? "Cost"
        : "Outcome";

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-2xl text-center">
        <m.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`uppercase text-xs mb-8 ${outcomeColor}`}
        >
          {outcomeLabel}
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-5xl sm:text-6xl font-extralight text-white mb-8 tracking-wide"
        >
          {scene.title}
        </m.h1>

        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-24 h-px bg-accent-gold mx-auto mb-10 origin-center"
        />

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-text-gray text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
        >
          {scene.summary}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="inline-block px-6 py-4 rounded-full border border-accent-gold/30 mb-14"
        >
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-1">
            Tactic Learned
          </p>
          <p className="text-white font-light text-sm tracking-wide">
            {scene.tacticMastered}
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm rounded-full hover:bg-accent-gold/90 transition-all"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            Replay Scenario
          </button>
        </m.div>
      </div>
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// Page — orchestrates scene state + renders the active view
// ---------------------------------------------------------------------------

export default function SimulatorDemoPage() {
  const [sceneId, setSceneId] = useState("start");
  const [lineIndex, setLineIndex] = useState(0);
  const scene = SCENES[sceneId];

  function advanceLine() {
    if (scene.type !== "dialog") return;
    if (lineIndex < scene.lines.length - 1) {
      setLineIndex((i) => i + 1);
      return;
    }
    // Last line — if no choices and auto-advance nextSceneId is set, go there
    if (!scene.choices && scene.nextSceneId) {
      setSceneId(scene.nextSceneId);
      setLineIndex(0);
    }
    // If choices exist, the ChoiceCards render and user picks next scene
  }

  function pickChoice(c: Choice) {
    setSceneId(c.nextSceneId);
    setLineIndex(0);
  }

  function restart() {
    setSceneId("start");
    setLineIndex(0);
  }

  // Ending screen — totally separate render path
  if (scene.type === "ending") {
    return (
      <div className="fixed inset-0 z-[60] bg-deep-black overflow-hidden">
        <MoodBackground mood="neutral" />
        <Letterbox />
        <AnimatePresence mode="wait">
          <EndingScreen key={scene.id} scene={scene} onRestart={restart} />
        </AnimatePresence>
      </div>
    );
  }

  // Dialog scene
  const currentLine = scene.lines[lineIndex];
  const isLastLine = lineIndex === scene.lines.length - 1;
  const showChoices = isLastLine && scene.choices && scene.choices.length > 0;

  return (
    <div className="fixed inset-0 z-[60] bg-deep-black overflow-hidden flex flex-col">
      <MoodBackground mood={scene.backgroundMood} />
      <Letterbox />

      {/* Chapter / scene label — top of the screen, just under letterbox */}
      <div className="relative z-30 pt-20 sm:pt-24 text-center">
        <p className="text-accent-gold/60 text-[10px] uppercase tracking-[0.5em]">
          University · Level 1 · Demo
        </p>
      </div>

      {/* Character area */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {scene.characterEmotion && (
            <CharacterSilhouette
              key={scene.id}
              emotion={scene.characterEmotion}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Dialog + choices */}
      <div className="relative z-20 pb-24 sm:pb-28 flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {!showChoices && (
            <DialogBox
              key={`${scene.id}-${lineIndex}`}
              line={currentLine}
              isLastLine={isLastLine}
              onAdvance={advanceLine}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChoices && scene.choices && (
            <ChoiceCards choices={scene.choices} onPick={pickChoice} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
