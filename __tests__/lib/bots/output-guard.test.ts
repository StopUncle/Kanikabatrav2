import { validateBotComment } from "@/lib/bots/output-guard";

describe("validateBotComment", () => {
  it("accepts a normal short comment", () => {
    const r = validateBotComment("Took me ten years to learn this one.", []);
    expect(r.ok).toBe(true);
  });

  it("rejects em dashes and en dashes (AI tells)", () => {
    expect(validateBotComment("This is the move — every time.", []).ok).toBe(false);
    expect(validateBotComment("She left first – he's still spiralling.", []).ok).toBe(false);
  });

  it("rejects expanded lurker patterns", () => {
    expect(validateBotComment("Love this take honestly.", []).ok).toBe(false);
    expect(validateBotComment("This hits at exactly the right moment.", []).ok).toBe(false);
    expect(validateBotComment("Needed this today, thank you.", []).ok).toBe(false);
    expect(validateBotComment("So well said.", []).ok).toBe(false);
    expect(validateBotComment("Great write-up Kanika!", []).ok).toBe(false);
  });

  it("rejects AI self-reveal", () => {
    expect(validateBotComment("As an AI, I think...", []).ok).toBe(false);
    expect(validateBotComment("I'm just a language model but...", []).ok).toBe(false);
    expect(validateBotComment("As a language model I cannot", []).ok).toBe(false);
  });

  it("rejects lurker-coded openers", () => {
    expect(validateBotComment("Great post! So insightful.", []).ok).toBe(false);
    expect(validateBotComment("Thanks for sharing this content.", []).ok).toBe(false);
    expect(validateBotComment("Amazing content as always!", []).ok).toBe(false);
  });

  it("rejects emoji-only or emoji-leading", () => {
    expect(validateBotComment("🔥🔥🔥", []).ok).toBe(false);
    expect(validateBotComment("🙌 So real", []).ok).toBe(false);
  });

  it("rejects comments over 600 chars", () => {
    expect(validateBotComment("a".repeat(601), []).ok).toBe(false);
  });

  it("rejects literal duplicate of prior comment on same post", () => {
    const prior = ["Hits hard, been there myself.", "exactly this"];
    const r = validateBotComment("exactly this", prior);
    expect(r.ok).toBe(false);
  });

  it("returns reason string on rejection", () => {
    const r = validateBotComment("As an AI, ...", []);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toMatch(/self-reveal/i);
  });
});
