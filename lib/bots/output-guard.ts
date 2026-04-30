export type GuardResult = { ok: true } | { ok: false; reason: string };

const SELF_REVEAL_PATTERNS = [
  /as an ai\b/i,
  /\bi'?m just\b/i,
  /\bas a language model\b/i,
  /\bi cannot (provide|generate)/i,
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

export function validateBotComment(text: string, priorOnPost: string[]): GuardResult {
  const trimmed = text.trim();

  if (trimmed.length === 0) return { ok: false, reason: "empty" };
  if (trimmed.length > 600) return { ok: false, reason: "too-long" };

  for (const re of SELF_REVEAL_PATTERNS) {
    if (re.test(trimmed)) return { ok: false, reason: "ai-self-reveal" };
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
  const stripped = trimmed.replace(EMOJI_PIECE_GLOBAL, "").trim();
  if (stripped.length < 5) return { ok: false, reason: "emoji-only" };

  for (const prior of priorOnPost) {
    if (prior.trim().toLowerCase() === trimmed.toLowerCase()) {
      return { ok: false, reason: "duplicate-of-prior" };
    }
  }

  return { ok: true };
}
