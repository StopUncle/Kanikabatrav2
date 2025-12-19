'use client'

import {
  Award, Trophy, Calendar, BookOpen, Target, Flame, Star,
  ShoppingBag, MessageSquare, CheckCircle, Users, Play,
  type LucideIcon
} from 'lucide-react'

interface AchievementBadgeProps {
  name: string
  description: string
  icon: string
  tier: 'bronze' | 'silver' | 'gold' | string
  isEarned: boolean
  earnedAt?: string | null
  progress?: number
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
  isNew?: boolean
}

const tierColors = {
  bronze: {
    bg: 'bg-amber-900/30',
    border: 'border-amber-700/50',
    text: 'text-amber-500',
    glow: 'shadow-amber-500/20'
  },
  silver: {
    bg: 'bg-gray-400/20',
    border: 'border-gray-400/50',
    text: 'text-gray-300',
    glow: 'shadow-gray-400/20'
  },
  gold: {
    bg: 'bg-accent-gold/20',
    border: 'border-accent-gold/50',
    text: 'text-accent-gold',
    glow: 'shadow-accent-gold/30'
  }
}

const sizeClasses = {
  sm: {
    container: 'w-12 h-12',
    icon: 16,
    text: 'text-xs'
  },
  md: {
    container: 'w-16 h-16',
    icon: 24,
    text: 'text-sm'
  },
  lg: {
    container: 'w-20 h-20',
    icon: 32,
    text: 'text-base'
  }
}

export default function AchievementBadge({
  name,
  description,
  icon,
  tier,
  isEarned,
  earnedAt,
  progress = 0,
  size = 'md',
  showProgress = false,
  isNew = false
}: AchievementBadgeProps) {
  const tierStyle = tierColors[tier as keyof typeof tierColors] || tierColors.bronze
  const sizeStyle = sizeClasses[size]

  // Map icon names to components
  const iconMap: Record<string, LucideIcon> = {
    Award, Trophy, Calendar, BookOpen, Target, Flame, Star,
    ShoppingBag, MessageSquare, CheckCircle, Users, Play
  }
  const IconComponent = iconMap[icon] || Award

  return (
    <div className="group relative">
      <div
        className={`
          relative flex flex-col items-center p-3 rounded-xl transition-all duration-300
          ${isEarned
            ? `${tierStyle.bg} ${tierStyle.border} border hover:shadow-lg ${tierStyle.glow}`
            : 'bg-gray-900/50 border border-gray-800 opacity-60 hover:opacity-80'
          }
          ${isNew ? 'animate-pulse ring-2 ring-accent-gold ring-offset-2 ring-offset-gray-900' : ''}
        `}
      >
        {/* Badge Icon */}
        <div
          className={`
            ${sizeStyle.container} rounded-full flex items-center justify-center mb-2
            ${isEarned ? tierStyle.bg : 'bg-gray-800'}
          `}
        >
          <IconComponent
            size={sizeStyle.icon}
            className={isEarned ? tierStyle.text : 'text-gray-600'}
          />
        </div>

        {/* Name */}
        <p className={`${sizeStyle.text} font-medium text-center ${isEarned ? 'text-text-light' : 'text-gray-500'}`}>
          {name}
        </p>

        {/* Tier indicator */}
        <span className={`text-xs mt-1 capitalize ${isEarned ? tierStyle.text : 'text-gray-600'}`}>
          {tier}
        </span>

        {/* Progress bar for unearned */}
        {showProgress && !isEarned && progress > 0 && (
          <div className="w-full mt-2">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-gold/50 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">{progress}%</p>
          </div>
        )}

        {/* Earned date */}
        {isEarned && earnedAt && (
          <p className="text-xs text-text-muted mt-1">
            {new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        )}

        {/* New badge indicator */}
        {isNew && (
          <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-accent-gold text-deep-black text-xs font-bold rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
        <p className="text-text-light text-sm font-medium text-center">{name}</p>
        <p className="text-text-muted text-xs text-center mt-1">{description}</p>
      </div>
    </div>
  )
}
