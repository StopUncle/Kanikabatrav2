import { Metadata } from 'next'
import QuizLanding from './QuizLanding'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'The Dark Mirror Assessment | Kanika Batra',
  description: 'Discover your Cluster B personality profile. Are you Psychopathic, Sociopathic, Narcissistic, Borderline, or Histrionic? Take the assessment.',
  keywords: 'dark mirror assessment, cluster b quiz, personality test, psychopath test, narcissist test, borderline test, dark psychology quiz',
  alternates: {
    canonical: `${SITE_CONFIG.url}/quiz`,
  },
  openGraph: {
    title: 'The Dark Mirror Assessment - See What\'s Really Looking Back',
    description: 'A psychological assessment revealing your dominant personality patterns across five Cluster B types. 15 scenarios. Brutal truth.',
    type: 'website',
    images: ['/images/quiz-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Dark Mirror Assessment',
    description: 'See what\'s really looking back at you. Discover your dark psychology profile.',
    images: ['/images/quiz-og.jpg'],
  },
}

export default function QuizPage() {
  return <QuizLanding />
}
