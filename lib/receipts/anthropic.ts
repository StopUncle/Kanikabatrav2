/**
 * Anthropic call for Receipts. Server-only.
 *
 * Receipts is the premium killer feature so we use Sonnet, not Haiku,
 * the model is the moat. Hard caps on input/output tokens to bound
 * cost. System prompt locked in lib/receipts/prompt.ts.
 */

import { getAnthropic } from "@/lib/anthropic";
import { RECEIPTS_SYSTEM_PROMPT, buildUserMessage } from "./prompt";
import { logger } from "@/lib/logger";

const RECEIPTS_MODEL = "claude-sonnet-4-6-20250929";

// Per-model pricing in micros (USD millionths) per million tokens. Sonnet
// drives the paid member feature ("the model is the moat"); Haiku drives the
// free public lead magnet, where volume matters more than the last 5% of
// nuance. Re-tune if the SKUs change. Unknown models fall back to Sonnet
// pricing so a cost is never under-counted.
const PRICING: Record<string, { inputPerM: number; outputPerM: number }> = {
  "claude-sonnet-4-6-20250929": { inputPerM: 3_000_000, outputPerM: 15_000_000 },
  "claude-haiku-4-5-20251001": { inputPerM: 1_000_000, outputPerM: 5_000_000 },
};

export interface CallReceiptsOptions {
  /** Model id to call. Defaults to Sonnet (the paid member tier). The free
   *  public route passes Haiku to bound cost at volume. */
  model?: string;
  /** System prompt override. Defaults to the member prompt. The public route
   *  passes a hardened variant (never label a named real person). */
  systemPrompt?: string;
}

export interface ReceiptsCallResult {
  response: string;
  inputTokens: number;
  outputTokens: number;
  costMicros: number;
  model: string;
}

export interface ReceiptImage {
  /** Base64-encoded image data, no data: URL prefix. */
  base64: string;
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
}

const MAX_INPUT_CHARS = 12_000;
const MAX_IMAGES = 2;
// 4MB raw per image. Anthropic accepts up to 5MB per image but we cap
// at 4MB so the JSON-encoded body (with base64 expansion ~1.37x) stays
// under typical 4.5MB serverless body limits.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export class ReceiptsInputError extends Error {
  readonly kind:
    | "too-short"
    | "too-long"
    | "empty"
    | "image-invalid"
    | "image-too-large"
    | "image-too-many";
  constructor(
    kind:
      | "too-short"
      | "too-long"
      | "empty"
      | "image-invalid"
      | "image-too-large"
      | "image-too-many",
    message: string,
  ) {
    super(message);
    this.kind = kind;
  }
}

export async function callReceipts(
  rawInput: string,
  label?: string,
  images?: ReceiptImage[],
  options?: CallReceiptsOptions,
): Promise<ReceiptsCallResult> {
  const model = options?.model ?? RECEIPTS_MODEL;
  const systemPrompt = options?.systemPrompt ?? RECEIPTS_SYSTEM_PROMPT;
  const trimmed = rawInput.trim();
  const imageList = images ?? [];

  // Validate images first so a too-large image fails before we waste
  // any work on the text path.
  if (imageList.length > MAX_IMAGES) {
    throw new ReceiptsInputError(
      "image-too-many",
      `At most ${MAX_IMAGES} screenshots per receipt.`,
    );
  }
  for (const img of imageList) {
    if (
      !img ||
      typeof img.base64 !== "string" ||
      typeof img.mediaType !== "string"
    ) {
      throw new ReceiptsInputError("image-invalid", "Invalid image payload.");
    }
    // base64.length * 0.75 ≈ raw byte count.
    const rawBytes = Math.ceil((img.base64.length * 3) / 4);
    if (rawBytes > MAX_IMAGE_BYTES) {
      throw new ReceiptsInputError(
        "image-too-large",
        `Each screenshot must be under ${Math.round(MAX_IMAGE_BYTES / (1024 * 1024))}MB.`,
      );
    }
  }

  // Input must carry SOME signal: either text (≥30 chars) or at least
  // one image. The "screenshot of an exchange with no additional
  // context" path is supported and common.
  if (trimmed.length === 0 && imageList.length === 0) {
    throw new ReceiptsInputError(
      "empty",
      "Paste a message or attach a screenshot.",
    );
  }
  if (trimmed.length > 0 && trimmed.length < 30 && imageList.length === 0) {
    throw new ReceiptsInputError(
      "too-short",
      "Paste the full exchange. Minimum 30 characters when there's no screenshot.",
    );
  }
  if (trimmed.length > MAX_INPUT_CHARS) {
    throw new ReceiptsInputError(
      "too-long",
      `Receipt input must be under ${MAX_INPUT_CHARS} characters. Trim it down.`,
    );
  }

  // Build the Claude messages array. When images are present we send a
  // multi-block content array (image blocks first so Claude knows the
  // visual context before reading any user-supplied text). When text-
  // only, keep the original single-string path for parity.
  const userMessageText = buildUserMessage(trimmed, label, imageList.length);
  const content =
    imageList.length === 0
      ? userMessageText
      : ([
          ...imageList.map((img) => ({
            type: "image" as const,
            source: {
              type: "base64" as const,
              media_type: img.mediaType,
              data: img.base64,
            },
          })),
          { type: "text" as const, text: userMessageText },
        ]);

  const client = getAnthropic();
  const response = await client.messages.create({
    model,
    max_tokens: 700,
    temperature: 0.5,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content,
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
  const pricing = PRICING[model];
  if (!pricing) {
    logger.warn("[receipts] no pricing for model, using Sonnet rate", { model });
  }
  const { inputPerM, outputPerM } = pricing ?? PRICING[RECEIPTS_MODEL];
  const costMicros = Math.round(
    (inputTokens / 1_000_000) * inputPerM +
      (outputTokens / 1_000_000) * outputPerM,
  );

  return {
    response: text,
    inputTokens,
    outputTokens,
    costMicros,
    model,
  };
}
