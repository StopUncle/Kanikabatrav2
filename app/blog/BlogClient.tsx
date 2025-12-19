'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import PostCard from '@/components/blog/PostCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import type { PostMeta } from '@/lib/mdx'

interface BlogClientProps {
  initialPosts: PostMeta[]
  categories: string[]
}

export default function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? initialPosts.filter(
        (post) => post.frontmatter.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : initialPosts

  return (
    <div className="min-h-screen bg-deep-black">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extralight uppercase tracking-[0.3em] text-white mb-6">
              The <span className="text-accent-gold">Dark</span> Blog
            </h1>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              Forbidden insights into human psychology, power dynamics, and the art of strategic influence.
            </p>
          </motion.div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text-gray text-lg">
                No posts found. Check back soon for dark psychology insights.
              </p>
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
