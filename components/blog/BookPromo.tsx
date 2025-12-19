'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BOOK_INFO } from '@/lib/constants'

interface BookPromoProps {
  variant?: 'full' | 'compact'
  className?: string
}

export default function BookPromo({ variant = 'full', className = '' }: BookPromoProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-accent-burgundy/20 to-deep-navy/40 rounded-xl p-6 border border-accent-gold/20 ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-medium mb-1">
              Get the {BOOK_INFO.title}
            </p>
            <p className="text-text-gray text-sm">
              Now available on Amazon for just ${BOOK_INFO.kdpPrice}
            </p>
          </div>
          <a
            href={BOOK_INFO.kdpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF9900] to-[#FF6600] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-deep-navy/50 to-accent-burgundy/20 rounded-2xl p-8 border border-white/10 ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">📖</span>
        <div>
          <h3 className="text-2xl font-light text-white">
            {BOOK_INFO.title}
          </h3>
          <p className="text-accent-gold text-sm uppercase tracking-wider">
            {BOOK_INFO.subtitle}
          </p>
        </div>
      </div>

      <p className="text-text-gray mb-6 leading-relaxed">
        {BOOK_INFO.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🛒</span>
            <span className="text-white font-medium">Amazon Kindle</span>
          </div>
          <p className="text-3xl font-light text-accent-gold mb-1">
            ${BOOK_INFO.kdpPrice}
          </p>
          <p className="text-text-gray text-sm mb-3">
            Instant digital delivery
          </p>
          <a
            href={BOOK_INFO.kdpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 bg-gradient-to-r from-[#FF9900] to-[#FF6600] text-white text-sm font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Buy on Amazon
          </a>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-accent-gold/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="text-white font-medium">Premium Edition</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-light text-accent-gold">
              ${BOOK_INFO.price}
            </p>
            <p className="text-text-gray text-sm line-through">
              ${BOOK_INFO.originalPrice}
            </p>
          </div>
          <p className="text-text-gray text-sm mb-3">
            Includes exclusive bonuses
          </p>
          <Link
            href="/book"
            className="block w-full py-2.5 bg-gradient-to-r from-accent-gold to-accent-burgundy text-white text-sm font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Get Premium
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-gray">
        <svg className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Written by a clinically diagnosed sociopath</span>
      </div>
    </motion.div>
  )
}
