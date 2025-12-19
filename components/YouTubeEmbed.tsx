'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FEATURED_VIDEOS, SITE_CONFIG } from '@/lib/constants'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  description?: string
  thumbnailQuality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres'
  privacyMode?: boolean
  autoplay?: boolean
  showSchema?: boolean
  uploadDate?: string
  duration?: string
}

export function YouTubeEmbed({
  videoId,
  title = 'YouTube video',
  description,
  thumbnailQuality = 'maxres',
  privacyMode = true,
  autoplay = true,
  showSchema = true,
  uploadDate,
  duration,
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`
  const embedDomain = privacyMode ? 'www.youtube-nocookie.com' : 'www.youtube.com'
  const embedUrl = `https://${embedDomain}/embed/${videoId}${autoplay && isLoaded ? '?autoplay=1' : ''}`

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const videoSchema = showSchema ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description || title,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate || new Date().toISOString(),
    duration: duration,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  } : null

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
      {showSchema && videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {!isLoaded ? (
        <button
          onClick={handleLoad}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 transition-all shadow-2xl">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      )}
    </div>
  )
}

const featuredVideos = FEATURED_VIDEOS.videos.slice(0, 3)

export function YouTubeFeaturedSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-deep-navy/20 to-black/0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-white mb-4">
            WATCH THE <span className="font-light text-red-500">VIRAL</span> CONTENT
          </h2>
          <p className="text-gray-400 text-lg">
            31.7M+ views and counting. See why the internet can&apos;t look away.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-colors">
                <div className="relative aspect-video bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  {video.views && (
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {video.views} views
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-500 text-sm">{video.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/content"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-burgundy-600 to-burgundy-800 hover:from-burgundy-500 hover:to-burgundy-700 text-white px-8 py-4 rounded-full transition-colors"
          >
            View All Content
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="https://www.youtube.com/@KanikaBatra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  )
}
