'use client'

import { BookOpen, Calendar, Play, Trophy, MessageSquare, ShoppingBag, Star } from 'lucide-react'

interface ActivityItemProps {
  type: string
  title: string
  metadata?: Record<string, unknown>
  createdAt: string
}

const iconMap: Record<string, React.ElementType> = {
  purchase: ShoppingBag,
  session_completed: Calendar,
  lesson_completed: Play,
  course_completed: BookOpen,
  achievement: Trophy,
  feedback: MessageSquare,
  default: Star
}

const colorMap: Record<string, string> = {
  purchase: 'text-green-400 bg-green-500/10',
  session_completed: 'text-accent-gold bg-accent-gold/10',
  lesson_completed: 'text-blue-400 bg-blue-500/10',
  course_completed: 'text-purple-400 bg-purple-500/10',
  achievement: 'text-amber-400 bg-amber-500/10',
  feedback: 'text-pink-400 bg-pink-500/10',
  default: 'text-gray-400 bg-gray-500/10'
}

export default function ActivityItem({ type, title, createdAt }: ActivityItemProps) {
  const Icon = iconMap[type] || iconMap.default
  const colorClass = colorMap[type] || colorMap.default

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-light text-sm truncate">{title}</p>
        <p className="text-text-muted text-xs">{formatDate(createdAt)}</p>
      </div>
    </div>
  )
}
