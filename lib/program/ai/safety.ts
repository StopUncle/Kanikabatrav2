import { getAnthropic, extractText, stripCodeFences } from "@/lib/anthropic";
import { BANNED_PHRASES } from "./voice";

/**
 * The safety layer in front of and behind every generation.
 *
 * In front: the crisis classifier reads every journal entry BEFORE any reply
 * is generated. On a signal, generation never happens: the member gets a
 * fixed, human-written card, and the entry is flagged for admin review. The
 * statute (CA SB 243) requires the protocol to be documented, not just the
 * behaviour; this file is part of that documentation.
 *
 * Behind: the sweep. Regex checks for the two things that most reliably
 * betray a machine (the em dash and the banned-phrase list), applied to
 * every generated artefact before storage. It cannot catch tone; the admin
 * review queue samples for that. It catches the giveaways for free.
 */

export const CLASSIFIER_MODEL = "claude-haiku-4-5-20251001";

/**
 * Human-written, never generated, deliberately not in her voice. There is
 * no version of the dark edge that belongs anywhere near this.
 */
export const CRISIS_CARD = `This one is outside what the program does.

What you wrote reads like more than a hard week, and an AI writing in someone else's voice is the wrong thing to answer it. A real person is the right thing.

If you are in the US, call or text 988 (Suicide and Crisis Lifeline), any hour. Elsewhere, findahelpline.com lists free, confidential lines for your country.

Your journal is untouched and the program will be here whenever you come back to it. Nothing about your record changes because of this entry.`;

export interface EntryClassification {
  /** Self-harm or harm-to-others signal: fixed card, no generated reply. */
  crisis: boolean;
  /** Entry asks for a plan against a person: reply must redirect to observation. */
  targeting: boolean;
}

/**
 * Classify a journal entry before any reply work happens. Fails CLOSED on
 * crisis: if the classifier itself errors, the entry is treated as flagged
 * and a human looks at it. A missed real crisis costs everything; a false
 * flag costs one admin glance.
 */
export async function classifyEntry(body: string): Promise<EntryClassification> {
  try {
    const response = await getAnthropic().messages.create({
      model: CLASSIFIER_MODEL,
      max_tokens: 100,
      system:
        'You classify journal entries from a self-improvement program. Respond with ONLY a JSON object: {"crisis": boolean, "targeting": boolean}. "crisis" is true if the entry contains any signal of self-harm, suicide, or intent to physically harm someone. "targeting" is true if the entry asks for a plan, steps, or tactics to manipulate, damage, or get revenge on a specific person. Describing a difficult person or situation is NOT targeting; asking what to do TO them is.',
      messages: [{ role: "user", content: body.slice(0, 8000) }],
    });
    const parsed = JSON.parse(stripCodeFences(extractText(response))) as {
      crisis?: boolean;
      targeting?: boolean;
    };
    return { crisis: parsed.crisis === true, targeting: parsed.targeting === true };
  } catch (err) {
    console.error("[program/safety] classifier failed, failing closed", err);
    return { crisis: true, targeting: false };
  }
}

export interface SweepResult {
  ok: boolean;
  problems: string[];
}

/**
 * The post-generation sweep. Pure and synchronous, so it can also be a unit
 * test target and a pre-launch audit tool.
 */
export function sweepText(text: string): SweepResult {
  const problems: string[] = [];
  if (/—|&mdash;/.test(text)) problems.push("em dash");
  const lower = text.toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) problems.push(`banned phrase: "${phrase}"`);
  }
  // Surrogate-pair detection, because the tsconfig target predates the /u
  // flag. Catches the emoji planes without it.
  if (/[\uD83C-\uD83E][\uDC00-\uDFFF]/.test(text)) problems.push("emoji");
  return { ok: problems.length === 0, problems };
}
