import { buildCommentPrompt } from "@/lib/bots/prompt";
import { getPersonaBySlug } from "@/lib/bots/personas";

describe("buildCommentPrompt", () => {
  const post = {
    title: "Today's Dark Insight",
    content:
      "When someone alternates between warmth and coldness, it's not confusion — it's conditioning.",
    type: "AUTOMATED" as const,
  };

  it("includes persona name and post title", () => {
    const ana = getPersonaBySlug("ana")!;
    const { system, user } = buildCommentPrompt(ana, post);
    expect(user).toContain("Today's Dark Insight");
    expect(system).toContain("Ana");
  });

  it("includes broken-English instruction when persona has it set", () => {
    const ana = getPersonaBySlug("ana")!;
    const { system } = buildCommentPrompt(ana, post);
    expect(system.toLowerCase()).toContain("non-native");
    expect(system.toLowerCase()).toContain("spanish");
  });

  it("omits broken-English instruction when persona has it false", () => {
    const damon = getPersonaBySlug("damon")!;
    const { system } = buildCommentPrompt(damon, post);
    expect(system.toLowerCase()).not.toContain("non-native");
  });

  it("includes hotTake when persona has one", () => {
    const elise = getPersonaBySlug("elise")!;
    const { system } = buildCommentPrompt(elise, post);
    expect(system.toLowerCase()).toContain("recurring stance");
  });

  it("truncates long post content to 800 chars", () => {
    const longPost = { ...post, content: "x".repeat(2000) };
    const damon = getPersonaBySlug("damon")!;
    const { user } = buildCommentPrompt(damon, longPost);
    expect(user.length).toBeLessThan(2000);
  });
});
