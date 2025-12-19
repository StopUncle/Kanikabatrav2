'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ_QUESTIONS, PersonalityType, calculateScores, getPersonalityTypes, generateDiagnosis, QUIZ_INFO } from '@/lib/quiz-data'
import DoubleEchoLogo from '@/components/DoubleEchoLogo'

export default function QuizTakePage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const question = QUIZ_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion) / QUIZ_QUESTIONS.length) * 100

  const handleAnswer = (answerId: string, type: PersonalityType) => {
    setSelectedAnswer(answerId)

    // Store the answer
    const newAnswers = { ...answers, [question.id]: type }
    setAnswers(newAnswers)

    // Delay before moving to next question for visual feedback
    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        // Quiz complete - show processing then redirect
        setIsProcessing(true)

        // Calculate results
        const scores = calculateScores(newAnswers)
        const types = getPersonalityTypes(scores)
        const diagnosis = generateDiagnosis(newAnswers)

        // Store in sessionStorage for results page
        sessionStorage.setItem('quizResults', JSON.stringify({
          scores,
          primaryType: types.primary,
          secondaryType: types.secondary,
          diagnosis,
          answers: newAnswers,
          completedAt: new Date().toISOString()
        }))

        // Redirect to results after processing animation
        setTimeout(() => {
          router.push('/quiz/results')
        }, 3000)
      }
    }, 400)
  }

  // Processing screen
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8 flex justify-center"
          >
            <DoubleEchoLogo size="xl" animate />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-light text-white mb-4">
              Analyzing Your Psychology...
            </h2>
            <p className="text-text-gray mb-8">
              Calculating your Dark Mirror profile
            </p>

            {/* Processing animation */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-accent-gold rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-deep-black/50">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-gold to-accent-gold/60"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="pt-6 px-4 flex justify-between items-center">
        <div className="text-text-gray text-sm">
          <span className="text-accent-gold">{currentQuestion + 1}</span>
          <span> / {QUIZ_QUESTIONS.length}</span>
        </div>
        <div className="text-text-gray text-xs uppercase tracking-wider">
          {QUIZ_INFO.name}
        </div>
      </div>

      {/* Question Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Title */}
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full mb-4">
                  {question.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-light text-white leading-relaxed">
                  {question.scenario}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {question.answers.map((answer, index) => (
                  <motion.button
                    key={answer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(answer.id, answer.type)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedAnswer === answer.id
                        ? 'bg-accent-gold/20 border-accent-gold text-white'
                        : selectedAnswer !== null
                          ? 'bg-deep-black/30 border-accent-gold/10 text-text-gray/50 cursor-not-allowed'
                          : 'bg-deep-black/30 border-accent-gold/20 text-text-gray hover:border-accent-gold/50 hover:bg-accent-gold/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                        selectedAnswer === answer.id
                          ? 'border-accent-gold bg-accent-gold text-deep-black'
                          : 'border-accent-gold/30 text-accent-gold/60'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="pt-1">{answer.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-6 px-4 text-center">
        <p className="text-text-gray/50 text-xs">
          Your responses are private. Choose honestly for accurate results.
        </p>
      </div>
    </div>
  )
}
