import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { generateBookSchema, generateProductSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Sociopathic Dating Bible - A Cure For Empathy | Kanika Batra',
  description: 'The first dating guide written by a clinically diagnosed sociopath. 15 chapters of strategic dating frameworks, psychological tactics, and manipulation mastery. Transform from victim to victor.',
  keywords: 'sociopathic dating bible, dark psychology dating, manipulation tactics, dating strategy, kanika batra book, dark feminine energy, relationship psychology',
  openGraph: {
    title: 'Sociopathic Dating Bible - A Cure For Empathy',
    description: 'The first dating guide written by a clinically diagnosed sociopath. Learn the cold, strategic methods that create irresistible attraction.',
    type: 'website',
    url: 'https://kanikarose.com/book',
    images: [{ url: 'https://kanikarose.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sociopathic Dating Bible - A Cure For Empathy',
    description: 'The first dating guide written by a clinically diagnosed sociopath.',
    images: ['https://kanikarose.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kanikarose.com/book',
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  const bookSchema = generateBookSchema()
  const productSchema = generateProductSchema('book')

  return (
    <>
      <JsonLd data={[bookSchema, productSchema]} />
      {children}
    </>
  )
}
