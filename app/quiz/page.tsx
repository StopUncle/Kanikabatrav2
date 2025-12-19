import { Metadata } from 'next'
import QuizLanding from './QuizLanding'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dark Triad Personality Quiz | Kanika Batra',
  description: 'Discover which Dark Triad personality type you are. Are you a Narcissist, Machiavellian, or Psychopath? Take the quiz to find out.',
  keywords: 'dark triad quiz, personality test, narcissist test, machiavellian test, psychopath test, dark psychology quiz',
  alternates: {
    canonical: `${SITE_CONFIG.url}/quiz`,
  },
  openGraph: {
    title: 'Which Dark Triad Personality Are You?',
    description: 'Are you a Narcissist, Machiavellian, or Psychopath? Take the 15-question quiz to discover your dark side.',
    type: 'website',
    images: ['/images/quiz-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Triad Personality Quiz',
    description: 'Discover which Dark Triad personality type dominates your psychology.',
    images: ['/images/quiz-og.jpg'],
  },
}

export default function QuizPage() {
  return <QuizLanding />
}
