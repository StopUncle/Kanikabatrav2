'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FEATURED_VIDEOS, SOCIAL_METRICS, SOCIAL_LINKS } from '@/lib/constants'
import Header from '@/components/Header'
import BackgroundEffects from '@/components/BackgroundEffects'

export default function ContentPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredVideos = activeCategory
    ? FEATURED_VIDEOS.videos.filter((v) => v.category === activeCategory)
    : FEATURED_VIDEOS.videos

  return (
    <>
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-white mb-4">
              DARK <span className="font-light gradient-text">PSYCHOLOGY</span> CONTENT
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              {SOCIAL_METRICS.youtube.totalViews} views across {SOCIAL_METRICS.youtube.videos} videos.
              Learn the truth about manipulation, relationships, and the sociopathic mind.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>{SOCIAL_METRICS.youtube.subscribers} Subscribers</span>
              <span className="text-gold-400">|</span>
              <span>{SOCIAL_METRICS.youtube.dailyGrowth}</span>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeCategory === null
                  ? 'bg-gradient-to-r from-burgundy-600 to-burgundy-800 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              All Videos
            </button>
            {FEATURED_VIDEOS.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-burgundy-600 to-burgundy-800 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </motion.div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-burgundy-500/50 transition-all">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-800">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all"
                      >
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </a>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    )}
                    {video.views && (
                      <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {video.views} views
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-burgundy-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{video.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Want More Dark Psychology Content?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Subscribe to my YouTube channel for weekly videos on manipulation tactics,
              relationship strategy, and insights from a diagnosed sociopath.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full transition-colors border border-gray-700"
              >
                Take the Dark Triad Quiz
              </Link>
            </div>
          </motion.div>

          {/* Category Descriptions */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            {FEATURED_VIDEOS.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gold-500/30 transition-colors cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
              >
                <h3 className="text-xl font-medium text-white mb-2">{category.title}</h3>
                <p className="text-gray-500">{category.description}</p>
                <div className="mt-4 text-gold-400 text-sm flex items-center gap-2">
                  View {FEATURED_VIDEOS.videos.filter((v) => v.category === category.id).length} videos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
