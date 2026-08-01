"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { Character, EmotionType } from "@/lib/simulator/types";

/**
 * Bridge silhouette, hand-rolled SVG.
 *
 * Goals vs. the earlier abstract blob:
 *   - Visible HEAD with hair shape (flowing / short / cap / styled per silhouetteType)
 *   - Visible SHOULDERS + COLLARBONE line
 *   - Hint of face geometry: jawline, cheek highlight, and two rim-lit
 *     eye glints that blink, so the figure reads as a person watching
 *     you, not a vase.
 *   - Idle breathing whose rate follows the emotion (anger breathes
 *     fast and shallow, sadness slow)
 *   - Emotion drives the rim-light hue, body lean, and eye shape, and
 *     morphs in place: the figure NEVER remounts on an emotion change.
 *     Color eases via CSS transitions on the gradient stops; lean and
 *     posture tween on the mounted element.
 *   - A soft ground shadow so the figure stands instead of floating.
 *
 * This is the PLACEHOLDER until AI-generated portraits ship. Designed so a
 * drop-in replacement (real portraitUrl on the Character) swaps this out
 * without touching callers.
 */

type Props = {
  character: Character;
  emotion?: EmotionType;
  /**
   * Scale from 0.5 (dim supporting cast) to 1 (active speaker).
   * Non-speaker cast members render at ~0.7 with reduced opacity.
   */
  intensity?: number;
  /**
   * Casting role, drives size and visual prominence.
   *   - "solo"      : single-character scene, centered, full size (default)
   *   - "speaker"   : active talker in a group, full size, rim-lit
   *   - "supporting": in-scene but not currently speaking, smaller, dimmed,
   *                   rendered behind the speaker for depth
   */
  role?: "solo" | "speaker" | "supporting";
  /**
   * Head-and-shoulders crop for supporting cast in group scenes. A
   * shrunken full body reads as "far away"; a bust reads as "present,
   * not talking", and gives the face more pixels at the same footprint.
   */
  variant?: "full" | "bust";
  /**
   * Flip the figure horizontally so its stronger head rim-light faces
   * the scene's center. Group staging sets this on right-side cast, one
   * key light for the whole shot.
   */
  mirror?: boolean;
  /**
   * Changes on every new dialog line from this character. Drives a brief
   * rim-glow swell so the body registers the voice. Ignored for
   * non-speakers (their pulseKey never changes).
   */
  pulseKey?: string | number;
};

function rimColorFor(emotion?: EmotionType): string {
  switch (emotion) {
    case "seductive":
      return "rgba(212,175,55,0.85)";
    case "happy":
    case "hopeful":
      return "rgba(232,200,110,0.7)";
    case "cold":
      return "rgba(120,170,220,0.6)";
    case "angry":
      return "rgba(220,70,70,0.7)";
    case "sad":
    case "pleading":
      return "rgba(140,150,180,0.5)";
    case "curious":
    case "knowing":
    case "smirking":
      return "rgba(220,200,140,0.7)";
    case "concerned":
      return "rgba(200,130,100,0.55)";
    case "serious":
      return "rgba(180,140,100,0.6)";
    default:
      return "rgba(180,180,190,0.45)";
  }
}

/** Breathing cycle seconds per emotion. Fast and shallow when hot. */
function breathSecondsFor(emotion?: EmotionType): number {
  switch (emotion) {
    case "angry":
      return 2.2;
    case "serious":
    case "concerned":
      return 3;
    case "cold":
      return 5;
    case "seductive":
    case "knowing":
      return 5.5;
    case "sad":
    case "pleading":
      return 6;
    default:
      return 4;
  }
}

/** Vertical eye openness per emotion. 1 = neutral. */
function eyeOpennessFor(emotion?: EmotionType): number {
  switch (emotion) {
    case "smirking":
    case "cold":
    case "knowing":
    case "seductive":
    case "serious":
      return 0.55;
    case "confused":
    case "concerned":
    case "curious":
      return 1.3;
    default:
      return 1;
  }
}

