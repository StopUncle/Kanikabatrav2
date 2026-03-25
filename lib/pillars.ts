import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostFrontmatter } from "./mdx";

const pillarsDirectory = path.join(process.cwd(), "content/pillars");

export interface Pillar {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface PillarMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export function getPillarSlugs(): string[] {
  if (!fs.existsSync(pillarsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(pillarsDirectory)
    .filter((file) => file.endsWith(".mdx"));
}

export function getPillarBySlug(slug: string): Pillar | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(pillarsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const frontmatter: PostFrontmatter = {
    title: data.title || "Untitled Guide",
    excerpt: data.excerpt || "",
    publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
    updatedAt: data.updatedAt,
    category: data.category || "Dark Psychology",
    tags: data.tags || [],
    coverImage: data.coverImage,
    coverImageAlt: data.coverImageAlt,
    author: data.author || "Kanika Batra",
    isPillar: true,
  };

  return {
    slug: realSlug,
    frontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllPillars(): PillarMeta[] {
  const slugs = getPillarSlugs();
  return slugs
    .map((slug) => {
      const pillar = getPillarBySlug(slug.replace(/\.mdx$/, ""));
      if (!pillar) return null;
      return {
        slug: pillar.slug,
        frontmatter: pillar.frontmatter,
        readingTime: pillar.readingTime,
      };
    })
    .filter((p): p is PillarMeta => p !== null);
}
