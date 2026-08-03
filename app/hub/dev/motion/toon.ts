/**
 * The shared cartoon toolkit, as one GLSL prelude.
 *
 * "Slightly cartoonish" is three techniques, not a style, and keeping them
 * in one file is what stops four shaders drifting into four house styles:
 *
 *   1. Cel banding. A smooth gradient becomes flat regions with hard steps.
 *      This is the single biggest lever and it is what `uToon` drives, so
 *      how cartoonish the whole set looks is one number.
 *   2. An ink line. Cartoon shapes have outlines; photographs do not. Drawn
 *      from the distance field with `fwidth`, so it holds one pixel of width
 *      at any resolution instead of thickening on a retina screen.
 *   3. Anticipation and overshoot in the timing. Pull back before the hit,
 *      go past the target on the way out, settle back. Everything here that
 *      pops uses `easeOutBack` rather than a linear ramp.
 *
 * Banding runs on luminance and the colour is scaled to match, never on the
 * three channels separately: quantising red, green and blue independently
 * splits a gold edge into orange and green fringes.
 */
export const TOON_PRELUDE = `
const vec3 GOLD     = vec3(0.831, 0.686, 0.216);
const vec3 ROSE     = vec3(0.718, 0.431, 0.475);
const vec3 BURGUNDY = vec3(0.447, 0.129, 0.224);
const vec3 FROST    = vec3(0.530, 0.620, 0.720);
const vec3 INK      = vec3(0.024, 0.020, 0.016);
const float PI = 3.14159265;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

/** Flatten a 0..1 value into hard steps, mixed back by amount. */
float band(float x, float steps, float amount) {
  float q = floor(x * steps + 0.5) / steps;
  return mix(x, q, amount);
}

/** The same, on a colour, preserving hue by scaling rather than quantising. */
vec3 bandCol(vec3 c, float steps, float amount) {
  float l = luma(c);
  if (l < 0.0005) return c;
  return c * (band(l, steps, amount) / l);
}

/** One pixel of outline at any DPR, from the distance field itself. */
float ink(float d, float w) {
  float aa = fwidth(d);
  return smoothstep(w + aa, max(w - aa, 0.0), abs(d));
}

/** Solid inside a distance field, antialiased by the local gradient. */
float fill(float d) {
  float aa = fwidth(d) * 1.2;
  return smoothstep(aa, -aa, d);
}

/** Local 0..1 time inside one phase of a longer progress value. */
float seg(float p, float a, float b) {
  return clamp((p - a) / max(b - a, 0.00001), 0.0, 1.0);
}

/** Overshoots the target and settles back. The pop in squash and stretch. */
float easeOutBack(float t) {
  float s = 1.70158;
  float u = t - 1.0;
  return 1.0 + (s + 1.0) * u * u * u + s * u * u;
}

/** Fast out of the gate, long tail. The gesture of something released. */
float easeOutCubic(float t) {
  float u = 1.0 - t;
  return 1.0 - u * u * u;
}

/** Rises, holds, releases slower than it rose. Anything symmetric blinks. */
float envelope(float p, float inEnd, float outStart) {
  return smoothstep(0.0, inEnd, p) * (1.0 - smoothstep(outStart, 1.0, p));
}

float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

vec2 hash2(vec2 p) {
  return fract(vec2(hash(p), hash(p + 17.31)));
}

/** Film grain, kept low. Without it flat cel regions look like vector art. */
vec3 grain(vec3 c, vec2 frag, float t, float amount) {
  float g = fract(sin(dot(frag + t, vec2(12.9898, 78.233))) * 43758.5453);
  return c + (g - 0.5) * amount;
}
`;

/** Prefix for every cinematic, so no shader repeats its own boilerplate. */
export const CINEMATIC_HEADER = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform float uToon;

out vec4 fragColor;
${TOON_PRELUDE}
`;
