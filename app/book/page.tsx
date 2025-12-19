import { Metadata } from 'next'
import BookPageClient from './BookPageClient'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sociopathic Dating Bible | Kanika Batra',
  description: 'The first dating guide written by a clinically diagnosed sociopath. 70,000 words of strategic dating frameworks, psychological tactics, and cold calculation that creates obsession.',
  keywords: 'sociopathic dating bible, dating guide, dark psychology dating, manipulation tactics, kanika batra book, dating strategy',
  alternates: {
    canonical: `${SITE_CONFIG.url}/book`,
  },
  openGraph: {
    title: 'Sociopathic Dating Bible - A Cure For Empathy',
    description: 'The dating guide empaths fear. Learn the cold, strategic methods that create irresistible attraction.',
    type: 'website',
    images: ['/images/book-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sociopathic Dating Bible',
    description: 'The first dating guide written by a clinically diagnosed sociopath.',
    images: ['/images/book-og.jpg'],
  },
}

export default function BookPage() {
  return <BookPageClient />
}