function hairPathFor(silhouetteType?: string): string {
  // Each hair path is a shape drawn on top of the head ellipse. Dark, no
  // texture, silhouette aesthetic throughout.
  switch (silhouetteType) {
    case "female-elegant":
    case "hair-styled":
      // Long, styled with volume + side-swept bangs
      return "M72 56 Q60 50 60 72 Q60 95 70 120 L80 130 L80 78 Q92 60 110 60 Q128 62 130 78 L130 128 L142 118 Q148 95 148 72 Q148 50 135 55 Q120 44 100 44 Q85 44 72 56 Z";
    case "female-athletic":
    case "hair-ponytail":
      // Pulled back with a subtle ponytail silhouette
      return "M72 58 Q66 50 70 40 Q85 34 100 34 Q118 34 132 42 Q140 52 132 60 L128 75 L132 145 L124 148 L124 80 L84 80 L84 110 L76 108 L78 75 Z";
    case "female-soft":
    case "hair-short":
      // Chin-length bob
      return "M72 58 Q68 48 78 44 Q90 38 100 38 Q112 38 125 44 Q134 48 130 58 L130 96 L120 100 L120 78 L82 78 L82 100 L70 98 Z";
    case "male-athletic":
    case "male-imposing":
    case "male-lean":
      // Short fade
      return "M76 56 Q76 46 88 42 Q100 40 112 42 Q124 46 124 56 L124 70 L76 70 Z";
    case "maris-caldwell":
      // Signature: long, sharp, predatory shape
      return "M68 56 Q58 60 58 78 Q58 105 72 138 L80 148 L80 82 Q90 64 108 62 Q130 62 132 80 L132 150 L142 142 Q150 108 150 78 Q150 58 138 54 Q122 40 100 40 Q82 42 68 56 Z";
    case "authority-cap":
      // Cap outline
      return "M68 58 L60 58 L60 50 L140 50 L140 58 L132 58 L132 66 L68 66 Z";
    default:
      // Generic short
      return "M74 54 Q74 46 86 42 Q100 38 114 42 Q126 46 126 54 L126 72 L74 72 Z";
  }
}

/** Long styles get an idle sway; short crops and caps stay put. */
const SWAY_STYLES = new Set(["female-elegant", "hair-styled", "maris-caldwell"]);

/** Deterministic 4-7s blink period per character, stable across renders. */
function blinkPeriodFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return 4 + (Math.abs(h) % 300) / 100;
}

