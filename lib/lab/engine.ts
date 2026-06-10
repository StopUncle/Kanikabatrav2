/**
 * Lab engine: the two LLM calls behind a session. Server-only.
 *
 * labReply runs the persona on Sonnet (the roleplay quality IS the
 * feature, same reasoning as Receipts). scoreLabSession runs a Haiku
 * judge over the finished transcript.
 *
 * Cost is tracked in micros per call and accumulated on the session
 * row, mirroring the Receipt costMicros convention.
 */

import { z } from "zod";
import { getAnthropic, ANTHROPIC_MODEL } from "@/lib/anthropic";
import type { LabPersona } from "./personas";

const LAB_MODEL = "claude-sonnet-4-6";
const SONNET_INPUT_PER_M = 3_000_000; // micros per million input tokens
const SONNET_OUTPUT_PER_M = 15_000_000;
const HAIKU_INPUT_PER_M = 1_000_000;
const HAIKU_OUTPUT_PER_M = 5_000_000;

/** Player messages allowed per session. Server-enforced. */
export const LAB_MAX_TURNS = 16;
/** Sessions a member can start per rolling 24h. */
export const LAB_DAILY_CAP = 1;
/** Max characters per player message. */
export const LAB_MAX_MSG_CHARS = 400;
/** Minimum player turns before a session is scoreable. */
export const LAB_MIN_TURNS_TO_SCORE = 3;

export interface TranscriptMessage {
  role: "user" | "persona";
  text: string;
  at: string;
}

export interface LabScore {
  axes: {
    /** Did they spot the tactics as tactics? */
    recognition: number;
    /** Did they set and hold boundaries? */
    boundaries: number;
    /** Did they stay regulated, or appease / over-explain / JADE? */
    composure: number;
    /** Did they control the exit instead of getting pulled deeper? */
    exit: number;
  };
  outcome: "held" | "mixed" | "played";
  verdict: string;
}

function costMicros(
  inputTokens: number,
  outputTokens: number,
  perMIn: number,
  perMOut: number,
): number {
  return Math.round(
    (inputTokens / 1_000_000) * perMIn + (outputTokens / 1_000_000) * perMOut,
  );
}

function toModelMessages(
  transcript: TranscriptMessage[],
): { role: "user" | "assistant"; content: string }[] {
  return transcript.map((m) => ({
    role: m.role === "persona" ? ("assistant" as const) : ("user" as const),
    content: m.text,
  }));
}

export async function labReply(
  persona: LabPersona,
  transcript: TranscriptMessage[],
): Promise<{ text: string; costMicros: number }> {
  const client = getAnthropic();
  const response = await client.messages.create({
    model: LAB_MODEL,
    max_tokens: 220,
    temperature: 0.8,
    system: persona.systemPrompt,
    messages: toModelMessages(transcript),
  });

  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  if (!text) throw new Error("Lab persona returned no text.");

  return {
    text,
    costMicros: costMicros(
      response.usage.input_tokens,
      response.usage.output_tokens,
      SONNET_INPUT_PER_M,
      SONNET_OUTPUT_PER_M,
    ),
  };
}

const ScoreOutput = z.object({
  recognition: z.number().min(0).max(100),
  boundaries: z.number().min(0).max(100),
  composure: z.number().min(0).max(100),
  exit: z.number().min(0).max(100),
  outcome: z.enum(["held", "mixed", "played"]),
  verdict: z.string().min(1),
});

const SCORE_SYSTEM = [
  "You score a finished sparring session from a social-instincts training simulator. A member just finished a conversation with a fictional manipulator archetype. You grade the MEMBER's performance, not the persona's.",
  "",
  "Score four axes, 0 to 100 each:",
  "- recognition: did they spot the tactics as tactics, early?",
  "- boundaries: did they set clear limits and hold them under pressure?",
  "- composure: did they stay regulated? Appeasing, over-explaining, justifying, and apologizing all cost points.",
  "- exit: did they control how the exchange ended, or get pulled deeper?",
  "",
  "Then pick an outcome: \"held\" (they ran the exchange), \"mixed\" (some ground given), or \"played\" (the persona ran them).",
  "",
  "Then write a verdict: 2 to 3 sentences, second person, Kanika Batra's voice. Tactical, restrained, no melodrama, never cruel about the member. Name the single best move they made and the single most expensive one. Never use em dashes.",
  "",
  "Reply with ONLY a JSON object, no fences: {\"recognition\": n, \"boundaries\": n, \"composure\": n, \"exit\": n, \"outcome\": \"...\", \"verdict\": \"...\"}",
].join("\n");

export async function scoreLabSession(
  persona: LabPersona,
  transcript: TranscriptMessage[],
): Promise<{ score: LabScore; costMicros: number }> {
  const client = getAnthropic();
  const conversation = transcript
    .map((m) => `${m.role === "persona" ? persona.name : "Member"}: ${m.text}`)
    .join("\n");

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 400,
    temperature: 0.2,
    system: SCORE_SYSTEM,
    messages: [
      {
        role: "user",
        content: [
          `Archetype: ${persona.title} (${persona.brief})`,
          "",
          "Transcript:",
          conversation,
        ].join("\n"),
      },
    ],
  });

  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  if (!text) throw new Error("Lab judge returned no text.");

  let cleaned = text;
  if (cleaned.startsWith("```")) {
    const firstNewline = cleaned.indexOf("\n");
    if (firstNewline > -1) cleaned = cleaned.slice(firstNewline + 1);
    const lastFence = cleaned.lastIndexOf("```");
    if (lastFence > -1) cleaned = cleaned.slice(0, lastFence);
  }
  const parsed = ScoreOutput.parse(JSON.parse(cleaned.trim()));

  return {
    score: {
      axes: {
        recognition: Math.round(parsed.recognition),
        boundaries: Math.round(parsed.boundaries),
        composure: Math.round(parsed.composure),
        exit: Math.round(parsed.exit),
      },
      outcome: parsed.outcome,
      verdict: parsed.verdict.slice(0, 600),
    },
    costMicros: costMicros(
      response.usage.input_tokens,
      response.usage.output_tokens,
      HAIKU_INPUT_PER_M,
      HAIKU_OUTPUT_PER_M,
    ),
  };
}
