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
      className="group relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 hover:border-accent-gold/30 transition-all duration-500 flex flex-col">
          {post.frontmatter.coverImage && (
            <div className="relative h-52 overflow-hidden flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${post.frontmatter.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/20 to-transparent" />
            </div>
          )}

          <div className="p-6 lg:p-7 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full border border-accent-gold/20">
                {post.frontmatter.category}
              </span>
              <span className="text-xs text-text-gray">
                {post.readingTime}
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-light text-white mb-4 group-hover:text-accent-gold transition-colors duration-300 leading-snug">
              {post.frontmatter.title}
            </h3>

            <p className="text-text-gray text-sm lg:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
              <time className="text-xs text-text-gray">
                {new Date(post.frontmatter.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>

              <span className="text-accent-gold text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                Read
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-gold/0 to-accent-burgundy/0 group-hover:from-accent-gold/5 group-hover:to-accent-burgundy/5 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.article>
  )
}
