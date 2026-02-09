import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import AboutContent from '@/components/AboutContent'
import JsonLd from '@/components/JsonLd'
import { generatePersonSchema } from '@/lib/schema'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Kanika Batra | The Psychology of Power | Dark Psychology Expert',
  description: 'Learn about Kanika Batra, diagnosed sociopath and dark psychology expert. Her story from psychiatric wards to becoming a viral sensation with 37M+ views teaching strategic psychology.',
  keywords: 'kanika batra, the psychology of power, dark psychology expert, diagnosed sociopath, ASPD, strategic psychology',
  openGraph: {
    title: 'About Kanika Batra - The Psychology of Power',
    description: 'Diagnosed sociopath and dark psychology expert. Teaching strategic psychology to 670K+ followers.',
    type: 'profile',
    url: 'https://kanikarose.com/about',
    images: [{ url: 'https://kanikarose.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kanika Batra - The Psychology of Power',
    description: 'Diagnosed sociopath and dark psychology expert.',
  },
  alternates: {
    canonical: 'https://kanikarose.com/about',
  },
}

export default function AboutPage() {
  const personSchema = generatePersonSchema()

  return (
    <>
      <JsonLd data={personSchema} />
      <BackgroundEffects />
      <Header />
      <AboutContent />
    </>
  )
}