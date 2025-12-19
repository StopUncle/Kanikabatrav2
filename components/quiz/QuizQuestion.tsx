'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion as QuizQuestionType } from '@/lib/quiz-questions'

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer: number | null
  onAnswerSelect: (answerIndex: number) => void
  direction: number
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  direction
}: QuizQuestionProps) {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h2 className="text-2xl md:text-3xl font-light text-white mb-10 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.answers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswerSelect(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-5 text-left rounded-xl border transition-all duration-300 ${
                selectedAnswer === index
                  ? 'bg-gradient-to-r from-accent-gold/20 to-accent-burgundy/20 border-accent-gold/50 text-white'
                  : 'bg-white/5 border-white/10 text-text-gray hover:bg-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    selectedAnswer === index
                      ? 'bg-accent-gold text-deep-black'
                      : 'bg-white/10 text-text-gray'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base">{answer.text}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
