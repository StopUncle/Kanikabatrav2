/**
 * Anthropic call for Receipts. Server-only.
 *
 * Receipts is the premium killer feature so we use Sonnet, not Haiku,
 * the model is the moat. Hard caps on input/output tokens to bound
 * cost. System prompt locked in lib/receipts/prompt.ts.
 */

import { getAnthropic } from "@/lib/anthropic";
import { RECEIPTS_SYSTEM_PROMPT, buildUserMessage } from "./prompt";

const RECEIPTS_MODEL = "claude-sonnet-4-6-20250929";
// Tier 0 of pricing for Sonnet 4.6 as of ship date. If the SKU changes,
// these numbers need to be re-tuned. costMicros below assumes USD * 10000.
const SONNET_INPUT_PER_M = 3_000_000; // micros per million input tokens
const SONNET_OUTPUT_PER_M = 15_000_000; // micros per million output tokens

export interface ReceiptsCallResult {
  response: string;
  inputTokens: number;
  outputTokens: number;
  costMicros: number;
  model: string;
}

const MAX_INPUT_CHARS = 12_000;

export class ReceiptsInputError extends Error {
  readonly kind: "too-short" | "too-long" | "empty";
  constructor(kind: "too-short" | "too-long" | "empty", message: string) {
    super(message);
    this.kind = kind;
  }
}

export async function callReceipts(
  rawInput: string,
  label?: string,
): Promise<ReceiptsCallResult> {
  const trimmed = rawInput.trim();
  if (trimmed.length === 0) {
    throw new ReceiptsInputError("empty", "Receipt input is empty.");
  }
  if (trimmed.length < 30) {
    throw new ReceiptsInputError(
      "too-short",
      "Receipt input must be at least 30 characters. Paste the full message.",
    );
  }
  if (trimmed.length > MAX_INPUT_CHARS) {
    throw new ReceiptsInputError(
      "too-long",
      `Receipt input must be under ${MAX_INPUT_CHARS} characters. Trim it down.`,
    );
  }

  const client = getAnthropic();
  const response = await client.messages.create({
    model: RECEIPTS_MODEL,
    max_tokens: 700,
    temperature: 0.5,
    system: RECEIPTS_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserMessage(trimmed, label),
      },
    ],
  });

  // Extract text from the response. Claude returns a content array
  // of typed blocks; only the "text" blocks have a .text field.
  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Receipts call returned no text.");
  }

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  const costMicros = Math.round(
    (inputTokens / 1_000_000) * SONNET_INPUT_PER_M +
      (outputTokens / 1_000_000) * SONNET_OUTPUT_PER_M,
  );

  return {
    response: text,
    inputTokens,
    outputTokens,
    costMicros,
    model: RECEIPTS_MODEL,
  };
}
