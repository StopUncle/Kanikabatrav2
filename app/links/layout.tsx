import { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Links | Kanika Batra',
  description: 'All links to Kanika Batra\'s content, book, coaching, social media, and dark psychology resources in one place.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/links`,
  },
  openGraph: {
    title: 'Links | Kanika Batra',
    description: 'All links to Kanika Batra\'s content, book, coaching, and social media.',
    url: `${SITE_CONFIG.url}/links`,
    type: 'website',
    images: [{
      url: `${SITE_CONFIG.url}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Kanika Batra Links',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links | Kanika Batra',
    description: 'All links to Kanika Batra\'s content, book, coaching, and social media.',
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
