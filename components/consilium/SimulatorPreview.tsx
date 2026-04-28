"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, Flame } from "lucide-react";
import CharacterSilhouette from "@/components/simulator/CharacterSilhouette";
import type { Character, EmotionType } from "@/lib/simulator/types";

/**
 * SimulatorPreview — autoplaying faux scene-runner for the landing page.
 *
 * Plays three short scenes lifted from real Consilium scenarios on a
 * loop. The point is sales: the viewer sees the actual product running
 * (typewriter dialog, choice cards, the optimal pick getting selected
 * with an XP floater and tactic reveal) and feels the loop click in.
 *
 * Visual rebuild (April 2026):
 *   - Killed the floating Venetian half-mask. It read as a "weird floating
 *     thing" — abstract art with no relationship to what's actually on
 *     screen during real play. Replaced with the real game's
 *     CharacterSilhouette component, the same hand-rolled SVG body+head
 *     used inside scenarios. Now the preview looks like a still frame
 *     from the real game, not a marketing mock-up.
 *   - Each scene gets a Character object (inline — these are preview-only
 *     casting; the real registry lives in lib/simulator/characters.ts) so
 *     the silhouette pulls the right hair shape, body lean, and rim-light
 *     hue from the emotion.
 *
 * Why three scenes:
 *   1. Romance — 10pm DM (Maris, seductive) — mystery, intrigue
 *   2. Workplace — credit theft (Marcus, smirking) — every pro recognises
 *   3. Friendship — gala fishing trip (Alex, curious) — info-discipline
 *
 * Each scene's optimal choice is what gets "picked" so the viewer sees
 * the gold flash, the tactic reveal, the XP +10 — the dopamine the
 * real product delivers.
 */

interface PreviewChoice {
  text: string;
  isOptimal: boolean;
  tactic: string;
}

interface PreviewScene {
  context: string;
  /** The actual game-engine character used to render the silhouette. */
  character: Character;
  /** Emotion override — drives the rim-light hue and body lean. */
  emotion: EmotionType;
  /** Mood key — drives the backdrop gradient. */
  mood: "mysterious" | "tense" | "danger";
  speakerLine: string;
  innerVoiceLine: string;
  choices: [PreviewChoice, PreviewChoice];
}

const SCENES: PreviewScene[] = [
  {
    context: "10:32 PM · A DM from a number you haven't heard from in six weeks",
    character: {
      id: "maris-preview",
      name: "Maris",
      description: "",
      traits: [],
      defaultEmotion: "seductive",
      gender: "female",
      silhouetteType: "maris-caldwell",
    },
    emotion: "seductive",
    mood: "mysterious",
    speakerLine: "hey. i know this is weird. you up?",
    innerVoiceLine:
      "10pm. 'I know this is weird.' Two firsts in one text.",
    choices: [
      {
        text: "yeah, what's up",
        isOptimal: false,
        tactic: "Door open. She'll pour through.",
      },
      {
        text: "Don't reply until morning.",
        isOptimal: true,
        tactic: "11pm vulnerability that can wait until 9am wasn't real.",
      },
    ],
  },
  {
    context: "Quarterly review · Twelve people · The CEO is taking notes",
    character: {
      id: "marcus-preview",
      name: "Marcus",
      description: "",
      traits: [],
      defaultEmotion: "smirking",
      gender: "male",
      silhouetteType: "male-imposing",
    },
    emotion: "smirking",
    mood: "tense",
    speakerLine:
      "So the team built a new pricing model. I'll walk us through it.",
    innerVoiceLine:
      "'The team' = him. The frame sets in four seconds.",
    choices: [
      {
        text: "Quick note — I built that model. Happy to walk through it.",
        isOptimal: true,
        tactic: "Correct attribution before the frame sets.",
      },
      {
        text: "Say nothing. Complain to HR later.",
        isOptimal: false,
        tactic: "HR sides with the company. Credit lost permanently.",
      },
    ],
  },
  {
    context: "Saturday morning · Your phone has been buzzing for an hour",
    character: {
      id: "alex-preview",
      name: "Alex",
      description: "",
      traits: [],
      defaultEmotion: "curious",
      gender: "male",
      silhouetteType: "male-lean",
    },
    emotion: "curious",
    mood: "danger",
    speakerLine:
      "DUDE. Spill. You were talking to MARIS Caldwell?",
    innerVoiceLine:
      "He didn't get in. He'll spread whatever you say.",
    choices: [
      {
        text: "Yeah, Maris and I really hit it off.",
        isOptimal: false,
        tactic: "Exaggerate to impress. He tells everyone by 1pm.",
      },
      {
        text: "Just networking. Nothing special.",
        isOptimal: true,
        tactic: "Downplay. Give him nothing to spread.",
      },
    ],
  },
];

