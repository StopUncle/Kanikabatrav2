import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { getAllPillars } from "@/lib/pillars";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://kanikarose.com";

// Fallback lastmod used only before any content exists. The real lastmod
// for static + archive pages is derived from the newest published content
// (newestContentDate) so it moves when we actually publish, never on a
// no-op deploy, and never sits frozen at a date that's quietly gone stale.
const FALLBACK_LAST_UPDATED = new Date("2026-05-30");

function newestContentDate(
  posts: ReturnType<typeof getAllPosts>,
  pillars: ReturnType<typeof getAllPillars>,
): Date {
  let newest = FALLBACK_LAST_UPDATED.getTime();
  const consider = (value?: string) => {
    if (!value) return;
    const t = new Date(value).getTime();
    if (!Number.isNaN(t) && t > newest) newest = t;
  };
  for (const p of posts) {
    consider(p.frontmatter.updatedAt);
    consider(p.frontmatter.publishedAt);
  }
  for (const p of pillars) {
    consider(p.frontmatter.updatedAt);
    consider(p.frontmatter.publishedAt);
  }
  return new Date(newest);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const pillars = getAllPillars();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Static / archive pages legitimately reflect the latest published
  // content (they surface it), so their lastmod tracks the newest post.
  const LAST_UPDATED = newestContentDate(posts, pillars);

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date = LAST_UPDATED,
  ): MetadataRoute.Sitemap[number] => ({
    url: path.startsWith("http") ? path : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry("", 1.0, "weekly"),
    entry("/consilium", 0.98, "weekly"),
    entry("/board", 0.95, "daily"),
    entry("/board/scale", 0.8, "monthly"),
    entry("/tells", 0.95, "weekly"),
    entry("/book", 0.95, "weekly"),
    entry("/coaching", 0.9, "weekly"),
    entry("/about", 0.9, "monthly"),
    entry("/contact", 0.7, "monthly"),
    entry("/quizzes", 0.92, "monthly"),
    entry("/quiz", 0.85, "monthly"),
    entry("/quiz/daughter", 0.85, "monthly"),
    entry("/quiz/sociopath", 0.9, "monthly"),
    entry("/quiz/narcissist", 0.92, "monthly"),
    entry("/quiz/covert-narcissist", 0.85, "monthly"),
    entry("/quiz/dark-triad", 0.88, "monthly"),
    entry("/quiz/bpd", 0.88, "monthly"),
    entry("/quiz/dating-sociopath", 0.93, "monthly"),
    entry("/blog", 0.9, "weekly"),
    entry("/links", 0.8, "weekly"),
    entry("/content", 0.85, "weekly"),
    entry("/terms", 0.4, "yearly"),
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) =>
    entry(
      `/blog/${post.slug}`,
      0.85,
      "weekly",
      new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    ),
  );

  const pillarPages: MetadataRoute.Sitemap = pillars.map((p) =>
    entry(
      `/guide/${p.slug}`,
      0.95,
      "monthly",
      new Date(p.frontmatter.updatedAt || p.frontmatter.publishedAt),
    ),
  );

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) =>
    entry(`/blog/category/${slugify(cat)}`, 0.7, "weekly"),
  );

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) =>
    entry(`/blog/tag/${slugify(tag)}`, 0.6, "weekly"),
  );

  // The Board figure pages. Only the scored ones (currentScoreId set) are
  // substantive public pages worth indexing; un-scored "most requested"
  // stubs are thin and excluded. Failure here must not break the sitemap.
  let boardFigures: MetadataRoute.Sitemap = [];
  try {
    const figures = await prisma.figure.findMany({
      where: { currentScoreId: { not: null } },
      select: { slug: true, updatedAt: true },
    });
    boardFigures = figures.map((f) =>
      entry(`/board/${f.slug}`, 0.6, "monthly", f.updatedAt),
    );
  } catch {
    boardFigures = [];
  }

  return [
    ...staticPages,
    ...blogPosts,
    ...pillarPages,
    ...categoryPages,
    ...tagPages,
    ...boardFigures,
  ];
}
