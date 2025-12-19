'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { PostMeta } from '@/lib/mdx'

interface PostCardProps {
  post: PostMeta
  index: number
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 hover:border-accent-gold/30 transition-all duration-500">
          {post.frontmatter.coverImage && (
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${post.frontmatter.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-transparent" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full">
                {post.frontmatter.category}
              </span>
              <span className="text-xs text-text-gray">
                {post.readingTime}
              </span>
            </div>

            <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent-gold transition-colors duration-300">
              {post.frontmatter.title}
            </h3>

            <p className="text-text-gray text-sm leading-relaxed mb-4 line-clamp-2">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <time className="text-xs text-text-gray">
                {new Date(post.frontmatter.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              <span className="text-accent-gold text-sm group-hover:translate-x-1 transition-transform duration-300">
                Read More &rarr;
              </span>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-gold/0 to-accent-burgundy/0 group-hover:from-accent-gold/5 group-hover:to-accent-burgundy/5 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.article>
  )
}
