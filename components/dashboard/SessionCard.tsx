'use client'

import { useState } from 'react'
import { Calendar, Clock, Video, ChevronRight, ChevronDown, FileText, Star, CalendarPlus } from 'lucide-react'

export interface SessionCardProps {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: 'individual' | 'group' | 'vip'
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending'
  meetingUrl?: string
  coachNotes?: string
  userNotes?: string
  feedback?: {
    rating: number
    feedback?: string
  }
  onNotesUpdate?: (id: string, notes: string) => void
  onLeaveFeedback?: (id: string) => void
}

export default function SessionCard({
  id,
  title,
  date,
  time,
  duration,
  type,
  status,
  meetingUrl,
  coachNotes,
  userNotes,
  feedback,
  onNotesUpdate,
  onLeaveFeedback
}: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [notes, setNotes] = useState(userNotes || '')
  const [isSavingNotes, setIsSavingNotes] = useState(false)

  const getTypeColor = () => {
    switch (type) {
      case 'vip':
        return 'from-accent-gold to-accent-gold/70'
      case 'individual':
        return 'from-accent-burgundy to-accent-sapphire'
      case 'group':
        return 'from-accent-sapphire to-accent-burgundy'
      default:
        return 'from-gray-600 to-gray-700'
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            Upcoming
          </span>
        )
      case 'completed':
        return (
          <span className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-medium">
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
            Cancelled
          </span>
        )
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
            Pending
          </span>
        )
      default:
        return null
    }
  }

  const getTimeUntil = () => {
    if (status !== 'upcoming' || date === 'TBD') return null
    const sessionDate = new Date(`${date} ${time}`)
    const now = new Date()
    const diff = sessionDate.getTime() - now.getTime()

    if (diff < 0) return null

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} away`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} away`
    return 'Starting soon'
  }

  const handleSaveNotes = async () => {
    if (!onNotesUpdate) return
    setIsSavingNotes(true)
    try {
      await onNotesUpdate(id, notes)
    } finally {
      setIsSavingNotes(false)
    }
  }

  const generateCalendarUrl = () => {
    if (date === 'TBD') return null
    const startDate = new Date(`${date} ${time}`)
    const endDate = new Date(startDate.getTime() + parseInt(duration) * 60000)

    const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const event = {
      text: `Coaching: ${title}`,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `Coaching session with Kanika Batra${meetingUrl ? `\\n\\nMeeting Link: ${meetingUrl}` : ''}`,
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}`
  }

  const timeUntil = getTimeUntil()
  const calendarUrl = generateCalendarUrl()

  return (
    <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/30 transition-all duration-300">
      <div className={`h-1 bg-gradient-to-r ${getTypeColor()}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-text-light font-semibold text-lg">{title}</h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-text-muted capitalize">{type} Session</span>
              {getStatusBadge()}
              {timeUntil && (
                <span className="text-xs text-accent-gold font-medium">{timeUntil}</span>
              )}
            </div>
          </div>
          {feedback && (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= feedback.rating ? 'text-accent-gold fill-accent-gold' : 'text-gray-600'}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-text-muted text-sm">
            <Calendar size={16} className="text-gold" />
            <span>
              {date === 'TBD'
                ? 'To be scheduled'
                : new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
              }
            </span>
          </div>

          <div className="flex items-center gap-3 text-text-muted text-sm">
            <Clock size={16} className="text-gold" />
            <span>{time === 'TBD' ? 'Time TBD' : time} ({duration})</span>
          </div>

          {coachNotes && (
            <div className="pt-3 border-t border-gray-800">
              <p className="text-text-muted text-sm italic">&ldquo;{coachNotes}&rdquo;</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {status === 'upcoming' && meetingUrl && (
              <button
                onClick={() => window.open(meetingUrl, '_blank')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all group"
              >
                <Video size={18} />
                Join Session
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {status === 'upcoming' && calendarUrl && (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-text-light text-sm transition-colors"
                title="Add to Calendar"
              >
                <CalendarPlus size={16} />
              </a>
            )}

            {status === 'completed' && !feedback && onLeaveFeedback && (
              <button
                onClick={() => onLeaveFeedback(id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-gold/20 hover:bg-accent-gold/30 rounded-lg text-accent-gold font-medium transition-colors"
              >
                <Star size={18} />
                Leave Feedback
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-text-light text-sm transition-colors"
            >
              <FileText size={16} />
              <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expanded Notes Section */}
          {isExpanded && (
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <div>
                <label className="text-text-muted text-xs block mb-2">Your Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your personal notes for this session..."
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-gold/50 resize-none"
                  rows={3}
                />
                {notes !== (userNotes || '') && onNotesUpdate && (
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="mt-2 px-4 py-1.5 bg-accent-gold/20 hover:bg-accent-gold/30 rounded-lg text-accent-gold text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSavingNotes ? 'Saving...' : 'Save Notes'}
                  </button>
                )}
              </div>

              {feedback?.feedback && (
                <div>
                  <label className="text-text-muted text-xs block mb-1">Your Feedback</label>
                  <p className="text-text-light text-sm">{feedback.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
