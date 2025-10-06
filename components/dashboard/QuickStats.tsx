'use client'

import { BookOpen, Calendar, Trophy, TrendingUp } from 'lucide-react'

interface QuickStatsProps {
  totalPurchases: number
  upcomingSessions: number
  completedSessions: number
  daysActive: number
}

const QuickStats = ({ 
  totalPurchases, 
  upcomingSessions, 
  completedSessions, 
  daysActive 
}: QuickStatsProps) => {
  const stats = [
    {
      label: 'Purchases',
      value: totalPurchases,
      icon: BookOpen,
      color: 'from-gold to-gold-dark',
      bgColor: 'bg-gold/10'
    },
    {
      label: 'Upcoming Sessions',
      value: upcomingSessions,
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Completed',
      value: completedSessions,
      icon: Trophy,
      color: 'from-burgundy to-sapphire',
      bgColor: 'bg-burgundy/10'
    },
    {
      label: 'Days Active',
      value: daysActive,
      icon: TrendingUp,
      color: 'from-sapphire to-burgundy',
      bgColor: 'bg-sapphire/10'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5 hover:border-gold/30 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </span>
          </div>
          <p className="text-text-muted text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default QuickStats