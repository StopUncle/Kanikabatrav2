'use client'

import { useState, useEffect } from 'react'
import { Activity, Loader2 } from 'lucide-react'
import DashboardCard from './DashboardCard'
import ActivityItem from './ActivityItem'

interface ActivityLog {
  id: string
  type: string
  title: string
  metadata: Record<string, unknown> | null
  createdAt: string
}

interface ActivityFeedProps {
  compact?: boolean
  limit?: number
}

export default function ActivityFeed({ compact = false, limit = 10 }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`/api/user/activity?limit=${limit}`)
        if (response.ok) {
          const data = await response.json()
          setActivities(data.activities)
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchActivity()
  }, [limit])

  if (compact) {
    return (
      <DashboardCard
        title="Recent Activity"
        subtitle="Your latest actions"
        icon={Activity}
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
          </div>
        ) : activities.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {activities.slice(0, 5).map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                title={activity.title}
                metadata={activity.metadata || undefined}
                createdAt={activity.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity size={32} className="mx-auto text-gray-700 mb-2" />
            <p className="text-text-muted text-sm">No activity yet</p>
            <p className="text-text-muted text-xs mt-1">
              Your actions will appear here
            </p>
          </div>
        )}
      </DashboardCard>
    )
  }

  // Full view with date groupings
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, ActivityLog[]>)

  return (
    <DashboardCard
      title="Activity Timeline"
      subtitle="Your journey so far"
      icon={Activity}
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date}>
              <h4 className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">
                {date}
              </h4>
              <div className="divide-y divide-gray-800 bg-gray-900/30 rounded-lg">
                {dayActivities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    type={activity.type}
                    title={activity.title}
                    metadata={activity.metadata || undefined}
                    createdAt={activity.createdAt}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Activity size={48} className="mx-auto text-gray-700 mb-3" />
          <p className="text-text-muted">No activity yet</p>
          <p className="text-text-muted text-sm mt-1">
            Start exploring to build your activity history
          </p>
        </div>
      )}
    </DashboardCard>
  )
}
