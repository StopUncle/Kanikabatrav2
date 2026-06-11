/**
 * Content repurposer. Server-only.
 *
 * The flywheel: Kanika already makes content daily for 670K followers.
 * This turns one raw hook (a reel script, a tactic, an observation) into
 * a set of on-brand Consilium assets she only has to APPROVE, not author.
 * It severs the founder-content-treadmill dependency that stalled subs
 * and killed Cinderella's Revenge, and it feeds the daily surface (where
 * a published insight now also pushes members, closing the loop).
 *
 * One creative act in, four product assets out:
 *   - insight       a feed post (a sharp psychological read)
 *   - prompt        a discussion prompt that pulls comments
 *   - quizAngle     a quiz question idea
 *   - scenarioSeed  a one-paragraph simulator brief
 *
 * Model: Opus. This goes out under her name; voice quality is the moat,
 * and it runs a few times a day at most, so the cost is trivial.
 */

import { z } from "zod";
import { getAnthropic } from "@/lib/anthropic";

const MODEL = "claude-opus-4-8";
const MAX_INPUT_CHARS = 4000;

const RepurposeOutput = z.object({
  insight: z.object({ title: z.string().min(1), body: z.string().min(1) }),
  prompt: z.object({ title: z.string().min(1), body: z.string().min(1) }),
  quizAngle: z.string().min(1),
  scenarioSeed: z.string().min(1),
});

export type RepurposeResult = z.infer<typeof RepurposeOutput>;

export class RepurposeInputError extends Error {}

const SYSTEM = [
  "You are Kanika Batra's content engine for the Consilium (her paid dark-psychology membership). You take one raw hook (a reel script, a tactic, a situation, an observation) and turn it into on-brand member content.",
  "",
  "Her voice: tactical, restrained, observational. Dark psychology, power dynamics, reading people, manipulation defence. First-person lived authority (she is a clinically diagnosed sociopath). No melodrama, no therapy-speak, no hype, no emojis. Speaks to women who are done being the ones who get played.",
  "",
  "From the hook, produce four assets:",
  "1. insight: a feed post. A sharp, self-contained psychological read, 120 to 180 words. Title is a 3 to 7 word hook. Body names a pattern and what to do about it.",
  "2. prompt: a discussion prompt designed to make members COMMENT (the feed has low participation, so this must invite a personal answer). Title is the question short-form; body is one or two sentences that lower the bar to reply.",
  "3. quizAngle: one sentence describing a quiz question or angle this hook could seed.",
  "4. scenarioSeed: one paragraph briefing a branching simulator scenario this hook could become (the situation, the manipulator's move, what the player must learn).",
  "",
  "Hard rules: reply with ONE JSON object only, no markdown fences, no commentary. Never use em dashes (use commas, periods, colons, or parentheses). Match the exact shape:",
  '{"insight":{"title":"...","body":"..."},"prompt":{"title":"...","body":"..."},"quizAngle":"...","scenarioSeed":"..."}',
].join("\n");

export async function repurposeHook(hook: string): Promise<RepurposeResult> {
  const trimmed = hook.trim();
  if (trimmed.length < 8) {
    throw new RepurposeInputError("Give me a hook to work with (a tactic, a line, a situation).");
  }
  if (trimmed.length > MAX_INPUT_CHARS) {
    throw new RepurposeInputError(`Keep the hook under ${MAX_INPUT_CHARS} characters.`);
  }

  const client = getAnthropic();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1600,
    system: SYSTEM,
    messages: [{ role: "user", content: `Hook:\n${trimmed}` }],
  });

  let text = response.content
    .flatMap((b) => (b.type === "text" ? [b.text] : []))
    .join("\n")
    .trim();
  if (text.startsWith("```")) {
    const firstNewline = text.indexOf("\n");
    if (firstNewline > -1) text = text.slice(firstNewline + 1);
    const lastFence = text.lastIndexOf("```");
    if (lastFence > -1) text = text.slice(0, lastFence);
    text = text.trim();
  }
  if (!text) throw new Error("Repurposer returned no text.");

  return RepurposeOutput.parse(JSON.parse(text));
}