export default function CharacterSilhouette({
  character,
  emotion,
  intensity = 1,
  role = "solo",
  variant = "full",
  mirror = false,
  pulseKey,
}: Props) {
  const reducedMotion = useReducedMotion();
  const activeEmotion = emotion ?? character.defaultEmotion;
  const rim = rimColorFor(activeEmotion);
  const hairPath = hairPathFor(character.silhouetteType);
  // Non-speakers render dimmed so the eye lands on whoever is talking.
  const containerOpacity = Math.max(0.35, Math.min(1, intensity));
  // Size class per role. Supporting busts keep a compact footprint but
  // spend it all on head and shoulders.
  const sizeClass =
    role === "supporting"
      ? variant === "bust"
        ? "w-24 h-32 sm:w-28 sm:h-40"
        : "w-28 h-40 sm:w-36 sm:h-52"
      : "w-52 h-72 sm:w-64 sm:h-96";

  // Subtle body lean driven by emotion, aggressive emotions lean forward,
  // withdrawn ones lean back.
  const lean =
    activeEmotion === "seductive" || activeEmotion === "smirking"
      ? 1
      : activeEmotion === "sad" || activeEmotion === "pleading"
        ? -1.2
        : activeEmotion === "angry"
          ? 1.8
          : 0;

  // Per-character SVG def ids. With shared ids, the first silhouette on
  // the page owned every gradient and the rest borrowed its rim color.
  const uid = `${character.id}-${role}`;
  const breathSeconds = breathSecondsFor(activeEmotion);
  const eyeOpen = eyeOpennessFor(activeEmotion);
  const blinkPeriod = blinkPeriodFor(character.id);
  const viewBox = variant === "bust" ? "40 24 120 176" : "0 0 200 320";

  // If a real portrait URL is set later, render that instead.
  if (character.portraitUrl) {
    return (
      <m.div
        key={character.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: containerOpacity, scale: intensity }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`relative ${sizeClass}`}
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-60 transition-colors duration-700"
          style={{ background: rim }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={character.portraitUrl}
          alt={character.name}
          className="relative w-full h-full object-cover drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
          style={{
            filter: "contrast(1.2) brightness(0.85) saturate(0.7)",
          }}
        />
      </m.div>
    );
  }

  return (
    <m.div
      key={character.id}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{
        opacity: containerOpacity,
        scale: intensity,
        rotate: lean * 0.4,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${sizeClass}`}
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Rim glow behind character, picks up emotion color. Remounted on
          pulseKey so each new spoken line swells it briefly, the body
          registering the voice. */}
      <m.div
        key={`glow-${pulseKey ?? "still"}`}
        className="absolute inset-0 rounded-full blur-3xl transition-colors duration-700"
        style={{ background: rim }}
        initial={{ opacity: 0.6 }}
        animate={
          reducedMotion || pulseKey === undefined
            ? { opacity: 0.6 }
            : { opacity: [0.6, 0.85, 0.6] }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Ground shadow. Anchors the figure; without it they float like
          stickers. Sits under the flipped SVG so it never mirrors. */}
      {variant === "full" && (
        <div
          aria-hidden
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-3/4 rounded-[50%] bg-black/60 blur-md"
        />
      )}

      {/* Breathing wrap. Rate follows the emotion: anger is fast and
          shallow, sadness slow and deep. */}
      <m.svg
        viewBox={viewBox}
        className={`sil-rim relative w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] ${
          mirror ? "-scale-x-100" : ""
        }`}
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, activeEmotion === "angry" ? 1.012 : 1.02, 1] }
        }
        transition={{
          duration: breathSeconds,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={`bodyGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1012" />
            <stop offset="100%" stopColor="#050304" />
          </linearGradient>
          <linearGradient id={`rimL-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={rim} stopOpacity="0" />
            <stop offset="100%" stopColor={rim} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`rimR-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={rim} stopOpacity="0.95" />
            <stop offset="100%" stopColor={rim} stopOpacity="0" />
          </linearGradient>
          {/* Soft cheek highlight, barely there, just enough to imply a face */}
          <radialGradient id={`cheek-${uid}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={rim} stopOpacity="0.35" />
            <stop offset="100%" stopColor={rim} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Neck + torso + hips */}
        <path
          d="M85 140 Q85 155 82 168 L65 180 Q48 195 46 225 L44 270 Q44 295 50 320 L150 320 Q156 295 156 270 L154 225 Q152 195 135 180 L118 168 Q115 155 115 140 Z"
          fill={`url(#bodyGrad-${uid})`}
        />

        {/* Head, slightly ovoid */}
        <ellipse cx="100" cy="95" rx="30" ry="38" fill={`url(#bodyGrad-${uid})`} />

        {/* Jawline rim, a single edge-light pass */}
        <path
          d="M77 100 Q78 118 95 130 Q100 132 105 130 Q122 118 123 100"
          fill="none"
          stroke={rim}
          strokeWidth="1.5"
          strokeOpacity="0.65"
        />

        {/* Cheek implied-highlight, shows the presence of a face */}
        <ellipse cx="112" cy="104" rx="7" ry="4" fill={`url(#cheek-${uid})`} />

        {/* Eye glints. The single strongest "this is a person" signal a
            silhouette can afford: two points of rim light that narrow
            with contempt, widen with confusion, and blink on their own
            clock. Blink is a fast scaleY dip repeated on a per-character
            period so a group never blinks in unison. */}
        {(["l", "r"] as const).map((side) => (
          <m.ellipse
            key={side}
            cx={side === "l" ? 89 : 111}
            cy={91}
            rx={2.4}
            ry={1.5 * eyeOpen}
            fill={rim}
            fillOpacity={0.8}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.08, 1] }}
            transition={{
              duration: 0.28,
              times: [0, 0.9, 0.95, 1],
              repeat: Infinity,
              repeatDelay: blinkPeriod,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hair, on top of head. Long styles carry a slow idle sway. */}
        <m.path
          d={hairPath}
          fill={`url(#bodyGrad-${uid})`}
          style={{ transformBox: "fill-box", transformOrigin: "50% 15%" }}
          animate={
            !reducedMotion && SWAY_STYLES.has(character.silhouetteType ?? "")
              ? { rotate: [0, 0.8, 0, -0.8, 0] }
              : undefined
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rim light, left edge on body */}
        <path
          d="M46 225 L44 270 Q44 295 50 320"
          fill="none"
          stroke={`url(#rimL-${uid})`}
          strokeWidth="2.5"
          strokeOpacity="0.9"
        />

        {/* Rim light, right edge on head + neck (picks up primary light source) */}
        <path
          d="M128 78 Q132 95 128 118 Q120 132 115 140"
          fill="none"
          stroke={`url(#rimR-${uid})`}
          strokeWidth="2.5"
          strokeOpacity="0.95"
        />

        {/* Shoulder line + collarbone suggestion */}
        <path
          d="M58 190 Q100 180 142 190"
          fill="none"
          stroke={rim}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      </m.svg>

      {/* Emotion changes ease instead of snapping: the figure stays
          mounted, only its light shifts. */}
      <style>{`
        .sil-rim stop { transition: stop-color 700ms ease; }
        .sil-rim path, .sil-rim ellipse { transition: stroke 700ms ease; }
      `}</style>
    </m.div>
  );
}
