"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, Flame } from "lucide-react";

/**
 * SimulatorPreview — autoplaying faux scene-runner for the landing page.
 *
 * Plays three short scenes lifted from real Consilium scenarios on a
 * loop. The point is sales: the viewer sees the actual product running
 * (typewriter dialog, choice cards, the optimal pick getting selected
 * with an XP floater and tactic reveal) and feels the loop click in.
 *
 * No engine, no real state — just a setTimeout chain advancing a beat
 * counter. Pauses when scrolled offscreen so it doesn't burn CPU.
 * Falls back to a single static frame for prefers-reduced-motion users.
 *
 * Why three scenes:
 *   1. Romance — 10pm DM (mystery, intrigue, lowest barrier to "oh shit
 *      I've been here")
 *   2. Workplace — credit theft (every professional recognises this)
 *   3. Friendship — the gala fishing trip (info-discipline, relatable)
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
  speaker: string;
  /** Mood key — drives the backdrop gradient. */
  mood: "mysterious" | "tense" | "danger";
  /** First line is the speaker's. Second line is inner-voice. */
  speakerLine: string;
  innerVoiceLine: string;
  choices: [PreviewChoice, PreviewChoice];
  /** Visual seed for the silhouette gradient. */
  silhouetteHue: string;
}

const SCENES: PreviewScene[] = [
  {
    context: "10:32 PM · A DM from a number you haven't heard from in six weeks",
    speaker: "MARIS",
    mood: "mysterious",
    speakerLine: "hey. i know this is weird. are you up?",
    innerVoiceLine:
      "She has never texted you at 10pm. She has never admitted anything was 'weird'. Both of those are today's data.",
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
    silhouetteHue: "270, 60%",
  },
  {
    context: "Quarterly review · Twelve people · The CEO is taking notes",
    speaker: "MARCUS",
    mood: "tense",
    speakerLine:
      "So the team built out a new pricing model this quarter. I'll walk us through it.",
    innerVoiceLine:
      "'The team' = him. He'll say 'we' through the slides and 'I' in the Q&A. Four seconds before the frame sets.",
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
    silhouetteHue: "30, 30%",
  },
  {
    context: "Saturday morning · Your phone has been buzzing for an hour",
    speaker: "ALEX",
    mood: "danger",
    speakerLine:
      "DUDE. Spill. Everything. I heard you were talking to MARIS freaking Caldwell?",
    innerVoiceLine:
      "He didn't get in. He's hungry for details. Whatever you say will be in three group chats by lunch.",
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
    silhouetteHue: "10, 50%",
  },
];

const MOOD_GRADIENTS: Record<PreviewScene["mood"], string> = {
  mysterious:
    "radial-gradient(ellipse at 50% 30%, rgba(100,70,160,0.18), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(20,10,30,0.85), transparent 60%)",
  tense:
    "radial-gradient(ellipse at 40% 30%, rgba(200,100,60,0.14), transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(30,20,30,0.8), transparent 60%)",
  danger:
    "radial-gradient(ellipse at 50% 25%, rgba(180,30,60,0.22), transparent 65%), radial-gradient(ellipse at 70% 80%, rgba(40,10,20,0.85), transparent 60%)",
};

// Beat = the discrete phase of the loop. Each scene runs through these
// in order, then crosses-fade to the next scene's "intro".
type Beat =
  | "intro" // backdrop + context fade in
  | "speaker" // speaker line typewrites
  | "inner" // inner voice typewrites
  | "choices" // choice cards slide up
  | "select" // optimal card flashes, other dims
  | "reward" // XP floater + tactic reveal
  | "outro"; // crossfade to next scene

