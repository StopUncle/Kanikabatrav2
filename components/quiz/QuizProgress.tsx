'use client'

import { motion } from 'framer-motion'

interface QuizProgressProps {
  current: number
  total: number
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-text-gray mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-gold to-accent-burgundy"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
