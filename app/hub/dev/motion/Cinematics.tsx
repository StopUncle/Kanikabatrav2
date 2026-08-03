"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useGlSketch, type UniformBag } from "./gl";
import { CINEMATIC_HEADER } from "./toon";
import { Aside, Label } from "./TierOne";

/**
 * Four replacements for the trigger effects in `ImmersionOverlay.tsx`.
 *
 * Today all seven triggers there are the same effect wearing seven colours:
 * a radial gradient fades up and fades out. Victory and intimate-moment are
 * distinguishable only by hue, which mid-scene at speed means not at all. A
 * trigger earns its name by having a shape and a gesture, so each of these
 * has a silhouette you could recognise with the colour removed.
 *
 * Which four is decided by how often scenarios actually declare each one:
 * victory 15, red-flag-revealed 14, cold-moment 7, defeat 5. Together with
 * manipulation-detected, which already has its field, that is 56 of the 61
 * authored uses. Intimate-moment and shock are two uses each and a tint is
 * honestly enough for them.
 */

/* ------------------------------------------------------------------ */
/* victory: the verdict lands                                          */
/* ------------------------------------------------------------------ */

/**
 * A stamp, not a firework. The existing effect is a radial burst, which is
 * the language of confetti and prizes; this scene is a player being right
 * about a person. So: a ring rushes inward, a seal punches out past its own
 * size and settles back, and the shock leaves as rings.
 */
const VICTORY = `${CINEMATIC_HEADER}
void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float r = length(uv);
  float p = uProgress;
  vec3 col = vec3(0.0);

  // Anticipation. One hairline collapsing inward, accelerating, so the eye
  // is already at the centre before anything arrives there.
  float ta = seg(p, 0.0, 0.22);
  float antR = mix(1.35, 0.0, ta * ta);
  col += GOLD * ink(r - antR, 0.006) * (1.0 - ta) * 1.9;

  // Impact. The seal overshoots its radius and settles, which is the whole
  // difference between landing and appearing.
  float ti = seg(p, 0.20, 0.46);
  float sealR = 0.34 * easeOutBack(ti);
  float sealD = r - sealR;
  float solid = fill(sealD);

  // Cel-shaded interior: a radial ramp quantised into flat plates.
  float shade = 1.0 - clamp(r / max(sealR, 0.001), 0.0, 1.0);
  shade = band(shade * 0.85 + 0.15, 4.0, uToon);
  col += GOLD * solid * shade * 1.25;
  col += ROSE * solid * (1.0 - shade) * 0.30;

  // The outline. A cartoon reads by its edge before its fill.
  col += mix(GOLD, vec3(1.0, 0.95, 0.82), 0.5) * ink(sealD, 0.012) * 1.6;

  // A struck notch, so the seal has a mark on it rather than being a dot.
  float notch = abs(uv.y) - 0.055 * step(0.001, sealR);
  float bar = max(notch, abs(uv.x) - sealR * 0.52);
  col -= GOLD * fill(bar) * solid * 0.85;

  // Release: three rings leaving at different speeds. Staggering them is
  // what stops it reading as one expanding donut.
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float tw = seg(p, 0.30 + fi * 0.07, 0.92 + fi * 0.03);
    float wr = 0.30 + easeOutCubic(tw) * (1.45 + fi * 0.28);
    float w = mix(0.030, 0.004, tw);
    col += GOLD * ink(r - wr, w) * (1.0 - tw) * (1.05 - fi * 0.22);
  }

  col *= envelope(p, 0.06, 0.80);
  col = bandCol(col, 6.0, uToon * 0.7);
  col = grain(col, gl_FragCoord.xy, uTime, 0.016);
  fragColor = vec4(col, 1.0);
}`;

/* ------------------------------------------------------------------ */
/* red-flag-revealed: the flag                                         */
/* ------------------------------------------------------------------ */

/**
 * A hard chevron crossing the frame, with the flat colour bands trailing
 * behind its leading edge. A vignette says "something is wrong somewhere";
 * an edge travelling across the screen says "it came from over there and it
 * is here now", which is what a revealed flag actually is.
 */
