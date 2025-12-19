import Link from 'next/link'
import { SITE_CONFIG, SOCIAL_METRICS } from '@/lib/constants'

interface AuthorBioProps {
  variant?: 'full' | 'compact' | 'inline'
  showSocials?: boolean
  className?: string
}

export default function AuthorBio({ variant = 'compact', showSocials = true, className = '' }: AuthorBioProps) {
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-accent-gold to-accent-burgundy flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
            KB
          </div>
        </div>
        <div>
          <Link href="/about" className="font-medium text-white hover:text-accent-gold transition-colors">
            {SITE_CONFIG.name}
          </Link>
          <p className="text-xs text-text-gray">{SITE_CONFIG.title}</p>
        </div>
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div className={`bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-2xl p-8 lg:p-10 ${className}`}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-gold to-accent-burgundy">
              <div className="absolute inset-0 flex items-center justify-center text-white font-light text-4xl">
                KB
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-accent-gold text-xs uppercase tracking-[0.2em] mb-2">About the Author</p>
            <h3 className="text-2xl font-light text-white mb-2">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-text-gray text-sm mb-5">{SITE_CONFIG.title}</p>
            <p className="text-text-light leading-relaxed mb-6">
              {SITE_CONFIG.description} With {SOCIAL_METRICS.combined.totalFollowers} followers
              and {SOCIAL_METRICS.combined.totalViews} views across platforms, Kanika offers a rare
              first-person perspective on psychology that most can only theorize about.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {SITE_CONFIG.credentials.slice(0, 3).map((credential, index) => (
                <span
                  key={index}
                  className="text-xs px-4 py-1.5 bg-accent-gold/10 border border-accent-gold/20 rounded-full text-text-gray"
                >
                  {credential}
                </span>
              ))}
            </div>
            {showSocials && (
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={SOCIAL_METRICS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-gray hover:text-accent-gold transition-colors"
                >
                  YouTube ({SOCIAL_METRICS.youtube.subscribers})
                </a>
                <a
                  href={SOCIAL_METRICS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-gray hover:text-accent-gold transition-colors"
                >
                  TikTok ({SOCIAL_METRICS.tiktok.followers})
                </a>
                <a
                  href={SOCIAL_METRICS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-gray hover:text-accent-gold transition-colors"
                >
                  Instagram ({SOCIAL_METRICS.instagram.followers})
                </a>
              </div>
            )}
          </div>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-8 text-sm text-accent-gold hover:text-accent-gold/80 transition-colors group"
        >
          Read full bio and credentials
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-5 p-6 bg-gradient-to-br from-deep-black/80 to-deep-navy/40 border border-white/10 rounded-xl ${className}`}>
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-accent-gold to-accent-burgundy flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-xl">
          KB
        </div>
      </div>
      <div>
        <Link href="/about" className="font-medium text-white hover:text-accent-gold transition-colors">
          {SITE_CONFIG.name}
        </Link>
        <p className="text-sm text-accent-gold mb-2">{SITE_CONFIG.title}</p>
        <p className="text-sm text-text-gray leading-relaxed">
          Clinically diagnosed with ASPD, Kanika provides unique first-person insights into dark psychology
          and Cluster B personality disorders.
        </p>
      </div>
    </div>
  )
}
