"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useGlSketch, type UniformBag } from "@/lib/motion/gl";

/**
 * Tier three, part one: the silhouette, alive.
 *
 * The app already renders characters as silhouettes. This is the same idea
 * with the shape defined as a signed distance field in a fragment shader
 * rather than as artwork, which buys three things a PNG cannot:
 *
 *   1. It breathes. The figure is a function of time, so the chest rises,
 *      the head drifts, and nothing loops visibly.
 *   2. The rim light is computed from the surface normal, so it wraps the
 *      form correctly and can move. A baked highlight cannot move.
 *   3. It has states. One uniform takes the whole figure from composed to
 *      caught, with no second asset and no download.
 *
 * The cost is one draw call of one triangle. There is no texture, no mesh,
 * and no network request: the character weighs nothing.
 */

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uTell;
uniform float uBreath;

out vec4 fragColor;

const vec3 GOLD = vec3(0.831, 0.686, 0.216);
const vec3 ROSE = vec3(0.718, 0.431, 0.475);
const vec3 INK  = vec3(0.024, 0.020, 0.016);

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdEllipse(vec2 p, vec2 r) {
  float k1 = length(p / r);
  float k2 = length(p / (r * r));
  return k1 * (k1 - 1.0) / k2;
}

float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

/**
 * A capsule cannot be a torso: its one radius sets the width and the
 * thickness together, so anything wide enough to be shoulders is also
 * round enough to be a balloon. A rounded box separates the two.
 */
float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + r;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

/**
 * The figure as one function of position, so the normal can be sampled
 * from it by finite difference. Every offset below is time-varying, which
 * is what stops it reading as a decal.
 */
float figure(vec2 p) {
  float t = uTime;
  float breath = sin(t * 0.85) * 0.5 + 0.5;
  float rise = (breath - 0.5) * 0.016 * uBreath;
  float sway = sin(t * 0.31) * 0.007 * uBreath;
  float nod  = sin(t * 0.47 + 1.1) * 0.005 * uBreath;

  // Mirrored space, so one shoulder slope and one hair fall become two.
  vec2 q = vec2(abs(p.x), p.y);

  // The torso runs off the bottom of the frame on purpose. A silhouette
  // that floats clear of every edge reads as a sticker, not a person in a
  // room.
  float torso = sdRoundBox(
    p - vec2(0.0, -0.80 + rise * 0.30),
    vec2(0.42, 0.52 + rise * 0.25),
    0.16
  );
  // The sternum fills the hollow under the chin that the torso and the
  // shoulder slopes leave between them.
  float sternum = sdCapsule(
    p,
    vec2(0.0, -0.12 + rise * 0.5),
    vec2(0.0, -0.55),
    0.20 + rise * 0.2
  );
  // The trapezius. It has to blend hard into the torso: leave the join
  // sharp and the two ends read as separate lumps rather than a shoulder
  // line, which is the single tell that gives away a shape built from
  // primitives.
  float slope = sdCapsule(
    q,
    vec2(0.05, 0.00 + rise),
    vec2(0.30, -0.20 + rise * 0.5),
    0.14
  );
  float neck = sdCapsule(
    p,
    vec2(sway * 0.5, 0.30 + rise),
    vec2(0.0, 0.02 + rise * 0.4),
    0.072
  );
  float head = sdEllipse(p - vec2(sway, 0.450 + rise + nod), vec2(0.165, 0.205));
  // The hair sits high and wide rather than concentric with the head, so
  // the face clears it by a good margin. Centre the two and the silhouette
  // becomes one undifferentiated blob with a chin.
  float hair = sdEllipse(p - vec2(sway * 1.1, 0.545 + rise + nod), vec2(0.205, 0.200));
  // Stopping the hair at the shoulder line matters. Run it further and the
  // two falls close around the face and the whole figure reads as hooded.
  float fall = sdCapsule(
    q,
    vec2(0.158 + sway * 0.6, 0.48 + rise + nod),
    vec2(0.205 + sway * 0.6, 0.14 + rise),
    0.055
  );

  float d = smin(torso, sternum, 0.14);
  d = smin(d, slope, 0.17);
  d = smin(d, neck, 0.075);
  d = smin(d, fall, 0.045);
  d = smin(d, hair, 0.035);
  d = min(d, head);
  return d;
}

/**
 * The head alone. The face has to catch the key light differently from the
 * hair around it or the whole thing reads as one mass, and a mask is much
 * cheaper than modelling features that would not survive at this size.
 */