const RED_FLAG = `${CINEMATIC_HEADER}
void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float p = uProgress;
  vec3 col = vec3(0.0);

  // Anticipation: the frame leans away from the edge the flag will enter.
  float ta = seg(p, 0.0, 0.14);
  col -= BURGUNDY * 0.10 * ta;

  // The leading edge is a V, not a line, so it reads as a warning mark
  // rather than a page transition.
  // Smoothstep, not easeOutCubic. An ease that is fast out of the gate puts
  // the edge off the far side while two thirds of the beat is still running.
  float ts = seg(p, 0.08, 0.80);
  float sweep = mix(-1.9, 2.9, ts * ts * (3.0 - 2.0 * ts));
  float edge = uv.x - (sweep + abs(uv.y) * 0.55);

  // A trailing band, not a fill. The plate is brightest at the edge and gone
  // about a screen height behind it, so what the scene was showing stays
  // readable while the warning passes over it. A full flood would just be a
  // red screen, which says nothing about direction.
  float trail = clamp(-edge / 1.15, 0.0, 1.0);
  float plates = band(1.0 - trail, 4.0, uToon);
  float body = smoothstep(0.02, -0.02, edge) * (1.0 - trail * trail);

  col += mix(BURGUNDY, ROSE, plates) * body * mix(0.55, 1.0, plates);
  col += vec3(1.0, 0.86, 0.80) * ink(edge, 0.016) * 1.35;

  // Three chevron ticks riding the edge, spaced up the frame.
  for (int i = 0; i < 3; i++) {
    float fi = float(i) - 1.0;
    vec2 q = uv - vec2(sweep + abs(uv.y) * 0.55 - 0.16, fi * 0.42);
    float tick = max(abs(abs(q.y) * 1.7 + q.x) - 0.028, abs(q.y) - 0.11);
    col += ROSE * ink(tick, 0.010) * 1.5;
  }

  // Retreat: the whole plate slides out rather than dissolving, because a
  // shape that fades where it stands admits it was never really there.
  float out_ = seg(p, 0.80, 1.0);
  col *= (1.0 - out_);

  col *= envelope(p, 0.05, 0.88);
  col = bandCol(col, 5.0, uToon * 0.8);
  col = grain(col, gl_FragCoord.xy, uTime, 0.014);
  fragColor = vec4(col, 1.0);
}`;

/* ------------------------------------------------------------------ */
/* cold-moment: the frost                                              */
/* ------------------------------------------------------------------ */

/**
 * The frame crystallises from the edges in. Voronoi cells with the distance
 * quantised hard, so they read as flat facets of ice with drawn borders
 * rather than as a blue haze. Desaturation alone is what the current effect
 * does, and desaturation is a mood, not an event.
 */
const COLD = `${CINEMATIC_HEADER}
/** F1 and the gap to F2. The gap is the cell border, which is the drawing. */
vec2 voronoi(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      float d = length(g + o - f);
      if (d < f1) { f2 = f1; f1 = d; }
      else if (d < f2) { f2 = d; }
    }
  }
  return vec2(f1, f2 - f1);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float p = uProgress;

  // Creeps in from the edges. The reach is eased so the last of the centre
  // goes suddenly, the way a window actually closes over.
  float t = seg(p, 0.0, 0.62);
  float reach = t * t;
  float front = mix(2.2, 0.16, reach);
  float mask = smoothstep(front - 0.08, front + 0.42, length(uv * vec2(0.92, 1.0)));

  vec2 v = voronoi(uv * 5.2 + vec2(0.0, uTime * 0.05));
  float facet = band(clamp(v.x * 1.25, 0.0, 1.0), 4.0, uToon);
  float border = smoothstep(0.06, 0.0, v.y);

  // The borders are the drawing and the fills are only a tint. Bright fills
  // turn this into frosted glass, which hides the scene it is meant to chill.
  vec3 col = mix(FROST * 0.09, FROST * 0.40, 1.0 - facet) * mask;
  col += FROST * border * mask * 0.75;
  col += vec3(0.86, 0.93, 1.0) * border * mask * mask * 0.45;

  // Spurs from the edge toward the centre, so it grows rather than appears.
  float spur = abs(sin(atan(uv.y, uv.x) * 7.0)) ;
  col += FROST * smoothstep(0.86, 1.0, spur) * mask * (1.0 - reach) * 0.7;

  col *= envelope(p, 0.10, 0.66);
  col = bandCol(col, 5.0, uToon * 0.75);
  col = grain(col, gl_FragCoord.xy, uTime, 0.012);
  fragColor = vec4(col, 1.0);
}`;

