'use client'

import { useState } from 'react'
import { Calendar, ArrowRight, History, CalendarCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DashboardCard from './DashboardCard'
import SessionCard, { SessionCardProps } from './SessionCard'

type TabType = 'upcoming' | 'history'

interface Session {
  id: string
  packageName: string
  sessionCount: number
  scheduledAt: string | null
  duration: number
  status: string
  meetingUrl: string | null
  notes: string | null
  userNotes: string | null
  feedback?: {
    rating: number
    feedback?: string
  }
}

interface SessionsSectionProps {
  sessions: Session[]
  onNotesUpdate: (sessionId: string, notes: string) => Promise<void>
  onLeaveFeedback: (sessionId: string) => void
}

export default function SessionsSection({
  sessions,
  onNotesUpdate,
  onLeaveFeedback
}: SessionsSectionProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('upcoming')

  const mapSessionToCardProps = (session: Session): SessionCardProps => {
    const scheduledAt = session.scheduledAt ? new Date(session.scheduledAt) : null

    let status: SessionCardProps['status'] = 'pending'
    if (session.status === 'SCHEDULED' && scheduledAt && scheduledAt > new Date()) {
      status = 'upcoming'
    } else if (session.status === 'COMPLETED') {
      status = 'completed'
    } else if (session.status === 'CANCELLED') {
      status = 'cancelled'
    } else if (session.status === 'PENDING_SCHEDULING') {
      status = 'pending'
    } else if (session.status === 'SCHEDULED' && scheduledAt && scheduledAt <= new Date()) {
      status = 'completed'
    }

    return {
      id: session.id,
      title: session.packageName,
      date: scheduledAt ? scheduledAt.toLocaleDateString() : 'TBD',
      time: scheduledAt ? scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
      duration: `${session.duration || 60} minutes`,
      type: 'individual',
      status,
      meetingUrl: session.meetingUrl || undefined,
      coachNotes: session.notes || undefined,
      userNotes: session.userNotes || undefined,
      feedback: session.feedback,
      onNotesUpdate,
      onLeaveFeedback
    }
  }

  const upcomingSessions = sessions
    .filter(s => {
      const scheduledAt = s.scheduledAt ? new Date(s.scheduledAt) : null
      return (
        s.status === 'PENDING_SCHEDULING' ||
        (s.status === 'SCHEDULED' && scheduledAt && scheduledAt > new Date())
      )
    })
    .sort((a, b) => {
      if (!a.scheduledAt) return 1
      if (!b.scheduledAt) return -1
      return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    })

  const historySessions = sessions
    .filter(s => {
      const scheduledAt = s.scheduledAt ? new Date(s.scheduledAt) : null
      return (
        s.status === 'COMPLETED' ||
        s.status === 'CANCELLED' ||
        s.status === 'NO_SHOW' ||
        (s.status === 'SCHEDULED' && scheduledAt && scheduledAt <= new Date())
      )
    })
    .sort((a, b) => {
      if (!a.scheduledAt) return 1
      if (!b.scheduledAt) return -1
      return new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    })

  const displayedSessions = activeTab === 'upcoming' ? upcomingSessions : historySessions

  const tabs = [
    {
      id: 'upcoming' as const,
      label: 'Upcoming',
      icon: CalendarCheck,
      count: upcomingSessions.length
    },
    {
      id: 'history' as const,
      label: 'History',
      icon: History,
      count: historySessions.length
    }
  ]

  return (
    <DashboardCard
      title="Coaching Sessions"
      subtitle="Your transformation journey"
      icon={Calendar}
      headerAction={
        <button
          onClick={() => router.push('/coaching')}
          className="px-4 py-1.5 bg-gold/10 hover:bg-gold/20 rounded-lg text-gold text-sm font-medium transition-colors"
        >
          Book Session
        </button>
      }
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-accent-gold/20 text-accent-gold'
                  : 'bg-gray-800/50 text-text-muted hover:bg-gray-800 hover:text-text-light'
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  isActive ? 'bg-accent-gold/30' : 'bg-gray-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Sessions Content */}
      {displayedSessions.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {displayedSessions.map((session) => (
            <SessionCard
              key={session.id}
              {...mapSessionToCardProps(session)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {activeTab === 'upcoming' ? (
            <>
              <Calendar size={48} className="mx-auto text-gray-700 mb-3" />
              <p className="text-text-muted mb-2">No upcoming sessions</p>
              <p className="text-xs text-text-muted mb-4">
                Book a session to start your transformation
              </p>
              <button
                onClick={() => router.push('/coaching')}
                className="px-6 py-2 bg-gradient-to-r from-accent-burgundy to-accent-sapphire rounded-lg text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                Book Your First Session
                <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <History size={48} className="mx-auto text-gray-700 mb-3" />
              <p className="text-text-muted">No session history yet</p>
              <p className="text-xs text-text-muted mt-2">
                Your completed sessions will appear here
              </p>
            </>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {sessions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
          <div className="flex gap-6">
            <div className="text-text-muted">
              <span className="text-text-light font-medium">{upcomingSessions.length}</span> upcoming
            </div>
            <div className="text-text-muted">
              <span className="text-text-light font-medium">{historySessions.filter(s => s.status === 'COMPLETED').length}</span> completed
            </div>
          </div>
          {historySessions.some(s => s.status === 'COMPLETED' && !s.feedback) && (
            <span className="text-accent-gold text-xs">
              You have sessions awaiting feedback
            </span>
          )}
        </div>
      )}
    </DashboardCard>
  )
}
