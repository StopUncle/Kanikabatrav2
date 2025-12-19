import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

const BASE_URL = 'https://kanikarose.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.50,
    },
    {
      url: `${BASE_URL}/links`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/content`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.70,
  }))

  return [...staticPages, ...blogPosts]
}