float faceOnly(vec2 p) {
  float t = uTime;
  float rise = (sin(t * 0.85) * 0.5 + 0.5 - 0.5) * 0.016 * uBreath;
  float sway = sin(t * 0.31) * 0.007 * uBreath;
  float nod  = sin(t * 0.47 + 1.1) * 0.005 * uBreath;
  return sdEllipse(p - vec2(sway, 0.435 + rise + nod), vec2(0.135, 0.175));
}

vec2 figureNormal(vec2 p) {
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec2(
    figure(p + e.xy) - figure(p - e.xy),
    figure(p + e.yx) - figure(p - e.yx)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  vec2 p = uv - vec2(0.0, 0.20);

  float d = figure(p);
  vec2 n = figureNormal(p);

  float aa = 2.2 / uRes.y;
  float inside = smoothstep(aa, -aa, d);

  // Bright exactly at the boundary, gone by rimW deep. Tightening it on
  // the tell is what makes the figure look like it snapped into focus.
  float rimW = mix(0.058, 0.028, uTell);
  float rimBand = inside * smoothstep(-rimW, 0.0, d);

  vec2 key = normalize(vec2(-0.88, 0.34 + sin(uTime * 0.21) * 0.24));
  float lit = clamp(dot(n, key), 0.0, 1.0);
  float fillTerm = clamp(dot(n, vec2(0.93, -0.16)), 0.0, 1.0);

  vec3 col = INK;
  col += INK * 1.25 * smoothstep(1.15, -0.45, length(uv - vec2(0.0, 0.33)));

  // Wrapped ambient across the whole interior, not only the edge. Without
  // it the figure reads as a wire outline of a person rather than a solid
  // one standing in the dark.
  float wrap = dot(n, key) * 0.5 + 0.5;
  vec3 body = INK * 1.45 + GOLD * 0.055 * wrap * wrap + ROSE * 0.018;
  col = mix(col, body, inside);

  // The face plane, lit from the same key so the head separates from the
  // hair without a single feature being drawn.
  float face = smoothstep(0.02, -0.05, faceOnly(p)) * inside;
  float faceLight = clamp(0.5 - p.x * 1.5, 0.0, 1.0);
  col += (GOLD * 0.10 + ROSE * 0.05) * face * faceLight;

  col += ROSE * fillTerm * rimBand * mix(0.22, 0.55, uTell);

  vec3 rimCol = mix(GOLD, vec3(1.0, 0.94, 0.80), uTell * 0.55);
  col += rimCol * pow(lit, 1.7) * rimBand * mix(1.55, 2.5, uTell);

  // The tell: one band of light climbs the figure and leaves.
  float sweepY = mix(-0.9, 1.1, uTell);
  float band = exp(-pow((p.y - sweepY) * 8.5, 2.0));
  float pulse = sin(uTell * 3.14159265);
  col += rimCol * band * inside * pulse * 0.5;
  col += ROSE * band * rimBand * pulse * 1.1;

  float g = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.013;

  col *= 1.0 - 0.38 * smoothstep(0.55, 1.65, length(uv));

  fragColor = vec4(col, 1.0);
}`;

export default function Presence() {
  const reduced = useReducedMotion();
  const [caught, setCaught] = useState(false);
  const uniforms = useRef<UniformBag>({ uTell: 0, uBreath: 1 });
  const canvasRef = useGlSketch(FRAG, { uniforms, still: reduced });

  useEffect(() => {
    uniforms.current.uBreath = reduced ? 0 : 1;
  }, [reduced]);

  const fireTell = () => {
    if (reduced || caught) return;
    setCaught(true);
    animate(0, 1, {
      duration: 1.15,
      ease: "linear",
      onUpdate: (v) => {
        uniforms.current.uTell = v;
      },
      onComplete: () => {
        uniforms.current.uTell = 0;
        setCaught(false);
      },
    });
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--app-line)] bg-[var(--app-void)]">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block h-[360px] w-full"
          aria-label="A silhouette rendered live, breathing"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
            {caught ? "She noticed you noticing" : "Composed"}
          </p>
          <p
            className="mt-1 text-app-display leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vesper
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--app-line)] px-5 py-4">
        <p className="text-app-caption leading-relaxed text-[var(--app-muted)]">
          No image, no mesh, no request. The whole character is a distance
          field and one triangle.
        </p>
        <button
          type="button"
          onClick={fireTell}
          disabled={reduced}
          className="shrink-0 rounded-full border border-[var(--app-gold)]/50 px-4 py-2 text-app-micro uppercase tracking-app-label text-[var(--app-gold)] disabled:opacity-40"
        >
          The tell
        </button>
      </div>
    </div>
  );
}
