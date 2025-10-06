import BackgroundEffects from '@/components/BackgroundEffects'
import Header from '@/components/Header'
import AboutContent from '@/components/AboutContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Kanika Batra',
  description: 'Learn about Kanika Batra, diagnosed sociopath, beauty queen, and dark psychology expert. Her story from psychiatric wards to pageant stages.',
}

export default function AboutPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <AboutContent />
    </>
  )
}