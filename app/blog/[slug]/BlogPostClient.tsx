'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Header from '@/components/Header'
import PostContent from '@/components/blog/PostContent'
import AuthorBio from '@/components/AuthorBio'
import Disclaimer from '@/components/Disclaimer'
import RelatedPosts, { Breadcrumbs, PostNavigation } from '@/components/RelatedPosts'
import BookPromo from '@/components/blog/BookPromo'
import type { PostMeta } from '@/lib/mdx'
import { SITE_CONFIG } from '@/lib/constants'

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  category?: string
  publishedAt: string
}

interface BlogPostClientProps {
  post: PostMeta
  mdxSource: MDXRemoteSerializeResult
  relatedPosts?: RelatedPost[]
  previousPost?: { slug: string; title: string } | null
  nextPost?: { slug: string; title: string } | null
}

export default function BlogPostClient({ post, mdxSource, relatedPosts, previousPost, nextPost }: BlogPostClientProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: post.frontmatter.coverImage,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-deep-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.frontmatter.category, href: `/blog?category=${encodeURIComponent(post.frontmatter.category)}` },
                { label: post.frontmatter.title },
              ]}
              className="mb-6"
            />

            <Link
              href="/blog"
              className="inline-flex items-center text-text-gray hover:text-accent-gold transition-colors mb-8 group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span>
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full border border-accent-gold/20">
                {post.frontmatter.category}
              </span>
              <span className="text-sm text-text-gray">
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 leading-tight">
              {post.frontmatter.title}
            </h1>

            <div className="flex items-center gap-6 mb-12 pb-12 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-accent-burgundy flex items-center justify-center">
                  <span className="text-white font-medium text-sm">KB</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {post.frontmatter.author || 'Kanika Batra'}
                  </p>
                  <time className="text-text-gray text-xs">
                    {new Date(post.frontmatter.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </div>

            {post.frontmatter.coverImage && (
              <div className="relative mb-12 rounded-2xl overflow-hidden">
                <div
                  className="w-full h-64 md:h-96 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.frontmatter.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/50 to-transparent" />
              </div>
            )}

            <PostContent mdxSource={mdxSource} />

            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-8">
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs text-text-gray bg-white/5 rounded-full border border-white/10 hover:border-accent-gold/50 hover:text-accent-gold transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <AuthorBio variant="full" className="mb-12" />

              <Disclaimer variant="compact" className="mb-12" />

              <BookPromo variant="full" className="mb-12" />

              <PostNavigation
                previousPost={previousPost}
                nextPost={nextPost}
                className="mb-12"
              />

              {relatedPosts && relatedPosts.length > 0 && (
                <RelatedPosts
                  posts={relatedPosts}
                  title="Continue Reading"
                  className="mb-12"
                />
              )}
            </div>
          </motion.div>
        </div>
      </article>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
      </div>
    </div>
  )
}
