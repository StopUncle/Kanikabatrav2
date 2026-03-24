import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

interface PostContentProps {
  source: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

export default async function PostContent({ source }: PostContentProps) {
  const html = await markdownToHtml(source);

  return (
    <article
      className="prose prose-invert max-w-none article-content blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
