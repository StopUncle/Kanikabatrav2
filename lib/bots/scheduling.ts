import type { BotPersona, PostTypeAffinity } from "./personas";

export type SeedRng = () => number;
export const defaultRng: SeedRng = Math.random;

interface VolumeRange {
  min: number;
  max: number;
}

const COMMENT_VOLUME: Record<PostTypeAffinity | "ANNOUNCEMENT_PINNED", VolumeRange> = {
  AUTOMATED: { min: 3, max: 5 },
  ANNOUNCEMENT: { min: 5, max: 9 },
  ANNOUNCEMENT_PINNED: { min: 2, max: 4 },
  DISCUSSION_PROMPT: { min: 7, max: 12 },
  VOICE_NOTE: { min: 6, max: 10 },
  VIDEO: { min: 6, max: 10 },
};

const LIKE_VOLUME: Record<PostTypeAffinity | "ANNOUNCEMENT_PINNED", VolumeRange> = {
  AUTOMATED: { min: 10, max: 18 },
  ANNOUNCEMENT: { min: 12, max: 20 },
  ANNOUNCEMENT_PINNED: { min: 10, max: 15 },
  DISCUSSION_PROMPT: { min: 14, max: 20 },
  VOICE_NOTE: { min: 12, max: 20 },
  VIDEO: { min: 12, max: 20 },
};

function uniformInt(rng: SeedRng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function pickCommentCount(
  type: PostTypeAffinity,
  isPinned: boolean,
  rng: SeedRng = defaultRng,
): number {
  const key = type === "ANNOUNCEMENT" && isPinned ? "ANNOUNCEMENT_PINNED" : type;
  const r = COMMENT_VOLUME[key];
  return uniformInt(rng, r.min, r.max);
}

export function pickLikeCount(
  type: PostTypeAffinity,
  isPinned: boolean,
  rng: SeedRng = defaultRng,
): number {
  const key = type === "ANNOUNCEMENT" && isPinned ? "ANNOUNCEMENT_PINNED" : type;
  const r = LIKE_VOLUME[key];
  return uniformInt(rng, r.min, r.max);
}

const FRONT_FRACTION = 0.7;
const FRONT_WINDOW_MS = 90 * 60 * 1000;
const TAIL_MIN_MS = 48 * 60 * 60 * 1000;
const TAIL_MAX_MS = 72 * 60 * 60 * 1000;

// Math.pow(u, 1.6) on uniform u in [0,1] approximates a Beta-like
// distribution concentrated near 0, gives us "first comment lands in
// the first ~10 min, density tapers across the 90-min window".
function frontDraw(rng: SeedRng): number {
  return Math.pow(rng(), 1.6);
}

function timestampsForCurve(count: number, postCreatedAt: Date, rng: SeedRng): Date[] {
  const out: Date[] = [];
  const tailEndOffset = TAIL_MIN_MS + Math.floor(rng() * (TAIL_MAX_MS - TAIL_MIN_MS));
  const baseMs = postCreatedAt.getTime();

  for (let i = 0; i < count; i++) {
    let ms: number;
    if (rng() < FRONT_FRACTION) {
      ms = frontDraw(rng) * FRONT_WINDOW_MS;
    } else {
      const min = FRONT_WINDOW_MS;
      ms = min + rng() * (tailEndOffset - min);
    }
    out.push(new Date(baseMs + ms));
  }
  return out.sort((a, b) => a.getTime() - b.getTime());
}

export function drawCommentSchedule(
  count: number,
  postCreatedAt: Date,
  rng: SeedRng = defaultRng,
): Date[] {
  return timestampsForCurve(count, postCreatedAt, rng);
}

export function drawLikeSchedule(
  count: number,
  postCreatedAt: Date,
  rng: SeedRng = defaultRng,
): Date[] {
  return timestampsForCurve(count, postCreatedAt, rng);
}

const RECENCY_DECAY = 0.3;

export function selectBotsWeighted(
  pool: BotPersona[],
  postType: PostTypeAffinity,
  n: number,
  recentlyActiveSlugs: string[],
  rng: SeedRng = defaultRng,
): BotPersona[] {
  const recentSet = new Set(recentlyActiveSlugs);

  const weighted = pool
    .filter((p) => p.active)
    .map((p) => {
      const affinity = p.reactsTo.includes(postType) ? 1.0 : 0.4;
      const recency = recentSet.has(p.slug) ? RECENCY_DECAY : 1.0;
      return { persona: p, w: p.weight * affinity * recency };
    });

  const picked: BotPersona[] = [];
  const remaining = [...weighted];

  while (picked.length < n && remaining.length > 0) {
    const total = remaining.reduce((s, x) => s + x.w, 0);
    if (total <= 0) break;
    let r = rng() * total;
    let i = 0;
    while (i < remaining.length) {
      r -= remaining[i].w;
      if (r <= 0) break;
      i++;
    }
    if (i >= remaining.length) i = remaining.length - 1;
    picked.push(remaining[i].persona);
    remaining.splice(i, 1);
  }

  return picked;
}
