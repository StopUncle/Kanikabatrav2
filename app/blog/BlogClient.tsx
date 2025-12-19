'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import PostCard from '@/components/blog/PostCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import type { PostMeta } from '@/lib/mdx'

interface BlogClientProps {
  initialPosts: PostMeta[]
  categories: string[]
}

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mb-20"
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-burgundy/40 to-deep-navy/40 border border-white/10 hover:border-accent-gold/30 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-0">
            {post.frontmatter.coverImage && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${post.frontmatter.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep-black/80 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-transparent md:hidden" />
              </div>
            )}

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full">
                  Featured
                </span>
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full border border-accent-gold/20">
                  {post.frontmatter.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 group-hover:text-accent-gold transition-colors duration-300 leading-tight">
                {post.frontmatter.title}
              </h2>

              <p className="text-text-gray text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                {post.frontmatter.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <time className="text-sm text-text-gray">
                    {new Date(post.frontmatter.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-sm text-text-gray">
                    {post.readingTime}
                  </span>
                </div>

                <span className="text-accent-gold text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-gold/0 to-accent-burgundy/0 group-hover:from-accent-gold/5 group-hover:to-accent-burgundy/5 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? initialPosts.filter(
        (post) => post.frontmatter.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : initialPosts

  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen bg-deep-black">
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-accent-gold uppercase tracking-[0.3em] text-sm mb-4">
              Insights & Strategy
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight uppercase tracking-[0.2em] text-white mb-6">
              The <span className="text-accent-gold">Dark</span> Blog
            </h1>
            <p className="text-text-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Forbidden insights into human psychology, power dynamics, and the art of strategic influence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {filteredPosts.length > 0 ? (
            <>
              {featuredPost && !activeCategory && (
                <FeaturedPost post={featuredPost} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {(activeCategory ? filteredPosts : remainingPosts).map((post, index) => (
                  <PostCard key={post.slug} post={post} index={index} />
                ))}
              </div>

              {remainingPosts.length === 0 && !activeCategory && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-text-gray mt-12"
                >
                  More articles coming soon...
                </motion.p>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-text-gray text-lg mb-2">
                No posts found in this category.
              </p>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-accent-gold hover:text-accent-gold/80 transition-colors"
              >
                View all posts
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
      </div>
    </div>
  )
}
