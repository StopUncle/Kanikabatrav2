'use client'

import Header from '@/components/Header'
import QuizResults from '@/components/quiz/QuizResults'
import type { ResultProfile } from '@/lib/quiz-questions'

interface QuizResultsClientProps {
  resultId: string
  type: string
  percentages: {
    narcissism: number
    machiavellianism: number
    psychopathy: number
  }
  profile: ResultProfile
}

export default function QuizResultsClient({
  resultId,
  type,
  percentages,
  profile
}: QuizResultsClientProps) {
  return (
    <div className="min-h-screen bg-deep-black">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <QuizResults
            resultId={resultId}
            type={type}
            percentages={percentages}
            profile={profile}
          />
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: `${profile.color}20` }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: `${profile.color}10` }}
        />
      </div>
    </div>
  )
}