/* ------------------------------------------------------------------ */
/* defeat: the close                                                   */
/* ------------------------------------------------------------------ */

/**
 * An iris out, borrowed from exactly where you think. It is the oldest
 * cartoon punctuation there is, which is the point: it says "that is the
 * end of that" in a way no vignette can. Bitten and off-centre so it looks
 * drawn, and it opens a little first, because the biggest gesture in an
 * ending is the breath before it.
 */
const DEFEAT = `${CINEMATIC_HEADER}
void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  vec2 c = uv - vec2(0.10, -0.06);
  float p = uProgress;
  float a = atan(c.y, c.x);

  // A bitten edge: two harmonics of the angle, integer multiples so the
  // wobble closes on itself and there is never a seam at the wrap.
  float bite = sin(a * 5.0) * 0.030 + sin(a * 9.0 + 1.7) * 0.018;

  // Open, then close hard, then hold shut before releasing.
  float open = 1.0 + 0.16 * sin(seg(p, 0.0, 0.16) * PI);
  float shut = 1.0 - easeOutCubic(seg(p, 0.16, 0.62));
  float back = easeOutCubic(seg(p, 0.86, 1.0));
  // The wobble scales with the radius. As an absolute offset it is a rounding
  // error when the iris is wide and a starfish by the time it is nearly shut.
  float base = 1.62 * open * shut + 0.10 + back * 1.9;
  float radius = base * (1.0 + bite);

  float d = length(c) - radius;

  // The shutter is everything OUTSIDE the iris. What closes is the frame,
  // not a shape arriving in the middle of it.
  float shutter = 1.0 - fill(d);

  // Plates in the shutter, so the closing reads as drawn cels rather than as
  // the canvas simply being switched off.
  float plate = band(clamp(d * 0.85, 0.0, 1.0), 3.0, uToon);
  vec3 col = mix(BURGUNDY * 0.24, INK * 3.0, plate) * shutter;

  // The boundary bleeds, on the shutter side only: a ring drawn on both
  // sides reads as a hoop, and this has to read as the frame closing.
  col += ROSE * ink(d, 0.020) * 1.15;
  col += BURGUNDY * smoothstep(0.07, 0.0, abs(d - 0.04)) * 0.50 * shutter;

  col *= envelope(p, 0.05, 0.88);
  col = bandCol(col, 4.0, uToon * 0.6);
  col = grain(col, gl_FragCoord.xy, uTime, 0.014);
  fragColor = vec4(col, 1.0);
}`;

/* ------------------------------------------------------------------ */

interface Beat {
  frag: string;
  trigger: string;
  uses: number;
  title: string;
  socket: string;
  note: string;
  durationMs: number;
  words?: string;
}

