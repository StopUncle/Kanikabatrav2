/**
 * @jest-environment node
 */
import {
  stripCodeFences,
  costMicros,
  MODEL_PRICING_MICROS,
} from "@/lib/anthropic";

describe("getAnthropic", () => {
  const originalEnv = process.env.ANTHROPIC_API_KEY;
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    jest.resetModules();
  });
  afterAll(() => {
    process.env.ANTHROPIC_API_KEY = originalEnv;
  });

  it("throws when ANTHROPIC_API_KEY is missing", () => {
    const { getAnthropic } = require("@/lib/anthropic");
    expect(() => getAnthropic()).toThrow(/ANTHROPIC_API_KEY/);
  });

  it("returns the same instance on subsequent calls", () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const { getAnthropic } = require("@/lib/anthropic");
    const a = getAnthropic();
    const b = getAnthropic();
    expect(a).toBe(b);
  });
});

describe("stripCodeFences", () => {
  it("returns a fence-free string trimmed and otherwise untouched", () => {
    expect(stripCodeFences('  {"a":1}  ')).toBe('{"a":1}');
  });

  it("strips a language-tagged fence", () => {
    expect(stripCodeFences('```json\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("strips a bare fence", () => {
    expect(stripCodeFences('```\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("strips a fence wrapped in surrounding whitespace", () => {
    expect(stripCodeFences('\n\n```json\n{"a":1}\n```\n')).toBe('{"a":1}');
  });

  it("leaves a backtick run that is not a leading fence alone", () => {
    expect(stripCodeFences('{"a":"```"}')).toBe('{"a":"```"}');
  });
});

describe("costMicros", () => {
  it("prices a known Sonnet call from its token usage", () => {
    expect(
      costMicros("claude-sonnet-4-6", {
        input_tokens: 1_000_000,
        output_tokens: 1_000_000,
      }),
    ).toBe(18_000_000); // 3M in + 15M out
  });

  it("prices Haiku and Opus from the shared table", () => {
    expect(
      costMicros("claude-haiku-4-5-20251001", {
        input_tokens: 2_000_000,
        output_tokens: 0,
      }),
    ).toBe(2_000_000);
    expect(
      costMicros("claude-opus-4-8", {
        input_tokens: 0,
        output_tokens: 1_000_000,
      }),
    ).toBe(25_000_000);
  });

  it("falls back to Sonnet pricing for an unknown model", () => {
    const unknown = costMicros("some-future-model", {
      input_tokens: 1_000_000,
      output_tokens: 1_000_000,
    });
    expect(unknown).toBe(18_000_000);
    expect("some-future-model" in MODEL_PRICING_MICROS).toBe(false);
  });

  it("returns 0 for a zero-token call", () => {
    expect(
      costMicros("claude-sonnet-4-6", { input_tokens: 0, output_tokens: 0 }),
    ).toBe(0);
  });
});
