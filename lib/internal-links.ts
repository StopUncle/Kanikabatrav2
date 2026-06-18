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

// Ordered most-specific first. Maps a post's topic to the pillar guide that
// should be its hub. Mirrors QUIZ_RULES so adding a cluster is one line. The
// resolved slug must exist in the passed `pillars` list, otherwise we fall
// through to the category / tag-overlap heuristic below. This keeps each
// cluster's posts funnelling up to their OWN hub even when several pillars
// share a category (e.g. multiple "Dark Psychology" pillars).
const PILLAR_RULES: { test: RegExp; slug: string }[] = [
  // Cluster B first: its overview post is also tagged npd/narcissism, so it
  // must beat the narciss rule to land on its own umbrella hub. We match the
  // specific disorder tokens (borderline/bpd/histrionic/hpd) NOT a bare
  // "cluster b", because narcissism posts carry "cluster b" as a comorbidity
  // tag and would otherwise be hijacked off their own hub.
  { test: /borderline|histrionic|\bbpd\b|\bhpd\b/, slug: "cluster-b-complete-guide" },
  { test: /dark triad|machiavellian|dark tetrad/, slug: "dark-triad-complete-guide" },
  { test: /narciss|\bnpd\b|hoover/, slug: "narcissism-complete-guide" },
  {
    // Dark feminine / high-value-woman dating strategy. Placed before the
    // manipulation + aspd rules so it claims empress + good-girl (tagged
    // "doctrine of cold") and family-colonisation (tagged "sociopathic
    // dating") for their own hub. Tokens are specific to the female-strategy
    // cluster, so it does not touch the disorder hubs above it.
    test: /dark feminine|high value woman|empress|good girl|holy grail|sex as currency|sexual market|oxytocin|casual sex|family colonisation|matriarch|won his family|thanksgiving takeover|investment ladder|target the omega/,
    slug: "high-value-woman-complete-guide",
  },
  {
    // Distinctly-named dating tactics (offensive + defensive) plus the core
    // manipulation mechanism "intermittent reinforcement". Tokens are specific
    // so this never steals narciss / sociopath posts above it (any post that
    // also carries an intermittent-reinforcement tag is already claimed by the
    // narcissism or dark-triad rule higher up).
    test: /ghostlight|quiet.?dump|sledging|the rotation|doctrine of cold|beige protocol|breadcrumb|future.?fak|intermittent reinforcement/,
    slug: "manipulation-tactics-complete-guide",
  },
  {
    test: /attachment|avoidant|anxiously attached|secure attach|disorganised attach|disorganized attach/,
    slug: "attachment-styles-complete-guide",
  },
  {
    // The two-factor / primary-secondary psychopathy model (Hare's PCL-R) gets
    // its own hub, co-equal with the ASPD/sociopath guide below. Tokens are
    // specific to the factor framework so this only claims posts actually about
    // it, leaving general sociopath / psychopath posts on the ASPD hub.
    test: /factor 1|factor 2|factor one|factor two|primary psychopath|secondary psychopath|two.?factor|pcl-r|psychopathy checklist/,
    slug: "factor-1-vs-factor-2-psychopathy",
  },
  {
    test: /sociopath|\baspd\b|antisocial|psychopath/,
    slug: "aspd-sociopathy-complete-guide",
  },
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

  // Most relevant pillar: resolved purely by explicit PILLAR_RULES so each
  // cluster's posts funnel up to their own hub. There is deliberately NO
  // category/tag fallback: with several pillars sharing the "Dark Psychology"
  // category (and a generic "dark psychology" tag), a fallback would collapse
  // every unmatched post onto whichever pillar sorts first, which is worse than
  // showing none. A post that matches no rule simply surfaces its quizzes; add
  // a PILLAR_RULE when a new cluster earns a hub.
  let pillar: PillarMeta | null = null;
  for (const rule of PILLAR_RULES) {
    if (rule.test.test(haystack)) {
      const match = pillars.find((p) => p.slug === rule.slug);
      if (match) {
        pillar = match;
        break;
      }
    }
  }

  return {
    pillar: pillar
      ? { slug: pillar.slug, title: pillar.frontmatter.title }
      : null,
    quizzes,
  };
}
