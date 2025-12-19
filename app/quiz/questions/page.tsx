'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import QuizProgress from '@/components/quiz/QuizProgress'
import QuizQuestion from '@/components/quiz/QuizQuestion'
import { quizQuestions } from '@/lib/quiz-questions'

export default function QuizQuestionsPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[][]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = quizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }, [])

  const handleNext = useCallback(async () => {
    if (selectedAnswer === null) return

    const answerData = question.answers[selectedAnswer]
    const newAnswer = [
      question.id,
      selectedAnswer,
      answerData.scores.narcissism,
      answerData.scores.machiavellianism,
      answerData.scores.psychopathy
    ]

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: updatedAnswers })
        })

        if (response.ok) {
          const { resultId } = await response.json()
          router.push(`/quiz/results/${resultId}`)
        } else {
          console.error('Failed to submit quiz')
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error('Error submitting quiz:', error)
        setIsSubmitting(false)
      }
    } else {
      setDirection(1)
      setSelectedAnswer(null)
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [selectedAnswer, question, answers, isLastQuestion, router])

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1)
      setAnswers((prev) => prev.slice(0, -1))
      setSelectedAnswer(null)
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion])

  return (
    <div className="min-h-screen bg-deep-black">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <QuizProgress
            current={currentQuestion + 1}
            total={quizQuestions.length}
          />

          <div className="min-h-[400px]">
            <QuizQuestion
              question={question}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              direction={direction}
            />
          </div>

          <div className="flex justify-between mt-10">
            <motion.button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              whileHover={{ scale: currentQuestion === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentQuestion === 0 ? 1 : 0.98 }}
              className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                currentQuestion === 0
                  ? 'border-white/5 text-text-gray/30 cursor-not-allowed'
                  : 'border-white/20 text-text-gray hover:border-white/40 hover:text-white'
              }`}
            >
              &larr; Back
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={selectedAnswer === null || isSubmitting}
              whileHover={{ scale: selectedAnswer === null ? 1 : 1.02 }}
              whileTap={{ scale: selectedAnswer === null ? 1 : 0.98 }}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-white/10 text-text-gray/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent-gold to-accent-burgundy text-white hover:shadow-lg hover:shadow-accent-gold/20'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Calculating...
                </span>
              ) : isLastQuestion ? (
                'See Results'
              ) : (
                'Next →'
              )}
            </motion.button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
      </div>
    </div>
  )
}
