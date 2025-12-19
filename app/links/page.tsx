'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SITE_CONFIG, SOCIAL_LINKS, BOOK_INFO } from '@/lib/constants'
import KBSpinLogo from '@/components/KBSpinLogo'

const links = [
  {
    title: 'Get the Sociopathic Dating Bible',
    subtitle: `NOW ON AMAZON - $${BOOK_INFO.kdpPrice}`,
    href: BOOK_INFO.kdpLink,
    icon: '📖',
    featured: true,
    external: true,
  },
  {
    title: 'Watch My Content',
    subtitle: '31.7M+ views on dark psychology',
    href: '/content',
    icon: '🎬',
    featured: false,
  },
  {
    title: 'Take the Dark Triad Quiz',
    subtitle: 'Discover your psychological profile',
    href: '/quiz',
    icon: '🧠',
    featured: false,
  },
  {
    title: 'Book 1:1 Coaching',
    subtitle: 'Transform your psychology',
    href: '/coaching',
    icon: '💀',
    featured: false,
  },
  {
    title: 'Read the Blog',
    subtitle: 'Dark psychology insights',
    href: '/blog',
    icon: '📝',
    featured: false,
  },
  {
    title: 'Subscribe to Newsletter',
    subtitle: 'Weekly manipulation tactics',
    href: '/#newsletter',
    icon: '📧',
    featured: false,
  },
]

const socialPlatforms = [
  {
    name: 'TikTok',
    href: SOCIAL_LINKS.tiktok,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: SOCIAL_LINKS.youtube,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
]

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="mb-6">
          <KBSpinLogo size="lg" animate />
        </div>
        <h1 className="text-2xl font-light text-white mb-2">
          {SITE_CONFIG.name}
        </h1>
        <p className="text-gold-400 text-sm mb-3">
          {SITE_CONFIG.title}
        </p>
        <p className="text-gray-500 text-sm max-w-xs mx-auto italic">
          &quot;{SITE_CONFIG.tagline}&quot;
        </p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        {links.map((link, index) => {
          const LinkComponent = link.external ? 'a' : Link
          const linkProps = link.external
            ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: link.href }

          return (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LinkComponent
                {...linkProps}
                className={`block w-full p-4 rounded-xl border transition-all duration-300 ${
                  link.featured
                    ? 'bg-gradient-to-r from-burgundy-600 to-burgundy-800 border-burgundy-500 hover:from-burgundy-500 hover:to-burgundy-700'
                    : 'bg-gray-900/50 border-gray-800 hover:border-gold-500/50 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{link.icon}</span>
                  <div className="flex-1">
                    <div className={`font-medium ${link.featured ? 'text-white' : 'text-white'}`}>
                      {link.title}
                    </div>
                    <div className={`text-sm ${link.featured ? 'text-burgundy-200' : 'text-gray-500'}`}>
                      {link.subtitle}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </LinkComponent>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-4"
      >
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900/50 border border-gray-800 rounded-full hover:border-gold-500/50 hover:bg-gray-800/50 transition-all text-gray-400 hover:text-white"
          >
            {platform.icon}
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-gray-600 text-xs"
      >
        <p>670K+ followers across platforms</p>
        <p className="mt-1">Clinically diagnosed ASPD</p>
      </motion.div>
    </div>
  )
}