const BEATS: Beat[] = [
  {
    frag: VICTORY,
    trigger: "victory",
    durationMs: 1600,
    uses: 15,
    title: "The verdict lands",
    socket: "Scenario ending, outcomeType good. Also the moment a Gauntlet run clears.",
    note: "A seal struck, not a burst. The ring rushes in before anything arrives, the stamp overshoots its own size by 12% and settles back, and only then does the shock leave as rings. Take the overshoot out and it stops landing and starts appearing.",
    words: "READ CORRECTLY",
  },
  {
    frag: RED_FLAG,
    trigger: "red-flag-revealed",
    durationMs: 1500,
    uses: 14,
    title: "The flag",
    socket: "Mid-scene, when a line the character just spoke is the tell.",
    note: "A hard chevron crossing the frame with flat plates trailing it. It enters from a direction and leaves in a direction, which is the difference between a warning and a mood. The current version is a red vignette, and a vignette has no direction at all.",
  },
  {
    frag: COLD,
    trigger: "cold-moment",
    durationMs: 2200,
    uses: 7,
    title: "The frost",
    socket: "Withdrawal, stonewalling, the silent treatment landing.",
    note: "Voronoi cells with the distance quantised into four plates, so it reads as facets of ice with drawn borders. It closes over from the edges and the last of the centre goes suddenly. Desaturation on its own is a mood; this is an event.",
  },
  {
    frag: DEFEAT,
    trigger: "defeat",
    durationMs: 2000,
    uses: 5,
    title: "The close",
    socket: "Scenario ending, outcomeType bad or failed. Gauntlet hesitation, if you want the clock to bite.",
    note: "An iris out, from exactly where you think. It is the oldest punctuation in animation and it means one thing only. Bitten at the edge and off-centre so it looks drawn, and it opens a little before it shuts, because the biggest gesture in an ending is the breath before it.",
  },
];

export default function Cinematics() {
  const [toon, setToon] = useState(0.45);

  return (
    <section>
      <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
        Tier three, applied
      </p>
      <h2
        className="mt-1 text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The beats the app already asks for
      </h2>
      <p className="mt-2 text-app-caption leading-relaxed text-[var(--app-muted)]">
        Every one of these has a socket waiting in{" "}
        <code className="text-[var(--app-gold-soft)]">ImmersionTrigger</code>,
        already declared by scenarios that ship today. Right now all seven
        triggers resolve to the same coloured gradient, so the effect a scene
        asked for and the effect it gets are only related by hue.
      </p>

      <div className="mt-6 rounded-[20px] border border-[var(--app-line)] bg-[var(--app-card)] px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor="toon"
            className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]"
          >
            How cartoonish
          </label>
          <span className="text-app-caption tabular-nums text-[var(--app-dim)]">
            {toon.toFixed(2)}
          </span>
        </div>
        <input
          id="toon"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={toon}
          onChange={(e) => setToon(Number(e.target.value))}
          className="mt-3 block w-full accent-[var(--app-gold)]"
        />
        <p className="mt-2.5 text-app-caption leading-relaxed text-[var(--app-muted)]">
          One number, live, across all four. At 0 every gradient is smooth
          and this is the same language as the noise field above. At 1 the
          shading collapses into flat plates with hard steps. Everything
          between is the honest answer to &ldquo;slightly&rdquo;, and it is a
          constant rather than a redraw, so wherever you leave it is shippable.
        </p>
      </div>

      {BEATS.map((beat) => (
        <Cinematic key={beat.trigger} beat={beat} toon={toon} />
      ))}
    </section>
  );
}

function Cinematic({ beat, toon }: { beat: Beat; toon: number }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const uniforms = useRef<UniformBag>({ uProgress: 0, uToon: toon });
  const canvasRef = useGlSketch(beat.frag, { uniforms, still: reduced });

  useEffect(() => {
    uniforms.current.uToon = toon;
  }, [toon]);

  const play = () => {
    if (playing) return;
    setPlaying(true);
    if (reduced) {
      window.setTimeout(() => setPlaying(false), 600);
      return;
    }
    animate(0, 1, {
      duration: beat.durationMs / 1000,
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
    <div className="mt-8">
      <Label>
        {beat.title}
        <span className="ml-2 normal-case tracking-normal text-[var(--app-dim)]">
          {beat.trigger}, {beat.uses} scenes
        </span>
      </Label>

      <div className="overflow-hidden rounded-[22px] border border-[var(--app-line)] bg-[var(--app-void)]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block h-[240px] w-full"
            aria-hidden
          />

          {playing && beat.words && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
              <p className="text-center text-[15px] uppercase leading-[2] tracking-[0.32em] text-[var(--app-text)]">
                {beat.words}
              </p>
            </div>
          )}

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
        <p className="border-t border-[var(--app-line)] px-5 py-3.5 text-app-micro uppercase tracking-app-label text-[var(--app-gold-soft)]">
          {beat.socket}
        </p>
      </div>
      <Aside>{beat.note}</Aside>
    </div>
  );
}
