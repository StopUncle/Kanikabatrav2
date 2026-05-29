// Contextual internal links for blog posts. Maps a post's topic (category +
// tags + title) to the quiz funnel pages and the pillar guide that cover the
// same ground. This is the authority-flow layer: it points cluster posts at
// the high-intent quiz landing pages and up at the pillar, without touching
// any individual post's MDX. Pure + server-resolved so the result can be
// passed to a presentational component.

import { QUIZ_REGISTRY_BY_SLUG } from "./quiz-registry";
import type { PillarMeta } from "./pillars";

export interface ContextualQuizLink {
  href: string;
  title: string;
  caption: string;
}

export interface ContextualLinks {
  pillar: { slug: string; title: string } | null;
  quizzes: ContextualQuizLink[];
}

// Ordered most-specific first so "narcissistic mother" beats the generic
// "narciss" rule. First two distinct matches win.
const QUIZ_RULES: { test: RegExp; slug: string }[] = [
  { test: /narcissistic mother|daughter/, slug: "daughter" },
  { test: /covert narciss/, slug: "covert-narcissist" },
  { test: /narciss|\bnpd\b|hoover/, slug: "narcissist" },
  { test: /dark triad|machiavellian|psychopath/, slug: "dark-triad" },
  { test: /\bbpd\b|borderline/, slug: "bpd" },
  {
    test: /dating|red flag|relationship|partner|love.?bomb|ghost|breakup|avoidant|attachment/,
    slug: "dating-sociopath",
  },
  { test: /sociopath|\baspd\b|antisocial/, slug: "sociopath" },
];

export function getContextualLinks(
  post: { category: string; tags: string[]; title: string },
  pillars: PillarMeta[],
): ContextualLinks {
  const haystack = [post.category, post.title, ...post.tags]
    .join(" ")
    .toLowerCase();

  const slugs: string[] = [];
  for (const rule of QUIZ_RULES) {
    if (rule.test.test(haystack) && !slugs.includes(rule.slug)) {
      slugs.push(rule.slug);
    }
  }
  // Nothing topical matched: fall back to the Dark Mirror suite entry point.
  if (slugs.length === 0) slugs.push("quiz");

  const quizzes = slugs
    .slice(0, 2)
    .map((slug) => QUIZ_REGISTRY_BY_SLUG[slug])
    .filter(Boolean)
    .map((q) => ({ href: q.href, title: q.title, caption: q.caption }));

  // Most relevant pillar: same category first, else any tag overlap. With a
  // single ASPD pillar today this resolves sociopath-adjacent posts up to it
  // even when they live in the Relationships / Dark Psychology clusters.
  const postTags = post.tags.map((t) => t.toLowerCase());
  const pillar =
    pillars.find(
      (p) =>
        p.frontmatter.category.toLowerCase() === post.category.toLowerCase(),
    ) ||
    pillars.find((p) =>
      p.frontmatter.tags.some((t) => postTags.includes(t.toLowerCase())),
    ) ||
    null;

  return {
    pillar: pillar
      ? { slug: pillar.slug, title: pillar.frontmatter.title }
      : null,
    quizzes,
  };
}