// Beat durations (ms). Total per scene ~10-11s.
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
  const [streak, setStreak] = useState(1);
  const [inView, setInView] = useState(true);

  // Pause when not visible — saves CPU when the visitor scrolls past.
  // Permissive threshold (5%) so the loop keeps running even when only
  // a sliver of the preview is on screen.
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

  // Beat progression. The reduced-motion short-circuit that previously
  // lived here was freezing the loop on the reward beat for any user
  // with the system "reduce motion" preference enabled (Windows defaults
  // and several browsers ship it on). The animations are subtle enough
  // — opacity crossfades, a typewriter, a brief flash — that they're
  // fine for reduced-motion users; better to keep the loop running than
  // to pin them on scene 1 indefinitely.
  useEffect(() => {
    if (!inView) return;
    const beat = BEAT_ORDER[beatIndex];
    const duration = BEAT_MS[beat];
    const t = window.setTimeout(() => {
      if (beatIndex >= BEAT_ORDER.length - 1) {
        // End of beat list — loop to the next scene. Update streak based
        // on the post-loop scene so the counter stays small and
        // believable (resets on every full cycle).
        setSceneIndex((i) => {
          const next = (i + 1) % SCENES.length;
          return next;
        });
        setStreak((s) => {
          const nextScene = (sceneIndex + 1) % SCENES.length;
          return nextScene === 0 ? 1 : s + 1;
        });
        setBeatIndex(0);
      } else {
        setBeatIndex((i) => i + 1);
      }
    }, duration);
    return () => window.clearTimeout(t);
  }, [beatIndex, sceneIndex, inView]);

  const effectiveBeatIndex = beatIndex;
  const beat = BEAT_ORDER[effectiveBeatIndex];
  const scene = SCENES[sceneIndex];

  const showSpeakerLine =
    effectiveBeatIndex >= BEAT_ORDER.indexOf("speaker") &&
    effectiveBeatIndex < BEAT_ORDER.indexOf("outro");
  const showInnerLine =
    effectiveBeatIndex >= BEAT_ORDER.indexOf("inner") &&
    effectiveBeatIndex < BEAT_ORDER.indexOf("outro");
  const showChoices =
    effectiveBeatIndex >= BEAT_ORDER.indexOf("choices") &&
    effectiveBeatIndex < BEAT_ORDER.indexOf("outro");
  const isSelecting =
    effectiveBeatIndex === BEAT_ORDER.indexOf("select") ||
    effectiveBeatIndex === BEAT_ORDER.indexOf("reward");
  const isRewarding = effectiveBeatIndex >= BEAT_ORDER.indexOf("reward");
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

  // Subtle drifting "particles" — eight gold dots seeded from sceneIndex
  // so each scene gets a unique constellation. Pure visual texture; no
  // user-visible meaning.
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
      {/* The 16:9 canvas — fixed aspect so the layout never shifts as
          beats progress. */}
      <div className="relative aspect-[16/10] bg-deep-black">
        {/* Mood backdrop — crossfades on scene change */}
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

        {/* Drifting particles — pure ambience */}
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

        {/* Top letterbox + brand label */}
        <div className="absolute top-0 left-0 right-0 h-9 sm:h-10 bg-deep-black z-30 flex items-center justify-center border-b border-warm-gold/10">
          <p className="text-warm-gold/70 text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-light">
            The Dark Mirror · Live
          </p>
          <span className="absolute right-3 sm:right-4 flex items-center gap-1 text-warm-gold/60 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline tabular-nums">
              streak · {streak}
            </span>
          </span>
        </div>

        {/* Bottom letterbox */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-7 bg-deep-black z-30 border-t border-warm-gold/10" />

        {/* Context label — below top letterbox */}
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

        {/* Character silhouette — soft gradient blob, centered, with a
            gentle backlit glow. Crossfades on scene change. */}
        <div className="absolute inset-x-0 top-20 sm:top-24 bottom-[170px] sm:bottom-[200px] z-10 flex items-end justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <m.div
              key={`silh-${sceneIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Backlit halo */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-60"
                style={{
                  background: `radial-gradient(closest-side, hsla(${scene.silhouetteHue}, 45%, 0.45), transparent 70%)`,
                }}
              />
              {/* Silhouette — abstract head + shoulders */}
              <svg
                width="120"
                height="140"
                viewBox="0 0 120 140"
                className="sm:w-[140px] sm:h-[160px]"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id={`silh-grad-${sceneIndex}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={`hsla(${scene.silhouetteHue}, 28%, 0.95)`}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgba(10,8,16,0.95)"
                    />
                  </linearGradient>
                </defs>
                {/* Head */}
                <ellipse
                  cx="60"
                  cy="42"
                  rx="22"
                  ry="26"
                  fill={`url(#silh-grad-${sceneIndex})`}
                />
                {/* Shoulders */}
                <path
                  d="M 18 140 Q 18 88, 60 78 Q 102 88, 102 140 Z"
                  fill={`url(#silh-grad-${sceneIndex})`}
                />
              </svg>
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
              className="absolute z-30"
              style={{
                left: optimalIdx === 0 ? "26%" : "74%",
                bottom: "180px",
                transform: "translateX(-50%)",
              }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warm-gold/15 border border-warm-gold/40 backdrop-blur-sm">
                <Sparkles
                  size={12}
                  className="text-warm-gold"
                  strokeWidth={2}
                />
                <span className="text-warm-gold text-xs font-light tabular-nums tracking-wider">
                  +10 XP
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Dialog + choices stack — anchored bottom */}
        <div className="absolute inset-x-0 bottom-7 sm:bottom-8 z-20 px-4 sm:px-6 pb-3">
          {/* Speaker name + dialog box */}
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
                  {scene.speaker}
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

          {/* Choice cards */}
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

        {/* Subtle vignette to anchor the dialog area */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.5), transparent 60%)",
          }}
        />
      </div>

      {/* Below-canvas caption — frames the experience as a real product */}
      <div className="bg-deep-black px-4 py-3 border-t border-warm-gold/15 flex items-center justify-between">
        <p className="text-text-gray/70 text-[10px] sm:text-xs font-light">
          Scene {sceneIndex + 1} of {SCENES.length} · played automatically
        </p>
        <div className="flex items-center gap-1.5">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-4 sm:w-6 rounded-full transition-colors duration-300 ${
                i === sceneIndex ? "bg-warm-gold" : "bg-warm-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
