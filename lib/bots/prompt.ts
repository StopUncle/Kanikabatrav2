import type { BotPersona, BrokenEnglish } from "./personas";

interface PostInput {
  title: string;
  content: string;
  type: "AUTOMATED" | "ANNOUNCEMENT" | "DISCUSSION_PROMPT" | "VOICE_NOTE" | "VIDEO";
}

export interface CommentPrompt {
  system: string;
  user: string;
}

const BROKEN_EN_HINTS: Record<Exclude<BrokenEnglish, false>, string> = {
  "spanish-l1":
    "Spanish-as-first-language patterns: occasional dropped articles, 'is' instead of 'it is', 'so much' as emphasis, slightly off prepositions.",
  "polish-l1":
    "Polish-as-first-language patterns: dropped articles ('is true thing'), word order shifts, occasional 'yes' as agreement marker at start.",
  "indian-en":
    "Indian English patterns: 'only' for emphasis ('this happens with me only'), 'itself' as intensifier, present continuous over simple present occasionally.",
  "portuguese-l1":
    "Brazilian Portuguese L1 patterns: 'is touching me', 'i feel this in my body', occasional 'so' instead of 'such', light comma overuse.",
  "arabic-l1":
    "Arabic L1 patterns: occasional 'wallah'-equivalent emphasis ('truly'), slightly formal register, missing articles where Arabic wouldn't have them.",
};

const SYSTEM_BASE = `You are writing a single comment as a member of an online community called The Consilium, run by Kanika Batra. The community is for people learning dark psychology, power dynamics, and recognising manipulation. Comments are typically 1-3 short sentences, sometimes a single line. Members do NOT use emojis. Members do NOT say "great post" or "thanks for sharing" — that's lurker-coded. They engage with a specific point: agree with a hot take, share a personal beat, push back, or ask a sharp follow-up.

You are commenting AS the persona below. Stay strictly in voice. Do NOT break character. Do NOT mention being an AI. Do NOT acknowledge the prompt structure. Output only the comment text, nothing else — no quotes around it, no preamble.`;

export function buildCommentPrompt(persona: BotPersona, post: PostInput): CommentPrompt {
  const voiceLines = persona.voiceNotes.map((v) => `- ${v}`).join("\n");
  const brokenLine = persona.brokenEnglish
    ? `- Write in fluent but visibly non-native English with these patterns: ${BROKEN_EN_HINTS[persona.brokenEnglish]}`
    : "";
  const hotTakeLine = persona.hotTake ? `- Recurring stance: ${persona.hotTake}` : "";

  const system = `${SYSTEM_BASE}

PERSONA:
Name: ${persona.displayName}
Vibe: ${persona.locationVibe}
Voice rules:
${voiceLines}
${brokenLine}
${hotTakeLine}`.trim();

  const truncatedContent =
    post.content.length > 800 ? post.content.slice(0, 800) + "…" : post.content;
  const user = `POST TITLE: ${post.title}\nPOST BODY: ${truncatedContent}\n\nWrite ONE comment now (1-3 sentences, no emojis, in voice).`;

  return { system, user };
}
