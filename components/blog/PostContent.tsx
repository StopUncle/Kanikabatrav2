import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import InlineConsiliumCTA from "./InlineConsiliumCTA";

interface PostContentProps {
  source: string;
  /** When provided, a mid-article Consilium CTA is injected after the
   *  middle H2 (long-enough posts only). Omit on member-facing
   *  surfaces like the preview page where the CTA would be wrong. */
  slug?: string;
}

// Below this size the post is too short for a mid-article CTA to feel
// natural; the end-of-post block in BlogPostClient already covers it.
const MIN_HTML_LENGTH_FOR_MID_CTA = 5000;

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

/**
 * Find a stable split index inside the rendered HTML: the position
 * just after the closing `</h2>` of the middle H2 heading. Returns
 * -1 when the article has fewer than 2 H2s or is too short overall,
 * which means "don't inject mid-article."
 *
 * Pick-by-count (not by character offset) keeps the placement
 * predictable across posts of different lengths and prevents
 * accidentally landing inside a list or quote block.
 */
function findMidArticleSplit(html: string): number {
  if (html.length < MIN_HTML_LENGTH_FOR_MID_CTA) return -1;

  const closeTag = "</h2>";
  const positions: number[] = [];
  let from = 0;
  while (true) {
    const idx = html.indexOf(closeTag, from);
    if (idx === -1) break;
    positions.push(idx + closeTag.length);
    from = idx + closeTag.length;
  }
  if (positions.length < 2) return -1;
  return positions[Math.floor(positions.length / 2)];
}

export default async function PostContent({ source, slug }: PostContentProps) {
  const html = await markdownToHtml(source);
  // No slug → caller opted out of mid-article CTA (member previews).
  const splitAt = slug ? findMidArticleSplit(html) : -1;

  // Short / few-H2 posts (or member context): render the original
  // single-chunk article unchanged. Keeps rendering identical to
  // pre-injection for the long tail of posts that don't qualify.
  if (splitAt === -1) {
    return (
      <article
        className="prose prose-invert max-w-none article-content blog-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  const htmlBefore = html.slice(0, splitAt);
  const htmlAfter = html.slice(splitAt);

  // Two raw-HTML siblings with the inline CTA between. The .blog-content
  // typography is descendant-scoped, so the inner divs inherit heading
  // and paragraph styling without needing prose. CTA carries its own
  // vertical rhythm via `my-10` on its outer div.
  return (
    <article className="prose prose-invert max-w-none article-content blog-content">
      <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
      <InlineConsiliumCTA slug={slug} />
      <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
    </article>
  );
}
