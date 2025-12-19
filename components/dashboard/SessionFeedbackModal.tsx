'use client'

import { useState } from 'react'
import { X, Star, Loader2 } from 'lucide-react'

interface SessionFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  sessionId: string
  sessionTitle: string
  onSuccess: () => void
}

export default function SessionFeedbackModal({
  isOpen,
  onClose,
  sessionId,
  sessionTitle,
  onSuccess
}: SessionFeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [goals, setGoals] = useState('')
  const [outcomes, setOutcomes] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/user/sessions/${sessionId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating,
          goals: goals.trim() || null,
          outcomes: outcomes.trim() || null,
          feedback: feedback.trim() || null
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit feedback')
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-light gradient-text-gold">Leave Feedback</h2>
            <p className="text-sm text-text-muted mt-1">{sessionTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-text-light text-sm font-medium mb-3">
              How would you rate this session? *
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-accent-gold fill-accent-gold'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-text-muted mt-2">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-2">
              What were your goals for this session?
            </label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="What did you want to achieve?"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light placeholder:text-gray-600 focus:outline-none focus:border-accent-gold/50 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-2">
              What did you achieve or learn?
            </label>
            <textarea
              value={outcomes}
              onChange={(e) => setOutcomes(e.target.value)}
              placeholder="What insights or breakthroughs did you have?"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light placeholder:text-gray-600 focus:outline-none focus:border-accent-gold/50 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-2">
              Any additional feedback?
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Anything else you'd like to share..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light placeholder:text-gray-600 focus:outline-none focus:border-accent-gold/50 resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-text-light font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
