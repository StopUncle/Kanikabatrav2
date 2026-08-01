import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

export const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";

/**
 * Concatenate the text blocks of a Messages response into one trimmed
 * string. Non-text blocks (tool use, thinking) are dropped. Callers
 * decide what an empty result means; most throw.
 */
export function extractText(response: Anthropic.Messages.Message): string {
  return response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
}

/**
 * Strip a wrapping markdown code fence when the model returns fenced
 * JSON anyway. Trims first, drops the opening fence line and the closing
 * fence, then trims the remainder. A fence-free string comes back
 * trimmed and otherwise untouched.
 */
export function stripCodeFences(text: string): string {
  let out = text.trim();
  if (out.startsWith("```")) {
    const firstNewline = out.indexOf("\n");
    if (firstNewline > -1) out = out.slice(firstNewline + 1);
    const lastFence = out.lastIndexOf("```");
    if (lastFence > -1) out = out.slice(0, lastFence);
    out = out.trim();
  }
  return out;
}

/** Token counts read off a Messages response usage block. */
export interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
}

/**
 * Per-model price in micros (USD millionths) per million tokens. Sonnet
 * drives the paid member features, Haiku the free public lead magnet,
 * Opus the daily scenario generator. Unknown models fall back to Sonnet
 * pricing in costMicros so a cost is never under-counted.
 */
export const MODEL_PRICING_MICROS: Record<
  string,
  { inputPerM: number; outputPerM: number }
> = {
  "claude-sonnet-4-6": { inputPerM: 3_000_000, outputPerM: 15_000_000 },
  "claude-sonnet-4-6-20250929": { inputPerM: 3_000_000, outputPerM: 15_000_000 },
  "claude-haiku-4-5-20251001": { inputPerM: 1_000_000, outputPerM: 5_000_000 },
  "claude-opus-4-8": { inputPerM: 5_000_000, outputPerM: 25_000_000 },
  "claude-sonnet-5": { inputPerM: 3_000_000, outputPerM: 15_000_000 },
  "claude-opus-5": { inputPerM: 5_000_000, outputPerM: 25_000_000 },
};

const FALLBACK_PRICING = MODEL_PRICING_MICROS["claude-sonnet-4-6-20250929"];

/**
 * Cost of a call in micros, from the model id and its token usage.
 * Unknown models are priced at the Sonnet rate so cost is never
 * under-counted; callers that care whether a model was priced can check
 * MODEL_PRICING_MICROS membership themselves.
 */
export function costMicros(model: string, usage: TokenUsage): number {
  const pricing = MODEL_PRICING_MICROS[model] ?? FALLBACK_PRICING;
  return Math.round(
    (usage.input_tokens / 1_000_000) * pricing.inputPerM +
      (usage.output_tokens / 1_000_000) * pricing.outputPerM,
  );
}
