"use client";

import { useGlSketch } from "@/lib/motion/gl";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * The seal's backdrop: domain-warped noise drifting like smoke in blood
 * tones, the tier 3 cinematic language applied to the app's heaviest
 * moment. One triangle, one draw call, no asset. Kept dim on purpose: the
 * ceremony card sits on top and the words stay the loudest thing there.
 *
 * Reduced motion renders nothing at all; the Ceremony's static veil is
 * the fallback. A missing WebGL2 context leaves the canvas blank, which
 * over the veil is invisible, so there is no error state to design.
 */

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float t = uTime * 0.05;

  vec2 q = vec2(
    fbm(uv * 1.35 + vec2(0.0, t)),
    fbm(uv * 1.35 + vec2(5.2, t * 1.3))
  );
  vec2 r = vec2(
    fbm(uv * 1.35 + q * 1.8 + vec2(1.7, 9.2) + t * 0.6),
    fbm(uv * 1.35 + q * 1.8 + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(uv * 1.35 + r * 1.6);
  float smoke = smoothstep(0.32, 0.88, f);

  vec3 base = vec3(0.022, 0.013, 0.011);
  vec3 blood = vec3(0.40, 0.085, 0.135);
  vec3 ember = vec3(0.66, 0.20, 0.19);

  vec3 col = base;
  col += blood * smoke * 0.40;
  col += ember * smoke * smoke * q.x * 0.30;

  float vig = 1.0 - smoothstep(0.45, 1.45, length(uv));
  col *= mix(0.5, 1.0, vig);

  float g = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.012;

  fragColor = vec4(col, 1.0);
}`;

export default function BloodVeil() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useGlSketch(FRAG, { maxDpr: 1.5 });
  if (reducedMotion) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
