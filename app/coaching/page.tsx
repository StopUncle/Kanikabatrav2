import { Metadata } from 'next'
import CoachingPageClient from './CoachingPageClient'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'High-Performance Psychology Coaching | Kanika Batra',
  description: 'Access the headspace where fear doesn\'t vote. 1-on-1 coaching with a diagnosed sociopath. Mind Architecture, Presence & Influence, and Empire Psychology programs.',
  keywords: 'high performance psychology, executive coaching, mental performance coaching, decision making coaching, kanika batra coaching, presence coaching',
  alternates: {
    canonical: `${SITE_CONFIG.url}/coaching`,
  },
  openGraph: {
    title: 'High-Performance Psychology Coaching | Kanika Batra',
    description: 'Access the headspace where fear doesn\'t vote and decisions come fast. 1-on-1 with a diagnosed sociopath.',
    type: 'website',
    images: ['/images/coaching-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Performance Psychology | Kanika Batra',
    description: 'Access the headspace where fear doesn\'t vote. 1-on-1 coaching with a diagnosed sociopath.',
    images: ['/images/coaching-og.jpg'],
  },
}

export default function CoachingPage() {
  return <CoachingPageClient />
}