// Mood backdrops — same palette the real MoodBackground component uses
// in-scene so the preview matches the live game's lighting model.
const MOOD_GRADIENTS: Record<PreviewScene["mood"], string> = {
  mysterious:
    "radial-gradient(ellipse at 50% 20%, rgba(140,90,220,0.32), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(60,30,110,0.5), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(10,5,25,0.95), transparent 55%)",
  tense:
    "radial-gradient(ellipse at 50% 20%, rgba(230,140,80,0.26), transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(120,60,30,0.42), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(25,15,15,0.95), transparent 55%)",
  danger:
    "radial-gradient(ellipse at 50% 18%, rgba(220,50,70,0.38), transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(130,20,40,0.45), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(30,5,10,0.95), transparent 55%)",
};

type Beat =
  | "intro"
  | "speaker"
  | "inner"
  | "choices"
  | "select"
  | "reward"
  | "outro";

const BEAT_MS: Record<Beat, number> = {
  intro: 700,
  speaker: 2400,
  inner: 3200,
  choices: 1500,
  select: 1000,
  reward: 2400,
  outro: 700,
};

const BEAT_ORDER: Beat[] = [
  "intro",
  "speaker",
  "inner",
  "choices",
  "select",
  "reward",
  "outro",
];

function useTypewriter(text: string, active: boolean, speed = 18) {
  const [revealed, setRevealed] = useState("");
  useEffect(() => {
    if (!active) {
      setRevealed("");
      return;
    }
    setRevealed("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setRevealed(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, active, speed]);
  return revealed;
}

export default function SimulatorPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(0);
  const [inView, setInView] = useState(true);

  // Pause when offscreen — saves CPU when the visitor scrolls past.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const beat = BEAT_ORDER[beatIndex];
    const duration = BEAT_MS[beat];
    const t = window.setTimeout(() => {
      if (beatIndex >= BEAT_ORDER.length - 1) {
        setSceneIndex((i) => (i + 1) % SCENES.length);
        setBeatIndex(0);
      } else {
        setBeatIndex((i) => i + 1);
      }
    }, duration);
    return () => window.clearTimeout(t);
  }, [beatIndex, inView]);

  const beat = BEAT_ORDER[beatIndex];
  const scene = SCENES[sceneIndex];

  const showSpeakerLine =
    beatIndex >= BEAT_ORDER.indexOf("speaker") &&
    beatIndex < BEAT_ORDER.indexOf("outro");
  const showInnerLine =
    beatIndex >= BEAT_ORDER.indexOf("inner") &&
    beatIndex < BEAT_ORDER.indexOf("outro");
  const showChoices =
    beatIndex >= BEAT_ORDER.indexOf("choices") &&
    beatIndex < BEAT_ORDER.indexOf("outro");
  const isSelecting =
    beatIndex === BEAT_ORDER.indexOf("select") ||
    beatIndex === BEAT_ORDER.indexOf("reward");
  const isRewarding = beatIndex >= BEAT_ORDER.indexOf("reward");
  const isOutro = beat === "outro";

  const speakerText = useTypewriter(
    scene.speakerLine,
    showSpeakerLine && !isOutro,
    16,
  );
  const innerText = useTypewriter(
    scene.innerVoiceLine,
    showInnerLine && !isOutro,
    14,
  );

  const optimalIdx = useMemo(
    () => scene.choices.findIndex((c) => c.isOptimal),
    [scene],
  );

  // Subtle drifting "particles" — eight gold dots seeded from sceneIndex.
  const particles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      left: ((sceneIndex * 41 + i * 37) % 100) + 0.5,
      top: ((sceneIndex * 53 + i * 29) % 100) + 0.5,
      delay: (i * 0.7) % 4,
    }));
  }, [sceneIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-warm-gold/25 shadow-[0_20px_80px_-20px_rgba(212,175,55,0.25)]"
      aria-label="Live preview of the Dark Mirror Simulator"
    >
      <div className="relative aspect-[3/4] sm:aspect-[16/10] bg-deep-black">
        {/* Mood backdrop */}
        <AnimatePresence mode="wait">
          <m.div
            key={`mood-${sceneIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{ background: MOOD_GRADIENTS[scene.mood] }}
          />
        </AnimatePresence>

        {/* Drifting particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <m.span
              key={`p-${sceneIndex}-${i}`}
              className="absolute w-[3px] h-[3px] rounded-full bg-warm-gold/40"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              animate={{
                opacity: [0, 0.5, 0],
                y: [0, -10, -20],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Top letterbox */}
        <div className="absolute top-0 left-0 right-0 h-9 sm:h-10 bg-deep-black z-30 flex items-center justify-between gap-2 px-3 sm:px-4 border-b border-warm-gold/10">
          <p className="flex-1 min-w-0 text-warm-gold/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.4em] font-light truncate">
            <span className="sm:hidden">The Dark Mirror</span>
            <span className="hidden sm:inline">
              The Dark Mirror &nbsp;·&nbsp; Demo
            </span>
          </p>
          <span className="shrink-0 text-warm-gold/50 text-[10px] tabular-nums tracking-[0.25em]">
            {String(sceneIndex + 1).padStart(2, "0")} /{" "}
            {String(SCENES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom letterbox */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-7 bg-deep-black z-30 border-t border-warm-gold/10" />

        {/* Context label */}
        <div className="absolute top-12 sm:top-14 left-0 right-0 z-20 text-center px-4">
          <AnimatePresence mode="wait">
            <m.p
              key={`ctx-${sceneIndex}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 0.65, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-text-gray text-[10px] sm:text-xs font-light tracking-[0.15em] uppercase"
            >
              {scene.context}
            </m.p>
          </AnimatePresence>
        </div>

        {/* Central character — the same SVG silhouette used inside the
            real game. Engine native size is ~256×384 which is too tall
            for a landing-page canvas, so the m.div is scaled to ~55%
            (mobile) / 65% (desktop) with origin bottom-center. That
            anchors the bottom of the body to the dialog area while
            shrinking the head down into the upper portion of the frame
            — matching the shot composition the real game uses. */}
        <div className="absolute inset-x-0 top-10 sm:top-12 bottom-[210px] sm:bottom-[185px] z-10 flex items-end justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <m.div
              key={`char-${sceneIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="origin-bottom scale-[0.55] sm:scale-[0.65]"
            >
              <CharacterSilhouette
                character={scene.character}
                emotion={scene.emotion}
                role="solo"
              />
            </m.div>
          </AnimatePresence>
        </div>

        {/* XP floater — only during reward beat */}
        <AnimatePresence>
          {isRewarding && (
            <m.div
              key={`xp-${sceneIndex}`}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -28, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute z-30 bottom-[240px] sm:bottom-[210px]"
              style={{
                left: optimalIdx === 0 ? "26%" : "74%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warm-gold/15 border border-warm-gold/40 backdrop-blur-sm">
                <Sparkles size={12} className="text-warm-gold" strokeWidth={2} />
                <span className="text-warm-gold text-xs font-light tabular-nums tracking-wider">
                  +10 XP
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Dialog + choices stack — anchored bottom */}
        <div className="absolute inset-x-0 bottom-7 sm:bottom-8 z-20 px-4 sm:px-6 pb-3">
          <AnimatePresence mode="wait">
            {showSpeakerLine && (
              <m.div
                key={`dlg-${sceneIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto mb-3"
              >
                <p className="text-warm-gold text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-1.5 font-light">
                  {scene.character.name}
                </p>
                <p className="text-text-light text-sm sm:text-base font-light leading-snug">
                  {speakerText}
                  {speakerText.length < scene.speakerLine.length && (
                    <span className="inline-block w-[2px] h-[1em] bg-warm-gold/80 ml-0.5 align-middle animate-pulse" />
                  )}
                </p>
                {showInnerLine && (
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-text-gray/85 text-xs sm:text-sm italic font-light leading-snug mt-2 pl-3 border-l border-warm-gold/30"
                  >
                    <span className="text-warm-gold/60 not-italic uppercase tracking-[0.25em] text-[9px] mr-1.5">
                      Inner voice
                    </span>
                    {innerText}
                    {innerText.length < scene.innerVoiceLine.length && (
                      <span className="inline-block w-[2px] h-[1em] bg-warm-gold/60 ml-0.5 align-middle animate-pulse" />
                    )}
                  </m.p>
                )}
              </m.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showChoices && (
              <m.div
                key={`choices-${sceneIndex}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto"
              >
                {scene.choices.map((choice, i) => {
                  const isOptimalCard = i === optimalIdx;
                  const isSelectedFlash = isSelecting && isOptimalCard;
                  const isDimmedOther = isSelecting && !isOptimalCard;

                  return (
                    <m.div
                      key={`${sceneIndex}-${i}`}
                      animate={{
                        opacity: isDimmedOther ? 0.32 : 1,
                        scale: isSelectedFlash ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative rounded-lg border p-2.5 sm:p-3 text-left bg-deep-black/70 backdrop-blur-sm transition-all duration-300 ${
                        isSelectedFlash
                          ? "border-warm-gold shadow-[0_0_30px_-2px_rgba(212,175,55,0.7)]"
                          : "border-warm-gold/25"
                      }`}
                    >
                      <p className="text-text-light text-xs sm:text-sm font-light leading-snug">
                        {choice.text}
                      </p>
                      <AnimatePresence>
                        {isRewarding && isOptimalCard && (
                          <m.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-warm-gold/80 text-[10px] sm:text-xs italic font-light leading-snug mt-2 pt-2 border-t border-warm-gold/20 overflow-hidden"
                          >
                            <Flame
                              size={9}
                              className="inline mr-1 align-baseline"
                              strokeWidth={2}
                            />
                            {choice.tactic}
                          </m.p>
                        )}
                      </AnimatePresence>
                    </m.div>
                  );
                })}
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vignette to anchor the dialog area */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.5), transparent 60%)",
          }}
        />
      </div>

      <div className="bg-deep-black px-4 py-3 border-t border-warm-gold/15 flex items-center justify-between">
        <p className="text-text-gray/50 text-[10px] sm:text-[11px] font-light uppercase tracking-[0.25em]">
          Autoplay · 3 scenes
        </p>
        <div className="flex items-center gap-1.5">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === sceneIndex
                  ? "w-8 sm:w-10 bg-warm-gold"
                  : "w-4 sm:w-5 bg-warm-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
