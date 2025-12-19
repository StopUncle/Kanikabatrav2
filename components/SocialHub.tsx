'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SOCIAL_METRICS } from '@/lib/constants'
import { ReactNode } from 'react'

interface PlatformData {
  name: string
  handle: string
  url: string
  color: string
  icon: ReactNode
  followers?: string
  subscribers?: string
  likes?: string
  totalViews?: string
  engagementRate?: string
}

const platforms: PlatformData[] = [
  {
    name: 'TikTok',
    handle: SOCIAL_METRICS.tiktok.handle,
    url: SOCIAL_METRICS.tiktok.url,
    followers: SOCIAL_METRICS.tiktok.followers,
    likes: SOCIAL_METRICS.tiktok.likes,
    color: 'from-[#00f2ea] to-[#ff0050]',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: SOCIAL_METRICS.youtube.handle,
    url: SOCIAL_METRICS.youtube.url,
    subscribers: SOCIAL_METRICS.youtube.subscribers,
    totalViews: SOCIAL_METRICS.youtube.totalViews,
    color: 'from-[#FF0000] to-[#CC0000]',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: SOCIAL_METRICS.instagram.handle,
    url: SOCIAL_METRICS.instagram.url,
    followers: SOCIAL_METRICS.instagram.followers,
    engagementRate: SOCIAL_METRICS.instagram.engagementRate,
    color: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
]

export default function SocialHub() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-burgundy-900/10 to-black/0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-white mb-4">
            JOIN THE <span className="font-light text-gold-400">MOVEMENT</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Over <span className="text-white font-medium">{SOCIAL_METRICS.combined.totalFollowers}</span> followers
            and <span className="text-white font-medium">{SOCIAL_METRICS.combined.totalViews}</span> views
            across {SOCIAL_METRICS.combined.platforms} platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={platform.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="block group"
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/70 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${platform.color} text-white`}>
                        {platform.icon}
                      </div>
                      <span className="text-gray-500 text-sm">{platform.handle}</span>
                    </div>

                    <h3 className="text-2xl font-light text-white mb-1">{platform.name}</h3>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Followers</span>
                        <span className="text-white font-medium text-lg">
                          {platform.followers || platform.subscribers}
                        </span>
                      </div>

                      {platform.likes && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Total Likes</span>
                          <span className="text-white font-medium">{platform.likes}</span>
                        </div>
                      )}

                      {platform.totalViews && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Total Views</span>
                          <span className="text-white font-medium">{platform.totalViews}</span>
                        </div>
                      )}

                      {platform.engagementRate && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Engagement</span>
                          <span className="text-white font-medium">{platform.engagementRate}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <span className="text-gold-400 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Follow on {platform.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Previously grew TikTok to 500K in ONE MONTH before being hacked
          </p>
        </motion.div>
      </div>
    </section>
  )
}
