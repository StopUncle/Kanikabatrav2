'use client'

import { Calendar, Clock, Video, ChevronRight } from 'lucide-react'

interface CoachingSessionProps {
  title: string
  date: string
  time: string
  duration: string
  type: 'individual' | 'group' | 'vip'
  status: 'upcoming' | 'completed' | 'cancelled'
  meetingUrl?: string
  notes?: string
}

const CoachingSession = ({
  title,
  date,
  time,
  duration,
  type,
  status,
  meetingUrl,
  notes
}: CoachingSessionProps) => {
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
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/30 transition-all duration-300">
      <div className={`h-1 bg-gradient-to-r ${getTypeColor()}`} />
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-text-light font-semibold text-lg">{title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-text-muted capitalize">{type} Session</span>
              {getStatusBadge()}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-text-muted text-sm">
            <Calendar size={16} className="text-gold" />
            <span>{date === 'TBD' ? 'To be scheduled' : new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center gap-3 text-text-muted text-sm">
            <Clock size={16} className="text-gold" />
            <span>{time} ({duration})</span>
          </div>

          {notes && (
            <div className="pt-3 border-t border-gray-800">
              <p className="text-text-muted text-sm italic">&ldquo;{notes}&rdquo;</p>
            </div>
          )}

          {status === 'upcoming' && meetingUrl && (
            <button
              onClick={() => window.open(meetingUrl, '_blank')}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all group"
            >
              <Video size={18} />
              Join Session
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoachingSession