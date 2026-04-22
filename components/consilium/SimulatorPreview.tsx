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
 *
 * Visual design notes:
 *   - Character silhouettes used to be an abstract gradient blob that
 *     read as placeholder art. Replaced with a stylised Venetian-style
 *     half-mask SVG that's on-brand for "Behind the Mask" and works as
 *     a universal visual for any speaker. The mask is tinted per-scene
 *     mood (purple / amber / red) via the silhouetteHue seed.
 *   - The "streak · N" counter was removed. It's meaningless on an
 *     autoplay loop (you can't build streaks by watching) and made the
 *     whole preview read as fake gamification.
 *   - "LIVE" label was misleading (the preview is a loop, not a live
 *     game). Relabeled "DEMO" and moved the scene number into the
 *     corner as a cinematic "01 · 03" frame counter.
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
  /** Seed for the mask tint. "H, S%" partial passed into hsla(). */
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

// Stronger, more cinematic mood backdrops. The previous palette was
// too subtle — the scene felt washed out and the mood change between
// scenes was barely perceptible. These use higher alpha at the source
// plus a second deep-color accent lower-left so the background reads
// as "lit by a single coloured source" rather than flat.
const MOOD_GRADIENTS: Record<PreviewScene["mood"], string> = {
  mysterious:
    "radial-gradient(ellipse at 50% 20%, rgba(140,90,220,0.32), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(60,30,110,0.5), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(10,5,25,0.95), transparent 55%)",
  tense:
    "radial-gradient(ellipse at 50% 20%, rgba(230,140,80,0.26), transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(120,60,30,0.42), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(25,15,15,0.95), transparent 55%)",
  danger:
    "radial-gradient(ellipse at 50% 18%, rgba(220,50,70,0.38), transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(130,20,40,0.45), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(30,5,10,0.95), transparent 55%)",
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
        // End of beat list — loop to the next scene.
        setSceneIndex((i) => (i + 1) % SCENES.length);
        setBeatIndex(0);
      } else {
        setBeatIndex((i) => i + 1);
      }
    }, duration);
    return () => window.clearTimeout(t);
  }, [beatIndex, inView]);

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
      {/* Canvas — fixed aspect so the layout never shifts as beats
          progress. Taller on mobile because the dialog stack (speaker +
          inner voice + two choice cards) needs ~280px of room; a 16:10
          canvas at 375px wide is only ~234px tall and everything would
          collapse onto the silhouette. */}
      <div className="relative aspect-[3/4] sm:aspect-[16/10] bg-deep-black">
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

        {/* Top letterbox + brand label.
            Replaced "LIVE" with "DEMO" — the preview is a loop, not
            live play. The pulsing emerald dot + "streak · N" counter
            were removed because they implied interactive state that
            isn't there. The right-side slot now carries a cinematic
            frame counter ("01 · 03") that genuinely reflects what's
            on screen.

            Layout: flex justify-between instead of absolute-
            positioning the counter. On narrow mobile, the centered
            brand-label stretched to its full container width (thanks
            to the wide tracking), which left no room for an absolute
            counter on the right — the two would collide ("THE DARK
            MIRROR · DE M0 3"). A row layout with brand-left / counter-
            right keeps the two separated no matter the width, and
            tightens letter-spacing one notch on <sm so the brand fits
            cleanly in a single line at 320px. */}
        <div className="absolute top-0 left-0 right-0 h-9 sm:h-10 bg-deep-black z-30 flex items-center justify-between gap-2 px-3 sm:px-4 border-b border-warm-gold/10">
          {/* On mobile the brand drops the " · Demo" suffix because the
              3-scene counter on the right already signals this is a
              looping demo. Desktop keeps the full flourish.
              `flex-1 min-w-0` lets the label take the remaining space
              and `truncate` kick in as a last-resort ellipsis; the
              reduced mobile tracking keeps "The Dark Mirror" fitting
              cleanly at 320px without ever actually eliding. */}
          <p className="flex-1 min-w-0 text-warm-gold/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.4em] font-light truncate">
            <span className="sm:hidden">The Dark Mirror</span>
            <span className="hidden sm:inline">
              The Dark Mirror &nbsp;·&nbsp; Demo
            </span>
          </p>
          <span className="shrink-0 text-warm-gold/50 text-[10px] tabular-nums tracking-[0.25em]">
            {String(sceneIndex + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
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

        {/* Central visual — a stylised Venetian half-mask.
            Replaces the old abstract head + shoulders silhouette, which
            read as placeholder art (gradient blob, earth-tone fill on
            the workplace scene made it look like wet clay).
            The mask is on-brand: the site's core metaphor is "Behind
            the Mask" and "The Dark Mirror" — a mask SVG ties the visual
            directly to the brand instead of trying (and failing) to
            represent a specific person.
            Tinted per mood via the scene's silhouetteHue. Soft backlit
            halo behind picks up the same hue so the mask reads as "lit
            from behind by something coloured" — cinematic. A gentle
            breathing scale keeps it alive without feeling fidgety.
            Exit/enter crossfades on scene change so the loop reads as
            a proper cut, not a hard pop. */}
        <div className="absolute inset-x-0 top-16 sm:top-24 bottom-[230px] sm:bottom-[200px] z-10 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <m.div
              key={`mask-${sceneIndex}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: [1, 1.02, 1] }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                opacity: { duration: 0.7 },
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative"
            >
              {/* Backlit halo — picks up the scene's mood hue. This is
                  the ONE place the mood hue lives. Keeping it out of
                  the mask body fixes a contrast bug where the amber
                  "tense" mood tinted the mask into the same color as
                  its own backdrop, making the mask vanish. */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-90 scale-150"
                style={{
                  background: `radial-gradient(closest-side, hsla(${scene.silhouetteHue}, 65%, 0.62), transparent 70%)`,
                }}
              />
              {/* Venetian half-mask.
                  Shape: horizontal bean, slight upper peak for the
                  forehead, gentle lower curve. Eye holes are almond-
                  shaped, tilted slightly outward. The mask body uses a
                  fixed dark-navy → near-black gradient so it always
                  reads against any mood backdrop. The gold stroke and
                  eye glints provide the only chromatic detail. */}
              <svg
                width="180"
                height="100"
                viewBox="0 0 180 100"
                className="sm:w-[220px] sm:h-[120px]"
                aria-hidden
                style={{
                  filter:
                    "drop-shadow(0 6px 18px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(212,175,55,0.18))",
                }}
              >
                <defs>
                  {/* Fixed dark fill — independent of mood so the mask
                      always separates from its backdrop. */}
                  <linearGradient
                    id={`mask-fill-${sceneIndex}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(32,26,44,0.98)" />
                    <stop offset="55%" stopColor="rgba(14,10,20,0.98)" />
                    <stop offset="100%" stopColor="rgba(4,2,8,1)" />
                  </linearGradient>
                  <linearGradient
                    id={`mask-stroke-${sceneIndex}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(243,217,138,1)" />
                    <stop offset="50%" stopColor="rgba(212,175,55,1)" />
                    <stop offset="100%" stopColor="rgba(156,122,31,0.9)" />
                  </linearGradient>
                </defs>
                {/* Main mask shape */}
                <path
                  d="
                    M 20 52
                    C 20 28, 52 14, 90 14
                    C 128 14, 160 28, 160 52
                    C 160 68, 144 86, 126 86
                    C 116 86, 108 78, 100 72
                    C 96 69, 84 69, 80 72
                    C 72 78, 64 86, 54 86
                    C 36 86, 20 68, 20 52
                    Z
                  "
                  fill={`url(#mask-fill-${sceneIndex})`}
                  stroke={`url(#mask-stroke-${sceneIndex})`}
                  strokeWidth="1.8"
                />
                {/* Upper brow flourish — a subtle raised ridge above the
                    eyes that sells it as an actual mask, not a blob. */}
                <path
                  d="M 34 40 Q 58 24, 82 36"
                  fill="none"
                  stroke={`url(#mask-stroke-${sceneIndex})`}
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path
                  d="M 98 36 Q 122 24, 146 40"
                  fill="none"
                  stroke={`url(#mask-stroke-${sceneIndex})`}
                  strokeWidth="1"
                  opacity="0.7"
                />
                {/* Left eye hole */}
                <ellipse
                  cx="58"
                  cy="48"
                  rx="14"
                  ry="7"
                  fill="rgba(0,0,0,0.95)"
                  transform="rotate(-6 58 48)"
                />
                {/* Right eye hole */}
                <ellipse
                  cx="122"
                  cy="48"
                  rx="14"
                  ry="7"
                  fill="rgba(0,0,0,0.95)"
                  transform="rotate(6 122 48)"
                />
                {/* Eye glints — tiny specular highlights picking up the
                    mood hue so the mask feels "lit by" the scene. */}
                <circle
                  cx="62"
                  cy="46"
                  r="1.1"
                  fill={`hsla(${scene.silhouetteHue}, 80%, 0.9)`}
                />
                <circle
                  cx="126"
                  cy="46"
                  r="1.1"
                  fill={`hsla(${scene.silhouetteHue}, 80%, 0.9)`}
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
              className="absolute z-30 bottom-[240px] sm:bottom-[210px]"
              style={{
                left: optimalIdx === 0 ? "26%" : "74%",
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

      {/* Below-canvas caption — minimal. The scene counter lives in
          the letterbox now; this strip just carries the progress pills
          and a quiet autoplay hint. Progress pills fill-in as the loop
          runs through the three scenes. */}
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
