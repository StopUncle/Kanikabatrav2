import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface FaqEntry {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  author?: string;
  readingTime?: string;
  isPillar?: boolean;
  faq?: FaqEntry[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

const DEFAULT_COVER_IMAGE = "/images/blog-default.jpg";
const DEFAULT_AUTHOR = "Kanika Batra";
const DEFAULT_EXCERPT =
  "Explore dark psychology insights and strategic thinking from a diagnosed sociopath.";

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const frontmatter: PostFrontmatter = {
    title: data.title || "Untitled Post",
    excerpt: data.excerpt || DEFAULT_EXCERPT,
    publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
    updatedAt: data.updatedAt,
    category: data.category || "Dark Psychology",
    tags: data.tags || [],
    coverImage: data.coverImage || DEFAULT_COVER_IMAGE,
    coverImageAlt: data.coverImageAlt,
    author: data.author || DEFAULT_AUTHOR,
    readingTime: data.readingTime,
    isPillar: data.isPillar || false,
    faq: Array.isArray(data.faq) ? data.faq : undefined,
  };

  return {
    slug: realSlug,
    frontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug.replace(/\.mdx$/, ""));
      if (!post) return null;
      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
      };
    })
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => {
      const publishDate = new Date(post.frontmatter.publishedAt);
      return publishDate <= new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

/**
 * Future-dated posts — scheduled but not yet public. Used for the
 * Consilium "Previews" surface where members get a 1-to-3-week
 * head start on everything the public will later read.
 *
 * Sorted by publishedAt ASC (soonest release first) because the
 * UX is "what's landing next?". Capped at a configurable window
 * (default 60 days) so the list stays focused on imminent drops.
 */
export function getUpcomingPosts(daysAhead = 60): PostMeta[] {
  const now = Date.now();
  const horizon = now + daysAhead * 24 * 60 * 60 * 1000;

  const slugs = getPostSlugs();
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug.replace(/\.mdx$/, ""));
      if (!post) return null;
      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
      };
    })
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => {
      const ts = new Date(post.frontmatter.publishedAt).getTime();
      return ts > now && ts <= horizon;
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt).getTime();
      const dateB = new Date(b.frontmatter.publishedAt).getTime();
      return dateA - dateB;
    });
}

/**
 * Public-safe post lookup. Returns null for posts whose publishedAt
 * is in the future — prevents URL-guessing on the public blog. Use
 * `getPostBySlug` directly inside the Consilium preview area where
 * members are allowed to read upcoming posts.
 */
export function getPublicPostBySlug(slug: string): Post | null {
  const post = getPostBySlug(slug);
  if (!post) return null;
  const publishDate = new Date(post.frontmatter.publishedAt);
  if (publishDate > new Date()) return null;
  return post;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.frontmatter.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.frontmatter.tags));
  return Array.from(tags);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryBySlug(slug: string): string | null {
  const categories = getAllCategories();
  return categories.find((cat) => slugify(cat) === slug) || null;
}

export function getTagBySlug(slug: string): string | null {
  const tags = getAllTags();
  return tags.find((tag) => slugify(tag) === slug) || null;
}
