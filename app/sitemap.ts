import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { getAllPillars } from "@/lib/pillars";

const BASE_URL = "https://kanikarose.com";

// Stable lastmod for static + archive pages. Bump when the static page
// content meaningfully changes. Using build time here would tell crawlers
// every page changed on every deploy, which erodes lastmod trust.
const LAST_UPDATED = new Date("2026-05-30");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const pillars = getAllPillars();
  const categories = getAllCategories();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/consilium`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.98,
    },
    {
      url: `${BASE_URL}/tells`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quizzes`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/quiz/daughter`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/quiz/sociopath`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quiz/narcissist`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    {
      url: `${BASE_URL}/quiz/covert-narcissist`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/quiz/dark-triad`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/quiz/bpd`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/quiz/dating-sociopath`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.93,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/links`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/content`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const pillarPages: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${BASE_URL}/guide/${p.slug}`,
    lastModified: new Date(p.frontmatter.updatedAt || p.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/blog/category/${slugify(cat)}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/blog/tag/${slugify(tag)}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts, ...pillarPages, ...categoryPages, ...tagPages];
}
