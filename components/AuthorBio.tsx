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
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-accent-burgundy to-accent-gold">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
            KB
          </div>
        </div>
        <div>
          <Link href="/about" className="font-medium text-white hover:text-accent-gold transition-colors">
            {SITE_CONFIG.name}
          </Link>
          <p className="text-xs text-gray-400">{SITE_CONFIG.title}</p>
        </div>
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div className={`bg-gradient-to-br from-deep-navy to-deep-burgundy/20 border border-gray-800 rounded-xl p-8 ${className}`}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-accent-burgundy to-accent-gold">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl">
                KB
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-white mb-1">
              About {SITE_CONFIG.name}
            </h3>
            <p className="text-accent-gold text-sm mb-4">{SITE_CONFIG.title}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {SITE_CONFIG.description} With {SOCIAL_METRICS.combined.totalFollowers} followers
              and {SOCIAL_METRICS.combined.totalViews} views across platforms, Kanika offers a rare
              first-person perspective on psychology that most can only theorize about.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {SITE_CONFIG.credentials.slice(0, 3).map((credential, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-accent-burgundy/20 border border-accent-burgundy/40 rounded-full text-gray-300"
                >
                  {credential}
                </span>
              ))}
            </div>
            {showSocials && (
              <div className="flex gap-4 text-sm">
                <a
                  href={SOCIAL_METRICS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-gold transition-colors"
                >
                  YouTube ({SOCIAL_METRICS.youtube.subscribers})
                </a>
                <a
                  href={SOCIAL_METRICS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-gold transition-colors"
                >
                  TikTok ({SOCIAL_METRICS.tiktok.followers})
                </a>
                <a
                  href={SOCIAL_METRICS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-gold transition-colors"
                >
                  Instagram ({SOCIAL_METRICS.instagram.followers})
                </a>
              </div>
            )}
          </div>
        </div>
        <Link
          href="/about"
          className="inline-block mt-6 text-sm text-accent-gold hover:underline"
        >
          Read full bio and credentials &rarr;
        </Link>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-4 p-4 bg-deep-navy/30 border border-gray-800 rounded-lg ${className}`}>
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-accent-burgundy to-accent-gold flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          KB
        </div>
      </div>
      <div>
        <Link href="/about" className="font-semibold text-white hover:text-accent-gold transition-colors">
          {SITE_CONFIG.name}
        </Link>
        <p className="text-sm text-accent-gold mb-2">{SITE_CONFIG.title}</p>
        <p className="text-sm text-gray-400 line-clamp-2">
          Clinically diagnosed with ASPD, Kanika provides unique first-person insights into dark psychology
          and Cluster B personality disorders.
        </p>
      </div>
    </div>
  )
}
