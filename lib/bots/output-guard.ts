export type GuardResult = { ok: true } | { ok: false; reason: string };

const SELF_REVEAL_PATTERNS = [
  /as an ai\b/i,
  /\bi'?m just\b/i,
  /\bas a language model\b/i,
  /\bi cannot (provide|generate)/i,
];

// A bot claiming it cannot see the video is the AI admitting it never
// watched anything, in public. The media nouns keep this from eating
// legitimate persona lines like "they can't play the wounded card".
const MEDIA_COMPLAINT_PATTERNS = [
  /\b(can'?t|cannot|can not|unable to) (see|watch|play|open|view|hear|load) (the |this |that |your |a )?(vid\b|video|clip|audio|voice|note|link|it\b)/i,
  /\b(video|vid|clip|audio|voice note|link) (is |seems )?(broken|not working|not loading|missing)/i,
  /\b(won'?t|doesn'?t|isn'?t|not) load(ing)?\b/i,
  /\bon my end\b/i,
  /\blink broken\b/i,
  /\bwhat'?s (the|it) (topic|about)\b/i,
];

const LURKER_PATTERNS = [
  /\bgreat post\b/i,
  /\bthanks for sharing\b/i,
  /\bamazing content\b/i,
  /\binsightful as always\b/i,
  /\blove this\b/i,
  /\bthis hits\b/i,
  /\bso well said\b/i,
  /\bgreat write[\s-]?up\b/i,
  /\bneeded this today\b/i,
];

// Em dash and en dash are AI tells, humans typing on a phone never
// reach for U+2014. The model uses them everywhere unprompted, so even
// with a strong negative instruction in the system prompt we still
// reject as a backstop.
const TYPOGRAPHIC_DASH = /[—–]/;

// Surrogate-pair-aware emoji match. Covers the dominant emoji blocks
// without needing the `u` flag (which the project's ES5 target rejects).
// Catches the high-surrogate of any astral-plane char (most emoji) plus
// the BMP misc-symbols and dingbats blocks. Good enough for "starts
// with an emoji" / "is essentially just emoji" guards.
const EMOJI_PIECE = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[☀-➿⌀-⏿⬀-⯿]/;
const EMOJI_PIECE_GLOBAL = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[☀-➿⌀-⏿⬀-⯿]/g;

/**
 * Short is a rule, not a preference, so it is enforced here rather than
 * left to the prompt. A model told to be brief drifts long over a few
 * hundred generations, and the drift is invisible until the feed is full
 * of essays.
 *
 * 240 characters is about forty words: enough for a reaction and a half,
 * not enough for a thesis. A rejected comment simply does not get posted,
 * which is the direction we want to fail in anyway.
 */
const MAX_CHARS = 240;
const MAX_SENTENCES = 2;

/** Terminal punctuation runs, so "..." and "?!" each count once. */
function countSentences(text: string): number {
  const matches = text.match(/[.!?]+(\s|$)/g);
  if (!matches) return 1;
  // Trailing punctuation on the final sentence is not a separator.
  return /[.!?]\s*$/.test(text) ? matches.length : matches.length + 1;
}

export function validateBotComment(text: string, priorOnPost: string[]): GuardResult {
  const trimmed = text.trim();

  if (trimmed.length === 0) return { ok: false, reason: "empty" };
  if (trimmed.length > MAX_CHARS) return { ok: false, reason: "too-long" };
  if (countSentences(trimmed) > MAX_SENTENCES) {
    return { ok: false, reason: "too-many-sentences" };
  }

  for (const re of SELF_REVEAL_PATTERNS) {
    if (re.test(trimmed)) return { ok: false, reason: "ai-self-reveal" };
  }
  for (const re of MEDIA_COMPLAINT_PATTERNS) {
    if (re.test(trimmed)) return { ok: false, reason: "media-complaint" };
  }
  for (const re of LURKER_PATTERNS) {
    if (re.test(trimmed)) return { ok: false, reason: "lurker-opener" };
  }

  if (TYPOGRAPHIC_DASH.test(trimmed)) {
    return { ok: false, reason: "em-dash" };
  }

  const leadingEmojiMatch = trimmed.match(EMOJI_PIECE);
  if (leadingEmojiMatch && leadingEmojiMatch.index === 0) {
    return { ok: false, reason: "emoji-leading" };
  }
  // The minimum only applies when emoji were actually present. It exists to
  // catch "🔥🔥🔥", and without the guard it also rejected "oof." and "same.",
  // which are precisely the short reactions this is meant to encourage.
  const stripped = trimmed.replace(EMOJI_PIECE_GLOBAL, "").trim();
  if (stripped.length === 0) return { ok: false, reason: "emoji-only" };
  if (EMOJI_PIECE.test(trimmed) && stripped.length < 5) {
    return { ok: false, reason: "emoji-only" };
  }

  for (const prior of priorOnPost) {
    if (prior.trim().toLowerCase() === trimmed.toLowerCase()) {
      return { ok: false, reason: "duplicate-of-prior" };
    }
  }

  return { ok: true };
}
