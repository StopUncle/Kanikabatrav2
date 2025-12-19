import { Metadata } from 'next'
import { SITE_CONFIG, SOCIAL_METRICS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dark Psychology Content | Kanika Batra',
  description: `Watch ${SOCIAL_METRICS.youtube.totalViews} views of dark psychology content from Kanika Batra. Learn about manipulation tactics, relationships, and insights from a diagnosed sociopath.`,
  keywords: ['dark psychology', 'manipulation tactics', 'sociopath content', 'relationship strategy', 'ASPD', 'Kanika Batra videos'],
  alternates: {
    canonical: `${SITE_CONFIG.url}/content`,
  },
  openGraph: {
    title: 'Dark Psychology Content | Kanika Batra',
    description: `${SOCIAL_METRICS.youtube.totalViews} views of dark psychology content. Learn manipulation tactics from a diagnosed sociopath.`,
    url: `${SITE_CONFIG.url}/content`,
    type: 'website',
    images: [{
      url: `${SITE_CONFIG.url}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Kanika Batra Dark Psychology Content',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Psychology Content | Kanika Batra',
    description: `${SOCIAL_METRICS.youtube.totalViews} views of dark psychology content from a diagnosed sociopath.`,
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
}

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
