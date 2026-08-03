"use client";

import { useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useGlSketch, type UniformBag } from "@/lib/motion/gl";

/**
 * Tier three, part two: the moment the app names what just happened.
 *
 * `ImmersionTrigger` already exists in the scenario types with
 * "manipulation-detected" as its first value, and today it resolves to a
 * flash. This is what that beat can be instead: a domain-warped noise field
 * in the brand's two colours, closing to a point while the words resolve.
 *
 * Two decisions worth keeping if this ever ships. The colour split is done
 * by shifting the ramp threshold per channel rather than by sampling the
 * field three times, so aberration costs three `smoothstep` calls instead of
 * tripling the most expensive function on screen. And the words are ordinary
 * DOM on top, because text rendered into a shader loses selection, screen
 * readers, and font hinting for no gain the eye can find.
 */

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;

out vec4 fragColor;

const vec3 GOLD     = vec3(0.831, 0.686, 0.216);
const vec3 BURGUNDY = vec3(0.447, 0.129, 0.224);
const vec3 INK      = vec3(0.024, 0.020, 0.016);

float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float t = uTime * 0.11;
  vec2 p = uv * 1.7;

  // Two rounds of domain warping. One round gives clouds; two gives the
  // curling, sinewy structure that reads as something alive.
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(4.7, 2.3) - t * 0.8));
  vec2 r = vec2(
    fbm(p + 3.1 * q + vec2(1.7, 9.2) + t * 1.3),
    fbm(p + 3.1 * q + vec2(8.3, 2.8) - t * 1.0)
  );
  float f = fbm(p + 3.5 * r);
  float heat = f * 0.85 + r.x * 0.25;

  // Embers in the dark, not lava. The gold lives only in the top of the
  // range: let it start early and the whole field saturates orange and
  // stops belonging to the brand.
  vec3 col = mix(INK, BURGUNDY * 0.92, smoothstep(0.30, 0.72, heat));
  col.r += smoothstep(0.58, 0.87, heat + 0.03) * GOLD.r * 0.70;
  col.g += smoothstep(0.62, 0.90, heat) * GOLD.g * 0.62;
  col.b += smoothstep(0.66, 0.93, heat - 0.03) * GOLD.b * 0.55;
  col *= 0.82;

  // Rises fast, holds, releases slow. Anything symmetric reads as a blink.
  float env = smoothstep(0.0, 0.16, uProgress) * (1.0 - smoothstep(0.68, 1.0, uProgress));

  float vig = 1.0 - smoothstep(
    mix(1.55, 0.28, uProgress),
    mix(2.05, 0.92, uProgress),
    length(uv)
  );

  col *= vig * env;

  float g = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.018 * env;

  fragColor = vec4(col, 1.0);
}`;

/** Split once, with each word carrying its own head start for the stagger. */
const WORDS = ["MANIPULATION", "DETECTED"].reduce<
  { text: string; offset: number }[]
>((acc, text) => {
  const prev = acc[acc.length - 1];
  const offset = prev ? prev.offset + prev.text.length : 0;
  return [...acc, { text, offset }];
}, []);

export default function TellField() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const uniforms = useRef<UniformBag>({ uProgress: 0 });
  const canvasRef = useGlSketch(FRAG, { uniforms, still: reduced });

  const play = () => {
    if (playing) return;
    setPlaying(true);
    if (reduced) {
      window.setTimeout(() => setPlaying(false), 1400);
      return;
    }
    animate(0, 1, {
      duration: 2.6,
      ease: "linear",
      onUpdate: (v) => {
        uniforms.current.uProgress = v;
      },
      onComplete: () => {
        uniforms.current.uProgress = 0;
        setPlaying(false);
      },
    });
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--app-line)] bg-[var(--app-void)]">
      <div className="relative">
        <canvas ref={canvasRef} className="block h-[260px] w-full" aria-hidden />

        <AnimatePresence>
          {playing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p
                className="text-center text-[17px] uppercase leading-[2] tracking-[0.3em] text-[var(--app-text)]"
                aria-label={WORDS.map((w) => w.text).join(" ")}
              >
                {/* Each word holds itself together. Staggering raw
                    characters lets a line break land mid-word, which is
                    the one thing this beat cannot survive. */}
                {WORDS.map((word) => (
                  <span
                    key={word.text}
                    aria-hidden
                    className="mr-[0.3em] inline-block whitespace-nowrap"
                  >
                    {word.text.split("").map((ch, i) => (
                      <motion.span
                        key={`${ch}-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + (word.offset + i) * 0.028,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={play}
              className="rounded-full border border-[var(--app-gold)]/50 px-5 py-2.5 text-app-micro uppercase tracking-app-label text-[var(--app-gold)]"
            >
              Play the moment
            </button>
          </div>
        )}
      </div>
      <p className="border-t border-[var(--app-line)] px-5 py-4 text-app-caption leading-relaxed text-[var(--app-muted)]">
        Per-letter stagger at 28ms, transform and opacity only. The field
        underneath is two rounds of domain-warped noise: the same maths a
        title sequence uses, running at 60fps on a phone.
      </p>
    </div>
  );
}
