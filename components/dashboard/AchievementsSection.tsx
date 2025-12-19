'use client'

import { useState, useEffect } from 'react'
import { Trophy, Loader2, ChevronRight } from 'lucide-react'
import DashboardCard from './DashboardCard'
import AchievementBadge from './AchievementBadge'

interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  tier: string
  isEarned: boolean
  earnedAt: string | null
  progress: number
  currentValue: number
  targetValue: number
}

interface AchievementsData {
  earned: Achievement[]
  available: Achievement[]
  recentlyEarned: Achievement[]
  stats: {
    total: number
    earned: number
    progress: number
  }
}

interface AchievementsSectionProps {
  compact?: boolean
}

export default function AchievementsSection({ compact = false }: AchievementsSectionProps) {
  const [data, setData] = useState<AchievementsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [_showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await fetch('/api/user/achievements')
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  const recentSlugs = new Set(data?.recentlyEarned.map(a => a.slug) || [])

  if (compact) {
    return (
      <DashboardCard
        title="Achievements"
        subtitle={data ? `${data.stats.earned} of ${data.stats.total} unlocked` : 'Loading...'}
        icon={Trophy}
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
          </div>
        ) : data ? (
          <div>
            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-gold to-accent-gold/70 transition-all duration-500"
                  style={{ width: `${data.stats.progress}%` }}
                />
              </div>
              <p className="text-xs text-text-muted text-right mt-1">{data.stats.progress}% complete</p>
            </div>

            {/* Recently earned or next to earn */}
            <div className="grid grid-cols-3 gap-2">
              {data.recentlyEarned.length > 0 ? (
                data.recentlyEarned.slice(0, 3).map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    {...achievement}
                    size="sm"
                    isNew={true}
                  />
                ))
              ) : (
                data.available.slice(0, 3).map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    {...achievement}
                    size="sm"
                    showProgress={true}
                  />
                ))
              )}
            </div>

            {/* View all link */}
            <button
              onClick={() => setShowAll(true)}
              className="w-full mt-4 flex items-center justify-center gap-1 text-accent-gold text-sm hover:underline"
            >
              View all achievements
              <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy size={32} className="mx-auto text-gray-700 mb-2" />
            <p className="text-text-muted text-sm">No achievements yet</p>
          </div>
        )}
      </DashboardCard>
    )
  }

  // Full view
  return (
    <DashboardCard
      title="Achievements"
      subtitle={data ? `${data.stats.earned} of ${data.stats.total} unlocked` : 'Loading...'}
      icon={Trophy}
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Overall progress */}
          <div className="p-4 bg-gray-900/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-light font-medium">Overall Progress</span>
              <span className="text-accent-gold font-bold">{data.stats.progress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-burgundy via-accent-gold to-accent-sapphire transition-all duration-500"
                style={{ width: `${data.stats.progress}%` }}
              />
            </div>
          </div>

          {/* Recently earned */}
          {data.recentlyEarned.length > 0 && (
            <div>
              <h4 className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">
                Recently Earned
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.recentlyEarned.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    {...achievement}
                    isNew={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Earned achievements */}
          {data.earned.length > 0 && (
            <div>
              <h4 className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">
                Earned ({data.earned.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.earned
                  .filter(a => !recentSlugs.has(a.slug))
                  .map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      {...achievement}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Available achievements */}
          {data.available.length > 0 && (
            <div>
              <h4 className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">
                In Progress ({data.available.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.available.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    {...achievement}
                    showProgress={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-gray-700 mb-3" />
          <p className="text-text-muted">Failed to load achievements</p>
        </div>
      )}
    </DashboardCard>
  )
}
