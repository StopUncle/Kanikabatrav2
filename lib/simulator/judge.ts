/**
 * Freeform move judge. Server-only.
 *
 * Lets a player type their own move instead of tapping an authored
 * choice. The judge maps the typed move to the nearest authored choice
 * on the current scene and returns a short Kanika-voice read of what
 * the move actually does in the dynamics.
 *
 * The engine never sees free text. The judge resolves to a real
 * choiceId, so XP, streaks, replays, and the server-side replayXp
 * anti-cheat all run on exactly the same rails as a tapped choice.
 *
 * Model: Haiku. Judging is a classification-plus-one-line task; the
 * expensive voice work (the scenario prose itself) is already authored.
 */

import { z } from "zod";
import { getAnthropic, ANTHROPIC_MODEL } from "@/lib/anthropic";
import type { Scenario, Scene, Choice } from "./types";

const MAX_MOVE_CHARS = 300;
const MAX_READ_CHARS = 400;

export interface JudgeResult {
  /** Null when the move could not be mapped (gibberish, meta, off-topic). */
  choice: Choice | null;
  /** Kanika-voice read of the move. Always present. */
  read: string;
}

export class JudgeInputError extends Error {
  readonly kind: "too-short" | "too-long" | "no-scene" | "no-choices";
  constructor(kind: "too-short" | "too-long" | "no-scene" | "no-choices", message: string) {
    super(message);
    this.kind = kind;
  }
}

const JudgeOutput = z.object({
  choice: z.string(),
  read: z.string().min(1),
});

/** Letters used to label choices in the prompt: A, B, C... */
function letterFor(index: number): string {
  return String.fromCharCode(65 + index);
}

/**
 * Last few dialog lines of the scene, trimmed, so the judge knows what
 * the player is replying to without shipping the whole scenario.
 */
function sceneContext(scenario: Scenario, scene: Scene): string {
  const speakerName = (speakerId?: string | null): string => {
    if (!speakerId || speakerId === "inner-voice") return "Narration";
    return (
      scenario.characters.find((c) => c.id === speakerId)?.name ?? speakerId
    );
  };
  return scene.dialog
    .slice(-4)
    .map((l) => `${speakerName(l.speakerId)}: ${l.text.slice(0, 240)}`)
    .join("\n");
}

function buildSystemPrompt(): string {
  return [
    "You judge a player's typed move in a social-dynamics training simulator written in Kanika Batra's voice.",
    "The player is mid-scene and typed what they would say or do instead of tapping one of the authored choices.",
    "",
    "Your two jobs:",
    "1. Map the typed move to the ONE authored choice whose strategic intent it matches most closely. Match on intent and posture (appeasing, withdrawing, confronting, holding frame), not on surface wording.",
    "2. Write a \"read\": one or two sentences, second person, in Kanika's voice. Tactical, restrained, no melodrama. Name what the move actually does in the dynamics (what it signals, what it concedes, what it forces). Do not reveal which authored choice is optimal and do not mention the choice list.",
    "",
    "If the typed move is gibberish, a question to you, or has nothing to do with the scene, use \"NONE\" as the choice and write a one-line redirect telling the player to type what they would actually say or do in this moment.",
    "",
    "Hard rules:",
    "- Reply with ONLY a JSON object, no fences, no commentary: {\"choice\": \"<letter or NONE>\", \"read\": \"...\"}",
    "- The read must never use em dashes. Use commas, periods, colons, or parentheses.",
    "- Keep the read under 60 words.",
  ].join("\n");
}

function buildUserPrompt(
  scenario: Scenario,
  scene: Scene,
  choices: Choice[],
  move: string,
): string {
  const choiceLines = choices
    .map((c, i) => `${letterFor(i)}. ${c.text}`)
    .join("\n");
  return [
    `Scenario: ${scenario.title} (${scenario.tagline})`,
    "",
    "Scene (most recent lines):",
    sceneContext(scenario, scene),
    "",
    "Authored choices:",
    choiceLines,
    "",
    "Player's typed move:",
    move,
  ].join("\n");
}

/**
 * Strip stray markdown fences if the model wraps the JSON anyway, then
 * parse and validate. Throws on anything that doesn't conform.
 */
function parseJudgeOutput(raw: string): z.infer<typeof JudgeOutput> {
  let out = raw.trim();
  if (out.startsWith("```")) {
    const firstNewline = out.indexOf("\n");
    if (firstNewline > -1) out = out.slice(firstNewline + 1);
    const lastFence = out.lastIndexOf("```");
    if (lastFence > -1) out = out.slice(0, lastFence);
  }
  return JudgeOutput.parse(JSON.parse(out.trim()));
}

export async function judgeFreeformMove(
  scenario: Scenario,
  sceneId: string,
  rawMove: string,
): Promise<JudgeResult> {
  const move = rawMove.trim();
  if (move.length < 2) {
    throw new JudgeInputError("too-short", "Type the move you would make.");
  }
  if (move.length > MAX_MOVE_CHARS) {
    throw new JudgeInputError(
      "too-long",
      `Keep your move under ${MAX_MOVE_CHARS} characters.`,
    );
  }

  const scene = scenario.scenes.find((s) => s.id === sceneId);
  if (!scene) {
    throw new JudgeInputError("no-scene", "Unknown scene.");
  }
  const choices = scene.choices ?? [];
  if (choices.length === 0) {
    throw new JudgeInputError("no-choices", "This scene has no choices.");
  }

  const client = getAnthropic();
  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 300,
    temperature: 0.3,
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildUserPrompt(scenario, scene, choices, move),
      },
    ],
  });

  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  if (!text) throw new Error("Judge returned no text.");

  const parsed = parseJudgeOutput(text);
  const read = parsed.read.slice(0, MAX_READ_CHARS);

  const letter = parsed.choice.trim().toUpperCase();
  if (letter === "NONE") {
    return { choice: null, read };
  }

  const index = letter.charCodeAt(0) - 65;
  const choice = choices[index];
  if (!choice || letter.length !== 1) {
    // The model named a letter that doesn't exist. Treat as unmappable
    // rather than guessing; the player just retypes or taps a card.
    return { choice: null, read };
  }

  return { choice, read };
}
