import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostFrontmatter {
  title: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  coverImage?: string
  author?: string
  readingTime?: string
  isPillar?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'))
}

const DEFAULT_COVER_IMAGE = '/images/blog-default.jpg'
const DEFAULT_AUTHOR = 'Kanika Batra'
const DEFAULT_EXCERPT = 'Explore dark psychology insights and strategic thinking from a diagnosed sociopath.'

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  const frontmatter: PostFrontmatter = {
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || DEFAULT_EXCERPT,
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt,
    category: data.category || 'Dark Psychology',
    tags: data.tags || [],
    coverImage: data.coverImage || DEFAULT_COVER_IMAGE,
    author: data.author || DEFAULT_AUTHOR,
    readingTime: data.readingTime,
    isPillar: data.isPillar || false,
  }

  return {
    slug: realSlug,
    frontmatter,
    content,
    readingTime: stats.text,
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug.replace(/\.mdx$/, ''))
      if (!post) return null
      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
      }
    })
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => {
      const publishDate = new Date(post.frontmatter.publishedAt)
      return publishDate <= new Date()
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt)
      const dateB = new Date(b.frontmatter.publishedAt)
      return dateB.getTime() - dateA.getTime()
    })

  return posts
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.frontmatter.category))
  return Array.from(categories)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.frontmatter.tags))
  return Array.from(tags)
}
