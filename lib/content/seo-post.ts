/**
 * SEO blog-post generator. Server-only.
 *
 * The engine that makes the SEO cluster plan executable without a content
 * team: a keyword/topic in, a complete, publish-ready MDX file out, in
 * Kanika's first-person experience voice (the E-E-A-T moat). She finishes
 * and drops it into content/posts/<slug>.mdx.
 *
 * The model outputs the whole MDX file (YAML frontmatter + Markdown body)
 * directly rather than JSON, because escaping a 1,500-word body inside a
 * JSON string is fragile. We return the raw MDX plus a suggested filename.
 *
 * Model: Opus. Long-form prose under her name; quality is the whole point.
 */

import { getAnthropic } from "@/lib/anthropic";

const MODEL = "claude-opus-4-8";

export interface SeoPostResult {
  /** Complete MDX file content, ready to save. */
  mdx: string;
  /** Suggested filename slug, derived from the title line. */
  slug: string;
}

export class SeoPostInputError extends Error {}

function buildSystem(dateISO: string): string {
  return [
    "You write a long-form SEO blog post for kanikarose.com, Kanika Batra's dark-psychology site. Output ONE complete MDX file: YAML frontmatter between --- fences, then the article body in Markdown. No commentary, no surrounding code fences.",
    "",
    "Voice: Kanika Batra. First person, lived experience. She is a clinically diagnosed sociopath who teaches how these patterns actually run, from the inside. Tactical, restrained, specific, deep. No therapy-speak, no affirmation-card sentences, no hype, no emojis, no em dashes (use commas, periods, colons, parentheses).",
    "",
    "E-E-A-T: thread first-hand experience through the piece ('I have run this', 'from the other side of it'), because Google rewards demonstrated experience over second-hand summary. This is the whole advantage. Use it.",
    "",
    "SEO: target the given keyword/topic. Put it in the title, the first sentence, and 2 to 3 of the H2 headings, naturally. 1200 to 1800 words. Use ## H2 section headers. Be genuinely the most useful page on this query.",
    "",
    "Frontmatter (exact fields, this shape):",
    'title: "compelling, includes the target keyword, aim 50 to 65 characters"',
    'excerpt: "150 to 200 character meta description that includes the keyword and earns the click"',
    `publishedAt: "${dateISO}"`,
    `updatedAt: "${dateISO}"`,
    'category: "one of: Dark Psychology, Narcissism, Dating, Attachment, Manipulation"',
    "tags: [6 to 10 keyword phrases as a YAML array]",
    'coverImage: ""',
    'author: "Kanika Batra"',
    "faq:",
    '  - q: "a real related question people search"',
    '    a: "a 2 to 4 sentence answer in her voice"',
    "  (include 3 to 5 FAQ entries; these power FAQ rich results)",
    "",
    "Then the article body in Markdown below the closing ---.",
  ].join("\n");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function generateSeoPost(
  topic: string,
  dateISO: string,
): Promise<SeoPostResult> {
  const trimmed = topic.trim();
  if (trimmed.length < 4) {
    throw new SeoPostInputError("Give me a keyword or topic to target.");
  }
  if (trimmed.length > 400) {
    throw new SeoPostInputError("Keep the topic under 400 characters.");
  }

  const client = getAnthropic();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: buildSystem(dateISO),
    messages: [
      {
        role: "user",
        content: `Target keyword / topic: ${trimmed}\n\nWrite the full MDX file now.`,
      },
    ],
  });

  let mdx = response.content
    .flatMap((b) => (b.type === "text" ? [b.text] : []))
    .join("\n")
    .trim();
  // Strip an accidental outer code fence if the model wraps the file.
  if (mdx.startsWith("```")) {
    const firstNewline = mdx.indexOf("\n");
    if (firstNewline > -1) mdx = mdx.slice(firstNewline + 1);
    const lastFence = mdx.lastIndexOf("```");
    if (lastFence > -1) mdx = mdx.slice(0, lastFence);
    mdx = mdx.trim();
  }
  if (!mdx.startsWith("---")) {
    throw new Error("Generated content was not a valid MDX file.");
  }

  // Derive the filename slug from the frontmatter title.
  const titleMatch = mdx.match(/title:\s*"([^"]+)"/);
  const slug = slugify(titleMatch?.[1] ?? trimmed);

  return { mdx, slug };
}
