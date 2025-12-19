'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Loader2, Calendar, BookOpen, Trophy, Flame, Target } from 'lucide-react'
import DashboardCard from './DashboardCard'

interface ProgressData {
  memberSince: string
  daysActive: number
  streak: number
  sessions: {
    total: number
    completed: number
    upcoming: number
    completionRate: number
  }
  courses: {
    enrolled: number
    completed: number
    lessonsCompleted: number
  }
  purchases: {
    total: number
    hasBook: boolean
  }
  achievements: {
    earned: number
    total: number
    percentage: number
  }
}

export default function ProgressOverview() {
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch('/api/user/progress')
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  if (loading) {
    return (
      <DashboardCard
        title="Your Progress"
        subtitle="Loading..."
        icon={TrendingUp}
      >
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
        </div>
      </DashboardCard>
    )
  }

  if (!data) {
    return (
      <DashboardCard
        title="Your Progress"
        subtitle="Overview of your journey"
        icon={TrendingUp}
      >
        <div className="text-center py-8">
          <TrendingUp size={32} className="mx-auto text-gray-700 mb-2" />
          <p className="text-text-muted text-sm">Failed to load progress</p>
        </div>
      </DashboardCard>
    )
  }

  const stats = [
    {
      icon: Flame,
      label: 'Day Streak',
      value: data.streak,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: Calendar,
      label: 'Days Active',
      value: data.daysActive,
      color: 'text-accent-gold',
      bgColor: 'bg-accent-gold/10'
    },
    {
      icon: Target,
      label: 'Sessions Done',
      value: data.sessions.completed,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: BookOpen,
      label: 'Lessons Done',
      value: data.courses.lessonsCompleted,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ]

  return (
    <DashboardCard
      title="Your Progress"
      subtitle={`Member since ${new Date(data.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
      icon={TrendingUp}
    >
      <div className="space-y-4">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="p-3 bg-gray-900/50 rounded-lg border border-gray-800"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1.5 rounded ${stat.bgColor}`}>
                    <Icon size={14} className={stat.color} />
                  </div>
                  <span className="text-text-muted text-xs">{stat.label}</span>
                </div>
                <p className={`text-2xl font-light ${stat.color}`}>{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Coaching Progress */}
        {data.sessions.total > 0 && (
          <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm">Coaching Journey</span>
              <span className="text-accent-gold text-sm font-medium">
                {data.sessions.completed}/{data.sessions.total}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-burgundy to-accent-gold transition-all duration-500"
                style={{ width: `${data.sessions.completionRate}%` }}
              />
            </div>
            {data.sessions.upcoming > 0 && (
              <p className="text-xs text-text-muted mt-2">
                {data.sessions.upcoming} session{data.sessions.upcoming > 1 ? 's' : ''} upcoming
              </p>
            )}
          </div>
        )}

        {/* Achievements Progress */}
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-amber-400" />
              <span className="text-text-muted text-sm">Achievements</span>
            </div>
            <span className="text-amber-400 text-sm font-medium">
              {data.achievements.earned}/{data.achievements.total}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
              style={{ width: `${data.achievements.percentage}%` }}
            />
          </div>
        </div>

        {/* Quick Milestones */}
        <div className="flex flex-wrap gap-2 pt-2">
          {data.purchases.hasBook && (
            <span className="px-2 py-1 bg-accent-gold/10 border border-accent-gold/30 rounded-full text-xs text-accent-gold">
              Book Owner
            </span>
          )}
          {data.courses.enrolled > 0 && (
            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
              Course Enrolled
            </span>
          )}
          {data.sessions.completed >= 3 && (
            <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400">
              3+ Sessions
            </span>
          )}
          {data.daysActive >= 30 && (
            <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-400">
              30 Day Member
            </span>
          )}
        </div>
      </div>
    </DashboardCard>
  )
}
