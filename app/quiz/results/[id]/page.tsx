import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { resultProfiles, ResultType } from '@/lib/quiz-questions'
import QuizResultsClient from './QuizResultsClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params

  const quizResult = await prisma.quizResult.findUnique({
    where: { id },
  })

  if (!quizResult) {
    return {
      title: 'Result Not Found | Kanika Batra',
    }
  }

  const profile = resultProfiles[quizResult.resultType as ResultType]

  return {
    title: `${profile.title} - Dark Triad Quiz Result | Kanika Batra`,
    description: profile.description,
    openGraph: {
      title: `I'm ${profile.title}! What's your Dark Triad personality?`,
      description: profile.description,
      type: 'website',
      images: [`/api/og/quiz/${id}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm ${profile.title}!`,
      description: `Take the Dark Triad Personality Quiz to discover your psychological shadow.`,
      images: [`/api/og/quiz/${id}`],
    },
  }
}

export default async function QuizResultPage({ params }: PageProps) {
  const { id } = await params

  const quizResult = await prisma.quizResult.findUnique({
    where: { id },
  })

  if (!quizResult) {
    notFound()
  }

  const profile = resultProfiles[quizResult.resultType as ResultType]
  const scores = quizResult.scores as { narcissism: number; machiavellianism: number; psychopathy: number }

  const maxScore = 75
  const percentages = {
    narcissism: Math.round((scores.narcissism / maxScore) * 100),
    machiavellianism: Math.round((scores.machiavellianism / maxScore) * 100),
    psychopathy: Math.round((scores.psychopathy / maxScore) * 100),
  }

  return (
    <QuizResultsClient
      resultId={quizResult.id}
      type={quizResult.resultType}
      percentages={percentages}
      profile={profile}
    />
  )
}
