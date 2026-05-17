/**
 * Scenario generator. Builds the prompt, calls the Anthropic API, and
 * returns the generated TypeScript source as a string. Pure I/O: no
 * filesystem writes, no validation. The caller (generate-scenario.ts)
 * owns the write and validation steps.
 *
 * Model: claude-opus-4-7. Scenarios are long and the prose quality
 * matters more than the speed; cheaper models tend to flatten the
 * editorial voice.
 */

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import type { ScenarioSpec } from "./scenario-spec-parser";
import { EXAMPLE_SCENE_FRAGMENT } from "./scenario-example-fragment";

const MODEL = "claude-opus-4-7";
const MAX_TOKENS = 16000;

export type GenerationOptions = {
  /** Path to the project root, used to read types.ts inline into the prompt. */
  projectRoot: string;
  /** Pass-through to the Anthropic SDK for testability. */
  apiKey?: string;
};

export type GenerationResult = {
  source: string;
  /** Tokens used in the call, for cost analytics. */
  usage: { input: number; output: number };
  /** The raw stop reason, for debugging truncation. */
  stopReason: string | null;
};

function readTypesContract(projectRoot: string): string {
  const p = path.join(projectRoot, "lib", "simulator", "types.ts");
  return fs.readFileSync(p, "utf8");
}

/**
 * The system prompt. Establishes the role and the hard rules. Kept
 * deliberately concise; the user message carries the variable content.
 */
function buildSystemPrompt(): string {
  return [
    "You are writing a scenario file for the Dark Mirror simulator on kanikarose.com.",
    "Each scenario is a TypeScript module that exports a default Scenario object satisfying a strict engine contract.",
    "You write the prose under Kanika Batra's voice: tactical, restrained, no melodrama.",
    "",
    "Hard rules (non-negotiable):",
    "- Output ONE TypeScript file. No prose before or after. No markdown fences in your reply.",
    "- The file must `import type { Scenario } from \"../../types\"` and `export default` a single Scenario.",
    "- Every scene `id` must be unique within the scenario.",
    "- Every `choice.nextSceneId` and every `scene.nextSceneId` must resolve to a real scene id in the same scenario.",
    "- Every choice `id` must be unique within its parent scene.",
    "- No self-loops: a scene's `nextSceneId` and every `choice.nextSceneId` must not equal the scene's own `id`.",
    "- Ending scenes have `isEnding: true`, `outcomeType`, `endingTitle`, and `endingSummary`. They do not have `choices` or `nextSceneId`.",
    "- Every non-ending scene has either `choices[]` or `nextSceneId` (else the run soft-locks).",
    "- Every dialog `speakerId` is either `\"inner-voice\"`, null, or an `id` in `characters[]`.",
    "- No em-dashes anywhere (project rule). Use commas, periods, colons, semicolons, or parentheses.",
    "- One choice per branching scene should be marked `isOptimal: true`. Failure choices may be marked `isOptimal: false`. Unset is acceptable for genuinely neutral choices.",
    "- Aim for 8 to 14 scenes total: an opening, two to three branching beats, two to four endings (good / neutral / bad), and auto-advance scenes connecting them.",
  ].join("\n");
}

function buildUserPrompt(spec: ScenarioSpec, specBody: string, typesContract: string): string {
  return [
    "# Engine contract (TypeScript)",
    "",
    "```ts",
    typesContract,
    "```",
    "",
    "# Spec",
    "",
    "```yaml",
    JSON.stringify(spec, null, 2),
    "```",
    "",
    "# Editorial brief",
    "",
    specBody,
    "",
    "# Example shape (fragment, do not copy literally, edit content)",
    "",
    "```ts",
    EXAMPLE_SCENE_FRAGMENT,
    "```",
    "",
    "# Task",
    "",
    `Write the file at \`lib/simulator/scenarios/${spec.track}/${spec.id}.ts\`. Use \`startSceneId: \"opening\"\` as a convention. Reply with ONLY the TypeScript file contents, no fences, no commentary.`,
  ].join("\n");
}

/**
 * Strip stray markdown code fences and prose if the model adds them
 * despite the system rule. We accept that the model occasionally
 * misbehaves and clean up rather than fail the entire run on a wrapper.
 */
function cleanResponse(raw: string): string {
  let out = raw.trim();
  if (out.startsWith("```")) {
    const firstNewline = out.indexOf("\n");
    if (firstNewline > -1) out = out.slice(firstNewline + 1);
    const lastFence = out.lastIndexOf("```");
    if (lastFence > -1) out = out.slice(0, lastFence);
  }
  return out.trim() + "\n";
}

export async function generateScenario(
  spec: ScenarioSpec,
  specBody: string,
  opts: GenerationOptions,
): Promise<GenerationResult> {
  const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Export it in your shell or .env before running the generator.",
    );
  }

  const client = new Anthropic({ apiKey });
  const typesContract = readTypesContract(opts.projectRoot);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: buildSystemPrompt(),
    messages: [
      { role: "user", content: buildUserPrompt(spec, specBody, typesContract) },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Anthropic response contained no text block.");
  }

  return {
    source: cleanResponse(textBlock.text),
    usage: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens,
    },
    stopReason: response.stop_reason,
  };
}
