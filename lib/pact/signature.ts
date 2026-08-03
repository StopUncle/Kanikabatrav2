/**
 * The drawn signature, validated. Strokes are arrays of [x, y] pairs in
 * 0..1 canvas space. The signature is ceremony, not identity: it is only
 * ever drawn back to its owner, so the validation cares about size and
 * shape, nothing else.
 */

export type SignatureStrokes = number[][][];

const MAX_STROKES = 60;
const MAX_POINTS_PER_STROKE = 400;

export function parseSignatureData(value: unknown): SignatureStrokes | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  if (value.length > MAX_STROKES) return null;
  const strokes: SignatureStrokes = [];
  for (const stroke of value) {
    if (!Array.isArray(stroke) || stroke.length === 0) return null;
    if (stroke.length > MAX_POINTS_PER_STROKE) return null;
    const points: number[][] = [];
    for (const point of stroke) {
      if (
        !Array.isArray(point) ||
        point.length !== 2 ||
        typeof point[0] !== "number" ||
        typeof point[1] !== "number" ||
        !Number.isFinite(point[0]) ||
        !Number.isFinite(point[1])
      ) {
        return null;
      }
      // Clamp instead of reject: a stroke that wandered a hair off-canvas
      // is a hand, not an attack.
      points.push([
        Math.min(1, Math.max(0, point[0])),
        Math.min(1, Math.max(0, point[1])),
      ]);
    }
    strokes.push(points);
  }
  return strokes;
}
